const jwt = require('jsonwebtoken');
const secretKey = 'OFYuMdH3D40yrQ2sFxuMqxRaO';

exports.tokenSign = (data) => {
  return new Promise((resolve, reject) => {
    let tok = jwt.sign(data, secretKey, { expiresIn: '24h' });
    resolve(tok);
  });
}

exports.tokenVerify = (userToken, callback) => {
  jwt.verify(userToken, secretKey, function (err, decoded) {
    if (!err && decoded != '') {
      callback(decoded);
    } else {
      callback(false);
    }
  });
}

exports.tokenValidator = (req, res, next) => {
  let userToken = req.headers["x-access-token"] || '';
  if (typeof userToken != "undefined" && userToken != null && userToken != "") {
    this.tokenVerify(userToken, (tokenRes) => {
      if (tokenRes) {
        req.userId = tokenRes.userId;
        next();
      } else {
        res.json({
          status: false,
          statusCode: 721,
          message: "You session is over, So kindly login again with your credentials!",
        });
        res.end();
      }
    });
  } else {
    res.json({
      status: false,
      statusCode: 721,
      message: "Session is not valid",
    });
    res.end();
  }
};
