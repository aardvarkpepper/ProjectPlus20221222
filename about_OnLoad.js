//Tested 2023 Jan 14.  Commented text to prevent unneeded calls (only 10,000 a month); uncomment before submission.
fetch(`https://api.thecatapi.com/v1/images/search`).
then(result => {
    console.log(result);
    return result.json();
}).
then(objectArray => {
    console.log(objectArray);
    const pImg = document.getElementById("catpic");
    const catImg = document.createElement("img");
    catImg.src = objectArray[0].url;
    catImg.alt = "A random picture of a cat."
    const catBreak = document.createElement("br");
    const catSourceCaption = document.createElement("span");
    catSourceCaption.innerText = "Picture courtesy of ";
    const catSourceLink = document.createElement("a");
    catSourceLink.href = "https://thecatapi.com/";
    catSourceLink.innerText = "The Cat API - Cats as a Service.";
    pImg.append(catImg, catBreak, catSourceCaption, catSourceLink);
});