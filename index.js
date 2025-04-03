const TESTS = [];

/**
 * Add a test to the test suite.
 * 
 * @param {string} name Specifies the name of the test.
 * @param {function(): boolean | Promise<boolean>} fn Specifies the function to be executed as the 
 * test. The function should return a boolean or a promise that resolves to a boolean. If the function
 * doesn't return anything then the test is considered to have passed. If the function throws an error
 * then the test is considered to have failed.
 * @returns {promise<boolean>} Resolves true if the test was added successfully, false otherwise.
 */
function addTest(name, fn) {
    let effectiveFn = fn;
    TESTS.push({ name, fn: effectiveFn });
}

/**
 * Run all tests that have been added to the test suite.
 */
async function runTests() {
    const passedTests = [];
    const failedTests = [];
    const pendingTests = [];
    for (const test of TESTS) {
        try {
            let prom = Promise.resolve(test.fn())
                .then((result) => {
                    if (result == undefined || result == null || result) {
                        console.log(`✅ ${test.name}\n`);
                        passedTests.push(test);
                    }
                    else {
                        console.error(`❌ ${test.name}\n`);
                        failedTests.push(test);
                    }
                })
                .catch((error) => {
                    console.error(`❌ ${test.name}\n`);
                    console.error(error);
                    failedTests.push(test);
                });
            pendingTests.push(prom);
        } catch (error) {
            console.error(`❌ ${test.name}\n`);
            console.error(error);
            failedTests.push(test);
        }
    }
    // Wait for all tests to complete
    await Promise.allSettled(pendingTests);
    // print out report
    console.log(`\n----------`);
    console.log(`Passed: ${passedTests.length}`);
    passedTests.forEach((test) => console.log(`✅ ${test.name}`));
    console.log(`----------`);
    console.log(`Failed: ${failedTests.length}`);
    failedTests.forEach((test) => console.log(`❌ ${test.name}`));
    console.log(`----------`);
    return failedTests.length === 0;
};

module.exports = { addTest, runTests };
