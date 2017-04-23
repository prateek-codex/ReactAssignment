import React from 'react';

import Board from '../Board/Board';
import WinDialog from '../WinDialog/WinDialog';
import Header from '../Header/Header';
import LeaderBoard from '../LeaderBoard/LeaderBoard';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gameState: 'started',
			moves: 0
		};
		this.gameCompleted = this.gameCompleted.bind(this);
		this.newGameHandler = this.newGameHandler.bind(this);
		this.moveHandler = this.moveHandler.bind(this);
    	this.handleNameChage = this.handleNameChage.bind(this);
	}
	initializeList() {
		return fetch('/api/initialize')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(function (state, props) {
					return {
						apiDataId: responseJson.id
					}
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	componentDidMount() {
		this.initializeList();
	}
	gameCompleted() {
		this.setState(function (state, props) {
			return {
				gameState: 'ended'
			}
		});
		fetch('/api/leaderboard', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.name
				})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({leaderBoardList: responseJson});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	newGameHandler() {
		this.setState(function (state, props) {
			return {
				moves: 0
			}
		});
		this.setState(function (state, props) {
			return {
				gameState: 'new'
			}
		});
		setTimeout(function () {
			self.setState(function (state, props) {
				return {
					gameState: 'started'
				}
			});
		}, 100, this);
		this.initializeList();
	}
	handleNameChage(event) {
    	this.setState({name: event.target.value});
  	}
	moveHandler() {
		var moveCount = ++this.state.moves;
		this.setState(function (state, props) {
			return {
				moves: moveCount
			}
		});
	}
	render() {
		return (
			<div className="container">
				<div>
					<Header newGame={this.newGameHandler}
							 moves={this.state.moves}
							 nameChange= {this.handleNameChage} />
				</div>
				{
					this.state.gameState === 'started' &&
					<div>
						{
							this.state.apiDataId &&
							<Board dimensions={{ rows: 2, columns: 6 }}
								   apiDataId={this.state.apiDataId}
								   onWin={this.gameCompleted}
								   move={this.moveHandler} />
						}
					</div>
				}
				{
					this.state.gameState === 'ended' &&
					<WinDialog />
				}
				<LeaderBoard leaderBoardList = {this.state.leaderBoardList} />
			</div>
		);
	}
}
export default App;
