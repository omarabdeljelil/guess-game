import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Container, Paper, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { useSnackbar } from 'notistack';
import { GameState, GuessResult } from '../types/game';

// Updated icons list with unique emojis from different categories
const ALL_ICONS = [
    '🐶', '🐱', '🐼', '🦊', '🦁', '🐯', '🐮', '🐷',  // animals
    '🚗', '🚲', '✈️', '🚀', '🚁', '🚂', '⛵️', '🛸',  // vehicles
    '⚽️', '🏀', '🎾', '🎮', '🎨', '🎭', '🎪', '🎯',  // activities
    '🌞', '⭐️', '🌈', '🌙', '⛈️', '❄️', '🌺', '🌴'   // nature
];

const initialGameState: GameState = {
    selectedIcons: [],
    correctOrder: [],
    guessLog: [],
    attemptNumber: 0,
    isGameStarted: false,
    isGameWon: false,
};

const GuessingGame: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const [userGuess, setUserGuess] = useState<string[]>([]);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    const startGame = useCallback(() => {
        if (gameState.selectedIcons.length < 3 || gameState.selectedIcons.length > 7) {
            enqueueSnackbar('Please select between 3 and 7 icons', { variant: 'warning' });
            return;
        }

        const shuffledIcons = [...gameState.selectedIcons].sort(() => Math.random() - 0.5);
        setGameState(prev => ({
            ...prev,
            correctOrder: shuffledIcons,
            isGameStarted: true,
            attemptNumber: 0,
            guessLog: [],
            isGameWon: false,
        }));
        setUserGuess([...shuffledIcons].sort(() => Math.random() - 0.5));
    }, [gameState.selectedIcons, enqueueSnackbar]);

    const handleIconSelect = (icon: string) => {
        setGameState(prev => {
            const newSelectedIcons = prev.selectedIcons.includes(icon)
                ? prev.selectedIcons.filter(i => i !== icon)
                : [...prev.selectedIcons, icon];
            return { ...prev, selectedIcons: newSelectedIcons };
        });
    };

    const handleDragStart = (index: number) => {
        setDraggedItem(index);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (dropIndex: number) => {
        if (draggedItem === null) return;
        
        const newGuess = [...userGuess];
        const draggedIcon = newGuess[draggedItem];
        
        // Remove the dragged item
        newGuess.splice(draggedItem, 1);
        // Insert it at the new position
        newGuess.splice(dropIndex, 0, draggedIcon);
        
        setUserGuess(newGuess);
        setDraggedItem(null);
    };

    const submitGuess = () => {
        let correctCount = 0;
        userGuess.forEach((icon, index) => {
            if (icon === gameState.correctOrder[index]) {
                correctCount++;
            }
        });

        const newAttemptNumber = gameState.attemptNumber + 1;
        const guessResult: GuessResult = {
            guess: [...userGuess],
            correctCount,
            attemptNumber: newAttemptNumber,
        };

        const newGuessLog = [
            `Guess ${newAttemptNumber}: ${userGuess.join(' ')} - ${correctCount} correct`,
            ...gameState.guessLog,
        ];

        const isWon = correctCount === gameState.correctOrder.length;

        setGameState(prev => ({
            ...prev,
            guessLog: newGuessLog,
            attemptNumber: newAttemptNumber,
            isGameWon: isWon,
        }));

        if (isWon) {
            enqueueSnackbar('Congratulations! You won! 🎉', { variant: 'success' });
        } else {
            enqueueSnackbar(`${correctCount} icons in correct position`, { variant: 'info' });
        }
    };

    const resetGame = () => {
        setGameState(initialGameState);
        setUserGuess([]);
        setDraggedItem(null);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1">
                        Guessing Game
                    </Typography>
                    {gameState.isGameStarted && (
                        <Button variant="contained" color="primary" onClick={resetGame}>
                            New Game
                        </Button>
                    )}
                </Box>

                {!gameState.isGameStarted ? (
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Choose your Icons (3-7):
                        </Typography>
                        <Grid container spacing={2}>
                            {ALL_ICONS.map((icon) => (
                                <Grid item key={icon}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={gameState.selectedIcons.includes(icon)}
                                                onChange={() => handleIconSelect(icon)}
                                            />
                                        }
                                        label={<Typography variant="h5">{icon}</Typography>}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={startGame}
                            sx={{ mt: 2 }}
                        >
                            Start Game
                        </Button>
                    </Paper>
                ) : (
                    <>
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Arrange the icons in the correct order:
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    p: 2,
                                    border: '1px dashed grey',
                                    borderRadius: 1,
                                    minHeight: '100px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {userGuess.map((icon, index) => (
                                    <Paper
                                        key={index}
                                        draggable
                                        onDragStart={() => handleDragStart(index)}
                                        onDragOver={handleDragOver}
                                        onDrop={() => handleDrop(index)}
                                        elevation={draggedItem === index ? 6 : 1}
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 60,
                                            height: 60,
                                            cursor: 'grab',
                                            backgroundColor: draggedItem === index ? 'action.hover' : 'background.paper',
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                            transition: 'all 0.2s',
                                            userSelect: 'none'
                                        }}
                                    >
                                        <Typography variant="h5">{icon}</Typography>
                                    </Paper>
                                ))}
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={submitGuess}
                                sx={{ mt: 2 }}
                                disabled={gameState.isGameWon}
                            >
                                Submit Guess
                            </Button>
                        </Paper>

                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Guess Log:
                            </Typography>
                            {gameState.guessLog.map((log, index) => (
                                <Typography key={index} sx={{ mb: 1 }}>
                                    {log}
                                </Typography>
                            ))}
                        </Paper>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default GuessingGame;
