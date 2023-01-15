const aTestRun = function fATestRun(event) {
    //event.preventDefault() to prevent CORS Cross-Origin Resource Sharing error
    event.preventDefault();
    fetch(`http://www.randomnumberapi.com/api/v1.0/random?min=1&max=6&count=${Number(document.getElementById("aDiceCount").value)}`).
        then(result => result.json()).
        then(objectArray => {
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
            const diceRolled = document.getElementById("aDiceCount").value;
            const toHit = document.getElementById("aToHit").value;
            const initializer = 0;
            //test OK 2023 Jan 14
            objectArray.forEach(element => {
                const spDiceRoll = document.createElement("span");
                spDiceRoll.innerText = numberToDiceArray[element-1];
                if (element <= toHit) {
                    spDiceRoll.classList.add("hit");
                } else {
                    spDiceRoll.classList.add("miss");
                }
                aOutput.appendChild(spDiceRoll);
            });
            
            //test OK 2023 Jan 14
            const actualHitCount = document.getElementById("aHitCount");
            actualHitCount.innerText = objectArray.reduce(
                (accumulator, currentValue) => {
                    return accumulator + ((currentValue > toHit) ? 0: 1);
                }, initializer
            );
            const projectedHitCount = diceRolled * toHit / 6;
            const spProjectedHitCount = document.getElementById("avgHitCount");
            spProjectedHitCount.innerText = projectedHitCount.toFixed(2);

            // Test OK 2023 Jan 14
            const spVariance = document.getElementById("calcVariance");
            const calcVariance = ((objectArray.reduce(
                (accumulator, currentValue) => {
                    return accumulator + ((currentValue - projectedHitCount) ** 2)
                }, initializer
            ))/ diceRolled).toFixed(2);
            spVariance.innerText = calcVariance;

            const spStdDev = document.getElementById("stdDev");
            const calcStdDev = Math.sqrt(calcVariance).toFixed(2);
            spStdDev.innerText = calcStdDev;
        });
};