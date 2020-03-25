import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from '@storybook/react/demo'
import { makeStyles } from '@material-ui/core/styles'

export default {
	title: 'UI',
	component: Button,
}

const useStyles = makeStyles(() => ({
	cardcolor: ({ codeColor }) => ({
		width: 120,
		height: 120,
		borderRadius: '50%',
		backgroundColor: codeColor,
		marginBottom: '12px',
		border: '1px solid gray',
	}),
}))

const CardColor = ({ codeColor = '#2A73CC', nameColor = 'primary' }) => {
	const classes = useStyles({ codeColor })
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: '36px',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div className={classes.cardcolor} />
			<h1>{nameColor}</h1>
			<p>#{codeColor}</p>
		</div>
	)
}
const CardText = props => {
	const { color, nameColor, fontWeight, fontSize, fontFamily } = props
	const classes = useStyles({ codeColor: '#ffffff' })
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				margin: '20px  50px',
				padding: '0px 50px',
				width: '100%',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: '#efefef',
				border: '1px solid #dedede',
			}}
		>
			<h1 style={{ fontWeight, color, fontSize }}>{nameColor}</h1>
			<p>
				{fontFamily}, {fontWeight}, {fontSize}, {color}
			</p>
		</div>
	)
}
export const Colors = () => {
	return (
		<div>
			<h1>Colors palette</h1>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<CardColor codeColor='#ffffff' nameColor='white' />
				<CardColor codeColor='#00897b' nameColor='teal' />
				<CardColor codeColor='#c8c8c8' nameColor='very-light-pink' />
				<CardColor codeColor='#eeeeee' nameColor='very-light-pink' />
				<CardColor codeColor='#73bbff' nameColor='sky-blue' />
			</div>
		</div>
	)
}

export const Typography = () => {
	return (
		<div>
			<h1>Text style catalog</h1>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<CardText
					color='#000000'
					nameColor='black 24 bold'
					fontWeight='Bold'
					fontSize='24px'
					fontFamily='AppleSDGothicNeo'
				/>
				<CardText
					color='#00897b'
					nameColor='green 24 bold'
					fontWeight='Bold'
					fontSize='24px'
					fontFamily='AppleSDGothicNeo'
				/>
				<CardText
					color='#00897b'
					nameColor='green 18 bold'
					fontWeight='Bold'
					fontSize='18px'
					fontFamily='AppleSDGothicNeo'
				/>
				<CardText
					color='#000000'
					nameColor='black 14 bold'
					fontWeight='Bold'
					fontSize='14px'
					fontFamily='AppleSDGothicNeo'
				/>
				<CardText
					color='#00897b'
					nameColor='green 14 bold'
					fontWeight='Bold'
					fontSize='14px'
					fontFamily='AppleSDGothicNeo'
				/>

				<CardText
					color='#ffffff'
					nameColor='white 14 bold'
					fontWeight='Bold'
					fontSize='14px'
					fontFamily='AppleSDGothicNeo'
				/>
				<CardText
					color='#000000'
					nameColor='black 14'
					fontWeight='Regular'
					fontSize='14px'
					fontFamily='AppleSDGothicNeo'
				/>
				<CardText
					color='#979797'
					nameColor='gray 14'
					fontWeight='Regular'
					fontSize='14px'
					fontFamily='AppleSDGothicNeo'
				/>
				<CardText
					color='#ffffff'
					nameColor='white 14'
					fontWeight='Regular'
					fontSize='14px'
					fontFamily='AppleSDGothicNeo'
				/>
			</div>
		</div>
	)
}
