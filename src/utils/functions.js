// import AWS from "aws-sdk";
import axios from "axios";
import { openDB } from 'idb';

export function getCurrentTimeFormatted() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedDateTime = `${formattedMonth}/${formattedDay}/${year} ${formattedHours}:${formattedMinutes}${ampm}`;
    return formattedDateTime;
}

export function beautifyAddress(
    address = "",
    prefixLength = 4,
    suffixLength = 4
) {
    if(address?.length < 28) {
        return address
    }
    // Extract prefix and suffix
    const prefix = address?.slice(0, prefixLength);
    const suffix = address?.slice(-suffixLength);

    // Construct the beautified address
    const beautifiedAddress = `${prefix}...${suffix}`;

    return beautifiedAddress;
}

export const saveFileToIndexedDB = async (file, fileName) => {
    const db = await openDB("fileDB", 1, {
        upgrade(db) {
            db.createObjectStore("files");
        },
    });

    const tx = db.transaction("files", "readwrite");
    const store = tx.objectStore("files");

    await store.put(file, fileName);

    console.log("File saved to IndexedDB");
};

export const handleDownload = async (obj) => {
    try {
        window.open(obj, "  _blank");
    } catch (error) {
        console.error("Error downloading file:", error);
    }
};

export const clearIndexedDB = async () => {
    const db = await openDB("fileDB", 1, {
        upgrade(db) {
            db.createObjectStore("files");
        },
    });

    const tx = db.transaction("files", "readwrite");
    const store = tx.objectStore("files");

    await store.clear();
};

export const getObjFromIndexedDB = async () => {
    const db = await openDB("fileDB", 1, {
        upgrade(db) {
            db.createObjectStore("files");
        },
    });

    const tx = db.transaction("files", "readonly");
    const store = tx.objectStore("files");

    const files = await store.getAll();

    return files;
}

export const uploadImageToS3 = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);

        // Send a POST request to the server endpoint
        const response = await axios.post(
            "https://blend-server.vercel.app/aws/upload",
            // "http://localhost:3000/aws/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        // Assuming the API returns JSON data
        return response.data;
    } catch (error) {
        console.error("Error uploading and forwarding image:", error);
        return { error: "Error uploading and forwarding image" };
    }
};

export const sendImageToFlask = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await axios.post(
            "https://blend-server.vercel.app/aws/send",
            // "http://localhost:3000/aws/send",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error uploading and forwarding image:", error.message);
    }
};
