
 import React from 'react';

require('./Tile.css');

class Tile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			matched: false,
			clicked: false
		};

	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({ open: (nextProps.openedCharList.indexOf(this.state.character) > -1 || nextProps.currentChar === this.state.character) && this.state.clicked });  
	}

	getCharacter() {
		fetch('https://10.127.128.56:8000/alphabets/get/' + this.props.apiDataId + '/1')
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

	  if(state) {
	  	this.props.onClick(this.state.character);
	  }
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
