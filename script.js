// JavaScript for Farooq Ahmed's Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('text-blue-600', 'bg-blue-100');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('text-blue-600', 'bg-blue-100');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transform transition-all duration-300 translate-x-full`;
        
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        notification.classList.add(bgColor, 'text-white');
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-fade-in', 'visible');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    sections.forEach(section => {
        section.classList.add('section-fade-in');
        observer.observe(section);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.setProperty('--fill-width', width);
        bar.style.width = '0%';
        
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.style.getPropertyValue('--fill-width');
                }
            });
        }, { threshold: 0.5 });
        
        skillObserver.observe(bar);
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('#projects .bg-white');
    projectCards.forEach(card => {
        card.classList.add('project-card', 'hover-lift');
    });

    // Blog card hover effects
    const blogCards = document.querySelectorAll('#blog article');
    blogCards.forEach(card => {
        card.classList.add('blog-card');
    });

    // WhatsApp button functionality
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.classList.add('whatsapp-pulse');
    });

    // Typing effect for hero section (optional)
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect when section is visible
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroTitle);
    }

    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Service card hover effects
    const serviceCards = document.querySelectorAll('#services .bg-gradient-to-br');
    serviceCards.forEach((card, index) => {
        card.classList.add('hover-lift');
        if (index === 0) {
            card.classList.add('service-card-blue');
        } else {
            card.classList.add('service-card-green');
        }
    });

    // Contact form input enhancements
    const formInputs = document.querySelectorAll('#contact input, #contact textarea, #contact select');
    formInputs.forEach(input => {
        input.classList.add('contact-form-input');
    });

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
    const debouncedUpdateActiveNav = debounce(updateActiveNav, 10);
    window.addEventListener('scroll', debouncedUpdateActiveNav);

    // Initialize tooltips (if needed)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.top = this.offsetTop - 30 + 'px';
            tooltip.style.left = this.offsetLeft + 'px';
            document.body.appendChild(tooltip);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            });
        });
    });

    // Profile image loading and optimization
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        console.log('Profile image element found:', profileImage.src);
        console.log('Profile image element:', profileImage);
        
        // Set initial opacity
        profileImage.style.opacity = '0';
        profileImage.style.transition = 'opacity 0.3s ease';
        
        profileImage.addEventListener('load', function() {
            console.log('Profile image loaded successfully');
            this.style.opacity = '1';
        });
        
        profileImage.addEventListener('error', function(e) {
            console.error('Profile image failed to load:', e);
            console.error('Attempted to load:', this.src);
            // Fallback to placeholder if image fails to load
            this.src = 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=FA';
        });
        
        // Check if image is already loaded
        if (profileImage.complete && profileImage.naturalHeight !== 0) {
            console.log('Profile image already loaded');
            profileImage.style.opacity = '1';
        } else {
            console.log('Profile image loading...');
        }
        
        // Force reload after a short delay to ensure proper loading
        setTimeout(() => {
            if (profileImage.style.opacity === '0') {
                console.log('Forcing image reload');
                const currentSrc = profileImage.src;
                profileImage.src = '';
                profileImage.src = currentSrc;
            }
        }, 100);
        
    } else {
        console.error('Profile image element not found');
    }

    // Project data for modal
    const projectData = {
        'hr-automation': {
            title: 'Upgraded HR Automation System',
            description: `
                <p class="text-gray-600 mb-4">
                    A comprehensive HR automation solution built with Google Apps Script that streamlines 
                    all aspects of human resource management. This system includes employee management, 
                    leave tracking, performance monitoring, and automated reporting capabilities.
                </p>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Features:</h3>
                <ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
                    <li>Employee database management with automated data validation</li>
                    <li>Leave request and approval workflow automation</li>
                    <li>Performance tracking and evaluation system</li>
                    <li>Automated report generation and email notifications</li>
                    <li>Integration with Google Calendar for scheduling</li>
                    <li>Real-time dashboard for HR metrics</li>
                </ul>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Technologies Used:</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Google Apps Script</span>
                    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Google Sheets</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Google Forms</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Gmail API</span>
                </div>
            `,
            images: [
                'projects/Upgraded HR Automation System/111111.jpg',
                'projects/Upgraded HR Automation System/222222.jpg',
                'projects/Upgraded HR Automation System/333333.jpg',
                'projects/Upgraded HR Automation System/444444.jpg',
                'projects/Upgraded HR Automation System/555555.jpg',
                'projects/Upgraded HR Automation System/666666.jpg'
            ]
        },
        'field-monitoring': {
            title: 'Smart Field Monitoring & Reporting',
            description: `
                <p class="text-gray-600 mb-4">
                    A real-time field monitoring system that enables organizations to track field operations, 
                    manage field staff, and generate comprehensive reports automatically. The system includes 
                    GPS tracking, automated reporting, and data visualization capabilities.
                </p>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Features:</h3>
                <ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
                    <li>Real-time GPS tracking and location monitoring</li>
                    <li>Automated field activity reporting</li>
                    <li>Data visualization and analytics dashboard</li>
                    <li>Mobile-friendly interface for field staff</li>
                    <li>Automated alert system for critical events</li>
                    <li>Integration with mapping services</li>
                </ul>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Technologies Used:</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Google Apps Script</span>
                    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Google Maps API</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Data Visualization</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Mobile Web App</span>
                </div>
            `,
            images: [
                'projects/Smart Field Monitoring & Reporting/11111.jpg',
                'projects/Smart Field Monitoring & Reporting/22222.jpg',
                'projects/Smart Field Monitoring & Reporting/33333.jpg',
                'projects/Smart Field Monitoring & Reporting/44444.jpg',
                'projects/Smart Field Monitoring & Reporting/55555.jpg'
            ]
        },
        'inventory-dashboard': {
            title: 'Inventory Monitoring Dashboard',
            description: `
                <p class="text-gray-600 mb-4">
                    An advanced inventory management system that provides real-time tracking, automated alerts, 
                    and comprehensive reporting for inventory control. The dashboard offers intuitive data 
                    visualization and automated inventory optimization suggestions.
                </p>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Features:</h3>
                <ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
                    <li>Real-time inventory tracking and monitoring</li>
                    <li>Automated low stock alerts and reorder notifications</li>
                    <li>Comprehensive reporting and analytics dashboard</li>
                    <li>Barcode scanning integration</li>
                    <li>Inventory forecasting and demand planning</li>
                    <li>Multi-location inventory management</li>
                </ul>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Technologies Used:</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Google Apps Script</span>
                    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Google Sheets</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Chart.js</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Data Analytics</span>
                </div>
            `,
            images: [
                'projects/Inventory Monitoring Dashboard/1111.jpg',
                'projects/Inventory Monitoring Dashboard/2222.jpg',
                'projects/Inventory Monitoring Dashboard/3333.jpg',
                'projects/Inventory Monitoring Dashboard/4444.jpg',
                'projects/Inventory Monitoring Dashboard/5555.jpg',
                'projects/Inventory Monitoring Dashboard/6666.jpg',
                'projects/Inventory Monitoring Dashboard/7777.jpg'
            ]
        },
        'hr-onboarding': {
            title: 'HR Onboarding Automation System',
            description: `
                <p class="text-gray-600 mb-4">
                    A streamlined employee onboarding system that automates the entire onboarding process, 
                    from initial application to full integration. The system includes document management, 
                    progress tracking, and automated workflow notifications.
                </p>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Features:</h3>
                <ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
                    <li>Automated onboarding workflow management</li>
                    <li>Digital document collection and verification</li>
                    <li>Progress tracking and milestone notifications</li>
                    <li>Integration with HR systems and databases</li>
                    <li>Automated email notifications and reminders</li>
                    <li>Compliance tracking and reporting</li>
                </ul>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Technologies Used:</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Google Apps Script</span>
                    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Google Drive API</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Workflow Automation</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Document Management</span>
                </div>
            `,
            images: [
                'projects/HR Onboarding Automation System/111.jpg',
                'projects/HR Onboarding Automation System/222.jpg',
                'projects/HR Onboarding Automation System/333.jpg',
                'projects/HR Onboarding Automation System/444.jpg',
                'projects/HR Onboarding Automation System/555.jpg',
                'projects/HR Onboarding Automation System/666.jpg',
                'projects/HR Onboarding Automation System/777.jpg'
            ]
        },
        'ration-distribution': {
            title: 'Digital Ration Distribution System',
            description: `
                <p class="text-gray-600 mb-4">
                    A digital system designed to manage ration distribution efficiently with beneficiary tracking, 
                    inventory management, and automated reporting. This system ensures transparent and 
                    accountable distribution of essential supplies.
                </p>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Features:</h3>
                <ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
                    <li>Beneficiary registration and verification system</li>
                    <li>Real-time inventory tracking and management</li>
                    <li>Automated distribution scheduling</li>
                    <li>Digital receipt generation and tracking</li>
                    <li>Comprehensive reporting and analytics</li>
                    <li>Mobile app for field distribution staff</li>
                </ul>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Technologies Used:</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Google Apps Script</span>
                    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Google Forms</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">QR Code Generation</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Mobile Web App</span>
                </div>
            `,
            images: [
                'projects/Digital Ration Distribution System/11.jpg',
                'projects/Digital Ration Distribution System/22.jpg',
                'projects/Digital Ration Distribution System/33.jpg',
                'projects/Digital Ration Distribution System/44.jpg',
                'projects/Digital Ration Distribution System/55.jpg',
                'projects/Digital Ration Distribution System/IMG-20250729-WA0025.jpg'
            ]
        },
        'telecom-data': {
            title: 'Telecom Data Request System',
            description: `
                <p class="text-gray-600 mb-4">
                    An automated system for handling telecom data requests with comprehensive request tracking, 
                    approval workflows, and data management capabilities. The system streamlines the process 
                    of requesting and managing telecom-related data.
                </p>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Features:</h3>
                <ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
                    <li>Automated request submission and tracking</li>
                    <li>Multi-level approval workflow system</li>
                    <li>Data validation and security measures</li>
                    <li>Real-time status updates and notifications</li>
                    <li>Comprehensive audit trail and reporting</li>
                    <li>Integration with telecom databases</li>
                </ul>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Technologies Used:</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Google Apps Script</span>
                    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Workflow Automation</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Data Security</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">API Integration</span>
                </div>
            `,
            images: [
                'projects/Telecom Data Request/1.jpg',
                'projects/Telecom Data Request/2.jpg',
                'projects/Telecom Data Request/3.jpg',
                'projects/Telecom Data Request/4.jpg',
                'projects/Telecom Data Request/5.jpg',
                'projects/Telecom Data Request/6.jpg',
                'projects/Telecom Data Request/7.jpg'
            ]
        }
    };

    // Modal functions
    window.openProjectModal = function(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = project.title;
        
        // Create content with description and images
        let contentHTML = project.description;
        
        // Add image gallery
        if (project.images && project.images.length > 0) {
            contentHTML += `
                <div class="mt-8">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Screenshots</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            `;
            
            project.images.forEach(imagePath => {
                contentHTML += `
                    <div class="relative group">
                        <img src="${imagePath}" alt="Project Screenshot" 
                             class="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                             onclick="openImageModal('${imagePath}')">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <i class="fas fa-search-plus text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>
                    </div>
                `;
            });
            
            contentHTML += `
                    </div>
                </div>
            `;
        }

        modalContent.innerHTML = contentHTML;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    window.closeProjectModal = function() {
        const modal = document.getElementById('projectModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    window.openImageModal = function(imagePath) {
        // Create a simple image modal
        const imageModal = document.createElement('div');
        imageModal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
        imageModal.innerHTML = `
            <div class="relative max-w-4xl max-h-full">
                <img src="${imagePath}" alt="Project Screenshot" class="max-w-full max-h-full object-contain">
                <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(imageModal);
        
        // Close modal when clicking outside
        imageModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });
    };

    // Close modal when clicking outside
    document.getElementById('projectModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal();
        }
    });

    // Console welcome message
    console.log(`
    🚀 Welcome to Farooq Ahmed's Portfolio!
    
    👨‍💻 Google Apps Script Developer
    🛠️  Automation Builder
    ✈️  Visa Consultant
    
    📧 Contact: farooq.ahmed@example.com
    📱 WhatsApp: +92 XXX XXX XXXX
    
    Built with ❤️ using HTML, CSS, and JavaScript
    `);
}); 
