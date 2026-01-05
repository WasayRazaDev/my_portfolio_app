// Event listener for portfolio updates
export const setupPortfolioSync = () => {
  // Listen for storage events (across tabs)
  window.addEventListener('storage', (event) => {
    if (event.key === 'portfolio_data') {
      console.log('Portfolio data updated from another tab');
      // Trigger a custom event
      window.dispatchEvent(new Event('portfolioUpdated'));
    }
  });

  // Listen for custom portfolio update events
  window.addEventListener('portfolioUpdated', () => {
    const portfolioData = localStorage.getItem('portfolio_data');
    if (portfolioData) {
      console.log('Portfolio updated, reloading page...');
      window.location.reload();
    }
  });
};

// Function to trigger portfolio update
export const triggerPortfolioUpdate = () => {
  // Update localStorage
  const portfolioData = localStorage.getItem('portfolio_data');
  localStorage.setItem('portfolio_data', portfolioData);
  
  // Dispatch storage event
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'portfolio_data',
    newValue: portfolioData
  }));
  
  // Dispatch custom event
  window.dispatchEvent(new Event('portfolioUpdated'));
};