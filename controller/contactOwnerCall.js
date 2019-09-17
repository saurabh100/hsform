var httprequest = require('request');
var config = require('../config');

exports.callAPI = (email) => {

    return new Promise((resolve, reject) => {

        var url = config.getOwnerApi.url.replace("{{email}}", email) + config.getOwnerApi.apiKey;
        console.log(url);
        httprequest.get({
            url: url,
        }, function (error, response, body) {
            if (response != undefined) {

                if (response.body && response.body.status) {
                    resolve({ error: true, result: JSON.parse(response.body) });
                } else {
                    resolve({ result: JSON.parse(response.body) });
                }
            } else {
                // console.log("response.body ===================> ", response.body);
                resolve({ error: true, result: response });
            }
        });
    });

}