import React from 'react';

require('./App.css');
import Board from '../Board/Board';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			time: new Date(),
		};

		this.timer = null;
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

	render() {
		return (
			<div>
				<h1>Remember the Alphabet Game</h1>
				{
					this.state.apiDataId &&
					<Board dimensions = {{rows: 2, columns: 6}} apiDataId = {this.state.apiDataId}/>
      			}
			</div>
		);
	}
}

export default App;
