const fs = require("fs");
const readline = require("readline");
const path = require("path");

const lyricPath = path.join(__dirname,"./lyric1.txt");
const readstream = fs.createReadStream(lyricPath);
const rl = readline.createInterface({
    input:readstream
});
let startTime=new Date().getTime();

rl.on("line",(chunk)=>{  //readline逐行读取代码
    lineAnalysis(chunk);
})

// readstream.on("data",function(chunk){   //一部分一部分读取代码
//     let lineArray = chunk.toString("utf-8").split("\r\n");
//     lineArray.forEach(function(element) {
//         lineAnalysis(element)
//     });
// })

function lineAnalysis(item){
    let reg = /\[(\d{2})\:(\d{2})\.(\d{1,3})\](.+)/;
    let arrayLine=reg.exec(item);  //按照正则规则，把小括号里面切分成数组形式，注意：0位代表整段（item）
    if(arrayLine){
        let time1=parseInt(arrayLine[1]);
        let time2=parseInt(arrayLine[2]);
        let time3=parseInt(arrayLine[3]);
        let lyric=arrayLine[4];
        
        let totalTime = time1*60*1000+time2*1000+time3;
        let chaTime = new Date().getTime()-startTime;
        setTimeout(function(){
            console.log(lyric)
        },totalTime-chaTime)
    }
    
}