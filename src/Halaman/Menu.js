import React, { useState, useEffect } from 'react';
import '../Styles/Menu.css';
import CheckoutModal from '../Halaman/CheckoutModal';
import CartSidebar from '../Halaman/CartSidebar';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({
    americanoSeries: [],
    coffeeBeansRetail: [],
    coffeeOfTheDay: []
  });

  // Format price to IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Fetch products from database or use default
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Try to fetch from API first
      const response = await fetch('http://localhost/jalita_api/api/products.php?action=get_all');
      if (response.ok) {
        const result = await response.json();
        
        if (result.success) {
          const americanoSeries = result.data.filter(p => p.category === 'americano');
          const coffeeBeansRetail = result.data.filter(p => p.category === 'beans');
          const coffeeOfTheDay = result.data.filter(p => p.category === 'coffee_day');
          
          setProducts({
            americanoSeries: americanoSeries.length > 0 ? americanoSeries : getDefaultAmericanoSeries(),
            coffeeBeansRetail: coffeeBeansRetail.length > 0 ? coffeeBeansRetail : getDefaultCoffeeBeansRetail(),
            coffeeOfTheDay: coffeeOfTheDay.length > 0 ? coffeeOfTheDay : getDefaultCoffeeOfTheDay()
          });
          return;
        }
      }
    } catch (error) {
      console.log('Using default products data');
    }
    
    // Use default data if API fails
    setProducts({
      americanoSeries: getDefaultAmericanoSeries(),
      coffeeBeansRetail: getDefaultCoffeeBeansRetail(),
      coffeeOfTheDay: getDefaultCoffeeOfTheDay()
    });
    
    setLoading(false);
  };

  // Default fallback data
  const getDefaultAmericanoSeries = () => [
    {
      id: 1,
      name: "Iced Americano",
      price: 22000,
      description: "ESPRESSO SHOT YANG DICAMPUR DENGAN SEGELAS AIR MENGHADIRKAN KARAKTER, AROMA, DAN RASA YANG IDEAL.",
      type: "iced",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 10,
      is_available: true
    },
    {
      id: 2,
      name: "Iced Manuka Americano",
      price: 29000,
      description: "Americano dengan madu Manuka yang pas untuk jadi energy booster",
      type: "iced",
      image: "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 8,
      is_available: true
    },
    {
      id: 3,
      name: "Triple Peach Americano",
      price: 29000,
      description: "Peach coffee perpaduan rasa kopi, tiga jenis buah peach dan aroma",
      type: "iced",
      image: "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 5,
      is_available: true
    },
    {
      id: 4,
      name: "Hot Americano",
      price: 22000,
      description: "ESPRESSO SHOT YANG DICAMPUR DENGAN SEGELAS AIR MENGHADIRKAN KARAKTER, AROMA, DAN RASA YANG IDEAL.",
      type: "hot",
      image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 12,
      is_available: true
    },
    {
      id: 5,
      name: "Hot Manuka Americano",
      price: 29000,
      description: "Americano dengan madu Manuka yang pas untuk jadi energy booster",
      type: "hot",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 7,
      is_available: true
    },
    {
      id: 6,
      name: "Berry Manuka Americano",
      price: 31000,
      description: "Perpaduan rasa stroberi dan Manuka dengan Classic Blend Fore yang menyegarkan",
      type: "hot",
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 6,
      is_available: true
    }
  ];

  const getDefaultCoffeeBeansRetail = () => [
    {
      id: 7,
      name: "Arabica Gayo",
      price: 85000,
      image: "https://th.bing.com/th/id/OIP.bgLj5fAmZOkh0DwBHYyKKwHaHa?w=172&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
      stock: 20,
      is_available: true
    },
    {
      id: 8,
      name: "Arabica Toraja",
      price: 95000,
      image: "https://th.bing.com/th/id/OIP.9W6YyZScIbZoOyvS-P5zfwHaHa?w=183&h=183&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
      stock: 15,
      is_available: true
    },
    {
      id: 9,
      name: "Arabica Flores",
      price: 90000,
      image: "https://th.bing.com/th/id/OIP.aeOOxRN91IErCxvIxWPTZgHaHa?w=186&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
      stock: 18,
      is_available: true
    },
    {
      id: 10,
      name: "Robusta Lampung",
      price: 75000,
      image: "https://th.bing.com/th/id/OIP.y-YnkT7p12IS1O0T4MRLmQHaHa?w=186&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
      stock: 25,
      is_available: true
    },
    {
      id: 11,
      name: "Coffee Blend Signature",
      price: 120000,
      image: "https://th.bing.com/th/id/OIP.IrFwDtwYWyB9a19yonXBIwHaE8?w=258&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
      stock: 10,
      is_available: true
    }
  ];

  const getDefaultCoffeeOfTheDay = () => [
    {
      id: 12,
      name: "V60 Pour Over",
      price: 35000,
      image: "https://th.bing.com/th/id/OIP.IsLwbgKWJ8HY925bgUeHjgHaLW?w=120&h=184&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1",
      stock: 8,
      is_available: true
    },
    {
      id: 13,
      name: "French Press",
      price: 32000,
      image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 6,
      is_available: true
    },
    {
      id: 14,
      name: "Aeropress",
      price: 38000,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 4,
      is_available: true
    },
    {
      id: 15,
      name: "Siphon",
      price: 45000,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stock: 3,
      is_available: true
    }
  ];

  // Add to cart function
  const addToCart = (product) => {
    console.log('Adding to cart:', product.name);
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1 
      }]);
    }
    
    showNotification(`${product.name} ditambahkan ke keranjang`, 'success');
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
    showNotification('Item dihapus dari keranjang', 'info');
  };

  // Update quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196F3'
    };
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${colors[type] || '#4CAF50'};
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      font-weight: 500;
      max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  // Save order to database
  const saveToDatabase = async (checkoutData) => {
    try {
      const response = await fetch('http://localhost/jalita_api/api/orders.php?action=create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...checkoutData,
          items: cart,
          total_harga: calculateTotal() * 1.1
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      }
      return { success: false, message: 'Network error' };
    } catch (error) {
      console.error('Error saving to database:', error);
      return { success: false, message: 'Gagal menyimpan ke database' };
    }
  };

  // Load initial data
  useEffect(() => {
    fetchProducts();
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('jalitaCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('jalitaCart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('jalitaCart');
    }
  }, [cart]);

  if (loading) {
    return (
      <section id="menu" className="menu section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-title skeleton"></div>
            <div className="section-subtitle skeleton"></div>
            <div className="divider"></div>
          </div>
          
          <div className="menu-loading">
            <div className="loading-spinner">
              <i className="fas fa-coffee fa-spin"></i>
              <p>Memuat menu...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="menu section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Menu Kami</h2>
          <p className="section-subtitle">Pilihan terbaik untuk pengalaman kopi tak terlupakan</p>
          <div className="divider"></div>
        </div>
        
        {/* Floating Cart Button */}
        <div className="floating-cart-btn" onClick={() => setShowCart(!showCart)}>
          <i className="fas fa-shopping-cart"></i>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          <span className="cart-total-badge">{formatPrice(calculateTotal())}</span>
        </div>
        
        {/* Americano Series */}
        <div className="menu-category americano-series">
          <div className="category-header">
            <h3 className="category-title">AMERICANO SERIES</h3>
            <span className="category-count">
              {products.americanoSeries.filter(p => p.is_available).length} item tersedia
            </span>
          </div>
          
          <div className="americano-grid">
            {products.americanoSeries.map((item) => (
              <div className={`americano-card ${!item.is_available ? 'out-of-stock' : ''}`} key={item.id}>
                <div className="coffee-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="coffee-image"
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                  <span className={`coffee-tag ${item.type}`}>
                    {item.type === "hot" ? "HOT" : "ICED"}
                  </span>
                  
                  {!item.is_available ? (
                    <div className="out-of-stock-label">
                      <i className="fas fa-times-circle"></i> HABIS
                    </div>
                  ) : (
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item)}
                      title="Tambahkan ke Keranjang"
                      disabled={item.stock <= 0}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  )}
                  
                  {item.stock > 0 && item.is_available && (
                    <div className="stock-badge">
                      <i className="fas fa-box"></i> {item.stock} tersedia
                    </div>
                  )}
                </div>
                
                <div className="coffee-content">
                  <div className="coffee-header">
                    <h4 className="coffee-name">{item.name}</h4>
                    <span className="coffee-price">{formatPrice(item.price)}</span>
                  </div>
                  <p className="coffee-description">{item.description}</p>
                  
                  <div className="product-meta">
                    <span className="product-id">ID: {item.id}</span>
                    <span className={`availability ${item.is_available ? 'available' : 'unavailable'}`}>
                      {item.is_available ? 'Tersedia' : 'Habis'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Other Categories */}
        <div className="other-categories">
          {/* Coffee Beans Retail */}
          <div className="beans-category">
            <div className="category-header">
              <h3 className="category-title">Coffee Beans Retail</h3>
              <span className="category-count">
                {products.coffeeBeansRetail.filter(p => p.is_available).length} item tersedia
              </span>
            </div>
            <div className="beans-grid">
              {products.coffeeBeansRetail.map((item) => (
                <div className={`bean-card ${!item.is_available ? 'out-of-stock' : ''}`} key={item.id}>
                  <div className="bean-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    {!item.is_available ? (
                      <div className="out-of-stock-overlay">
                        <span>HABIS</span>
                      </div>
                    ) : (
                      <button 
                        className="add-to-cart-btn-small"
                        onClick={() => addToCart(item)}
                        title="Tambahkan ke Keranjang"
                        disabled={item.stock <= 0}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                    
                    {item.stock > 0 && item.is_available && (
                      <div className="stock-indicator">
                        Stok: {item.stock}
                      </div>
                    )}
                  </div>
                  <div className="bean-info">
                    <h5 className="bean-name">{item.name}</h5>
                    <span className="bean-price">{formatPrice(item.price)}</span>
                    
                    {!item.is_available && (
                      <div className="restock-notice">
                        <small>Segera tersedia kembali</small>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Coffee of The Day */}
          <div className="coffee-day-category">
            <div className="category-header">
              <h3 className="category-title">Coffee of The Day</h3>
              <span className="category-count">
                {products.coffeeOfTheDay.filter(p => p.is_available).length} item tersedia
              </span>
            </div>
            <div className="coffee-day-grid">
              {products.coffeeOfTheDay.map((item) => (
                <div className={`coffee-day-card ${!item.is_available ? 'out-of-stock' : ''}`} key={item.id}>
                  <div className="coffee-day-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    {!item.is_available ? (
                      <div className="out-of-stock-overlay">
                        <span>HABIS</span>
                      </div>
                    ) : (
                      <button 
                        className="add-to-cart-btn-small"
                        onClick={() => addToCart(item)}
                        title="Tambahkan ke Keranjang"
                        disabled={item.stock <= 0}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                    
                    {item.stock > 0 && item.is_available && (
                      <div className="stock-indicator">
                        <i className="fas fa-fire"></i> {item.stock} tersisa
                      </div>
                    )}
                  </div>
                  <div className="coffee-day-info">
                    <h5 className="coffee-day-name">{item.name}</h5>
                    <span className="coffee-day-price">{formatPrice(item.price)}</span>
                    
                    {item.stock <= 3 && item.stock > 0 && (
                      <div className="low-stock-warning">
                        <i className="fas fa-exclamation-triangle"></i> Stok terbatas!
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="menu-statistics">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-coffee"></i>
            </div>
            <div className="stat-content">
              <h4>{products.americanoSeries.length + products.coffeeBeansRetail.length + products.coffeeOfTheDay.length}</h4>
              <p>Total Menu</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h4>{
                products.americanoSeries.filter(p => p.is_available).length +
                products.coffeeBeansRetail.filter(p => p.is_available).length +
                products.coffeeOfTheDay.filter(p => p.is_available).length
              }</h4>
              <p>Menu Tersedia</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="stat-content">
              <h4>{cart.length}</h4>
              <p>Item di Keranjang</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-tags"></i>
            </div>
            <div className="stat-content">
              <h4>{formatPrice(calculateTotal())}</h4>
              <p>Total Keranjang</p>
            </div>
          </div>
        </div>
        
        {/* Note Section */}
        <div className="menu-note">
          <div className="note-header">
            <i className="fas fa-info-circle"></i>
            <h4>Informasi Penting</h4>
          </div>
          <p>
            <strong>Note:</strong> Semua harga sudah termasuk pajak 10%. Menu dapat berubah sewaktu-waktu.
            Stok terbatas dan berlaku selama persediaan masih ada.
          </p>
          <div className="order-instructions">
            <h4>📱 Cara Pesan:</h4>
            <ol>
              <li>Klik tombol <i className="fas fa-plus"></i> pada item yang diinginkan</li>
              <li>Periksa keranjang belanja di pojok kanan atas</li>
              <li>Klik "Checkout" untuk menyelesaikan pemesanan</li>
              <li>Pilih metode pengambilan dan pembayaran</li>
              <li>Tunggu konfirmasi via WhatsApp/Email</li>
            </ol>
          </div>
          <div className="payment-info">
            <h4>💳 Metode Pembayaran:</h4>
            <div className="payment-methods-list">
              <span><i className="fas fa-money-bill-wave"></i> Cash</span>
              <span><i className="fas fa-qrcode"></i> QRIS</span>
              <span><i className="fas fa-university"></i> Transfer Bank</span>
              <span><i className="fas fa-mobile-alt"></i> E-Wallet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <CartSidebar
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
          formatPrice={formatPrice}
          calculateTotal={calculateTotal}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          total={calculateTotal()}
          formatPrice={formatPrice}
          onClose={() => setShowCheckout(false)}
          onSuccess={(checkoutData) => {
            console.log('Checkout success data:', checkoutData);
            saveToDatabase(checkoutData).then(result => {
              if (result.success) {
                // Clear cart
                setCart([]);
                localStorage.removeItem('jalitaCart');
                
                // Show success message
                showNotification(
                  `Pesanan berhasil! Kode: ${checkoutData.kode_transaksi || result.data?.kode_transaksi}`,
                  'success'
                );
                
                // Refresh products to update stock
                fetchProducts();
              } else {
                showNotification(`Gagal: ${result.message}`, 'error');
              }
            });
          }}
        />
      )}
    </section>
  );
};

export default Menu;