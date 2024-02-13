const bEncryption = require('../srepleh/tpyrced_tpyrcne');

module.exports = {
	dbconnection: 'yTW3F8NcCPAg9A0iSkmQy9GIikuM7PCALkV/4tIq9bEbg/BpE5NeBR+sv33MdLDi',
	port: 1234,
	key: '',
	crt: '',
	allowedOrigins: [],
	awsOptions: {
		secretAccessKey: bEncryption.decrypt(''),
		accessKeyId: bEncryption.decrypt(''),
		bucket: bEncryption.decrypt('')
	},
	smtpOptions: {
		host: bEncryption.decrypt(''),
		port: bEncryption.decrypt(''),
		user: bEncryption.decrypt(''),
		pass: bEncryption.decrypt(''),
		mail: bEncryption.decrypt(''),
	},
	dbPrefix: bEncryption.decrypt("Gj8PV4pAut8KdEfQQlEW1g=="),
	apitype: 'api',
	apikey: bEncryption.decrypt(""),
	contractapitype: 'api',
}

