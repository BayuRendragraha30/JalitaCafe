// Database/models/Payment.js
const db = require('../config/database');

class Payment {
  // Create payment record
  static async create(paymentData) {
    try {
      const { order_id, payment_method, amount, status = 'pending' } = paymentData;
      
      const [result] = await db.execute(
        `INSERT INTO payments (order_id, payment_method, amount, status)
         VALUES (?, ?, ?, ?)`,
        [order_id, payment_method, amount, status]
      );
      
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Update payment status
  static async updateStatus(paymentId, status) {
    try {
      const [result] = await db.execute(
        `UPDATE payments SET status = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [status, paymentId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get payment by order ID
  static async getByOrderId(orderId) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM payments WHERE order_id = ? ORDER BY created_at DESC`,
        [orderId]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Payment;