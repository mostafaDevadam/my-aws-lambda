
const { v4: uuid } = require('uuid')
const { service } = require('../services/service')


module.exports.handler = async (event, ctx, cb) => {

    const { body = {} } = event

    const {  name = '', amount = 0 } = JSON.parse(body)

    /*if (!orderId) {
        throw new Error('"orderId" must be a string')
    }*/
    const order = {
        orderId: uuid(),
        name,
        amount,
        //createdAt: Date.now()
    }

    const ORDERS_TABLE = process.env.ORDERS_TABLE

    //const doc = await service.write_(order, ORDERS_TABLE)
    const doc = await service.write_Item_command(order, ORDERS_TABLE)

    if (!doc) {
        throw new Error("cannot create data")
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(doc),
    }

    cb(null, response)

}
