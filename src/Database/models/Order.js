// Database/models/Order.js
const db = require('../config/database');

class Order {
  // Create new order
  static async createOrder(orderData) {
    const {
      transaction_code,
      customer_name,
      customer_email,
      customer_phone,
      pickup_method,
      pickup_date,
      pickup_time,
      payment_method,
      subtotal,
      tax,
      total_amount,
      notes,
      items
    } = orderData;

    try {
      // 1. Insert customer
      const [customerResult] = await db.execute(
        `INSERT INTO customers (name, email, phone) 
         VALUES (?, ?, ?)`,
        [customer_name, customer_email, customer_phone]
      );

      const customerId = customerResult.insertId;

      // 2. Insert order
      const [orderResult] = await db.execute(
        `INSERT INTO orders (
          transaction_code, customer_id, customer_name, 
          customer_email, customer_phone, pickup_method,
          pickup_date, pickup_time, payment_method,
          subtotal, tax, total_amount, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          transaction_code, customerId, customer_name,
          customer_email, customer_phone, pickup_method,
          pickup_date || null, pickup_time || null, payment_method,
          subtotal, tax, total_amount, notes || null
        ]
      );

      const orderId = orderResult.insertId;

      // 3. Insert order items
      for (const item of items) {
        await db.execute(
          `INSERT INTO order_items (
            order_id, menu_item_id, menu_item_name,
            quantity, unit_price, total_price
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            orderId, item.id, item.name,
            item.quantity, item.price, item.price * item.quantity
          ]
        );
      }

      // 4. Insert payment
      await db.execute(
        `INSERT INTO payments (order_id, payment_method, amount, status)
         VALUES (?, ?, ?, 'pending')`,
        [orderId, payment_method, total_amount]
      );

      return {
        success: true,
        orderId: orderId,
        transaction_code: transaction_code,
        customerId: customerId
      };

    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  }

  // Get all orders
  static async getAllOrders() {
    try {
      const [rows] = await db.execute(`
        SELECT o.*, c.name as customer_name 
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.id
        ORDER BY o.created_at DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get order by ID
  static async getOrderById(id) {
    try {
      const [rows] = await db.execute(
        `SELECT o.*, c.name as customer_name, c.email, c.phone
         FROM orders o
         LEFT JOIN customers c ON o.customer_id = c.id
         WHERE o.id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update order status
  static async updateOrderStatus(orderId, status) {
    try {
      const [result] = await db.execute(
        `UPDATE orders SET order_status = ? WHERE id = ?`,
        [status, orderId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Order;