class NPC {
    constructor(x, y, name, dialogues) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.name = name;
        this.dialogues = dialogues;
        this.currentDialogue = 0;
        this.color = '#ff0000';
        
        this.dialogueBox = document.getElementById('dialogueBox');
        this.dialogueText = document.getElementById('dialogueText');
        this.dialogueButton = document.getElementById('dialogueButton');
        
        this.dialogueButton.addEventListener('click', () => {
            this.nextDialogue();
        });
    }

    interact() {
        this.dialogueBox.classList.remove('hidden');
        this.showDialogue();
    }

    showDialogue() {
        if (this.currentDialogue < this.dialogues.length) {
            this.dialogueText.textContent = `${this.name}: ${this.dialogues[this.currentDialogue]}`;
        }
    }

    nextDialogue() {
        this.currentDialogue++;
        if (this.currentDialogue >= this.dialogues.length) {
            this.currentDialogue = 0;
            this.dialogueBox.classList.add('hidden');
        } else {
            this.showDialogue();
        }
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw NPC name
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x + this.width / 2, this.y - 3);
    }
} 