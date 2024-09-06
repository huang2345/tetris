var origin_tetris_array: number[][][][] | undefined = undefined;
export function get_origin_tetris_array(block: any) {
    try {
        if (!(block instanceof Object))
            throw new Error('block不是Object，参数错误');
        if (block.data == undefined) throw new Error('block.data未定义');
        origin_tetris_array = block.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}
export interface block {
    tetris_array: number[][][];
    randomDirectionFunc: () => number[][] | undefined;
}
function random_block(): block | undefined {
    let random_block_number: number;
    //设置方块初始随机方向
    function random_block_direction(): number[][] | undefined {
        try {
            if (origin_tetris_array == undefined)
                throw new Error('未获取到origin_tetris_array');
            let random_direction_index = Math.floor(
                Math.random() * origin_tetris_array[random_block_number].length
            );
            if (
                random_direction_index ==
                origin_tetris_array[random_block_number].length
            )
                return random_block_direction();
            return origin_tetris_array[random_block_number][
                random_direction_index
            ];
        } catch (e: any) {
            console.error(e.message);
        }
    }
    try {
        if (origin_tetris_array == undefined)
            throw new Error('未获取到origin_tetris_array');
        random_block_number = Math.floor(
            Math.random() * origin_tetris_array.length
        );
        if (random_block_number == origin_tetris_array.length)
            return random_block();
        let returnValue = {
            tetris_array: origin_tetris_array[random_block_number],
            randomDirectionFunc: random_block_direction,
        };
        return returnValue;
    } catch (e: any) {
        console.error(e.message);
    }
}
var container: HTMLElement | undefined = undefined;
export function getContainer(container_parameter: HTMLElement): boolean {
    try {
        if (container_parameter == undefined) throw new Error('参数错误');
        if (!(container_parameter instanceof HTMLElement))
            throw new Error('参数错误');
        container = container_parameter;
    } catch (e: any) {
        console.error(e.message);
        return false;
    }
    return true;
}
var pointerIndex: number | undefined = undefined;
//当pointer类new时，进行默认设置
export var containerWidth: string = '';
class pointer {
    #pointerIndex: number | undefined = undefined;
    constructor() {
        try {
            //匹配数字
            let tempRegexp = /\d+/;
            let columns = container?.style
                .getPropertyValue('grid-template-columns')
                .match(tempRegexp);
            for (let i of columns!) {
                containerWidth += i;
            }
            this.setPointerIndex(Math.floor(parseInt(containerWidth) / 2));
            if (!this.getPointerIndex())
                throw new Error('pointerIndex在进行默认设置时为undefined');
        } catch (e: any) {
            console.error(e.message);
        }
    }
    getPointerIndex(): number | undefined {
        try {
            if (!this.#pointerIndex)
                throw new Error('pointerIndex值为undefined');
            return this.#pointerIndex;
        } catch (e: any) {
            console.error(e.message);
            return undefined;
        }
    }
    setPointerIndex(index: number) {
        try {
            if (index < 0) throw new Error('index不能小于0');
            if (index > parseInt(containerWidth) * parseInt(containerWidth)) {
                throw new Error('index不能大于map设置的容器大小');
            }
            this.#pointerIndex = index;
        } catch (e: any) {
            console.error(e.message);
        }
    }
}
//根据光标的位置以及一个number[][]来设置background-color
//利用map.ts创建好的容器
import { divMessage } from './map';
export interface draw_returnValue {
    yes_setBackgroundColor: boolean;
    clear: () => boolean;
}
let drawTest: object;
function draw(
    tetris: number[][] | undefined,
    pointer: number | undefined,
    getDiv: (id: number) => divMessage | undefined
): draw_returnValue {
    function randomColor() {
        function random_256(): number {
            let returnValue = Math.floor(Math.random() * 256);
            if (returnValue == 256) return random_256();
            return returnValue;
        }
        return (
            'rgb(' +
            random_256().toString() +
            ',' +
            random_256().toString() +
            ',' +
            random_256().toString() +
            ')'
        );
    }
    //如果多次都返回false，则认为已经没有顶部空间供游戏生成新的随机方块
    function setBackgroundColor(color: string): boolean {
        try {
            if (!pointerDiv) throw new Error('pointerDiv为undefined');
            if (!tetris) throw new Error('tetris为undefined');
            //检测占用并设置占用
            if (tetris[0][0] == 1) {
                if (pointerDiv.occupy != 0)
                    throw new Error(`pointer的id:${pointerDiv.id}位置已被占用`);
                else pointerDiv.occupy = 1;
                pointerDiv.Element?.style.setProperty(
                    'background-color',
                    color
                );
            }
            for (let i of otherDivs) {
                if (i.occupy != 0)
                    throw new Error(`other矩阵的该id:${i.id}位置已被占用`);
                else i.occupy = 1;
                i.Element?.style.setProperty('background-color', color);
            }
            return true;
        } catch (e: any) {
            console.error(e.message);
            return false;
        }
    }
    function clear(): boolean {
        try {
            if (!pointerDiv) throw new Error('pointerDiv为undefined');
            if (pointerDiv.occupy != 1)
                throw new Error(
                    `pointer的id:${pointerDiv.id}位置未被占用，无法清除`
                );
            else pointerDiv.occupy = 0;
            pointerDiv.Element?.style.setProperty(
                'background-color',
                'rgb(255,255,255)'
            );
            for (let i of otherDivs) {
                if (i.occupy != 1)
                    throw new Error(
                        `other矩阵的该id:${i.id}位置未被占用，无法清除`
                    );
                else i.occupy = 0;
                i.Element?.style.setProperty(
                    'background-color',
                    'rgb(255,255,255)'
                );
            }
            return true;
        } catch (e: any) {
            console.error(e.message);
            return false;
        }
    }
    try {
        if (!pointer) throw new Error('pointer为undefined');
        if (!tetris) throw new Error('tetris为undefined');
        var pointerDiv = getDiv(pointer);
        var otherDivs: divMessage[] = [];
        //获取二维矩阵对应的盒子
        for (let i = 0; i < tetris.length; i++) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] == 1) {
                    let id: number = pointer + i * parseInt(containerWidth) + j;
                    let otherDiv = getDiv(id);
                    if (!otherDiv)
                        throw new Error('draw函数在获取otherDivs时失败');
                    otherDivs.push(otherDiv);
                }
            }
        }
        //去重
        otherDivs = otherDivs.filter((value) => {
            if (value === pointerDiv) return false;
            return true;
        });

        drawTest = { pointerDiv, otherDivs };
        let yes_setBackgroundColor = setBackgroundColor(randomColor());
        return { yes_setBackgroundColor, clear };
    } catch (e: any) {
        console.error(e);
        return { yes_setBackgroundColor: false, clear };
    }
}

const defaultObject = {
    random_block,
    draw,
    pointer,
    testText() {
        console.log('pointerIndex:', pointerIndex);
        console.log('origin_tetris_array:', origin_tetris_array);
        console.log('drawTest', drawTest);
    },
};

export default defaultObject;
