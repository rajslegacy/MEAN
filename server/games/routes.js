const express = require('express');
var router = express.Router();
var db = require('../db/connection');

router.get('/list',function(req,res){
    db.getDb().collection('games').find({}).toArray(function(err, results) {
        res.send(results);
    });
});

module.exports = router;