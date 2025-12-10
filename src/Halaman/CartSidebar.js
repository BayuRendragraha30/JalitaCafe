import React from 'react';
import '../Styles/CartSidebar.css';

const CartSidebar = ({ 
  cart, 
  onClose, 
  onRemove, 
  onUpdateQuantity, 
  onCheckout,
  formatPrice,
  calculateTotal 
}) => {
  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>🛒 Keranjang Belanja</h3>
          <button className="close-cart" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-cart"></i>
              <p>Keranjang belanja kosong</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">{formatPrice(item.price)}</p>
                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="item-subtotal">
                  <span>{formatPrice(item.price * item.quantity)}</span>
                  <button 
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              <div className="summary-row">
                <span>PPN (10%)</span>
                <span>{formatPrice(calculateTotal() * 0.1)}</span>
              </div>
              <div className="summary-row total">
                <strong>Total</strong>
                <strong>{formatPrice(calculateTotal() * 1.1)}</strong>
              </div>
            </div>
            
            <button className="checkout-btn" onClick={onCheckout}>
              <i className="fas fa-check"></i> Lanjut ke Checkout
            </button>
            
            <p className="cart-note">
              *Harga sudah termasuk PPN 10%
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;