var utils = require('../utils');

serverIp = utils.getServerIP();
// console.log("Server IP = ", utils.getServerIP());

var host_ip = serverIp;
var host_port = ':5000';
var blockchain_ip = 'localhost';
var blockchain_port = ':9984';
const API_PATH = 'https://test.bigchaindb.com/api/v1/'

var cpu_min = 50;


module.exports = {
    host_ip : host_ip,
    host_port : host_port,
    blockchain_ip : blockchain_ip,
    blockchain_port : blockchain_port,
    cpu_min : cpu_min,
};