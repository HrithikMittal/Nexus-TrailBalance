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
                // var temp1 = 0;
                // var temp2 = 0;
                // var temp3 = 0;
                // var temp4 = 0;

                var temp5 = 0;
                var temp6 = 0;

                var flag1 = 0;
                var flag2 = 0;

                dbo.collection("ledger").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    for (i = 0; i < result.length; i++) {

                        if (result[i].nameledger == value1) {
                            temp1 = result[i].creditamount;
                            temp2 = result[i].debitamount;
                            res0 = temp1 - temp2;
                        }
                        if (result[i].nameledger == value2) {
                            temp3 = result[i].creditamount;
                            temp4 = result[i].debitamount;
                            res1 = temp3 - temp4;
                        }
                    }
                });
                if (res0 > 0) {
                    myobj = {
                        trail: "casht.fromname",
                        credit: res0,
                        debit: 0,
                    };
                    dbo.collection("trail").insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                    });
                } else if (res0 <= 0) {
                    myobj = {
                        trail: "casht.fromname",
                        credit: 0,
                        debit: res0,
                    };
                    dbo.collection("trail").insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                    });
                }


                if (res1 > 0) {
                    myobj = {
                        trail: "casht.toname",
                        credit: res1,
                        debit: 0,
                    };
                    dbo.collection("trail").insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                    });
                } else if (res1 <= 0) {
                    myobj = {
                        trail: "casht.toname",
                        credit: 0,
                        debit: res1,
                    };
                    dbo.collection("trail").insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                    });
                }






                dbo.collection("trail").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    for (i = 0; i < result.length; i++) {

                        if (result[i].trailname == value1) {
                            flag1 = 1;
                            if (result[i].creditamount > 0) {
                                temp5 = result[i].creditamount;
                            }
                            if (result[i].debitamount > 0) {
                                temp5 = result[i].debitamount;
                            }
                            temp5 = temp5 + res0;
                        }


                    }
                });

                var myorga = {
                    collectionname: "casht.fromname",
                };

                mynewa = {

                }
                var myorgb = {
                    collectionname: "casht.toname",
                }
                // accessing credit array in database
                tempn = result[i].name;
                tempd = result[i].debit;
                tempc = result[i].credit;
                tempcn = result[i].collectionname;
                console.log(tempc);
                tempc[j] = value5int + tempc[j];
                console.log(tempc);

                mynewa = {
                    collectionname: "trialbalance",
                    name: tempn,
                    debit: tempd,
                    credit: tempc,
                };

                dbo.collection("trail").updateOne(myorga, {
                    "$set": mynewa,
                });





                if (result[i].name[j] == value2) {
                    flag2 = 1;

                    var myorgb = {
                        collectionname: "trialbalance",
                    };

                    // accessing credit array in database
                    tempn = result[i].name;
                    tempd = result[i].debit;
                    tempc = result[i].credit;
                    tempcn = result[i].collectionname;
                    console.log(tempd);
                    tempd[j] = value6int + tempd[j];
                    console.log(tempd);

                    mynewabx = {
                        collectionname: "trailbalance",
                        name: tempn,
                        debit: tempd,
                        credit: tempc,
                    };

                    dbo.collection("trail").updateOne(myorgb, {
                        "$set": mynewabx,
                    });

                }
            }

        }




        // when new trail name comes
        if (flag2 == 0 && flag1 != 0) {
            console.log("I am he");
            var mynewaab = {
                name: value2,
                credit: 0,
                debit: amount,
            };
            console.log(flag2);
            var myorgaab = {
                collectionname: "trialbalance",
            };

            dbo.collection("trail").updateOne(myorgaab, {
                $push: mynewaab
            }, {
                upsert: true
            });

        } else if (flag1 == 0 && flag2 != 0) {
            console.log("I am here");
            var mynewsx = {
                name: value1,
                credit: amount,
                debit: 0,
            };
            console.log(flag1);
            var myorgx = {
                collectionname: "trialbalance",
            };

            dbo.collection("trail").updateOne(myorgx, {
                $push: mynewx
            }, {
                upsert: true
            });

        } else if (flag2 == 0 && flag1 == 0) {


            console.log("I am he");
            var mynewaaby = {
                name: value2,
                credit: 0,
                debit: amount,
            };
            console.log(flag2);
            var myorgaaby = {
                collectionname: "trialbalance",
            };

            dbo.collection("trail").updateOne(myorgaaby, {
                $push: mynewaaby
            }, {
                upsert: true
            });
            console.log("I am here");
            var mynewxy = {
                name: value1,
                credit: amount,
                debit: 0,
            };
            console.log(flag1);
            var myorgxy = {
                collectionname: "trialbalance",
            };

            dbo.collection("trail").updateOne(myorgxy, {
                $push: mynewxy
            }, {
                upsert: true
            });

        }


    });
res.send("All set");
});

});
// Fire up server
app.listen(port);

// print friendly message to console
console.log("Server listening on port " + port);
