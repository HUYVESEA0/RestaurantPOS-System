import React from 'react';
import './ReturnTableDialog.css';

interface ReturnTableDialogProps {
  tableName: string;
  orderCount: number;
  totalAmount: number;
  onConfirm: (shouldComplete: boolean) => void;
  onCancel: () => void;
}

const ReturnTableDialog: React.FC<ReturnTableDialogProps> = ({
  tableName,
  orderCount,
  totalAmount,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h3>💰 Trả bàn {tableName}</h3>
        </div>

        <div className="dialog-content">
   <div className="warning-box">
            <p className="warning-icon">⚠️</p>
      <p>Bàn này có <strong>{orderCount} đơn hàng</strong> chưa hoàn thành</p>
          </div>

          <div className="order-summary">
       <div className="summary-row">
   <span>Số đơn hàng:</span>
          <strong>{orderCount}</strong>
   </div>
      <div className="summary-row total">
              <span>Tổng tiền:</span>
              <strong className="amount">{totalAmount.toLocaleString('vi-VN')} đ</strong>
            </div>
          </div>

          <div className="info-text">
            <p>💡 <strong>Lưu ý:</strong></p>
            <ul>
  <li>✅ <strong>Hoàn thành đơn:</strong> Tính vào doanh thu, đơn chuyển sang "Hoàn thành"</li>
          <li>❌ <strong>Chỉ trả bàn:</strong> Không tính doanh thu, đơn vẫn "Đang xử lý"</li>
     </ul>
   </div>
      </div>

  <div className="dialog-actions">
   <button 
            className="btn btn-cancel"
  onClick={onCancel}
          >
            Hủy
          </button>
          <button 
        className="btn btn-return-only"
    onClick={() => onConfirm(false)}
  >
      Chỉ trả bàn
          </button>
          <button 
            className="btn btn-complete"
   onClick={() => onConfirm(true)}
          >
       ✅ Hoàn thành & Trả bàn
    </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnTableDialog;
