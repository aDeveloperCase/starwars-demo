import React from 'react'
import { expect } from 'chai'

import config from './config'
import { STARSHIP_TYPE, PEOPLE_TYPE } from './constants'
import api from './index'

describe('Service Api', () => {
	it(`getRandomId generate a random number in range for ${PEOPLE_TYPE}`, () => {
		const number = api.getRandomId(PEOPLE_TYPE)
		expect(number).to.be.gt(--config[PEOPLE_TYPE].minID)
		expect(number).to.be.lt(++config[PEOPLE_TYPE].maxID)
	})

	it(`getRandomId generate a random number in range for ${STARSHIP_TYPE}`, () => {
		const number = api.getRandomId(STARSHIP_TYPE)
		expect(number).to.be.gt(--config[STARSHIP_TYPE].minID)
		expect(number).to.be.lt(++config[STARSHIP_TYPE].maxID)
	})
})
