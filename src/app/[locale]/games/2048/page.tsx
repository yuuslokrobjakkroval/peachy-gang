"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const GRID_SIZE = 4;
const CELL_SIZE = 6; // in rem
const CELL_GAP = 0.5; // in rem

type Tile = {
  value: number;
  id: string;
  mergedFrom?: Tile[];
  justMerged?: boolean;
  isNew?: boolean;
  row: number;
  col: number;
};

export default function Game2048() {
  const [board, setBoard] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeGame();
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) setBestScore(parseInt(storedBestScore));

    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score.toString());
    }
  }, [score, bestScore]);

  const initializeGame = () => {
    const newBoard: Tile[] = [];
    addNewTile(newBoard);
    addNewTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setIsGameOver(false);
  };

  const addNewTile = (board: Tile[]) => {
    const emptyTiles = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!board.some((tile) => tile.row === row && tile.col === col)) {
          emptyTiles.push({ row, col });
        }
      }
    }
    if (emptyTiles.length > 0) {
      const { row, col } =
        emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      board.push({
        value: Math.random() < 0.9 ? 2 : 4,
        id: `${row}-${col}-${Date.now()}`,
        row,
        col,
        isNew: true,
      });
    }
  };

  const move = (direction: "up" | "down" | "left" | "right") => {
    if (isGameOver) return;

    let newBoard = board.map((tile) => ({
      ...tile,
      justMerged: false,
      isNew: false,
    }));
    let changed = false;
    let newScore = score;

    const sortedTiles = [...newBoard].sort((a, b) => {
      if (direction === "up" || direction === "down") {
        return direction === "up" ? a.row - b.row : b.row - a.row;
      } else {
        return direction === "left" ? a.col - b.col : b.col - a.col;
      }
    });

    for (const tile of sortedTiles) {
      const { row, col } = tile;
      let newRow = row;
      let newCol = col;

      while (true) {
        newRow += direction === "up" ? -1 : direction === "down" ? 1 : 0;
        newCol += direction === "left" ? -1 : direction === "right" ? 1 : 0;

        if (
          newRow < 0 ||
          newRow >= GRID_SIZE ||
          newCol < 0 ||
          newCol >= GRID_SIZE
        ) {
          newRow -= direction === "up" ? -1 : direction === "down" ? 1 : 0;
          newCol -= direction === "left" ? -1 : direction === "right" ? 1 : 0;
          break;
        }

        const targetTile = newBoard.find(
          (t) => t.row === newRow && t.col === newCol,
        );
        if (targetTile) {
          if (targetTile.value === tile.value && !targetTile.justMerged) {
            newBoard = newBoard.filter((t) => t !== targetTile && t !== tile);
            newBoard.push({
              value: tile.value * 2,
              id: tile.id,
              row: newRow,
              col: newCol,
              justMerged: true,
              isNew: false,
            });
            newScore += tile.value * 2;
            changed = true;
          } else {
            newRow -= direction === "up" ? -1 : direction === "down" ? 1 : 0;
            newCol -= direction === "left" ? -1 : direction === "right" ? 1 : 0;
          }
          break;
        }
      }

      if (newRow !== row || newCol !== col) {
        changed = true;
        tile.row = newRow;
        tile.col = newCol;
      }
    }

    if (changed) {
      addNewTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
      if (isGameOverState(newBoard)) {
        setIsGameOver(true);
      }
    } else if (isGameOverState(newBoard)) {
      setIsGameOver(true);
    }
  };

  const isGameOverState = (board: Tile[]) => {
    if (board.length < GRID_SIZE * GRID_SIZE) return false;

    for (const tile of board) {
      const { row, col, value } = tile;
      if (
        (row > 0 &&
          board.some(
            (t) => t.row === row - 1 && t.col === col && t.value === value,
          )) ||
        (row < GRID_SIZE - 1 &&
          board.some(
            (t) => t.row === row + 1 && t.col === col && t.value === value,
          )) ||
        (col > 0 &&
          board.some(
            (t) => t.row === row && t.col === col - 1 && t.value === value,
          )) ||
        (col < GRID_SIZE - 1 &&
          board.some(
            (t) => t.row === row && t.col === col + 1 && t.value === value,
          ))
      ) {
        return false;
      }
    }

    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowUp":
        move("up");
        break;
      case "ArrowDown":
        move("down");
        break;
      case "ArrowLeft":
        move("left");
        break;
      case "ArrowRight":
        move("right");
        break;
    }
  };

  const cellColor = (value: number) => {
    switch (value) {
      case 2:
        return "bg-[var(--chart-1)] text-[var(--foreground)]";
      case 4:
        return "bg-[var(--chart-2)] text-[var(--foreground)]";
      case 8:
        return "bg-[var(--chart-3)] text-[var(--primary-foreground)]";
      case 16:
        return "bg-[var(--chart-4)] text-[var(--primary-foreground)]";
      case 32:
        return "bg-[var(--chart-5)] text-[var(--primary-foreground)]";
      case 64:
        return "bg-[var(--primary)] text-[var(--primary-foreground)]";
      case 128:
        return "bg-[var(--secondary)] text-[var(--secondary-foreground)]";
      case 256:
        return "bg-[var(--accent)] text-[var(--accent-foreground)]";
      case 512:
        return "bg-[var(--muted)] text-[var(--muted-foreground)]";
      case 1024:
        return "bg-[var(--card)] text-[var(--card-foreground)]";
      case 2048:
        return "bg-[var(--popover)] text-[var(--popover-foreground)]";
      default:
        return "bg-[var(--card)] text-[var(--card-foreground)]";
    }
  };

  const tileVariants = {
    initial: { scale: 0 },
    enter: { scale: 1 },
    merged: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)] font-handwritten"
      ref={gameContainerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="2048 Game Board"
    >
      <div className="texture" />
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        <div className="flex justify-between items-center mb-4 w-full">
          <h1 className="text-6xl font-bold text-[var(--primary)] animate-twinkle">
            2048
          </h1>
          <div className="flex gap-2 ml-10">
            <div className="bg-[var(--muted)] p-2 h-14 w-14 rounded-[var(--radius)] text-[var(--muted-foreground)] flex flex-col items-center shadow-sm border-2 border-[var(--border)]">
              <div className="text-sm">SCORE</div>
              <div className="font-bold">{score}</div>
            </div>
            <div className="bg-[var(--muted)] h-14 w-14 rounded-[var(--radius)] p-2 text-[var(--muted-foreground)] flex flex-col items-center shadow-sm border-2 border-[var(--border)]">
              <div className="text-sm">BEST</div>
              <div className="font-bold">{bestScore}</div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--muted)]/50 p-2 rounded-[var(--radius)] w-fit shadow-lg border-2 border-[var(--border)]">
          <div
            className="relative"
            style={{
              width: `${CELL_SIZE * GRID_SIZE + CELL_GAP * (GRID_SIZE - 1)}rem`,
              height: `${CELL_SIZE * GRID_SIZE + CELL_GAP * (GRID_SIZE - 1)}rem`,
            }}
          >
            {/* Background grid */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
              <div
                key={`cell-${index}`}
                className="absolute bg-[var(--card)] rounded-[var(--radius)] border-2 border-[var(--border)] shadow-xs"
                style={{
                  width: `${CELL_SIZE}rem`,
                  height: `${CELL_SIZE}rem`,
                  left: `${(index % GRID_SIZE) * (CELL_SIZE + CELL_GAP)}rem`,
                  top: `${Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP)}rem`,
                }}
              />
            ))}
            {/* Tiles */}
            <AnimatePresence>
              {board.map((tile) => (
                <motion.div
                  key={tile.id}
                  initial={
                    tile.isNew
                      ? {
                          scale: 0,
                          x: tile.col * (CELL_SIZE + CELL_GAP) + "rem",
                          y: tile.row * (CELL_SIZE + CELL_GAP) + "rem",
                        }
                      : { scale: 0 }
                  }
                  animate={{
                    scale: 1,
                    x: tile.col * (CELL_SIZE + CELL_GAP) + "rem",
                    y: tile.row * (CELL_SIZE + CELL_GAP) + "rem",
                  }}
                  exit={{ scale: 0 }}
                  transition={
                    tile.isNew
                      ? { duration: 0.15 }
                      : { x: { duration: 0.15 }, y: { duration: 0.15 } }
                  }
                  className={`absolute rounded-[var(--radius)] flex items-center justify-center text-2xl font-bold ${cellColor(
                    tile.value,
                  )} border-2 border-[var(--border)] shadow-xs`}
                  style={{
                    width: `${CELL_SIZE}rem`,
                    height: `${CELL_SIZE}rem`,
                  }}
                >
                  <motion.div
                    variants={tileVariants}
                    animate={tile.justMerged ? "merged" : "enter"}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {tile.value}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-4 text-sm text-[var(--muted-foreground)]">
          <p>
            <strong className="flex flex-col text-center text-primary">
              HOW TO PLAY:
            </strong>
            Use your <strong>arrow keys</strong> to move the tiles.
            <br />
            When two tiles with the same number touch,
            <br />
            they <strong>merge into one!</strong>
          </p>
        </div>
        <div className="mt-4">
          <Button
            onClick={initializeGame}
            className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 shadow-primary rounded-[var(--radius)] border-2 border-[var(--primary-border)]"
          >
            New Game
          </Button>
        </div>
      </div>

      <Dialog open={isGameOver} onOpenChange={setIsGameOver}>
        <DialogContent className="bg-[var(--card)] text-[var(--card-foreground)] rounded-[var(--radius)] shadow-lg border-2 border-[var(--border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--primary)]">
              Game Over!
            </DialogTitle>
            <DialogDescription className="text-[var(--muted-foreground)]">
              Your score: {score}
              {score === bestScore && score > 0 && " (New Best!)"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={initializeGame}
              className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 shadow-primary rounded-[var(--radius)] border-2 border-[var(--primary-border)]"
            >
              Play Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
