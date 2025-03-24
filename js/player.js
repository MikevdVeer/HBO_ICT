class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 3;
        this.color = '#00ff00';
        this.interactionRange = 50;
    }

    update(engine, map, npcs) {
        // Movement
        if (engine.isKeyPressed('ArrowUp') || engine.isKeyPressed('w')) {
            this.move(0, -this.speed, map);
        }
        if (engine.isKeyPressed('ArrowDown') || engine.isKeyPressed('s')) {
            this.move(0, this.speed, map);
        }
        if (engine.isKeyPressed('ArrowLeft') || engine.isKeyPressed('a')) {
            this.move(-this.speed, 0, map);
        }
        if (engine.isKeyPressed('ArrowRight') || engine.isKeyPressed('d')) {
            this.move(this.speed, 0, map);
        }

        // Interaction
        if (engine.isKeyPressed('e')) {
            this.interact(npcs);
        }
    }

    move(dx, dy, map) {
        const newX = this.x + dx;
        const newY = this.y + dy;

        // Simple collision detection with map boundaries
        if (newX >= 0 && newX + this.width <= map.width &&
            newY >= 0 && newY + this.height <= map.height) {
            this.x = newX;
            this.y = newY;
        }
    }

    interact(npcs) {
        for (const npc of npcs) {
            const distance = Math.sqrt(
                Math.pow(this.x - npc.x, 2) + 
                Math.pow(this.y - npc.y, 2)
            );

            if (distance <= this.interactionRange) {
                npc.interact();
                break;
            }
        }
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
} 