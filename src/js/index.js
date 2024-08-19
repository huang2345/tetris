import * as Map from './../ts/map.ts';
import Block from './../ts/block.ts';

let app = document.querySelector('#app');

//初始化容器
{
    let table = document.createElement('div');
    table.style.setProperty('width', '500px');
    table.style.setProperty('height', '500px');

    //test
    table.style.setProperty('border', '1px solid black');

    Map.setContainer(table);
    Map.setMap(30, 30);
    app.appendChild(table);
}
{
    //初始化tetris_data
    Block.init();
}
