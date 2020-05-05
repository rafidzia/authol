process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const {get} = require("https")
module.exports = (url) => {
    return new Promise((resolve) => {
        var result = ""
        var req = get(url, (res)=>{
            console.log(`STATUS: ${res.statusCode}`)
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on("data", (chunk)=>{
                result += chunk
            })
            res.on("end", ()=>{
                resolve(JSON.parse(result))
            })
        })
        req.on("error", (e)=>{
            console.error(`problem with request: ${e.message}`);
        })
    })
}