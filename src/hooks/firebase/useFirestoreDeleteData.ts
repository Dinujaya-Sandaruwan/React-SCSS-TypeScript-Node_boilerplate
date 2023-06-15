import { useState } from 'react'; // Importing the 'useState' hook from the 'react' library.
import {
    collection,
    doc,
    deleteDoc,
    CollectionReference,
} from 'firebase/firestore'; // Importing functions 'collection', 'doc', 'deleteDoc', and 'CollectionReference' from the 'firebase/firestore' module.
import { db } from '../../config/firebase'; // Importing the 'db' object from the '../../config/firebase' file.

type Status = 'idle' | 'loading' | 'success' | 'error'; // Defining a custom type 'Status' with possible values 'idle', 'loading', 'success', or 'error'.

interface UseFirestoreDeleteDataProps {
    collectionName: string; // Property 'collectionName' of type string.
}

export interface UseFirestoreDeleteDataResult {
    status: Status; // Property 'status' of type 'Status'.
    error?: string; // Optional property 'error' of type string.
    deleteData: (documentId: string) => Promise<void>; // Property 'deleteData' of type function that takes a 'documentId' string argument and returns a promise with no value.
}

export function useFirestoreDeleteData({
    collectionName,
}: UseFirestoreDeleteDataProps): UseFirestoreDeleteDataResult {
    const [status, setStatus] = useState<Status>('idle'); // Initializing state variable 'status' using the 'useState' hook with initial value 'idle'.
    const [error, setError] = useState<string>(''); // Initializing state variable 'error' using the 'useState' hook with initial value an empty string.

    const deleteData = async (documentId: string) => {
        // Defining an asynchronous function 'deleteData' that takes a 'documentId' string argument.
        setStatus('loading'); // Updating the 'status' state to 'loading'.
        try {
            const collectionRef = collection(
                db,
                collectionName,
            ) as CollectionReference; // Creating a reference to the Firestore collection specified by 'collectionName'.
            const documentRef = doc(collectionRef, documentId); // Creating a reference to the document in the Firestore collection specified by 'documentId'.
            await deleteDoc(documentRef); // Deleting the document from the Firestore collection.
            setStatus('success'); // Updating the 'status' state to 'success'.
        } catch (err) {
            setError(String(err)); // Converting the error object to a string and setting it as the value of the 'error' state.
            setStatus('error'); // Updating the 'status' state to 'error'.
        }
    };

    return {
        status, // Returning the 'status' state.
        error, // Returning the 'error' state.
        deleteData, // Returning the 'deleteData' function.
    };
}
