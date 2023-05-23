const aws = require('aws-sdk');
const {randomUUID} = require('crypto');

let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
        dynamoDBClientParams = {
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
            secretAccessKey: 'DEFAULT_SECRET'
        }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams)

const createUsers = async (event, context) => {
    
    const id = randomUUID();

    let userBody = JSON.parse(event.body)

    userBody.pk = id;

    const params = {
        TableName: 'usersTable',
        Item: userBody
    }

    console.log(params.Item);

    const resultado = await dynamodb.put(params).promise();
    console.log(resultado);
    return {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        "body": JSON.stringify({'user': params.Item})
    }
}

module.exports = {
    createUsers
}
