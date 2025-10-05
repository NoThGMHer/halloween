// Halloween Horror Tracker - Main JavaScript

// Global variables
let currentList = 'list1';
let movies = {
    list1: [
        {
            id: 1,
            title: "Longlegs",
            type: "movie",
            status: "watched",
            rating: 5,
            poster: "https://kimi-web-img.moonshot.cn/img/posterspy.com/65cefa549de49c757d8007d420df06328264ce64.jpg",
            dateAdded: "2024-01-15"
        },
        {
            id: 2,
            title: "Nosferatu",
            type: "movie",
            status: "watching",
            rating: 0,
            poster: "https://kimi-web-img.moonshot.cn/img/posterspy.com/432e09a84b86cdcaf720d14b9d419284e8e94733.jpg",
            dateAdded: "2024-01-20"
        },
        {
            id: 3,
            title: "The Substance",
            type: "movie",
            status: "not-watched",
            rating: 0,
            poster: "",
            dateAdded: "2024-02-01"
        },
        {
            id: 4,
            title: "Hereditary",
            type: "movie",
            status: "cant-watch",
            rating: 5,
            poster: "https://kimi-web-img.moonshot.cn/img/m.media-amazon.com/5aebaa3384ef1f67b9fac3bbef1d9552b67150f9.jpg",
            dateAdded: "2024-02-05"
        },
        {
            id: 5,
            title: "Late Night with the Devil",
            type: "movie",
            status: "watched",
            rating: 4,
            poster: "https://kimi-web-img.moonshot.cn/img/i.ebayimg.com/31c77710ff4be8fd8de919ecb3db68943e4d8832.JPG",
            dateAdded: "2024-02-10"
        },
        {
            id: 6,
            title: "Oddity",
            type: "movie",
            status: "watched",
            rating: 3,
            poster: "https://kimi-web-img.moonshot.cn/img/static1.moviewebimages.com/1c5e5d59fb8ba631caece6805677ab0f98f7ad43.jpg",
            dateAdded: "2024-02-15"
        }
    ],
    list2: [
        {
            id: 7,
            title: "The Haunting of Hill House",
            type: "show",
            status: "watched",
            rating: 4,
            poster: "",
            dateAdded: "2024-01-10"
        },
        {
            id: 8,
            title: "Midnight Mass",
            type: "show",
            status: "not-watched",
            rating: 0,
            poster: "",
            dateAdded: "2024-01-25"
        },
        {
            id: 9,
            title: "Evil",
            type: "show",
            status: "watching",
            rating: 0,
            poster: "",
            dateAdded: "2024-02-03"
        },
        {
            id: 10,
            title: "American Horror Story",
            type: "show",
            status: "cant-watch",
            rating: 5,
            poster: "",
            dateAdded: "2024-02-08"
        },
        {
            id: 11,
            title: "The Fall of the House of Usher",
            type: "show",
            status: "watched",
            rating: 5,
            poster: "",
            dateAdded: "2024-02-12"
        },
        {
            id: 12,
            title: "Interview with the Vampire",
            type: "show",
            status: "not-watched",
            rating: 0,
            poster: "",
            dateAdded: "2024-02-20"
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize typewriter effect
    new Typed('#typed-text', {
        strings: ['Horror Tracker', 'Spooky Movies', 'Ghost Ratings'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });

    // Initialize particles
    initParticles();
    
    // Load movies from localStorage if available
    loadMoviesFromStorage();
    
    // Render initial movie list
    renderMovies();
    updateStatistics();
    
    // Add scroll animations
    initScrollAnimations();
}

// Particle system using p5.js
function initParticles() {
    new p5(function(p) {
        let particles = [];
        
        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particles-container');
            
            // Create initial particles
            for (let i = 0; i < 20; i++) {
                particles.push(new Particle(p));
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and display particles
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].display();
                
                if (particles[i].isDead()) {
                    particles.splice(i, 1);
                }
            }
            
            // Add new particles occasionally
            if (p.random() < 0.02) {
                particles.push(new Particle(p));
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
        
        // Particle class
        function Particle(p) {
            this.x = p.random(p.width);
            this.y = p.height + 50;
            this.vx = p.random(-0.5, 0.5);
            this.vy = p.random(-1, -0.3);
            this.alpha = 255;
            this.size = p.random(2, 6);
            
            this.update = function() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= 1;
            };
            
            this.display = function() {
                p.fill(248, 248, 240, this.alpha * 0.3);
                p.noStroke();
                p.ellipse(this.x, this.y, this.size);
            };
            
            this.isDead = function() {
                return this.alpha <= 0 || this.y < -50;
            };
        }
    });
}

// Movie management functions
function switchList(listId) {
    currentList = listId;
    
    // Update button states
    document.querySelectorAll('.list-toggle button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(listId + '-btn').classList.add('active');
    
    // Hide all lists
    document.querySelectorAll('.movie-list').forEach(list => {
        list.classList.add('hidden');
    });
    
    // Show current list
    document.getElementById(listId).classList.remove('hidden');
    
    // Re-render movies for current list
    renderMovies();
    updateStatistics();
}

function renderMovies() {
    const grid = document.getElementById(currentList + '-grid');
    const currentMovies = movies[currentList];
    
    grid.innerHTML = '';
    
    currentMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        grid.appendChild(movieCard);
    });
    
    // Animate cards
    anime({
        targets: '.movie-card',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart'
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = `movie-card rounded-lg p-4 status-${movie.status} opacity-0`;
    
    const posterHtml = movie.poster ? 
        `<img src="${movie.poster}" alt="${movie.title}" class="w-full h-48 object-cover rounded-lg mb-4" onerror="this.style.display='none'">` :
        `<div class="w-full h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
            <span class="text-4xl">🎬</span>
        </div>`;
    
    const statusBadge = getStatusBadge(movie.status);
    const ratingHtml = movie.status === 'watched' ? createRatingHtml(movie) : '';
    const cantWatchHtml = movie.status === 'cant-watch' ? createCantWatchHtml() : '';
    
    card.innerHTML = `
        ${posterHtml}
        <div class="flex justify-between items-start mb-2">
            <span class="text-xs px-2 py-1 rounded-full ${statusBadge.class}">${statusBadge.text}</span>
            <button onclick="deleteMovie(${movie.id})" class="text-red-400 hover:text-red-300 transition-colors">
                🗑️
            </button>
        </div>
        <h3 class="font-bold text-lg mb-2 text-white">${movie.title}</h3>
        <p class="text-sm text-gray-400 mb-3">${movie.type === 'movie' ? '🎬 Movie' : '📺 TV Show'}</p>
        
        <div class="mb-3">
            <select onchange="updateMovieStatus(${movie.id}, this.value)" 
                    class="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded text-sm">
                <option value="not-watched" ${movie.status === 'not-watched' ? 'selected' : ''}>Not Watched</option>
                <option value="watching" ${movie.status === 'watching' ? 'selected' : ''}>Watching</option>
                <option value="watched" ${movie.status === 'watched' ? 'selected' : ''}>Watched</option>
                <option value="cant-watch" ${movie.status === 'cant-watch' ? 'selected' : ''}>Can't Watch</option>
            </select>
        </div>
        
        ${ratingHtml}
        ${cantWatchHtml}
        
        <div class="text-xs text-gray-500 mt-2">
            Added ${new Date(movie.dateAdded).toLocaleDateString()}
        </div>
    `;
    
    return card;
}

function getStatusBadge(status) {
    const badges = {
        'not-watched': { text: 'Not Watched', class: 'bg-gray-600 text-gray-200' },
        'watching': { text: 'Watching', class: 'bg-orange-500 text-black' },
        'watched': { text: 'Watched', class: 'bg-green-600 text-white' },
        'cant-watch': { text: 'Too Scary', class: 'bg-red-600 text-white' }
    };
    return badges[status];
}

function createRatingHtml(movie) {
    if (movie.rating === 0) {
        return `
            <div class="mb-3">
                <div class="text-sm text-gray-400 mb-2">Rate the scare level:</div>
                <div class="ghost-rating" data-movie-id="${movie.id}">
                    ${[1,2,3,4,5].map(i => 
                        `<span class="ghost ghost-${i}" onclick="rateMovie(${movie.id}, ${i})">👻</span>`
                    ).join('')}
                </div>
            </div>
        `;
    } else {
        return `
            <div class="mb-3">
                <div class="text-sm text-gray-400 mb-2">Scare Rating:</div>
                <div class="ghost-rating">
                    ${Array(movie.rating).fill().map((_, i) => 
                        `<span class="ghost ghost-${i+1}">👻</span>`
                    ).join('')}
                    <button onclick="clearRating(${movie.id})" class="ml-2 text-xs text-gray-500 hover:text-white">Clear</button>
                </div>
            </div>
        `;
    }
}

function createCantWatchHtml() {
    return `
        <div class="mb-3">
            <div class="text-sm text-red-400 mb-2">Too Scary Rating:</div>
            <div class="ghost-rating">
                ${Array(5).fill().map((_, i) => 
                    `<span class="ghost ghost-${i+1} ghost-red">👻</span>`
                ).join('')}
            </div>
        </div>
    `;
}

function rateMovie(movieId, rating) {
    const movie = findMovieById(movieId);
    if (movie) {
        movie.rating = rating;
        saveMoviesToStorage();
        renderMovies();
        updateStatistics();
        
        // Animate the rating
        anime({
            targets: `[data-movie-id="${movieId}"] .ghost-${rating}`,
            scale: [1, 1.5, 1],
            duration: 600,
            easing: 'easeOutElastic(1, .8)'
        });
    }
}

function clearRating(movieId) {
    const movie = findMovieById(movieId);
    if (movie) {
        movie.rating = 0;
        saveMoviesToStorage();
        renderMovies();
        updateStatistics();
    }
}

function updateMovieStatus(movieId, newStatus) {
    const movie = findMovieById(movieId);
    if (movie) {
        movie.status = newStatus;
        saveMoviesToStorage();
        renderMovies();
        updateStatistics();
    }
}

function deleteMovie(movieId) {
    if (confirm('Are you sure you want to delete this movie from your list?')) {
        // Find and remove movie from current list
        const list = movies[currentList];
        const index = list.findIndex(movie => movie.id === movieId);
        if (index > -1) {
            list.splice(index, 1);
            saveMoviesToStorage();
            renderMovies();
            updateStatistics();
        }
    }
}

function findMovieById(movieId) {
    return movies.list1.find(movie => movie.id === movieId) || 
           movies.list2.find(movie => movie.id === movieId);
}

// Modal functions
function openAddModal() {
    document.getElementById('add-modal').classList.remove('hidden');
    document.getElementById('add-modal').classList.add('flex');
    document.getElementById('movie-title').focus();
}

function closeAddModal() {
    document.getElementById('add-modal').classList.add('hidden');
    document.getElementById('add-modal').classList.remove('flex');
    document.getElementById('add-movie-form').reset();
}

function addMovie(event) {
    event.preventDefault();
    
    const title = document.getElementById('movie-title').value.trim();
    const type = document.getElementById('movie-type').value;
    const poster = document.getElementById('movie-poster').value.trim();
    
    if (!title) return;
    
    const newMovie = {
        id: Date.now(),
        title: title,
        type: type,
        status: 'not-watched',
        rating: 0,
        poster: poster || '',
        dateAdded: new Date().toISOString().split('T')[0]
    };
    
    movies[currentList].push(newMovie);
    saveMoviesToStorage();
    renderMovies();
    updateStatistics();
    closeAddModal();
    
    // Show success animation
    showNotification('Movie added successfully! 👻', 'success');
}

// Search and filter functions
function searchMovies() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.movie-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterMovies() {
    const statusFilter = document.getElementById('status-filter').value;
    const cards = document.querySelectorAll('.movie-card');
    
    cards.forEach(card => {
        if (statusFilter === 'all') {
            card.style.display = 'block';
        } else {
            const hasStatus = card.classList.contains(`status-${statusFilter}`);
            card.style.display = hasStatus ? 'block' : 'none';
        }
    });
}

// Statistics
function updateStatistics() {
    const currentMovies = movies[currentList];
    const total = currentMovies.length;
    const watched = currentMovies.filter(m => m.status === 'watched').length;
    const tooScary = currentMovies.filter(m => m.status === 'cant-watch').length;
    const ratings = currentMovies.filter(m => m.rating > 0).map(m => m.rating);
    const avgRating = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
    
    document.getElementById('total-movies').textContent = total;
    document.getElementById('watched-count').textContent = watched;
    document.getElementById('too-scary-count').textContent = tooScary;
    document.getElementById('avg-rating').textContent = avgRating;
    
    // Animate counters
    anime({
        targets: '.stats-card .text-3xl',
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .8)'
    });
}

// Utility functions
function scrollToLists() {
    document.querySelector('main').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg text-white font-semibold ${
        type === 'success' ? 'bg-green-600' : 'bg-blue-600'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart'
    });
    
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuart',
            complete: () => notification.remove()
        });
    }, 3000);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuart'
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.stats-card, .movie-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Local storage functions
function saveMoviesToStorage() {
    localStorage.setItem('halloweenHorrorTracker', JSON.stringify(movies));
}

function loadMoviesFromStorage() {
    const saved = localStorage.getItem('halloweenHorrorTracker');
    if (saved) {
        movies = JSON.parse(saved);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('add-modal');
    if (event.target === modal) {
        closeAddModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAddModal();
    }
    if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        openAddModal();
    }
});