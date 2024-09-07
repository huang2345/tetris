import * as Map from './../ts/map.ts';
import Block from './../ts/block.ts';
import { get_origin_tetris_array, getContainer } from './../ts/draw.ts';

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
    get_origin_tetris_array(Block);
    getContainer(container);
    // Draw.testText();
}
{
    import('./../ts/game.ts').then((module) => {
        module.default.init();
    });
}
