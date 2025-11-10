import React, { useState } from 'react';
import { OrderItem } from '../../types';
import './CancelItemDialog.css';

interface CancelItemDialogProps {
  item: OrderItem;
  onConfirm: (quantity: number) => void;
  onCancel: () => void;
}

const CancelItemDialog: React.FC<CancelItemDialogProps> = ({ item, onConfirm, onCancel }) => {
  const [cancelQuantity, setCancelQuantity] = useState(1);
  const maxQuantity = item.quantity;

  const handleConfirm = () => {
    if (cancelQuantity < 1 || cancelQuantity > maxQuantity) {
      alert(`Số lượng hủy phải từ 1 đến ${maxQuantity}`);
      return;
    }
    onConfirm(cancelQuantity);
  };

  const itemTotal = item.unitPrice * item.quantity;
  const cancelTotal = item.unitPrice * cancelQuantity;
  const remainingQuantity = maxQuantity - cancelQuantity;
  const remainingTotal = item.unitPrice * remainingQuantity;

  return (
<div className="dialog-overlay">
      <div className="cancel-item-dialog">
        <div className="dialog-header">
          <h3>🗑️ Hủy món</h3>
     <button className="btn-close" onClick={onCancel}>×</button>
        </div>

        <div className="dialog-content">
          {/* Item Info */}
   <div className="item-info-card">
      <h4>{item.product?.name}</h4>
            {item.notes && <p className="item-notes-display">Ghi chú: {item.notes}</p>}
  </div>

    {/* Current Info */}
          <div className="info-grid">
            <div className="info-item">
              <label>Số lượng hiện tại:</label>
              <span className="value">{maxQuantity}</span>
            </div>
  <div className="info-item">
  <label>Đơn giá:</label>
          <span className="value">{item.unitPrice.toLocaleString('vi-VN')} đ</span>
  </div>
  <div className="info-item">
        <label>Tổng tiền hiện tại:</label>
       <span className="value total">{itemTotal.toLocaleString('vi-VN')} đ</span>
            </div>
          </div>

          <div className="divider"></div>

          {/* Cancel Quantity Input */}
          <div className="cancel-quantity-section">
            <label>Số lượng cần hủy:</label>
        <div className="quantity-input-group">
     <button 
       className="qty-btn"
    onClick={() => setCancelQuantity(Math.max(1, cancelQuantity - 1))}
      disabled={cancelQuantity <= 1}
    >
          −
    </button>
        <input
    type="number"
                min="1"
    max={maxQuantity}
         value={cancelQuantity}
     onChange={(e) => {
         const val = parseInt(e.target.value) || 1;
        setCancelQuantity(Math.min(maxQuantity, Math.max(1, val)));
       }}
    className="qty-input-large"
   />
              <button 
                className="qty-btn"
    onClick={() => setCancelQuantity(Math.min(maxQuantity, cancelQuantity + 1))}
     disabled={cancelQuantity >= maxQuantity}
              >
  +
        </button>
        <button
       className="btn-max"
          onClick={() => setCancelQuantity(maxQuantity)}
     >
    Tất cả
           </button>
            </div>
          </div>

      {/* Quick Buttons */}
     {maxQuantity > 4 && (
          <div className="quick-buttons">
     <span className="quick-label">Nhanh:</span>
              {[1, 5, 10].filter(q => q <= maxQuantity).map(q => (
            <button 
  key={q}
className={`quick-btn ${cancelQuantity === q ? 'active' : ''}`}
          onClick={() => setCancelQuantity(q)}
    >
       {q}
          </button>
         ))}
         {maxQuantity > 1 && (
       <button 
    className={`quick-btn ${cancelQuantity === maxQuantity ? 'active' : ''}`}
      onClick={() => setCancelQuantity(maxQuantity)}
              >
        {maxQuantity}
    </button>
 )}
        </div>
    )}

          <div className="divider"></div>

          {/* Result Summary */}
          <div className="result-summary">
       <div className="summary-row">
      <span>Số lượng hủy:</span>
              <span className="value cancel-value">{cancelQuantity}</span>
        </div>
      <div className="summary-row">
  <span>Tiền hủy:</span>
              <span className="value cancel-value">-{cancelTotal.toLocaleString('vi-VN')} đ</span>
     </div>
            
            {remainingQuantity > 0 && (
           <>
    <div className="divider-thin"></div>
                <div className="summary-row remaining">
          <span>Số lượng còn lại:</span>
               <span className="value">{remainingQuantity}</span>
       </div>
                <div className="summary-row remaining">
       <span>Tiền còn lại:</span>
       <span className="value">{remainingTotal.toLocaleString('vi-VN')} đ</span>
              </div>
      </>
            )}

   {cancelQuantity === maxQuantity && (
              <div className="warning-message">
     ⚠️ Món này sẽ bị xóa hoàn toàn khỏi đơn hàng
       </div>
            )}
          </div>
      </div>

      <div className="dialog-actions">
   <button className="btn btn-cancel-dialog" onClick={onCancel}>
       Hủy bỏ
          </button>
          <button className="btn btn-confirm-cancel" onClick={handleConfirm}>
         ✓ Xác nhận hủy ({cancelQuantity})
     </button>
        </div>
   </div>
 </div>
  );
};

export default CancelItemDialog;
