
import React from 'react';

require('./LeaderBoard.css');

class LeaderBoard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		return (
			<div className="jumbotron">
				<div className="col-md-12"><h1>Remember the Alphabet Game</h1></div>
				<div className="row">
					<div className="col-md-2">
						<button className="btn btn-primary"
							onClick={this.props.newGame}>Play
						</button>
					</div>
					<div className="col-md-2">
						<button
							onClick={this.props.newGame} className="btn btn-warning">Reset
						</button>
					</div>
					<div className="col-md-2">
						Moves: {this.props.moves}
					</div>
				</div>
			</div>
		);
	}
}

export default LeaderBoard;
