class Tetris {
	constructor(element) {
		this.element = element;
		this.canvas = element.querySelector('canvas');
		this.context = this.canvas.getContext('2d');
		this.context.scale(20, 20);

		this.colors = [
			null,
			'#ff0d72',
			'#0dc2ff',
			'#0dff72',
			'#f538ff',
			'#ff8e0d',
			'#ffe138',
			'#3877ff'
		];

        this.arena = new Arena(12, 20);
		this.player = new Player(this);
		let lastTime = 0;

		const update = (time = 0) => {
			const deltaTime = time - lastTime;

			/**
			 * Here, while watching through the video, I'd made the
			 * mistake of putting this "last time" declaration
			 * before the If statement (which is now in the "Player"
			 * constructor() method), and this practically drove
			 * me fucking insane, because the pieces correctly
			 * checked out in collision detection with the walls,
			 * and when checking for collision detection with the
			 * ground, it also worked perfectly fine SO LONG AS I
			 * was pressing the Down arrow and personally moving the
			 * piece myself, but when I'd have the Down arrow free
			 * and a piece was descending on its own, the collision-
			 * detection would fail, and the piece would fall right
			 * through the ground (or through another piece), and the
			 * game would become unplayable. I don't understand why.
			 */
			lastTime = time;

			this.player.update(deltaTime);

			this.draw();
			requestAnimationFrame(update);
		};

		update();

		this.updateScore(0);
	}

	draw() {
		this.context.fillStyle = '#000';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawMatrix(this.arena.matrix, {x: 0, y: 0});
		this.drawMatrix(this.player.matrix, this.player.pos);
	}

	drawMatrix(matrix, offset) {
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					this.context.fillStyle = this.colors[value];
					this.context.fillRect(
						x + offset.x,
						y + offset.y,
						1, 1
					);
				}
			});
		});
	}

	updateScore(score) {
		this.element.querySelector('.score').innerText = score;
	}
}
