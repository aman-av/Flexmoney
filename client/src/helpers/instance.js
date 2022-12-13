const axios = require('axios');
const instance = axios.create({ withCredentials: true });

module.exports=instance