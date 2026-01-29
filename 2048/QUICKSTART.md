# Quick Start Guide 🚀

Get Spider-Verse 2048 up and running in minutes!

## ⚡ 5-Minute Setup

### 1. Start Development Server
```bash
cd spider-2048
npm run dev
```

### 2. Open in Browser
```
http://localhost:3000
```

### 3. Play!
- **Desktop**: Use arrow keys to move tiles
- **Mobile**: Swipe to move tiles
- **Menu**: Click hamburger icon (mobile) or menu items (desktop)

## 📋 Complete Feature Checklist

### Game Features
- [x] 4x4 grid-based 2048 game
- [x] Arrow key controls (ArrowUp, ArrowDown, ArrowLeft, ArrowRight)
- [x] Swipe gesture support for mobile
- [x] Sound effects with Web Audio API
- [x] Win/lose overlays
- [x] Continue playing after winning

### User Interface
- [x] Responsive top menu bar
- [x] Hamburger menu for mobile
- [x] Help/Rules tooltip
- [x] Rate us (1-5 stars) 
- [x] Report a problem (feedback form)
- [x] Contribute (GitHub link)
- [x] Dark/Light theme toggle
- [x] Mobile swipe hint

### Data Persistence
- [x] Best score saved to localStorage
- [x] Ratings stored (Firebase-ready)
- [x] Problem reports stored (Firebase-ready)
- [x] Automatic cloud sync ready

### Design & Styling
- [x] Spider-Verse theme colors
- [x] Tailwind CSS responsive design
- [x] Background image support (/public/images/spideybg.jpg)
- [x] Smooth animations and transitions
- [x] Mobile-friendly UI (44px+ touch targets)
- [x] Accessible color contrasts

### Technical
- [x] TypeScript for type safety
- [x] Next.js 14 latest features
- [x] Proper keyboard event handling
- [x] localStorage API integration
- [x] Firebase integration utilities
- [x] Radix UI components
- [x] Lucide React icons

## 📁 Key Files

| File | Purpose |
|------|---------|
| `components/spider-game.tsx` | Main game component |
| `components/top-menu.tsx` | Navigation menu ✨ NEW |
| `components/rating-modal.tsx` | Rating submission ✨ NEW |
| `components/problem-report-modal.tsx` | Bug reporting ✨ NEW |
| `hooks/use-game-2048.ts` | Game logic |
| `lib/firebase.ts` | Firebase utilities ✨ NEW |
| `app/page.tsx` | Main page with background ✨ UPDATED |
| `app/globals.css` | Styles + themes ✨ UPDATED |

## 🎮 How to Play

1. **Objective**: Merge tiles to reach 2048
2. **Controls**:
   - Arrow keys (desktop) or swipe (mobile)
3. **Merging**: Tiles with same value merge when they touch
4. **Scoring**: Each merge adds the result value to your score
5. **Best Score**: Automatically saved across sessions
6. **Win**: Reach 2048 to unlock the Spider-Verse!

## 🌙 Theme Toggle

Click the sun/moon icon in the menu to switch between:
- **Dark Mode**: Default (OLED-friendly)
- **Light Mode**: High contrast for daylight

## 📱 Mobile Experience

- Hamburger menu collapses to ☰ icon on small screens
- Touch buttons are 44×44px minimum for easy tapping
- Swipe in any direction to move tiles
- Swipe hint appears at bottom on first visit

## 💾 Best Score Persistence

Your best score is automatically saved to browser localStorage and will:
- ✅ Persist across browser sessions
- ✅ Work offline
- ✅ Update only when you beat your previous best
- ✅ Be stored with key: `spider2048-best`

To clear: Press F12 → Application → LocalStorage → Delete `spider2048-best`

## ⭐ Rate the Game

1. Click menu → "Rate us"
2. Select 1-5 stars
3. Submit rating
4. Rating saved locally (Firebase-ready)

## 🚨 Report Issues

1. Click menu → "Report a problem"
2. Enter your email
3. Describe the issue
4. Submit report
5. Report saved locally (Firebase-ready)

## 🔗 Contribute

Click menu → "Contribute" to visit the GitHub repository and contribute improvements!

## 🔥 Firebase Setup (Optional)

To enable cloud storage for ratings and reports:

1. Create Firebase project
2. Set up Firestore database
3. Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
4. Update `lib/firebase.ts`

Currently uses localStorage fallback - **no Firebase setup required to play!**

## 📚 Documentation

- **Full Features**: See [FEATURES.md](./FEATURES.md)
- **Firebase Guide**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Project README**: See [README.md](./README.md)

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## ✅ Testing Checklist

Before deploying, test these features:

- [ ] Arrow keys move tiles correctly
- [ ] Tiles merge when equal values touch
- [ ] Score updates on merges
- [ ] Best score persists after page refresh
- [ ] Game over detected correctly
- [ ] Win overlay shows at 2048
- [ ] Can continue playing after winning
- [ ] Swipe gestures work on mobile
- [ ] Hamburger menu opens/closes
- [ ] Theme toggle switches dark/light
- [ ] Rating form submits and saves
- [ ] Problem report form submits and saves
- [ ] Help tooltip displays rules
- [ ] Background image shows correctly
- [ ] Mobile responsive on various screen sizes

## 🎯 Production Deployment

### Before Going Live

1. [ ] Replace background image with your own
2. [ ] Update GitHub link in "Contribute" menu
3. [ ] Set up Firebase (optional)
4. [ ] Test on real devices
5. [ ] Set up analytics
6. [ ] Configure SEO metadata
7. [ ] Enable HTTPS
8. [ ] Set up CDN for image delivery

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Deploy to Other Platforms

- **Netlify**: `npm run build` → Deploy `.next` folder
- **Docker**: Use Node.js base image, run `npm run build && npm start`
- **AWS**: Use EC2 or Lambda with Node.js runtime

## 🆘 Troubleshooting

### "Module not found" errors
```bash
npm install
npm run build
```

### Keyboard controls not working
- Make sure the game window has focus
- Check DevTools console for errors
- Verify you're pressing arrow keys (not wasd)

### Best score not saving
- Check browser localStorage is enabled
- Try clearing cache and cookies
- Verify no private/incognito mode

### Swipe not working on mobile
- Ensure you're swiping horizontally/vertically
- Check minimum swipe distance (30px required)
- Verify touch events are supported

### Background image not showing
- Confirm `/public/images/spideybg.jpg` exists
- Check file permissions
- Try different image format (JPEG, PNG, WebP)
- Open DevTools Network tab to see if image loads

## 📞 Support

- Report bugs: Use in-game "Report a Problem"
- Feature requests: Check GitHub issues
- Questions: Open a new GitHub discussion

## 🎉 You're All Set!

Start playing Spider-Verse 2048 now! 🕷️

Questions? See the full documentation in:
- [README.md](./README.md) - Complete project info
- [FEATURES.md](./FEATURES.md) - Detailed feature list
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Cloud integration

Happy gaming! 🕸️
