var express = require('express');
var router = express.Router();

var path = require("path");
var fs = require("fs");

var helper = require('../srepleh/tpyrced_tpyrcne');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'BACKEND IS RUNNING' });
});

// GET ALL LOGS IN SERVER
router.get('/logsPm2', async (req, res) => {
  try {
    var file = path.join(__dirname, "../logs/combined.outerr.log");
    fs.readFile(file, "utf8", function (err, data) {
      res.send(data);
    });
  }
  catch (e) {
    res.send(e);
  }
});

router.get('/clearLogsPm2', async (req, res) => {
  try {
    var file = path.join(__dirname, "../logs/combined.outerr.log");
    fs.writeFile(file, "LOG TRUNCATED\n", function (err, data) {
      res.send("Truncated");
    });
  }
  catch (e) {
    res.send(e);
  }
});

// GET ALL ERROR LOGS IN SERVER
router.get('/errorLogs', async (req, res) => {
  try {
    var file = path.join(__dirname, "../logs/error.log");
    fs.readFile(file, "utf8", function (err, data) {
      res.send(data);
    });
  }
  catch (e) {
    res.send(e);
  }
});

router.get('/clearErrorLogs', async (req, res) => {
  try {
    var file = path.join(__dirname, "../logs/error.log");
    fs.writeFile(file, "LOG TRUNCATED\n", function (err, data) {
      res.send("Truncated");
    });
  }
  catch (e) {
    res.send(e);
  }
});

router.post('/encrypt', async (req, res) => {
  try {
    let info = req.body;
    let encryptedData = helper.encrypt(info.data);
    res.json({ status: true, data: encryptedData });
  }
  catch (e) {
    res.json({ status: false, message: 'Something went wrong' });
  }
});

router.post('/decrypt', async (req, res) => {
  try {
    let info = req.body;
    let decryptedData = helper.decrypt(info.data);
    res.json({ status: true, data: decryptedData });
  }
  catch (e) {
    res.json({ status: false, message: 'Something went wrong' });
  }
});

module.exports = router;
