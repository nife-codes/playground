/**
 * Firebase Integration Module for Spider-Verse 2048
 * 
 * This module provides utilities for saving ratings and problem reports to Firebase Firestore.
 * Currently configured to use localStorage as fallback for development.
 * 
 * To integrate with Firebase:
 * 1. Install Firebase: npm install firebase
 * 2. Initialize Firebase in your project
 * 3. Update the functions below to use your Firestore database
 * 
 * Example Firestore setup:
 * import { initializeApp } from 'firebase/app';
 * import { getFirestore, collection, addDoc } from 'firebase/firestore';
 * 
 * const firebaseConfig = {
 *   apiKey: "YOUR_API_KEY",
 *   authDomain: "YOUR_AUTH_DOMAIN",
 *   projectId: "YOUR_PROJECT_ID",
 *   storageBucket: "YOUR_STORAGE_BUCKET",
 *   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
 *   appId: "YOUR_APP_ID"
 * };
 * 
 * const app = initializeApp(firebaseConfig);
 * const db = getFirestore(app);
 */

export interface GameRating {
  stars: number
  timestamp: string
  userAgent?: string
  url?: string
}

export interface ProblemReport {
  email: string
  problem: string
  timestamp: string
  userAgent?: string
  url?: string
}

/**
 * Save a game rating to Firebase/Firestore
 * Falls back to localStorage in development
 */
export async function saveRatingToFirebase(
  rating: GameRating
): Promise<boolean> {
  try {
    // TODO: Implement Firebase Firestore integration
    // Example:
    // const docRef = await addDoc(collection(db, "ratings"), rating);
    // return !!docRef.id;

    // Fallback: Save to localStorage
    const ratings = JSON.parse(localStorage.getItem("spider-ratings") || "[]")
    ratings.push(rating)
    localStorage.setItem("spider-ratings", JSON.stringify(ratings))
    return true
  } catch (error) {
    console.error("Failed to save rating:", error)
    return false
  }
}

/**
 * Save a problem report to Firebase/Firestore
 * Falls back to localStorage in development
 */
export async function saveProblemReportToFirebase(
  report: ProblemReport
): Promise<boolean> {
  try {
    // TODO: Implement Firebase Firestore integration
    // Example:
    // const docRef = await addDoc(
    //   collection(db, "problem-reports"),
    //   report
    // );
    // return !!docRef.id;

    // Fallback: Save to localStorage
    const reports = JSON.parse(
      localStorage.getItem("spider-problem-reports") || "[]"
    )
    reports.push(report)
    localStorage.setItem("spider-problem-reports", JSON.stringify(reports))
    return true
  } catch (error) {
    console.error("Failed to save problem report:", error)
    return false
  }
}

/**
 * Retrieve all ratings from localStorage
 * For Firebase, this would fetch from Firestore
 */
export function getAllRatings(): GameRating[] {
  try {
    return JSON.parse(localStorage.getItem("spider-ratings") || "[]")
  } catch {
    return []
  }
}

/**
 * Retrieve all problem reports from localStorage
 * For Firebase, this would fetch from Firestore
 */
export function getAllProblemReports(): ProblemReport[] {
  try {
    return JSON.parse(
      localStorage.getItem("spider-problem-reports") || "[]"
    )
  } catch {
    return []
  }
}

/**
 * Get average rating from all stored ratings
 */
export function getAverageRating(): number {
  const ratings = getAllRatings()
  if (ratings.length === 0) return 0
  const sum = ratings.reduce((acc, rating) => acc + rating.stars, 0)
  return Math.round((sum / ratings.length) * 10) / 10
}

/**
 * Sync local data to Firebase (batch operation)
 * Useful for uploading all pending data to Firestore
 */
export async function syncDataToFirebase(): Promise<{
  ratingsSync: boolean
  reportsSync: boolean
}> {
  const ratings = getAllRatings()
  const reports = getAllProblemReports()

  let ratingsSync = true
  let reportsSync = true

  try {
    // TODO: Batch upload ratings to Firebase
    // for (const rating of ratings) {
    //   await saveRatingToFirebase(rating);
    // }
  } catch (error) {
    console.error("Failed to sync ratings:", error)
    ratingsSync = false
  }

  try {
    // TODO: Batch upload reports to Firebase
    // for (const report of reports) {
    //   await saveProblemReportToFirebase(report);
    // }
  } catch (error) {
    console.error("Failed to sync reports:", error)
    reportsSync = false
  }

  return { ratingsSync, reportsSync }
}
