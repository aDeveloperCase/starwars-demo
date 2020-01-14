import React from 'react'
import { shallow } from 'enzyme'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'

chai.use(sinonChai);
const expect = chai.expect

import Display from './Display'

import { PEOPLE_TYPE, STARSHIP_TYPE } from '../../service/constants'

describe('<Display />', () => {
	let props = {
		scoreA: 0,
		scoreB: 0,
		gameType: PEOPLE_TYPE,
		resetGame: sinon.spy()
	}

	it('renders without errors', () => {
		const wrapper = shallow(
			<Display {...props} />
		)
		expect(wrapper.text()).to.contain('Score');
	})

	it('score is correctly displayed', () => {
		props.scoreA = 5
		props.scoreB = 9
		const wrapper = shallow(
			<Display {...props} />
		)
		expect(wrapper.find('.score-value').text()).to.contain('5 - 9');
	})

	it(`.people-button is active when gameType is ${PEOPLE_TYPE}`, () => {
		const wrapper = shallow(
			<Display {...props} />
		)

		expect(wrapper.find('.people-button').hasClass('active')).to.equal(true)
		expect(wrapper.find('.starship-button').hasClass('active')).to.equal(false)
	})

	it(`.starship-button is active when gameType is ${STARSHIP_TYPE}`, () => {
		props = {...props}
		props.gameType = STARSHIP_TYPE
		const wrapper = shallow(
			<Display {...props} />
		)

		expect(wrapper.find('.people-button').hasClass('active')).to.equal(false)
		expect(wrapper.find('.starship-button').hasClass('active')).to.equal(true)
	})

	it('.reset-game-button callback is correctly triggered', () => {
		const wrapper = shallow(
			<Display {...props} />
		)
		const dummyEvent = { "target": {"value": 8} }
	    wrapper.find('.reset-game-button').simulate('click', dummyEvent);
	    expect(props.resetGame).to.have.property('callCount', 1);
	    expect(props.resetGame).to.have.been.calledWith(null, true, dummyEvent)
	})

	it('.people-button callback is correctly triggered', () => {
		const wrapper = shallow(
			<Display {...props} />
		)
		const dummyEvent = { "target": {"value": 8} }
	    wrapper.find('.people-button').simulate('click', dummyEvent);
	    expect(props.resetGame).to.have.property('callCount', 2);
	    expect(props.resetGame).to.have.been.calledWith(PEOPLE_TYPE, false, dummyEvent)
	})

	it('.starship-button callback is correctly triggered', () => {
		const wrapper = shallow(
			<Display {...props} />
		)
		const dummyEvent = { "target": {"value": 8} }
	    wrapper.find('.starship-button').simulate('click', dummyEvent)
	    expect(props.resetGame).to.have.property('callCount', 3)
	    expect(props.resetGame).to.have.been.calledWith(STARSHIP_TYPE, false, dummyEvent)
	})
})
