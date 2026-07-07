
// function test() {
//     return Promise.resolve("Hi");
// }

// let x = test().then(res => console.log(res))
// console.log(x);



function simulateAPI(name, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`✅ ${name} completed after ${delay}ms`);
        }, delay);
    });
}

// Chaining with Promises
function processUserPromises() {
    console.log('⏳ Starting...');
    
    simulateAPI('Fetch User', 1000)
        .then(result => {
            console.log(result);
            return simulateAPI('Fetch Orders', 800);
        })
        .then(result => {
            console.log(result);
            return simulateAPI('Process Payment', 500);
        })
        .then(result => {
            console.log(result);
            console.log('✅ Done!');
        })
        .catch(err => console.error('❌ Error:', err));
}

processUserPromises();