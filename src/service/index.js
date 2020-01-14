import axios from 'axios'

import config from './config'

function getRandomId(type) {
	const minID = config[type].minID
	const maxID = --config[type].maxID
	return (Math.floor(Math.random() * maxID) + minID)
}

function getRandomResource(type) {
	const randomID = getRandomId(type)
	const resourceURL = `${config[type].url}${randomID}/`

	return new Promise(function(resolve, reject) {
		axios.get(resourceURL)
			.then(function(res) {
				resolve(res.data)
			})
			.catch(function(error) {
				resolve({
					name: "Unknown"
				})
			})
	})
}

export default {
	getRandomId,
	getRandomResource
}

