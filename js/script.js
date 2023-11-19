'use strict';

// Можно добавить loader чтобы нужный цвет успевал загружаться

// data
let defaultColor = 'blue'; // any color from availableColors
let absentColor = 'blue'; // initially made styles for blue color, so this one is not among small images
const availableColors = {
    pink: '#F3D6D1',
    blue: '#CADBEB',
    black: '#B6B6B6',
    green: '#DDEAD9',
    white: '#FAFAFA',
};

// initial styles
document.querySelector(':root').style.setProperty('--color', availableColors[defaultColor]);
const airpodsBig = document.querySelector('.main-screen__images img');
const composition = document.querySelector('.composition__image img');
const smartCase = document.querySelector('.battery__image img');
const colourBody = document.querySelector('.colour__body');
const smallImages = Array.from(colourBody.querySelectorAll('img[alt="airpods"]'));

changeColor();

// events
colourBody.onmousedown = () => false;
colourBody.onclick = function(e) {
    if (e.target.alt !== "airpods") return;

    const src = e.target.getAttribute('src');
    defaultColor = getColor(src);
    document.querySelector(':root').style.setProperty('--color', availableColors[defaultColor]);
    
    changeColor();
}

// functions
function changeColor() {
    [airpodsBig, composition, smartCase].forEach(img => {
        const src = img.getAttribute('src');
        const color = getColor(src);
        const newSrc = src.replace(color, defaultColor);
        img.setAttribute('src', newSrc);
    });

    smallImages.forEach(img => {
        const src = img.getAttribute('src');
        const color = getColor(src);
        if (color !== defaultColor) return;
        const newSrc = src.replace(color, absentColor);
        img.setAttribute('src', newSrc);
        absentColor = defaultColor;
    });
}

function getColor(src) {
    const regex = /\w+(?=\.)/;

    const color = src.match(regex)?.[0];
    if (!availableColors[color]) throw new Error('no such color defined');

    return color;
}