const token = require("./Jwtjdnejkddlazna");

let tokenValidator = (req, res, next) => {
  let userToken = req.headers["x-access-token"];
  if (typeof userToken != "undefined" && userToken != null && userToken != "") {
    token.verify(userToken, (tokenRes) => {
      if (tokenRes) {
        req.userId = tokenRes.userID;
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

module.exports = tokenValidator;
