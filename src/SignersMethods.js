exports.getProfileParamByName = async (profileName, profileOwner, param, serverless) => {
    
    try {
        const profileDescription = await serverless.providers.aws.request('Signer', 'getSigningProfile', {
            profileName: profileName,
            profileOwner: profileOwner
        })
        var response = profileDescription[param]
    }
    catch (e) {
        if (e.providerError.code === "ProfileNotFound") {
            serverless.cli.log("Signing profile not found")
            var response = null
        }
        else {
            throw e;
        }
    }
    return  response

}