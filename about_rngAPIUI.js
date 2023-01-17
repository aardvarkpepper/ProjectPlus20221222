// Fetches PRNG results from dice API, output and calculated results sent to webpage.
// To do:  Refactor with argument to fetch request to different APIs, write handling for different API data structures.
// Use CSPRNG and periodically reset seeds.  But *which* seeds is also vulnerable, must ensure seeds may not be injected.
const aTestRun = function fATestRun(event) {
    //event.preventDefault() to prevent CORS Cross-Origin Resource Sharing error
    //Appended https://sprightly-biscochitos-877a5d.netlify.app/ to attempt to bypass CORS issue.
    event.preventDefault();
    fetch(`https://sprightly-biscochitos-877a5d.netlify.app/http://www.randomnumberapi.com/api/v1.0/random?min=1&max=6&count=${Number(document.getElementById("aDiceCount").value)}`).
        then(result => result.json()).
        then(objectArray => {

            const initializer = 0;
            const diceRolled = document.getElementById("aDiceCount").value;
            const toHit = document.getElementById("aToHit").value;
            const projectedHitCount = diceRolled * toHit / 6;

            const diceRollsToBrowser = function fDiceRollsToBrowser() {
                const aOutput = document.getElementById("aOutput");
                aOutput.innerText = "";
                const numberToDiceArray = [
                    "\u2680",
                    "\u2681",
                    "\u2682",
                    "\u2683",
                    "\u2684",
                    "\u2685",
                ];
                const toHit = document.getElementById("aToHit").value;
                //test OK 2023 Jan 14
                objectArray.forEach(element => {
                    const spDiceRoll = document.createElement("span");
                    spDiceRoll.innerText = numberToDiceArray[element - 1];
                    if (element <= toHit) {
                        spDiceRoll.classList.add("hit");
                    } else {
                        spDiceRoll.classList.add("miss");
                    }
                    aOutput.appendChild(spDiceRoll);
                });
            };
            diceRollsToBrowser();

            const actualHitCountToBrowser = function fActualHitCountToBrowser() {
                const actualHitCount = document.getElementById("aHitCount");
                actualHitCount.innerText = objectArray.reduce(
                    (accumulator, currentValue) => {
                        return accumulator + ((currentValue > toHit) ? 0 : 1);
                    }, initializer
                );
            };
            actualHitCountToBrowser();

            const projectedHitCountToBrowser = function fProjectedHitCountToBrowser() {
                const spProjectedHitCount = document.getElementById("avgHitCount");
                spProjectedHitCount.innerText = projectedHitCount.toFixed(2);
            };
            projectedHitCountToBrowser();

            // Test OK 2023 Jan 14
            const sampleVarianceAndStandardDeviationToBrowser = function fSampleVarianceAndStandardDeviationToBrowser() {
                const spVariance = document.getElementById("calcVariance");
                const calcVariance = ((objectArray.reduce(
                    (accumulator, currentValue) => {
                        return accumulator + ((currentValue - projectedHitCount) ** 2)
                    }, initializer
                )) / diceRolled).toFixed(2);
                spVariance.innerText = calcVariance;
                const spStdDev = document.getElementById("stdDev");
                spStdDev.innerText = Math.sqrt(calcVariance).toFixed(2);
            };
            sampleVarianceAndStandardDeviationToBrowser();
        }); // .then(objectArray => {
};