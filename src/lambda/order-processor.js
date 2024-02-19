const { s3Service } = require("../services/s3.service");
const { service } = require("../services/service");



module.exports.handler = (event) => {
    console.log("******")

    const { Records = [] } = event

   /* const BUCKET_NAME = process.env.ordersBucketName

    console.log("record:", Records)


    Records.forEach(async record => {
        if (record.s3) {
            const { s3: { object, bucket } } = record
            console.log(bucket, object)
        }
    })*/


    Records.forEach(async record => {
         if (record.s3) {
             try {
                 const { s3: { object, bucket } } = record
                 const contents = await s3Service.getObject(bucket.name, object.key)

                 console.log("contents:", contents);

                const data = JSON.parse(contents)
                 const orders = data.map(item => ({
                     orderId: uuid(),
                     ...item
                 }))

                 console.log(orders);

                 const ORDERS_TABLE = process.env.ORDERS_TABLE


                 await service.writeBatch(orders, ORDERS_TABLE)
             } catch (error) {
                 console.log("Error processing order")
                 console.log(e);
             }



         }

     });

}
