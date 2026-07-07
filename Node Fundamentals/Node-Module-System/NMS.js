
function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

// module.exports = function sub(a, b){
//     return a - b;
// }
// Using module.exports again overwrites the sub so we can't use the function sub
module.exports = {
    add , mult : (a,b)=> (a*b) , sub // sub was added fixing the problem
}

// this function hasn't overriden the previous one cause :
// module.exports.divide = ... adds a property to the existing object, while module.exports = { ... } replaces the entire object. 

module.exports.divide = (a,b)=> (a/b)
module.exports.greet = () =>  console.log("Hello there");








// ❌ This WON'T work (breaks the reference)
//exports = { add: (a,b) => a+b };

// ✅ Always use module.exports for replacing the whole object
//module.exports = { add: (a,b) => a+b };