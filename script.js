// Global data variable
let portfolioData = {};

// Load JSON data and populate content
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        portfolioData = await response.json();
        populateContent();
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback: try to load from local file
        alert('Unable to load portfolio data. Please refresh the page.');
    }
}

// Populate all content from JSON
function populateContent() {
    // Update page title
    document.getElementById('page-title').textContent = `${portfolioData.personal.name} - Portfolio`;
    
    // Populate hero section
    document.querySelector('.logo').textContent = portfolioData.personal.name;
    document.querySelector('.hero-text h1').innerHTML = `<span class="highlight">${portfolioData.personal.name}</span>`;
    document.querySelector('.hero-text h2').textContent = portfolioData.personal.title;
    document.querySelector('.hero-text p').textContent = portfolioData.personal.description;
    
    // Populate buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn-content');
    if (heroButtons[0]) heroButtons[0].textContent = portfolioData.buttons.getInTouch;
    if (heroButtons[1]) heroButtons[1].textContent = portfolioData.buttons.viewWork;
    
    // Populate social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks[0].href = portfolioData.social.linkedin;
    socialLinks[1].href = portfolioData.social.github;
    socialLinks[2].href = portfolioData.social.twitter;
    socialLinks[3].href = `mailto:${portfolioData.social.email}`;
    
    // Populate about section
    const aboutParagraphs = document.querySelectorAll('.about-content p');
    aboutParagraphs[0].textContent = portfolioData.about.paragraph1;
    aboutParagraphs[1].textContent = portfolioData.about.paragraph2;
    
    // Populate stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.querySelector('h3').textContent = portfolioData.about.stats[index].number;
        stat.querySelector('p').textContent = portfolioData.about.stats[index].label;
    });
    
    // Populate skills section
    populateSkills();
    
    // Populate projects section
    populateProjects();
    
    // Populate experience section
    populateExperience();
    
    // Populate education section
    populateEducation();
    
    // Populate contact section
    populateContact();
    
    // Populate footer
    document.querySelector('.footer p').textContent = portfolioData.footer.copyright;
    
    // Populate footer social links
    const footerSocialLinks = document.querySelectorAll('.footer-social a');
    footerSocialLinks[0].href = portfolioData.social.linkedin;
    footerSocialLinks[1].href = portfolioData.social.github;
    footerSocialLinks[2].href = portfolioData.social.twitter;
    footerSocialLinks[3].href = `mailto:${portfolioData.social.email}`;
    
    // Initialize other functionality
    initializePortfolio();
}

function populateSkills() {
    const categories = ['languages', 'frameworks', 'tools'];
    const skillGrid = document.querySelector('.skills-grid');
    
    skillGrid.innerHTML = '';
    
    categories.forEach(categoryKey => {
        const category = portfolioData.skills[categoryKey];
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        let content = `<h3><i class="${category.icon}"></i> ${category.name}</h3>`;
        
        if (categoryKey === 'tools') {
            content += '<div class="skill-tags">';
            category.tags.forEach(tag => {
                content += `<span class="skill-tag">${tag}</span>`;
            });
            content += '</div>';
        } else {
            content += '<div class="skill-items">';
            category.items.forEach(item => {
                content += `
                    <div class="skill-item">
                        <span>${item.name}</span>
                        <div class="skill-bar">
                            <div class="skill-progress" data-width="${item.level}%"></div>
                        </div>
                    </div>
                `;
            });
            content += '</div>';
        }
        
        categoryDiv.innerHTML = content;
        skillGrid.appendChild(categoryDiv);
    });
}

function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';

    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        let techTags = '';
        project.technologies.forEach(tech => {
            techTags += `<span>${tech}</span>`;
        });

        const playstoreLink = project.playstore || '#';

        let imageContent = '';
        if (project.image && project.image.trim() !== '') {
            imageContent = `<img src="${project.image}" alt="${project.title}" class="project-img-circle">`;
        } else if (project.imageIcon && project.imageIcon.trim() !== '') {
            imageContent = `<i class="${project.imageIcon} project-icon-circle"></i>`;
        }

        projectCard.innerHTML = `
            <div class="project-image">
                ${imageContent}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                <div class="project-links">
                    ${playstoreLink !== '#' ? `<a href="${playstoreLink}" target="_blank" class="btn-link"><i class="fab fa-google-play"></i> Play Store</a>` : ''}
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}


function populateExperience() {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = '';
    
    portfolioData.experience.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        let responsibilitiesList = '';
        exp.responsibilities.forEach(responsibility => {
            responsibilitiesList += `<li>${responsibility}</li>`;
        });
        
        const typeBadge = exp.type ? `<span style="display:inline-block;background:var(--gradient-1);padding:0.25rem 0.75rem;border-radius:15px;font-size:0.8rem;margin-left:0.5rem;">${exp.type}</span>` : '';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>${exp.title}${typeBadge}</h3>
                <span class="company">${exp.company}</span>
                <span class="duration">${exp.duration}</span>
                <p>${exp.description}</p>
                <ul>${responsibilitiesList}</ul>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

function populateEducation() {
    const educationGrid = document.querySelector('.education-grid');
    educationGrid.innerHTML = '';
    
    portfolioData.education.forEach(edu => {
        const eduCard = document.createElement('div');
        eduCard.className = 'education-card';
        
        let content = '';
        if (edu.type === 'degree') {
            const fieldInfo = edu.field ? `<br><em style="color:var(--text-secondary);font-size:0.9rem;">${edu.field}</em>` : '';
            const cgpaInfo = edu.cgpa ? `<br><strong style="color:var(--primary-color);font-size:1rem;">${edu.cgpa}</strong>` : '';
            
            content = `
                <div class="education-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h3>${edu.degree}</h3>
                <span class="institution">${edu.institution}</span>
                <span class="year">${edu.year}</span>
                ${fieldInfo}
                ${cgpaInfo}
                <p style="margin-top:1rem;">${edu.description}</p>
            `;
        } else if (edu.type === 'achievement') {
            content = `
                <div class="education-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>${edu.degree}</h3>
                <span class="institution">${edu.institution}</span>
                <span class="year">${edu.year}</span>
                <p style="margin-top:1rem;">${edu.description}</p>
            `;
        } else {
            let certList = '';
            edu.certificates.forEach(cert => {
                certList += `<li>${cert}</li>`;
            });
            
            content = `
                <div class="education-icon">
                    <i class="fas fa-certificate"></i>
                </div>
                <h3>${edu.degree}</h3>
                <span class="institution">${edu.institution}</span>
                <span class="year">${edu.year}</span>
                <ul class="cert-list">${certList}</ul>
            `;
        }
        
        eduCard.innerHTML = content;
        educationGrid.appendChild(eduCard);
    });
}

function populateContact() {
    document.querySelector('.contact-info h3').textContent = portfolioData.contact.title;
    document.querySelector('.contact-info p').textContent = portfolioData.contact.description;
    
    const contactItems = document.querySelectorAll('.contact-item p');
    contactItems[0].textContent = portfolioData.contact.email;
    contactItems[1].textContent = portfolioData.contact.phone;
    contactItems[2].textContent = portfolioData.contact.location;
    
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs[0].placeholder = portfolioData.contact.form.namePlaceholder;
    formInputs[1].placeholder = portfolioData.contact.form.emailPlaceholder;
    formInputs[2].placeholder = portfolioData.contact.form.subjectPlaceholder;
    formInputs[3].placeholder = portfolioData.contact.form.messagePlaceholder;
    
    document.querySelector('.contact-form button span').textContent = portfolioData.contact.form.submitButton;
}

// Initialize portfolio functionality
function initializePortfolio() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling with navbar offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate Skill Progress Bars on Scroll
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            bar.style.width = '0%';
            observer.observe(bar);
        });
    };

    // Initialize skill animation
    setTimeout(animateSkills, 100);

    // Navbar Background on Scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const isLightTheme = document.body.classList.contains('theme-light');
        
        if (window.scrollY > 100) {
            navbar.style.background = isLightTheme 
                ? 'rgba(248, 250, 252, 0.98)' 
                : 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = isLightTheme 
                ? 'rgba(248, 250, 252, 0.95)' 
                : 'rgba(15, 23, 42, 0.95)';
        }
    }
    
    window.addEventListener('scroll', updateNavbarBackground);
    
    // Update navbar when theme changes
    const themeObserver = new MutationObserver(updateNavbarBackground);
    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Active Section Highlight in Navbar
    const sections = document.querySelectorAll('section[id]');

    const highlightNavItem = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavItem);

    // Form Submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const sendButton = document.getElementById('send-button');
    const originalButtonText = sendButton.querySelector('span')?.textContent;

    if (contactForm) {
        // Initialize EmailJS (you'll need to set up EmailJS account and get these values)
        // For now, we'll provide a client-side mailto solution that works without setup
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link
            const mailtoLink = `mailto:bhavanasiyeshwanth@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`)}`;
            
            // Show loading state
            sendButton.disabled = true;
            sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message after a brief delay
            setTimeout(() => {
                formStatus.innerHTML = '<div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; color: #10b981;"><i class="fas fa-check-circle"></i> Email client opened! Please send the message.</div>';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    sendButton.disabled = false;
                    sendButton.innerHTML = `<span>${originalButtonText || 'Send Message'}</span><i class="fas fa-paper-plane"></i>`;
                    formStatus.innerHTML = '';
                    contactForm.reset();
                }, 3000);
            }, 500);
        });
    }
    
    // Alternative: EmailJS implementation (requires setup)
    function initEmailJS() {
        // Uncomment and configure these when you set up EmailJS account
        /*
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
        
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const sendButton = document.getElementById('send-button');
                const formStatus = document.getElementById('form-status');
                
                sendButton.disabled = true;
                sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                    .then(() => {
                        formStatus.innerHTML = '<div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; color: #10b981;"><i class="fas fa-check-circle"></i> Message sent successfully!</div>';
                        contactForm.reset();
                        
                        setTimeout(() => {
                            sendButton.disabled = false;
                            sendButton.innerHTML = `<span>${document.querySelector('.btn-content').textContent}</span><i class="fas fa-paper-plane"></i>`;
                            formStatus.innerHTML = '';
                        }, 3000);
                    })
                    .catch((error) => {
                        formStatus.innerHTML = '<div style="padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; color: #ef4444;"><i class="fas fa-exclamation-circle"></i> Error sending message. Please try again.</div>';
                        
                        setTimeout(() => {
                            sendButton.disabled = false;
                            sendButton.innerHTML = `<span>${document.querySelector('.btn-content').textContent}</span><i class="fas fa-paper-plane"></i>`;
                            formStatus.innerHTML = '';
                        }, 3000);
                    });
            });
        }
        */
    }

    // Fade in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Initialize animations
    document.addEventListener('DOMContentLoaded', () => {
        // Add scroll animations to cards
        const cards = document.querySelectorAll('.project-card, .education-card, .stat');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            cardObserver.observe(card);
        });
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-fade-in-delay-3, .animate-fade-in-delay-4');
        heroElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        });
        
        setTimeout(() => {
            heroElements.forEach(element => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        }, 100);
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - scrolled / 700;
        }
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Load portfolio data when page loads
document.addEventListener('DOMContentLoaded', loadPortfolioData);

// Theme Switching Functionality
function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeSelector = document.querySelector('.theme-selector');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Toggle theme selector dropdown
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themeSelector.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeSelector.contains(e.target)) {
            themeSelector.classList.remove('active');
        }
    });
    
    // Apply theme
    function applyTheme(theme, isUserSelection = false) {
        const body = document.body;
        
        // Remove all theme classes
        body.classList.remove('theme-light', 'theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
        
        // Add selected theme class (skip default)
        if (theme !== 'default') {
            body.classList.add(`theme-${theme}`);
        }
        
        // Save to localStorage
        localStorage.setItem('selectedTheme', theme);
        
        // Track if user manually selected a theme
        if (isUserSelection) {
            localStorage.setItem('userSelectedTheme', 'true');
        }
    }
    
    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            applyTheme(theme, true); // Pass true to indicate manual selection
            themeSelector.classList.remove('active');
        });
    });
    
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem('selectedTheme');
    
    if (savedTheme) {
        // Use saved theme if exists
        applyTheme(savedTheme, false);
    } else {
        // Detect system theme preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Apply system theme or default to dark
        if (systemPrefersDark) {
            applyTheme('default', false); // Default is dark theme
        } else {
            applyTheme('light', false);
        }
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Only auto-update if user hasn't manually selected a theme
        const userSelectedTheme = localStorage.getItem('userSelectedTheme');
        if (!userSelectedTheme) {
            const theme = e.matches ? 'default' : 'light';
            applyTheme(theme, false); // false = automatic, not manual
        }
    });
}

// Initialize theme switcher
document.addEventListener('DOMContentLoaded', initThemeSwitcher);
