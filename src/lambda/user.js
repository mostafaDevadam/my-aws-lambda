
    module.exports.handler = (event, context, callback) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'user...!' }),
        };

        callback(null, response);
    }
