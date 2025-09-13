import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface MoodEntry {
  id?: string;
  userId: string;
  mood: number;
  emoji: string;
  notes: string;
  createdAt: Timestamp;
}

export const saveMoodEntry = async (userId: string, mood: number, emoji: string, notes: string) => {
  try {
    const docRef = await addDoc(collection(db, 'moodEntries'), {
      userId,
      mood,
      emoji,
      notes,
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getMoodEntries = async (userId: string, limit: number = 30) => {
  try {
    const q = query(
      collection(db, 'moodEntries'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const entries: MoodEntry[] = [];
    querySnapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() } as MoodEntry);
    });
    return { entries, error: null };
  } catch (error: any) {
    return { entries: [], error: error.message };
  }
};