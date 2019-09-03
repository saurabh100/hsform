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
            var ownerFname = resp.result[0].firstName;
            setTimeout(() => {
                res.send({
                    redirectUrl: "https://app.hubspot.com/meetings/" + ownerFname
                });
            }, 2000);
        });
});

module.exports = router;