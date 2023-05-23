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

const updateUsers = async (event, context) => {
    
    let userId = event.pathParameters.id

    const body = JSON.parse(event.body)

    const params = {
        TableName: 'usersTable',
        Key: {pk: userId},
        UpdateExpression: 'set #email = :email, #password = :password, #role = :role, #avatar = :avatar',
        ExpressionAttributeNames: {"#email":"email", "#password":"password", "#role" :"role", "#avatar":"avatar"},
        ExpressionAttributeValues: { ':email': body.email, ":password": body.password, ":role": body.role, ":avatar": body.avatar },
        ReturnValues: 'ALL_NEW'
    }


    const resultado = await dynamodb.update(params).promise();
    console.log(resultado);
    return {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        "body": JSON.stringify({'users': resultado.Attributes})
    }
}

module.exports = {
    updateUsers
}
