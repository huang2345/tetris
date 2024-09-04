import * as Map from './../ts/map.ts';
import Block from './../ts/block.ts';
import Draw from './../ts/draw.ts';

let app = document.querySelector('#app');

//初始化容器
let container = document.createElement('div');
{
    container.style.setProperty('width', '500px');
    container.style.setProperty('height', '500px');

    //test
    container.style.setProperty('border', '1px solid black');

    Map.setContainer(container);
    Map.setMap(30, 30);
    app.appendChild(container);
}
{
    //初始化tetris_data
    Block.init();
}
{
    Draw.get_origin_tetris_array(Block);
    Draw.getContainer(container);
    Draw.defaultPointerIndex();
    Draw.testText();
}
