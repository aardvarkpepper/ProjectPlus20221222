//Final.  Cat picture API.
//Tested 2023 Jan 14.
fetch(`https://api.thecatapi.com/v1/images/search`).
then(result => {
    return result.json();
}).
then(objectArray => {
    const pImg = document.getElementById("catpic");
    const catImg = document.createElement("img");
    catImg.src = objectArray[0].url;
    catImg.alt = "A random picture of a cat.";
    const catBreak = document.createElement("br");
    const catSourceCaption = document.createElement("span");
    catSourceCaption.innerText = "Picture courtesy of ";
    const catSourceLink = document.createElement("a");
    catSourceLink.href = "https://thecatapi.com/";
    catSourceLink.innerText = "The Cat API - Cats as a Service.";
    pImg.append(catImg, catBreak, catSourceCaption, catSourceLink);
});