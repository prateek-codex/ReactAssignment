describe("Leaderboard Tests", function () {

	let leaderboard = require('../Leaderboard');
	beforeEach(function () {
		leaderboard.Data = [];
	});

	it("should add a value in leaderboard", function () {
		leaderboard.UpdateLeaderBoard("Prateek");
		expect(leaderboard.Data.length).toBe(1);
		expect(leaderboard.Data[0].Name).toBe('Prateek');
	});

	it("should fetch values from leaderboard", function () {
		leaderboard.UpdateLeaderBoard("Test");
		let actualData = leaderboard.GetLeaderBoard()
		expect(actualData.length).toBe(1);
		expect(actualData[0].Name).toBe('Test');
	});

});
