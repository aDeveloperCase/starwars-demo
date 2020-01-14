import React from 'react'
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap'

import './PeopleCard.scss'

function PeopleCard(props) {
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
					<div>Height: {props.resource.height}</div>
					<div>Mass: {props.resource.mass}</div>
					<div>Hair Color: {props.resource.hair_color}</div>
					<div>Skin Color: {props.resource.skin_color}</div>
					<div>Eye Color: {props.resource.eye_color}</div>
					<div>Birth Year: {props.resource.birth_year}</div>
					<div>Gender: {props.resource.gender}</div>
				</div>
			</Card.Body>
		</Card>
	)
}

PeopleCard.propTypes = {
	resource: PropTypes.any.isRequired,
	isWinner: PropTypes.bool.isRequired
}

export default PeopleCard