# micro-test-framework

This is a very small test framework for node.js. It doesn't have any dependencies and is written with less than 50 lines of code.  

## Usage

```javascript
const { addTest, runTests } = require('micro-test-framework');

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
```

## Output

```
❌ sync error test (should fail with Error)

Error: This is an error, again
    at Object.fn (c:\internal_src\micro-test-framework\test\index.js:25:11)
    at runTests (c:\internal_src\micro-test-framework\index.js:26:45)
    at Object.<anonymous> (c:\internal_src\micro-test-framework\test\index.js:28:1)
    at Module._compile (node:internal/modules/cjs/loader:1469:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Module._load (node:internal/modules/cjs/loader:1104:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
    at node:internal/main/run_main_module:28:49
✅ async test (should pass)

✅ sync Test (should pass)

❌ sync Test (should fail)

❌ async Test (should fail)

❌ async error test (should fail with Error)

Error: This is an error
    at Object.fn (c:\internal_src\micro-test-framework\test\index.js:21:11)
    at runTests (c:\internal_src\micro-test-framework\index.js:26:45)
    at Object.<anonymous> (c:\internal_src\micro-test-framework\test\index.js:28:1)
    at Module._compile (node:internal/modules/cjs/loader:1469:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Module._load (node:internal/modules/cjs/loader:1104:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
    at node:internal/main/run_main_module:28:49

----------
Passed: 2
✅ async test (should pass)
✅ sync Test (should pass)
----------
Failed: 4
❌ sync error test (should fail with Error)
❌ sync Test (should fail)
❌ async Test (should fail)
❌ async error test (should fail with Error)
----------

```