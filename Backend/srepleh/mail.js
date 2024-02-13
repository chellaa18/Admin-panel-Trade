var nodemailer = require("nodemailer");
var templateModel = require('../models/emailTemplateModel');

var config = require('../db_details/config');

exports.sendMail = (to = "", template = "", replacable = {}) => {
    return new Promise(function (resolve, reject) {
        try {
            templateModel.findOne({ 'title': template, 'language': 1 }, async (err, templateData) => {
                var newSubject = templateData.subject;
                var newTemplate = templateData.template;
                var defaultReplacables = {};

                for (let defaultReplace in defaultReplacables) {
                    let re = new RegExp(defaultReplace, 'g');
                    newTemplate = newTemplate.replace(re, defaultReplacables[defaultReplace]);
                }

                for (let replace in replacable) {
                    let re = new RegExp(replace, 'g');
                    newTemplate = newTemplate.replace(re, replacable[replace]);
                }

                for (let replace in replacable) {
                    let re = new RegExp(replace, 'g');
                    newTemplate = newTemplate.replace(re, replacable[replace]);
                }

                var transporter = nodemailer.createTransport({
                    host: config.smtpOptions.host,
                    port: config.smtpOptions.port,
                    auth: {
                        user: config.smtpOptions.user,
                        pass: config.smtpOptions.pass,
                    }
                });
                var mailOptions = {
                    from: config.smtpOptions.mail,
                    to: to,
                    bcc: '',
                    subject: newSubject,
                    html: newTemplate
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            });
        }
        catch (e) {
            resolve(false);
        }
    });

};