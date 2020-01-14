import React from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle as farFaQuestionCircle } from '@fortawesome/free-regular-svg-icons'

import PeopleCard from '../PeopleCard/PeopleCard'
import StarshipCard from '../StarshipCard/StarshipCard'
import UnknownCard from '../UnknownCard/UnknownCard'

import {
	STARSHIP_TYPE,
	PEOPLE_TYPE
} from '../../service/constants'

import './CardDeck.scss'

function CardDeck(props) {
	if (!props.resource) {
		return (
			<div className="CardDeck empty-card" onClick={(e) => props.updateResource(props.playerName, e)}>
				<FontAwesomeIcon icon={farFaQuestionCircle} size="6x" />
			</div>
		)
	}

	if (props.resource.name === "Unknown") {
		return (
			<UnknownCard isWinner={props.isWinner} />
		)
	}

	if (props.gameType === PEOPLE_TYPE) {
		return (
			<PeopleCard resource={props.resource} isWinner={props.isWinner} />
		)
	}

	if (props.gameType === STARSHIP_TYPE) {
		return (
			<StarshipCard resource={props.resource} isWinner={props.isWinner} />
		)
	}
}

CardDeck.propTypes = {
	playerName: PropTypes.string.isRequired,
	resource: PropTypes.any,
	updateResource: PropTypes.func.isRequired,
	gameType: PropTypes.string.isRequired,
	isWinner: PropTypes.bool.isRequired
}

export default CardDeck