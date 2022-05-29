require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const isValidUrl = require("./validate_url/validate_url.js");
const isDotExists = require("./validate_url/is_dot_exists.js");

// express app setup
const app = express();
app.listen(process.env.PORT || 3000);

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));

// database connection
mongoose.connect(process.env.MONGODB_URL);

const urlSchema = new mongoose.Schema({
    short_code: String,
    long_url: String,
    TTLSec: Date,
}, {
    versionKey: false
});

const Url = new mongoose.model("Url", urlSchema, "urls");

// app routing

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", function (req, res) {
    const long_url = req.body.long_url;

    if (!isDotExists(long_url)) res.json({
        valid: 0,
        short_url: ""
    });
    else {
        isValidUrl(long_url, (error, address, family) => {
            if (error || long_url.length == 0) res.json({
                valid: 0,
                short_url: ""
            });
            else {
                var short_code = shortid.generate();

                const new_url = new Url({
                    short_code: short_code,
                    long_url: long_url,
                    TTLSec: new Date(),
                });

                new_url.save((err, data) => {
                    if (!err) {
                        const short_url = "http://" + req.headers.host + "/" + short_code;
                        res.json({
                            valid: 1,
                            short_url: short_url
                        });
                    } else
                        res.json({
                            valid: -1,
                            short_url: "Server Error Try Again.",
                        });
                });
            }
        });
    }
});

app.get("/:short_code", (req, res) => {
    const short_code = req.params.short_code;

    Url.findOne({
        short_code: short_code,
    },
        (err, data) => {
            if (err) res.send("Error at Server Side Try Again.");
            else if (!data) res.send("Requested Url Not Exists.");
            else res.redirect(data.long_url);
        }
    );
});