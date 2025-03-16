// let count=0;

setInterval(() => {
    console.clear()
    console.log(count);
    count++
}, 1000);


//without setInterval

let count=0;

function counter(){
    console.clear();
    console.log(count);
    count+=1;
    setTimeout(counter,1000);
}

counter();