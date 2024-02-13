var originList = require('../db_details/snigirOdewolla');

let originMiddle = async (req, res, next) => {
	let origin = req.headers['origin'] || '';
	var index = originList.origin.indexOf(origin);
	if (origin && origin != '' && index != -1) {
		next()
	}
	else {
		return res.json({ status: false, message: "Unauthorized Request" });
	}
}

module.exports.origin = originMiddle;