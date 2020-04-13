import React from 'react'
import { linkTo } from '@storybook/addon-links'
import { Welcome } from '@storybook/react/demo'

export default {
	title: 'Get started|Welcome',
}

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />
