# Halloween Horror Movie Tracker - Interaction Design

## Core Interaction Flow

### Dual List Management
- **List Toggle**: Top navigation allows switching between "Our Horror List" and "Date Night Scares"
- **List Switching**: Smooth transition animation when switching between lists
- **Visual Differentiation**: Each list has subtle color variations (deep purple vs dark orange accents)

### Movie Status Management
- **Add Movie**: Click "+" button opens modal with movie title, type (movie/show), and optional poster upload
- **Status Flow**: 
  - Not Watched (gray) → Watching (orange pulse) → Watched (green) → Can't Watch (red)
  - Status changed via dropdown menu on each movie card
- **Delete**: Trash icon with confirmation popup

### Ghost Rating System
- **Rating Interface**: When movie marked as "Watched", ghost rating panel appears
- **Ghost Animation**: 5 ghost icons that grow in size from left (smallest) to right (largest)
- **Scare Scale**: 
  - 👻 (tiny, not scary) → 👻👻👻👻👻 (large, terrifying)
  - Hover shows "Scare Level: 1-5" tooltip
- **Can't Watch Special**: Movies in "Can't Watch" automatically display 5 red ghosts

### Interactive Features
- **Movie Cards**: Hover effects with 3D tilt and shadow expansion
- **Status Indicators**: Color-coded borders and icons
- **Search/Filter**: Filter by status, rating, or search by title
- **Statistics Panel**: Shows completion rate, average scare rating, total movies per list

### Multi-Page Navigation
- **Home**: Main dual list interface
- **Movie Details**: Click movie card to see full details, rating history, notes
- **About**: Instructions and Halloween theme info
- **Settings**: List management (rename lists, clear data)

## User Journey
1. User selects list (Our Horror List vs Date Night Scares)
2. Adds movies via "+" button with title and type
3. Changes status as they progress through watching
4. Rates scary movies using ghost system when marked "Watched"
5. Movies that are too scary get moved to "Can't Watch" with red ghost indicators
6. Can delete movies or move them between statuses freely