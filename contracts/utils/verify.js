const verify = async (address="0x11095c2e11040630484a1b7fb3D00877428B5981", constructorArguments=[]) => {
    console.log("Verifying...");
    try {
        await run("verify:verify", {
            address,
            constructorArguments,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log(error);
        }
    }
};

module.exports = { verify };

