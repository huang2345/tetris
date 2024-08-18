import * as Map from './../ts/map.ts';
import * as Block from './../ts/block.ts';

let app = document.querySelector('#app');

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
Block.rotate_shape();
