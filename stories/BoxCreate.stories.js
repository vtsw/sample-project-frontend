import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { light } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Welcome } from '@storybook/react/demo'
import Tables from '../src/views/components/Tables/Tables'
import BoxCreate from '../src/views/Message/components/BoxCreate/BoxCreate'

export default {
	title: 'Boxcreate',
	component: Welcome,
}

const propsDetail = [
	{
		propsName: 'handleCreateMessage',
		propsType: 'function',
		defaultValue: 'required',
		description: 'A status check when it show loading screen',
	},
]

export const Boxcreate = () => {
	const codeString = `
	import { BoxCreate } from '@views_components'

	...

	return (
		...
		<BoxCreate handleCreate={handleCreateMessage} />
		...
	)
	`
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h1>Example</h1>

			<div>
				<BoxCreate handleCreate={() => {}} />
			</div>
			<SyntaxHighlighter language='javascript' style={light}>
				{codeString}
			</SyntaxHighlighter>

			<h1>Props</h1>

			<Tables data={propsDetail} />
		</div>
	)
}
