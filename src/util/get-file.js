
const fs = require('fs/promises')


const getFile = async () => {
    return fs.readFile('../../assets/db.json')
        .then((data) => data.toString())
        .then(th => JSON.parse(th))
        .catch((error) => {
            console.log(error)
            return error
        })
}

/*
const res = getFile('../../assets/db.json')
res.then(({ data }) => {
    //console.log('res**:', th)
    //const {data} = JSON.parse(th)
    //const { data } = th

    console.log('json:', data)
    for (let item of data) {
        console.log('item:', item)
    }

})
*/

module.exports.getFile = getFile

