import axios from "axios";

export const storeTokenUriMetadata = async (metadata) => {
    try {
        const response = await axios.post(
            "https://blend-server.vercel.app/pinata",
            metadata,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error storing Token URI metadata:", error);
        return { error: "Error storing Token URI metadata" };
    }
};

export const sendFileToPinata = async (fileData) => {
    try {
        const formData = new FormData();
        formData.append("file", fileData);


        const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    pinata_api_key: "593da4ce8b95cd2d7ae8",
                    pinata_secret_api_key:
                        "ae1c577bfacbde4b158e624f5075327091a2db35bebf5ccda22cee1be3fa8179",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
        return { error: `Error sending file to Pinata: ${error}` };
    }
};

export async function sendChunksToPinata(chunks) {
    try {
        const responses = [];
        for (const chunk of chunks) {
            const formData = new FormData();
            formData.append("file", chunk);

            // Get the headers including the boundary parameter
            const headers = formData.getHeaders();

            const response = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        ...headers, // Include the boundary parameter
                        "pinata_api_key": "your-pinata-api-key",
                        "pinata_secret_api_key": "your-pinata-secret-api-key"
                    },
                }
            );
            responses.push(response.data);
        }
        return responses;
    } catch (error) {
        console.error("Error occurred while pinning file chunks to Pinata:", error);
        throw error;
    }
}

