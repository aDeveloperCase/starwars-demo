import React from 'react'
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap'

import './StarshipCard.scss'

function StarshipCard(props) {
	return (
		<Card className="PeopleCard filled-card">
			<Card.Body>
				{
					props.isWinner &&
					<div className="badge-box">
						<Badge variant="success">Winner</Badge>
					</div>
				}
				<Card.Title className="card-title">
					{ props.resource.name }
				</Card.Title>
				<div>
					<div>Model: {props.resource.model}</div>
					<div>Manufacturer: {props.resource.manufacturer}</div>
					<div>Cost in Credits: {props.resource.cost_in_credits}</div>
					<div>Length: {props.resource.length}</div>
					<div>Crew: {props.resource.crew}</div>
					<div>Passengers: {props.resource.passengers}</div>
					<div>Cargo Capacity: {props.resource.cargo_capacity}</div>
					<div>Starship Class: {props.resource.starship_class}</div>
				</div>
			</Card.Body>
		</Card>
	)
}

StarshipCard.propTypes = {
	resource: PropTypes.any.isRequired,
	isWinner: PropTypes.bool.isRequired
}

export default StarshipCard