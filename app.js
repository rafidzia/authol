const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
const get = require("./get");
(async () => {
    var schedule = await get("https://ethol.pens.ac.id/api/v1/schedules?user=17210&year=2020&semester=1&role=2")
    // var room = await get("https://ethol.pens.ac.id/api/v1/rooms?kuliah=[42974,42975,42976,42977,42978,42979,42980,42981,42982,42983,42984,42985,42986]")
    var room = [];
    var angka1 = 42974
    var angka2 = 25802
    for(let i = 0; i < 13; i++){
        let newroom = await get("https://ethol.pens.ac.id/api/v1/course/"+ (angka1 + i) +"?mk=" + (angka2 + i));
        room.push(newroom)
    }
    var savedSchedule = schedule
    var lastDay = ""
    var check = ()=>{
        var now = new Date()
        console.log("asd, checking,", now.toLocaleString())
        for(let i = 0; i < schedule.length; i++){
            if(schedule[i].day != days[now.getDay()]) continue;
            var startHour = parseInt(schedule[i].start.split(":")[0])
            var startMinute = parseInt(schedule[i].start.split(":")[1])
            var tempdate = new Date((now.getMonth() + 1) + "-" + now.getDate() + "-" + (now.getFullYear()) + " " + startHour + ":" + startMinute + ":" + "00")

            if(now.getTime() < tempdate.getTime()) continue;
            var data = {}
            for(let j = 0; j < room.length; j++){
                if(room[j].nama == schedule[i].name){
                    data.server = room[j].server
                }
            }
            data.room = schedule[i].room
            require("./postEthol")(data)
            schedule.splice(i, 1);
        }
        if(!lastDay.length) lastDay = now.getDay();
        if(now.getDay() != lastDay){
            console.log("dsa, restartDataSchedule")
            schedule = savedSchedule
            lastDay = now.getDay();
        }
        setTimeout(()=>{
            check()
        }, 1000)
           
    }
    check()
})()