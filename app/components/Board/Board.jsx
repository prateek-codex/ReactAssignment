
import React from 'react';
import Tile from '../Tile/Tile';

require('./Board.css');

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			apiDataId: props.apiDataId,
			apiShuffleDataId: null,
			currentChar: null,
			openedCharList: []
		};

    // This binding is necessary to make `this` work in the callback
    this.clickHandler = this.clickHandler.bind(this);
	}

	shuffleBoard() {
		fetch('/api/shuffle/' + this.props.apiDataId)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({apiShuffleDataId: responseJson.id});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	componentWillMount() {
		this.shuffleBoard();
	}

	componentDidMount() {
	}

    clickHandler(char, tileKey) {

		this.props.move();

		if(!this.state.currentChar) {
			this.setState(function (state, props) {
				return {
					currentChar: char,
					openKey: tileKey
				}
			});
		}
		else
		{
			if(this.state.currentChar == char){
				// Matched, keep both open
				var openedChars = this.state.openedCharList;
				openedChars.push(char);

				this.setState(function (state, props) {
					return {
						openedCharList: openedChars
					}
				});

				if(this.state.openedCharList.length === 6) {
					this.props.onWin();
				}
			}
			else {
				// Not matched, close both
				// this.updateTileState();
			}

			this.setState(function (state, props) {
				return {
					currentChar: null
				}
			});

			// re-render dont know why it is not working
			// this.forceUpdate()
		}
    }

	// updateTileState(rows, columns) {
	// 	var tileState = [];
	// 	for(var i=0; i<this.props.dimensions.rows; i++){
	// 		var tileRowState = [];
	// 		for(var j=0; j<this.props.dimensions.columns; j++) {
	// 			tileRowState.push(this.state.openedCharList.)
	// 		}
	// 		tileState.push(tileRowState);
	// 	}

	// 		this.setState(function (state, props) {
	// 			return {
	// 				tilesState: tileState
	// 			}
	// 		});
	// }

	render() {

		var tileRows = [];
		var self = this;
		for(var i=0; i<this.props.dimensions.rows; i++){
			var tiles = [];
			for(var j=0; j<this.props.dimensions.columns; j++) {
				tiles.push(<Tile tileKey={i + '' + j} apiDataId={i == 0 ? this.state.apiDataId : this.state.apiShuffleDataId} onClick = {this.clickHandler} openedCharList={this.state.openedCharList}
				currentChar={this.state.currentChar} openKey = {this.state.openKey}
				/>);
			}
			tileRows.push(tiles);
		}
		return (
			<div>
			{
				this.state.apiShuffleDataId && !this.state.ended &&
				<div>
				{
					tileRows.map(function(tileRow, i){
						return <div className= "tile-row" > {tileRow} </div>;
					}, this)
				}
				</div>
			}
			</div>
		);
	}
}

export default Board;
