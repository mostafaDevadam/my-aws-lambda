const AWS_s3 = require('@aws-sdk/client-s3')
const {S3Client} = require('@aws-sdk/client-s3')



const s3Client = new AWS_s3.S3()

const client = new S3Client()

const write = async (bucket, fileName) => {
    const params = {
        Bucket: bucket,
        Key: fileName
    }
    const command = new AWS_s3.ListBucketsCommand(params)
    const data = await client.send(command)
}

const getObject = async (bucket, fileName) => {
    const params = {
        Bucket: bucket,
        Key: fileName
    }

    const data = await s3Client.getObject(params)
    s3Client.listObjects(params, (err, data_) => {
        if (err) throw err

        console.log(data_);
    })

    return data.Body
}


module.exports.s3Service = {write, getObject}
