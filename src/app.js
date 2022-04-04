const { MAP } = require('./assets/js/map/index');
const { MAP_PICTURE } = require('./setup/map/picture');

import * as d3 from "d3";

const margin = {
    top: 10,
    bottom: 10,
    right: 10,
    left: 10,
};

const setGameBoard = (id) => {
    return d3.select(id)
        .append("svg")
        .attr("id", "game_board")
        .attr("width", MAP_PICTURE.width + margin.left + margin.right)
        .attr("height", MAP_PICTURE.height + margin.top + margin.bottom);
};


module.exports = { setGameBoard };