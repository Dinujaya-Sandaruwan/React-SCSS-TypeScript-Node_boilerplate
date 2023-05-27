import { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    FirestoreError,
    QuerySnapshot,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseFirestoreGetDataProps {
    collectionName: string;
}

interface UseFirestoreGetDataResult<T> {
    status: Status;
    data: T[];
    error?: string;
}

export function useFirestoreGetData<T>({
    collectionName,
}: UseFirestoreGetDataProps): UseFirestoreGetDataResult<T> {
    const [status, setStatus] = useState<Status>('idle');
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading');
            try {
                const collectionRef = collection(db, collectionName);
                const querySnapshot: QuerySnapshot = await getDocs(
                    collectionRef,
                );
                const fetchedData: T[] = [];
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    fetchedData.push(docData as T);
                });
                setData(fetchedData);
                setStatus('success');
            } catch (err) {
                setError(String(err));
                setStatus('error');
            }
        };

        fetchData();
    }, [collectionName]);

    return {
        status,
        data,
        error,
    };
}
