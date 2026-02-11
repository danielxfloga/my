document.addEventListener('DOMContentLoaded', () => {

    // Elementos a animar con el mouse
    const heroImage = document.querySelector('.hero-image');
    const heroTitle = document.querySelector('.hero-title');
    const badge = document.querySelector('.availability');

    // Función de efecto Parallax
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        // Mover imagen ligeramente opuesto al mouse
        if (heroImage) {
            heroImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }

        // Mover título un poco más rápido para crear profundidad
        if (heroTitle) {
            heroTitle.style.transform = `translateX(${-x * 1.5}px) translateY(${-y * 1.5}px)`;
        }

        // Mover badge sutilmente
        if (badge) {
            badge.style.transform = `translateX(${x * 0.5}px) translateY(${y * 0.5}px)`;
        }

        const toggleBtn = document.getElementById('toggleSocialBtn');
        const socialContainer = document.getElementById('socialContainer');
        const toggleIcon = toggleBtn.querySelector('i');

        toggleBtn.addEventListener('click', () => {
            // 1. Alternar la clase 'closed' en el contenedor
            socialContainer.classList.toggle('closed');

            // 2. Cambiar el icono visualmente (X a Share)
            if (socialContainer.classList.contains('closed')) {
                // Si está cerrado, mostramos icono de "Share" o "Plus"
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-share-alt');
            } else {
                // Si está abierto, mostramos la "X"
                toggleIcon.classList.remove('fa-share-alt');
                toggleIcon.classList.add('fa-times');
            }
        });
    });

    // Efecto Hover en los enlaces de navegación (Magnetic Effect)
    const navLinks = document.querySelectorAll('.nav a');


    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Mover el texto ligeramente hacia el cursor
            link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
    });

    // Intersection Observer para animación de "desdoblamiento" (Page Unfold)
    const aboutSection = document.querySelector('#about');

    if (aboutSection) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2 // Se activa cuando el 20% de la sección es visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('unfold');
                    observer.unobserve(entry.target); // Solo animar una vez
                }
            });
        }, observerOptions);


        observer.observe(aboutSection);
    }

    // --- Icon Rain Animation ---
    const iconRainContainer = document.getElementById('iconRain');
    if (iconRainContainer) {
        const icons = [
            'fa-brands fa-microsoft', // .NET/Microsoft
            'fa-solid fa-database',   // SQL
            'fa-solid fa-code',       // Code
            'fa-solid fa-chart-line', // Data Analysis
            'fa-solid fa-brain',      // Machine Learning
            'fa-solid fa-server',     // Server
            'fa-solid fa-laptop-code',// Dev
            'fa-brands fa-windows'    // Windows
        ];

        function createIcon() {
            const iconElement = document.createElement('i');
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];

            // Assign class
            iconElement.className = `floating-icon ${randomIcon}`;

            // Randomize styling
            const size = Math.random() * 2 + 1; // 1rem to 3rem
            iconElement.style.fontSize = `${size}rem`;

            const left = Math.random() * 100; // 0% to 100%
            iconElement.style.left = `${left}%`;

            const duration = Math.random() * 10 + 5; // 5s to 15s
            iconElement.style.animationDuration = `${duration}s`;

            const delay = Math.random() * 10;
            iconElement.style.animationDelay = `-${delay}s`; // Start immediately at different times

            // Blur amount based on size (depth perception)
            const blur = Math.random() * 4 + 1;
            iconElement.style.filter = `blur(${blur}px)`;

            // Randomly accentuate
            if (Math.random() > 0.7) {
                iconElement.classList.add('accent');
            }

            iconRainContainer.appendChild(iconElement);

            // Accessiblity/Performance cleanup: remove after animation
            setTimeout(() => {
                iconElement.remove();
            }, duration * 9000);
        }

        // Create initial batch
        for (let i = 0; i < 30; i++) {
            createIcon();
        }

        // Continually create new icons
        setInterval(createIcon, 900);
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('nav');
    const mobileNavLinks = document.querySelectorAll('.nav a');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});