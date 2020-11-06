class App {
    constructor() {
        this.inputText = document.getElementById('inputText');
        this.inputKey = document.getElementById('inputKey');
        this.inputCode = document.getElementById('inputCode');
        this.chooseAction = document.getElementById('chooseAction');
        this.chooseABC = document.getElementById('chooseABC');
        this.buttonEnter = document.getElementById('buttonEnter');
        this.currentABC = null;
        this.currentAction = null;

        this.abc = {
            rus: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
            eng: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        }

        this.chooseABC.addEventListener('change', () => {
            this.currentABC = this.chooseABC.value;
        });
        this.chooseAction.addEventListener('change', () => {
            this.currentAction = this.chooseAction.value;
        });
        this.buttonEnter.addEventListener('click', () => {
            if (this.currentABC && this.currentAction) {
                this[this.currentAction]();
            }
        });
    }

    toCode() {
        const text = this.checkValue(this.inputText.value.split(''));
        const key = this.checkValue(this.inputKey.value.split(''));
        if (key[0] && text[0]) {
            const abc = this.abc[this.currentABC];
            let code = [];
            let keyIter = 0;
            for (let i = 0; i < text.length; i++) {
                if (keyIter == key.length) {
                    keyIter = 0;
                }
                let textChar;
                let keyChar;
                let codeChar;
                for (let j = 0; j < abc.length; j++) {
                    if (abc[j] == text[i]) {
                        textChar = j;
                    }
                    if (abc[j] == key[keyIter]) {
                        keyChar = j;
                    }
                }
                if (textChar + keyChar > abc.length - 1) {
                    codeChar = textChar + keyChar - abc.length;
                } else {
                    codeChar = textChar + keyChar;
                }
                console.log(codeChar);
                code.push(abc[codeChar]);
                keyIter++;
            }
            this.inputCode.value = code.join('');
        }
    }

    toDecode() {
        const code = this.checkValue(this.inputCode.value.split(''));
        const key = this.checkValue(this.inputKey.value.split(''));
        if (key[0] && code[0]) {
            const abc = this.abc[this.currentABC];
            let text = [];
            let keyIter = 0;
            for (let i = 0; i < code.length; i++) {
                if (keyIter == key.length) {
                    keyIter = 0;
                }
                let textChar;
                let keyChar;
                let codeChar;
                for (let j = 0; j < abc.length; j++) {
                    if (abc[j] == code[i]) {
                        codeChar = j;
                    }
                    if (abc[j] == key[keyIter]) {
                        keyChar = j;
                    }
                }
                if (codeChar - keyChar < 0) {
                    textChar = codeChar - keyChar + abc.length;
                } else {
                    textChar = codeChar - keyChar;
                }
                console.log(textChar);
                text.push(abc[textChar]);
                keyIter++;
            }
            this.inputText.value = text.join('');
        }
    }

    checkValue(value) {
        let result = [];
        const abc = this.abc[this.currentABC];
        for (let i = 0; i < value.length; i++) {
            const char = value[i].toUpperCase();
            for (let j = 0; j < abc.length; j++) {
                if (char == abc[j]) {
                    result.push(char);
                }
            }
        }
        return result;
    }

}