const MintLoading = () => {
    return (
        <div className="bg-white w-full h-screen text-black flex flex-col items-center gap-10 py-14">

            <p
                className={`${"text-4xl"} text-center max-w-[935px] leading-[1.5] font-light `}
            >
                PASSPORT minting in progress...
            </p>
            <div class="flex justify-center items-center">
                <div class="animate-spin rounded-full border-t-4 border-black h-12 w-12"></div>
            </div>
            <p className="text-[#888888] max-w-[532px] text-center text-sm">
                Note: Please do not close the application while the PASSPORT NFT is being minted as it will affect the import.meta. Please make sure you complete all the wallet interaction.
                Redirect will occur upon completion.
            </p>
        </div>
    )
}


export default MintLoading