function getServerIP() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var output;

    Object.keys(ifaces).forEach(function(ifname) {
        ifaces[ifname].forEach(function(iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            } else {
                output = iface.address;
                return;
            }
        });
        if (output) {
            return;
        }
    });

    return output;
}
// var serverIp = getServerIP();
// console.log("Server IP = ", serverIp);


module.exports.getServerIP = getServerIP;