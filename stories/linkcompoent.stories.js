import React from 'react'
import { hrefTo, linkTo } from '@storybook/addon-links'
import { action } from '@storybook/addon-actions'
import LinkTo from '@storybook/addon-links/react'

export default {
	title: 'Component Api|LinkComopnent',
	// component: SignIn,
	// decorators: [withKnobs],
}

export const buttonA = () => {
	hrefTo('Href', 'log').then(action('URL of this story'))
	return <LinkTo story='BoxCreate'>BoxCreate</LinkTo>
}

export const buttonB = () => {
	return <button onClick={linkTo('SignIn', 'buttonA')}>buttonb</button>
}
