class Arena {
	constructor(w, h) {
		const matrix = [];
		//i.e., while "h" is not 0, hence, check the value first, and then decrement it
		while (h--) {
			// an array of length "w"
			matrix.push(new Array(w).fill(0));
		}
		this.matrix = matrix;
	}

	sweep() {
		let rowCount = 1;
		let score = 0;

		outer: for (let y = this.matrix.length - 1; y > 0; y--) {
			for (let x = 0; x < this.matrix[y].length; x++) {
				if (this.matrix[y][x] === 0) { // i.e., if a row is not fully populated
					// "outer" allows you to label embedded loops
					continue outer; // i.e., go back up to the "y" loop, and not the "x" loop
				}
			}

			// by using [0], we immediately reference the index "y" of the next row
			const row = this.matrix.splice(y, 1)[0].fill(0);
			// this adds the empty array to the top of the screen
			this.matrix.unshift(row);
			// after removing an index, we need to offset the y value
			y++;

			// so, every time the player clears a row, he/she wins 10 points
			score += rowCount * 10
			rowCount *= 2;
		}

		return score;
	}

	/**
	 * We've removed the "arena" argument, because now, that's
	 * going to be "this.matrix"
	 */
	collisionDetection(player) {
		const m = player.matrix;
		const o = player.pos;
		for (let y = 0; y < m.length; y++) {
			for (let x = 0; x < m[y].length; x++) { // this checks for each array in each piece
				/**
				 * Here, I tried just writing the code without the 
				 * "... !== 0" at each end, because I figured that
				 * if something is not 0, then it's true, because 0,
				 * "null", and "undefined" all come back as false,
				 * and everything else besides those three come back
				 * as true, but that totally fucked up the collision
				 * detection with the ground, and the piece just went
				 * flying down past the canvas. I still don't understand
				 * why that doesn't work.
				 */
				if (m[y][x] !== 0 &&
					// making sure the "arena" row exists
					(
						this.matrix[y + o.y] &&
						// once we've made sure the "this" row exists, we can access its child
						this.matrix[y + o.y][x + o.x]) !== 0
					) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * we don't need to pass "matrix" as an argument, because
	 * we'll always operate on "this.matrix"
	 */
	merge(player) {
		player.matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					this.matrix[y + player.pos.y][x + player.pos.x] = value;
				}
			});
		});
	}

	clear() {
		this.matrix.forEach(row => row.fill(0));
	}
}
