import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import puppeteer from 'puppeteer'

import App from './App'
import GameTable from './components/GameTable/GameTable'

function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}

describe('<App />', () => {

	it('renders without errors', () => {
		const wrapper = shallow(
			<App />
		)
		expect(wrapper.find(GameTable)).to.have.lengthOf(1)
	})

	describe('end to end tests', () => {
		let browser
		let page

		beforeAll(async () => {
			browser = await puppeteer.launch({
				headless: false
			})
			page = await browser.newPage()
			page.emulate({
				viewport: {
					width: 900,
					height: 2400
				},
				userAgent: ''
			})
			await page.goto('http://localhost:3000/')
			await page.waitForSelector('.empty-card')
		})

		test('end to end test', async () => {
			await page.waitForSelector('.empty-card')
			let emptyCards = await page.$$('.empty-card')

			await emptyCards[0].click()
			await emptyCards[1].click()

			await page.waitFor(() => 
				document.querySelectorAll('.filled-card').length === 2
			)

			let scoreValue = await page.$eval('.score-value', e => e.innerHTML);
			expect(scoreValue).to.equal('0 - 0')

			await page.click('.fight-button')
			await page.waitForSelector('.badge-box')

			scoreValue = await page.$eval('.score-value', e => e.innerHTML);
			expect(scoreValue).not.to.equal('0 - 0')

			await page.click('.reset-game-button')
			scoreValue = await page.$eval('.score-value', e => e.innerHTML);
			expect(scoreValue).to.equal('0 - 0')

			await page.waitForSelector('.empty-card')
			emptyCards = await page.$$('.empty-card')

			await emptyCards[0].click()
			await emptyCards[1].click()
			await page.waitFor(() => 
				document.querySelectorAll('.filled-card').length === 2
			)

			await page.click('.fight-button')
			await page.waitForSelector('.badge-box')

			scoreValue = await page.$eval('.score-value', e => e.innerHTML);
			expect(scoreValue).not.to.equal('0 - 0');
		}, 5000)

		afterAll(() => {
			browser.close()
		})
	})
})
