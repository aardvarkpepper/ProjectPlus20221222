/*
Ctrl K, Ctrl F formats

Go through and convert functions to const, with ; at end of function declaration (as it's also a constant assignment)

Unit reference:  Full name except AAArtillery, iComplex, Carrier, BattleshipDmg
use alert(event.target.parentElement) or similar to get error messages for ease
Search for keywords "to fix"

Next priorities: Change format to table, write radio button functionality including table row generation. Create index of current and future organization of files and file functions.

Clean up code.  Write guide to functions and files.  Some of the parts aren't correct for eventual build.

Stick in some url query parameters so people can share links without needing to . . . thingy.
https://www.searchdiscovery.com/blog/url-query-parameters-in-ga/
https://www.semrush.com/blog/url-parameters/

Look into sequential loading (is this already done?) and define order of function use.  Earlier files load first for faster use.

*/

//Test OK 2023 Jan 13
//The array returned from this is the *virtual* OOL used for unknown quantities.
//The virtual OOL is used to construct the actual OOL with real number arguments.
//This is NOT the same as units present.  For example, attacking amphibious OOL does not include naval bombardment units
const returnOperationsArray = function fReturnOperationsArray(username, operationTheaterProfile = "default", operationTheater = "land",  attOrDef = "defend") {
    const controllingPower = "USSR";
    const presetOOLs = {
        default: {
            defend: {
                land: [
                    // destination's index, power, unit, unit count, loop count, OOL priority
                    // -1 means end of commands, or max possible.
                    [1, controllingPower, "Fighter", -1, 0, 5,],
                    [2, controllingPower, "Bomber", -1, 0, 4,],
                    [3, controllingPower, "Tank", -1, 0, 3,],
                    [4, controllingPower, "Artillery", -1, 0, 2,],
                    [5, controllingPower, "Infantry", -1, 0, 1,],
                    [-1, controllingPower, "AAArtillery", -1, 0, 0,],
                ], // land
                sea: [
                    // assumes opponent making non-serious probing attack and no safe landing for Fighters on carriers
                    [1, controllingPower, "Transport", -1, 0, 11,],
                    [2, controllingPower, "Battleship", -1, 0, 10,],
                    // Creates group of 2 Fighter 1 Carrier
                    [3, controllingPower, "Carrier", 1, -1, 9,],
                    [2, controllingPower, "Fighter", 2, -1, 8,],
                    // Creates group of 1 Fighter 1 Carrier
                    [5, controllingPower, "Carrier", 1, 1, 7,],
                    [4, controllingPower, "Fighter", 1, 1, 6,],
                    // Handles remaining Fighters and carriers
                    [7, controllingPower, "Fighter", -1, 0, 5,],
                    [8, controllingPower, "Carrier", -1, 0, 4,],
                    [9, controllingPower, "Cruiser", -1, 0, 3,],
                    [10, controllingPower, "Destroyer", -1, 0, 2,],
                    [11, controllingPower, "Submarine", -1, 0, 1,],
                    [-1, controllingPower, "BattleshipDmg", -1, 0, 0,],
                ],
                amphibious: [
                    [1, controllingPower, "Fighter", -1, 0, 5,], 
                    [2, controllingPower, "Bomber", -1, 0, 4,],
                    [3, controllingPower, "Tank", -1, 0, 3,],
                    [4, controllingPower, "Artillery", -1, 0, 2,],
                    [5, controllingPower, "Infantry", -1, 0, 1,],
                    [-1, controllingPower, "AAArtillery", -1, 0, 0,],
                ],
            }, // defend
            attack: {
                land: [
                    [1, controllingPower, "Bomber", -1, 0, 4,],
                    [2, controllingPower, "Fighter", -1, 0, 3,],
                    [3, controllingPower, "Tank", -1, 0, 2,],
                    [4, controllingPower, "Artillery", -1, 0, 1,],
                    [-1, controllingPower, "Infantry", -1, 0, 0,],
                ], // land
                sea: [
                    // assumes high stakes all in
                    [1, controllingPower, "Battleship", -1, 0, 7,],
                    [2, controllingPower, "Bomber", -1, 0, 6,],
                    [3, controllingPower, "Fighter", -1, 0, 5,],
                    [4, controllingPower, "Cruiser", -1, 0, 4,],
                    [5, controllingPower, "Submarine", -1, 0, 3,],
                    [6, controllingPower, "Destroyer", -1, 0, 2,],
                    [7, controllingPower, "Carrier", -1, 0, 1,],
                    [-1, controllingPower, "BattleshipDmg", -1, 0, 0,],
                ],
                amphibious: [
                    [1, controllingPower, "Bomber", -1, 0, 4,],
                    [2, controllingPower, "Fighter", -1, 0, 3,],
                    [3, controllingPower, "Tank", -1, 0, 2,],
                    [4, controllingPower, "Artillery", -1, 0, 1,],
                    [-1, controllingPower, "Infantry", -1, 0, 0,],
                ],
            }, // attack
        }, // default
        capital: {
            defend: {
                land: [
                    // destination's index, power, unit, unit count, loop count, OOL priority
                    // -1 means end of commands, or max possible.
                    [1, controllingPower, "Fighter", -1, 0, 5,],
                    [2, controllingPower, "Tank", -1, 0, 4,],
                    [3, controllingPower, "Artillery", -1, 0, 3,],
                    [4, controllingPower, "Infantry", -1, 0, 2,],
                    [5, controllingPower, "Bomber", -1, 0, 1,],
                    [-1, controllingPower, "AAArtillery", -1, 0, 0,],
                ], // land
                sea: [
                    // assumes opponent making heavy sub attack and safe landing for Fighters on carriers
                    // but note that conditional could change reserving a Destroyer
                    //such conditionals are evaluated elsewhere
                    [1, controllingPower, "Transport", -1, 0, 8,],
                    [2, controllingPower, "Battleship", -1, 0, 7,],
                    [3, controllingPower, "Fighter", -1, 0, 6,],
                    [4, controllingPower, "Destroyer", 1, 0, 5,],
                    [5, controllingPower, "Cruiser", -1, 0, 4,],
                    [6, controllingPower, "Carrier", -1, 0, 3,],
                    [7, controllingPower, "Destroyer", -1, 0, 2,],
                    [8, controllingPower, "Submarine", -1, 0, 1,],
                    [-1, controllingPower, "BattleshipDmg", -1, 0, 0,],
                ],
                amphibious: [
                    [1, controllingPower, "Fighter", -1, 0, 5,],
                    [2, controllingPower, "Tank", -1, 0, 4,],
                    [3, controllingPower, "Artillery", -1, 0, 3,],
                    [4, controllingPower, "Infantry", -1, 0, 2,],
                    [5, controllingPower, "Bomber", -1, 0, 1,],
                    [-1, controllingPower, "AAArtillery", -1, 0, 0,],
                ],
            }, // defend
            attack: {
                land: [
                    [1, controllingPower, "Tank", 1, 0, 5,],
                    [2, controllingPower, "Bomber", -1, 0, 4,],
                    [3, controllingPower, "Fighter", -1, 0, 3,],
                    [4, controllingPower, "Tank", -1, 0, 2,],
                    [5, controllingPower, "Artillery", -1, 0, 1,],
                    [-1, controllingPower, "Infantry", -1, 0, 0,],
                ], // land
                sea: [
                    // assumes high stakes all in
                    [1, controllingPower, "Battleship", -1, 0, 7,],
                    [2, controllingPower, "Bomber", -1, 0, 6,],
                    [3, controllingPower, "Fighter", -1, 0, 5,],
                    [4, controllingPower, "Cruiser", -1, 0, 4,],
                    [5, controllingPower, "Submarine", -1, 0, 3,],
                    [6, controllingPower, "Destroyer", -1, 0, 2,],
                    [7, controllingPower, "Carrier", -1, 0, 1,],
                    [-1, controllingPower, "BattleshipDmg", -1, 0, 0,],
                ],
                amphibious: [
                    [1, controllingPower, "Tank", 1, 0, 5,],
                    [2, controllingPower, "Bomber", -1, 0, 4,],
                    [3, controllingPower, "Fighter", -1, 0, 3,],
                    [4, controllingPower, "Tank", -1, 0, 2,],
                    [5, controllingPower, "Artillery", -1, 0, 1,],
                    [-1, controllingPower, "Infantry", -1, 0, 0,],
                ],
            }, // attack
        }, //  capital
    };
    return presetOOLs[operationTheaterProfile][attOrDef][operationTheater];
};

//Function adds addEventListener functionality to radio buttons.  Function called.
const initializeHTML = function fInitializeHTML() {
    const operationLabels = document.querySelectorAll(".operationSelect label");
    operationLabels.forEach((operationLabel) => {
        operationLabel.addEventListener("click", () => {
            //console.log(document.querySelector("input[name='operationDomain']:checked").value);
            const documentList = document.getElementById("list");
            documentList.innerHTML = "";
            const currentOperation = document.querySelector("input[name='operationDomain']:checked").value;
            const currentUser = document.querySelector("#currentUser").innerText;
            const currentOpsArray = returnOperationsArray(currentUser, "default", currentOperation, "defend");
            generateRows(currentOpsArray);
        });
    });
};
initializeHTML();

//Fix this up later.  Sea Land Etc
// This pulls in the string argument from the button, and the object with the string key to array value
// that return is generated from an object return.  Or better yet, it pulls in the string then calls the object um yeah
// with destructuring or something kewl

// I want to return an object with {land: array, etc.}  If an argument is supplied, then overwrite, otherwise use default.
//The argument checks another function's "preferences" set.  It doesn't need to be persistent since it's only called once?
//User login, save preferences, how to load?  Could pseudo with id and id check to prevent filters and hidden.

//To Do:  Re-order elements in arguments, make consistent with data structure.

const generateRow = function fGenerateRow(destinationIndex, controllingPower, unit, unitCount, loopCount, oolPriority) {
    const divList = document.getElementById("list");
    const divRow = document.createElement("div");
    divRow.classList.add("draggable");
    divRow.classList.add(unit);
    divRow.addEventListener('mousedown', mouseDownHandler);

    //Adds btDelete
    const btDelete = document.createElement("button");
    btDelete.classList.add("pressable");
    // https://www.htmlsymbols.xyz/unicode/U+2715 creates "x" symbol
    btDelete.innerText = "\u2715";
    btDelete.onclick = deleteRow;
    // btDelete.style.marginRight = "2px";
    divRow.appendChild(btDelete);

    //Adds btAddDuplicate
    const btAddDuplicate = document.createElement("button");
    btAddDuplicate.classList.add("pressable");
    btAddDuplicate.innerText = "+";
    btAddDuplicate.onclick = splitRow;
    // btAddDuplicate.style.marginRight = "2px";
    divRow.appendChild(btAddDuplicate);

    //Adds btCycleFlag
    const btCycleFlag = document.createElement("button");
    btCycleFlag.classList.add("pressable");
    btCycleFlag.classList.add("flagButton");
    btCycleFlag.innerText = controllingPower;
    btCycleFlag.style.width = "45px";
    btCycleFlag.onclick = cycleFlag;
    btCycleFlag.style.marginRight = "2px";
    divRow.appendChild(btCycleFlag);

    //Adds spTextUnitType
    const spTextUnitType = document.createElement("span");
    spTextUnitType.classList.add("unitSpan");
    spTextUnitType.innerText = unit;
    divRow.appendChild(spTextUnitType);

    //Adds spTUTPunctuation
    const spTUTPunctuation = document.createElement("span");
    spTUTPunctuation.innerText = ":"
    spTUTPunctuation.style.marginRight = "2px";
    divRow.appendChild(spTUTPunctuation);

    //Adds inUnitCount
    const inUnitCount = document.createElement("input");
    inUnitCount.type = "text";
    inUnitCount.size = "2";
    inUnitCount.value = unitCount;
    // add onClick select all
    inUnitCount.style.marginRight = "2px";
    divRow.appendChild(inUnitCount);
  
    //Adds spOOLReferenceData
    const spOOLReferenceData = document.createElement("span");
    spOOLReferenceData.classList.add("oolReferenceData");
    //to fix:  deleting then adding elements may result in duplicate numbered entries.  Reassign on drag and drop.
    spOOLReferenceData.innerText = `#${document.querySelectorAll("#list .draggable").length+1}\uD83E\uDC1E`;
    spOOLReferenceData.style.marginRight = "2px";
    divRow.appendChild(spOOLReferenceData);

    //Adds inReferenceDestinationData
    // Detect infinite loops?
    const inReferenceDestinationData = document.createElement("input");
    inReferenceDestinationData.type = "text";
    inReferenceDestinationData.size = "2";
    inReferenceDestinationData.value = destinationIndex;
    inReferenceDestinationData.style.marginRight = "2px";
    divRow.appendChild(inReferenceDestinationData);

    //Adds spLIDSymbols
    const spLIDSymbols = document.createElement("span");
    spLIDSymbols.classList.add("spLIDSymbols");
    spLIDSymbols.innerText = "#\u21BA:\u00A0";
    divRow.appendChild(spLIDSymbols);
    
  
    //Adds inLoopInputData
    const inLoopInputData = document.createElement("input");
    inLoopInputData.type = "text";
    inLoopInputData.size = "2";
    inLoopInputData.value = loopCount;
    inLoopInputData.style.marginRight = "2px";
    divRow.appendChild(inLoopInputData);

    //Adds spLabelPriorityNumber
    const spLabelPriorityNumber = document.createElement("span");
    spLabelPriorityNumber.innerText = "OOL Priority:";
    divRow.appendChild(spLabelPriorityNumber);

    //Adds inPriorityNumber
    // add mass clear button?
    const inPriorityNumber = document.createElement("input");
    inPriorityNumber.type = "text";
    inPriorityNumber.size = "2";
    inPriorityNumber.value = oolPriority;
    divRow.appendChild(inPriorityNumber);

    // Adds divRow to end of div list
    divList.appendChild(divRow);
};
//returnOperationsArray(username, operationTheaterProfile = "default", operationTheater = "land",  attOrDef = "defend")

const generateRows = function fGenerateRows(rowArrayArray) {
    rowArrayArray.forEach(element => {
        const [destinationIndex, controllingPower, unit, unitCount, loopCount, oolPriority] = element;
        generateRow(destinationIndex, controllingPower, unit, unitCount, loopCount, oolPriority)
    });
};






const deleteRow = function fDeleteRow(event) {
    event.target.parentElement.remove();
};

const splitRow = function fSplitRow(event) {
    const divList = document.getElementById("list");
    const divRow = document.createElement("div");
    divRow.classList.add("draggable");
    divRow.classList.add(event.target.parentElement.querySelector(".unitSpan").innerText);
    divRow.addEventListener('mousedown', mouseDownHandler);

    //Adds btDelete
    const btDelete = document.createElement("button");
    btDelete.classList.add("pressable");
    // https://www.htmlsymbols.xyz/unicode/U+2715 creates "x" symbol
    btDelete.innerText = "\u2715";
    btDelete.onclick = deleteRow;
    // btDelete.style.marginRight = "2px";
    divRow.appendChild(btDelete);

    //Adds btAddDuplicate
    const btAddDuplicate = document.createElement("button");
    btAddDuplicate.classList.add("pressable");
    btAddDuplicate.innerText = "+";
    btAddDuplicate.onclick = splitRow;
    // btAddDuplicate.style.marginRight = "2px";
    divRow.appendChild(btAddDuplicate);

    //Adds btCycleFlag
    const btCycleFlag = document.createElement("button");
    btCycleFlag.classList.add("pressable");
    btCycleFlag.classList.add("flagButton");
    btCycleFlag.innerText = event.target.parentElement.querySelector(".flagButton").innerText;
    btCycleFlag.style.width = "45px";
    btCycleFlag.onclick = cycleFlag;
    btCycleFlag.style.marginRight = "2px";
    divRow.appendChild(btCycleFlag);

    //Adds spTextUnitType
    const spTextUnitType = document.createElement("span");
    spTextUnitType.classList.add("unitSpan");
    spTextUnitType.innerText = event.target.parentElement.querySelector(".unitSpan").innerText;
    divRow.appendChild(spTextUnitType);

    //Adds spTUTPunctuation
    const spTUTPunctuation = document.createElement("span");
    spTUTPunctuation.innerText = ":"
    spTUTPunctuation.style.marginRight = "2px";
    divRow.appendChild(spTUTPunctuation);

    //Adds inUnitCount
    const inUnitCount = document.createElement("input");
    inUnitCount.type = "text";
    inUnitCount.size = "2";
    inUnitCount.value = "alpha";
    inUnitCount.style.marginRight = "2px";
    divRow.appendChild(inUnitCount);
  
    //Adds spOOLReferenceData
    const spOOLReferenceData = document.createElement("span");
    spOOLReferenceData.classList.add("oolReferenceData");
    //to fix:  deleting then adding elements may result in duplicate numbered entries.  Reassign on drag and drop.
    spOOLReferenceData.innerText = `#${document.querySelectorAll("#list .draggable").length+1}\uD83E\uDC1E`;
    spOOLReferenceData.style.marginRight = "2px";
    divRow.appendChild(spOOLReferenceData);

    //Adds inReferenceDestinationData
    // Detect infinite loops?
    const inReferenceDestinationData = document.createElement("input");
    inReferenceDestinationData.type = "text";
    inReferenceDestinationData.size = "2";
    inReferenceDestinationData.value = "bravo";
    inReferenceDestinationData.style.marginRight = "2px";
    divRow.appendChild(inReferenceDestinationData);

    //Adds spLIDSymbols
    const spLIDSymbols = document.createElement("span");
    spLIDSymbols.classList.add("spLIDSymbols");
    spLIDSymbols.innerText = "#\u21BA:\u00A0";
    divRow.appendChild(spLIDSymbols);
    
  
    //Adds inLoopInputData
    const inLoopInputData = document.createElement("input");
    inLoopInputData.type = "text";
    inLoopInputData.size = "2";
    inLoopInputData.value = "chinchilla";
    inLoopInputData.style.marginRight = "2px";
    divRow.appendChild(inLoopInputData);

    //Adds spLabelPriorityNumber
    const spLabelPriorityNumber = document.createElement("span");
    spLabelPriorityNumber.innerText = "OOL Priority:";
    divRow.appendChild(spLabelPriorityNumber);

    //Adds inPriorityNumber
    // add mass clear button?
    const inPriorityNumber = document.createElement("input");
    inPriorityNumber.type = "text";
    inPriorityNumber.size = "2";
    inPriorityNumber.value = "dog";
    divRow.appendChild(inPriorityNumber);

    // Adds divRow to end of div list
    divList.appendChild(divRow);
};

const cycleFlag = function fCycleFlag(event) {
    let currentCountry = event.target.innerText;
    switch (currentCountry) {
        case "USSR":
            event.target.innerText = "Ger";
            break;
        case "Ger":
            event.target.innerText = "UK";
            break;
        case "UK":
            event.target.innerText = "Jap";
            break;
        case "Jap":
            event.target.innerText = "US";
            break;
        case "US":
            event.target.innerText = "USSR";
            break;
        default:
    }
    event.target.style.width = "45px";
};
// it is assumed there is only one table, and one command number per row
const newReferenceNumber = function fNewReferenceNumber() {
    const tableRows = document.querySelectorAll("tr");
    return tableRows.length + 1;
};

//Call must be after definition.  Hoisting with const . . . function does not help.
generateRows(returnOperationsArray((document.querySelector("#currentUser").innerText), "default", document.querySelector("input[name='operationDomain']:checked").value, "defend"));