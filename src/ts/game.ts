import Draw from '@/ts/draw';
import { block, containerWidth, draw_returnValue } from '@/ts/draw';
import { divMessage, getDiv } from '@/ts/map';
const pointer = new Draw.pointer();

let nowBlock: block | undefined;
let nowBlock_direction: number[][] | undefined;
let draw_returnValue: draw_returnValue | undefined;
// let moveDirection: 'left' | 'right' | 'down' = 'down';

function set_nowBlock(): boolean {
    try {
        nowBlock = Draw.random_block();
        if (!nowBlock) throw new Error('该函数设置的now_block为undefined');
        nowBlock_direction = nowBlock.randomDirectionFunc();
        if (!nowBlock_direction)
            throw new Error(
                '该函数设置的now_block的randomDirectionFunc为undefined'
            );
        return true;
    } catch (e: any) {
        console.error(e.message);
        return false;
    }
}
//绘制->碰撞检测->移动
function anime() {
    try {
        if (!nowBlock) throw new Error('now_block为undefined');
        if (!nowBlock_direction)
            throw new Error('now_block_direction为undefined');
        draw_returnValue = Draw.draw(
            nowBlock_direction,
            pointer.getPointerIndex(),
            getDiv
        );
        //碰撞检测
        let detectionValue = collisionDetection();
        //根据碰撞检测的结果，判断是否终止循环
        if (detectionValue) {
            tetrisInit();
            throw new Error('检测到碰撞，终止循环');
        }

        //移动
        move(draw_returnValue);
    } catch (e: any) {
        console.error(e.message);
    }
}
function collisionDetection(): boolean | undefined {
    try {
        if (!nowBlock) throw new Error('now_block为undefined');
        if (!nowBlock_direction)
            throw new Error('now_block_direction为undefined');
        //先获取当前nowBlock_direction的底部坐标
        //i为倒序是为了保证获取的是下面的坐标
        let nowBlock_direction_bottoms: divMessage[] = [];

        for (let i = nowBlock_direction.length - 1, now_j = 0; i >= 0; i--) {
            for (
                let j = nowBlock_direction_bottoms.length;
                j < nowBlock_direction[i].length;
                j++
            ) {
                if (nowBlock_direction[i][j] === 1) {
                    let id: number =
                        pointer.getPointerIndex()! +
                        i * parseInt(containerWidth) +
                        j;
                    let nowBlock_direction_bottom = getDiv(id);
                    if (!nowBlock_direction_bottom)
                        throw new Error('nowBlock_direction_bottom为undefined');
                    try {
                        //检测获取到的有没有在已经获取的nowBlock_direction_bottoms的元素的上面的
                        for (let i of nowBlock_direction_bottoms) {
                            let testId =
                                nowBlock_direction_bottom.id +
                                parseInt(containerWidth);
                            if (testId == i.id)
                                throw new Error(
                                    '获取到的元素在nowBlock_direction_bottoms的元素的上面'
                                );
                        }
                        nowBlock_direction_bottoms.push(
                            nowBlock_direction_bottom
                        );
                    } catch (e: any) {
                        if (
                            e.message.match(
                                /获取到的元素在nowBlock_direction_bottoms的元素的上面/
                            )
                        )
                            console.log(
                                '获取到的元素在nowBlock_direction_bottoms的元素的上面'
                            );
                        else console.error(e.message);
                    }
                }
            }
        }
        //获取nowBlock_direction_bottom下1步的坐标
        try {
            for (let i of nowBlock_direction_bottoms) {
                let id: number = i.id + parseInt(containerWidth);
                let nowBlock_direction_bottoms_next_ = getDiv(id);
                if (!nowBlock_direction_bottoms_next_)
                    throw new Error(
                        'nowBlock_direction_bottoms_next_为undefined'
                    );
                if (nowBlock_direction_bottoms_next_.occupy == 1) {
                    console.log('碰撞检测：撞到其他方块，结束循环');
                    return true;
                }
            }
        } catch (e: any) {
            if (e.message.match(/应该由碰撞检测函数处理的Error/)) {
                console.log('碰撞检测：已到底部，结束循环');
                return true;
            } else console.error(e.message);
        }
        return false;
    } catch (e: any) {
        console.error(e.message);
    }
}
function move(
    draw_returnValue: draw_returnValue
    // direction: 'left' | 'right' | 'down'
) {
    setTimeout(() => {
        try {
            if (!draw_returnValue.yes_setBackgroundColor) {
                throw new Error('上一次绘制失败！');
            }
            if (!draw_returnValue.clear!()) throw new Error('清除失败');
            // console.log(pointer.getPointerIndex()! + parseInt(containerWidth));
            pointer.setPointerIndex(
                pointer.getPointerIndex()! + parseInt(containerWidth)
            );
            // console.log('pointerIndex', pointer.getPointerIndex());
            anime();
        } catch (e: any) {
            console.error(e.message);
        }
    }, 500);
}
function add_control(container: HTMLElement) {
    console.log('add_control', container);
    container?.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'w':
                break;
            case 'a':
                console.log('左');
                pointer.setPointerIndex(pointer.getPointerIndex()! - 1);
                break;
            case 's':
                break;
            case 'd':
                console.log('右');
                pointer.setPointerIndex(pointer.getPointerIndex()! + 1);
                break;
        }
    });
}
function tetrisInit() {
    pointer.defaultIndex();
    set_nowBlock();
    anime();
}
const testObject = {
    tetrisInit,
    add_control,
};
export default testObject;
