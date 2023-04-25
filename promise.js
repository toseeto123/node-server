const addSum =(a,b) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(typeof a !== 'number' || typeof b !== 'number') {
                reject ('a,b must be numbers');
            }
            resolve(a+b)
        }, 1000);
    })
}
// addSum(10,20)
// .then(sum1 => addSum(sum1,1))
// .then(sum1 => addSum(sum1,1))
// .then(sum1 => addSum(sum1,1))
// .then(sum1 => addSum(sum1,1))
// .then(sum2=> console.log({sum2})) 
// .catch(error => console.log({error}))

const totalSum = async() => { //await를 쓰려면 
    try{
        let sum = await addSum(10, 10)
        let sum2 = await addSum(sum , 10)
        console.log({ sum,sum2 })
    }catch(err){
        if(err) console.log( { err })
    }
}

totalSum();