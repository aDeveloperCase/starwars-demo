import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Badge } from 'react-bootstrap'
import PeopleCard from './PeopleCard'

describe('<PeopleCard />', () => {

	const resource = {
		"name":"Yarael Poof",
		"height":"264",
		"mass":"unknown",
		"hair_color":"none",
		"skin_color":"white",
		"eye_color":"yellow",
		"birth_year":"unknown",
		"gender":"male"
	}

	it('renders without errors', () => {
		const wrapper = shallow(
			<PeopleCard isWinner={false} resource={resource} />
		)
		expect(wrapper.find('.card-title').text()).to.contain(resource.name);
	})

	it('does not render badge if loser', () => {
		const wrapper = shallow(
			<PeopleCard isWinner={false} resource={resource} />
		)
		expect(wrapper.find(Badge)).to.have.lengthOf(0)
	})

	it('renders badge if winner', () => {
		const wrapper = shallow(
			<PeopleCard isWinner={true} resource={resource} />
		)
		expect(wrapper.find(Badge)).to.have.lengthOf(1)
	})
})
