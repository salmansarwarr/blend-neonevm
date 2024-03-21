import axios from "axios";

const BASE_URL = "https://blend-botanix.vercel.app/api";
// const BASE_URL = "http://localhost:3000/api";

export const postNft = async (newNft) => {
    await axios.post(`${BASE_URL}/all`, newNft);
};

export const getNfts = async () => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
}

export const getByAddress = async (address) => {
    const response = await axios.get(`${BASE_URL}/byAddress/${address}`);
    return response.data
}

export const getByAddressMultiAsset = async (address) => {
    const response = await axios.get(`${BASE_URL}/byAddress/${address}/multiAsset`);
    return response.data
}

export const getByAddressEquippable = async (address) => {
    const response = await axios.get(`${BASE_URL}/byAddress/${address}/equippable`);
    return response.data
}

export const getByTokenId = async (tokenId) => {
    const response = await axios.get(`${BASE_URL}/byTokenId/${tokenId}`);
    return response.data;
}

export const getMultiAssetByTokenId = async (tokenId) => {
    const response = await axios.get(`${BASE_URL}/byTokenId/${tokenId}/multiAsset`);
    return response.data;
}

export const getEquippableByTokenId = async (tokenId) => {
    const response = await axios.get(`${BASE_URL}/byTokenId/${tokenId}/equippable`);
    return response.data;
}

export const getEmotableByTokenId = async (tokenId) => {
    const response = await axios.get(`${BASE_URL}/byTokenId/${tokenId}/emotable`);
    return response.data;
}

export const updateEmotableByTokenId = async (tokenId, doc) => {
    const response = await axios.put(`${BASE_URL}/byTokenId/${tokenId}/emotable`, doc);
    return response.data;
}

export const updateNft = async (newNft) => {
    await axios.put(`${BASE_URL}/all`, newNft);
};

export const encrypt = async (url) => {
    const response = await axios.post(`${BASE_URL}/encrypt/`, {url});
    return response.data
}

export const download = async (data) => {
    const response = await axios.post(`${BASE_URL}/download/`, data);
    return response.data
}
