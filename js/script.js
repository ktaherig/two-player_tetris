const matrix = [
	[0,0,0],
	[1,1,1],
	[0,1,0]
];

const tetri = []; // i.e., multiple tetris things

const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
	/**
	 * Normally, the "canvas" const would go at the top, but
	 * in this case, we need to repeat this for each one of
	 * the two Tetris playing windows individually.
	 */
	//const canvas = element.querySelector('canvas');
	const tetris = new Tetris(element);

	tetri.push(tetris);
});

	/**
	 * key controls
	 * "1" -> 49
	 * "2" -> 50
	 * "3" -> 51
	 * "4" -> 52
	 *
	 * "7" -> 55
	 * "8" -> 56
	 * "9" -> 57
	 * "0" -> 48
	 */

const keyListener = (event) => {
	/**
	 * In the video, Pontius uses a series of If/ElseIf
	 * statements, but I personally find that to be
	 * kind of inefficient, so I substituted a Switch
	 * statement here instead.
	 */
	[
		[49, 50, 51, 52],
		[48, 55, 56, 57]
	].forEach((key, index) => {
		const player = tetri[index].player;

		if (event.type === 'keydown') {
			if (event.keyCode === key[1]) {
				// move left
				player.move(-1);
			} else if (event.keyCode === key[3]) {
				// move right
				player.move(1);
			} else if (event.keyCode === key[0]) {
				// rotate the piece (with either the up arrow or the space bar)
				player.rotate(-1);
			}
		}

		if (event.keyCode === key[2]) {
			// hurry down
			if (event.type === 'keydown') {
				if (player.dropInterval !== player.DROP_FAST) {
					player.drop();
					player.dropInterval = player.DROP_FAST;
				}
			} else {
				player.dropInterval = player.DROP_SLOWLY;
			}
		}

	});

};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);

function createPiece(type)
{
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
	}
}

