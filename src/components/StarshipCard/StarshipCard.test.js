import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Badge } from 'react-bootstrap'
import StarshipCard from './StarshipCard'

describe('<StarshipCard />', () => {

	const resource = {
		"name":"Executor",
		"model":"Executor-class star dreadnought",
		"manufacturer":"Kuat Drive Yards, Fondor Shipyards",
		"cost_in_credits":"1143350000",
		"length":"19000",
		"crew":"279144",
		"passengers":"38000",
		"cargo_capacity":"250000000",
		"starship_class":"Star dreadnought"
	}

	it('renders without errors', () => {
		const wrapper = shallow(
			<StarshipCard isWinner={false} resource={resource} />
		)
		expect(wrapper.find('.card-title').text()).to.contain(resource.name);
	})

	it('does not render badge if loser', () => {
		const wrapper = shallow(
			<StarshipCard isWinner={false} resource={resource} />
		)
		expect(wrapper.find(Badge)).to.have.lengthOf(0)
	})

	it('renders badge if winner', () => {
		const wrapper = shallow(
			<StarshipCard isWinner={true} resource={resource} />
		)
		expect(wrapper.find(Badge)).to.have.lengthOf(1)
	})
})
