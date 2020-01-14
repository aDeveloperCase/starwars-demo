import React from 'react'
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap'

import './UnknownCard.scss'

function UnknownCard(props) {
	return (
		<Card className="UnknownCard filled-card">
			<Card.Body>
				{
					props.isWinner &&
					<div className="badge-box">
						<Badge variant="success">Winner</Badge>
					</div>
				}
				<Card.Title className="card-title">Unknown Card</Card.Title>
				<div>
					<div>Feature: 50% chance of winning</div>
				</div>
			</Card.Body>
		</Card>
	)
}

UnknownCard.propTypes = {
	isWinner: PropTypes.bool.isRequired
}

export default UnknownCard