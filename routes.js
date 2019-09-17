var express = require('express');
var router = express.Router();
var getContactOwner = require('./controller/contactOwnerCall');

router.get("/", async (req, res) => {
    res.send("Service running...");
});

router.get("/getUrl/:email", async (req, res) => {
    console.log("req ===", req.params);
    var response = {};
    var apiResp = await getContactOwner.callAPI(req.params.email);
    console.log("resp ==>", apiResp.result.properties);
    if (apiResp.result.properties && apiResp.result.properties.hubspot_owner_id) {
        var ownerKey = apiResp.result.properties.hubspot_owner_id.value;
        response = {
            redirectUrl: getOwnerUrl(ownerKey).url
        };
    }
    res.send(response);
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