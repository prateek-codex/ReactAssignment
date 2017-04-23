import React from 'react';
require('./Tile.css');

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			matched: false
		};
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		let isOpen = nextProps.openedCharList.indexOf(this.state.character) > -1
			|| (nextProps.currentChar === this.state.character
				&& nextProps.openKey == this.props.tileKey);
		this.setState(function (state, props) {
				return {
					open: isOpen
				}
			});
	}
	getCharacter() {
		fetch('/api/getCharacter/' + this.props.apiDataId)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(function (state, props) {
				return {
					character: responseJson.char
				}
			});
			})
			.catch((error) => {
				console.error(error);
			});

		let open = this.props.openedCharList.indexOf(this.state.character) > -1;
		this.setState(function (state, props) {
				return {
					open: open
				}
			});
	}
	componentDidMount() {
		this.getCharacter();
	}
	handleClick(index) {
		let state = !this.state.open;
		this.setState(function (state, props) {
				return {
					open: state,
					clicked: state
				}
			});
		setTimeout(function () {
			if (state) {
				this.props.onClick(this.state.character, this.props.tileKey);
			}
			else {
				this.props.onClick(null, null);
			}
		}.bind(this), 200);
	}
	render() {
		return (
			<div className={
				this.state.open
					? "tile tile-open"
					: "tile tile-close"
			}
				onClick={this.handleClick}>
				<span className="character">{this.state.character}</span>
			</div>
		);
	}
}
export default Tile;
