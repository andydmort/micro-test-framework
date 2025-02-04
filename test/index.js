const { addTest, runTests } = require('../index');

addTest('async test (should pass)', async ()=>{
    return true;
});


addTest('sync Test (should pass) ', ()=>{
    return true;
});

addTest('sync Test (should fail)', function (){
    return false;
});

addTest('async Test (should fail)', async function (){
    return false;
});

addTest(`async error test (should fail with Error)`, async()=>{
    throw Error('This is an error');
});

addTest(`sync error test (should fail with Error)`, function (){
    throw Error('This is an error, again');
});

runTests();