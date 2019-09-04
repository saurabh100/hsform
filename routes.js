var express = require('express');
var router = express.Router();
var getContactOwner = require('./controller/contactOwnerCall');

router.get("/", async (req, res) => {
    res.send("Service running...");
});

router.get("/getUrl", async (req, res) => {
    await getContactOwner.callAPI()
        .then((resp) => {
            console.log("resp ==> ", resp.result[0]);
            var ownerKey = resp.result[0].firstName;
            setTimeout(() => {
                res.send({
                    redirectUrl: getOwnerUrl(ownerKey).url
                });
            }, 2000);
        });
});

function getOwnerUrl(ownerKey) {
    var urlConfig = require("./ownerUrlConfig.json");
    var owner = {};
    urlConfig.forEach(element => {
        if (element.ownerKey == ownerKey) {
            owner = element;
        }
    });
    return owner;
}


module.exports = router;