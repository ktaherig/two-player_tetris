class Player {
	constructor(tetris) {
		this.DROP_SLOWLY = 1000;
		this.DROP_FAST = 50;

		this.tetris = tetris;
		this.arena = tetris.arena;

		this.dropCounter = 0;
		this.dropInterval = this.DROP_SLOWLY;

		this.pos = {x: 0, y: 0};
		this.matrix = null;
		this.score = 0;

		this.reset();
	};

	move(direction) {
		this.pos.x += direction;
		if (this.arena.collisionDetection(this)) {
			this.pos.x -= direction;
		}
	}

	rotate(direction) {
		const position = this.pos.x;
		let offset = 1;
		this._rotateMatrix(this.matrix, direction);
		/**
		 * we use a While loop here because we don't
		 * know which way we're turning until we
		 * actually turn, nor do we know how big a
		 * piece is until the piece actually appears.
		 *
		 * This makes sure that when we rotate, the
		 * piece doesn't actually rotate into the wall.
		 */
		while (this.arena.collisionDetection(this)) {
			this.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1))

			if (offset > this.matrix[0].length) {
				this._rotateMatrix(this.matrix, -direction);
				this.pos.x = position;
				return;
			}
		}
	}

	/**
	 * this was initially called "rotate()" as well, but it
	 * had to be renamed in order to avoid a naming conflict
	 * with the other "rotate()"
	 */
	_rotateMatrix(matrix, direction) {
		for (let y = 0; y < matrix.length; y++) {
			for (let x = 0; x < y; x++) {
				[
					matrix[x][y],
					matrix[y][x]
				] = [
					matrix[y][x],
					matrix[x][y]
				];
			}
		}

		if (direction > 0) {
			matrix.forEach(row => row.reverse());
		} else {
			matrix.reverse();
		}
	}

	drop() {
		this.pos.y++;
		if (this.arena.collisionDetection(this)) {
			/**
			 * Here, we're checking to see if a piece has collided
			 * with either the ground or any other piece. If it has,
			 * then we move that particular piece one step upwards,
			 * and this way, the pieces actually stay where they are,
			 * instead of continually moving downwards.
			 */
			this.pos.y--;
			this.arena.merge(this);
			/**
			 * At this point, we've confirmed that a particular piece
			 * has collided with something (either with the ground, or
			 * with another piece), and so we need to reset "y" to 0
			 * so that we can start drawing another piece at the top of
			 * the screen and continue the game.
			 */
			this.reset();
			this.score += this.arena.sweep();
			this.tetris.updateScore(this.score);
		}
		this.dropCounter = 0;
	}

	update(deltaTime) {
		this.dropCounter += deltaTime;

		if (this.dropCounter > this.dropInterval) {
			this.drop();
		}
	}

	reset() {
		const pieces = 'ILJOTSZ';
		// the "| 0" means "floored" (i.e., with the decimal places removed)
		this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
		this.pos.y = 0
		this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
			(this.matrix[0].length / 2 | 0);
		if (this.arena.collisionDetection(this)) {
			this.arena.clear();
			this.score = 0;
			//		updateScore();
		}
	}
}
