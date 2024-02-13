var mongoose = require('mongoose');
var config = require("./config");
var bEncryption = require("../srepleh/tpyrced_tpyrcne");

mongoose.set('useCreateIndex', true)

const serverOptions = {
    poolSize: 100,
    keepAlive: true,
    reconnectTries: 30000,
    auto_reconnect: true,
    socketOptions: {
        socketTimeoutMS: 6000000
    }
};

mongoose.connect(bEncryption.decrypt(config.dbconnection), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connection successful')).catch((err) => console.error(err));

mongoose.connection.on('connected', function () {
    console.log('dbconnection', bEncryption.decrypt(config.dbconnection));
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected', new Date());
});

// process.on('SIGINT', function () {
//     mongoose.connection.close(function () {
//         console.log('Mongoose default connection disconnected through app termination');
//         process.exit(0);
//     });
// });