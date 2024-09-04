var origin_tetris_array: Array<number>[][][][] | undefined = undefined;
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
function random_block() {
    try {
        if (origin_tetris_array == undefined)
            throw new Error('未获取到origin_tetris_array');
        let random_block_number = Math.floor(
            Math.random() * origin_tetris_array.length
        );
        let random_direction_number = Math.floor(
            Math.random() * origin_tetris_array[random_block_number].length
        );
        if (
            random_block_number == origin_tetris_array.length ||
            random_direction_number ==
                origin_tetris_array[random_block_number].length
        )
            return random_block();
        return origin_tetris_array[random_block_number][
            random_direction_number
        ];
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
function defaultPointerIndex() {
    try {
        //匹配数字
        let tempRegexp = /\d+/;
        let columns = container?.style
            .getPropertyValue('grid-template-columns')
            .match(tempRegexp);
        let temp: string = '';
        for (let i of columns as Array<string>) {
            temp += i;
        }
        pointerIndex = Math.floor(parseInt(temp) / 2);
        return true;
    } catch (e: any) {
        console.error(e.message);
        return false;
    }
}
const testObject = {
    get_origin_tetris_array,
    getContainer,
    defaultPointerIndex,
    testText() {
        console.log(pointerIndex);
        console.log(origin_tetris_array);
    },
};
export default testObject;
