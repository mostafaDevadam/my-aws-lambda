const { service, main_query } = require('../services/service')


module.exports.handler = async (event, ctx, cb) => {

    let list = []

    console.log('*****')

    const ORDERS_TABLE = process.env.ORDERS_TABLE

    const all = await service.readAll_(ORDERS_TABLE)

    const result_scan = await service.main_scan(ORDERS_TABLE)
    const items = result_scan.Items

    const response = {
        statusCode: 200,
        body: JSON.stringify({items,all}),
    }

    cb(null, response)
}
