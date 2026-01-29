# Spider-Verse 2048 🕷️

A modern, responsive 2048 game with Spider-Verse theming, built with Next.js, TypeScript, and Tailwind CSS.

## Features ✨

### Game Features
- **Classic 2048 Gameplay**: Merge tiles to reach 2048 and unlock the Spider-Verse
- **Spider-Verse Theming**: Miles Morales (red) and Ghost Spider (pink) character tiles
- **Responsive Controls**: 
  - Arrow keys for desktop
  - Swipe gestures for mobile devices
- **Scoring System**: Real-time score tracking with best score persistence
- **Mobile-Friendly**: Fully responsive design with hamburger menu on mobile
- **Dark/Light Theme**: Toggle between dark and light modes

### User Interface
- **Top Menu Bar**: 
  - Hamburger menu (mobile)
  - Help/Rules tooltip
  - Rate us (1-5 stars)
  - Report a problem
  - Contribute (GitHub link)
  - Theme toggle (Dark/Light)
- **Game Board**: 4x4 grid with smooth tile animations
- **Score Display**: Current score and best score tracking
- **Game Overlays**: Win and Game Over screens with options to continue or restart

### Data Persistence
- **Best Score**: Automatically saved to localStorage and persists across sessions
- **Ratings**: Saved locally (Firebase ready for cloud storage)
- **Problem Reports**: Saved locally (Firebase ready for cloud storage)

### Background
- Custom Spider-Verse background image support
- Responsive background that covers the entire screen
- Overlay for better readability without breaking gameplay

## Firebase Integration 🔥

### Setup Instructions

1. **Install Firebase**:
   ```bash
   npm install firebase
   ```

2. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

3. **Configure Firebase in your app**:
   - Copy your Firebase config from Project Settings
   - Create a new file: `lib/firebase-config.ts`

   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```

4. **Update Firebase functions** in `lib/firebase.ts`:
   - Uncomment Firebase code
   - Remove localStorage fallback code
   - Implement Firestore operations

5. **Set Firestore Rules** (for public access during development):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /ratings/{document=**} {
         allow read, write: if request.time < timestamp.date(2025, 12, 31);
       }
       match /problem-reports/{document=**} {
         allow read, write: if request.time < timestamp.date(2025, 12, 31);
       }
     }
   }
   ```

### Data Schema

**Ratings Collection** (`/ratings`):
```json
{
  "stars": 5,
  "timestamp": "2025-01-29T12:00:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "url": "https://spider-2048.app"
}
```

**Problem Reports Collection** (`/problem-reports`):
```json
{
  "email": "user@example.com",
  "problem": "Description of the issue",
  "timestamp": "2025-01-29T12:00:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "url": "https://spider-2048.app"
}
```

## Installation & Development

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Setup

```bash
# Clone the repository
cd spider-2048

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page with background and menu
│   └── globals.css         # Global styles and animations
├── components/
│   ├── spider-game.tsx     # Main game component
│   ├── game-board.tsx      # Game board display
│   ├── game-tile.tsx       # Individual tile component
│   ├── game-rating.tsx     # Rating display
│   ├── top-menu.tsx        # Navigation menu
│   ├── rating-modal.tsx    # Rating submission modal
│   ├── problem-report-modal.tsx  # Problem report modal
│   ├── help-tooltip.tsx    # Game rules tooltip
│   └── ui/                 # Reusable UI components
├── hooks/
│   ├── use-game-2048.ts    # Game logic hook
│   └── use-best-score.ts   # Best score persistence hook
├── lib/
│   ├── firebase.ts         # Firebase integration utilities
│   └── utils.ts            # Utility functions
└── public/
    └── images/
        └── spideybg.jpg    # Background image
```

## Controls

### Desktop
- **Arrow Keys**: Move tiles (Up, Down, Left, Right)
- **Mouse/Click**: Interact with UI buttons

### Mobile
- **Swipe**: Swipe in any direction to move tiles
- **Touch**: Tap buttons for menu and actions
- **Hamburger Menu**: Click menu icon to access options

## Keyboard Controls

- `ArrowUp` - Move tiles up
- `ArrowDown` - Move tiles down
- `ArrowLeft` - Move tiles left
- `ArrowRight` - Move tiles right

## Styling

The game uses:
- **Tailwind CSS**: For responsive utility-first styling
- **CSS Animations**: For smooth tile movements and merges
- **CSS Variables**: For theme colors and customization
- **OKLch Color Space**: For perceptually uniform colors

### Color Palette
- **Primary (Miles Red)**: `oklch(0.65 0.25 25)`
- **Accent (Ghost Pink)**: `oklch(0.75 0.18 330)`
- **Secondary**: Dark blue/purple tones
- **Muted**: Desaturated grays for backgrounds

## Performance Tips

1. **Lazy Load Components**: Use React.lazy() for modals if needed
2. **Optimize Images**: Compress background image
3. **Code Splitting**: Next.js handles automatic code splitting
4. **Caching**: Use localStorage for scores and ratings

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels on interactive elements
- High contrast text on all backgrounds
- Mobile-friendly touch targets (min 44x44px)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Best Score Not Persisting
- Check if localStorage is enabled
- Verify no browser restrictions on data storage

### Firebase Connection Issues
- Confirm Firebase config is correct
- Check Firestore rules allow read/write
- Verify API keys are valid

### Keyboard Controls Not Working
- Ensure game container has focus
- Check browser dev tools for event listener errors

### Background Image Not Showing
- Verify `/public/images/spideybg.jpg` exists
- Check file permissions
- Try different image formats (JPEG, PNG, WebP)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Inspired by the Spider-Verse 🕷️

## Support

For issues, features, or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Use the "Report a Problem" feature in-game

---

**Made with 🕷️ by the Spider-Verse 2048 team**
