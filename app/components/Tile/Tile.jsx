import React from 'react';
require('./Tile.css');
class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			matched: false
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ open: nextProps.openedCharList.indexOf(this.state.character) > -1
							  || (nextProps.currentChar === this.state.character
							  && nextProps.openKey == this.props.tileKey) });
	}
	getCharacter() {
		fetch('/api/getCharacter/' + this.props.apiDataId)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({character: responseJson.char});
			})
			.catch((error) => {
				console.error(error);
			});

		var open = this.props.openedCharList.indexOf(this.state.character) > -1;
		this.setState({ open: open});
	}
	componentDidMount() {
		this.getCharacter();
	}
  handleClick(index) {
	  var state = !this.state.open;
	  this.setState({open : state});
	  this.setState({clicked : state});
		var self = this;
		setTimeout(function() {
			if(state) {
				self.props.onClick(self.state.character, self.props.tileKey);
			}
			else
			{
				self.props.onClick(null, null);
			}
		}, 200);
	}
	render() {
		return (
			<div className={this.state.open ? "tile tile-open" : "tile tile-close"} onClick={this.handleClick.bind(this)}>
				<span className="character">{this.state.character}</span>
			</div>
		);
	}
}
export default Tile;
