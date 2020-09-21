const {createServer} = require("http")
const {exec} = require('child_process')
const config = require("./config.json")
var htmlOut = ""

createServer((req, res)=>{
    res.write(htmlOut)
    res.end()
}).listen(8130)


module.exports = (data) => {
    htmlOut = '<!DOCTYPE html>' +
    '<html><head><title>&hellip;</title>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
    '<script type="text/javascript"> function dosubmit() { document.forms[0].submit(); } </script></head>'+
    '<body onload="dosubmit();">' +
    '<form action="https://ethol.pens.ac.id/bbb/join'+ data.server +'.php" method="POST">' +
    '<input type="hidden" name="meeting" value="'+ data.room +'">' +
    '<input type="hidden" name="name" value="'+ config.name +'">' +
    '<input type="hidden" name="role" value="2">' +
    '</form></body> </html>';
    var command = ""
    // command += "/mnt/c/Windows/system32/cmd.exe /c '"
    switch(config.browser){
        case "edge" : command += "start microsoft-edge:http://localhost:8130"
        break
        case "chrome" : command += "start chrome http://localhost:8130"
        break
    }
    // command += "'"
    exec(command, (error, stdout, stderr)=>{
        if (error) {
            console.error(`exec error: ${error}`)
            return;
        }
        console.log("executing schedule..")
        console.log(stdout)
        console.error(stderr)
    })
}