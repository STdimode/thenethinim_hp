document.addEventListener('DOMContentLoaded', () => {
    // 1. FadeUp Intersection Observer
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine delay if specified in data-delay attribute
                const delay = entry.target.getAttribute('data-delay') || 0;
                entry.target.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when out of view so it animates again next time
                entry.target.classList.remove('visible');
                // Remove the transition when hidden so that it disappears instantly
                // and avoids reversed animating out
                entry.target.style.transition = 'none';
            }
        });
    }, { threshold: 0.12 });

    fadeUpElements.forEach(el => observer.observe(el));


    // 2. Hero Slide Logic
    const heroSlidesBtn = document.querySelectorAll('.hero-slide-btn');
    if (heroSlidesBtn.length > 0) {
        let currentHeroSlide = 0;

        function updateHeroSlide(index) {
            heroSlidesBtn.forEach((btn, i) => {
                if (i === index) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            currentHeroSlide = index;
        }

        heroSlidesBtn.forEach((btn, i) => {
            btn.addEventListener('click', () => updateHeroSlide(i));
        });
    }

    // 3. Custom Infinite Gallery Carousel
    const trackRef = document.getElementById('gallery-track');
    const containerRef = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');
    const dots = document.querySelectorAll('.gallery-dot');

    if (trackRef && containerRef) {
        const GALLERY_GAP = 20;
        const N = 6;
        let idx = N; // Start at index N (copy1 is the first visible set)
        let anim = true;
        let slideW = 0;

        // State for drag
        let isDragging = false;
        let dragStartX = 0;
        let dragOffset = 0;
        let autoplayEnabled = true;

        function getGalleryConfig() {
            const isMobile = window.innerWidth < 768;
            return {
                visible: isMobile ? 2 : 5,
                gap: isMobile ? 10 : GALLERY_GAP
            };
        }

        function measure() {
            const config = getGalleryConfig();
            const cw = containerRef.clientWidth;
            slideW = (cw - config.gap * (config.visible - 1)) / config.visible;

            // Apply slide width to all slides
            const slides = trackRef.querySelectorAll('.gallery-slide');
            slides.forEach(slide => {
                slide.style.width = `${slideW}px`;
            });

            trackRef.style.gap = `${config.gap}px`;
            updateCarousel();
        }

        function updateCarousel() {
            const config = getGalleryConfig();
            const translateX = idx * (slideW + config.gap) - dragOffset;

            trackRef.style.transform = `translateX(-${translateX}px)`;
            trackRef.style.transition = anim ? 'transform 0.5s ease' : 'none';

            // Update dots
            const activeDot = ((idx % N) + N) % N;
            dots.forEach((dot, i) => {
                if (i === activeDot) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function slideNext() {
            anim = true;
            idx += 1;
            updateCarousel();
        }

        function slidePrev() {
            anim = true;
            idx -= 1;
            updateCarousel();
        }

        // Event Listeners
        window.addEventListener('resize', measure);

        trackRef.addEventListener('transitionend', () => {
            if (idx >= N * 2) {
                // Drifted into copy2 → jump back to copy1
                anim = false;
                idx -= N;
                updateCarousel();
                // Force reflow and re-enable anim next frame
                requestAnimationFrame(() => requestAnimationFrame(() => anim = true));
            } else if (idx < N) {
                // Drifted into copy0 → jump forward to copy1
                anim = false;
                idx += N;
                updateCarousel();
                requestAnimationFrame(() => requestAnimationFrame(() => anim = true));
            }
        });

        if (prevBtn) prevBtn.addEventListener('click', slidePrev);
        if (nextBtn) nextBtn.addEventListener('click', slideNext);

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                anim = true;
                idx = N + i;
                updateCarousel();
            });
        });

        // Mouse Drag Events
        containerRef.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            dragOffset = 0;
            autoplayEnabled = false;
            anim = false;
            containerRef.classList.add('dragging');
            trackRef.classList.add('dragging');
        });

        containerRef.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            dragOffset = e.clientX - dragStartX;
            updateCarousel();
        });

        function handleMouseUp() {
            if (!isDragging) return;
            isDragging = false;
            containerRef.classList.remove('dragging');
            trackRef.classList.remove('dragging');

            const threshold = slideW * 0.3;

            if (dragOffset > threshold) {
                slidePrev();
            } else if (dragOffset < -threshold) {
                slideNext();
            } else {
                anim = true;
                updateCarousel();
            }

            dragOffset = 0;
            autoplayEnabled = true;
        }

        containerRef.addEventListener('mouseup', handleMouseUp);
        containerRef.addEventListener('mouseleave', handleMouseUp);

        // Autoplay
        setInterval(() => {
            if (autoplayEnabled) {
                slideNext();
            }
        }, 3500);

        // Initialize
        measure();
    }
});