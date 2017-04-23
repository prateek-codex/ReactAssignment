import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

jest.useFakeTimers();

describe('App.jsx', () => {

	it('should include Leaderboard', () => {
		const app = shallow(<App />);
		let leaderBoard = app.find('LeaderBoard');
		expect(leaderBoard).not.toBe(null);
	});

	it('should include Header', () => {
		const app = shallow(<App />);
		let header = app.find('Header');
		expect(header).not.toBe(null);
	});
});
