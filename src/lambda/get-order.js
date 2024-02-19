const { service } = require('../services/service')


module.exports.handler = async (event, ctx, cb) => {

    const { pathParameters = {} } = event;

    const { id } = pathParameters

    if (!id) {
        throw new Error("no id")
    }

    const ORDERS_TABLE = process.env.ORDERS_TABLE

    const doc = await service.readOne_command(id, ORDERS_TABLE)
    //const doc = await service.readOne_Item_command(id, ORDERS_TABLE)

    console.log("doc:", doc)


    if (!doc) {
        throw new Error("cannot get data")
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(doc)
    }

    cb(null, response)
}
