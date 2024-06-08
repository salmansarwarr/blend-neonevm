import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    img: undefined,
    objFile: undefined,
    isPaid: false,
    name: undefined,
    ipfsURI: "",
    minted: false,
    isConnected: undefined,
    account: null,
    multiAssetFiles: [],
    fileUris: []
};

export const imageSlice = createSlice({
    name: "blend",
    initialState,
    reducers: {
        setState: (state, action) => {
            state = action.payload
        },
        setImage: (state, action) => {
            state.img = action.payload;
        },
        setPaid: (state, action) => {
            state.isPaid = action.payload;
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("paid", action.payload);
            }
        },
        setObjFile: (state, action) => {
            state.objFile = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("name", action.payload);
            }
        },
        setIpfsURI: (state, action) => {
            state.ipfsURI = action.payload;
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("ipfs", action.payload);
            }
        },
        setFileUris: (state, action) => {
            state.fileUris = action.payload
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("fileUris", JSON.stringify(action.payload));
            }
        },
        setMinted: (state, action) => {
            state.minted = action.payload;
            if(typeof window !== undefined && window.localStorage) {
                localStorage.setItem('minted', action.payload)
            }
        },
        setIsConnected: (state, action) => {
            state.isConnected = action.payload;
        },
        setAccount: (state, action) => {
            state.account = action.payload
            if(typeof window !== undefined && window.localStorage) {
                localStorage.setItem('account', action.payload)
            }
        },
        setMultiAssetFiles: (state, action) => {
            state.multiAssetFiles.push(action.payload)
        }
    },
});

export const {
    setState,
    setImage,
    setPaid,
    setObjFile,
    setName,
    setIpfsURI,
    setMinted,
    setIsConnected,
    setAccount,
    setMultiAssetFiles,
    setFileUris
} = imageSlice.actions;
export default imageSlice.reducer;
