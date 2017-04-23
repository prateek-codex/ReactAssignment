import React from 'react';
import Constants from '../../Lib/Constants'

class LeaderBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	fetchLeaderboard() {
		fetch(Constants.API_ENDPOINT_LEADERBOARD)
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
	componentWillReceiveProps(newProps) {
		if (newProps.leaderBoardList && newProps.leaderBoardList.length) {
			this.setState({ leaderBoardList: newProps.leaderBoardList });
		}
	}
	render() {
		var list = [];
		if (this.state.leaderBoardList) {
			for (var i = 0; i < this.state.leaderBoardList.length; i++) {
				list.push(<tr><th>{this.state.leaderBoardList[i].SNo}</th><th>{this.state.leaderBoardList[i].Name}</th><th>{this.state.leaderBoardList[i].WinCount}</th></tr>);
			}
		}
		return (
			<div className="jumbotron">
				<div className="col-md-12"><h3>LeaderBoard</h3></div>
				{
					this.state.leaderBoardList && this.state.leaderBoardList.length > 0 &&
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
