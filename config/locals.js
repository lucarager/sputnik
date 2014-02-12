module.exports = {
    port: 8080,
    environment: 'development',
    session : {
         secret: 'seekrit'
    },
    adapters : {
        mongo: {
            user     : 'username',
            password : 'password',
            database : 'your mongo db name here',
        }
    }
};