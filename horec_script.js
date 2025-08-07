// Horec Store - Enhanced JavaScript
// Inspired by Wonder Tech with custom interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Language Toggle Functionality
    const languageToggle = document.querySelector('.language-toggle');
    const body = document.body;
    const html = document.documentElement;
    
    // Initialize language state
    let currentLanguage = localStorage.getItem('language') || 'ar';
    setLanguage(currentLanguage);
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
            setLanguage(currentLanguage);
            localStorage.setItem('language', currentLanguage);
            
            // Show notification
            showNotification(
                currentLanguage === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English',
                'success'
            );
        });
    }
    
    function setLanguage(lang) {
        if (lang === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
            body.classList.add('rtl');
            body.classList.remove('ltr');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
            body.classList.add('ltr');
            body.classList.remove('rtl');
        }
        
        // Update language toggle button text
        if (languageToggle) {
            languageToggle.textContent = lang === 'ar' ? 'EN' : 'عربي';
        }
        
        // Update content based on language
        updateContent(lang);
    }
    
    function updateContent(lang) {
        const translations = {
            ar: {
                'nav-home': 'الرئيسية',
                'nav-products': 'المنتجات',
                'nav-services': 'الخدمات',
                'nav-about': 'من نحن',
                'nav-contact': 'اتصل بنا',
                'btn-shop-now': 'تسوق الآن',
                'btn-learn-more': 'اعرف المزيد',
                'hero-title': 'هوريك ستور - متجرك الموثوق',
                'hero-subtitle': 'اكتشف أفضل المنتجات والخدمات الرقمية بأسعار منافسة وجودة عالية',
                'products-title': 'منتجاتنا المميزة',
                'products-subtitle': 'تصفح مجموعة واسعة من المنتجات والخدمات الرقمية',
                'testimonials-title': 'آراء عملائنا',
                'testimonials-subtitle': 'اكتشف تجارب عملائنا الراضين',
                'cta-title': 'جاهز للبدء؟',
                'cta-subtitle': 'انضم إلى آلاف العملاء الراضين واحصل على أفضل الخدمات',
                'cta-button': 'ابدأ التسوق',
                'search-placeholder': 'ابحث عن منتج...',
                'sort-label': 'ترتيب حسب:',
                'filter-all': 'جميع المنتجات',
                'filter-subscriptions': 'الاشتراكات',
                'filter-accounts': 'الحسابات',
                'filter-services': 'الخدمات'
            },
            en: {
                'nav-home': 'Home',
                'nav-products': 'Products',
                'nav-services': 'Services',
                'nav-about': 'About',
                'nav-contact': 'Contact',
                'btn-shop-now': 'Shop Now',
                'btn-learn-more': 'Learn More',
                'hero-title': 'Horec Store - Your Trusted Shop',
                'hero-subtitle': 'Discover the best digital products and services at competitive prices and high quality',
                'products-title': 'Our Featured Products',
                'products-subtitle': 'Browse a wide range of digital products and services',
                'testimonials-title': 'Customer Reviews',
                'testimonials-subtitle': 'Discover the experiences of our satisfied customers',
                'cta-title': 'Ready to Start?',
                'cta-subtitle': 'Join thousands of satisfied customers and get the best services',
                'cta-button': 'Start Shopping',
                'search-placeholder': 'Search for a product...',
                'sort-label': 'Sort by:',
                'filter-all': 'All Products',
                'filter-subscriptions': 'Subscriptions',
                'filter-accounts': 'Accounts',
                'filter-services': 'Services'
            }
        };
        
        // Update text content for elements with data-translate attributes
        Object.keys(translations[lang]).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            });
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const icon = this.querySelector('i') || this;
            if (navMenu.classList.contains('active')) {
                icon.innerHTML = '✕';
                this.style.transform = 'rotate(180deg)';
            } else {
                icon.innerHTML = '☰';
                this.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i') || mobileMenuToggle;
                icon.innerHTML = '☰';
                mobileMenuToggle.style.transform = 'rotate(0deg)';
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(18, 18, 18, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.borderBottom = '2px solid rgba(255, 215, 0, 0.3)';
        } else {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.borderBottom = '1px solid rgba(255, 215, 0, 0.2)';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .section-title, .section-subtitle');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Enhanced Button Hover Effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Product Card Enhanced Hover Effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) rotateY(8deg)';
            this.style.boxShadow = '0 30px 60px rgba(255, 215, 0, 0.25)';
            
            // Animate product image
            const image = this.querySelector('.product-image img');
            if (image) {
                image.style.transform = 'scale(1.15) rotate(2deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.boxShadow = '0 25px 50px rgba(255, 215, 0, 0.2)';
            
            const image = this.querySelector('.product-image img');
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Product Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards2 = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productCards2.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Sort Functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const productsGrid = document.querySelector('.products-grid');
            const cards = Array.from(productsGrid.children);
            
            cards.sort((a, b) => {
                const titleA = a.querySelector('h3').textContent;
                const titleB = b.querySelector('h3').textContent;
                const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
                
                switch(sortValue) {
                    case 'name-asc':
                        return titleA.localeCompare(titleB);
                    case 'name-desc':
                        return titleB.localeCompare(titleA);
                    case 'price-asc':
                        return priceA - priceB;
                    case 'price-desc':
                        return priceB - priceA;
                    default:
                        return 0;
                }
            });
            
            // Re-append sorted cards
            cards.forEach(card => productsGrid.appendChild(card));
        });
    }
    
    // Testimonial Cards Animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.1)';
        });
    });
    
    // Typing Animation for Hero Title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1500);
    }
    
    // Counter Animation for Statistics
    function animateCounter(element, target, duration = 2500) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }
    
    // Animate counters when they come into view
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Enhanced Particle Background Effect
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 4 + 3;
            const delay = Math.random() * 3;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${Math.random() > 0.5 ? '#FFD700' : '#6A0DAD'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.6 + 0.2};
                animation: float ${duration}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${delay}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add enhanced particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.8;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-120vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize particles
    createParticles();
    
    // Shopping Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    function addToCart(productId, productName, productPrice) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        
        showNotification(
            currentLanguage === 'ar' ? 'تم إضافة المنتج إلى السلة' : 'Product added to cart',
            'success'
        );
    }
    
    // Add to cart button functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
            
            addToCart(productId, productName, productPrice);
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialize cart display
    updateCartDisplay();
    
    // Form Validation (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    input.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
                } else {
                    input.style.borderColor = '#FFD700';
                    input.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
                }
            });
            
            if (isValid) {
                showNotification(
                    currentLanguage === 'ar' ? 'تم إرسال النموذج بنجاح' : 'Form submitted successfully',
                    'success'
                );
            } else {
                showNotification(
                    currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
                    'error'
                );
            }
        });
    });
    
    // Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Theme Toggle (if needed)
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    }
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    // Add theme toggle button functionality if it exists
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Additional scroll handling if needed
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Preloader (if exists)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
    
    // Initialize all animations and effects
    console.log('Horec Store website initialized successfully!');
});

// Additional utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #FFD700, #FFA500)' : 'linear-gradient(45deg, #ff4444, #cc0000)'};
        color: ${type === 'success' ? '#121212' : '#ffffff'};
        padding: 15px 25px;
        border-radius: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        max-width: 300px;
        word-wrap: break-word;
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
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Advanced product filtering
function filterProducts(category, priceRange, rating) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productPrice = parseFloat(product.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
        const productRating = parseFloat(product.getAttribute('data-rating') || '5');
        
        let showProduct = true;
        
        // Category filter
        if (category && category !== 'all' && productCategory !== category) {
            showProduct = false;
        }
        
        // Price range filter
        if (priceRange && priceRange.length === 2) {
            if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
                showProduct = false;
            }
        }
        
        // Rating filter
        if (rating && productRating < rating) {
            showProduct = false;
        }
        
        if (showProduct) {
            product.style.display = 'block';
            product.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            product.style.display = 'none';
        }
    });
}

// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('تم إزالة المنتج من المفضلة', 'success');
    } else {
        wishlist.push(productId);
        showNotification('تم إضافة المنتج إلى المفضلة', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
}

function updateWishlistDisplay() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
        const productId = button.getAttribute('data-product-id');
        if (wishlist.includes(productId)) {
            button.classList.add('active');
            button.innerHTML = '❤️';
        } else {
            button.classList.remove('active');
            button.innerHTML = '🤍';
        }
    });
}

// Initialize wishlist display
document.addEventListener('DOMContentLoaded', function() {
    updateWishlistDisplay();
});

// Product comparison functionality
let comparison = JSON.parse(localStorage.getItem('comparison')) || [];

function addToComparison(productId) {
    if (comparison.length >= 3) {
        showNotification('يمكن مقارنة 3 منتجات كحد أقصى', 'error');
        return;
    }
    
    if (!comparison.includes(productId)) {
        comparison.push(productId);
        localStorage.setItem('comparison', JSON.stringify(comparison));
        showNotification('تم إضافة المنتج للمقارنة', 'success');
        updateComparisonDisplay();
    }
}

function updateComparisonDisplay() {
    const comparisonCount = document.querySelector('.comparison-count');
    if (comparisonCount) {
        comparisonCount.textContent = comparison.length;
    }
}

// Initialize comparison display
document.addEventListener('DOMContentLoaded', function() {
    updateComparisonDisplay();
});

