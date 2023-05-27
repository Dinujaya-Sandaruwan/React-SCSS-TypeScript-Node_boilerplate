import { useState } from 'react';
import {
    collection,
    doc,
    deleteDoc,
    FirestoreError,
    CollectionReference,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseFirestoreDeleteDataProps {
    collectionName: string;
}

interface UseFirestoreDeleteDataResult {
    status: Status;
    error?: string;
    deleteData: (documentId: string) => Promise<void>;
}

export function useFirestoreDeleteData({
    collectionName,
}: UseFirestoreDeleteDataProps): UseFirestoreDeleteDataResult {
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string>('');

    const deleteData = async (documentId: string) => {
        setStatus('loading');
        try {
            const collectionRef = collection(
                db,
                collectionName,
            ) as CollectionReference;
            const documentRef = doc(collectionRef, documentId);
            await deleteDoc(documentRef);
            setStatus('success');
        } catch (err) {
            setError(String(err));
            setStatus('error');
        }
    };

    return {
        status,
        error,
        deleteData,
    };
}
