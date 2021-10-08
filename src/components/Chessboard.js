import React from "react";
import emptySpace from "../resources/48x48_transparent.png";
import possibleMoveImg from "../resources/48x48_possible_move.png";
import blkBishop from "../resources/48x48_blk_bishop.png";
import blkKing from "../resources/48x48_blk_king.png";
import blkKnight from "../resources/48x48_blk_knight.png";
import blkPawn from "../resources/48x48_blk_pawn.png";
import blkQueen from "../resources/48x48_blk_queen.png";
import blkRook from "../resources/48x48_blk_rook.png";
import whtBishop from "../resources/48x48_wht_bishop.png";
import whtKing from "../resources/48x48_wht_king.png";
import whtKnight from "../resources/48x48_wht_knight.png";
import whtPawn from "../resources/48x48_wht_pawn.png";
import whtQueen from "../resources/48x48_wht_queen.png";
import whtRook from "../resources/48x48_wht_rook.png";

// BUG: King can move in line of other king

function checkmate() {
  return "checkmate";
}
function stalemate() {
  return "stalemate";
}
function kingPiece() {
  return "king";
}
function isPieceKing(piece) {
  return piece.piece === kingPiece();
}
function queenPiece() {
  return "queen";
}
// function isPieceQueen(piece) {
// 	return piece.piece === queenPiece();
// }
function rookPiece() {
  return "rook";
}
function isPieceRook(piece) {
  return piece.piece === rookPiece();
}
function knightPiece() {
  return "knight";
}
function isPieceKnight(piece) {
  return piece.piece === knightPiece();
}
function bishopPiece() {
  return "bishop";
}
// function isPieceBishop(piece) {
// 	return piece.piece === bishopPiece();
// }
function pawnPiece() {
  return "pawn";
}
function isPiecePawn(piece) {
  return piece.piece === pawnPiece();
}
function moveForward(units, isWhite) {
  if (isWhite) {
    return 0 - units;
  }
  return units;
}
// function convertPieceNameToChessNotation(piece) {
// 	switch (piece) {
// 		case kingPiece():
// 			return "k";
// 		case queenPiece():
// 			return "q";
// 		case bishopPiece():
// 			return "b";
// 		case knightPiece():
// 			return "n";
// 		case rookPiece():
// 			return "r";
// 		case pawnPiece():
// 		default:
// 			return "";
// 	}
// }
function convertZeroIndexToChessNotation(row = null, col = null) {
  let notation = "";
  if (col !== null) {
    // eslint-disable-next-line
    switch (col) {
      case 0:
        notation = "a";
        break;
      case 1:
        notation = "b";
        break;
      case 2:
        notation = "c";
        break;
      case 3:
        notation = "d";
        break;
      case 4:
        notation = "e";
        break;
      case 5:
        notation = "f";
        break;
      case 6:
        notation = "g";
        break;
      case 7:
        notation = "h";
        break;
    }
  }
  if (row !== null) {
    notation += (8 - row).toString();
  }
  return notation;
}
// TODO:
// - Actual notation
// # checkmate, + check, = promote
function getMoveChessNotation(
  initRow,
  initCol,
  endRow,
  endCol,
  isCapture,
  _promoteToPiece
) {
  return (
    convertZeroIndexToChessNotation(initRow, initCol) +
    (isCapture ? "x" : "") +
    convertZeroIndexToChessNotation(endRow, endCol)
  );
}
function getGameOverFlags(isCheck, availableMovesCount) {
  if (availableMovesCount === 0) {
    if (isCheck) {
      return checkmate();
    }
    return stalemate();
  }
  return "";
}
function cloneBoard(board) {
  let boardClone = {
    boardArr: [],
    pieceIndex: {
      black: {
        RQs: board.pieceIndex.black.RQs,
        NQs: board.pieceIndex.black.NQs,
        BQs: board.pieceIndex.black.BQs,
        Que: board.pieceIndex.black.Que,
        Kin: board.pieceIndex.black.Kin,
        BKs: board.pieceIndex.black.BKs,
        NKs: board.pieceIndex.black.NKs,
        RKs: board.pieceIndex.black.RKs,
        PRQ: board.pieceIndex.black.PRQ,
        PNQ: board.pieceIndex.black.PNQ,
        PBQ: board.pieceIndex.black.PBQ,
        PQu: board.pieceIndex.black.PQu,
        PKi: board.pieceIndex.black.PKi,
        PBK: board.pieceIndex.black.PBK,
        PNK: board.pieceIndex.black.PNK,
        PRK: board.pieceIndex.black.PRK,
      },
      white: {
        PRQ: board.pieceIndex.white.PRQ,
        PNQ: board.pieceIndex.white.PNQ,
        PBQ: board.pieceIndex.white.PBQ,
        PQu: board.pieceIndex.white.PQu,
        PKi: board.pieceIndex.white.PKi,
        PBK: board.pieceIndex.white.PBK,
        PNK: board.pieceIndex.white.PNK,
        PRK: board.pieceIndex.white.PRK,
        RQs: board.pieceIndex.white.RQs,
        NQs: board.pieceIndex.white.NQs,
        BQs: board.pieceIndex.white.BQs,
        Que: board.pieceIndex.white.Que,
        Kin: board.pieceIndex.white.Kin,
        BKs: board.pieceIndex.white.BKs,
        NKs: board.pieceIndex.white.NKs,
        RKs: board.pieceIndex.white.RKs,
      },
    },
  };
  for (const row of board.boardArr) {
    boardClone.boardArr.push([]);
    for (const square of row) {
      if (square !== null) {
        boardClone.boardArr[boardClone.boardArr.length - 1].push({ ...square });
      } else {
        boardClone.boardArr[boardClone.boardArr.length - 1].push(null);
      }
    }
  }
  return boardClone;
}
function getPieceValidMoves(board, row, col, colorIsWhite) {
  let validMoves = [];
  const square = board.boardArr[row][col];
  let validMovesIgnoreCheck = [];
  if (square !== null) {
    if (square.isWhite === colorIsWhite) {
      // eslint-disable-next-line
      switch (square.piece) {
        case pawnPiece():
          validMovesIgnoreCheck = getPawnValidMoves(
            board,
            row,
            col,
            colorIsWhite
          );
          break;
        case rookPiece():
          validMovesIgnoreCheck = getRookValidMoves(
            board,
            row,
            col,
            colorIsWhite
          );
          break;
        case knightPiece():
          validMovesIgnoreCheck = getKnightValidMoves(
            board,
            row,
            col,
            colorIsWhite
          );
          break;
        case bishopPiece():
          validMovesIgnoreCheck = getBishopValidMoves(
            board,
            row,
            col,
            colorIsWhite
          );
          break;
        case queenPiece():
          validMovesIgnoreCheck = getQueenValidMoves(
            board,
            row,
            col,
            colorIsWhite
          );
          break;
        case kingPiece():
          validMovesIgnoreCheck = getKingValidMoves(
            board,
            row,
            col,
            colorIsWhite
          );
          break;
      }
    }
  }
  for (const move of validMovesIgnoreCheck) {
    let boardClone = cloneBoard(board);
    makeMoveOnBoard(boardClone, row, col, move[0], move[1]);
    if (!checkIfInCheck(boardClone, colorIsWhite)) {
      validMoves.push(move);
    }
  }
  return validMoves;
}
function canPawnTakeKingAtPos(board, row, col, colorIsWhite) {
  let rowToCheck = row + moveForward(1, colorIsWhite);
  if (rowToCheck >= 8 || rowToCheck < 0) {
    return false;
  }
  const canCheckLeft = col !== 0;
  const canCheckRight = col !== 7;
  if (
    canCheckLeft &&
    board.boardArr[rowToCheck][col - 1] !== null &&
    board.boardArr[rowToCheck][col - 1].isWhite !== colorIsWhite &&
    isPiecePawn(board.boardArr[rowToCheck][col - 1])
  ) {
    return true;
  }
  if (
    canCheckRight &&
    board.boardArr[rowToCheck][col + 1] !== null &&
    board.boardArr[rowToCheck][col + 1].isWhite !== colorIsWhite &&
    isPiecePawn(board.boardArr[rowToCheck][col + 1])
  ) {
    return true;
  }
  return false;
}
function getPawnValidMoves(board, row, col, colorIsWhite) {
  let validMoves = [];
  const canCheckLeft = col !== 0;
  const canCheckRight = col !== 7;
  if ((colorIsWhite && row === 3) || (!colorIsWhite && row === 4)) {
    // check left en passant
    if (
      canCheckLeft &&
      board.boardArr[row][col - 1] !== null &&
      board.boardArr[row][col - 1].canBeEnPassanted
    ) {
      validMoves.push([row + moveForward(1, colorIsWhite), col - 1]);
    }
    // check right en passant
    if (
      canCheckRight &&
      board.boardArr[row][col + 1] !== null &&
      board.boardArr[row][col + 1].canBeEnPassanted
    ) {
      validMoves.push([row + moveForward(1, colorIsWhite), col + 1]);
    }
  }
  if ((colorIsWhite && row === 6) || (!colorIsWhite && row === 1)) {
    // check 2 in front
    if (board.boardArr[row + moveForward(2, colorIsWhite)][col] === null) {
      validMoves.push([row + moveForward(2, colorIsWhite), col]);
    }
  }
  // check 1 in front
  if (board.boardArr[row + moveForward(1, colorIsWhite)][col] === null) {
    validMoves.push([row + moveForward(1, colorIsWhite), col]);
  }
  // check left capture
  if (
    canCheckLeft &&
    board.boardArr[row + moveForward(1, colorIsWhite)][col - 1] !== null &&
    board.boardArr[row + moveForward(1, colorIsWhite)][col - 1].isWhite !==
      colorIsWhite
  ) {
    validMoves.push([row + moveForward(1, colorIsWhite), col - 1]);
  }
  // check right capture
  if (
    canCheckRight &&
    board.boardArr[row + moveForward(1, colorIsWhite)][col + 1] !== null &&
    board.boardArr[row + moveForward(1, colorIsWhite)][col + 1].isWhite !==
      colorIsWhite
  ) {
    validMoves.push([row + moveForward(1, colorIsWhite), col + 1]);
  }
  return validMoves;
}
function canKnightTakeKingAtPos(board, row, col, colorIsWhite) {
  let canTake = false;
  const llu = { cCol: col - 2, cRow: row - 1 };
  const luu = { cCol: col - 1, cRow: row - 2 };
  const ruu = { cCol: col + 1, cRow: row - 2 };
  const rru = { cCol: col + 2, cRow: row - 1 };
  const rrd = { cCol: col + 2, cRow: row + 1 };
  const rdd = { cCol: col + 1, cRow: row + 2 };
  const ldd = { cCol: col - 1, cRow: row + 2 };
  const lld = { cCol: col - 2, cRow: row + 1 };
  [llu, luu, ruu, rru, rrd, rdd, ldd, lld].forEach((move) => {
    if (
      move.cRow >= 0 &&
      move.cCol >= 0 &&
      move.cRow < 8 &&
      move.cCol < 8 &&
      board.boardArr[move.cRow][move.cCol] !== null &&
      board.boardArr[move.cRow][move.cCol].isWhite !== colorIsWhite &&
      isPieceKnight(board.boardArr[move.cRow][move.cCol])
    ) {
      canTake = true;
      return;
    }
  });
  return canTake;
}
function getKnightValidMoves(board, row, col, colorIsWhite) {
  let validMoves = [];
  const llu = { cCol: col - 2, cRow: row - 1 };
  const luu = { cCol: col - 1, cRow: row - 2 };
  const ruu = { cCol: col + 1, cRow: row - 2 };
  const rru = { cCol: col + 2, cRow: row - 1 };
  const rrd = { cCol: col + 2, cRow: row + 1 };
  const rdd = { cCol: col + 1, cRow: row + 2 };
  const ldd = { cCol: col - 1, cRow: row + 2 };
  const lld = { cCol: col - 2, cRow: row + 1 };
  [llu, luu, ruu, rru, rrd, rdd, ldd, lld].forEach((move) => {
    if (
      move.cRow >= 0 &&
      move.cCol >= 0 &&
      move.cRow < 8 &&
      move.cCol < 8 &&
      (board.boardArr[move.cRow][move.cCol] === null ||
        board.boardArr[move.cRow][move.cCol].isWhite !== colorIsWhite)
    ) {
      validMoves.push([move.cRow, move.cCol]);
    }
  });
  return validMoves;
}
function getKingValidMoves(board, row, col, colorIsWhite, isInCheck) {
  let validMoves = [];
  const l = { cCol: col - 1, cRow: row };
  const lu = { cCol: col - 1, cRow: row - 1 };
  const u = { cCol: col, cRow: row - 1 };
  const ru = { cCol: col + 1, cRow: row - 1 };
  const r = { cCol: col + 1, cRow: row };
  const rd = { cCol: col + 1, cRow: row + 1 };
  const d = { cCol: col, cRow: row + 1 };
  const ld = { cCol: col - 1, cRow: row + 1 };
  [l, lu, u, ru, r, rd, d, ld].forEach((move) => {
    if (
      move.cRow >= 0 &&
      move.cCol >= 0 &&
      move.cRow < 8 &&
      move.cCol < 8 &&
      (board.boardArr[move.cRow][move.cCol] === null ||
        board.boardArr[move.cRow][move.cCol].isWhite !== colorIsWhite)
    ) {
      validMoves.push([move.cRow, move.cCol]);
    }
  });
  // Check if castling is allowed
  if (!isInCheck && !board.boardArr[row][col].hasMoved) {
    if (board.boardArr[row][0] !== null && !board.boardArr[row][0].hasMoved) {
      if (
        board.boardArr[row][1] === null &&
        board.boardArr[row][2] === null &&
        board.boardArr[row][3] === null
      ) {
        const boardClone = cloneBoard(board);
        makeMoveOnBoard(boardClone, row, col, row, 3);
        if (!checkIfInCheck(boardClone, colorIsWhite)) {
          validMoves.push([row, col - 2]);
        }
      }
    }
    if (board.boardArr[row][7] !== null && !board.boardArr[row][7].hasMoved) {
      if (board.boardArr[row][5] === null && board.boardArr[row][6] === null) {
        const boardClone = cloneBoard(board);
        makeMoveOnBoard(boardClone, row, col, row, 5);
        if (!checkIfInCheck(boardClone, colorIsWhite)) {
          validMoves.push([row, col + 2]);
        }
      }
    }
  }
  return validMoves;
}
function canKingTakeKingAtPos(board, row, col, colorIsWhite) {
  let canTake = false;
  const lu = { cCol: col - 1, cRow: row - 1 };
  const u = { cCol: col, cRow: row - 1 };
  const ru = { cCol: col + 1, cRow: row - 1 };
  const r = { cCol: col + 1, cRow: row };
  const rd = { cCol: col + 1, cRow: row + 1 };
  const d = { cCol: col, cRow: row + 1 };
  const ld = { cCol: col - 1, cRow: row + 1 };
  const l = { cCol: col - 1, cRow: row };
  [lu, u, ru, r, rd, d, ld, l].forEach((move) => {
    if (
      move.cRow >= 0 &&
      move.cCol >= 0 &&
      move.cRow < 8 &&
      move.cCol < 8 &&
      board.boardArr[move.cRow][move.cCol] !== null &&
      board.boardArr[move.cRow][move.cCol].isWhite !== colorIsWhite &&
      isPieceKing(board.boardArr[move.cRow][move.cCol])
    ) {
      canTake = true;
      return;
    }
  });
  return canTake;
}
function canCheckLambda(
  board,
  currRow,
  currCol,
  currIsWhite,
  currRowUpdate,
  currColUpdate,
  piecesToCheck
) {
  while (currRow >= 0 && currCol >= 0 && currRow < 8 && currCol < 8) {
    if (board.boardArr[currRow][currCol] !== null) {
      if (
        piecesToCheck.includes(board.boardArr[currRow][currCol].piece) &&
        board.boardArr[currRow][currCol].isWhite !== currIsWhite
      ) {
        return true;
      } else {
        return false;
      }
    }
    currRow = currRowUpdate(currRow);
    currCol = currColUpdate(currCol);
  }
  return false;
}
function checkIfInCheck(board, checkWhite) {
  // Use king: check if it can take any piece with that piece's movement
  let kingLoc = [];
  if (checkWhite) {
    kingLoc = board.pieceIndex.white.Kin;
  } else {
    kingLoc = board.pieceIndex.black.Kin;
  }
  if (canKnightTakeKingAtPos(board, kingLoc[0], kingLoc[1], checkWhite)) {
    return true;
  }
  if (canRookOrQueenTakeKingAtPos(board, kingLoc[0], kingLoc[1], checkWhite)) {
    return true;
  }
  if (
    canBishopOrQueenTakeKingAtPos(board, kingLoc[0], kingLoc[1], checkWhite)
  ) {
    return true;
  }
  if (canPawnTakeKingAtPos(board, kingLoc[0], kingLoc[1], checkWhite)) {
    return true;
  }
  if (canKingTakeKingAtPos(board, kingLoc[0], kingLoc[1], checkWhite)) {
    return true;
  }
  return false;
}
function getValidMovesLambda(
  board,
  currRow,
  currCol,
  currIsWhite,
  currRowUpdate,
  currColUpdate
) {
  let validMoves = [];
  while (currRow >= 0 && currCol >= 0 && currRow < 8 && currCol < 8) {
    if (board.boardArr[currRow][currCol] === null) {
      validMoves.push([currRow, currCol]);
    } else {
      if (board.boardArr[currRow][currCol].isWhite !== currIsWhite) {
        validMoves.push([currRow, currCol]);
      }
      break;
    }
    currRow = currRowUpdate(currRow);
    currCol = currColUpdate(currCol);
  }
  return validMoves;
}
function canRookOrQueenTakeKingAtPos(board, row, col, checkWhite) {
  const piecesToCheck = [rookPiece(), queenPiece()];
  // check left
  if (
    canCheckLambda(
      board,
      row,
      col - 1,
      checkWhite,
      (r) => {
        return r;
      },
      (c) => {
        return c - 1;
      },
      piecesToCheck
    )
  ) {
    return true;
  }
  // check right
  if (
    canCheckLambda(
      board,
      row,
      col + 1,
      checkWhite,
      (r) => {
        return r;
      },
      (c) => {
        return c + 1;
      },
      piecesToCheck
    )
  ) {
    return true;
  }
  // check down
  if (
    canCheckLambda(
      board,
      row + 1,
      col,
      checkWhite,
      (r) => {
        return r + 1;
      },
      (c) => {
        return c;
      },
      piecesToCheck
    )
  ) {
    return true;
  }
  // check up
  if (
    canCheckLambda(
      board,
      row - 1,
      col,
      checkWhite,
      (r) => {
        return r - 1;
      },
      (c) => {
        return c;
      },
      piecesToCheck
    )
  ) {
    return true;
  }
  return false;
}
function getRookValidMoves(board, row, col, colorIsWhite) {
  let validMoves = [];
  // check left
  const validMovesLeft = getValidMovesLambda(
    board,
    row,
    col - 1,
    colorIsWhite,
    (r) => {
      return r;
    },
    (c) => {
      return c - 1;
    }
  );
  validMoves = validMoves.concat(validMovesLeft);
  // check right
  const validMovesRight = getValidMovesLambda(
    board,
    row,
    col + 1,
    colorIsWhite,
    (r) => {
      return r;
    },
    (c) => {
      return c + 1;
    }
  );
  validMoves = validMoves.concat(validMovesRight);
  // check down
  const validMovesDown = getValidMovesLambda(
    board,
    row + 1,
    col,
    colorIsWhite,
    (r) => {
      return r + 1;
    },
    (c) => {
      return c;
    }
  );
  validMoves = validMoves.concat(validMovesDown);
  // check up
  const validMovesUp = getValidMovesLambda(
    board,
    row - 1,
    col,
    colorIsWhite,
    (r) => {
      return r - 1;
    },
    (c) => {
      return c;
    }
  );
  validMoves = validMoves.concat(validMovesUp);
  return validMoves;
}
function canBishopOrQueenTakeKingAtPos(board, row, col, checkWhite) {
  const piecesToCheck = [bishopPiece(), queenPiece()];
  // check up-left
  if (
    canCheckLambda(
      board,
      row - 1,
      col - 1,
      checkWhite,
      (r) => {
        return r - 1;
      },
      (c) => {
        return c - 1;
      },
      piecesToCheck
    )
  ) {
    return true;
  }
  // check up-right
  if (
    canCheckLambda(
      board,
      row - 1,
      col + 1,
      checkWhite,
      (r) => {
        return r - 1;
      },
      (c) => {
        return c + 1;
      },
      piecesToCheck
    )
  ) {
    return true;
  }
  // check down-left
  if (
    canCheckLambda(
      board,
      row + 1,
      col - 1,
      checkWhite,
      (r) => {
        return r + 1;
      },
      (c) => {
        return c - 1;
      },
      piecesToCheck
    )
  ) {
    return true;
  }
  // check down-right
  if (
    canCheckLambda(
      board,
      row + 1,
      col + 1,
      checkWhite,
      (r) => {
        return r + 1;
      },
      (c) => {
        return c + 1;
      },
      piecesToCheck
    )
  ) {
    return true;
  }
  return false;
}
function getBishopValidMoves(board, row, col, colorIsWhite) {
  let validMoves = [];
  // check up-left
  const validMovesUpLeft = getValidMovesLambda(
    board,
    row - 1,
    col - 1,
    colorIsWhite,
    (r) => {
      return r - 1;
    },
    (c) => {
      return c - 1;
    }
  );
  validMoves = validMoves.concat(validMovesUpLeft);
  // check up-right
  const validMovesUpRight = getValidMovesLambda(
    board,
    row - 1,
    col + 1,
    colorIsWhite,
    (r) => {
      return r - 1;
    },
    (c) => {
      return c + 1;
    }
  );
  validMoves = validMoves.concat(validMovesUpRight);
  // check down-left
  const validMovesDownLeft = getValidMovesLambda(
    board,
    row + 1,
    col - 1,
    colorIsWhite,
    (r) => {
      return r + 1;
    },
    (c) => {
      return c - 1;
    }
  );
  validMoves = validMoves.concat(validMovesDownLeft);
  // check down-right
  const validMovesDownRight = getValidMovesLambda(
    board,
    row + 1,
    col + 1,
    colorIsWhite,
    (r) => {
      return r + 1;
    },
    (c) => {
      return c + 1;
    }
  );
  validMoves = validMoves.concat(validMovesDownRight);
  return validMoves;
}
function getQueenValidMoves(board, row, col, colorIsWhite) {
  return getRookValidMoves(board, row, col, colorIsWhite).concat(
    getBishopValidMoves(board, row, col, colorIsWhite)
  );
}

function getPieceImage(isWhite, piece) {
  // eslint-disable-next-line
  switch (piece) {
    case pawnPiece():
      return isWhite ? whtPawn : blkPawn;
    case rookPiece():
      return isWhite ? whtRook : blkRook;
    case knightPiece():
      return isWhite ? whtKnight : blkKnight;
    case bishopPiece():
      return isWhite ? whtBishop : blkBishop;
    case kingPiece():
      return isWhite ? whtKing : blkKing;
    case queenPiece():
      return isWhite ? whtQueen : blkQueen;
    default:
      return emptySpace;
  }
}

function getAllPossibleMoves(board, isWhiteTurn) {
  const allPossibleMovesClone = {};
  allPossibleMovesClone.count = 0;
  for (const key in board.pieceIndex.white) {
    if (key === "count") {
      continue;
    }
    let piece;
    if (isWhiteTurn) {
      piece = board.pieceIndex.white[key];
    } else {
      piece = board.pieceIndex.black[key];
    }
    if (piece[0] === -1) {
      allPossibleMovesClone[key] = [];
      continue;
    }
    const validMoves = getPieceValidMoves(
      board,
      piece[0],
      piece[1],
      isWhiteTurn
    );
    allPossibleMovesClone[key] = validMoves;
    if (validMoves.length > 0) {
      allPossibleMovesClone.count += validMoves.length;
    }
  }
  return allPossibleMovesClone;
}

function updatePieceIndex(board, piece, endRow, endCol) {
  if (piece === null) {
    return;
  }
  if (piece.isWhite) {
    board.pieceIndex.white[piece.id] = [endRow, endCol];
  } else {
    board.pieceIndex.black[piece.id] = [endRow, endCol];
  }
}
function makeMoveOnBoard(board, initRow, initCol, endRow, endCol) {
  // Check for castling
  let isCastling = false;
  let isCapture = board.boardArr[endRow][endCol] !== null;
  if (isCapture) {
    updatePieceIndex(board, board.boardArr[endRow][endCol], -1, -1);
  }
  if (
    isPieceKing(board.boardArr[initRow][initCol]) &&
    !board.boardArr[initRow][initCol].hasMoved
  ) {
    // Move rook here, king will move with standard logic
    if (endCol === 2) {
      isCastling = true;
      const rookToMove = board.boardArr[initRow][0];
      board.boardArr[initRow][0] = null;
      board.boardArr[endRow][3] = rookToMove;
      board.boardArr[endRow][3].hasMoved = true;
      updatePieceIndex(board, rookToMove, endRow, 3);
    }
    if (endCol === 6) {
      isCastling = true;
      const rookToMove = board.boardArr[initRow][7];
      board.boardArr[initRow][7] = null;
      board.boardArr[endRow][5] = rookToMove;
      board.boardArr[endRow][5].hasMoved = true;
      updatePieceIndex(board, rookToMove, endRow, 5);
    }
  }
  if (isPiecePawn(board.boardArr[initRow][initCol])) {
    // Check to see if pawn avoided confrontation (ergo can be en passant'ed)
    if (initRow - endRow === 2 || endRow - initRow === 2) {
      board.boardArr[initRow][initCol].canBeEnPassanted = true;
    }
    // Check if move IS en passant
    if (initCol - endCol === 1 || endCol - initCol === 1) {
      isCapture = true;
      if (board.boardArr[endRow][endCol] === null) {
        // En passant. Capture pawn here, pawn will move with standard logic
        updatePieceIndex(board, board.boardArr[initRow][endCol], -1, -1);
        board.boardArr[initRow][endCol] = null;
      }
    }
    // Note that for promotions, move the pawn to the last row. Then, promote
    // the piece in the next turn (same player chooses a piece)
  }
  const pieceToMove = board.boardArr[initRow][initCol];
  board.boardArr[initRow][initCol] = null;
  board.boardArr[endRow][endCol] = pieceToMove;
  if (isPieceRook(pieceToMove) || isPieceKing(pieceToMove)) {
    pieceToMove.hasMoved = true;
  }
  updatePieceIndex(board, board.boardArr[endRow][endCol], endRow, endCol);
  return { isCapture: isCapture, isCastling: isCastling };
}

class Chessboard extends React.Component {
  constructor(props) {
    super(props);

    //# region Piece declarations
    const bRQs = {
      id: "RQs",
      isWhite: false,
      piece: rookPiece(),
      hasMoved: false,
    };
    const bNQs = { id: "NQs", isWhite: false, piece: knightPiece() };
    const bBQs = { id: "BQs", isWhite: false, piece: bishopPiece() };
    const bQue = { id: "Que", isWhite: false, piece: queenPiece() };
    const bKin = {
      id: "Kin",
      isWhite: false,
      piece: kingPiece(),
      hasMoved: false,
    };
    const bBKs = { id: "BKs", isWhite: false, piece: bishopPiece() };
    const bNKs = { id: "NKs", isWhite: false, piece: knightPiece() };
    const bRKs = {
      id: "RKs",
      isWhite: false,
      piece: rookPiece(),
      hasMoved: false,
    };
    const bPRQ = {
      id: "PRQ",
      isWhite: false,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const bPNQ = {
      id: "PNQ",
      isWhite: false,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const bPBQ = {
      id: "PBQ",
      isWhite: false,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const bPQu = {
      id: "PQu",
      isWhite: false,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const bPKi = {
      id: "PKi",
      isWhite: false,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const bPBK = {
      id: "PBK",
      isWhite: false,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const bPNK = {
      id: "PNK",
      isWhite: false,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const bPRK = {
      id: "PRK",
      isWhite: false,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wPRQ = {
      id: "PRQ",
      isWhite: true,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wPNQ = {
      id: "PNQ",
      isWhite: true,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wPBQ = {
      id: "PBQ",
      isWhite: true,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wPQu = {
      id: "PQu",
      isWhite: true,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wPKi = {
      id: "PKi",
      isWhite: true,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wPBK = {
      id: "PBK",
      isWhite: true,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wPNK = {
      id: "PNK",
      isWhite: true,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wPRK = {
      id: "PRK",
      isWhite: true,
      piece: pawnPiece(),
      canBeEnPassanted: false,
    };
    const wRQs = {
      id: "RQs",
      isWhite: true,
      piece: rookPiece(),
      hasMoved: false,
    };
    const wNQs = { id: "NQs", isWhite: true, piece: knightPiece() };
    const wBQs = { id: "BQs", isWhite: true, piece: bishopPiece() };
    const wQue = { id: "Que", isWhite: true, piece: queenPiece() };
    const wKin = {
      id: "Kin",
      isWhite: true,
      piece: kingPiece(),
      hasMoved: false,
    };
    const wBKs = { id: "BKs", isWhite: true, piece: bishopPiece() };
    const wNKs = { id: "NKs", isWhite: true, piece: knightPiece() };
    const wRKs = {
      id: "RKs",
      isWhite: true,
      piece: rookPiece(),
      hasMoved: false,
    };
    //# endregion

    const board = {
      boardArr: [
        [bRQs, bNQs, bBQs, bQue, bKin, bBKs, bNKs, bRKs],
        [bPRQ, bPNQ, bPBQ, bPQu, bPKi, bPBK, bPNK, bPRK],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [wPRQ, wPNQ, wPBQ, wPQu, wPKi, wPBK, wPNK, wPRK],
        [wRQs, wNQs, wBQs, wQue, wKin, wBKs, wNKs, wRKs],
      ],
      pieceIndex: {
        black: {
          RQs: [0, 0],
          NQs: [0, 1],
          BQs: [0, 2],
          Que: [0, 3],
          Kin: [0, 4],
          BKs: [0, 5],
          NKs: [0, 6],
          RKs: [0, 7],
          PRQ: [1, 0],
          PNQ: [1, 1],
          PBQ: [1, 2],
          PQu: [1, 3],
          PKi: [1, 4],
          PBK: [1, 5],
          PNK: [1, 6],
          PRK: [1, 7],
        },
        white: {
          PRQ: [6, 0],
          PNQ: [6, 1],
          PBQ: [6, 2],
          PQu: [6, 3],
          PKi: [6, 4],
          PBK: [6, 5],
          PNK: [6, 6],
          PRK: [6, 7],
          RQs: [7, 0],
          NQs: [7, 1],
          BQs: [7, 2],
          Que: [7, 3],
          Kin: [7, 4],
          BKs: [7, 5],
          NKs: [7, 6],
          RKs: [7, 7],
        },
      },
    };

    const possibleMovesForSelected = [
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
    ];

    const allPossibleMoves = getAllPossibleMoves(board, true);

    this.state = {
      selectedPiece: [-1, -1],
      isWhiteTurn: true,
      board: board,
      moveHistory: [],
      boardHistory: [board.boardArr.slice()],
      allPossibleMoves: allPossibleMoves,
      possibleMovesForSelected: possibleMovesForSelected,
      isInCheck: checkIfInCheck(board, true),
      gameOverFlags: "",
      isPromotion: false,
      promotionPreviousPosition: [-1, -1],
    };

    this.moveOrGetValidMoves = this.moveOrGetValidMoves.bind(this);
    this.promotePawn = this.promotePawn.bind(this);
  }
  /**
   * Assumption: validation has been done and the move is valid
   */
  movePiece(initRow, initCol, endRow, endCol) {
    let isPromotion = false;
    let moveHistoryClone = this.state.moveHistory.slice();
    const boardClone = {
      boardArr: this.state.board.boardArr.slice(),
      pieceIndex: { ...this.state.board.pieceIndex },
    };
    if (
      (endRow === 0 || endRow === 7) &&
      isPiecePawn(this.state.board.boardArr[initRow][initCol])
    ) {
      isPromotion = true;
    }
    const { isCapture, isCastling } = makeMoveOnBoard(
      boardClone,
      initRow,
      initCol,
      endRow,
      endCol
    );
    const boardHistoryClone = this.state.boardHistory.slice();
    boardHistoryClone.push(boardClone.boardArr);
    if (!isPromotion) {
      moveHistoryClone.push(
        getMoveChessNotation(
          initRow,
          initCol,
          endRow,
          endCol,
          isCapture,
          isCastling
        )
      );
    }
    const possibleMovesForSelectedClone =
      this.state.possibleMovesForSelected.slice();
    possibleMovesForSelectedClone.forEach((row) => {
      row.forEach((_, colIdx) => {
        row[colIdx] = false;
      });
    });
    boardClone.boardArr.forEach((row) => {
      row.forEach((_, colIdx) => {
        if (
          row[colIdx] !== null &&
          isPiecePawn(row[colIdx]) &&
          row[colIdx].isWhite !== this.state.isWhiteTurn
        ) {
          row[colIdx].canBeEnPassanted = false;
        }
      });
    });
    const selectedPieceClone = this.state.selectedPiece.slice();
    if (!isPromotion) {
      selectedPieceClone.forEach((_, idx) => {
        selectedPieceClone[idx] = -1;
      });
    } else {
      selectedPieceClone[0] = endRow;
      selectedPieceClone[1] = endCol;
    }
    let nextTurn = !this.state.isWhiteTurn;
    let isNextInCheck = false;
    let allPossibleMovesClone = {};
    let promotionPreviousPositionClone =
      this.state.promotionPreviousPosition.slice();
    if (isPromotion) {
      nextTurn = this.state.isWhiteTurn;
      allPossibleMovesClone.count = 1;
      promotionPreviousPositionClone[0] = initRow;
      promotionPreviousPositionClone[1] = initCol;
    } else {
      isNextInCheck = checkIfInCheck(boardClone, !this.state.isWhiteTurn);
      allPossibleMovesClone = getAllPossibleMoves(
        boardClone,
        !this.state.isWhiteTurn
      );
    }
    const gameOverFlagsClone = getGameOverFlags(
      isNextInCheck,
      allPossibleMovesClone.count
    );
    this.setState({
      ...this.state,
      board: boardClone,
      isWhiteTurn: nextTurn,
      moveHistory: moveHistoryClone,
      boardHistory: boardHistoryClone,
      allPossibleMoves: allPossibleMovesClone,
      possibleMovesForSelected: possibleMovesForSelectedClone,
      selectedPiece: selectedPieceClone,
      isInCheck: isNextInCheck,
      gameOverFlags: gameOverFlagsClone,
      isPromotion: isPromotion,
      promotionPreviousPosition: promotionPreviousPositionClone,
    });
  }
  promotePawn(promoteToPiece) {
    const [initRow, initCol] = this.state.promotionPreviousPosition;
    const [endRow, endCol] = this.state.selectedPiece;
    const isCapture = initCol !== endCol;
    const boardClone = {
      boardArr: this.state.board.boardArr.slice(),
      pieceIndex: { ...this.state.board.pieceIndex },
    };
    boardClone.boardArr[endRow][endCol].piece = promoteToPiece;
    delete boardClone.boardArr[endRow][endCol].canBeEnPassanted;
    if (isPieceRook(promoteToPiece)) {
      boardClone.boardArr[endRow][endCol].hasMoved = true;
    }
    const moveHistoryClone = this.state.moveHistory.slice();
    moveHistoryClone.push(
      getMoveChessNotation(
        initRow,
        initCol,
        endRow,
        endCol,
        isCapture,
        false,
        promoteToPiece
      )
    );
    const boardHistoryClone = this.state.boardHistory.slice();
    boardHistoryClone.push(boardClone.boardArr);
    const isNextInCheck = checkIfInCheck(boardClone, !this.state.isWhiteTurn);
    const allPossibleMovesClone = getAllPossibleMoves(
      boardClone,
      !this.state.isWhiteTurn
    );
    const possibleMovesForSelectedClone =
      this.state.possibleMovesForSelected.slice();
    possibleMovesForSelectedClone.forEach((row) => {
      row.forEach((_, colIdx) => {
        row[colIdx] = false;
      });
    });
    const selectedPieceClone = this.state.selectedPiece.slice();
    selectedPieceClone.forEach((_, idx) => {
      selectedPieceClone[idx] = -1;
    });
    const gameOverFlagsClone = getGameOverFlags(
      isNextInCheck,
      allPossibleMovesClone.count
    );
    this.setState({
      ...this.state,
      board: boardClone,
      isWhiteTurn: !this.state.isWhiteTurn,
      moveHistory: moveHistoryClone,
      boardHistory: boardHistoryClone,
      allPossibleMoves: allPossibleMovesClone,
      possibleMovesForSelected: possibleMovesForSelectedClone,
      selectedPiece: selectedPieceClone,
      isInCheck: isNextInCheck,
      gameOverFlags: gameOverFlagsClone,
      isPromotion: false,
    });
  }
  getBlankPossibleMovesForSelectedState() {
    const possibleMovesForSelectedClone =
      this.state.possibleMovesForSelected.slice();
    possibleMovesForSelectedClone.forEach((row) => {
      row.forEach((_, colIdx) => {
        row[colIdx] = false;
      });
    });
    return possibleMovesForSelectedClone;
  }
  setPossibleMovesForSelectedState(validMoves) {
    const possibleMovesForSelectedClone =
      this.state.possibleMovesForSelected.slice();
    // reset the possible moves array first
    possibleMovesForSelectedClone.forEach((row) => {
      row.forEach((_, colIdx) => {
        row[colIdx] = false;
      });
    });
    // set the valid moves
    validMoves.forEach((move) => {
      possibleMovesForSelectedClone[move[0]][move[1]] = true;
    });
    this.setState({
      ...this.state,
      possibleMovesForSelected: possibleMovesForSelectedClone,
    });
  }
  unselectPiece() {
    const selectedPieceClone = this.state.selectedPiece.slice();
    selectedPieceClone.forEach((_, idx) => {
      selectedPieceClone[idx] = -1;
    });
    this.setState({
      ...this.state,
      selectedPiece: selectedPieceClone,
      possibleMovesForSelected: this.getBlankPossibleMovesForSelectedState(),
    });
  }
  moveOrGetValidMoves(row, col) {
    if (this.state.isPromotion) {
      return;
    }
    // Clicking piece again > unselect
    if (
      this.state.selectedPiece[0] === row &&
      this.state.selectedPiece[1] === col
    ) {
      this.unselectPiece();
      return;
    }
    // Selecting a possible move of a selected piece > move the piece
    if (this.state.possibleMovesForSelected[row][col]) {
      this.movePiece(
        this.state.selectedPiece[0],
        this.state.selectedPiece[1],
        row,
        col
      );
      return;
    }
    // Selecting an empty square > unselect the piece
    if (this.state.board.boardArr[row][col] === null) {
      this.unselectPiece();
      return;
    }
    // Selecting a piece > get all possible moves of that piece
    else {
      if (
        this.state.board.boardArr[row][col].isWhite !== this.state.isWhiteTurn
      ) {
        const selectedPieceClone = this.state.selectedPiece.slice();
        selectedPieceClone.forEach((_, idx) => {
          selectedPieceClone[idx] = -1;
        });
        this.setState({
          ...this.state,
          selectedPiece: selectedPieceClone,
        });
      } else {
        const validMoves =
          this.state.allPossibleMoves[this.state.board.boardArr[row][col].id];
        this.setPossibleMovesForSelectedState(validMoves);
        this.setState({
          ...this.state,
          selectedPiece: [row, col],
        });
      }
      return;
    }
  }
  render() {
    let moveHistoryUx = [];
    for (let moveIdx in this.state.moveHistory) {
      if (moveIdx % 2 === 0) {
        moveHistoryUx.push([]);
      }
      moveHistoryUx[moveHistoryUx.length - 1].push(
        this.state.moveHistory[moveIdx]
      );
    }
    let gameStatus = "";
    if (this.state.gameOverFlags !== "") {
      gameStatus = this.state.gameOverFlags;
      gameStatus = gameStatus.toUpperCase() + "!";
      if (this.state.isWhiteTurn) {
        gameStatus += " Black wins!";
      } else {
        gameStatus += " White wins!";
      }
    } else {
      if (this.state.isInCheck) {
        gameStatus = "CHECK! ";
      }
      gameStatus += this.state.isWhiteTurn ? "WHITE TO MOVE" : "BLACK TO MOVE";
    }
    return (
      <div style={{ padding: "16px" }}>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td
                style={{
                  backgroundColor: this.state.isWhiteTurn
                    ? "#ffffff"
                    : "#000000",
                  color: this.state.isWhiteTurn ? "#000000" : "#ffffff",
                  textAlign: "center",
                }}
                colSpan="8"
              >
                {gameStatus}
              </td>
            </tr>
            {this.state.board.boardArr.map((row, rowNum) => (
              <tr key={rowNum}>
                <td>{convertZeroIndexToChessNotation(rowNum, null)}</td>
                {row.map((col, colNum) => (
                  <td
                    key={colNum}
                    style={{
                      backgroundColor:
                        (rowNum + colNum) % 2 === 0 ? "#d9ead3" : "#274e13",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        position: "relative",
                      }}
                      onClick={() => this.moveOrGetValidMoves(rowNum, colNum)}
                    >
                      <img
                        style={{ position: "relative", zIndex: 1 }}
                        alt={"piece"}
                        src={getPieceImage(col?.isWhite, col?.piece)}
                      />
                      {this.state.possibleMovesForSelected[rowNum][colNum] ? (
                        <img
                          style={{
                            position: "relative",
                            zIndex: 2,
                            top: "-48px",
                            left: "0px",
                          }}
                          alt={"possible move"}
                          src={possibleMoveImg}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td></td>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                <td key={`colName-${col}`} style={{ textAlign: "center" }}>
                  {convertZeroIndexToChessNotation(null, col)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div>
          {this.state.isPromotion ? (
            <>
              <button onClick={() => this.promotePawn(queenPiece())}>
                <img
                  style={{ position: "relative", zIndex: 1 }}
                  alt={"piece"}
                  src={getPieceImage(this.state.isWhiteTurn, queenPiece())}
                />
              </button>
              <button onClick={() => this.promotePawn(rookPiece())}>
                <img
                  style={{ position: "relative", zIndex: 1 }}
                  alt={"piece"}
                  src={getPieceImage(this.state.isWhiteTurn, rookPiece())}
                />
              </button>
              <button onClick={() => this.promotePawn(bishopPiece())}>
                <img
                  style={{ position: "relative", zIndex: 1 }}
                  alt={"piece"}
                  src={getPieceImage(this.state.isWhiteTurn, bishopPiece())}
                />
              </button>
              <button onClick={() => this.promotePawn(knightPiece())}>
                <img
                  style={{ position: "relative", zIndex: 1 }}
                  alt={"piece"}
                  src={getPieceImage(this.state.isWhiteTurn, knightPiece())}
                />
              </button>
            </>
          ) : (
            ""
          )}
        </div>
        <br />
        <table>
          <thead>
            <tr>
              <th>White</th>
              <th>Black</th>
            </tr>
          </thead>
          <tbody>
            {moveHistoryUx.map((movePair, idx) => (
              <tr key={idx}>
                <td>{movePair[0]}</td>
                <td>{movePair.length > 1 ? movePair[1] : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Chessboard;
