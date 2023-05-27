import { useState, useEffect } from 'react'; // Importing the 'useState' and 'useEffect' hooks from the 'react' library.
import {
    collection,
    getDocs,
    FirestoreError,
    QuerySnapshot,
    onSnapshot,
    query, // Importing 'query' function
    orderBy, // Importing 'orderBy' function
} from 'firebase/firestore'; // Importing functions 'collection', 'getDocs', 'FirestoreError', 'QuerySnapshot', 'onSnapshot', 'query', and 'orderBy' from the 'firebase/firestore' module.
import { db } from '../../config/firebase'; // Importing the 'db' object from the '../../config/firebase' file.

type Status = 'idle' | 'loading' | 'success' | 'error'; // Defining a custom type 'Status' with possible values 'idle', 'loading', 'success', or 'error'.

interface UseFirestoreGetDataProps {
    collectionName: string; // Property 'collectionName' of type string.
}

export interface UseFirestoreGetDataResult<T> {
    status: Status; // Property 'status' of type 'Status'.
    data: T[]; // Property 'data' of type array of type 'T'.
    error?: string; // Optional property 'error' of type string.
}

export function useFirestoreGetData<T>({
    collectionName,
}: UseFirestoreGetDataProps): UseFirestoreGetDataResult<T> {
    const [status, setStatus] = useState<Status>('idle'); // Initializing state variable 'status' using the 'useState' hook with initial value 'idle'.
    const [data, setData] = useState<T[]>([]); // Initializing state variable 'data' using the 'useState' hook with initial value an empty array.
    const [error, setError] = useState<string>(''); // Initializing state variable 'error' using the 'useState' hook with initial value an empty string.

    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading'); // Updating the 'status' state to 'loading'.
            try {
                const collectionRef = collection(db, collectionName); // Creating a reference to the Firestore collection specified by 'collectionName'.

                // Create a query that orders the documents by the 'timestamp' field in descending order
                const q = query(collectionRef, orderBy('timestamp', 'desc')); // Creating a query that orders the documents by the 'timestamp' field in descending order.

                const querySnapshot: QuerySnapshot = await getDocs(q); // Fetching the documents from the Firestore collection using the query.
                const fetchedData: T[] = [];
                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    const docId = doc.id;
                    const dataWithId = { ...docData, docId };
                    fetchedData.push(dataWithId as T);
                });
                setData(fetchedData); // Updating the 'data' state with the fetched data.
                setStatus('success'); // Updating the 'status' state to 'success'.

                // Add real-time data updates using onSnapshot
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const updatedData: T[] = [];
                    snapshot.forEach((doc) => {
                        const docData = doc.data();
                        const docId = doc.id;
                        const dataWithId = { ...docData, docId };
                        updatedData.push(dataWithId as T);
                    });
                    setData(updatedData); // Updating the 'data' state with the updated data.
                });

                return () => {
                    unsubscribe(); // Unsubscribe from real-time updates when the component is unmounted.
                };
            } catch (err) {
                setError(String(err)); // Converting the error object to a string and setting it as the value of the 'error' state.
                setStatus('error'); // Updating the 'status' state to 'error'.
            }
        };

        fetchData();
    }, []);

    return {
        status, // Returning the 'status' state.
        data, // Returning the 'data' state.
        error, // Returning the 'error' state.
    };
}
