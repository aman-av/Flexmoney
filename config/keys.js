if(process.env.NODE_ENV === 'production')
{
    //we are in production environment - reurtn prod keys
    module.exports = require('./prod');
}
else
{
    //we are in development environment - return dev keys
    module.exports = require('./dev');
}