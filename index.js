const MESSAGES_TYPES_ENUM = {
    ALERT: "alert",
    CONSOLE_LOG: "log",
};
const MESSAGES = {
    NOT_PROVIDED_CONTAINER: "Container for the game not provided",
    WIN: "Congratulations, winner is: ",
};
const CLASS_NAMES = {
    CELL: "ttc_cell",
    CONTAINER: "ttc_container",
};
const ELEMENTS = {
    DIV: "div",
};
const EVENTS = {
    CLICK: "click",
}
const ICONS = {
    CIRCLE: "&cir;",
    CROSS: "&cross;",
}
const DATA_ATTRIBUTES = {
    DATA_INDEX: "data-index"
}
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
    constructor(container) {
        if(!!container) {
            this.container = document.getElementById(container);
            this.container.classList.add(CLASS_NAMES.CONTAINER);
        }
    };
    start() {
        if(!!this.container) {
            this.createNewPlayer("test");
            this.createNewPlayer("Vlad");
            this.buildBoard();
            this.setPlayerQueue(this.players[0]);
        } else {
            this.showMessage(MESSAGES_TYPES_ENUM.ALERT, MESSAGES.NOT_PROVIDED_CONTAINER);
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
            const cell = document.createElement(ELEMENTS.DIV);
            cell.classList.add(CLASS_NAMES.CELL);
            cell.addEventListener(EVENTS.CLICK, this.cellClickHandler.bind(this));
            cell.setAttribute(DATA_ATTRIBUTES.DATA_INDEX, i);
            this.container.appendChild(cell);
        }
    }
    cellClickHandler(event) {
        const el = event.target;
        this.setIcon(el);
        this.setWinData(el);
        this.checkWinner();
        this.nextTurn();
    }
    setIcon(element) {
        if (element.innerHTML === "") {
            if (this.playerQueue === this.players[0]) {
                element.innerHTML = ICONS.CROSS;
            }
            if (this.playerQueue === this.players[1]) {
                element.innerHTML = ICONS.CIRCLE;
            }
        }
    }
    setWinData(element) {
        this.game.get(this.playerQueue).push(+element.getAttribute(DATA_ATTRIBUTES.DATA_INDEX));
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
                    setTimeout(() => this.showMessage(MESSAGES_TYPES_ENUM.ALERT, MESSAGES.WIN + this.playerQueue), 0);
                }
            }
        }
    }
    clearBoard() {
        this.container.childNodes.forEach(node => node.innerHTML = "");
    }
    showMessage(type, message) {
        switch (type) {
            case MESSAGES_TYPES_ENUM.ALERT:
                alert(message);
                break;
            case MESSAGES_TYPES_ENUM.CONSOLE_LOG:
                console.log(message);
                break;
            default:
                break;
        }
    }
};
