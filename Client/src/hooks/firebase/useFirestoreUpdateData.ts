import { useState } from 'react';
import {
    collection,
    doc,
    updateDoc,
    FirestoreError,
    CollectionReference,
    UpdateData,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseFirestoreUpdateDataProps {
    collectionName: string;
}

interface UseFirestoreUpdateDataResult {
    status: Status;
    error?: string;
    updateData: <T>(
        documentId: string,
        newData: UpdateData<T>,
    ) => Promise<void>;
}

export function useFirestoreUpdateData({
    collectionName,
}: UseFirestoreUpdateDataProps): UseFirestoreUpdateDataResult {
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string>('');

    const updateData = async <T>(
        documentId: string,
        newData: UpdateData<T>,
    ) => {
        setStatus('loading');
        try {
            const collectionRef = collection(
                db,
                collectionName,
            ) as CollectionReference<T>; // Type assertion
            const documentRef = doc(collectionRef, documentId);
            await updateDoc(documentRef, newData);
            setStatus('success');
        } catch (err) {
            setError(String(err));
            setStatus('error');
        }
    };

    return {
        status,
        error,
        updateData,
    };
}
