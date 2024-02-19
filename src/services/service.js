const { DynamoDBClient, DynamoDB,
    GetItemCommand, UpdateItemCommand, DeleteItemCommand, PutItemCommand,
    BatchWriteItemCommand,



} = require("@aws-sdk/client-dynamodb");


const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    ScanCommand,
    UpdateCommand,
    DeleteCommand,
    BatchWriteCommand,

} = require("@aws-sdk/lib-dynamodb");



const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);
let d = new DynamoDB()



const write_Item_command = async (data, tableName) => {

    const params = {
        TableName: tableName,
        Item: {
            orderId: { S: data.orderId },
            name: { S: data.name },
            amount: { S: data.amount },
        }
    }

    const command = new PutItemCommand({
        TableName: tableName,
        Item: {
            orderId: { S: data.orderId },
            name: { S: data.name },
            amount: { S: data.amount },
        }
    });


    const response = await dynamoDbClient.send(command)
    console.log(response)
    return response

}

const write_command = async (data, tableName) => {

    const params = {
        TableName: tableName,
        Item: {
            orderId: data.orderId,
            name: data.name,
            amount: data.amount,
        }
    }

    const result = await dynamoDbClient.send(new PutCommand(params))
    if (!result) {
        throw new Error("unable to write to table")
    }
    return result
}

const readOne_Item_command = async (id, tableName) => {
    const params = {
        TableName: tableName,
        Key: {
            orderId: { S: id },
        }
    }

    const command = new GetItemCommand(params)

    const response = await dynamoDbClient.send(command)

    if (!response) {
        throw new Error("unable to get from table")
    }

    console.log("readOne_Item_command response:", response)

    let obj = { orderId: '', name: '', amount: '' }
    obj = getFormat("Item", response, obj)

    return obj;
}

const readOne_command = async (id, tableName) => {
    const params = {
        TableName: tableName,
        Key: {
            orderId: id,
        }
    }

    const { Item } = await dynamoDbClient.send(new GetCommand(params))
    if (!Item) {
        throw new Error("unable to get from " + tableName)
    }

    // const { orderId, name, amount } = Item

    return Item
}

const readAll_ = async (tableName) => {
    const params = {
        TableName: tableName,
    }

    const res = await d.scan(params)

    let list = []

    res.Items.forEach((element, index, array) => {
        const { orderId = {}, name = {}, amount = {} } = element
        const obj = { orderId: orderId.S, name: name.S, amount: amount.S }
        list.push(obj)
        console.log("all element*:", element)
    });

    return list;
}

const main_scan = async (tableName) => {
    console.log("*** main_scan ***")
    const command = new ScanCommand({
        TableName: tableName,
    });

    const response = await dynamoDbClient.send(command);
    response.Items.forEach(function (el, index, array) {
        console.log(`scan command: ${el.name} - ${el.amount}\n`);
    });
    return response;
};

const main_query = async (tableName) => {

    /*
        d.query(params_q, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success data items", data.Items);
                data.Items.forEach(function (element, index, array) {
                    console.log("element q:", element)
                    //console.log(element.Title.S + " (" + element.Subtitle.S + ")");
                });
            }
        });*/


    console.log("*** main_query ***")
    const command = new QueryCommand({
        KeyConditionExpression: "name = :name",
        ExpressionAttributeValues: {
            ":name": { S: "adam" },
            // ":amount": { S: "405" },
        },
        //FilterExpression: "contains (Description, :searchKey)",
        ProjectionExpression: "orderId, name, amount",
        TableName: tableName,
    });

    const response = await dynamoDbClient.send(command);
    response.Items.forEach(function (pie) {
        console.log(`query command: ${pie.orderId.S} - ${pie.name.S}\n`);
    });
    return response;
};

const update_Item_command = async (id, data, tableName) => {

    const command = new UpdateItemCommand({
        TableName: tableName,
        Key: {
            orderId: { S: id },
        },
        UpdateExpression: "set #name = :nameValue, #amount = :amountValue",
        ExpressionAttributeNames: {
            "#name": "name",
            "#amount": "amount",
        },
        ExpressionAttributeValues: {
            ":nameValue": { S: data.name },
            ":amountValue": { S: data.amount },
        },
        ReturnValues: "ALL_NEW",
    });

    const response = await dynamoDbClient.send(command);
    console.log(response);
    let obj = { orderId: '', name: '', amount: '' }

    const { orderId, name: name_, amount: amount_ } = response.Attributes

    obj.orderId = orderId.S
    obj.name = name_.S
    obj.amount = amount_.S

    return obj;

}

const update_command = async (id, data, tableName) => {
    console.log("*** main_scan ***")
    const command = new UpdateCommand({
        TableName: tableName,
        Key: {
            "orderId": id,

        },
        UpdateExpression: "set #name = :nameValue, amount = :amountValue",
        ExpressionAttributeNames: {
            "#name": "name",
        },
        ExpressionAttributeValues: {
            ":amountValue": data.amount,
            ":nameValue": data.name,
        },
        ReturnValues: "ALL_NEW",
    });

    const response = await dynamoDbClient.send(command);
    console.log('update response: ', response)
    /* response.Attributes.forEach(function (el, index, array) {
         console.log(`update command: ${el.name} - ${el.amount}\n`);
     });*/
    return response;
};


const remove_command = async (id, tableName) => {

    /*await d.deleteItem({

    })*/

    const command = new DeleteCommand({
        TableName: tableName,
        Key: {
            'orderId': id,
        },
    });

    const response = await dynamoDbClient.send(command);
    console.log(response);
    return response;


}


const remove_Item_command = async (id, tableName) => {

    const command = new DeleteItemCommand({
        TableName: tableName,
        Key: {
            'orderId': { S: id },
        },
    });

    const response = await dynamoDbClient.send(command);
    console.log(response);
    return response;


}

const writeBatch = async (data, tableName) => {

    const batchData = data.map(item => ({
        PutRequest: {
            Item: {
                ...item
            }
        }
    }))

    const param = {
        RequestItem: {
            [tableName]: batchData,

        }
    }

    const command = new BatchWriteCommand({
        RequestItems: {
            [tableName]: batchData,
        }
    })

    //const command = new BatchWriteItemCommand({})


    const response = await dynamoDbClient.send(command);
    console.log(response);
    return response;

}


module.exports.service = {
    write_command,
    write_Item_command,
    readOne_command,
    readOne_Item_command,
    readAll_,
    main_scan,
    update_Item_command,
    update_command,
    remove_command,
    remove_Item_command,
    // batch
    writeBatch,
    // noch nicht
    main_query,

}


const getFormat = (key, responseObj, outputObj) => {

    if (key === "Item") {

        const { orderId, name: name_, amount: amount_ } = responseObj[key]

        outputObj.orderId = orderId.S
        outputObj.name = name_.S
        outputObj.amount = amount_.S

        return outputObj;
    }
}
