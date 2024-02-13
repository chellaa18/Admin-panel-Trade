var aws = require("aws-sdk");
var fs = require("fs");

var config = require('../db_details/config');

const uploadFileToCloudinary = (path, folder, allowed_formats = '', transformation = '', oldfile = "") => {
    return new Promise(function (resolve, reject) {
        if (path) {
            var file = fs.readFileSync(path);
            path = path.replace('/tmp/', '');
            var params = {
                Bucket: config.awsOptions.bucket,
                Body: file,
                Key: path,
                ACL: "public-read",
                ContentType: folder ? folder : '',
            };
            var s3 = new aws.S3({
                accessKeyId: config.awsOptions.accessKeyId,
                secretAccessKey: config.awsOptions.secretAccessKey
            });
            s3.upload(params, (err, data) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(data);
                }
            });
        } else {
            resolve("");
        }
    });
};

module.exports = {
    uploadFileToCloudinary
};