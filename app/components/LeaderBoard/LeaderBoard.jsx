
import React from 'react';

require('./LeaderBoard.css');

class LeaderBoard extends React.Component {
	constructor(props) {
		super(props);
	}

	fetchLeaderboard() {

		var leaderboard = [
			{ SNo: 1, Name: "Prateek", WinCount: 40 }
			, { SNo: 2, Name: "Saransh", WinCount: 30 }
		];
		this.setState({ leaderBoardList: leaderboard });

		fetch('https://10.127.128.56:8000/alphabets/leaderboard/')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ leaderBoardList: responseJson });
			})
			.catch((error) => {
				console.error(error);
			});
	}

	componentWillMount() {
		this.fetchLeaderboard();
	}

	render() {
		var list = [];

		for (var i = 0; i < this.state.leaderBoardList.length; i++) {
			list.push(<tr><th>{this.state.leaderBoardList[i].SNo}</th><th>{this.state.leaderBoardList[i].Name}</th><th>{this.state.leaderBoardList[i].WinCount}</th></tr>);
		}

		return (
			<div className="jumbotron">
				<div className="col-md-12"><h3>LeaderBoard</h3></div>

				{
					this.state.leaderBoardList && this.state.leaderBoardList.length &&
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Win Count</th>
							</tr>
						</thead>
						<tbody>
							{list}
						</tbody>
					</table>
				}

			</div>
		);
	}
}

export default LeaderBoard;
