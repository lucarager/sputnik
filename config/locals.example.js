module.exports = {
  port: 80,
  environment: 'production',

  adapters: {
    mongo: {
      user     : 'username',
      password : 'password',
      database : 'database',
      host     : 'host'
    }
  },

  mandrill: {
    apiKey: 'somekey',
    from: {
      name: 'YourSite',
      email: 'no-reply@example.com'
    }
  },
  
  session: {
    secret: 'souperseekrit'
  }
};