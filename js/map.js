class GameMap {
    constructor(width, height, tileSize = 32) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.tiles = [];
        
        // Tile types
        this.TILE_TYPES = {
            GRASS: { color: '#4a9c2d', walkable: true },
            WATER: { color: '#4287f5', walkable: false },
            SAND: { color: '#e3d85b', walkable: true },
            STONE: { color: '#808080', walkable: false }
        };

        this.generateMap();
    }

    generateMap() {
        // Create a simple map layout
        // 0: grass, 1: water, 2: sand, 3: stone
        this.tiles = [
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
            [0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 2, 2, 0],
            [0, 0, 3, 3, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    getTileType(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        
        if (tileY >= 0 && tileY < this.tiles.length && 
            tileX >= 0 && tileX < this.tiles[0].length) {
            const tileValue = this.tiles[tileY][tileX];
            return Object.values(this.TILE_TYPES)[tileValue];
        }
        return null;
    }

    isWalkable(x, y) {
        const tile = this.getTileType(x, y);
        return tile ? tile.walkable : false;
    }

    render(ctx) {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                const tileType = Object.values(this.TILE_TYPES)[this.tiles[y][x]];
                ctx.fillStyle = tileType.color;
                ctx.fillRect(
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }
} 