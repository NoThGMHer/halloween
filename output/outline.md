# Halloween Horror Movie Tracker - Project Outline

## File Structure

### Core Files
- **index.html** - Main dual list interface with movie management
- **movies.html** - Detailed movie information and reviews
- **about.html** - Instructions and Halloween theme information
- **main.js** - Core JavaScript functionality and interactions

### Resources Directory
- **resources/hero-horror.jpg** - Atmospheric Halloween hero image
- **resources/movie-posters/** - Collection of horror movie poster images
- **resources/ghost-icons/** - Custom ghost rating icons (1-5 scale)
- **resources/background-texture.jpg** - Dark texture for backgrounds

## Page Breakdown

### Index.html - Main Interface
**Purpose**: Primary movie tracking interface with dual lists
**Sections**:
- Navigation bar with Halloween theme
- Hero section with atmospheric background and title
- Dual list toggle ("Our Horror List" vs "Date Night Scares")
- Movie management interface:
  - Add movie button with modal form
  - Filter/search functionality
  - Movie cards grid with status indicators
  - Ghost rating system for watched movies
- Statistics panel showing completion rates
- Footer with Halloween styling

### Movies.html - Movie Details
**Purpose**: Detailed movie information and rating history
**Sections**:
- Navigation bar
- Movie detail cards with poster images
- Horror movie database with pre-populated content
- Rating history and notes section
- Recommendations based on ratings
- Footer

### About.html - Information Page
**Purpose**: Instructions and Halloween theme explanation
**Sections**:
- Navigation bar
- Hero section with Halloween imagery
- How to use the ghost rating system
- Halloween horror movie recommendations
- Tips for couples movie nights
- Footer

## Interactive Features

### Core Functionality
1. **Dual List Management**: Toggle between two separate movie lists
2. **Status System**: 
   - Not Watched (gray)
   - Watching (orange pulse)
   - Watched (green)
   - Can't Watch (red with 5 ghost icons)
3. **Ghost Rating**: Interactive 1-5 ghost scale with size progression
4. **Add/Delete Movies**: Full CRUD functionality with modal forms
5. **Search/Filter**: Filter by status, rating, or search by title
6. **Statistics**: Visual charts showing viewing progress

### Animation Effects
- Ghost floating animations
- Status transition effects
- Card hover with 3D tilt
- Typewriter text reveals
- Particle background effects
- Smooth list transitions

## Content Strategy

### Pre-populated Movies
**Recent Horror (2024)**:
- Longlegs, Nosferatu, The Substance, Abigail, The First Omen
- Late Night with the Devil, Oddity, Speak No Evil, Smile 2

**Classic Horror**:
- The Exorcist, Poltergeist, The Omen, Hellraiser, Get Out
- Hereditary, Midsommar, The Witch, It Follows, Sinister

**Horror TV Shows**:
- The Haunting of Hill House, Midnight Mass, Evil, American Horror Story
- The Fall of the House of Usher, Interview with the Vampire, Chucky

### Ghost Rating Examples
- **1 Ghost**: Light scares (comedy horror, mild jump scares)
- **3 Ghosts**: Moderate horror (psychological tension, some gore)
- **5 Ghosts**: Extreme horror (intense psychological, graphic content)
- **Red 5 Ghosts**: Too scary to watch (Can't Watch category)