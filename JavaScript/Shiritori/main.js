class Shiritori {
    constructor() {
        this.words = prompt("Введите слово: ",[]);
        this.words = [];
        this.game_over = false;
    }

    play(word) {
        const lastWord = this.words.slice(-1)[0] || '';
        const lastChar = lastWord.slice(-1);

        if (lastWord && (this.words.includes(word) || lastChar !== word[0])) {
            this.game_over = true;
            return 'game over';
        }

        this.words.push(word);
        return this.words;
    }
    restart() {
        this.words = [];
        this.game_over = false;
        return 'game restarted';
    }

}