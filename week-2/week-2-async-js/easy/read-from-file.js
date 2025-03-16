let fs=require("fs")
console.log("File reading started")
fs.readFile("a.txt","utf-8",(err,data)=>{
    if(err) console.log(err) ;
    else console.log(data);
});
(()=>{
    let res=0;
    for(let i=0;i<1000000;i++){
        res+=Math.sqrt(i);
    }
    console.log(`Expensive task completede with results ${res}`)
})();



