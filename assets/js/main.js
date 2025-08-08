document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Owl Carousel for Hero Slider
    $(document).ready(function(){
        // Only initialize the carousel once
        if ($('.hero-slider').data('owl.carousel')) {
            $('.hero-slider').trigger('destroy.owl.carousel');
        }
        
        $('.hero-slider').owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 6000,
            smartSpeed: 1000,
            autoplayHoverPause: true
        });
        
        // Custom navigation with car icons
        $('.hero-slide-nav .nav-dot').click(function(){
            var slideIndex = $(this).data('slide');
            $('.hero-slider').trigger('to.owl.carousel', [slideIndex, 300]);
        });
        
        // Update active car icon on slide change
        $('.hero-slider').on('changed.owl.carousel', function(event) {
            var current = event.item.index;
            if (event.relatedTarget._clones && event.item.count) {
                current = (current - event.relatedTarget._clones.length / 2) % event.item.count;
                current = (current + event.item.count) % event.item.count;
            }
            $('.hero-slide-nav .nav-dot').removeClass('active');
            $('.hero-slide-nav .nav-dot[data-slide="' + current + '"]').addClass('active');
        });

        // Car Type Slider
        $('.car-type-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4,
                },
                1200: {
                    items: 6
                }
            }
        });
        
        // Custom navigation for car type slider
        $('.car-type-nav .next').click(function() {
            $('.car-type-slider').trigger('next.owl.carousel');
        });
        
        $('.car-type-nav .prev').click(function() {
            $('.car-type-slider').trigger('prev.owl.carousel');
        });
    });

    // Initialize any carousels or dynamic elements
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Add active class to nav items on scroll
    window.addEventListener('scroll', function() {
        // Intentionally left empty to prevent automatic active class application
        // The active class will only be applied based on what's in the HTML
    });

    // Theme color switcher function (example of dynamic CSS variables)
    function setThemeColor(primaryColor, primaryHover) {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--primary-hover', primaryHover);
        
        // Save preference in localStorage
        localStorage.setItem('autovault-primary-color', primaryColor);
        localStorage.setItem('autovault-primary-hover', primaryHover);
    }
    
    // Check if user has a saved preference
    const savedPrimaryColor = localStorage.getItem('autovault-primary-color');
    const savedPrimaryHover = localStorage.getItem('autovault-primary-hover');
    
    if (savedPrimaryColor && savedPrimaryHover) {
        setThemeColor(savedPrimaryColor, savedPrimaryHover);
    }
    
    // Add theme switcher buttons (just for demonstration)
    // You can add these buttons in your HTML and call the function on click
    // For example:
    // <button onclick="setThemeColor('#ff4d30', '#e73c1e')">Orange Theme</button>
    // <button onclick="setThemeColor('#3067ff', '#1e4de7')">Blue Theme</button>
    
    // Example of how to expose the function globally
    window.setThemeColor = setThemeColor;

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Filter buttons in inventory section
    const filterBtns = document.querySelectorAll('.inventory-filters .btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Popular listings filter buttons
    const listingBtns = document.querySelectorAll('.btn-filter');
    listingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            listingBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add to wishlist functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ff4d30';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '#777';
            }
        });
    });

    // Hero section carousel dots
    const heroDots = document.querySelectorAll('.hero-dots .dot');
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            heroDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            // Here you would add logic to change the hero image
            // For example: document.querySelector('.hero-section').style.backgroundImage = 'url(assets/images/hero-' + index + '.jpg)';
        });
    });
    
    // Back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            document.querySelector('.back-to-top').classList.add('show');
        } else {
            document.querySelector('.back-to-top').classList.remove('show');
        }
    });

    // Animated counting for stats
    function animateCounter() {
        const counters = document.querySelectorAll('.stats-item h3');
        if (!counters.length) return;
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.innerText.replace(/[^0-9]/g, ''));
                    let count = 0;
                    const interval = setInterval(() => {
                        target.innerText = count + (target.innerText.includes('+') ? '+' : '');
                        if (count >= countTo) {
                            clearInterval(interval);
                            target.innerText = countTo + (target.innerText.includes('+') ? '+' : '');
                        }
                        count = count + Math.ceil(countTo / 20);
                    }, 70);
                    observer.unobserve(target);
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Call the counter animation function
    window.addEventListener('load', animateCounter);    // Brand filter functionality for switching between carousels
    const brandBtns = document.querySelectorAll('.brand-filter .brand-btn');
    const listingsCarousels = document.querySelectorAll('.listings-slider');
    
    brandBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Update active button
            brandBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get the selected brand name and show the corresponding carousel
            const brand = this.querySelector('.brand-name').textContent.toLowerCase();
            const carouselId = `${brand}-listings`.replace(/\s+/g, '-');
            
            // Hide all carousels first
            listingsCarousels.forEach(carousel => {
                carousel.style.display = 'none';
                
                // Destroy the owl carousel instance to prevent duplicate initialization
                if ($(carousel).data('owl.carousel')) {
                    $(carousel).trigger('destroy.owl.carousel');
                }
            });
              // Show the selected carousel
            const selectedCarousel = document.getElementById(carouselId);
            if (selectedCarousel) {
                selectedCarousel.style.display = 'block';
                
                // Initialize the carousel for the selected brand
                $(selectedCarousel).owlCarousel({
                    loop: true,
                    margin: 20,
                    nav: false,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 2 },
                        992: { items: 3 },
                        1200: { items: 4 }
                    }
                });
                
                // Update navigation buttons to work with this carousel
                if (prevBtn && nextBtn) {
                    prevBtn.onclick = function() {
                        $(selectedCarousel).trigger('prev.owl.carousel');
                    };
                    
                    nextBtn.onclick = function() {
                        $(selectedCarousel).trigger('next.owl.carousel');
                    };
                }
                
                console.log(`Showing ${brand} listings`);
            } else {
                console.log(`No carousel found for ${brand}`);
                // Show the default Audi carousel if the selected brand doesn't have one
                const defaultCarousel = document.getElementById('audi-listings');
                if (defaultCarousel) {
                    defaultCarousel.style.display = 'block';
                    $(defaultCarousel).owlCarousel({
                        loop: true,
                        margin: 20,
                        nav: false,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplayHoverPause: true,
                        responsive: {
                            0: { items: 1 },
                            576: { items: 2 },
                            992: { items: 3 },
                            1200: { items: 4 }
                        }
                    });
                }
            }
        });
    });
      // Popular listings navigation buttons setup
    const prevBtn = document.querySelector('.listings-nav-btn.prev');
    const nextBtn = document.querySelector('.listings-nav-btn.next');
    
    // Initialize all carousels but keep them hidden except the default
    $('.listings-slider').each(function() {
        const isDefault = this.id === 'audi-listings';
        
        if (!isDefault) {
            $(this).css('display', 'none');
        }
        
        // Initialize owl carousel
        $(this).owlCarousel({
            loop: true,
            margin: 20,
            nav: false,
            dots: false,
            autoplay: isDefault, // Only autoplay the visible one
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 1 },
                576: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 }
            }
        });
    });
    
    if (prevBtn && nextBtn) {
        // Function to determine which carousel is currently visible
        function getCurrentCarousel() {
            const visibleCarousel = Array.from(listingsCarousels).find(carousel => 
                carousel.style.display !== 'none'
            );
            return visibleCarousel || document.getElementById('audi-listings');
        }
        
        prevBtn.addEventListener('click', function() {
            const currentCarousel = getCurrentCarousel();
            $(currentCarousel).trigger('prev.owl.carousel');
        });
        
        nextBtn.addEventListener('click', function() {
            const currentCarousel = getCurrentCarousel();
            $(currentCarousel).trigger('next.owl.carousel');
        });
    }

    // Initialize testimonials slider
    $('.testimonials-slider').owlCarousel({
        center: true,
        items: 3,
        loop: true,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        },
        dots: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000
    });
});

// Filter buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            carCards.forEach(card => {
                const carStatus = card.querySelector('.car-feature span').textContent.toLowerCase();
                card.style.display = 'none';
                card.closest('.col-lg-3').style.display = 'none';
                
                if (filterValue === 'all' || carStatus === filterValue) {
                    card.style.display = 'block';
                    card.closest('.col-lg-3').style.display = 'block';
                }
            });
        });
    });
});

// Quick View Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quickViewBtns = document.querySelectorAll('.action-buttons .quick-view-btn');
    const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.car-card');
            
            // Get car details
            const image = card.querySelector('.car-img img').src;
            const title = card.querySelector('.car-title').textContent;
            const price = card.querySelector('.car-price').textContent;
            const year = card.querySelector('.car-meta .year').textContent;
            const transmission = card.querySelector('.car-meta .transmission').textContent;
            const fuel = card.querySelector('.car-meta .fuel').textContent;
            const detailsLink = card.querySelector('a').href;

            // Update modal content
            const modal = document.getElementById('quickViewModal');
            modal.querySelector('.car-preview-img img').src = image;
            modal.querySelector('.car-preview-img img').alt = title;
            modal.querySelector('.car-title').textContent = title;
            modal.querySelector('.car-price').textContent = price;
            modal.querySelector('.year').textContent = year;
            modal.querySelector('.transmission').textContent = transmission;
            modal.querySelector('.fuel').textContent = fuel;
            modal.querySelector('.btn-primary').href = detailsLink;

            // Show modal
            quickViewModal.show();
        });
    });
});

// Quick View Modal Carousel
document.addEventListener('DOMContentLoaded', function() {
    const quickViewBtns = document.querySelectorAll('.action-buttons .quick-view-btn');
    const quickViewModal = document.getElementById('quickViewModal');
    
    // Initialize main preview carousel
    $('.car-preview-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ]
    });

    // Initialize thumbnail carousel
    $('.preview-thumbs').owlCarousel({
        items: 3,
        loop: false,
        margin: 10,
        nav: false,
        dots: false
    });

    // Handle quick view button click
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.car-card');
            const mainImg = card.querySelector('.car-img img').src;
            
            // Get different views of the car (you can replace these with actual different angles)
            const sideView = mainImg;
            const interiorView = mainImg;
            
            // Update carousel assets/images
            const mainPreview = quickViewModal.querySelector('.main-preview');
            const sidePreview = quickViewModal.querySelector('.side-view');
            const interiorPreview = quickViewModal.querySelector('.interior-view');
            
            mainPreview.src = mainImg;
            sidePreview.src = sideView;
            interiorPreview.src = interiorView;
            
            // Update thumbnails
            const thumbs = quickViewModal.querySelectorAll('.preview-thumbs img');
            thumbs[0].src = mainImg;
            thumbs[1].src = sideView;
            thumbs[2].src = interiorView;
            
            // Show modal
            new bootstrap.Modal(quickViewModal).show();
        });
    });
});

// Copy link functionality
document.querySelectorAll('.copy-link').forEach(button => {
    button.addEventListener('click', function() {        const card = this.closest('.car-card');
        const carLink = card.querySelector('.car-title a').href;
        const fullUrl = carLink;
        
        navigator.clipboard.writeText(fullUrl).then(() => {
            // Show the copy alert
            const alertEl = this.closest('.car-img').querySelector('.copy-alert');
            alertEl.style.opacity = '1';
            
            // Hide the alert after 2 seconds
            setTimeout(() => {
                alertEl.style.opacity = '0';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});

// Link to tick icon functionality
document.querySelectorAll('.action-buttons .fa-link').forEach(icon => {
    icon.parentElement.addEventListener('click', function() {
        const card = this.closest('.car-card');
        const carLink = card.querySelector('.car-title a').href;
        
        navigator.clipboard.writeText(carLink).then(() => {
            // Change to tick icon
            icon.classList.remove('fa-link');
            icon.classList.add('fa-check');
            
            // Revert back to link icon after 1 second
            setTimeout(() => {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-link');
            }, 1000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});

// Bike Quick View Modal Function
$(document).ready(function() {
    // Initialize bike preview carousel
    var bikePreviewCarousel = $('.bike-preview-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>']
    });
    
    // Initialize bike thumbnails carousel
    $('.bike-preview-thumbs').owlCarousel({
        items: 3,
        loop: false,
        margin: 10,
        nav: false,
        dots: false
    });
    
    // Handle thumbnail clicks using event delegation
    $(document).on('click', '#bikeQuickViewModal .bike-preview-thumbs .item', function() {
        var index = $(this).index();
        bikePreviewCarousel.trigger('to.owl.carousel', [index, 300]);
    });
    
    // Handle bike quick view modal
    $('#bikeQuickViewModal').on('show.bs.modal', function (e) {
        setTimeout(function() {
            // Reinitialize carousels after modal is fully visible
            $('.bike-preview-carousel').trigger('refresh.owl.carousel');
            $('.bike-preview-thumbs').trigger('refresh.owl.carousel');
            
            // Add visual indicator for thumbnail selection
            $('#bikeQuickViewModal .bike-preview-thumbs .item').removeClass('active-thumb');
            $('#bikeQuickViewModal .bike-preview-thumbs .item:first-child').addClass('active-thumb');
        }, 300);
        
        var button = $(e.relatedTarget);
        var bikeCard = button.closest('.car-card');
        
        // Get bike info
        var bikeTitle = bikeCard.find('h5 a').text();
        var bikePrice = bikeCard.find('.car-price').text();
        var bikeImage = bikeCard.find('.bikes-img img').attr('src');
        
        // Set bike info in modal
        var modal = $(this);
        modal.find('.bike-title').text(bikeTitle);
        modal.find('.bike-price').text(bikePrice);
        
        // Get and set specs
        var ccMatch = bikeCard.find('.car-meta span:contains("cc")').text();
        var engineSize = ccMatch ? ccMatch.trim() : '1000cc';
        modal.find('.engine-size').text(engineSize);
        
        // Update bike assets/images
        var bikeimages = [
            bikeImage,
            'assets/images/bike1.jpg',
            'assets/images/bike2.jpg'
        ];
        
        // Set carousel and thumbnail assets/images
        modal.find('.bike-preview-carousel .item img, .bike-preview-thumbs .item img').each(function(index) {
            $(this).attr('src', bikeimages[index % bikeimages.length]);
        });
    });
    
    // Track active thumbnail when main carousel changes
    $('.bike-preview-carousel').on('changed.owl.carousel', function(event) {
        var current = event.item.index - event.relatedTarget._clones.length / 2;
        current = (current + event.item.count) % event.item.count;
        $('#bikeQuickViewModal .bike-preview-thumbs .item').removeClass('active-thumb');
        $('#bikeQuickViewModal .bike-preview-thumbs .item:eq(' + current + ')').addClass('active-thumb');
    });
});

// Car Listing Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Price Range Slider
    const priceRange = document.querySelector('.clf-filter-section input[max="99999"]');
    const priceValues = priceRange.parentElement.querySelector('.clf-range-values');
    
    priceRange.addEventListener('input', function() {
        const value = this.value;
        const spans = priceValues.getElementsByTagName('span');
        spans[0].textContent = '$' + '0';
        spans[2].textContent = '$' + value;
        priceValues.classList.add('updating');
    });

    priceRange.addEventListener('change', function() {
        setTimeout(() => priceValues.classList.remove('updating'), 500);
        filterCars();
    });

    // Mileage Range Slider
    const mileageRange = document.querySelector('.clf-filter-section input[max="500000"]');
    const mileageValues = mileageRange.parentElement.querySelector('.clf-range-values');
    
    mileageRange.addEventListener('input', function() {
        const value = this.value;
        const spans = mileageValues.getElementsByTagName('span');
        spans[0].textContent = '0';
        spans[2].textContent = value;
        mileageValues.classList.add('updating');
    });

    mileageRange.addEventListener('change', function() {
        setTimeout(() => mileageValues.classList.remove('updating'), 500);
        filterCars();
    });

    // Body Type Buttons
    const bodyTypeBtns = document.querySelectorAll('.clf-body-type-btn');
    bodyTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            filterCars();
        });
    });

    // Select Dropdowns
    const filterSelects = document.querySelectorAll('.clf-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', filterCars);
    });

    // Reset Button
    const resetBtn = document.querySelector('.clf-reset-btn');
    resetBtn.addEventListener('click', function() {
        // Reset all filters
        filterSelects.forEach(select => select.selectedIndex = 0);
        bodyTypeBtns.forEach(btn => btn.classList.remove('active'));
        priceRange.value = priceRange.max;
        mileageRange.value = mileageRange.max;
        
        // Update range displays
        const priceSpans = priceValues.getElementsByTagName('span');
        priceSpans[0].textContent = '$0';
        priceSpans[2].textContent = '$99,999';
        
        const mileageSpans = mileageValues.getElementsByTagName('span');
        mileageSpans[0].textContent = '0';
        mileageSpans[2].textContent = '500000';

        // Animation feedback
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 500);

        filterCars();
    });

    function filterCars() {
        // Get all filter values
        const make = document.querySelector('.clf-filter-section:nth-child(1) select').value;
        const price = priceRange.value;
        const bodyTypes = Array.from(document.querySelectorAll('.clf-body-type-btn.active'))
            .map(btn => btn.textContent.trim().split('\n')[0]);
        const fuelType = document.querySelector('.clf-filter-section:nth-child(4) select').value;
        const transmission = document.querySelector('.clf-filter-section:nth-child(5) select').value;
        const mileage = mileageRange.value;
        const condition = document.querySelector('.clf-filter-section:nth-child(8) select').value;

        // Get all car cards
        const carCards = document.querySelectorAll('.clc-card');
        
        carCards.forEach(card => {
            let shouldShow = true;
            const cardInfo = {
                make: card.querySelector('.clc-title').textContent,
                price: parseInt(card.querySelector('.clc-current-price').textContent.replace('$', '')),
                fuel: card.querySelector('.clc-info-item:nth-child(1) span').textContent,
                mileage: parseInt(card.querySelector('.clc-info-item:nth-child(2) span').textContent),
                transmission: card.querySelector('.clc-info-item:nth-child(3) span').textContent
            };

            // Apply filters
            if (make !== 'All Makes' && !cardInfo.make.toLowerCase().includes(make.toLowerCase())) shouldShow = false;
            if (cardInfo.price > parseInt(price)) shouldShow = false;
            if (bodyTypes.length > 0 && !bodyTypes.some(type => cardInfo.make.toLowerCase().includes(type.toLowerCase()))) shouldShow = false;
            if (fuelType !== 'All Fuel Types' && cardInfo.fuel !== fuelType) shouldShow = false;
            if (transmission !== 'All Transmissions' && cardInfo.transmission !== transmission) shouldShow = false;
            if (cardInfo.mileage > parseInt(mileage)) shouldShow = false;
            
            // Show/hide card
            card.closest('.col-lg-6').style.display = shouldShow ? 'block' : 'none';
        });

        // Update results count
        const visibleCards = document.querySelectorAll('.clc-card:not([style*="display: none"])').length;
        document.querySelector('.clc-results').textContent = `Showing ${visibleCards} of ${carCards.length} results`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const sidebar = document.querySelector('.clf-sidebar');
    const resetBtn = document.getElementById('resetFilters');
    const carCards = document.querySelectorAll('.clc-card');
    const resultsCount = document.querySelector('.clc-results');
    let activeFilters = {};

    // Initialize counters for body types
    updateBodyTypeCounts();

    // Handle all filter changes
    sidebar.addEventListener('change', function(e) {
        const target = e.target;
        if (target.matches('.clf-select')) {
            const filterType = target.closest('.clf-filter-section').dataset.filter;
            activeFilters[filterType] = target.value;
        } else if (target.matches('.clf-range')) {
            const filterType = target.closest('.clf-filter-section').dataset.filter;
            activeFilters[filterType] = target.value;
            updateRangeLabel(target);
        }
        applyFilters();
    });

    // Handle body type button clicks
    const bodyTypeBtns = document.querySelectorAll('.clf-body-type-btn');
    bodyTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const filterType = this.closest('.clf-filter-section').dataset.filter;
            activeFilters[filterType] = Array.from(document.querySelectorAll('.clf-body-type-btn.active'))
                .map(btn => btn.dataset.value);
            applyFilters();
        });
    });

    // Handle range input updates
    const rangeInputs = document.querySelectorAll('.clf-range');
    rangeInputs.forEach(range => {
        range.addEventListener('input', function() {
            updateRangeLabel(this);
        });
    });

    // Reset filters
    resetBtn.addEventListener('click', function() {
        // Reset select elements
        sidebar.querySelectorAll('.clf-select').forEach(select => {
            select.value = '';
        });

        // Reset range sliders
        sidebar.querySelectorAll('.clf-range').forEach(range => {
            range.value = range.max;
            updateRangeLabel(range);
        });

        // Reset body type buttons
        bodyTypeBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        // Clear active filters
        activeFilters = {};
        
        // Show all cards
        applyFilters();

        // Add animation to reset button
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 300);
    });

    function updateRangeLabel(rangeInput) {
        const values = rangeInput.nextElementSibling;
        const filterType = rangeInput.closest('.clf-filter-section').dataset.filter;
        
        if (filterType === 'price') {
            values.querySelector('span:last-child').textContent = '$' + Number(rangeInput.value).toLocaleString();
        } else {
            values.querySelector('span:last-child').textContent = Number(rangeInput.value).toLocaleString();
        }
    }

    function updateBodyTypeCounts() {
        const counts = {};
        carCards.forEach(card => {
            const bodyType = card.dataset.bodyType;
            if (bodyType) {
                counts[bodyType] = (counts[bodyType] || 0) + 1;
            }
        });

        bodyTypeBtns.forEach(btn => {
            const count = btn.querySelector('.clf-count');
            const bodyType = btn.dataset.value;
            if (count && counts[bodyType]) {
                count.textContent = counts[bodyType];
            }
        });
    }

    function applyFilters() {
        let visibleCount = 0;
        
        carCards.forEach(card => {
            let shouldShow = true;

            // Check each active filter
            Object.entries(activeFilters).forEach(([filterType, filterValue]) => {
                if (!filterValue || (Array.isArray(filterValue) && !filterValue.length)) return;

                const cardValue = card.dataset[filterType];
                
                switch(filterType) {
                    case 'price':
                        if (parseInt(cardValue) > parseInt(filterValue)) shouldShow = false;
                        break;
                    case 'mileage':
                        if (parseInt(cardValue) > parseInt(filterValue)) shouldShow = false;
                        break;
                    case 'bodyType':
                        if (!filterValue.includes(cardValue)) shouldShow = false;
                        break;
                    default:
                        if (cardValue !== filterValue) shouldShow = false;
                }
            });

            // Show/hide card
            card.closest('.col-lg-6').style.display = shouldShow ? 'block' : 'none';
            if (shouldShow) visibleCount++;
        });

        // Update results count
        resultsCount.textContent = `Showing ${visibleCount} of ${carCards.length} results`;
    }
});

// Fix for navigation active class issues - ONLY PRESERVE WHAT'S IN HTML
document.addEventListener('DOMContentLoaded', function() {
    // NEVER automatically add active class based on URL or current page
    // ONLY ensure dropdown toggles don't get active class
    
    // Remove active class from dropdown toggles
    document.querySelectorAll('.nav-link.dropdown-toggle').forEach(function(link) {
        link.classList.remove('active');
    });
    
    // Handle dropdown toggle clicks to prevent them getting active class
    document.querySelectorAll('.nav-link.dropdown-toggle').forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Prevent active class on dropdown toggles
            setTimeout(() => {
                this.classList.remove('active');
            }, 0);
        });
    });
});

// Remove any event listeners that might be changing active classes
document.addEventListener('DOMContentLoaded', function() {
    // Only ensure dropdown toggles don't get active class
    document.querySelectorAll('.nav-link.dropdown-toggle').forEach(link => {
        link.classList.remove('active');
        
        link.addEventListener('click', function(e) {
            setTimeout(() => {
                this.classList.remove('active');
            }, 0);
        });
    });
});

// Copy link functionality for bikes
document.addEventListener('DOMContentLoaded', function() {
    // Select all copy link buttons for bikes
    document.querySelectorAll('.bikes-img .action-btn.copy-link').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the parent card and get the bike link
            const bikeCard = this.closest('.car-card');
            const bikeLink = bikeCard.querySelector('h5 a').href;
            
            // Get full URL (including domain)
            const fullUrl = window.location.origin + '/' + bikeLink;
            
            // Copy to clipboard
            navigator.clipboard.writeText(fullUrl).then(() => {
                // Show success feedback
                const icon = this.querySelector('i');
                
                // Change icon to check mark
                icon.classList.remove('fa-link');
                icon.classList.add('fa-check');
                
                // Add success styling
                this.classList.add('copy-success');
                
                // Show toast notification
                const toast = document.createElement('div');
                toast.className = 'copy-toast';
                toast.textContent = 'Link copied!';
                bikeCard.appendChild(toast);
                
                // Animate toast
                setTimeout(() => {
                    toast.classList.add('show');
                }, 10);
                
                // Reset icon and remove toast after delay
                setTimeout(() => {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-link');
                    this.classList.remove('copy-success');
                    toast.classList.remove('show');
                    
                    // Remove toast element after fade out
                    setTimeout(() => {
                        bikeCard.removeChild(toast);
                    }, 300);
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy bike link: ', err);
            });
        });
    });
});