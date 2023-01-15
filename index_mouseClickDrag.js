
// https://htmldom.dev/drag-and-drop-element-in-a-list/
// The current dragging item.  I leave off encapsulation for simplicity, and memory use is low.
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
