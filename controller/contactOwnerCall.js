var httprequest = require('request');

exports.callAPI = (api_method, req) => {

    console.log("connector url == ", api_method);

    var apiKey = "3905b33b-a31e-411f-9da8-f9cb93f136fc";

    return new Promise((resolve, reject) => {

        httprequest.get({
            url: "https://api.hubapi.com/owners/v2/owners?hapikey=" + apiKey,
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