/**
 * BizLink - Professional Networking Site
 * Vanilla JavaScript implementation for a LinkedIn-style social platform
 */

// Utility functions for DOM manipulation
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

// Application state
const state = {
    currentUser: {
        name: "Ramesh Kumar",
        badge: "Business",
        businessName: "ABC Traders",
        avatarUrl: null
    },
    posts: [],
    filteredPosts: [],
    currentSection: "home",
    lightbox: {
        images: [],
        currentIndex: 0
    }
};

// Time utility function
function timeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1m ago";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours === 1) return "1h ago";
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "1d ago";
    return `${days}d ago`;
}

// Generate unique IDs
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Sample data initialization
function initializeSampleData() {
    const samplePosts = [
        {
            id: generateId(),
            author: {
                name: "Priya Sharma",
                badge: "Business",
                businessName: "Tech Innovations Ltd",
                avatarUrl: null
            },
            text: "Excited to announce our new AI-powered analytics platform! We've been working hard to deliver cutting-edge solutions for businesses.",
            images: [],
            likes: 23,
            comments: [],
            createdAt: Date.now() - 7200000, // 2 hours ago
            isLiked: false
        },
        {
            id: generateId(),
            author: {
                name: "Arjun Patel",
                badge: "Individual",
                businessName: "",
                avatarUrl: null
            },
            text: "Just completed my certification in digital marketing. Looking forward to applying these new skills in real-world projects!",
            images: [
                "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f0f9ff"/>
                    <rect x="20" y="20" width="360" height="40" fill="#0066cc" rx="5"/>
                    <text x="200" y="45" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">Digital Marketing Certificate</text>
                    <circle cx="80" cy="120" r="30" fill="#22c55e"/>
                    <path d="M70 120 L78 128 L90 112" stroke="white" stroke-width="3" fill="none"/>
                    <text x="130" y="125" fill="#1f2937" font-family="Arial" font-size="18" font-weight="bold">Course Completed</text>
                    <rect x="20" y="160" width="360" height="2" fill="#e5e7eb"/>
                    <text x="200" y="200" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="14">Google Digital Marketing Fundamentals</text>
                    <text x="200" y="230" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="12">Issued: August 2025</text>
                </svg>`),
                "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#fef3c7"/>
                    <text x="200" y="40" text-anchor="middle" fill="#92400e" font-family="Arial" font-size="20" font-weight="bold">Study Progress</text>
                    <rect x="50" y="80" width="300" height="20" fill="#fde68a" rx="10"/>
                    <rect x="50" y="80" width="300" height="20" fill="#f59e0b" rx="10"/>
                    <text x="200" y="95" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">100% Complete</text>
                    <text x="200" y="140" text-anchor="middle" fill="#92400e" font-family="Arial" font-size="16">32 Modules Completed</text>
                    <text x="200" y="170" text-anchor="middle" fill="#92400e" font-family="Arial" font-size="14">156 Hours of Learning</text>
                    <text x="200" y="200" text-anchor="middle" fill="#92400e" font-family="Arial" font-size="14">Final Score: 94%</text>
                </svg>`)
            ],
            likes: 15,
            comments: [
                { author: "Meera Singh", text: "Congratulations! Well deserved." },
                { author: "Vikram Joshi", text: "Great achievement!" }
            ],
            createdAt: Date.now() - 14400000, // 4 hours ago
            isLiked: false
        },
        {
            id: generateId(),
            author: {
                name: "Sneha Gupta",
                badge: "Business",
                businessName: "Green Energy Solutions",
                avatarUrl: null
            },
            text: "Sustainability isn't just a buzzword - it's the future of business. Our latest solar project will power 500 homes with clean energy.",
            images: [],
            likes: 45,
            comments: [],
            createdAt: Date.now() - 21600000, // 6 hours ago
            isLiked: true
        },
        {
            id: generateId(),
            author: {
                name: "Rahul Kumar",
                badge: "Individual",
                businessName: "",
                avatarUrl: null
            },
            text: "Networking event was amazing! Met so many talented professionals. The startup ecosystem in our city is truly thriving.",
            images: [],
            likes: 8,
            comments: [
                { author: "Anjali Rao", text: "Wish I could have joined! Next time for sure." }
            ],
            createdAt: Date.now() - 43200000, // 12 hours ago
            isLiked: false
        },
        {
            id: generateId(),
            author: {
                name: "Dr. Kavita Reddy",
                badge: "Business",
                businessName: "HealthTech Research",
                avatarUrl: null
            },
            text: "Our latest research on telemedicine adoption shows remarkable growth. Healthcare is becoming more accessible than ever before.",
            images: [],
            likes: 67,
            comments: [
                { author: "Suresh Naidu", text: "Fascinating research! Any plans for implementation?" },
                { author: "Lakshmi Nair", text: "This could revolutionize rural healthcare." }
            ],
            createdAt: Date.now() - 86400000, // 1 day ago
            isLiked: false
        },
        {
            id: generateId(),
            author: {
                name: "Manish Agarwal",
                badge: "Business",
                businessName: "Fintech Innovators",
                avatarUrl: null
            },
            text: "Digital payments have transformed how we do business. Proud to be part of India's fintech revolution!",
            images: [],
            likes: 34,
            comments: [],
            createdAt: Date.now() - 172800000, // 2 days ago
            isLiked: false
        }
    ];
    
    state.posts = samplePosts;
    state.filteredPosts = [...samplePosts];
}

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    qsa('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = qs(`#${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation buttons
    qsa('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (sectionId === 'home') {
        qs('#btnHome').classList.add('active');
    } else if (sectionId === 'profile') {
        qs('#btnProfile').classList.add('active');
    }
    
    state.currentSection = sectionId;
    
    // Update content based on section
    if (sectionId === 'profile') {
        renderProfilePosts();
    }
}

// Modal functions
function openModal(modalId) {
    const modal = qs(`#${modalId}`);
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        // Trap focus within modal
        trapFocus(modal);
    }
}

function closeModal(modalId) {
    const modal = qs(`#${modalId}`);
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Reset form
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Image handling functions
function handleImageUpload(files) {
    const imagePreview = qs('#imagePreview');
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    imagePreview.innerHTML = '';
    const validFiles = [];
    
    Array.from(files).forEach((file, index) => {
        // Validate file type
        if (!validTypes.includes(file.type)) {
            alert(`File "${file.name}" is not a supported image format. Please use JPG, PNG, or WebP.`);
            return;
        }
        
        // Validate file size
        if (file.size > maxSize) {
            alert(`File "${file.name}" is too large. Please choose files under 5MB.`);
            return;
        }
        
        validFiles.push(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview ${index + 1}">
                <button type="button" class="preview-remove" data-index="${index}" aria-label="Remove image">×</button>
            `;
            imagePreview.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
    
    return validFiles;
}

function removePreviewImage(index) {
    const fileInput = qs('#postImages');
    const dt = new DataTransfer();
    const files = Array.from(fileInput.files);
    
    files.forEach((file, i) => {
        if (i !== index) {
            dt.items.add(file);
        }
    });
    
    fileInput.files = dt.files;
    updatePostButton();
    
    // Rebuild preview to fix indices
    const imagePreview = qs('#imagePreview');
    imagePreview.innerHTML = '';
    
    if (fileInput.files.length > 0) {
        handleImageUpload(fileInput.files);
    }
}

// Lightbox functionality
function openLightbox(images, startIndex = 0) {
    state.lightbox.images = images;
    state.lightbox.currentIndex = startIndex;
    
    const lightboxModal = qs('#lightboxModal');
    const lightboxImage = qs('#lightboxImage');
    const lightboxCounter = qs('#lightboxCounter');
    
    lightboxImage.src = images[startIndex];
    lightboxCounter.textContent = `${startIndex + 1} / ${images.length}`;
    
    // Show/hide navigation buttons
    const prevBtn = qs('.lightbox-prev');
    const nextBtn = qs('.lightbox-next');
    
    prevBtn.style.display = images.length > 1 ? 'block' : 'none';
    nextBtn.style.display = images.length > 1 ? 'block' : 'none';
    
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    
    // Focus management
    qs('.lightbox-close').focus();
}

function closeLightbox() {
    const lightboxModal = qs('#lightboxModal');
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    
    state.lightbox.images = [];
    state.lightbox.currentIndex = 0;
}

function navigateLightbox(direction) {
    const { images, currentIndex } = state.lightbox;
    let newIndex;
    
    if (direction === 'next') {
        newIndex = currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
    } else {
        newIndex = currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    }
    
    state.lightbox.currentIndex = newIndex;
    
    const lightboxImage = qs('#lightboxImage');
    const lightboxCounter = qs('#lightboxCounter');
    
    lightboxImage.src = images[newIndex];
    lightboxCounter.textContent = `${newIndex + 1} / ${images.length}`;
}

// Post creation and management
function createPost(text, images) {
    const post = {
        id: generateId(),
        author: { ...state.currentUser },
        text: text.trim(),
        images: images || [],
        likes: 0,
        comments: [],
        createdAt: Date.now(),
        isLiked: false
    };
    
    // Add to beginning of posts array
    state.posts.unshift(post);
    state.filteredPosts.unshift(post);
    
    return post;
}

function toggleLike(postId) {
    const post = state.posts.find(p => p.id === postId);
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        
        // Update UI
        renderFeed();
        if (state.currentSection === 'profile') {
            renderProfilePosts();
        }
    }
}

function addComment(postId, commentText) {
    const post = state.posts.find(p => p.id === postId);
    if (post && commentText.trim()) {
        post.comments.push({
            author: state.currentUser.name,
            text: commentText.trim()
        });
        
        // Update UI
        renderFeed();
        if (state.currentSection === 'profile') {
            renderProfilePosts();
        }
    }
}

function toggleComments(postId) {
    const commentsSection = qs(`#comments-${postId}`);
    if (commentsSection) {
        const isHidden = commentsSection.style.display === 'none';
        commentsSection.style.display = isHidden ? 'block' : 'none';
        
        if (isHidden) {
            // Focus comment input when showing
            const commentInput = commentsSection.querySelector('.comment-input');
            if (commentInput) {
                commentInput.focus();
            }
        }
    }
}

// Rendering functions
function renderPost(post, container) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.setAttribute('data-post-id', post.id);
    
    // Create images HTML
    let imagesHTML = '';
    if (post.images && post.images.length > 0) {
        const imageClass = post.images.length === 1 ? 'single' : 
                          post.images.length === 2 ? 'double' : 'triple';
        
        imagesHTML = `
            <div class="post-images ${imageClass}" data-post-id="${post.id}">
                ${post.images.map((img, index) => 
                    `<img src="${img}" alt="Post image ${index + 1}" loading="lazy" 
                     data-image-index="${index}" role="button" tabindex="0" 
                     aria-label="View image ${index + 1} in lightbox">`
                ).join('')}
            </div>
        `;
    }
    
    // Create comments HTML
    const commentsHTML = post.comments.map(comment => `
        <div class="comment">
            <div class="comment-author">${comment.author}</div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `).join('');
    
    postElement.innerHTML = `
        <div class="post-header">
            <div class="avatar">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            <div class="post-info">
                <h3>${post.author.name}</h3>
                <div class="post-meta">
                    <span class="badge ${post.author.badge.toLowerCase()}">${post.author.badge}</span>
                    ${post.author.businessName ? `<span class="business-name">${post.author.businessName}</span>` : ''}
                    <span class="post-time">${timeAgo(post.createdAt)}</span>
                </div>
            </div>
        </div>
        
        <div class="post-content">${post.text}</div>
        
        ${imagesHTML}
        
        <div class="post-actions">
            <button class="action-btn like-btn ${post.isLiked ? 'liked' : ''}" data-post-id="${post.id}" aria-label="Like post">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3m0 0V9a2 2 0 0 1 2-2h.09a2 2 0 0 1 2 1.8l.51 3.8h6a2 2 0 0 1 2 2.3l-.46 4.15A2 2 0 0 1 17.16 19H10" stroke="currentColor" stroke-width="2" fill="${post.isLiked ? 'currentColor' : 'none'}"/>
                </svg>
                ${post.likes}
            </button>
            
            <button class="action-btn comment-btn" data-post-id="${post.id}" aria-label="Toggle comments">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2"/>
                </svg>
                ${post.comments.length} Comments
            </button>
        </div>
        
        <div class="comments-section" id="comments-${post.id}" style="display: none;">
            <div class="comment-form">
                <input type="text" class="comment-input" placeholder="Write a comment..." aria-label="Write a comment">
                <button type="button" class="comment-btn" data-post-id="${post.id}">Post</button>
            </div>
            <div class="comments-list">
                ${commentsHTML}
            </div>
        </div>
    `;
    
    container.appendChild(postElement);
}

function renderFeed() {
    const feedContainer = qs('#feed');
    feedContainer.innerHTML = '';
    
    if (state.filteredPosts.length === 0) {
        feedContainer.innerHTML = `
            <div class="card">
                <div style="text-align: center; padding: 2rem; color: #7f8c8d;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 1rem;">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="m9 9 6 6" stroke="currentColor" stroke-width="2"/>
                        <path d="m15 9-6 6" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or create a new post.</p>
                </div>
            </div>
        `;
        return;
    }
    
    state.filteredPosts.forEach(post => {
        renderPost(post, feedContainer);
    });
}

function renderProfilePosts() {
    const profileContainer = qs('#profilePosts');
    profileContainer.innerHTML = '';
    
    const userPosts = state.posts.filter(post => 
        post.author.name === state.currentUser.name
    );
    
    if (userPosts.length === 0) {
        profileContainer.innerHTML = `
            <div class="card">
                <div style="text-align: center; padding: 2rem; color: #7f8c8d;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 1rem;">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                        <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
                        <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <h3>No posts yet</h3>
                    <p>Share your first post to get started!</p>
                </div>
            </div>
        `;
        return;
    }
    
    userPosts.forEach(post => {
        renderPost(post, profileContainer);
    });
}

// Search functionality
function performSearch(query) {
    if (!query.trim()) {
        state.filteredPosts = [...state.posts];
    } else {
        const searchTerm = query.toLowerCase();
        state.filteredPosts = state.posts.filter(post => 
            post.text.toLowerCase().includes(searchTerm) ||
            post.author.name.toLowerCase().includes(searchTerm) ||
            (post.author.businessName && post.author.businessName.toLowerCase().includes(searchTerm))
        );
    }
    
    renderFeed();
}

// Form validation and submission
function updatePostButton() {
    const postText = qs('#postText').value.trim();
    const postImages = qs('#postImages').files;
    const postButton = qs('#btnPost');
    
    postButton.disabled = !postText && postImages.length === 0;
}

function handlePostSubmit(e) {
    e.preventDefault();
    
    const postText = qs('#postText').value.trim();
    const postImagesInput = qs('#postImages');
    const imageFiles = Array.from(postImagesInput.files);
    
    if (!postText && imageFiles.length === 0) {
        alert('Please enter some text or select images to post.');
        return;
    }
    
    // Convert images to base64 for storage
    const imagePromises = imageFiles.map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    });
    
    Promise.all(imagePromises).then(images => {
        createPost(postText, images);
        
        // Clear form
        qs('#postText').value = '';
        postImagesInput.value = '';
        qs('#imagePreview').innerHTML = '';
        updatePostButton();
        
        // Update feed
        renderFeed();
        
        // Show success message
        showNotification('Post created successfully!');
    });
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Event listeners setup
function setupEventListeners() {
    // Navigation
    qs('#logo').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('home');
    });
    
    qs('#btnHome').addEventListener('click', () => showSection('home'));
    qs('#btnProfile').addEventListener('click', () => showSection('profile'));
    qs('#btnLogin').addEventListener('click', () => openModal('loginModal'));
    qs('#btnRegister').addEventListener('click', () => openModal('registerModal'));
    
    // Search
    qs('#searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(qs('#searchInput').value);
    });
    
    qs('#searchInput').addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
    
    // Post composer
    qs('#postText').addEventListener('input', updatePostButton);
    qs('#postImages').addEventListener('change', (e) => {
        handleImageUpload(e.target.files);
        updatePostButton();
    });
    
    qs('#composer form').addEventListener('submit', handlePostSubmit);
    
    // Image preview removal
    qs('#imagePreview').addEventListener('click', (e) => {
        if (e.target.classList.contains('preview-remove')) {
            const index = parseInt(e.target.dataset.index);
            removePreviewImage(index);
        }
    });
    
    // Lightbox controls
    qs('.lightbox-close').addEventListener('click', closeLightbox);
    qs('.lightbox-prev').addEventListener('click', () => navigateLightbox('prev'));
    qs('.lightbox-next').addEventListener('click', () => navigateLightbox('next'));
    
    // Lightbox overlay click to close
    qs('#lightboxModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('lightbox-overlay')) {
            closeLightbox();
        }
    });
    
    // Modal controls
    qsa('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Modal overlay click
    qsa('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Modal form switching
    qs('#switchToRegister').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('loginModal');
        openModal('registerModal');
    });
    
    qs('#switchToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('registerModal');
        openModal('loginModal');
    });
    
    // Feed interactions (using event delegation)
    qs('#feed').addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            const postId = target.dataset.postId;
            
            if (target.classList.contains('like-btn')) {
                toggleLike(postId);
            } else if (target.classList.contains('comment-btn')) {
                toggleComments(postId);
            } else if (target.classList.contains('comment-btn') && target.textContent === 'Post') {
                const commentInput = target.previousElementSibling;
                addComment(postId, commentInput.value);
                commentInput.value = '';
            }
        }
        
        // Handle image clicks for lightbox
        if (e.target.tagName === 'IMG' && e.target.closest('.post-images')) {
            const postId = e.target.closest('.post-images').dataset.postId;
            const imageIndex = parseInt(e.target.dataset.imageIndex);
            const post = state.filteredPosts.find(p => p.id === postId);
            
            if (post && post.images.length > 0) {
                openLightbox(post.images, imageIndex);
            }
        }
    });
    
    // Handle keyboard navigation for images
    qs('#feed').addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.tagName === 'IMG' && e.target.closest('.post-images')) {
            e.preventDefault();
            const postId = e.target.closest('.post-images').dataset.postId;
            const imageIndex = parseInt(e.target.dataset.imageIndex);
            const post = state.filteredPosts.find(p => p.id === postId);
            
            if (post && post.images.length > 0) {
                openLightbox(post.images, imageIndex);
            }
        }
    });
    
    // Profile posts interactions
    qs('#profilePosts').addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            const postId = target.dataset.postId;
            
            if (target.classList.contains('like-btn')) {
                toggleLike(postId);
            } else if (target.classList.contains('comment-btn')) {
                toggleComments(postId);
            }
        }
        
        // Handle image clicks for lightbox in profile
        if (e.target.tagName === 'IMG' && e.target.closest('.post-images')) {
            const postId = e.target.closest('.post-images').dataset.postId;
            const imageIndex = parseInt(e.target.dataset.imageIndex);
            const post = state.posts.find(p => p.id === postId);
            
            if (post && post.images.length > 0) {
                openLightbox(post.images, imageIndex);
            }
        }
    });
    
    // Handle keyboard navigation for profile images
    qs('#profilePosts').addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.tagName === 'IMG' && e.target.closest('.post-images')) {
            e.preventDefault();
            const postId = e.target.closest('.post-images').dataset.postId;
            const imageIndex = parseInt(e.target.dataset.imageIndex);
            const post = state.posts.find(p => p.id === postId);
            
            if (post && post.images.length > 0) {
                openLightbox(post.images, imageIndex);
            }
        }
    });
    
    // Comment submission
    document.addEventListener('keypress', (e) => {
        if (e.target.classList.contains('comment-input') && e.key === 'Enter') {
            const postId = e.target.closest('.comments-section').id.replace('comments-', '');
            addComment(postId, e.target.value);
            e.target.value = '';
        }
    });
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('comment-btn') && e.target.textContent === 'Post') {
            const postId = e.target.dataset.postId;
            const commentInput = e.target.previousElementSibling;
            addComment(postId, commentInput.value);
            commentInput.value = '';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            qsa('.modal.active').forEach(modal => {
                if (modal.id === 'lightboxModal') {
                    closeLightbox();
                } else {
                    closeModal(modal.id);
                }
            });
        }
        
        // Lightbox navigation with arrow keys
        if (qs('#lightboxModal').classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigateLightbox('next');
            }
        }
    });
    
    // Form submissions
    qs('#loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal('loginModal');
        showNotification('Login functionality will be implemented with backend!');
    });
    
    qs('#registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal('registerModal');
        showNotification('Registration functionality will be implemented with backend!');
    });
}

// Initialize application
function init() {
    console.log('BizLink initializing...');
    
    // Initialize sample data
    initializeSampleData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial render
    showSection('home');
    renderFeed();
    updatePostButton();
    
    console.log('BizLink initialized successfully!');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
