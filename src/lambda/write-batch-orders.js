const fs = require('fs/promises')
const { getFile } = require('../util/get-file')


module.exports.handler = async (event, ctx, cb) => {


    //const response = jsonResponse(200, { "msg": "write batch" })

    let obj

    const res = await getFile()
    console.log("res*:", res)
   /* res.then(({ data }) => {
        console.log('json:', data)
        obj = data


    })*/

    console.log(obj)


    const response = {
        statusCode: 200,
        body: JSON.stringify({ "msg": "write batch", obj })
    }

    cb(null, response)

}


const jsonResponse = async (code, body) => {
    return {
        statusCode: 200,
        body: JSON.stringify(body)
    }
}
