// Enhanced price input handler
const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/,/g, ''); // Remove existing commas
  
  // Allow only numbers
  if (value === '' || /^\d+$/.test(value)) {
    setFormData(prev => ({ ...prev, price: value }));
  }
};

// Format for display
const formatPrice = (value: string) => {
  if (!value) return '';
  return Number(value).toLocaleString('vi-VN');
};

// In JSX
<input
  type="text"
  value={formatPrice(formData.price)}
  onChange={handlePriceChange}
  placeholder="0"
/>
