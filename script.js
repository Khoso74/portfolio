// Modern Portfolio JavaScript - 2025 Enhanced Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modern features
    initializeModernFeatures();
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Smooth scrolling and navigation
    initializeSmoothScrolling();
    
    // Typing animations
    initializeTypingAnimations();
    
    // Scroll animations and effects
    initializeScrollEffects();
    
    // Contact form handling
    initializeContactForm();
    
    // Project modal system
    initializeProjectModals();
    
    // Theme toggle functionality
    initializeThemeToggle();
    
    // Performance optimizations
    initializePerformanceOptimizations();
});

// Initialize all modern features
function initializeModernFeatures() {
    // Add modern scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
    
    // Add loading states
    addLoadingStates();
    
    // Initialize skill bars
    initializeSkillBars();
    
    // Add hover effects
    addHoverEffects();
    
    // Initialize back to top button
    initializeBackToTop();
    
    // Add notification system
    initializeNotificationSystem();
    
    // Console welcome message
    showWelcomeMessage();
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Add smooth animation
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.animation = 'slideDown 0.3s ease-out';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Smooth scrolling and navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link-modern, .mobile-nav-link-modern');
    
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
            item.classList.remove('text-primary-600', 'bg-primary-100');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('text-primary-600', 'bg-primary-100');
            }
        });
    }
    
    // Debounced scroll event
    const debouncedUpdateActiveNav = debounce(updateActiveNav, 10);
    window.addEventListener('scroll', debouncedUpdateActiveNav);
}

// Typing animations
function initializeTypingAnimations() {
    const typingText = document.getElementById('typing-text');
    const typingSubtitle = document.getElementById('typing-subtitle');
    
    if (typingText) {
        const text = "Farooq Ahmed";
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }
        
        // Start typing when element is visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(typingText);
    }
    
    if (typingSubtitle) {
        const subtitleText = "Full-Stack Developer & Digital Solution Architect";
        let j = 0;
        
        function typeSubtitle() {
            if (j < subtitleText.length) {
                typingSubtitle.textContent += subtitleText.charAt(j);
                j++;
                setTimeout(typeSubtitle, 50);
            }
        }
        
        // Start subtitle typing after main title
        setTimeout(typeSubtitle, 2000);
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Parallax effect for hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Contact form handling
function initializeContactForm() {
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
            
            // Enhanced validation
            if (!validateForm(name, email, subject, message)) {
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
}

// Form validation
function validateForm(name, email, subject, message) {
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (name.length < 2) {
        showNotification('Name must be at least 2 characters long', 'error');
        return false;
    }
    
    if (message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Project modal system
function initializeProjectModals() {
    // Project data for modal
    const projectData = {
        'hr-automation': {
            title: 'Upgraded HR Automation System',
            description: `
                <p class="text-dark-600 mb-6 leading-relaxed">
                    A comprehensive HR automation solution built with Google Apps Script that streamlines 
                    all aspects of human resource management. This system includes employee management, 
                    leave tracking, performance monitoring, and automated reporting capabilities.
                </p>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Key Features:</h3>
                <ul class="list-disc list-inside text-dark-600 mb-6 space-y-2">
                    <li>Employee database management with automated data validation</li>
                    <li>Leave request and approval workflow automation</li>
                    <li>Performance tracking and evaluation system</li>
                    <li>Automated report generation and email notifications</li>
                    <li>Integration with Google Calendar for scheduling</li>
                    <li>Real-time dashboard for HR metrics</li>
                </ul>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Technologies Used:</h3>
                <div class="flex flex-wrap gap-3 mb-6">
                    <span class="px-4 py-2 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">Google Apps Script</span>
                    <span class="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">Google Sheets</span>
                    <span class="px-4 py-2 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">Google Forms</span>
                    <span class="px-4 py-2 bg-orange-100 text-orange-800 text-sm rounded-full font-medium">Gmail API</span>
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
                <p class="text-dark-600 mb-6 leading-relaxed">
                    A real-time field monitoring system that enables organizations to track field operations, 
                    manage field staff, and generate comprehensive reports automatically. The system includes 
                    GPS tracking, automated reporting, and data visualization capabilities.
                </p>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Key Features:</h3>
                <ul class="list-disc list-inside text-dark-600 mb-6 space-y-2">
                    <li>Real-time GPS tracking and location monitoring</li>
                    <li>Automated field activity reporting</li>
                    <li>Data visualization and analytics dashboard</li>
                    <li>Mobile-friendly interface for field staff</li>
                    <li>Automated alert system for critical events</li>
                    <li>Integration with mapping services</li>
                </ul>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Technologies Used:</h3>
                <div class="flex flex-wrap gap-3 mb-6">
                    <span class="px-4 py-2 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">Google Apps Script</span>
                    <span class="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">Google Maps API</span>
                    <span class="px-4 py-2 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">Data Visualization</span>
                    <span class="px-4 py-2 bg-orange-100 text-orange-800 text-sm rounded-full font-medium">Mobile Web App</span>
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
                <p class="text-dark-600 mb-6 leading-relaxed">
                    An advanced inventory management system that provides real-time tracking, automated alerts, 
                    and comprehensive reporting for inventory control. The dashboard offers intuitive data 
                    visualization and automated inventory optimization suggestions.
                </p>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Key Features:</h3>
                <ul class="list-disc list-inside text-dark-600 mb-6 space-y-2">
                    <li>Real-time inventory tracking and monitoring</li>
                    <li>Automated low stock alerts and reorder notifications</li>
                    <li>Comprehensive reporting and analytics dashboard</li>
                    <li>Barcode scanning integration</li>
                    <li>Inventory forecasting and demand planning</li>
                    <li>Multi-location inventory management</li>
                </ul>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Technologies Used:</h3>
                <div class="flex flex-wrap gap-3 mb-6">
                    <span class="px-4 py-2 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">Google Apps Script</span>
                    <span class="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">Google Sheets</span>
                    <span class="px-4 py-2 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">Chart.js</span>
                    <span class="px-4 py-2 bg-orange-100 text-orange-800 text-sm rounded-full font-medium">Data Analytics</span>
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
                <p class="text-dark-600 mb-6 leading-relaxed">
                    A streamlined employee onboarding system that automates the entire onboarding process, 
                    from initial application to full integration. The system includes document management, 
                    progress tracking, and automated workflow notifications.
                </p>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Key Features:</h3>
                <ul class="list-disc list-inside text-dark-600 mb-6 space-y-2">
                    <li>Automated onboarding workflow management</li>
                    <li>Digital document collection and verification</li>
                    <li>Progress tracking and milestone notifications</li>
                    <li>Integration with HR systems and databases</li>
                    <li>Automated email notifications and reminders</li>
                    <li>Compliance tracking and reporting</li>
                </ul>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Technologies Used:</h3>
                <div class="flex flex-wrap gap-3 mb-6">
                    <span class="px-4 py-2 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">Google Apps Script</span>
                    <span class="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">Google Drive API</span>
                    <span class="px-4 py-2 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">Workflow Automation</span>
                    <span class="px-4 py-2 bg-orange-100 text-orange-800 text-sm rounded-full font-medium">Document Management</span>
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
                <p class="text-dark-600 mb-6 leading-relaxed">
                    A digital system designed to manage ration distribution efficiently with beneficiary tracking, 
                    inventory management, and automated reporting. This system ensures transparent and 
                    accountable distribution of essential supplies.
                </p>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Key Features:</h3>
                <ul class="list-disc list-inside text-dark-600 mb-6 space-y-2">
                    <li>Beneficiary registration and verification system</li>
                    <li>Real-time inventory tracking and management</li>
                    <li>Automated distribution scheduling</li>
                    <li>Digital receipt generation and tracking</li>
                    <li>Comprehensive reporting and analytics</li>
                    <li>Mobile app for field distribution staff</li>
                </ul>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Technologies Used:</h3>
                <div class="flex flex-wrap gap-3 mb-6">
                    <span class="px-4 py-2 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">Google Apps Script</span>
                    <span class="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">Google Forms</span>
                    <span class="px-4 py-2 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">QR Code Generation</span>
                    <span class="px-4 py-2 bg-orange-100 text-orange-800 text-sm rounded-full font-medium">Mobile Web App</span>
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
                <p class="text-dark-600 mb-6 leading-relaxed">
                    An automated system for handling telecom data requests with comprehensive request tracking, 
                    approval workflows, and data management capabilities. The system streamlines the process 
                    of requesting and managing telecom-related data.
                </p>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Key Features:</h3>
                <ul class="list-disc list-inside text-dark-600 mb-6 space-y-2">
                    <li>Automated request submission and tracking</li>
                    <li>Multi-level approval workflow system</li>
                    <li>Data validation and security measures</li>
                    <li>Real-time status updates and notifications</li>
                    <li>Comprehensive audit trail and reporting</li>
                    <li>Integration with telecom databases</li>
                </ul>
                <h3 class="text-xl font-bold text-dark-900 mb-4">Technologies Used:</h3>
                <div class="flex flex-wrap gap-3 mb-6">
                    <span class="px-4 py-2 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">Google Apps Script</span>
                    <span class="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full font-medium">Workflow Automation</span>
                    <span class="px-4 py-2 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">Data Security</span>
                    <span class="px-4 py-2 bg-orange-100 text-orange-800 text-sm rounded-full font-medium">API Integration</span>
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
                    <h3 class="text-xl font-bold text-dark-900 mb-6">Project Screenshots</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            `;
            
            project.images.forEach((imagePath, index) => {
                contentHTML += `
                    <div class="relative group cursor-pointer transform hover:scale-105 transition-all duration-300" onclick="openImageModal('${imagePath}')">
                        <img src="${imagePath}" alt="Project Screenshot ${index + 1}" 
                             class="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <div class="bg-white bg-opacity-90 text-dark-800 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <i class="fas fa-search-plus mr-2"></i>
                                <span class="text-sm font-medium">View Full Size</span>
                            </div>
                        </div>
                        <div class="absolute top-3 right-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            ${index + 1} / ${project.images.length}
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

    // Close modal when clicking outside
    document.getElementById('projectModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal();
        }
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add transition effect
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Debounce function
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
    
    // Lazy loading for images
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
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill-modern');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
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
}

// Hover effects
function addHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card-modern, .service-card-modern, .contact-form-card-modern');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
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
}

// Notification system
function initializeNotificationSystem() {
    // Notification function is already defined in the original code
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
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
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Loading states
function addLoadingStates() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.innerHTML = '<span class="loading"></span> Loading...';
                this.disabled = true;
            }
        });
    });
}

// Welcome message
function showWelcomeMessage() {
    console.log(`
    🚀 Welcome to Farooq Ahmed's Modern Portfolio!
    
    👨‍💻 Full-Stack Developer & Digital Solution Architect
    🛠️  Google Apps Script Expert
    ✈️  Visa Consultant
    
    📧 Contact: balouchp3@gmail.com
    🔗 LinkedIn: https://www.linkedin.com/in/farooq-ahmed-86a069175/
    
    Built with ❤️ using modern HTML, CSS, and JavaScript
    Features: Glassmorphism, Smooth Animations, Responsive Design
    `);
}

// Utility functions
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

// Download CV functionality
document.getElementById('download-cv')?.addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('CV download feature coming soon!', 'info');
});

// Enhanced image modal functionality
window.openImageModal = function(imagePath) {
    const imageModal = document.createElement('div');
    imageModal.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
    imageModal.id = 'imageModal';
    
    imageModal.innerHTML = `
        <div class="relative max-w-5xl max-h-full transform scale-95 transition-transform duration-300" id="imageModalContent">
            <div class="relative">
                <img src="${imagePath}" alt="Project Screenshot" 
                     class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                     id="modalImage"
                     onload="document.getElementById('imageModalContent').classList.remove('scale-95'); document.getElementById('imageModalContent').classList.add('scale-100');">
                
                <!-- Close button -->
                <button onclick="closeImageModal()" 
                        class="absolute -top-4 -right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                    <i class="fas fa-times"></i>
                </button>
                
                <!-- Navigation arrows -->
                <button onclick="navigateImage('prev')" 
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xl w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                    <i class="fas fa-chevron-left"></i>
                </button>
                
                <button onclick="navigateImage('next')" 
                        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xl w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                    <i class="fas fa-chevron-right"></i>
                </button>
                
                <!-- Image counter -->
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                    <span id="imageCounter">1</span> / <span id="totalImages">1</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(imageModal);
    
    // Show modal with animation
    setTimeout(() => {
        imageModal.classList.remove('opacity-0');
    }, 10);
    
    // Close modal when clicking outside
    imageModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeImageModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleImageModalKeydown);
};

window.closeImageModal = function() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.classList.add('opacity-0');
        document.getElementById('imageModalContent').classList.add('scale-95');
        document.getElementById('imageModalContent').classList.remove('scale-100');
        
        setTimeout(() => {
            imageModal.remove();
            document.removeEventListener('keydown', handleImageModalKeydown);
        }, 300);
    }
};

function handleImageModalKeydown(e) {
    switch(e.key) {
        case 'Escape':
            closeImageModal();
            break;
        case 'ArrowLeft':
            navigateImage('prev');
            break;
        case 'ArrowRight':
            navigateImage('next');
            break;
    }
}

// Profile image loading optimization
const profileImage = document.querySelector('.profile-image-modern');
if (profileImage) {
    profileImage.style.opacity = '0';
    profileImage.style.transition = 'opacity 0.3s ease';
    
    profileImage.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    profileImage.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/160x160/3B82F6/FFFFFF?text=FA';
    });
    
    if (profileImage.complete && profileImage.naturalHeight !== 0) {
        profileImage.style.opacity = '1';
    }
} 
