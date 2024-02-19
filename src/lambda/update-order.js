

const { service } = require('../services/service')


module.exports.handler = async (event, ctx, cb) => {

    const { body = {} } = event

    const { name = '', amount = '0' } = JSON.parse(body)

    const { pathParameters = {} } = event;

    const { id } = pathParameters

    const order = {
        name,
        amount,
    }

    const ORDERS_TABLE = process.env.ORDERS_TABLE

    //const doc = await service.update_Item_command(id, order, ORDERS_TABLE)

    const doc = await service.update_command(id, order, ORDERS_TABLE)

    console.log('updated*:', doc)

    if (!doc) {
        throw new Error("cannot get data")
    }


    const response = {
        statusCode: 200,
        body: "JSON.stringify(doc)"
    }

    cb(null, response)
}
