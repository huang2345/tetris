export var map;
function initMap(x, y) {
    map = new Array(x);
    try {
        for (let i = 0; i < x; i++) {
            map[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                map[i][j] = { type: 'null', id: (i + 1) * i + j };
            }
        }
    }
    catch (e) {
        console.log(e);
    }
    return true;
}
function setMap(container, xSize, ySize) {
    if (!container || xSize <= 0 || ySize <= 0)
        return false;
    try {
        let containerCSS = `
    display: grid;
    grid-template-columns: repeat(${ySize}, 1fr);
    grid-template-rows: repeat(${xSize},1fr);
    gap: 0;
    width: 100%;
    height: 100%`;
        container.style.cssText = containerCSS;
        {
            let containerX = container.clientWidth;
            let containerY = container.clientHeight;
            var divSize;
            if (containerX > containerY) {
                divSize = containerY / ySize;
            }
            else {
                divSize = containerX / xSize;
            }
        }
        for (let i = 0; i < xSize; i++) {
            for (let j = 0; j < ySize; j++) {
                let div = document.createElement('div');
                div.style.setProperty('width', `${divSize}px`);
                div.style.setProperty('height', `${divSize}px`);
                container.appendChild(div);
            }
        }
    }
    catch (e) {
        console.error(e);
    }
    return true;
}
