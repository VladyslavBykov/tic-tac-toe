const COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
class TicTacToe {
    container;
    playerQueue;
    game = new Map();
    players = [];
    win = false;
    constructor(container, players) {
        if(!!container) {
            this.container = document.getElementById(container);
            players.forEach(player => this.createNewPlayer(player));
            this.container.classList.add(GLOBAL_ENUMS.CLASS_NAMES.CONTAINER);
        }
    };
    start() {
        if(!!this.container) {
            this.buildBoard();
            this.setPlayerQueue(this.players[0]);
        } else {
            this.showMessage(GLOBAL_ENUMS.MESSAGES_TYPES.ALERT, GLOBAL_ENUMS.MESSAGES.NOT_PROVIDED_CONTAINER);
        }
    }
    createNewPlayer(name) {
        this.players.push(name);
        this.game.set(name, []);
    }
    setPlayerQueue(name) {
        this.playerQueue = name;
    }
    buildBoard() {
        for(let i = 0; i < 9; i++) {
            const cell = document.createElement(GLOBAL_ENUMS.ELEMENTS.DIV);
            cell.classList.add(GLOBAL_ENUMS.CLASS_NAMES.CELL);
            cell.addEventListener(GLOBAL_ENUMS.EVENTS.CLICK, this.cellClickHandler.bind(this));
            cell.setAttribute(GLOBAL_ENUMS.DATA_ATTRIBUTES.DATA_INDEX, i);
            this.container.appendChild(cell);
        }
    }
    cellClickHandler(event) {
        const el = event.target;
        this.setIcon(el);
        this.setWinData(el);
        this.checkWinner();
        if (!this.win) {
            this.nextTurn();
        }
    }
    setIcon(element) {
        if (element.innerHTML === "") {
            if (this.playerQueue === this.players[0]) {
                element.innerHTML = GLOBAL_ENUMS.ICONS.CROSS;
            }
            if (this.playerQueue === this.players[1]) {
                element.innerHTML = GLOBAL_ENUMS.ICONS.CIRCLE;
            }
        }
    }
    setWinData(element) {
        this.game.get(this.playerQueue).push(+element.getAttribute(GLOBAL_ENUMS.DATA_ATTRIBUTES.DATA_INDEX));
    }
    nextTurn() {
        this.setPlayerQueue(this.players[this.players.findIndex((playerName) => this.playerQueue === playerName) === 0 ? 1 : 0]);
    }
    checkWinner() {
        const list = this.game.get(this.playerQueue);
        if (list.length < 3) {
            return;
        }
        const combinations = COMBINATIONS;
        for (let i = 0; i < combinations.length; i++) {
            let win = 0;
            for (let j = 0; j < combinations[i].length; j++) {
                if (list.indexOf(combinations[i][j]) !== -1) {
                    win++;
                }
                if(win === 3) {
                    // this.clearBoard();
                    this.win = true;
                    setTimeout(() => this.showMessage(GLOBAL_ENUMS.MESSAGES_TYPES.ALERT, GLOBAL_ENUMS.MESSAGES.WIN + this.playerQueue), 0);
                }
            }
        }
    }
    clearBoard() {
        this.container.childNodes.forEach(node => node.innerHTML = "");
    }
    showMessage(type, message) {
        switch (type) {
            case GLOBAL_ENUMS.MESSAGES_TYPES.ALERT:
                alert(message);
                break;
            case GLOBAL_ENUMS.MESSAGES_TYPES.CONSOLE_LOG:
                console.log(message);
                break;
            default:
                break;
        }
    }
};
