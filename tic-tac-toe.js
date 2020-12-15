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
    elements = {};
    constructor(container, players) {
        if(!!container) {
            this.container = document.getElementById(container);
            players.forEach((player, index) => this.createNewPlayer(player, index));
            this.container.classList.add(GLOBAL_ENUMS.CLASS_NAMES.CONTAINER);
        }
    };
    start() {
        if(!!this.container) {
            this.buildBoard();
            this.buildCurrentPlayerInfo();
            this.setPlayerQueue(this.players[0]);
        } else {
            this.showMessage(GLOBAL_ENUMS.MESSAGES_TYPES.ALERT, GLOBAL_ENUMS.MESSAGES.NOT_PROVIDED_CONTAINER);
        }
    }
    createNewPlayer(name, index) {
        const player = {
            id: index,
            name
        }
        this.players.push(player);
        this.game.set(this.unifyName(player), []);
    }
    setPlayerQueue(player) {
        this.playerQueue = this.unifyName(player);
        this.elements.playerNameElement.innerHTML = player.name;
    }
    unifyName(player) {
        return `${player.name}_${player.id}`;
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
    buildCurrentPlayerInfo() {
        const playerInfoText = document.createElement(GLOBAL_ENUMS.ELEMENTS.DIV);
        this.elements.playerNameElement = document.createElement(GLOBAL_ENUMS.ELEMENTS.SPAN);
        const playerAfterNameText = document.createElement(GLOBAL_ENUMS.ELEMENTS.SPAN);
        playerInfoText.classList.add(GLOBAL_ENUMS.CLASS_NAMES.PLAYER_INFO);
        this.elements.playerNameElement.setAttribute(GLOBAL_ENUMS.DATA_ATTRIBUTES.DATA_PLAYER_NAME, "");
        playerAfterNameText.innerHTML = GLOBAL_ENUMS.MESSAGES.PLAYER_INFO;
        playerInfoText.appendChild(this.elements.playerNameElement);
        playerInfoText.appendChild(playerAfterNameText);
        this.container.parentNode.appendChild(playerInfoText);
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
            if (+this.playerQueue.split("_")[1] === this.players[0].id) {
                element.innerHTML = GLOBAL_ENUMS.ICONS.CROSS;
            }
            if (+this.playerQueue.split("_")[1] === this.players[1].id) {
                element.innerHTML = GLOBAL_ENUMS.ICONS.CIRCLE;
            }
        }
    }
    setWinData(element) {
        this.game.get(this.playerQueue).push(+element.getAttribute(GLOBAL_ENUMS.DATA_ATTRIBUTES.DATA_INDEX));
    }
    nextTurn() {
        this.setPlayerQueue(this.players[this.players.findIndex((player) => +this.playerQueue.split("_")[1] === player.id) === 0 ? 1 : 0]);
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
                    this.win = true;
                    const message = {
                        title: GLOBAL_ENUMS.MESSAGES.CONGRATULATION_MESSAGE,
                        text: GLOBAL_ENUMS.MESSAGES.WIN + this.playerQueue.split("_")[0],
                    }
                    this.showMessage(GLOBAL_ENUMS.MESSAGES_TYPES.CONFIRM, message);
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
            case GLOBAL_ENUMS.MESSAGES_TYPES.CONFIRM:
                this.buildConfirmMessage(message);
                break;
            default:
                break;
        }
    }
    buildConfirmMessage(message) {
        document.getElementById(GLOBAL_ENUMS.ELEMENTS.CONFIRM_TITLE).innerHTML = message.title;
        document.getElementById(GLOBAL_ENUMS.ELEMENTS.CONFIRM_TEXT).innerHTML = message.text;
        document.getElementById(GLOBAL_ENUMS.ELEMENTS.CONFIRM_ACTION).click();
        document.getElementById(GLOBAL_ENUMS.ELEMENTS.RESTART_BTN).addEventListener(GLOBAL_ENUMS.EVENTS.CLICK, () => {
           location.reload();
        });
    }
};
