var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Details = require("./app/models/cash");
var Ledger = require("./app/models/ledger");
var Trails = require("./models/casha");
var MongoClient = require("mongodb").MongoClient;


// Configure app for bodyParser()
// lets us grab data from the body of POST
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

// Set up port for server to listen on
var port = process.env.PORT || 3004;

// Connect to DB
var url = "mongodb://localhost:27017/transaction";

MongoClient.connect(
    url,
    (err, db) => {
        const dbo = db.db("trans");
        //API Routes
        var router = express.Router();

        // Routes will all be prefixed with /API
        app.use("/api", router);

        //MIDDLE WARE-
        router.use(function (req, res, next) {
            console.log("FYI...There is some processing currently going down");
            next();
        });

        // test route
        router.get("/", function (req, res) {
            res.json({
                message: "Welcome !"
            });
        });

        // code for ledger
        router.route("/trans").post(function (req, res) {


            var casht = new Details();
            var ledgera = new Ledger();
            var trail = new Trails();

            casht.fromname = req.body.fromname;
            casht.toname = req.body.toname;
            var value1 = casht.fromname;
            var value2 = casht.toname;
            console.log(value2);
            // var temp1 = 0;
            // var temp2 = 0;
            // var temp3 = 0;
            // var temp4 = 0;

            var temp5 = 0;
            var temp6 = 0;
            var res0 = 0;
            var res1 = 0;
            var flag1 = 0;
            var flag2 = 0;

            dbo.collection("ledger").find({}).toArray(function (err, result) {
                if (err) throw err;
                for (i = 0; i < result.length; i++) {

                    if (result[i].nameledger == value1) {
                        temp1 = result[i].creditamount;
                        temp2 = result[i].debitamount;
                        res0 = temp1 - temp2;
                        console.log("Hellllo");
                        console.log(res0);
                    }
                    if (result[i].nameledger == value2) {
                        temp3 = result[i].creditamount;
                        temp4 = result[i].debitamount;
                        res1 = temp3 - temp4;
                        console.log("Hlo");
                        console.log(res1 + "hehe");
                    }
                }
            });

            dbo.collection("trail").find({}).toArray(function (err, result) {
                if (err) throw err;
                for (i = 0; i < result.length; i++) {

                    if (result[i].trailname == value1) {
                        flag1 = 1;
                        // if (result[i].creditamount > 0) {
                        //     temp5 = result[i].creditamount;
                        // }
                        // if (result[i].debitamount > 0) {
                        //     temp5 = result[i].debitamount;
                        // }
                        // console.log(temp5);
                        temp5 = res0;

                        if (temp5 > 0) {
                            myalr = {
                                trailname: value1,
                            };
                            myup = {
                                trailname: value1,
                                creditamount: temp5,
                                debitamount: 0,
                            };
                            dbo.collection("trail").updateOne(myalr, {
                                $set: myup
                            });

                        } else if (temp5 <= 0) {
                            myalr = {
                                trailname: value1,
                            };
                            myup = {
                                trailname: value1,
                                creditamount: 0,
                                debitamount: temp5,
                            };
                            dbo.collection("trail").updateOne(myalr, {
                                $set: myup
                            });

                        }
                    }

                    if (result[i].trailname == value2) {
                        flag2 = 1;
                        // if (result[i].creditamount > 0) {
                        //     temp6 = result[i].creditamount;
                        // }
                        // if (result[i].debitamount > 0) {
                        //     temp6 = result[i].debitamount;
                        // }
                        console.log("Helo");
                        temp6 = res1;
                        console.log("this is value of temp6 " + temp6);
                        console.log("this is value of res1 " + res1);
                        if (temp6 > 0) {
                            myalra = {
                                trailname: value2,
                            };
                            myupa = {
                                trailname: value2,
                                creditamount: temp6,
                                debitamount: 0,
                            };
                            dbo.collection("trail").updateOne(myalra, {
                                $set: myupa
                            });

                        } else if (temp6 <= 0) {
                            myalrb = {
                                trailname: value2,
                            };
                            myupb = {
                                trailname: value2,
                                creditamount: 0,
                                debitamount: temp6,
                            };
                            dbo.collection("trail").updateOne(myalrb, {
                                $set: myupb
                            });
                        }
                    }
                }
                if (flag1 == 0) {
                    if (res0 > 0) {
                        myobj = {
                            trailname: value1,
                            creditamount: res0,
                            debitamount: 0,
                        };
                        dbo.collection("trail").insertOne(myobj, function (err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                        });
                    } else if (res0 <= 0) {
                        myobj = {
                            trailname: value1,
                            creditamount: 0,
                            debitamount: res0,
                        };
                        dbo.collection("trail").insertOne(myobj, function (err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                        });
                    }

                }
                if (flag2 == 0) {
                    console.log("Bye");
                    console.log(res1);
                    if (res1 > 0) {
                        myobjz = {
                            trailname: value2,
                            creditamount: res1,
                            debitamount: 0,
                        };
                        console.log("Bye");
                        dbo.collection("trail").insertOne(myobjz, function (err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                        });
                    } else if (res1 <= 0) {
                        myobjzz = {
                            trailname: value2,
                            creditamount: 0,
                            debitamount: res1,
                        };
                        console.log("Bye");
                        dbo.collection("trail").insertOne(myobjzz, function (err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                        });
                    }
                }

            });
            res.send("All set");
        });

    });
// Fire up server
app.listen(port);

// print friendly message to console
console.log("Server listening on port " + port);