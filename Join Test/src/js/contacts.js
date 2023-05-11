function createRandomRGBColor() {
    let red = getRandomInt(0, 255);
    let green = getRandomInt(0, 255);
    let blue = getRandomInt(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}
  
function getRandomInt (min, max) {
    min = Math.ceil(min); // Runded immer auf und gibt Ganzzahl zurück
    max = Math.floor(max); // Runded immer ab und gibt Ganzzahl zurück
    return Math.floor(Math.random() * (max - min + 1) + min);
}