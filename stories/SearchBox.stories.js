import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import Tables from '../src/views/components/Tables/Tables'
import SearchBox from '../src/views/components/SearchBox/SearchBox'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../src/theme/muiTheme'

export default {
	title: 'Component Api|Searchbox',
}

const propsDetail = [
	{
		propsName: 'onSearch',
		propsType: 'function',
		defaultValue: 'required',
		description:
			'When you click button search, you will run this function, what contain value of input nearby.',
	},
	{
		propsName: 'defaultValue',
		propsType: 'string',
		defaultValue: `''`,
		description: 'It is a default value of input',
	},
]

export const Searchbox = () => {
	const codeString = `
	import { SearchBox } from '@views_components'

	...

	const handleSearch = (inputValue) => {
		// inputValue
	}

	return (
		...
		<SearchBox onSearch={handleSearch} defaultValue='' />
		...
	)
	`
	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h1>Example</h1>

				<div style={{ width: '500px' }}>
					<SearchBox onSearch={() => {}} />
				</div>
				<SyntaxHighlighter language='javascript'>
					{codeString}
				</SyntaxHighlighter>

				<h1>Props</h1>

				<Tables data={propsDetail} />
			</div>
		</ThemeProvider>
	)
}
