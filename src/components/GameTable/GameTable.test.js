import React from 'react'
import { shallow } from 'enzyme'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'

chai.use(sinonChai);
const expect = chai.expect

import GameTable from './GameTable'
import Display from '../Display/Display'
import CardDeck from '../CardDeck/CardDeck'
import { Button } from 'react-bootstrap'

import {
	STARSHIP_TYPE,
	PEOPLE_TYPE
} from '../../service/constants'

describe('<GameTable />', () => {
	const resource = {
		"name":"Yarael Poof",
		"height":"264",
		"mass":"25",
		"hair_color":"none",
		"skin_color":"white",
		"eye_color":"yellow",
		"birth_year":"unknown",
		"gender":"male"
	}

	it('renders without errors', () => {
		const wrapper = shallow(
			<GameTable />
		)
		expect(wrapper.find(Display)).to.have.lengthOf(1)
		expect(wrapper.find('.fight-button').text()).to.contain('Fight')
		expect(wrapper.find('.fight-button').props().disabled).to.equals(true)
		expect(wrapper.find(CardDeck)).to.have.lengthOf(2)
	})

	it('resource A is retrieved correctly', () => {
		const wrapper = shallow(
			<GameTable />
		)
		const instance = wrapper.instance();

		expect(wrapper.state('playerA').resource).to.equal(null)

		return instance.updateResource('playerA').then(() => {
			expect(wrapper.state('playerA').resource).to.not.equal(null)
		})
	})

	it('when both resources are retrieved gameStatus change', () => {
		const wrapper = shallow(
			<GameTable />
		)
		const instance = wrapper.instance()

		expect(wrapper.state('gameStatus')).equals('retrieving')
		const playerA = wrapper.state('playerA')
		playerA.resource = resource

		return instance.updateResource('playerB').then(() => {
			expect(wrapper.state('gameStatus')).equals('ready')
		})
	})

	it(`.fight-button works on gameStatus equals 'ready'`, () => {
		const wrapper = shallow(
			<GameTable />
		)
		const instance = wrapper.instance()
		instance.computeFight = sinon.spy()
		const dummyEvent = { "target": {"value": 8} }

		wrapper.setState({gameStatus: 'ready'})
		wrapper.find('.fight-button').simulate('click', dummyEvent)

		expect(wrapper.find('.fight-button').props().disabled).to.equals(false)
		expect(instance.computeFight).to.have.property('callCount', 1)
		expect(instance.computeFight).to.have.been.calledWith(dummyEvent)
	})

	it('playerA scores if resource has mass greater than playerB', () => {
		const wrapper = shallow(
			<GameTable />
		)
		const instance = wrapper.instance()

		const resourceA = {...resource}
		const resourceB = {...resource}
		resourceA.mass = "35"

		const playerA = {...wrapper.state('playerA')}
		const playerB = {...wrapper.state('playerB')}

		playerA.resource = resourceA
		playerB.resource = resourceB

		wrapper.setState({
			playerA,
			playerB
		})

		instance.computeFight()

		expect(wrapper.state('gameStatus')).to.equals('endmatch')
		expect(wrapper.state('matchWinner')).to.equals('playerA')
		expect(wrapper.state('playerA').score).to.equals(1)
		expect(wrapper.state('playerB').score).to.equals(0)
	})

	it('playerB scores if resource has crew greater than playerA', () => {
		const wrapper = shallow(
			<GameTable />
		)
		const instance = wrapper.instance()

		const resourceA = {...resource}
		const resourceB = {...resource}
		resourceA.crew = "5"
		resourceB.crew = "25"

		const playerA = {...wrapper.state('playerA')}
		const playerB = {...wrapper.state('playerB')}

		playerA.resource = resourceA
		playerB.resource = resourceB

		wrapper.setState({
			playerA,
			playerB,
			gameType: STARSHIP_TYPE
		})

		instance.computeFight()

		expect(wrapper.state('gameStatus')).to.equals('endmatch')
		expect(wrapper.state('matchWinner')).to.equals('playerB')
		expect(wrapper.state('playerA').score).to.equals(0)
		expect(wrapper.state('playerB').score).to.equals(1)
	})

	it('resetGame change gameType and reset score and values', () => {
		const wrapper = shallow(
			<GameTable />
		)
		const instance = wrapper.instance()

		const playerA = {...wrapper.state('playerA')}
		const playerB = {...wrapper.state('playerB')}

		playerA.resource = resource
		playerB.resource = resource
		playerA.score = 19
		playerB.score = 22

		wrapper.setState({
			playerA,
			playerB,
			gameType: PEOPLE_TYPE,
			gameStatus: 'ready',
			matchWinner: 'playerB'
		})

		expect(wrapper.state('gameType')).to.equals(PEOPLE_TYPE)
		expect(wrapper.state('gameStatus')).to.equals('ready')
		expect(wrapper.state('matchWinner')).to.equals('playerB')
		expect(wrapper.state('playerA').resource).to.equals(resource)
		expect(wrapper.state('playerB').resource).to.equals(resource)
		expect(wrapper.state('playerA').score).to.equals(19)
		expect(wrapper.state('playerB').score).to.equals(22)

		instance.resetGame(STARSHIP_TYPE, true)

		expect(wrapper.state('gameType')).to.equals(STARSHIP_TYPE)
		expect(wrapper.state('gameStatus')).to.equals('retrieving')
		expect(wrapper.state('matchWinner')).to.equals('')
		expect(wrapper.state('playerA').resource).to.equals(null)
		expect(wrapper.state('playerB').resource).to.equals(null)
		expect(wrapper.state('playerA').score).to.equals(0)
		expect(wrapper.state('playerB').score).to.equals(0)
	})
})
