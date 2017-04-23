
import React from 'react';

require('./WinDialog.css');

class WinDialog extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		return (
			<div>
				<h1>You Won! Press "Play" to play again.</h1>
			</div>
		);
	}
}

export default WinDialog;
