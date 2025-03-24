class Game extends Engine {
    constructor() {
        super();
        
        // Initialize map
        this.map = new GameMap(800, 600);
        
        // Initialize player in a walkable position
        this.player = new Player(100, 100);
        
        // Initialize NPCs with their dialogues
        this.npcs = [
            new NPC(200, 150, "Merchant", [
                "Welcome to our village!",
                "I have many items for sale.",
                "Come back again soon!"
            ]),
            new NPC(400, 300, "Elder", [
                "Greetings, young adventurer!",
                "Our village needs your help...",
                "There are monsters in the forest.",
                "Can you help us?"
            ]),
            new NPC(600, 200, "Guard", [
                "Halt! Who goes there?",
                "Ah, a friendly face.",
                "Be careful out there!"
            ])
        ];
    }

    update(deltaTime) {
        this.player.update(this, this.map, this.npcs);
    }

    render() {
        this.clear();
        
        // Render map
        this.map.render(this.ctx);
        
        // Render NPCs
        for (const npc of this.npcs) {
            npc.render(this.ctx);
        }
        
        // Render player
        this.player.render(this.ctx);
    }
}

// Start the game when the window loads
window.addEventListener('load', () => {
    const game = new Game();
    game.gameLoop();
}); 