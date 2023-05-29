/*
var mainPort = "", secondaryPort = "";

async function findBoards() {
	await eel.connectBoards("", "")().then(async firstBoard => {
		console.log(firstBoard);
		if (firstBoard[1] == "main"){
			console.log(35824);
			mainPort = firstBoard[0];
			foundMain();
			await eel.connectBoards(firstBoard[0], "")().then(secondBoard => {
				secondaryPort = secondBoard[0];
				console.log(secondBoard);
				foundSecondary();
			});
		} else {
			console.log(6969420);
			secondaryPort = firstBoard[0];
			foundSecondary();
			await eel.connectBoards("", firstBoard[0])().then(secondBoard => {
				mainPort = secondBoard[0];
				console.log(secondBoard);
				foundMain();
			});
		}
		console.log(firstBoard);
	});
}

findBoards();
*/