const https = require('https');

module.exports = async function(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            resolve(res.socket.getPeerCertificate(false))
        }).on('error', err => {
            reject(err)
        })
    })
};
