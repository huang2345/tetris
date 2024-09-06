export interface divMessage {
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
//获取Map容器
var Mapcontainer: HTMLElement;
export function setContainer(containerData: HTMLElement): boolean {
    Mapcontainer = containerData;
    if (!Mapcontainer) return false;
    return true;
}

export function setMap(
    xSize: number,
    ySize: number,
    container: HTMLElement = Mapcontainer
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
export function getDiv(id: number): divMessage | undefined {
    try {
        if (!map) throw new Error('map未初始化');
        //为什么id-1，是因为部分id的j==0,所以需要这里id-1，j才可以-1
        //除此之外id-1还可以起到规避由于数组起始位为0，导致返回值的id多1的效果
        let i = Math.floor((id - 1) / map.length);
        let j;
        if (i == 0) j = id - 1;
        else j = id - 1 - i * map.length;
        let value = map[i][j];

        if (value.id != id) throw new Error('getDiv的返回值id与参数id不一致');
        if (!value) {
            console.log(i, j);
            throw new Error('getDiv获取失败！');
        }
        return value;
    } catch (e) {
        console.error(e);
    }
}
