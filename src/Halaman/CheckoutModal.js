import React, { useState, useEffect } from 'react';
import '../Styles/CheckoutModal.css';

const CheckoutModal = ({ cart, total, formatPrice, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        telepon: '',
        metodePengambilan: 'takeaway',
        metodePembayaran: 'cash',
        catatan: '',
        tanggalPengambilan: '',
        waktuPengambilan: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentStep, setPaymentStep] = useState(1);
    const [transactionCode, setTransactionCode] = useState('');

    // Auto-set tanggal minimal untuk takeaway
    useEffect(() => {
        if (formData.metodePengambilan === 'takeaway' && !formData.tanggalPengambilan) {
            const today = new Date().toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, tanggalPengambilan: today }));
        }
    }, [formData.metodePengambilan]);

    // Generate transaction code saat component mount
    useEffect(() => {
        setTransactionCode(generateTransactionCode());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nama.trim()) {
            newErrors.nama = 'Nama wajib diisi';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email tidak valid';
        }

        if (!formData.telepon.trim()) {
            newErrors.telepon = 'Telepon wajib diisi';
        } else if (!/^[0-9]{10,13}$/.test(formData.telepon)) {
            newErrors.telepon = 'Nomor telepon tidak valid';
        }

        if (formData.metodePengambilan === 'takeaway') {
            if (!formData.tanggalPengambilan) {
                newErrors.tanggalPengambilan = 'Tanggal pengambilan wajib diisi';
            }

            if (!formData.waktuPengambilan) {
                newErrors.waktuPengambilan = 'Waktu pengambilan wajib diisi';
            }
        }

        return newErrors;
    };

    const generateTransactionCode = () => {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `JLC${year}${month}${day}${random}`;
    };

    // Fungsi untuk save order ke database
    const saveOrderToDatabase = async (orderData) => {
        try {
            console.log('🔗 Mencoba connect ke server...');
            console.log('📦 Order data:', orderData);
            console.log('🌐 API URL: http://localhost:5000/api/orders');

            // Test koneksi dulu
            const healthCheck = await fetch('http://localhost:5000/api/health');
            if (!healthCheck.ok) {
                throw new Error('Server tidak berjalan!');
            }
            console.log('✅ Server sehat, melanjutkan...');

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transaction_code: orderData.kode_transaksi,
                    customer_name: orderData.nama,
                    customer_email: orderData.email,
                    customer_phone: orderData.telepon,
                    pickup_method: orderData.metodePengambilan,
                    pickup_date: orderData.tanggalPengambilan || null,
                    pickup_time: orderData.waktuPengambilan || null,
                    payment_method: orderData.metodePembayaran,
                    subtotal: total,
                    tax: total * 0.1,
                    total_amount: total * 1.1,
                    notes: orderData.catatan || '',
                    items: cart.map(item => ({
                        id: item.id || Date.now(),
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                })
            });

            console.log('📡 Response status:', response.status);
            console.log('📡 Response headers:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Server error response:', errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            console.log('✅ Server response sukses:', result);

            return result;
        } catch (error) {
            console.error('❌ Error detail:', error);
            console.error('❌ Error stack:', error.stack);
            return {
                success: false,
                message: 'Gagal menyimpan pesanan: ' + error.message
            };
        }
    };

// **FUNGSI UTAMA: Langsung proses pembayaran/booking**
const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    // Generate transaction data
    const transactionData = {
        ...formData,
        kode_transaksi: transactionCode,
        items: cart,
        total_harga: total * 1.1,
        tanggal_checkout: new Date().toISOString(),
        status: 'pending',
        created_at: new Date().toISOString()
    };

    console.log('Data transaksi:', transactionData);

    try {
        // 1. Simpan ke database
        const dbResult = await saveOrderToDatabase(transactionData);

        if (dbResult.success) {
            console.log('Pesanan berhasil disimpan:', dbResult);

            // 2. Kirim notifikasi WhatsApp
            sendWhatsAppNotification(transactionData);

            // 3. Tampilkan konfirmasi sukses
            setPaymentStep(3);

            // 4. Panggil callback success
            if (onSuccess) {
                onSuccess({
                    ...transactionData,
                    order_id: dbResult.data?.order_id || dbResult.order_id || Date.now()
                });
            }

        } else {
            console.error('Gagal menyimpan pesanan:', dbResult);
            alert('Gagal menyimpan pesanan: ' + dbResult.message);
            setIsSubmitting(false);
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Terjadi kesalahan saat proses checkout. Lihat konsol untuk detail.');
        setIsSubmitting(false);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentStep === 1) {
        // Validasi form
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Langsung proses pesanan (booking + pembayaran)
        await handleSubmitOrder();
    }
};

const sendWhatsAppNotification = (data) => {
    const phoneNumber = '6285779420783'; // Ganti dengan nomor kafe
    const whatsappMessage = `Halo Jalita Cafe!%0A%0A`
        + `*PESANAN BARU*%0A`
        + `Kode: ${data.kode_transaksi}%0A`
        + `Tanggal: ${new Date().toLocaleDateString('id-ID')}%0A%0A`
        + `*DATA PELANGGAN*%0A`
        + `Nama: ${data.nama}%0A`
        + `Email: ${data.email}%0A`
        + `Telepon: ${data.telepon}%0A%0A`
        + `*DETAIL PESANAN*%0A`
        + cart.map(item => `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join('%0A')
        + `%0A%0A*RINCIAN*%0A`
        + `Subtotal: ${formatPrice(total)}%0A`
        + `PPN (10%): ${formatPrice(total * 0.1)}%0A`
        + `*Total: ${formatPrice(total * 1.1)}*%0A%0A`
        + `*PENGAMBILAN*%0A`
        + `Metode: ${data.metodePengambilan === 'takeaway' ? 'Takeaway' : 'Dine In'}%0A`
        + `Tanggal: ${data.tanggalPengambilan || '-'}%0A`
        + `Waktu: ${data.waktuPengambilan || '-'}%0A%0A`
        + `*PEMBAYARAN*%0A`
        + `Metode: ${getPaymentMethodText(data.metodePembayaran)}%0A`
        + `Status: Menunggu Pembayaran%0A%0A`
        + `Catatan: ${data.catatan || '-'}%0A%0A`
        + `Terima kasih!`;

    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
};

const getPaymentMethodText = (method) => {
    switch (method) {
        case 'cash': return 'Cash (Bayar di Tempat)';
        case 'qris': return 'QRIS';
        case 'transfer': return 'Transfer Bank';
        default: return method;
    }
};

const calculateTax = total * 0.1;
const grandTotal = total + calculateTax;

return (
    <>
        <div className="checkout-overlay" onClick={onClose}></div>
        <div className="checkout-modal">
            <div className="checkout-header">
                <h3>💰 Checkout Pesanan</h3>
                <button className="close-checkout" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            {/* Progress Steps */}
            <div className="checkout-progress">
                <div className="progress-step active">
                    <div className="step-number">1</div>
                    <div className="step-label">Data & Pembayaran</div>
                </div>
                <div className="progress-line"></div>
                <div className={`progress-step ${paymentStep === 3 ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">Selesai</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
                {/* Step 1: Form Data Langsung + Pembayaran */}
                {paymentStep === 1 && (
                    <div className="checkout-step">
                        <h4>📋 Data Pelanggan & Pembayaran</h4>

                        <div className="order-summary-step">
                            <h5>Ringkasan Pesanan</h5>
                            <div className="summary-items">
                                {cart.map(item => (
                                    <div className="summary-item-step" key={item.id || item.name}>
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                                <div className="summary-total-step">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>PPN (10%)</span>
                                        <span>{formatPrice(calculateTax)}</span>
                                    </div>
                                    <div className="summary-row grand-total">
                                        <strong>Total</strong>
                                        <strong>{formatPrice(grandTotal)}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="customer-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nama">Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        id="nama"
                                        name="nama"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama lengkap"
                                        className={errors.nama ? 'error' : ''}
                                    />
                                    {errors.nama && <span className="error-message">{errors.nama}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="telepon">Nomor WhatsApp *</label>
                                    <input
                                        type="tel"
                                        id="telepon"
                                        name="telepon"
                                        value={formData.telepon}
                                        onChange={handleChange}
                                        placeholder="081234567890"
                                        className={errors.telepon ? 'error' : ''}
                                    />
                                    {errors.telepon && <span className="error-message">{errors.telepon}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="contoh@email.com"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label>Metode Pengambilan *</label>
                                <div className="pickup-options">
                                    <label className={`pickup-option ${formData.metodePengambilan === 'takeaway' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="metodePengambilan"
                                            value="takeaway"
                                            checked={formData.metodePengambilan === 'takeaway'}
                                            onChange={handleChange}
                                        />
                                        <div className="pickup-content">
                                            <i className="fas fa-box"></i>
                                            <span>Takeaway</span>
                                            <small>Ambil di toko</small>
                                        </div>
                                    </label>

                                    <label className={`pickup-option ${formData.metodePengambilan === 'dine_in' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="metodePengambilan"
                                            value="dine_in"
                                            checked={formData.metodePengambilan === 'dine_in'}
                                            onChange={handleChange}
                                        />
                                        <div className="pickup-content">
                                            <i className="fas fa-utensils"></i>
                                            <span>Dine In</span>
                                            <small>Makan di tempat</small>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {formData.metodePengambilan === 'takeaway' && (
                                <div className="pickup-time">
                                    <div className="form-group">
                                        <label htmlFor="tanggalPengambilan">Tanggal Pengambilan *</label>
                                        <input
                                            type="date"
                                            id="tanggalPengambilan"
                                            name="tanggalPengambilan"
                                            value={formData.tanggalPengambilan}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className={errors.tanggalPengambilan ? 'error' : ''}
                                        />
                                        {errors.tanggalPengambilan && <span className="error-message">{errors.tanggalPengambilan}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="waktuPengambilan">Waktu Pengambilan *</label>
                                        <select
                                            id="waktuPengambilan"
                                            name="waktuPengambilan"
                                            value={formData.waktuPengambilan}
                                            onChange={handleChange}
                                            className={errors.waktuPengambilan ? 'error' : ''}
                                        >
                                            <option value="">Pilih Waktu</option>
                                            <option value="08:00-10:00">08:00 - 10:00</option>
                                            <option value="10:00-12:00">10:00 - 12:00</option>
                                            <option value="12:00-14:00">12:00 - 14:00</option>
                                            <option value="14:00-16:00">14:00 - 16:00</option>
                                            <option value="16:00-18:00">16:00 - 18:00</option>
                                            <option value="18:00-20:00">18:00 - 20:00</option>
                                        </select>
                                        {errors.waktuPengambilan && <span className="error-message">{errors.waktuPengambilan}</span>}
                                    </div>
                                </div>
                            )}

                            {/* Metode Pembayaran di Form yang Sama */}
                            <div className="form-group">
                                <label>Metode Pembayaran *</label>
                                <div className="payment-options-inline">
                                    <label className={`payment-option-inline ${formData.metodePembayaran === 'cash' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="metodePembayaran"
                                            value="cash"
                                            checked={formData.metodePembayaran === 'cash'}
                                            onChange={handleChange}
                                        />
                                        <i className="fas fa-money-bill-wave"></i>
                                        <span>Cash</span>
                                    </label>

                                    <label className={`payment-option-inline ${formData.metodePembayaran === 'qris' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="metodePembayaran"
                                            value="qris"
                                            checked={formData.metodePembayaran === 'qris'}
                                            onChange={handleChange}
                                        />
                                        <i className="fas fa-qrcode"></i>
                                        <span>QRIS</span>
                                    </label>

                                    <label className={`payment-option-inline ${formData.metodePembayaran === 'transfer' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="metodePembayaran"
                                            value="transfer"
                                            checked={formData.metodePembayaran === 'transfer'}
                                            onChange={handleChange}
                                        />
                                        <i className="fas fa-university"></i>
                                        <span>Transfer</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="catatan">Catatan Pesanan (Opsional)</label>
                                <textarea
                                    id="catatan"
                                    name="catatan"
                                    value={formData.catatan}
                                    onChange={handleChange}
                                    placeholder="Contoh: Kurangi gula, tambah es, pesanan khusus, dll."
                                    rows="2"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Confirmation Success */}
                {paymentStep === 3 && (
                    <div className="checkout-step">
                        <h4>✅ Pesanan Berhasil!</h4>

                        <div className="confirmation-content">
                            <div className="confirmation-success">
                                <div className="success-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h5>Pesanan Anda Telah Diterima!</h5>
                                <p className="success-message">
                                    Kode transaksi: <strong>{transactionCode}</strong>
                                </p>
                                <p className="success-detail">
                                    Pesanan Anda akan segera diproses. Notifikasi telah dikirim via WhatsApp.
                                    Silakan cek pesan Anda.
                                </p>
                            </div>

                            <div className="confirmation-notice">
                                <div className="notice-box success">
                                    <i className="fas fa-info-circle"></i>
                                    <div>
                                        <strong>Informasi Penting:</strong>
                                        <ul>
                                            <li>Pesanan langsung masuk ke sistem booking</li>
                                            <li>Status: <span className="status-pending">Menunggu Pembayaran</span></li>
                                            <li>Konfirmasi pembayaran via WhatsApp maksimal 1x24 jam</li>
                                            <li>Simpan kode transaksi untuk konfirmasi</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="checkout-footer">
                    <div className="footer-buttons">
                        {/* Tombol Kembali hanya untuk step tertentu */}
                        {paymentStep === 1 && (
                            <button
                                type="button"
                                className="back-btn"
                                onClick={onClose}
                            >
                                <i className="fas fa-times"></i> Tutup
                            </button>
                        )}

                        {paymentStep === 3 && (
                            <button
                                type="button"
                                className="back-btn"
                                onClick={onClose}
                            >
                                <i className="fas fa-home"></i> Kembali ke Menu
                            </button>
                        )}

                        <div className="right-buttons">
                            <button
                                type="submit"
                                className="submit-btn primary-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Memproses Pesanan...
                                    </>
                                ) : paymentStep === 1 ? (
                                    <>
                                        <i className="fas fa-shopping-cart"></i> Pesan & Bayar Sekarang
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-check"></i> Selesai
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
);
};

export default CheckoutModal;