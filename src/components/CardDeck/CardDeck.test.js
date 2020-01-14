import React from 'react'
import { shallow } from 'enzyme'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'

chai.use(sinonChai);
const expect = chai.expect

import CardDeck from './CardDeck'
import UnknownCard from '../UnknownCard/UnknownCard'
import PeopleCard from '../PeopleCard/PeopleCard'
import StarshipCard from '../StarshipCard/StarshipCard'

import { PEOPLE_TYPE, STARSHIP_TYPE } from '../../service/constants'

describe('<CardDeck />', () => {
	const props = {
		playerName: 'playerA',
		updateResource: sinon.spy(),
		isWinner: false
	}
	it('renders empty card if no resource', () => {
		const wrapper = shallow(
			<CardDeck resource={null}
				gameType={PEOPLE_TYPE}
				{...props} />
		)

		expect(wrapper.find('.CardDeck.empty-card')).to.have.lengthOf(1)
		expect(wrapper.find(UnknownCard)).to.have.lengthOf(0)
		expect(wrapper.find(PeopleCard)).to.have.lengthOf(0)
		expect(wrapper.find(StarshipCard)).to.have.lengthOf(0)
	})

	it('renders <UnknownCard /> if resource name is Unknown', () => {
		const resource = { name: 'Unknown' }
		const wrapper = shallow(
			<CardDeck resource={resource}
				gameType={PEOPLE_TYPE}
				{...props} />
		)

		expect(wrapper.find('.CardDeck.empty-card')).to.have.lengthOf(0)
		expect(wrapper.find(UnknownCard)).to.have.lengthOf(1)
		expect(wrapper.find(PeopleCard)).to.have.lengthOf(0)
		expect(wrapper.find(StarshipCard)).to.have.lengthOf(0)

	})

	it(`renders <PeopleCard /> if game type is ${PEOPLE_TYPE}`, () => {
		const resource = { name: 'Something' }
		const wrapper = shallow(
			<CardDeck resource={resource}
				gameType={PEOPLE_TYPE}
				{...props} />
		)

		expect(wrapper.find('.CardDeck.empty-card')).to.have.lengthOf(0)
		expect(wrapper.find(UnknownCard)).to.have.lengthOf(0)
		expect(wrapper.find(PeopleCard)).to.have.lengthOf(1)
		expect(wrapper.find(StarshipCard)).to.have.lengthOf(0)
	})

	it(`renders <StarshipCard /> if game type is ${STARSHIP_TYPE}`, () => {
		const resource = { name: 'Something' }
		const wrapper = shallow(
			<CardDeck resource={resource}
				gameType={STARSHIP_TYPE}
				{...props} />
		)

		expect(wrapper.find('.CardDeck.empty-card')).to.have.lengthOf(0)
		expect(wrapper.find(UnknownCard)).to.have.lengthOf(0)
		expect(wrapper.find(PeopleCard)).to.have.lengthOf(0)
		expect(wrapper.find(StarshipCard)).to.have.lengthOf(1)
	})

	it('.empty-card callback is triggered correctly', () => {
		const wrapper = shallow(
			<CardDeck resource={null}
				gameType={PEOPLE_TYPE}
				{...props} />
		)
		const dummyEvent = { "target": {"value": 8} }
		wrapper.find('.empty-card').simulate('click', dummyEvent)
		expect(props.updateResource).to.have.property('callCount', 1)
		expect(props.updateResource).to.have.been.calledWith(props.playerName, dummyEvent)
	})
})
