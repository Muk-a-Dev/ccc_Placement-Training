//promise- 3 states (pending, resolved, rejected)
//having methods like .then() and .catch()

let myPromise = new Promise((resolve, reject) => {
    let success = true;
    if(success){
        resolve("Login successful");
    }
    else{
        reject("Login failed")
    }
});

myPromise.then((result) => console.log(result))
    .catch((error) => console.log(error));