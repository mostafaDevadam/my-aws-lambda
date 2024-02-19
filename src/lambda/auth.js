const { CognitoIdentityProviderClient, SignUpCommand, } = require('@aws-sdk/client-cognito-identity-provider')

const client = new CognitoIdentityProviderClient()



const login = () => {

}

const register = (event, ctx, cb) => {

    const input = { // SignUpRequest
        ClientId: "STRING_VALUE", // required
        SecretHash: "STRING_VALUE",
        Username: "STRING_VALUE", // required
        Password: "STRING_VALUE", // required
        UserAttributes: [ // AttributeListType
            { // AttributeType
                Name: "STRING_VALUE", // required
                Value: "STRING_VALUE",
            },
        ],
        ValidationData: [
            {
                Name: "STRING_VALUE", // required
                Value: "STRING_VALUE",
            },
        ],
        AnalyticsMetadata: { // AnalyticsMetadataType
            AnalyticsEndpointId: "STRING_VALUE",
        },
        UserContextData: { // UserContextDataType
            IpAddress: "STRING_VALUE",
            EncodedData: "STRING_VALUE",
        },
        ClientMetadata: { // ClientMetadataType
            "<keys>": "STRING_VALUE",
        },
    };

    const command = new SignUpCommand(input)

    const response_ = client.send(command)

    console.log('response*:', response_)

    response = {
        statusCode: 200,
        body: JSON.stringify(response_),
    }

    cb(null, response)



}

const privateUser = () => {

}


module.exports.Handler = { login, register, privateUser }
