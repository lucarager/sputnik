module.exports = {
    port: 80,
    environment: 'production',
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