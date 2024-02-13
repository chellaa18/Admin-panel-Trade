if (process.env.NODE_ENV == 'local') {
	var environ = 'local';
} else if (process.env.NODE_ENV == 'devel') {
	var environ = 'demo';
} else {
	var environ = 'dorp';
}

module.exports = require("./" + environ + ".js");