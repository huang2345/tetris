import Draw from '@/ts/draw';
import { block, containerWidth, draw_returnValue } from '@/ts/draw';
import { getDiv } from '@/ts/map';
const pointer = new Draw.pointer();

let nowBlock: block | undefined;
let nowBlock_direction: number[][] | undefined;
function set_nowBlock(): boolean {
    try {
        nowBlock = Draw.random_block();
        if (!nowBlock) throw new Error('该函数设置的now_block为undefined');
        return true;
    } catch (e: any) {
        console.error(e.message);
        return false;
    }
}
//绘制->碰撞检测->移动
export function anime() {
    setTimeout(() => {
        try {
            if (!nowBlock) throw new Error('now_block为undefined');
            if (!nowBlock_direction)
                throw new Error('now_block_direction为undefined');
            let draw_returnValue = Draw.draw(
                nowBlock_direction,
                pointer.getPointerIndex(),
                getDiv
            );
            //碰撞检测
            //根据碰撞检测的结果，判断是否终止循环

            //移动
            move(draw_returnValue);
        } catch (e: any) {
            console.error(e.message);
        }
    }, 500);
}
function move(draw_returnValue: draw_returnValue) {
    try {
        if (!draw_returnValue.yes_setBackgroundColor) {
            throw new Error('上一次绘制失败！');
        }
        if (!draw_returnValue.clear()) throw new Error('清除失败');
        pointer.setPointerIndex(
            pointer.getPointerIndex()! + parseInt(containerWidth)
        );
        anime();
    } catch (e: any) {
        console.error(e.message);
    }
}
const testObject = {
    anime,
};
export default testObject;
