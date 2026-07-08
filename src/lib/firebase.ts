import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocFromServer, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { BansosApplicant } from '../types';
import { INITIAL_APPLICANTS } from '../data';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

// Initialize Firestore with default data if empty
export async function initializeFirestoreData() {
  try {
    const colRef = collection(db, 'applicants');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      for (const item of INITIAL_APPLICANTS) {
        await setDoc(doc(db, 'applicants', item.id), item);
      }
    }
  } catch (error) {
    console.error("Error initializing firestore data:", error);
  }
}

// Firestore operations for applicants
export async function addApplicantToFirestore(applicant: BansosApplicant) {
  try {
    await setDoc(doc(db, 'applicants', applicant.id), applicant);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `applicants/${applicant.id}`);
  }
}

export async function updateApplicantInFirestore(id: string, updates: Partial<BansosApplicant>) {
  try {
    const docRef = doc(db, 'applicants', id);
    await updateDoc(docRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `applicants/${id}`);
  }
}

export function subscribeToApplicants(callback: (applicants: BansosApplicant[]) => void) {
  const colRef = collection(db, 'applicants');
  const q = query(colRef);
  return onSnapshot(q, (snapshot) => {
    const list: BansosApplicant[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as BansosApplicant);
    });
    // If empty, return initial
    if (list.length === 0) {
      callback(INITIAL_APPLICANTS);
    } else {
      callback(list);
    }
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'applicants');
  });
}

// Auth helpers
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
}

export async function logoutFirebase() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
}
