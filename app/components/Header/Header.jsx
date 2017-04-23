
import React from 'react';

require('./Header.css');

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		return (
			<div>
				<button className="btn btn-primary">
		        	onClick={this.props.newGame}>Play
				</button>
				<button
		        	onClick={this.props.newGame}>Reset
				</button>
				Moves: {this.props.moves}
			</div>
		);
	}
}

export default Header;
