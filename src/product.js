var express = require('express');

var router  = express.Router();

var product = require("../Product");

/*
GET
*/

router.get('/', function(req, res){

    Medicines.find(function(err, medName){
        if(err)
            console.log(err)
        res.render('index', {
            medName: Medicines.
        })
    });
});