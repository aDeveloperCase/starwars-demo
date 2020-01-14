import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Badge } from 'react-bootstrap'
import UnknownCard from './UnknownCard'

describe('<UnknownCard />', () => {

	it('renders without errors', () => {
		const wrapper = shallow(
			<UnknownCard isWinner={false} />
		)
		expect(wrapper.text()).to.contain('Unknown Card');
	})

	it('does not render badge if loser', () => {
		const wrapper = shallow(
			<UnknownCard isWinner={false} />
		)
		expect(wrapper.find(Badge)).to.have.lengthOf(0)
	})

	it('renders badge if winner', () => {
		const wrapper = shallow(
			<UnknownCard isWinner={true} />
		)
		expect(wrapper.find(Badge)).to.have.lengthOf(1)
	})
})
