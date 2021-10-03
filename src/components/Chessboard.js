import React from 'react';
import emptySpace from '../resources/48x48_transparent.png';
import possibleMoveImg from '../resources/48x48_possible_move.png';
import blkBishop from '../resources/48x48_blk_bishop.png';
import blkKing from '../resources/48x48_blk_king.png';
import blkKnight from '../resources/48x48_blk_knight.png';
import blkPawn from '../resources/48x48_blk_pawn.png';
import blkQueen from '../resources/48x48_blk_queen.png';
import blkRook from '../resources/48x48_blk_rook.png';
import whtBishop from '../resources/48x48_wht_bishop.png';
import whtKing from '../resources/48x48_wht_king.png';
import whtKnight from '../resources/48x48_wht_knight.png';
import whtPawn from '../resources/48x48_wht_pawn.png';
import whtQueen from '../resources/48x48_wht_queen.png';
import whtRook from '../resources/48x48_wht_rook.png';

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
	let notation = '';
	if (col !== null) {
		// eslint-disable-next-line
		switch(col) {
			case 0:
				notation = 'a';
				break;
			case 1:
				notation = 'b';
				break;
			case 2:
				notation = 'c';
				break;
			case 3:
				notation = 'd';
				break;
			case 4:
				notation = 'e';
				break;
			case 5:
				notation = 'f';
				break;
			case 6:
				notation = 'g';
				break;
			case 7:
				notation = 'h';
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
function getMoveChessNotation(initRow, initCol, endRow, endCol, isCapture, _isEnPassant) {
	return convertZeroIndexToChessNotation(initRow, initCol)
	+ (isCapture ? 'x' : '')
	+ convertZeroIndexToChessNotation(endRow, endCol);
}

class Chessboard extends React.Component {
  constructor(props) {
		super(props);

		//# region Piece declarations
		const bRQs = { id: "RQs", isWhite: false, piece: rookPiece(), hasMoved: false };
		const bNQs = { id: "NQs", isWhite: false, piece: knightPiece() };
		const bBQs = { id: "BQs", isWhite: false, piece: bishopPiece() };
		const bQue = { id: "Que", isWhite: false, piece: queenPiece() };
		const bKin = { id: "Kin", isWhite: false, piece: kingPiece(), hasMoved: false };
		const bBKs = { id: "BKs", isWhite: false, piece: bishopPiece() };
		const bNKs = { id: "NKs", isWhite: false, piece: knightPiece() };
		const bRKs = { id: "RKs", isWhite: false, piece: rookPiece(), hasMoved: false };
		const bPRQ = { id: "PRQ", isWhite: false, piece: pawnPiece(), canBeEnPassanted: false };
		const bPNQ = { id: "PNQ", isWhite: false, piece: pawnPiece(), canBeEnPassanted: false };
		const bPBQ = { id: "PBQ", isWhite: false, piece: pawnPiece(), canBeEnPassanted: false };
		const bPQu = { id: "PQu", isWhite: false, piece: pawnPiece(), canBeEnPassanted: false };
		const bPKi = { id: "PKi", isWhite: false, piece: pawnPiece(), canBeEnPassanted: false };
		const bPBK = { id: "PBK", isWhite: false, piece: pawnPiece(), canBeEnPassanted: false };
		const bPNK = { id: "PNK", isWhite: false, piece: pawnPiece(), canBeEnPassanted: false };
		const bPRK = { id: "PRK", isWhite: false, piece: pawnPiece(), canBeEnPassanted: false };
		const wPRQ = { id: "PRQ", isWhite: true, piece: pawnPiece(), canBeEnPassanted: false };
		const wPNQ = { id: "PNQ", isWhite: true, piece: pawnPiece(), canBeEnPassanted: false };
		const wPBQ = { id: "PBQ", isWhite: true, piece: pawnPiece(), canBeEnPassanted: false };
		const wPQu = { id: "PQu", isWhite: true, piece: pawnPiece(), canBeEnPassanted: false };
		const wPKi = { id: "PKi", isWhite: true, piece: pawnPiece(), canBeEnPassanted: false };
		const wPBK = { id: "PBK", isWhite: true, piece: pawnPiece(), canBeEnPassanted: false };
		const wPNK = { id: "PNK", isWhite: true, piece: pawnPiece(), canBeEnPassanted: false };
		const wPRK = { id: "PRK", isWhite: true, piece: pawnPiece(), canBeEnPassanted: false };
		const wRQs = { id: "RQs", isWhite: true, piece: rookPiece(), hasMoved: false };
		const wNQs = { id: "NQs", isWhite: true, piece: knightPiece() };
		const wBQs = { id: "BQs", isWhite: true, piece: bishopPiece() };
		const wQue = { id: "Que", isWhite: true, piece: queenPiece() };
		const wKin = { id: "Kin", isWhite: true, piece: kingPiece(), hasMoved: false };
		const wBKs = { id: "BKs", isWhite: true, piece: bishopPiece() };
		const wNKs = { id: "NKs", isWhite: true, piece: knightPiece() };
		const wRKs = { id: "RKs", isWhite: true, piece: rookPiece(), hasMoved: false };
		//# endregion

		const board = {
			boardArr: [
				[ bRQs, bNQs, bBQs, bQue, bKin, bBKs, bNKs, bRKs ],
				[ bPRQ, bPNQ, bPBQ, bPQu, bPKi, bPBK, bPNK, bPRK ],
				[ null, null, null, null, null, null, null, null ],
				[ null, null, null, null, null, null, null, null ],
				[ null, null, null, null, null, null, null, null ],
				[ null, null, null, null, null, null, null, null ],
				[ wPRQ, wPNQ, wPBQ, wPQu, wPKi, wPBK, wPNK, wPRK ],
				[ wRQs, wNQs, wBQs, wQue, wKin, wBKs, wNKs, wRKs ]
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
					PRK: [1, 7]
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
					RKs: [7, 7]
				},
			},
		};

		const possibleMoves = [
			[ false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false ]
		];

		this.state = {
			selectedPiece: [-1, -1],
			isWhiteTurn: true,
			board: board,
			moveHistory: [],
			boardHistory: [board.boardArr.slice()],
			possibleMoves: possibleMoves,
			isWhiteInCheck: this.checkIfInCheck(board, true),
			isBlackInCheck: this.checkIfInCheck(board, false),
		}

		this.moveOrGetValidMoves = this.moveOrGetValidMoves.bind(this);
	}
	/**
	 * Assumption: validation has been done and the move is valid
	 */
	movePiece(initRow, initCol, endRow, endCol) {
		const moveHistoryClone = this.state.moveHistory.slice();
		const boardClone = { boardArr: this.state.board.boardArr.slice(), pieceIndex: { ...this.state.board.pieceIndex } };
		const { isCapture, isCastling } = this.makeMoveOnBoard(initRow, initCol, endRow, endCol, boardClone)
		const boardHistoryClone = this.state.boardHistory.slice();
		boardHistoryClone.push(boardClone.boardArr);
		moveHistoryClone.push(getMoveChessNotation(initRow, initCol, endRow, endCol, isCapture, isCastling));
		const possibleMovesClone = this.state.possibleMoves.slice();
		possibleMovesClone.forEach((row) => {
			row.forEach((_, colIdx) => {
				row[colIdx] = false;
			});
		});
		boardClone.boardArr.forEach((row) => {
			row.forEach((_, colIdx) => {
				if (row[colIdx] !== null
					&& isPiecePawn(row[colIdx])
					&& row[colIdx].isWhite !== this.state.isWhiteTurn) {
					row[colIdx].canBeEnPassanted = false;
				}
			});
		});
		const selectedPieceClone = this.state.selectedPiece.slice();
		selectedPieceClone.forEach((_, idx) => { selectedPieceClone[idx] = -1 });
		this.setState(
			{
				...this.state,
				board: boardClone,
				isWhiteTurn: !this.state.isWhiteTurn,
				moveHistory: moveHistoryClone,
				boardHistory: boardHistoryClone,
				possibleMoves: possibleMovesClone,
				selectedPiece: selectedPieceClone,
				isWhiteInCheck: this.checkIfInCheck(boardClone, true),
				isBlackInCheck: this.checkIfInCheck(boardClone, false),
			}
		);
	}
	makeMoveOnBoard(initRow, initCol, endRow, endCol, board) {
		// Check for castling
		let isCastling = false;
		let isCapture = board.boardArr[endRow][endCol] !== null;
		// TODO: ^^^Update piece index when any other pieces are added
		if (isPieceKing(board.boardArr[initRow][initCol]) && !board.boardArr[initRow][initCol].hasMoved) {
			// Move rook here, king will move with standard logic
			if (endCol === 2) {
				isCastling = true;
				const rookToMove = board.boardArr[initRow][0];
				board.boardArr[initRow][0] = null;
				board.boardArr[endRow][3] = rookToMove;
				// TODO: ^^^Update piece index when rooks are added
			}
			if (endCol === 6) {
				isCastling = true;
				const rookToMove = board.boardArr[initRow][7];
				board.boardArr[initRow][7] = null;
				board.boardArr[endRow][5] = rookToMove;
				// TODO: ^^^Update piece index when rooks are added
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
					board.boardArr[initRow][endCol] = null;
					// ^^^TODO: Update piece index when pawns are added
				}
			}
		}
		const pieceToMove = board.boardArr[initRow][initCol];
		board.boardArr[initRow][initCol] = null;
		board.boardArr[endRow][endCol] = pieceToMove;
		if (isPieceRook(pieceToMove) || isPieceKing(pieceToMove)) {
			pieceToMove.hasMoved = true;
		}
		if (isPieceKing(pieceToMove)) {
			if (pieceToMove.isWhite) {
				board.pieceIndex.white.Kin = [endRow, endCol]
			}
			else {
				board.pieceIndex.black.Kin = [endRow, endCol]
			}
		}
		return { isCapture: isCapture, isCastling: isCastling };
	}
	// checkIfInStalemate(colorToCheck) {

	// }
	checkIfInCheck(board, checkWhite) {
		// Use king: check if it can take any piece with that piece's movement
		let kingLoc = []
		if (checkWhite) {
			kingLoc = board.pieceIndex.white.Kin
		}
		else {
			kingLoc = board.pieceIndex.black.Kin
		}
		if (this.canKnightTakeKingAtPos(kingLoc[0], kingLoc[1], board, checkWhite)) {
			return true;
		}
		if (this.canRookOrQueenTakeKingAtPos(kingLoc[0], kingLoc[1], board, checkWhite)) {
			return true;
		}
		if (this.canBishopOrQueenTakeKingAtPos(kingLoc[0], kingLoc[1], board, checkWhite)) {
			return true;
		}
		if (this.canPawnTakeKingAtPos(kingLoc[0], kingLoc[1], board, checkWhite)) {
			return true;
		}
		return false;
	}
	getResetPossibleMovesState() {
		const possibleMovesClone = this.state.possibleMoves.slice();
		possibleMovesClone.forEach((row) => {
			row.forEach((_, colIdx) => {
				row[colIdx] = false;
			});
		});
		return possibleMovesClone;
	}
	setPossibleMovesState(validMoves) {
		const possibleMovesClone = this.state.possibleMoves.slice();
		// reset the possible moves array first
		possibleMovesClone.forEach((row) => {
			row.forEach((_, colIdx) => {
				row[colIdx] = false;
			});
		});
		// set the valid moves
		validMoves.forEach((move) => {
			possibleMovesClone[move[0]][move[1]] = true;
		});
		this.setState({
			...this.state,
			possibleMoves: possibleMovesClone
		});
	}
	unselectPiece() {
		const selectedPieceClone = this.state.selectedPiece.slice();
		selectedPieceClone.forEach((_, idx) => { selectedPieceClone[idx] = -1 });
		this.setState({
			...this.state,
			selectedPiece: selectedPieceClone,
			possibleMoves: this.getResetPossibleMovesState()
		});
	}
	moveOrGetValidMoves(row, col) {
		// Clicking piece again > unselect
		if (this.state.selectedPiece[0] === row && this.state.selectedPiece[1] === col) {
			this.unselectPiece();
			return;
		}
		// Selecting a possible move of a selected piece > move the piece
		if (this.state.possibleMoves[row][col]) {
			this.movePiece(this.state.selectedPiece[0], this.state.selectedPiece[1], row, col);
			return;
		}
		// Selecting an empty square > unselect the piece
		if (this.state.board.boardArr[row][col] === null) {
			this.unselectPiece();
			return;
		}
		// Selecting a piece > get all possible moves of that piece
		else {
			if (this.state.board.boardArr[row][col].isWhite !== this.state.isWhiteTurn) {
				const selectedPieceClone = this.state.selectedPiece.slice();
				selectedPieceClone.forEach((_, idx) => { selectedPieceClone[idx] = -1 });
				this.setState({
					...this.state,
					selectedPiece: selectedPieceClone
				});
			}
			else {
				const validMoves = this.getPieceValidMoves(row, col);
				this.setPossibleMovesState(validMoves);
				this.setState({
					...this.state,
					selectedPiece: [row, col],
				});
			}
			return;
		}
	}
	cloneBoard(board) {
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
					PRK: board.pieceIndex.black.PRK
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
					RKs: board.pieceIndex.white.RKs
				}
			}
		};
		for (const row of board.boardArr) {
			boardClone.boardArr.push([]);
			for (const square of row) {
				if (square !== null) {
					boardClone.boardArr[boardClone.boardArr.length - 1].push({ ...square });
				}
				else {
					boardClone.boardArr[boardClone.boardArr.length - 1].push(null);
				}
			}
		}
		return boardClone;
	}
	getPieceValidMoves(row, col) {
		let validMoves = [];
		const square = this.state.board.boardArr[row][col];
		let validMovesIgnoreCheck = [];
		if (square !== null) {
			if (this.state.isWhiteTurn === square.isWhite) {
				// eslint-disable-next-line
				switch (square.piece) {
					case pawnPiece():
						validMovesIgnoreCheck = this.getPawnValidMoves(row, col, square);
						break;
					case rookPiece():
						validMovesIgnoreCheck =  this.getRookValidMoves(row, col, square);
						break;
					case knightPiece():
						validMovesIgnoreCheck =  this.getKnightValidMoves(row, col, square);
						break;
					case bishopPiece():
						validMovesIgnoreCheck =  this.getBishopValidMoves(row, col, square);
						break;
					case queenPiece():
						validMovesIgnoreCheck =  this.getQueenValidMoves(row, col, square);
						break;
					case kingPiece():
						validMovesIgnoreCheck =  this.getKingValidMoves(row, col, square);
						break;
				}
			}
		}
		for (const move of validMovesIgnoreCheck) {
			let boardClone = this.cloneBoard(this.state.board);
			this.makeMoveOnBoard(row, col, move[0], move[1], boardClone);
			if (!this.checkIfInCheck(boardClone, this.state.isWhiteTurn)) {
				validMoves.push(move);
			}
		}
		return validMoves;
	}
	canPawnTakeKingAtPos(row, col, board, colorIsWhite) {
		let rowToCheck = row + moveForward(1, colorIsWhite);
		if (rowToCheck >= 8 || rowToCheck < 0) {
			return false;
		}
		const canCheckLeft = col !== 0;
		const canCheckRight = col !== 7;
		if (canCheckLeft
			&& board.boardArr[rowToCheck][col - 1] !== null
			&& board.boardArr[rowToCheck][col - 1].isWhite !== colorIsWhite
			&& isPiecePawn(board.boardArr[rowToCheck][col - 1])) {
			return true;
		}
		if (canCheckRight
			&& board.boardArr[rowToCheck][col + 1] !== null
			&& board.boardArr[rowToCheck][col + 1].isWhite !== colorIsWhite
			&& isPiecePawn(board.boardArr[rowToCheck][col + 1])) {
			return true;
		}
		return false;
	}
	getPawnValidMoves(row, col, square) {
		let validMoves = [];
		const canCheckLeft = col !== 0;
		const canCheckRight = col !== 7;
		if ((square.isWhite && row === 3) || (!square.isWhite && row === 4)) {
			// check left en passant
			if (canCheckLeft
				&& this.state.board.boardArr[row][col-1] !== null
				&& this.state.board.boardArr[row][col-1].canBeEnPassanted) {
				validMoves.push([row + moveForward(1, square.isWhite), col-1]);
			}
			// check right en passant
			if (canCheckRight
				&& this.state.board.boardArr[row][col+1] !== null
				&& this.state.board.boardArr[row][col+1].canBeEnPassanted) {
				validMoves.push([row + moveForward(1, square.isWhite), col+1]);
			}
		}
		if ((square.isWhite && row === 6) || (!square.isWhite && row === 1)) {
			// check 2 in front
			if (this.state.board.boardArr[row + moveForward(2, square.isWhite)][col] === null) {
				validMoves.push([row + moveForward(2, square.isWhite), col]);
			}
		}
		// check 1 in front
		if (this.state.board.boardArr[row + moveForward(1, square.isWhite)][col] === null) {
			validMoves.push([row + moveForward(1, square.isWhite), col]);
		}
		// check left capture
		if (canCheckLeft
			&& this.state.board.boardArr[row + moveForward(1, square.isWhite)][col-1] !== null
			&& (this.state.board.boardArr[row + moveForward(1, square.isWhite)][col-1].isWhite !== square.isWhite)) {
			validMoves.push([row + moveForward(1, square.isWhite), col-1]);
		}
		// check right capture
		if (canCheckRight
			&& this.state.board.boardArr[row + moveForward(1, square.isWhite)][col+1] !== null
			&& (this.state.board.boardArr[row + moveForward(1, square.isWhite)][col+1].isWhite !== square.isWhite)) {
			validMoves.push([row + moveForward(1, square.isWhite), col+1]);
		}
		return validMoves;
	}
	canKnightTakeKingAtPos(row, col, board, colorIsWhite) {
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
			if (move.cRow >= 0 && move.cCol >= 0 && move.cRow < 8 && move.cCol < 8 &&
				board.boardArr[move.cRow][move.cCol] !== null &&
				board.boardArr[move.cRow][move.cCol].isWhite !== colorIsWhite &&
				isPieceKnight(board.boardArr[move.cRow][move.cCol])) {
				canTake = true;
				return;
			}
		});
		return canTake;
	}
	getKnightValidMoves(row, col, square) {
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
			if (move.cRow >= 0 && move.cCol >= 0 && move.cRow < 8 && move.cCol < 8 && (
				this.state.board.boardArr[move.cRow][move.cCol] === null || this.state.board.boardArr[move.cRow][move.cCol].isWhite !== square.isWhite)) {
				validMoves.push([move.cRow, move.cCol]);
			}
		});
		return validMoves;
	}
	// TODO: check castling through check
	getKingValidMoves(row, col, square) {
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
			if (move.cRow >= 0 && move.cCol >= 0 && move.cRow < 8 && move.cCol < 8 && (
				this.state.board.boardArr[move.cRow][move.cCol] === null || this.state.board.boardArr[move.cRow][move.cCol].isWhite !== square.isWhite)) {
				validMoves.push([move.cRow, move.cCol]);
			}
		});
		// Check if castling is allowed
		if (!square.hasMoved) {
			if (this.state.board.boardArr[row][0] !== null
				&& !this.state.board.boardArr[row][0].hasMoved) {
				if (this.state.board.boardArr[row][1] === null
					&& this.state.board.boardArr[row][2] === null
					&& this.state.board.boardArr[row][3] === null
					) {
						validMoves.push([row, col - 2]);
					}
			}
			if (this.state.board.boardArr[row][7] !== null
				&& !this.state.board.boardArr[row][7].hasMoved) {
				if (this.state.board.boardArr[row][5] === null
					&& this.state.board.boardArr[row][6] === null
					) {
						validMoves.push([row, col + 2]);
					}
			}
		}
		return validMoves;
	}
	canCheckLambda(currRow, currCol, board, currIsWhite, currRowUpdate, currColUpdate, piecesToCheck) {
		while(currRow >= 0 && currCol >= 0 && currRow < 8 && currCol < 8) {
			if (board.boardArr[currRow][currCol] !== null) {
				if (piecesToCheck.includes(board.boardArr[currRow][currCol].piece)
					&& board.boardArr[currRow][currCol].isWhite !== currIsWhite) {
					return true;
				}
				else {
					return false;
				}
			}
			currRow = currRowUpdate(currRow);
			currCol = currColUpdate(currCol);
		}
		return false
	}
	getValidMovesLambda(currRow, currCol, currIsWhite, currRowUpdate, currColUpdate) {
		let validMoves = [];
		while(currRow >= 0 && currCol >= 0 && currRow < 8 && currCol < 8) {
			if (this.state.board.boardArr[currRow][currCol] === null) {
				validMoves.push([currRow, currCol]);
			}
			else {
				if (this.state.board.boardArr[currRow][currCol].isWhite !== currIsWhite) {
					validMoves.push([currRow, currCol]);
				}
				break;
			}
			currRow = currRowUpdate(currRow);
			currCol = currColUpdate(currCol);
		}
		return validMoves
	}
	canRookOrQueenTakeKingAtPos(row, col, board, checkWhite) {
		const piecesToCheck = [rookPiece(), queenPiece()];
		// check left
		if (this.canCheckLambda(
			row,
			col - 1,
			board,
			checkWhite,
			(r) => { return r; },
			(c) => { return c - 1; },
			piecesToCheck
			)) {
			return true;
		}
		// check right
		if (this.canCheckLambda(
			row,
			col + 1,
			board,
			checkWhite,
			(r) => { return r; },
			(c) => { return c + 1; },
			piecesToCheck
			)) {
			return true;
		}
		// check down
		if (this.canCheckLambda(
			row + 1,
			col,
			board,
			checkWhite,
			(r) => { return r + 1; },
			(c) => { return c; },
			piecesToCheck)) {
			return true;
		}
		// check up
		if (this.canCheckLambda(
			row - 1,
			col,
			board,
			checkWhite,
			(r) => { return r - 1; },
			(c) => { return c; },
			piecesToCheck)) {
			return true;
		}
		return false;
	}
	getRookValidMoves(row, col, square) {
		let validMoves = [];
		// check left
		const validMovesLeft = this.getValidMovesLambda(row, col - 1, square.isWhite, (r) => { return r; }, (c) => { return c - 1; });
		validMoves = validMoves.concat(validMovesLeft);
		// check right
		const validMovesRight = this.getValidMovesLambda(row, col + 1, square.isWhite, (r) => { return r; }, (c) => { return c + 1; })
		validMoves = validMoves.concat(validMovesRight);
		// check down
		const validMovesDown = this.getValidMovesLambda(row + 1, col, square.isWhite, (r) => { return r + 1; }, (c) => { return c; });
		validMoves = validMoves.concat(validMovesDown);
		// check up
		const validMovesUp = this.getValidMovesLambda(row - 1, col, square.isWhite, (r) => { return r - 1; }, (c) => { return c; });
		validMoves = validMoves.concat(validMovesUp);
		return validMoves;
	}
	canBishopOrQueenTakeKingAtPos(row, col, board, checkWhite) {
		const piecesToCheck = [bishopPiece(), queenPiece()];
		// check up-left
		if (this.canCheckLambda(
			row - 1,
			col - 1,
			board,
			checkWhite,
			(r) => { return r - 1; },
			(c) => { return c - 1; },
			piecesToCheck)) {
			return true;
		}
		// check up-right
		if (this.canCheckLambda(
			row - 1,
			col + 1,
			board,
			checkWhite,
			(r) => { return r - 1; },
			(c) => { return c + 1; },
			piecesToCheck)) {
			return true;
		}
		// check down-left
		if (this.canCheckLambda(
			row + 1,
			col - 1,
			board,
			checkWhite,
			(r) => { return r + 1; },
			(c) => { return c - 1; },
			piecesToCheck)) {
			return true;
		}
		// check down-right
		if (this.canCheckLambda(
			row + 1,
			col + 1,
			board,
			checkWhite,
			(r) => { return r + 1; },
			(c) => { return c + 1; },
			piecesToCheck)) {
			return true;
		}
		return false;
	}
	getBishopValidMoves(row, col, square) {
		let validMoves = [];
		// check up-left
		const validMovesUpLeft = this.getValidMovesLambda(row - 1, col - 1, square.isWhite, (r) => { return r - 1; }, (c) => { return c - 1; });
		validMoves = validMoves.concat(validMovesUpLeft);
		// check up-right
		const validMovesUpRight = this.getValidMovesLambda(row - 1, col + 1, square.isWhite, (r) => { return r - 1; }, (c) => { return c + 1; });
		validMoves = validMoves.concat(validMovesUpRight);
		// check down-left
		const validMovesDownLeft = this.getValidMovesLambda(row + 1, col - 1, square.isWhite, (r) => { return r + 1; }, (c) => { return c - 1; });
		validMoves = validMoves.concat(validMovesDownLeft);
		// check down-right
		const validMovesDownRight = this.getValidMovesLambda(row + 1, col + 1, square.isWhite, (r) => { return r + 1; }, (c) => { return c + 1; });
		validMoves = validMoves.concat(validMovesDownRight);
		return validMoves;
	}
	getQueenValidMoves(row, col, square) {
		return this.getRookValidMoves(row, col, square).concat(this.getBishopValidMoves(row, col, square));
	}
	render() {
		let moveHistoryUx = [];
		for (let moveIdx in this.state.moveHistory) {
			if (moveIdx % 2 === 0) {
				moveHistoryUx.push([]);
			}
			moveHistoryUx[moveHistoryUx.length - 1].push(this.state.moveHistory[moveIdx]);
		}
		return (
			<div style={{ padding: '16px' }}>
				<table>
					<tbody>
						<tr>
							<td></td>
							<td 
								style={{ 
									backgroundColor: this.state.isWhiteTurn ? '#ffffff' : '#000000',
									color: this.state.isWhiteTurn ? '#000000' : '#ffffff',
									textAlign: 'center' }}
								colSpan='8'
							>{this.state.isWhiteTurn ? 'WHITE' : 'BLACK'} TO MOVE</td>
						</tr>
						{
							this.state.board.boardArr.map((row, rowNum) => 
								<tr key={rowNum}>
									<td>{convertZeroIndexToChessNotation(rowNum, null)}</td>
								{
									row.map((col, colNum) =>
											<td key={colNum} style={{ backgroundColor: ((rowNum + colNum) % 2 === 0) ? '#d9ead3' : '#274e13' }}>
												<div
													style={{ width: '48px', height: '48px', position: 'relative' }}
													onClick={() => this.moveOrGetValidMoves(rowNum, colNum)} >
													<img style={{ position: 'relative', zIndex: 1 }} alt={'piece'} src={getPieceImage(col?.isWhite, col?.piece)} />
													{
														this.state.possibleMoves[rowNum][colNum]
														? <img
																style={{ position: 'relative', zIndex: 2, top: '-48px', left: '0px' }}
																alt={'possible move'}
																src={possibleMoveImg} />
														: <></>
													}
												</div>
											</td>
									)
								}
								</tr>
							)
						}
						<tr>
							<td></td>
							{
								[0, 1, 2, 3, 4, 5, 6, 7].map((col) => 
									<td key={`colName-${col}`} style={{ textAlign: 'center' }}>{convertZeroIndexToChessNotation(null, col)}</td>
								)
							}
						</tr>
						<tr>
							<td></td>
							<td 
								style={{ 
									backgroundColor: this.state.isBlackInCheck ? '#000000' : '#ffffff',
									color: this.state.isBlackInCheck ? '#ffffff' : '#000000',
									textAlign: 'center' }}
								colSpan='8'
							>{this.state.isWhiteInCheck ? '** WHITE IN CHECK **' : (this.state.isBlackInCheck ? '** BLACK IN CHECK **' : '')}</td>
						</tr>
					</tbody>
				</table>
				<br/>
				<p>White king: {
					convertZeroIndexToChessNotation(
						this.state.board.pieceIndex.white.Kin[0],
						this.state.board.pieceIndex.white.Kin[1]
					)}</p>
				<p>Black king: {
					convertZeroIndexToChessNotation(
						this.state.board.pieceIndex.black.Kin[0],
						this.state.board.pieceIndex.black.Kin[1]
					)}</p>
				<br/>
				<table>
					<thead>
						<tr>
							<th>White</th>
							<th>Black</th>
						</tr>
					</thead>
					<tbody>
						{moveHistoryUx.map((movePair, idx) => 
							<tr key={idx}>
								<td>{movePair[0]}</td>
								<td>{movePair.length > 1 ? movePair[1] : ''}</td>
							</tr>
						)}
					</tbody>
				</table>
				
			</div>
		);
	}
}

function getPieceImage(isWhite, piece) {
	// eslint-disable-next-line
	switch(piece) {
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

export default Chessboard;
