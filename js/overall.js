function getRandomColor() {
    let r = Math.floor(Math.random() * 128) + 128;
    let g = Math.floor(Math.random() * 128) + 128;
    let b = Math.floor(Math.random() * 128) + 128;
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
}
function setTagsColor() {
    const tagsVector = document.querySelectorAll('tag');
    tagsVector.forEach (tag => {
        tag.style.backgroundColor = getRandomColor();
    });
}
function init() {
    setTagsColor();
}