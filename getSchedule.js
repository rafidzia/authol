process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const https = require("https")
module.exports = (callback) => {
    var result = ""
    var req = https.get("https://ethol.pens.ac.id/api/v1/schedules?user=17210&year=2019&semester=2&role=2", (res)=>{
        console.log(`STATUS: ${res.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on("data", (chunk)=>{
            result += chunk
        })
        res.on("end", ()=>{
            callback(JSON.parse(result))
        })
    })
    req.on("error", (e)=>{
        console.error(`problem with request: ${e.message}`);
    })
}

