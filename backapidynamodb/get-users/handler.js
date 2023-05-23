const aws = require('aws-sdk');

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


const getUsers = async (event, context) => {
    const params = {
        TableName: 'usersTable'
    };
    
    const resultado = await dynamodb.scan(params).promise();
    console.log(resultado);
    return {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        "body": JSON.stringify({'users': resultado.Items})
    }
}


module.exports = {
    getUsers
}