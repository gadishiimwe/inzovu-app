// Utility to clear old localStorage data
export const clearOldStorage = () => {
  localStorage.removeItem('admin_products');
  localStorage.removeItem('cart');
  console.log('Old localStorage data cleared. Refreshing with new RWF pricing...');
  window.location.reload();
};
