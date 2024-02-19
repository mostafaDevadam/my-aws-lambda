
const { service } = require('../services/service')


module.exports.handler = async (event, ctx, cb) => {

    const { pathParameters = {} } = event

    const { id } = pathParameters

    const ORDERS_TABLE = process.env.ORDERS_TABLE

    if (!id) {
        throw new Error("no id")
    }

    //const doc = await service.remove_Item_command(id, ORDERS_TABLE)
    const doc = await service.remove_command(id, ORDERS_TABLE)

    if (!doc) {
        throw new Error("cannot remove data")
    }

    const response = {
        statusCode: '200',
        body: 'JSON.stringify({ msg: "remove" })'
    }

    cb(null, response)

}
