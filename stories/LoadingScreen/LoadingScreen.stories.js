import React from 'react'
import LoadingScreen from './LoadingScreen'

export default {
	title: 'Component Api|LoadingScreen',
	includeStories: [],
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

export const basic = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ position: 'relative', width: '100px', height: '100px' }}>
				<LoadingScreen open={true} msg='...Loaing' />
			</div>
		</div>
	)
}
