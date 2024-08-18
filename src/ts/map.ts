interface divMessage {
    type: string;
    id: number;
    Element?: HTMLElement;
    //是否被占有
    occupy: 0 | 1;
}
export var map: Array<Array<divMessage>>;
function initMap(x: number, y: number): boolean {
    map = new Array(x);
    try {
        for (let i = 0; i < x; i++) {
            map[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                map[i][j] = { type: 'null', id: j + 1 + i * y, occupy: 0 };
            }
        }
    } catch (e) {
        console.log(e);
    }
    return true;
}
//获取容器
var pack: HTMLElement;
export function setContainer(containerData: HTMLElement): boolean {
    pack = containerData;
    if (!pack) return false;
    return true;
}

export function setMap(
    xSize: number,
    ySize: number,
    container: HTMLElement = pack
): boolean {
    if (!container || xSize <= 0 || ySize <= 0) return false;

    try {
        initMap(xSize, ySize);
        {
            container.style.setProperty('display', 'grid');
            container.style.setProperty('gap', '0');
            container.style.setProperty(
                'grid-template-rows',
                `repeat(${xSize}, 1fr)`
            );
            container.style.setProperty(
                'grid-template-columns',
                `repeat(${ySize}, 1fr)`
            );
        }
        {
            let containerX = container.clientWidth;
            let containerY = container.clientHeight;
            var divSize;
            if (containerX > containerY) {
                divSize = containerY / ySize;
            } else {
                divSize = containerX / xSize;
            }
        }
        for (let i = 0; i < xSize; i++) {
            for (let j = 0; j < ySize; j++) {
                let div = document.createElement('div');
                map[i][j].Element = div;
                div.id = map[i][j].id.toString();
                container.appendChild(div);
            }
        }
    } catch (e) {
        console.error(e);
    }
    return true;
}
export function getDiv(id: number): HTMLElement | null {
    if (!pack) return null;
    try {
        var value = pack.children[id - 1];
        if (value) return value as HTMLElement;
    } catch (e) {
        console.error(e);
    }
    console.log('1');
    return null;
}
