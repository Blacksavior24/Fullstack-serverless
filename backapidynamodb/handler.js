
const hello = async (event, context) => {
    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'message': 'Hola mundo - bienvenidos'})
    }
}

module.exports = {
    hello
}
