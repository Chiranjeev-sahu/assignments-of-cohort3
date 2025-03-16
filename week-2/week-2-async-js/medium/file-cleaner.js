const fs=require("fs")

function cleanFile(path){
    fs.readFile(path,"utf-8",(err,data)=>{
        if(err) console.log(err);
        else {
            console.log(`Uncleaned file content:${data}`);
            let content=data;
            let cleanedContent=data.trim().split(/\s+/).join(" ");
            fs.writeFile(path,cleanedContent,"utf-8",(err)=>{
                if(err) console.log(err);
            })
            fs.readFile(path,"utf-8",(err,data)=>{
                if (err) console.log(err);
                else console.log(`Cleaned text written to ${path}: ${data}`);
            })
        }

    })
}

cleanFile("text.txt")