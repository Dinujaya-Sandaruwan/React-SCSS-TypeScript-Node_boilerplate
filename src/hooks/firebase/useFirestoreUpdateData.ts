import { useState } from 'react'; // Importing the 'useState' hook from the 'react' library.
import {
    collection,
    doc,
    updateDoc,
    FirestoreError,
    CollectionReference,
    UpdateData,
} from 'firebase/firestore'; // Importing functions and types from the 'firebase/firestore' module.
import { db } from '../../config/firebase'; // Importing the 'db' object from the '../../config/firebase' file.

type Status = 'idle' | 'loading' | 'success' | 'error'; // Defining a custom type 'Status' with possible values 'idle', 'loading', 'success', or 'error'.

interface UseFirestoreUpdateDataProps {
    collectionName: string; // Property 'collectionName' of type string.
}

export interface UseFirestoreUpdateDataResult {
    status: Status; // Property 'status' of type 'Status'.
    error?: string; // Optional property 'error' of type string.
    updateData: <T>(
        documentId: string,
        newData: UpdateData<T>,
    ) => Promise<void>; // Generic function 'updateData' that takes a document ID and updated data as arguments and returns a Promise.
}

export function useFirestoreUpdateData({
    collectionName,
}: UseFirestoreUpdateDataProps): UseFirestoreUpdateDataResult {
    const [status, setStatus] = useState<Status>('idle'); // Initializing state variable 'status' using the 'useState' hook with initial value 'idle'.
    const [error, setError] = useState<string>(''); // Initializing state variable 'error' using the 'useState' hook with initial value an empty string.

    const updateData = async <T>(
        documentId: string,
        newData: UpdateData<T>,
    ) => {
        setStatus('loading'); // Updating the 'status' state to 'loading'.
        try {
            const collectionRef = collection(
                db,
                collectionName,
            ) as CollectionReference<T>; // Creating a reference to the Firestore collection specified by 'collectionName' with type assertion.
            const documentRef = doc(collectionRef, documentId); // Creating a reference to the specific document in the collection.
            await updateDoc(documentRef, newData); // Updating the document with the new data using the 'updateDoc' function.
            setStatus('success'); // Updating the 'status' state to 'success'.
        } catch (err) {
            setError(String(err)); // Converting the error object to a string and setting it as the value of the 'error' state.
            setStatus('error'); // Updating the 'status' state to 'error'.
        }
    };

    return {
        status, // Returning the 'status' state.
        error, // Returning the 'error' state.
        updateData, // Returning the 'updateData' function.
    };
}
