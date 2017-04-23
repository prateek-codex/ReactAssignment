import React from 'react';

require('./App.css');
import Board from '../Board/Board';
import WinDialog from '../WinDialog/WinDialog';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			time: new Date(),
			gameState: 'started'
		};

		this.timer = null;
		this.gameWon = this.gameWon.bind(this);
	}

	initializeList() {
		return fetch('https://10.127.128.56:8000/alphabets/getchars/6')
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
    }

	render() {
		return (
			<div>
			<div><h1>Remember the Alphabet Game</h1></div>
			
			<div><h1>Remember the Alphabet Game</h1></div>
			{
				this.state.gameState === 'started' && 
				<div>
					{
						this.state.apiDataId &&
						<Board dimensions = {{rows: 2, columns: 6}} apiDataId = {this.state.apiDataId} onWin = {this.gameWon}/>
					}
				</div>
			}
			{
				this.state.gameState === 'ended' &&
				<WinDialog />
			}
			</div>
		);
	}
}

export default App;
