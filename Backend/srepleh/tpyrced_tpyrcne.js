const CryptoJS = require('crypto-js');

var key = CryptoJS.enc.Base64.parse("#ACnVDgFEValamZRvEJDKTCovo#");
var iv = CryptoJS.enc.Base64.parse("#ZaECfWmMVAcchWnyPAohoAMSp#");

exports.encrypt = (value) => {
    let cipher = CryptoJS.AES.encrypt(value, key, { iv: iv }).toString();
    return cipher;
}

exports.decrypt = (value) => {
    try {
        let decipher = CryptoJS.AES.decrypt(value, key, { iv: iv })
        let decrypt_val = decipher.toString(CryptoJS.enc.Utf8);
        return decrypt_val;
    } catch (err) {
        return " ";
    }

}