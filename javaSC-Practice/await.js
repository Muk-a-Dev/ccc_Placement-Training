//async and await
//waiting for 2 seconds
//await waits for promise completion
//this is cleaner than then()
//used in mordern node.js

function fetchData(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Data recieved");
        }, 2000);
    });
}
async function getData(){
    let result = await fetchData();
    console.log(result);
}
getData();