const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Ganti jika pakai password
    database: 'jalita_cafe',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.log('🔧 Cek:');
        console.log('   1. MySQL service running? (sudo service mysql start)');
        console.log('   2. Database "jalita_cafe" exists?');
        console.log('   3. Username/password correct?');
    } else {
        console.log('✅ Database connected successfully!');
        
        // Test query
        connection.query('SHOW TABLES', (err, results) => {
            if (err) {
                console.error('❌ Query failed:', err.message);
            } else {
                console.log('📊 Tables in database:', results.map(r => Object.values(r)[0]).join(', '));
            }
            connection.release();
        });
    }
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    });
});

// Create order endpoint
app.post('/api/orders', async (req, res) => {
    console.log('📨 Received POST /api/orders');
    console.log('📦 Body:', JSON.stringify(req.body, null, 2));
    
    try {
        const {
            transaction_code,
            customer_name,
            customer_email,
            customer_phone,
            pickup_method = 'takeaway',
            pickup_date = null,
            pickup_time = null,
            payment_method = 'cash',
            subtotal = 0,
            tax = 0,
            total_amount = 0,
            notes = '',
            items = []
        } = req.body;

        // Validasi
        if (!transaction_code || !customer_name || !customer_phone) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Get database connection
        db.getConnection(async (err, connection) => {
            if (err) {
                console.error('❌ Database connection error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Database error'
                });
            }

            try {
                await connection.promise().beginTransaction();

                // 1. Insert or get customer
                const [customerResult] = await connection.promise().query(
                    `INSERT INTO customers (name, email, phone) 
                     VALUES (?, ?, ?) 
                     ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
                    [customer_name, customer_email || '', customer_phone]
                );

                const customerId = customerResult.insertId;

                // 2. Insert order
                const [orderResult] = await connection.promise().query(
                    `INSERT INTO orders (
                        transaction_code, customer_id, customer_name, 
                        customer_email, customer_phone, pickup_method,
                        pickup_date, pickup_time, payment_method,
                        subtotal, tax, total_amount, notes
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        transaction_code, customerId, customer_name,
                        customer_email || '', customer_phone, pickup_method,
                        pickup_date, pickup_time, payment_method,
                        subtotal, tax, total_amount, notes
                    ]
                );

                const orderId = orderResult.insertId;

                // 3. Insert order items
                if (items && items.length > 0) {
                    for (const item of items) {
                        await connection.promise().query(
                            `INSERT INTO order_items (
                                order_id, menu_item_id, menu_item_name,
                                quantity, unit_price, total_price
                            ) VALUES (?, ?, ?, ?, ?, ?)`,
                            [
                                orderId,
                                item.id || 0,
                                item.name,
                                item.quantity || 1,
                                item.price || 0,
                                (item.price || 0) * (item.quantity || 1)
                            ]
                        );
                    }
                }

                // 4. Insert payment record
                await connection.promise().query(
                    `INSERT INTO payments (order_id, payment_method, amount, status)
                     VALUES (?, ?, ?, 'pending')`,
                    [orderId, payment_method, total_amount]
                );

                await connection.promise().commit();

                console.log('✅ Order created successfully:', { orderId, transaction_code });

                res.status(201).json({
                    success: true,
                    message: 'Order created successfully',
                    data: {
                        order_id: orderId,
                        transaction_code: transaction_code,
                        customer_id: customerId
                    }
                });

            } catch (error) {
                await connection.promise().rollback();
                console.error('❌ Order creation error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to create order',
                    error: error.message
                });
            } finally {
                connection.release();
            }
        });

    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get all orders
app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 50', (err, results) => {
        if (err) {
            console.error('❌ Error fetching orders:', err);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch orders'
            });
        }
        res.json({
            success: true,
            data: results
        });
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Jalita Cafe API Server v1.0',
        endpoints: {
            createOrder: 'POST /api/orders',
            getOrders: 'GET /api/orders',
            healthCheck: 'GET /api/health'
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Ready to accept API requests`);
});