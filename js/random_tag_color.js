function getRandomColor() {
    let r = Math.floor(Math.random() * 128) + 128;
    let g = Math.floor(Math.random() * 128) + 128;
    let b = Math.floor(Math.random() * 128) + 128;
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
}
const tags = document.querySelectorAll('tag');
tags.forEach(tag => {
    tag.style.backgroundColor = getRandomColor();
});