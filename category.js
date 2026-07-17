document.addEventListener('DOMContentLoaded', () => {
    const sortDropdown = document.querySelector('.sort-dropdown');
    const productGrid = document.querySelector('.product-grid-two-columns');
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');

    // 1. Handle Sorting Functionality
    if (sortDropdown && productGrid) {
        sortDropdown.addEventListener('change', (e) => {
            const products = Array.from(productGrid.querySelectorAll('.product-card-horizontal'));
            const sortBy = e.target.value;

            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.item-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.item-price').textContent.replace('$', ''));

                if (sortBy === 'Price: Lowest First') {
                    return priceA - priceB;
                } else if (sortBy === 'Price: Highest First') {
                    return priceB - priceA;
                }
                return 0; // Default match (no sort modification)
            });

            // Re-inject sorted items back into grid container
            productGrid.innerHTML = '';
            products.forEach(product => productGrid.appendChild(product));
        });
    }

    // 2. Handle Simple Checkbox Interactions
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Here you can hook up an API request or client-side logic
            // to filter out items depending on checked conditions.
            console.log(`Filter changed: ${checkbox.parentElement.textContent.trim()} is now ${checkbox.checked}`);
        });
    });
});