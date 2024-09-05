var origin_tetris_array: number[][][][] | undefined = undefined;
function get_origin_tetris_array(block: any) {
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
function random_block():
    | {
          tetris_array: number[][][];
          randomDirectionFunc: () => number[][] | undefined;
      }
    | undefined {
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
function getContainer(container_parameter: HTMLElement): boolean {
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
var containerWidth: string = '';
function getPointerIndex(): number | undefined {
    try {
        if (!pointerIndex) throw new Error('pointerIndex值为undefined');
        return pointerIndex;
    } catch (e: any) {
        console.error(e.message);
        return undefined;
    }
}
function defaultPointerIndex() {
    try {
        //匹配数字
        let tempRegexp = /\d+/;
        let columns = container?.style
            .getPropertyValue('grid-template-columns')
            .match(tempRegexp);
        for (let i of columns as Array<string>) {
            containerWidth += i;
        }
        pointerIndex = Math.floor(parseInt(containerWidth) / 2);
        if (!pointerIndex)
            throw new Error('pointerIndex在进行默认设置时为undefined');
        return true;
    } catch (e: any) {
        console.error(e.message);
        return false;
    }
}
//根据光标的位置以及一个number[][]来设置background-color
//利用map.ts创建好的容器
import { divMessage } from './map';
let drawTest: object;
function draw(
    tetris: number[][],
    pointer: number,
    getDiv: (id: number) => divMessage | undefined
):{yes_setBackgroundColor:boolean,clear:()=>boolean} {
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
            //检测占用并设置占用
            if (pointerDiv.occupy != 0)
                throw new Error(`pointer的id:${pointerDiv.id}位置已被占用`);
            else pointerDiv.occupy = 1;
            pointerDiv.Element?.style.setProperty('background-color', color);
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
        } catch (e:any) {
            console.error(e.message);
            return false;
        }
    }
    try {
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
        return {setBackgroundColor(randomColor()),clear}
    } catch (e: any) {
        console.error(e);
        return false;
    }
}

const testObject = {
    get_origin_tetris_array,
    getContainer,
    defaultPointerIndex,
    random_block,
    draw,
    getPointerIndex,
    testText() {
        console.log('pointerIndex:', pointerIndex);
        console.log('origin_tetris_array:', origin_tetris_array);
        console.log('drawTest', drawTest);
    },
};
export default testObject;
