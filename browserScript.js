/*
Unit reference:  Full name except AAArtillery, IComplex, Carrier (html class names all lowercase)
use alert(event.target.parentElement) or similar to get error messages for ease
Search for keywords "to fix"
*/

function deleteRow(event) {
    event.target.parentElement.remove();

}
function splitRow(event) {
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

    //Adds inPriorityNumber
    // add mass clear button?
    const inPriorityNumber = document.createElement("input");
    inPriorityNumber.type = "text";
    inPriorityNumber.size = "2";
    inPriorityNumber.value = "dog";
    divRow.appendChild(inPriorityNumber);

    // Adds divRow to end of div list
    divList.appendChild(divRow);
}

function cycleFlag(event) {
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
}
// it is assumed there is only one table, and one command number per row
function newReferenceNumber() {
    const tableRows = document.querySelectorAll("tr");
    return tableRows.length + 1;
}



// https://htmldom.dev/drag-and-drop-element-in-a-list/
// The current dragging item
let draggingEle;

// The current position of mouse relative to the dragging element
let x = 0;
let y = 0;

const mouseDownHandler = function (e) {
    //    draggingEle = e.target; // stack overflow suggestion that I change to e.currentTarget
    draggingEle = e.currentTarget;

    // Calculate the mouse position
    const rect = draggingEle.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    // Set position for dragging element
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = `${e.pageY - y}px`;
    draggingEle.style.left = `${e.pageX - x}px`;

    const draggingRect = draggingEle.getBoundingClientRect();

    if (!isDraggingStarted) {
        // Update the flag
        isDraggingStarted = true;

        // Let the placeholder take the height of dragging element
        // So the next element won't move up
        placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');
        draggingEle.parentNode.insertBefore(
            placeholder,
            draggingEle.nextSibling
        );

        // Set the placeholder's height
        placeholder.style.height = `${draggingRect.height}px`;
    }

    // The current order:
    // prevEle
    // draggingEle
    // placeholder
    // nextEle
    const prevEle = draggingEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;
    // User moves item to the top
    if (prevEle && isAbove(draggingEle, prevEle)) {
        // The current order    -> The new order
        // prevEle              -> placeholder
        // draggingEle          -> draggingEle
        // placeholder          -> prevEle
        swap(placeholder, draggingEle);
        swap(placeholder, prevEle);
        return;
    }
    // User moves the dragging element to the bottom
    if (nextEle && isAbove(nextEle, draggingEle)) {
        // The current order    -> The new order
        // draggingEle          -> nextEle
        // placeholder          -> placeholder
        // nextEle              -> draggingEle
        swap(nextEle, placeholder);
        swap(nextEle, draggingEle);
    }
};

const mouseUpHandler = function () {
    // Remove the position styles
    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');

    x = null;
    y = null;
    draggingEle = null;

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    // Remove the placeholder
    // testing declaring and assigning placeholder by QuerySelector
    let placeholder = document.querySelector(".placeholder");
    placeholder && placeholder.parentNode.removeChild(placeholder);
    // Reset the flag
    isDraggingStarted = false;
};

// Query the list element
const list = document.getElementById('list');

// Query all items
[].slice.call(list.querySelectorAll('.draggable')).forEach(function (item) {
    item.addEventListener('mousedown', mouseDownHandler);
});

let placeholder;
let isDraggingStarted = false;

const isAbove = function (nodeA, nodeB) {
    // Get the bounding rectangle of nodes
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
};

/*
            <label>
                Land
                <input id = "to-c" name="tempconverter" type="radio" value="celsius" checked="checked"/>
            </label>
            <label>
                Sea
                <input id = "to-f" name="tempconverter" type="radio" value="fahrenheit" />
            </label>
            <label>
                Amphibious
                <input id = "to-f" name="tempconverter" type="radio" value="fahrenheit" />
            </label>
            <input type = "submit" value = "Submit" />
*/
document.querySelector(".aside form").addEventListener("submit", (event) => {
    event.preventDefault();
    const tempInput = event.target.parentElement.querySelector("#temp-to-convert").value;
    const radioButton = event.target.parentElement.querySelector("input[name='tempconverter']:checked").value;
    if (radioButton === "celsius") {
        event.target.parentElement.querySelector("h4").innerText = ((tempInput - 32) * 5 / 9).toFixed(2);
    } else if (radioButton === "fahrenheit") {
        event.target.parentElement.querySelector("h4").innerText = ((tempInput * 9 / 5) + 32).toFixed(2);
    }
});
