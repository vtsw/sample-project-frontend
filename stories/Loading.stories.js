import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { light } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { Loading as ExampleLoading } from '@views_components'
import Loading from '../src/views/components/Loading'

import Tables from '../src/views/components/Tables/Tables'

export default {
	title: 'Component Api|LoadingScreen',
}

const propsDetail = [
	{
		propsName: 'loading',
		propsType: 'Boolean',
		defaultValue: 'false',
		description: 'A status check when it show loading screen',
	},
	{
		propsName: 'msg',
		propsType: 'String',
		defaultValue: `''`,
		description: 'Text show in loading screen',
	},
]

export const LoadingScreen = () => {
	const codeString = `
	import { Loading } from '@views_components'

	...
	const { loading, error, data, fetchMore, networkStatus } = useQuery(
	...

	return (
		<Box> // position: 'relative'
			...
			<Loading
				open={loading && networkStatus !== NETWORK_STATUS_FETCH_MORE}
				msg={'Loading...'}
			/>
			...
		</Box>
	)
	`
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h1>Example</h1>

			<div style={{ position: 'relative', width: '100px', height: '100px' }}>
				<Loading open={true} msg='...Loaing' />
			</div>
			<SyntaxHighlighter language='javascript' style={light}>
				{codeString}
			</SyntaxHighlighter>

			<h1>Props</h1>

			<Tables data={propsDetail} />
		</div>
	)
}
