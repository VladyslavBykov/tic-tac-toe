

class TicTacToeUI {
    elements = {};
    init() {
        this.getElements();
        if (!!this.elements.startBtn) {
            this.elements.startBtn.addEventListener(GLOBAL_ENUMS.EVENTS.CLICK, () => {
                this.elements.playBtn.remove();
                if (this.isPlayerNamesValid()) {
                    this.elements.startBtn.remove();
                    this.cleanBeforeStart();
                    const game = new TicTacToe("ticTacToe", [this.elements.player1.value, this.elements.player2.value]);
                    game.start();
                } else {
                    this.elements.initForm.classList.add(GLOBAL_ENUMS.CLASS_NAMES.UI_WAS_VALIDATED);
                }
            });
        }
    };
    isPlayerNamesValid() {
        return this.elements.player1.value.length > 0 && this.elements.player2.value.length > 0;
    }
    getElements() {
        this.elements.startBtn = document.getElementById(GLOBAL_ENUMS.ELEMENTS.UI_START_BUTTON);
        this.elements.playBtn = document.getElementById(GLOBAL_ENUMS.ELEMENTS.UI_PLAY_BUTTON);
        this.elements.initForm = document.getElementById(GLOBAL_ENUMS.ELEMENTS.UI_INIT_FORM);
        this.elements.player1 = document.getElementById(GLOBAL_ENUMS.ELEMENTS.UI_FIRST_PLAYER);
        this.elements.player2 = document.getElementById(GLOBAL_ENUMS.ELEMENTS.UI_SECOND_PLAYER);
        this.elements.startModal = document.getElementById(GLOBAL_ENUMS.ELEMENTS.UI_START_MODAL_BUTTON);
        this.elements.body = document.body;
    }
    cleanBeforeStart() {
        this.elements.startModal.remove();
        this.elements.body.classList.remove("modal-open");
        document.querySelector(".modal-backdrop").remove();
    };
}
new TicTacToeUI().init();
