type Blocks = number[][][];

var tetris_origin_data: Blocks = [];
var tetris_add0_data: Blocks = [];
export var tetris_data: number[][][][] = [];

//设置俄罗斯方块原始形状
{
    let square_shape = [
        [1, 1],
        [1, 1],
    ];
    let l_left_shape = [
        [1, 0],
        [1, 0],
        [1, 1],
    ];
    let l_right_shape = [
        [0, 1],
        [0, 1],
        [1, 1],
    ];
    let z_left_shape = [
        [1, 1, 0],
        [0, 1, 1],
    ];
    let z_right_shape = [
        [0, 1, 1],
        [1, 1, 0],
    ];
    let long_shape = [
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
    ];
    let up_shape = [
        [0, 1, 0],
        [1, 1, 1],
    ];
    {
        tetris_origin_data.push(square_shape);
        tetris_origin_data.push(l_left_shape);
        tetris_origin_data.push(l_right_shape);
        tetris_origin_data.push(z_left_shape);
        tetris_origin_data.push(z_right_shape);
        tetris_origin_data.push(long_shape);
        tetris_origin_data.push(up_shape);
    }
}
//根据原始形状进行旋转
function set_rotate_shape(): boolean {
    //先对原始形状进行补全，使其矩阵为正方形
    try {
        for (let i = 0; i < tetris_origin_data.length; i++) {
            let shape = tetris_origin_data[i];
            if (shape.length == 2 && shape[0].length == 2) {
                tetris_add0_data.push(shape);
                continue;
            }
            while (shape.length > shape[0].length) {
                for (let j = 0; j < shape.length; j++) {
                    shape[j].push(0);
                }
            }
            while (shape.length < shape[0].length) {
                let temp = [];
                for (let j = 0; j < shape[0].length; j++) {
                    temp.push(0);
                }
                shape.push(temp);
            }
            tetris_add0_data.push(shape);
        }
    } catch (e: any) {
        console.log('设置形状补全失败！');
        console.error(e.message);
        return false;
    }
    //对原始形状进行旋转
    function rotate(array: number[][]): number[][] {
        let temp = [];
        //把列变成行
        for (let i = 0; i < array.length; i++) {
            let row = [];
            for (let j = array.length - 1; j >= 0; j--) {
                row.push(array[j][i]);
            }
            temp.push(row);
        }
        return temp;
    }
    try {
        var tetris_rotate_data: number[][][][] = [];
        for (let i = 0; i < tetris_add0_data.length; i++) {
            let shape = [];
            shape.push(tetris_add0_data[i]);
            for (let j = 0; j < 3; j++) {
                shape.push(rotate(tetris_add0_data[i]));
            }
            tetris_rotate_data.push(shape);
        }
        tetris_data = tetris_rotate_data;
    } catch (e: any) {
        console.log('设置形状旋转失败！');
        console.error(e.message);
        return false;
    }
    return true;
}
const block = () => {};
block.init = function (): boolean {
    try {
        set_rotate_shape();
    } catch (e: any) {
        console.error('该文件初始化错误！', e.message);
        return false;
    }
    return true;
};
block.tetris_data = tetris_data;
export default block;
