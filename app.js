const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]

require("./getSchedule")((schedule) => {
    var savedSchedule = schedule
    var lastDay = ""
    var check = ()=>{
        var now = new Date()
        console.log("asd, checking,", now.toLocaleString())
        for(let i = 0; i < schedule.length; i++){
            if(schedule[i].day != days[now.getDay()]) continue;
            var startHour = parseInt(schedule[i].start.split(":")[0])
            var startMinute = parseInt(schedule[i].start.split(":")[1])
            if(now.getHours() < startHour || now.getMinutes() < startMinute) continue;
            require("./postEthol")(schedule[i].room)
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
})