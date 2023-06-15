import { useState, useEffect } from 'react'; // Importing the 'useState' and 'useEffect' hooks from the 'react' library.
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Importing functions 'collection', 'addDoc', and 'serverTimestamp' from the 'firebase/firestore' module.
import { db } from '../../config/firebase'; // Importing the 'db' object from the '../../config/firebase' file.

type Status = 'idle' | 'loading' | 'success' | 'error'; // Defining a custom type 'Status' with possible values 'idle', 'loading', 'success', or 'error'.

interface UseFirestoreAddDataProps<T extends { [x: string]: any }> {
    // Defining an interface 'UseFirestoreAddDataProps' with a generic type 'T' that extends an object with string keys and any values.
    collectionName: string; // Property 'collectionName' of type string.
    data: T; // Property 'data' of type 'T'.
    onDataAdded?: () => void; // Optional property 'onDataAdded' of type function that takes no arguments and returns nothing.
}

export interface UseFirestoreAddDataResult<T> {
    // Defining an interface 'UseFirestoreAddDataResult' with a generic type 'T'.
    status: Status; // Property 'status' of type 'Status'.
    error?: string; // Optional property 'error' of type string.
    addData: () => Promise<void>; // Property 'addData' of type function that returns a promise with no value.
}

export function useFirestoreAddData<T extends { [x: string]: any }>({
    // Exported function 'useFirestoreAddData' with a generic type 'T' that extends an object with string keys and any values.
    collectionName,
    data,
    onDataAdded,
}: UseFirestoreAddDataProps<T>): UseFirestoreAddDataResult<T> {
    const [status, setStatus] = useState<Status>('idle'); // Initializing state variable 'status' using the 'useState' hook with initial value 'idle'.
    const [error, setError] = useState<string>(''); // Initializing state variable 'error' using the 'useState' hook with initial value an empty string.

    const addData = async () => {
        // Defining an asynchronous function 'addData'.
        setStatus('loading'); // Updating the 'status' state to 'loading'.
        try {
            const collectionRef = collection(db, collectionName); // Creating a reference to the Firestore collection specified by 'collectionName'.
            const newData = { ...data, timestamp: serverTimestamp() }; // Creating a new object 'newData' by spreading the 'data' object and adding a 'timestamp' property with the value of the current server timestamp.
            await addDoc(collectionRef, newData); // Adding the 'newData' object as a new document to the Firestore collection.
            setStatus('success'); // Updating the 'status' state to 'success'.
            if (onDataAdded) {
                onDataAdded(); // Invoking the 'onDataAdded' function if it exists.
            }
        } catch (err) {
            setError(String(err)); // Converting the error object to a string and setting it as the value of the 'error' state.
            setStatus('error'); // Updating the 'status' state to 'error'.
        }
    };

    return {
        status, // Returning the 'status' state.
        error, // Returning the 'error' state.
        addData, // Returning the 'addData' function.
    };
}
