import React from 'react';

import Board from '../Board/Board';
import WinDialog from '../WinDialog/WinDialog';
import Header from '../Header/Header';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import Constants from '../../Lib/Constants'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gameState: Constants.GAME_STATE_STARTED,
			moves: 0
		};
		this.gameCompleted = this.gameCompleted.bind(this);
		this.newGameHandler = this.newGameHandler.bind(this);
		this.moveHandler = this.moveHandler.bind(this);
		this.handleNameChage = this.handleNameChage.bind(this);
	}
	initializeList() {
		return fetch(Constants.API_ENDPOINT_INITIALIZE)
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
				gameState: Constants.GAME_STATE_ENDED
			}
		});
		fetch(Constants.API_ENDPOINT_LEADERBOARD, {
			method: Constants.HTTP_POST_METHOD,
			headers: {
				'Accept': Constants.HTTP_APPLICATION_TYPE_JSON,
				'Content-Type': Constants.HTTP_APPLICATION_TYPE_JSON,
			},
			body: JSON.stringify({
				name: this.state.name
			})
		})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ leaderBoardList: responseJson });
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
				gameState: Constants.GAME_STATE_NEW
			}
		});
		setTimeout(function () {
			this.setState(function (state, props) {
				return {
					gameState: Constants.GAME_STATE_STARTED
				}
			});
		}.bind(this), 100);
		this.initializeList();
	}
	handleNameChage(event) {
		this.setState({ name: event.target.value });
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
						nameChange={this.handleNameChage} />
				</div>
				{
					this.state.gameState === Constants.GAME_STATE_STARTED &&
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
					this.state.gameState === Constants.GAME_STATE_ENDED &&
					<WinDialog />
				}
				<LeaderBoard leaderBoardList={this.state.leaderBoardList} />
			</div>
		);
	}
}
export default App;
