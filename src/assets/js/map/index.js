const colorByNumber = (number) => {
    switch (number) {
        case -1:
            return 'black';
        case 0:
            return 'black';
        default:
            return 'blue';
    }
}

const MAP = (mapGrid) => {
    const _mapGrid = mapGrid;
    const _map = [];
    const _mapDim = {
        height: 0,
        width: 0,
    };

    return {
        setMap(map) {
            _map = map.map(x => x.slice());
        },
        setHeight(height) {
            _mapDim.height = height;
        },
        setWidth(width) {
            _mapDim.width = width;
        },
        draw() {
            for (let y = 0; y < _mapDim.height; y++) {
                for (let x = 0; x < _mapDim.width; x++) {
                    if (_map[y][x] === 1) {
                        _mapGrid.fill(0, 0, 0);
                    } else {
                        _mapGrid.fill(255, 255, 255);
                    }
                    _mapGrid.rect(x * 10, y * 10, 10, 10);
                }
            }
        }
    };
};

module.exports = { MAP, colorByNumber };