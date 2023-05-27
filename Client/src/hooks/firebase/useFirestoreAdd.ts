import { useState } from 'react';
import {
    collection,
    addDoc,
    FirestoreError,
    WithFieldValue,
    DocumentData,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseFirestoreAddDataProps<T extends { [x: string]: any }> {
    collectionName: string;
    data: T;
}

interface UseFirestoreAddDataResult<T> {
    status: Status;
    error?: string;
    addData: () => Promise<void>;
}

export function useFirestoreAddData<T extends { [x: string]: any }>({
    collectionName,
    data,
}: UseFirestoreAddDataProps<T>): UseFirestoreAddDataResult<T> {
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string>('');

    const addData = async () => {
        setStatus('loading');
        try {
            const collectionRef = collection(db, collectionName);
            const newData = { ...data, timestamp: serverTimestamp() };
            await addDoc(collectionRef, newData);
            setStatus('success');
        } catch (err) {
            setError(String(err));
            setStatus('error');
        }
    };

    return {
        status,
        error,
        addData,
    };
}
