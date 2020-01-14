import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { Row, Col } from 'react-bootstrap'

import { STARSHIP_TYPE, PEOPLE_TYPE } from '../../service/constants'

import './Display.scss'

function Display(props) {
	const peopleButton = classNames('people-button custom-button', { 'active':  props.gameType === PEOPLE_TYPE })
	const starshipButton = classNames('starship-button custom-button', { 'active':  props.gameType === STARSHIP_TYPE })

	return (
		<Row>
			<Col xs={4}>
			</Col>
			<Col xs={4} className="score-display">
				<div>Score</div>
				<div className="score-value">{ props.scoreA } - { props.scoreB }</div>
			</Col>
			<Col xs={4}>
				<div>
					<div className="reset-game-button"
						onClick={(e) => props.resetGame(null, true, e)}>
						Reset Score
					</div>
				</div>
				<div className={peopleButton}
					onClick={ (e) => props.resetGame(PEOPLE_TYPE, false, e)}>
					{ PEOPLE_TYPE }
				</div>
				<div className={starshipButton}
					onClick={(e) => props.resetGame(STARSHIP_TYPE, false, e)}>
					{ STARSHIP_TYPE }
				</div>
			</Col>
		</Row>
	);
}

Display.propTypes = {
	scoreA: PropTypes.number.isRequired,
	scoreB: PropTypes.number.isRequired,
	gameType: PropTypes.string.isRequired,
	resetGame: PropTypes.func.isRequired
}

export default Display;
