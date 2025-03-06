function randomColor() {
    let r = Math.floor(Math.random() * 128) + 128;
    let g = Math.floor(Math.random() * 128) + 128;
    let b = Math.floor(Math.random() * 128) + 128;
    let a = Math.random() * 0.2 + 0.5;
    return `rgba(${r}, ${g}, ${b}, ${a}`;
}
function randomSnowflakeColor() {
    let rg = Math.floor(Math.random() * 32) + 224;
    let a = Math.random() * 0.3 + 0.3;
    return `rgba(${rg}, ${rg}, 255, ${a})`;
}
function totalHeight() {
    let result = 0;
    const divVector = document.querySelectorAll('.box, .border');
    divVector.forEach(div => {
        result += div.clientHeight;
    });
    return result;
}
function snowFall() {
    const snowVector = document.querySelector('.snow');
    const snowflakes = [];
    const snowCreate = setInterval(() => {
        const borderWidth = document.body.clientWidth;
        const snowflakeSize = Math.random() * 10 + 5;
        let snowflake = {
            element: document.createElement('snowflake'),
            size: snowflakeSize,
            position: {
                left: Math.random() * (borderWidth - snowflakeSize),
                top: snowflakeSize * -1
            },
            speedHorizontal: 0,
            speedVertical: snowflakeSize / 7
        };
        snowflake.element.style.width = `${snowflake.size}px`;
        snowflake.element.style.height = `${snowflake.size}px`;
        snowflake.element.style.left = `${snowflake.position.left}px`;
        snowflake.element.style.top = `${snowflake.position.top}px`;
        snowflake.element.style.backgroundColor = randomSnowflakeColor();
        snowVector.appendChild(snowflake.element);
        snowflakes.push(snowflake);
    }, 200);
    const snowFalling = setInterval(() => {
        const borderWidth = document.body.clientWidth;
        const borderHeight = totalHeight();
        snowflakes.forEach(snowflake => {
            const accelerationHorizontal = (Math.random() * 2 - 1) * borderWidth / 100000;
            const accelerationVertical = 0;
            snowflake.speedHorizontal += accelerationHorizontal;
            snowflake.speedVertical += accelerationVertical;
            snowflake.position.left += snowflake.speedHorizontal;
            snowflake.position.top += snowflake.speedVertical;
            const currentLeft = snowflake.position.left;
            const currentTop = snowflake.position.top;
            if (currentLeft > 0 && currentLeft < borderWidth - snowflake.size && currentTop < borderHeight - snowflake.size) {
                snowflake.element.style.left = `${currentLeft}px`;
                snowflake.element.style.top = `${currentTop}px`;
            } else {
                snowflake.element.remove();
                const index = snowflakes.indexOf(snowflake);
                if (index > -1) {
                    snowflakes.splice(index, 1);
                }
            }
        });
    }, 20);
    window.addEventListener('beforeunload', () => {
        clearInterval(snowCreate);
        clearInterval(snowFalling);
    });
}
function tagsColor() {
    const tagsVector = document.querySelectorAll('tag');
    tagsVector.forEach (tag => {
        tag.style.backgroundColor = randomColor();
    });
}
function init() {
    snowFall();
    tagsColor();
}
