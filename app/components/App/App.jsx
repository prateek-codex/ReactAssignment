import React from 'react';

require('./App.css');
import Board from '../Board/Board';
import WinDialog from '../WinDialog/WinDialog';
import Header from '../Header/Header';
import LeaderBoard from '../LeaderBoard/LeaderBoard';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			time: new Date(),
			gameState: 'started',
			moves: 0
		};

		this.timer = null;
		this.gameWon = this.gameWon.bind(this);
		this.newGameHandler = this.newGameHandler.bind(this);
		this.moveHandler = this.moveHandler.bind(this);
    	this.handleNameChage = this.handleNameChage.bind(this);
	}

	initializeList() {
		return fetch('/api/initialize')
			.then((response) => response.json())
			.then((responseJson) => {
				// this.setState({apiDataId: responseJson.id});

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

	componentWillUnmount() {
	}

	gameWon() {

		this.setState(function (state, props) {
			return {
				gameState: 'ended'
			}
		});

		// Post Data here
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

		var self = this;

		setTimeout(function () {

			self.setState(function (state, props) {
				return {
					gameState: 'started'
				}
			});
		}, 100);

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
				<div><Header newGame={this.newGameHandler} moves={this.state.moves} nameChange= {this.handleNameChage} /> </div>
				{
					this.state.gameState === 'started' &&
					<div>
						{
							this.state.apiDataId &&
							<Board dimensions={{ rows: 2, columns: 6 }} apiDataId={this.state.apiDataId} onWin={this.gameWon}
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
