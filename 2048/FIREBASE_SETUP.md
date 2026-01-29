# Firebase Setup Guide 🔥

This guide walks you through integrating Firebase Firestore with Spider-Verse 2048 for cloud data storage.

## Prerequisites

- Firebase Console access ([console.firebase.google.com](https://console.firebase.google.com))
- Node.js 16+ installed
- Project already running with localStorage fallback

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Name it "Spider-2048" (or your preference)
4. Enable Google Analytics (optional)
5. Click "Create Project"
6. Wait for project initialization (1-2 minutes)

## Step 2: Create Firestore Database

1. In the left sidebar, click **Build** > **Firestore Database**
2. Click **Create Database**
3. Choose starting location (closest to your users)
4. Select **Start in test mode** (for development)
   - ⚠️ Change to production rules before deploying publicly
5. Click **Create**

## Step 3: Get Firebase Config

1. Go to **Project Settings** (gear icon, top left)
2. Click **Your apps** tab
3. Select or create a **Web** app
4. Copy your Firebase config object
5. You'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

## Step 4: Install Firebase SDK

```bash
cd spider-2048
npm install firebase
```

## Step 5: Create Firebase Config File

Create a new file: `lib/firebase-config.ts`

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);
```

## Step 6: Update Firebase Integration

Open `lib/firebase.ts` and update the functions:

### For Ratings:

```typescript
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';

export async function saveRatingToFirebase(
  rating: GameRating
): Promise<boolean> {
  try {
    const docRef = await addDoc(collection(db, "ratings"), {
      ...rating,
      timestamp: new Date().toISOString(),
    });
    
    console.log("Rating saved with ID:", docRef.id);
    return !!docRef.id;
  } catch (error) {
    console.error("Failed to save rating:", error);
    // Fallback to localStorage
    const ratings = JSON.parse(localStorage.getItem("spider-ratings") || "[]");
    ratings.push(rating);
    localStorage.setItem("spider-ratings", JSON.stringify(ratings));
    return false;
  }
}
```

### For Problem Reports:

```typescript
export async function saveProblemReportToFirebase(
  report: ProblemReport
): Promise<boolean> {
  try {
    const docRef = await addDoc(collection(db, "problem-reports"), {
      ...report,
      timestamp: new Date().toISOString(),
    });
    
    console.log("Report saved with ID:", docRef.id);
    return !!docRef.id;
  } catch (error) {
    console.error("Failed to save report:", error);
    // Fallback to localStorage
    const reports = JSON.parse(
      localStorage.getItem("spider-problem-reports") || "[]"
    );
    reports.push(report);
    localStorage.setItem("spider-problem-reports", JSON.stringify(reports));
    return false;
  }
}
```

## Step 7: Configure Firestore Security Rules

⚠️ **Important**: Only use test rules during development!

1. Go to **Firestore Database** > **Rules** tab
2. Replace the default rules with:

### Development Rules (Test Mode):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for development
    // ⚠️ NOT for production use!
    match /ratings/{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
    match /problem-reports/{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```

### Production Rules (Recommended):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anonymous write access for ratings (no auth required)
    match /ratings/{document=**} {
      allow create: if true;  // Allow anyone to submit ratings
      allow read: if request.auth != null; // Only authenticated users can read
    }
    
    // Anonymous write access for problem reports
    match /problem-reports/{document=**} {
      allow create: if request.resource.data.email != null;
      allow read: if request.auth != null;
    }
  }
}
```

### Strict Rules (Recommended for Public Apps):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Authenticated users can submit ratings
    match /ratings/{document=**} {
      allow create: if request.auth != null && 
                       request.resource.data.stars >= 1 && 
                       request.resource.data.stars <= 5;
      allow read: if true;
    }
    
    // Authenticated users can report problems
    match /problem-reports/{document=**} {
      allow create: if request.auth != null && 
                       request.resource.data.email != null &&
                       request.resource.data.problem != null;
      allow read: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 8: Create Collections

1. Go to **Firestore Database**
2. Click **Start Collection**
3. Create two collections:

### Collection 1: `ratings`
```
Document Structure:
{
  stars: number (1-5),
  timestamp: string (ISO format),
  userAgent: string,
  url: string
}
```

### Collection 2: `problem-reports`
```
Document Structure:
{
  email: string,
  problem: string,
  timestamp: string (ISO format),
  userAgent: string,
  url: string
}
```

## Step 9: Test the Integration

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000
3. Click menu > "Rate us"
4. Submit a 5-star rating
5. Open Firebase Console > Firestore
6. Check if rating appears in `ratings` collection
7. Repeat for "Report a Problem"

## Step 10: Read Data from Firestore

Update `lib/firebase.ts` to fetch data:

```typescript
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export async function getRatingsFromFirebase(): Promise<GameRating[]> {
  try {
    const q = query(
      collection(db, "ratings"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as GameRating);
  } catch (error) {
    console.error("Failed to fetch ratings:", error);
    return getAllRatings(); // Fallback to localStorage
  }
}

export async function getReportsFromFirebase(): Promise<ProblemReport[]> {
  try {
    const q = query(
      collection(db, "problem-reports"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as ProblemReport);
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return getAllProblemReports(); // Fallback to localStorage
  }
}
```

## Environment Variables

For security, store your API key in environment variables:

1. Create `.env.local` file in project root:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcd1234
   ```

2. Update `lib/firebase-config.ts`:
   ```typescript
   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   };
   ```

3. Add `.env.local` to `.gitignore`:
   ```
   .env.local
   .env.*.local
   ```

## Monitoring & Analytics

### View Firestore Usage
1. Go to **Firestore Database** > **Usage** tab
2. Monitor read/write operations
3. Set up **Cloud Billing** alerts if needed

### View Firebase Analytics
1. Go to **Analytics** dashboard
2. Track user engagement and gameplay

## Troubleshooting

### "PERMISSION_DENIED: Missing or insufficient permissions"
- Check Firestore rules (must allow writes)
- Verify test mode is enabled
- Try production rules from Step 7

### "Cannot find module 'firebase'"
```bash
npm install firebase
npm run build
```

### Data not appearing in Firestore
1. Check browser console for errors
2. Open Firebase Console and refresh
3. Verify rules allow write access
4. Check network tab in DevTools

### Slow database operations
- Use `getDocs()` with `limit()` for pagination
- Create indexes for frequently queried fields
- Consider caching with `useCallback`

## Security Best Practices

- ✅ Never commit API keys to git
- ✅ Use environment variables for secrets
- ✅ Implement proper Firestore rules
- ✅ Enable authentication before public release
- ✅ Rate limit submissions (future enhancement)
- ✅ Validate data on both client and server
- ✅ Use HTTPS only
- ✅ Enable Firestore audit logs

## Firestore Pricing

**Free Tier (Spark Plan)**:
- 1 GB storage
- 50K reads/month
- 20K writes/month
- 20K deletes/month

**Pay as you go (Blaze Plan)**:
- $0.06 per 100K reads
- $0.18 per 100K writes
- $0.02 per 100K deletes

For a game like Spider-2048, the free tier should be sufficient unless you have millions of users!

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Create Firestore database
3. ✅ Configure security rules
4. ✅ Update `lib/firebase.ts`
5. ✅ Test ratings and reports
6. ✅ Monitor usage and analytics
7. ✅ Deploy to production

---

**Happy coding! 🕷️**
