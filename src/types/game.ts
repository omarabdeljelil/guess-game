export interface GameState {
    selectedIcons: string[];
    correctOrder: string[];
    guessLog: string[];
    attemptNumber: number;
    isGameStarted: boolean;
    isGameWon: boolean;
}

export interface GuessResult {
    guess: string[];
    correctCount: number;
    attemptNumber: number;
}
