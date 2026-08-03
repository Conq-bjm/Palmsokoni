/* ==========================================================================
   1. HEADER ICONS INITIALIZER (LUCIDE)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // This looks for any <i data-lucide="..."> elements and renders them beautifully
    if (typeof lucide !== "undefined") {
        lucide.createIcons({ attrs: { 'stroke-width': 2.2 } });
    } else {
        console.error("Lucide CDN library link is missing in your HTML head section.");
    }

    /* ==========================================================================
       NEW ADDITION: SHOP BY CATEGORY DROPDOWN FUNCTIONALITY (ZONE HOVER SCRIPT)
       ========================================================================== */
    const trigger = document.getElementById("shopByCategoryTrigger");
    const dropdown = document.getElementById("ebayMegaDropdown");

    if (trigger && dropdown) {
        // Toggle the visibility layout class when clicking the category button
        trigger.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents instant closing from document listener below
            dropdown.classList.toggle("show-menu");
        });

        // Function to safely check if the mouse pointer is out of both zones
        function handleMouseLeaveZone() {
            // A short 120ms buffer prevents flickering if the user moves their 
            // cursor across the gap between the orange header button and the dropdown panel
            setTimeout(() => {
                const isHoveringButton = trigger.matches(':hover');
                const isHoveringDropdown = dropdown.matches(':hover');

                // If the mouse is not on the trigger AND not on the menu window, close it
                if (!isHoveringButton && !isHoveringDropdown) {
                    dropdown.classList.remove("show-menu");
                }
            }, 120);
        }

        // Attach mouse tracking listeners to your active zones
        trigger.addEventListener("mouseleave", handleMouseLeaveZone);
        dropdown.addEventListener("mouseleave", handleMouseLeaveZone);

        // Backup safeguard: Close the menu if a user clicks anywhere else on the blank body page
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
                dropdown.classList.remove("show-menu");
            }
        });
    }

    /* ==========================================================================
       HYBRID HOVER / TOUCH ACCOUNT DROPDOWN INTERACTION CONTROLLER
       ========================================================================== */
    const accountTrigger = document.getElementById("accountDropdownTrigger");
    const accountCard = document.getElementById("accountDropdownCard");
    const accountWrapper = document.getElementById("accountMenuWrapper");

    if (accountTrigger && accountCard) {
        // Handle trigger interaction events
        accountTrigger.addEventListener("click", (e) => {
            // Detect if device handles hover events natively (Desktop vs Touchscreen detection)
            const isHoverSupported = window.matchMedia("(hover: hover)").matches;
            
            // If the user is operating a touchscreen phone, tablet, or modern touch laptop
            if (!isHoverSupported) {
                e.preventDefault();
                e.stopPropagation(); // Stops immediate window-click auto closures
                accountCard.classList.toggle("active");
            }
        });

        // Safe global dismiss click trigger for mobile devices when clicking outside the menu card
        document.addEventListener("click", (e) => {
            if (accountWrapper && !accountWrapper.contains(e.target)) {
                accountCard.classList.remove("active");
            }
        });
    }
    /* ==========================================================================
       HYBRID MOUSE-TRACKING SHOPPING CART DROPDOWN CONTROLLER
       ========================================================================== */
    const cartTrigger = document.getElementById("cart-icon");
    const cartDropdownCard = document.getElementById("headerCartDropdown");

    if (cartTrigger && cartDropdownCard) {
        // 1. Opens the panel view when mouse sweeps over the icon area
        cartTrigger.addEventListener("mouseenter", () => {
            cartDropdownCard.classList.add("active");
        });

        // 2. Safe zone mouseleave tracking handles transit gaps cleanly
        cartTrigger.addEventListener("mouseleave", () => {
            setTimeout(() => {
                const isHoveringTrigger = cartTrigger.matches(':hover');
                const isHoveringDropdown = cartDropdownCard.matches(':hover');

                if (!isHoveringTrigger && !isHoveringDropdown) {
                    cartDropdownCard.classList.remove("active");
                }
            }, 120);
        });

        cartDropdownCard.addEventListener("mouseleave", () => {
            setTimeout(() => {
                const isHoveringTrigger = cartTrigger.matches(':hover');
                const isHoveringDropdown = cartDropdownCard.matches(':hover');

                if (!isHoveringTrigger && !isHoveringDropdown) {
                    cartDropdownCard.classList.remove("active");
                }
            }, 120);
        });
    }

    /* ==========================================================================
       2. HERO BANNER CAROUSEL LOGIC
       ========================================================================== */
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    
    let currentIndex = 0;
    let isPaused = false;
    let slideInterval = setInterval(nextSlide, 5000);

    function updateSlider() {
        if (!slides.length || !dots.length) return;
        slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function nextSlide() {
        if (!slides.length) return;
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        if (!slides.length) return;
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Connect event listeners to your slider arrow buttons
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    // Connect event listener to your slide pause button control
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            // Swaps the inner icon dynamically using data attributes
            pauseBtn.innerHTML = isPaused ? '<i data-lucide="play"></i>' : '<i data-lucide="pause"></i>';
            isPaused ? clearInterval(slideInterval) : slideInterval = setInterval(nextSlide, 5000);
            
            // Re-run icon generator specifically for the newly swapped play/pause icon
            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }
        });
    }

    function resetTimer() {
        if (!isPaused) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
    }
});

/* ==========================================================================
   INFINITE PRODUCTS GRID RENDER & REAL-TIME CART ENGINE
   ========================================================================== */
const mockProducts = [
    { title: "Smart Waterproof Fitness Tracker Watch with Heart Rate Monitor", price: "TSh 65,000", img: "Images/placeholder.png", rating: "4.9", sales: "5,000+ sold" },
    { title: "Premium Dynamic Noise Cancelling Earbuds Wireless Stereo", price: "TSh 55,000", img: "Images/placeholder.png", rating: "4.6", sales: "800+ sold" },
    { title: "Mechanical Backlit Ergonomic Gaming Keyboard Blue Switches", price: "TSh 85,000", img: "Images/placeholder.png", rating: "4.8", sales: "1,400+ sold" },
    { title: "High-Speed Wide Angle Dual Lens Dashcam Vehicle Recorder", price: "TSh 95,000", img: "Images/placeholder.png", rating: "4.4", sales: "320+ sold" },
    { title: "Foldable Mini Drone with 4K HD Camera Live Video FPV Wide", price: "TSh 150,000", img: "Images/placeholder.png", rating: "4.7", sales: "670+ sold" }
];

const gridContainer = document.getElementById('infiniteProductGrid');
const loader = document.getElementById('infiniteLoader');
let isFetching = false;
let currentCartCount = 0; 

function appendMoreProducts() {
    if (!gridContainer || !loader) return;
    
    isFetching = true;
    loader.classList.add('active');

    setTimeout(() => {
        mockProducts.forEach(item => {
           const cardHTML = `
                <div class="ebay-product-card">
                    <div class="market-img-box" style="position: relative;">
                        <button class="ps-watchlist-btn" aria-label="Add to watchlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <img src="${item.img}" alt="Product Image">
                        <button class="ps-image-cart-btn" aria-label="Add to cart">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                    <div class="ebay-product-details">
                        <h3 class="ebay-item-title">${item.title}</h3>
                        <p class="ebay-item-price">${item.price}</p>
                        <div class="ebay-rating-row">
                            <span class="ebay-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </span>
                            <span class="ebay-rating-value">${item.rating}</span>
                            <span class="ebay-sales-count">${item.sales}</span>
                        </div>
                    </div>
                    <!-- Added Preview Button Element Wrapper for dynamic cards -->
                    <div class="card-preview-footer">
                        <button class="see-preview-btn">See preview</button>
                    </div>
                </div>
            `;
            gridContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        isFetching = false;
        loader.classList.remove('active');
        
        bindCartInteractionTriggers();
    }, 1000);
}

function bindCartInteractionTriggers() {
    const cartButtons = document.querySelectorAll('.ps-image-cart-btn');
    const cartBadge = document.querySelector('.cart-wrapper .badge, [class*="cart"] .badge, .fa-shopping-cart');

    cartButtons.forEach(button => {
        if (button.getAttribute('data-linked') === 'true') return;
        button.setAttribute('data-linked', 'true');

        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            currentCartCount++;

            // 🚀 1. Show bold "+" sign temporarily inside the clicked cart button icon
            const iconElement = button.querySelector('i');
            if (iconElement) {
                const originalClass = iconElement.className;
                iconElement.className = "fas fa-plus";
                iconElement.style.fontWeight = "900";
                setTimeout(() => {
                    iconElement.className = originalClass;
                    iconElement.style.fontWeight = "";
                }, 800);
            }

            // 🚀 2. Show floating "Added to Cart" popup notification near product image container
            const productBox = button.closest('.market-img-box') || button.closest('.ebay-product-card');
            if (productBox) {
                // Ensure parent has relative positioning for absolute toast placement
                productBox.style.position = 'relative';
                
                const toast = document.createElement('div');
                toast.className = 'ps-added-toast';
                toast.innerText = 'Added to Cart ✓';
                productBox.appendChild(toast);

                // Trigger smooth fade-in animation
                setTimeout(() => toast.classList.add('show'), 10);

                // Remove toast after a split second
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 200);
                }, 1000);
            }

            // Update badge count animation if present
            if (cartBadge) {
                cartBadge.style.transform = 'scale(1.4)';
                cartBadge.style.transition = 'transform 0.1s ease-out';
                setTimeout(() => {
                    cartBadge.style.transform = 'scale(1)';
                }, 120);
            }

            if (typeof refreshCartDropdownView === "function") {
                refreshCartDropdownView();
            }
        });
    });
}

window.addEventListener('scroll', () => {
    if (isFetching) return;
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 600) {
        appendMoreProducts();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    bindCartInteractionTriggers();
});

/* ==========================================================================
   SEARCH BY CAMERA MODAL INTERACTION LOGIC (eBay Style)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const cameraBtn = document.getElementById("openCameraSearch");
    const modalOverlay = document.getElementById("imageSearchModal");
    const closeModalBtn = document.getElementById("closeSearchModal");
    const dropZone = document.getElementById("uploadDropZone");
    const fileInput = document.getElementById("imageFileInput");
    const browseLink = document.getElementById("browseFileLink");
    const urlInput = document.getElementById("imageUrlInput");
    const submitUrlBtn = document.getElementById("submitUrlBtn");

    if (cameraBtn && modalOverlay) {
        cameraBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modalOverlay.classList.add("active");
        });
    }

    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener("click", () => {
            modalOverlay.classList.remove("active");
        });

        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove("active");
            }
        });
    }

    if (browseLink && fileInput) {
        browseLink.addEventListener("click", (e) => {
            e.stopPropagation();
            fileInput.click();
        });
    }

    if (dropZone && fileInput) {
        dropZone.addEventListener("click", () => {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                processSelectedImage(e.target.files[0]);
            }
        });
    }

    if (dropZone) {
        ["dragenter", "dragover"].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropZone.classList.add("dragover");
            }, false);
        });

        ["dragleave", "drop"].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropZone.classList.remove("dragover");
            }, false);
        });

        dropZone.addEventListener("drop", (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                processSelectedImage(files[0]);
            }
        });
    }

    if (submitUrlBtn && urlInput) {
        submitUrlBtn.addEventListener("click", () => {
            const urlValue = urlInput.value.trim();
            if (urlValue) {
                alert(`PalmSokoni searching database for image link:\n${urlValue}`);
                modalOverlay.classList.remove("active");
                urlInput.value = "";
            }
        });
    }

    function processSelectedImage(file) {
        if (file.type.startsWith("image/")) {
            alert(`File successfully received!\nName: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB\n\nPalmSokoni image recognition search would activate here.`);
            modalOverlay.classList.remove("active");
        } else {
            alert("Error: Please drop or select a valid image file format.");
        }
    }
});
/* ==========================================================================
   REAL-TIME WATCHLIST COUNTER & INTERACTION CONTROLLER
   ========================================================================== */

let currentWatchlistCount = 0; // Globally managed counter ledger variable

function bindWatchlistInteractionTriggers() {
    const watchlistButtons = document.querySelectorAll('.ps-watchlist-btn');
    
    // 🎯 HEADER TARGET SELECTION: Finds the badge directly bound to your top orange heart icon
    const headerHeartBadge = document.querySelector('.fa-heart + span, [class*="heart"] .badge, .wishlist-badge');

    watchlistButtons.forEach(button => {
        // Stop repetitive duplication binds on infinite scroll loop re-runs
        if (button.getAttribute('data-watchlist-linked') === 'true') return;
        button.setAttribute('data-watchlist-linked', 'true');

        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation(); // Stops link clicks from executing parent product detail router hits

            const heartIcon = button.querySelector('i');
            
            // Check if item is already added to watchlist
            if (!button.classList.contains('active')) {
                // 1. ADD TO WATCHLIST ACTION
                button.classList.add('active');
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas'); // Changes font class structure to solid mode
                currentWatchlistCount++;
            } else {
                // 2. REMOVE FROM WATCHLIST ACTION (TOGGLE BACK)
                button.classList.remove('active');
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far'); // Restores hollow line frame mode
                currentWatchlistCount--;
            }

            // 3. HEADER BADGE STATE RENDERING DEPLOYMENT LAYER
            if (headerHeartBadge) {
                headerHeartBadge.textContent = currentWatchlistCount;
                
                // If watchlist count drops back to zero, hide or clear out badge numbers cleanly
                if (currentWatchlistCount <= 0) {
                    headerHeartBadge.textContent = '0';
                    currentWatchlistCount = 0; // Boundary safety lock clamp
                }

                // Spring physics pop animation applied directly to the top header notification area
                headerHeartBadge.style.transform = 'scale(1.4)';
                headerHeartBadge.style.transition = 'transform 0.1s ease-out';
                headerHeartBadge.style.display = 'inline-block';
                
                setTimeout(() => {
                    headerHeartBadge.style.transform = 'scale(1)';
                }, 120);
            } else {
                console.warn("Watchlist target header badge could not be resolved. Ensure layout icon contains an inner numeric layout node container.");
            }
        });
    });
}

// Attach listeners on load
document.addEventListener('DOMContentLoaded', () => {
    bindWatchlistInteractionTriggers();
});

// Update your dynamic Scroll Template (if utilizing append functions) to append the heart markup:
/*
    const cardHTML = `
        <div class="ebay-product-card">
            <div class="market-img-box">
                <button class="ps-watchlist-btn" aria-label="Add to watchlist"><i class="far fa-heart"></i></button>
                <img src="${item.img}">
                <button class="ps-image-cart-btn"><i class="fas fa-shopping-cart"></i></button>
            </div>
        </div>
    `;
*/
function refreshCartDropdownView() {
    const dropdownContainer = document.getElementById('headerCartDropdown');
    if (!dropdownContainer) return;

    if (currentCartCount > 0) {
        // 🚀 Improved Populated Cart Menu Layout
        dropdownContainer.innerHTML = `
            <div class="ps-cart-dropdown-header">
                <span>Shopping Cart (${currentCartCount})</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px 0; text-align: center; flex-grow: 1;">
                <div style="background-color: #f8fafc; border-radius: 8px; width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1e293b;">
                        Item(s) added successfully!
                    </p>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">
                        Total items in cart: <strong>${currentCartCount}</strong>
                    </p>
                </div>
                <a href="cart.html" class="ps-go-to-cart-btn" style="display: block; width: 100%; background-color: #ff6600 !important; color: #ffffff !important; border: none !important; text-align: center; border-radius: 24px; padding: 10px 0; font-weight: 600; text-decoration: none;">
                    View Cart &amp; Checkout
                </a>
            </div>
        `;
    } else {
        // Empty State Layout
        dropdownContainer.innerHTML = `
            <div class="ps-cart-dropdown-header">
                <span>Shopping Cart</span>
            </div>
            <div class="ps-dropdown-empty-state">
                <div class="ps-empty-cart-icon">
                    <img src="Images/Category icons/cartic.jpg" alt="Empty Cart" class="ps-3d-cart-img">
                </div>
                <p class="ps-empty-text">Your cart is empty</p>
                <a href="cart.html" class="ps-go-to-cart-btn">Go to cart</a>
            </div>
        `;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        // 🚀 1. NEW STATE CHECK ON PAGE LOAD: Check if dark mode was previously saved
        const isDarkModeSaved = localStorage.getItem('theme') === 'dark';
        const iconElement = darkModeToggle.querySelector('[data-lucide]');

        if (isDarkModeSaved) {
            document.body.classList.add('dark-mode');
            if (iconElement) iconElement.setAttribute('data-lucide', 'sun');
        } else {
            document.body.classList.remove('dark-mode');
            if (iconElement) iconElement.setAttribute('data-lucide', 'moon');
        }

        // Force Lucide to render the correct icon state immediately on page load
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // 2. UPDATED CLICK HANDLER: Save the state whenever the user toggles it
        darkModeToggle.addEventListener('click', () => {
            // Toggle the dark-mode class on the body element
            document.body.classList.toggle('dark-mode');
            
            // Handle Lucide Icon Swapping & LocalStorage Save
            const currentIcon = darkModeToggle.querySelector('[data-lucide]');
            if (document.body.classList.contains('dark-mode')) {
                if (currentIcon) currentIcon.setAttribute('data-lucide', 'sun');
                localStorage.setItem('theme', 'dark'); // 🚀 Saves state as dark
            } else {
                if (currentIcon) currentIcon.setAttribute('data-lucide', 'moon');
                localStorage.setItem('theme', 'light'); // 🚀 Saves state as light
            }
            
            // Forces Lucide script to re-render the SVG icons on screen
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Dropdown structural anchors
    const watchlistTrigger = document.getElementById('watchlistTrigger');
    const watchlistPanel = document.getElementById('watchlistPanel');
    const watchlistWrapper = document.getElementById('watchlistWrapper');
    
    // Dynamic state anchors
    const watchlistBadge = document.getElementById('watchlistBadge');
    const emptyState = document.getElementById('watchlistEmptyState');
    const populatedState = document.getElementById('watchlistPopulatedState');
    const itemsList = document.getElementById('watchlistItemsList');

    // Array to track unique added product titles to prevent duplicates
    let trackedWatchlistItems = [];

    /* ==========================================================================
       A. INTERACTIVE PANEL TOGGLE & AUTO-CLOSE
       ========================================================================== */
    watchlistTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        watchlistPanel.classList.toggle('show');
    });

    watchlistWrapper.addEventListener('mouseleave', () => {
        watchlistPanel.classList.remove('show');
    });

    document.addEventListener('click', (event) => {
        if (!watchlistWrapper.contains(event.target)) {
            watchlistPanel.classList.remove('show');
        }
    });

    /* ==========================================================================
       B. PRODUCT CONTAINER "ADD TO WATCHLIST" ACTION DETECTOR
       ========================================================================== */
    // Using event delegation to capture clicks on any current or future product card heart buttons
    document.body.addEventListener('click', (event) => {
        // Look for your product layout's specific watchlist trigger button class
        const addBtn = event.target.closest('.add-to-watchlist-btn');
        if (!addBtn) return;

        event.preventDefault();

        // Find the parent product box container card to scrap the matching data fields
        const productCard = addBtn.closest('.product-box') || addBtn.closest('.product-card');
        if (!productCard) return;

        // Extract real data from the specific item clicked
        const itemImgSrc = productCard.querySelector('img')?.src || 'Images/Products/placeholder.jpg';
        const itemTitle = productCard.querySelector('.product-title')?.innerText.trim() || 'Premium Marketplace Product';
        const itemPrice = productCard.querySelector('.product-price')?.innerText.trim() || '$0.00';

        // Guard clause: Prevent users from spamming the same item onto the dropdown list multiple times
        if (trackedWatchlistItems.includes(itemTitle)) {
            alert('This item is already in your watchlist!');
            return;
        }

        // Register the title to our tracking array
        trackedWatchlistItems.push(itemTitle);

        // Update the badge count and make it visible
        const currentCount = trackedWatchlistItems.length;
        watchlistBadge.innerText = currentCount;
        watchlistBadge.style.display = 'inline-block';

        // Build the precise dynamic HTML row layout string matching your exact panel structure
        const itemHTML = `
            <li class="watchlist-item-card">
                <a href="#" class="item-img-link">
                    <img src="${itemImgSrc}" alt="Thumbnail">
                </a>
                <div class="item-details-info">
                    <a href="#" class="item-title-text">${itemTitle}</a>
                    <div class="item-price-meta">
                        <span class="current-price">${itemPrice}</span>
                        <span class="shipping-tag">Free Shipping</span>
                    </div>
                    <div class="item-status-pill price-drop">Added just now</div>
                </div>
            </li>
        `;

        // Prepend the new card to the list (so newest additions appear at the top)
        itemsList.insertAdjacentHTML('afterbegin', itemHTML);

        // State Machine Switch: Hide empty viewport wrapper and show populated item listing framework
        if (currentCount === 1) {
            emptyState.classList.remove('active');
            populatedState.classList.add('active');
        }
        
        // Optional: Provide instant satisfying feedback by briefly flashing an active state indicator on the main target icon button
        addBtn.style.color = '#e11d48'; 
    });
});
// ==========================================================================
// CAROUSEL SLIDER CONTROLLER MECHANICS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('recentTrack');
    const leftArrow = document.getElementById('recentLeft');
    const rightArrow = document.getElementById('recentRight');

    // Only run the script if all elements exist safely on the page layout
    if (track && leftArrow && rightArrow) {
        
        const getScrollDistance = () => {
            const firstCard = track.querySelector('.ebay-product-card');
            if (!firstCard) return 0;
            
            const cardWidth = firstCard.offsetWidth;
            
            /* ==========================================================================
               FIX: Updated from 5 to 1 to match your 1px CSS gap styling perfectly.
               ========================================================================== */
            const gap = 1; 
            
            // Returns the mathematically perfect width dimension of 5 cards combined with 1px gaps
            return (cardWidth + gap) * 5; 
        };

        // Scroll forward cleanly when clicking the right arrow
        rightArrow.addEventListener('click', () => {
            track.scrollBy({ 
                left: getScrollDistance(), 
                behavior: 'smooth' 
            });
        });

        // Scroll backward cleanly when clicking the left arrow
        leftArrow.addEventListener('click', () => {
            track.scrollBy({ 
                left: -getScrollDistance(), 
                behavior: 'smooth' 
            });
        });
    }
});
// ==========================================================================
// TOP DEALS CAROUSEL CONTROLLER MECHANICS (6 ITEMS SLIDE MACHINE)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const dealsTrack = document.getElementById('dealsTrack');
    const dealsLeft = document.getElementById('dealsLeft');
    const dealsRight = document.getElementById('dealsRight');

    if (dealsTrack && dealsLeft && dealsRight) {
        
        const getDealsScrollDistance = () => {
            const firstDealCard = dealsTrack.querySelector('.deal-card');
            if (!firstDealCard) return 0;
            
            const cardWidth = firstDealCard.offsetWidth;
            const gap = 9; // Matches your 9px alibaba CSS gap layout perfectly
            
            // Calculates the precise width of exactly 6 cards combined with their gaps
            return (cardWidth + gap) * 6; 
        };

        // Scroll 6 items forward
        dealsRight.addEventListener('click', () => {
            dealsTrack.scrollBy({ 
                left: getDealsScrollDistance(), 
                behavior: 'smooth' 
            });
        });

        // Scroll 6 items backward
        dealsLeft.addEventListener('click', () => {
            dealsTrack.scrollBy({ 
                left: -getDealsScrollDistance(), 
                behavior: 'smooth' 
            });
        });
    }
});
// ==========================================================================
// TRENDING NOW SECTION CAROUSEL LOGIC (5-CARD STEPS)
// ==========================================================================
const trendingTrack = document.getElementById('trendingTrack');
const trendingLeft = document.getElementById('trendingLeft');
const trendingRight = document.getElementById('trendingRight');

if (trendingTrack && trendingLeft && trendingRight) {
    
    const getTrendingScrollDistance = () => {
        const firstCard = trendingTrack.querySelector('.ebay-product-card');
        if (!firstCard) return 0;
        
        const cardWidth = firstCard.offsetWidth;
        const gap = 1; // Explicitly set to match your 1px CSS gap configuration
        
        // Computes the exact, clean slide boundary step for exactly 5 cards
        return (cardWidth + gap) * 5;
    };

    // Click tracker to advance carousel 5 items forward
    trendingRight.addEventListener('click', () => {
        trendingTrack.scrollBy({ 
            left: getTrendingScrollDistance(), 
            behavior: 'smooth' 
        });
    });

    // Click tracker to return carousel 5 items back
    trendingLeft.addEventListener('click', () => {
        trendingTrack.scrollBy({ 
            left: -getTrendingScrollDistance(), 
            behavior: 'smooth' 
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const langTrigger = document.getElementById("langDropdownTrigger");
    const curTrigger = document.getElementById("curDropdownTrigger");
    
    const langMenu = langTrigger.querySelector(".localization-menu");
    const curMenu = curTrigger.querySelector(".localization-menu");

    // Helper method to sweep all active panel states shut cleanly
    function closeAllLocalizationMenus() {
        langTrigger.classList.remove("dropdown-open-active");
        curTrigger.classList.remove("dropdown-open-active");
        langMenu.classList.remove("show-menu-click");
        curMenu.classList.remove("show-menu-click");
    }

    // ==========================================
    // LANGUAGE SELECTOR CLICK CONTROLS
    // ==========================================
    langTrigger.addEventListener("click", function(e) {
        e.stopPropagation(); // Stops immediate closing from bubbling events
        
        const isCurrentlyOpen = langMenu.classList.contains("show-menu-click");
        closeAllLocalizationMenus();
        
        if (!isCurrentlyOpen) {
            this.classList.add("dropdown-open-active");
            langMenu.classList.add("show-menu-click");
        }
    });

    langMenu.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", function(e) {
            e.stopPropagation();
            const selectedLang = this.getAttribute("data-lang");

            langMenu.querySelectorAll("li").forEach(el => el.classList.remove("active"));
            this.classList.add("active");

            localStorage.setItem("palmSokoni_lang", selectedLang);
            console.log(`Language selected: ${selectedLang}`);
            
            closeAllLocalizationMenus();

            if (typeof changeLanguage === "function") {
                changeLanguage(selectedLang);
            }
        });
    });

    // ==========================================
    // CURRENCY SELECTOR CLICK CONTROLS
    // ==========================================
    curTrigger.addEventListener("click", function(e) {
        e.stopPropagation();
        
        const isCurrentlyOpen = curMenu.classList.contains("show-menu-click");
        closeAllLocalizationMenus();
        
        if (!isCurrentlyOpen) {
            this.classList.add("dropdown-open-active");
            curMenu.classList.add("show-menu-click");
        }
    });

    curMenu.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", function(e) {
            e.stopPropagation();
            const selectedCurrency = this.getAttribute("data-currency");

            curMenu.querySelectorAll("li").forEach(el => el.classList.remove("active"));
            this.classList.add("active");

            localStorage.setItem("palmSokoni_currency", selectedCurrency);
            console.log(`Currency selected: ${selectedCurrency}`);
            
            closeAllLocalizationMenus();

            if (typeof updatePrices === "function") {
                updatePrices(selectedCurrency);
            }
        });
    });

    // Global Click Handler: Closes menus automatically when clicking outside of them
    document.addEventListener("click", () => {
        closeAllLocalizationMenus();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    const suggestionsDropdown = document.getElementById('searchSuggestions');

    if (!searchInput || !suggestionsDropdown) return;

    // Sample keywords/products database for real-time searching and suggestions
    const searchDatabase = [
        "Smart Fitness Watch with Heart Rate Monitor",
        "Premium Wireless Bluetooth Headphones Noise Cancelling",
        "Ultra Bass Portable Bluetooth Speaker Waterproof",
        "4K Ultra HD Action Camera WiFi Waterproof",
        "Ergonomic Wired Gaming Mouse RGB Backlit",
        "Smart Watches 2026",
        "Smart Watches Man",
        "Smart Watches For Woman",
        "Smart Watch iPhone",
        "Bluetooth Earbuds Wireless",
        "Wireless Charging Pad",
        "Running Shoes",
        "Cotton T-Shirt"
    ];

    // Listen to keystrokes as the user types
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        if (query.length === 0) {
            suggestionsDropdown.style.display = 'none';
            suggestionsDropdown.innerHTML = '';
            return;
        }

        // STRICT PREFIX FILTER: Only match items that START with the typed query letters
        const matches = searchDatabase.filter(item => item.toLowerCase().startsWith(query));

        if (matches.length > 0) {
            // Render matching suggestions with a search icon
            suggestionsDropdown.innerHTML = matches.map(match => `
                <div class="suggestion-item">
                    <i data-lucide="search"></i>
                    <span>${match}</span>
                </div>
            `).join('');
            
            suggestionsDropdown.style.display = 'block';
        } else {
            // Render "No results found" message if nothing starts with the query
            suggestionsDropdown.innerHTML = `
                <div class="no-results-item">
                    No results found
                </div>
            `;
            suggestionsDropdown.style.display = 'block';
        }

        // Refresh icons if using Lucide icon library
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Add click behavior to select a suggestion
        document.querySelectorAll('.suggestion-item').forEach(el => {
            el.addEventListener('click', () => {
                const selectedText = el.querySelector('span').textContent;
                searchInput.value = selectedText;
                suggestionsDropdown.style.display = 'none';
                triggerPageSearch(selectedText);
            });
        });
    });

    // Hide suggestions dropdown when clicking anywhere else on the page
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            suggestionsDropdown.style.display = 'none';
        }
    });

    // Trigger search when clicking the search icon box
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', () => {
            triggerPageSearch(searchInput.value);
            suggestionsDropdown.style.display = 'none';
        });
    }

    // Trigger search on pressing the Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            triggerPageSearch(searchInput.value);
            suggestionsDropdown.style.display = 'none';
        }
    });

    // Function to filter main product cards on your page based on the search query
    function triggerPageSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        const productCards = document.querySelectorAll('.product-card, .swiper-slide, [class*="product"]');

        productCards.forEach(card => {
            const titleEl = card.querySelector('h3, h4, .product-title, p');
            const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';

            if (searchTerm === '' || titleText.includes(searchTerm)) {
                card.style.display = ''; // Show item
            } else {
                card.style.display = 'none'; // Hide item
            }
        });
    }
});