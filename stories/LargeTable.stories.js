import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import Tables from '../src/views/components/Tables/Tables'
import LargeTable from '../src/views/components/LargeTable/LargeTable'
import muiTheme from '../src/theme/muiTheme'
import { ThemeProvider } from '@material-ui/core'

export default {
	title: 'Component Api|Largetable',
}

const propsDetail = [
	{
		propsName: 'items',
		propsType: '[]',
		defaultValue: `[] and it's required`,
		description: 'It is data of Table. Array of object, object is data of row',
	},
	{
		propsName: 'onClickRow',
		propsType: 'function',
		defaultValue: `(object)=>{// object: data of row}`,
		description:
			'when we click row, we trigger this function. this function contain object data ',
	},
	{
		propsName: 'selectedRow',
		propsType: 'object',
		defaultValue: `{}`,
		description: 'It is object data of row',
	},
	{
		propsName: 'columns',
		propsType: '[]',
		defaultValue: `[] and it's required`,
		description: `It like [
			{ headerLabel: 'EMAIL', xs: 6, headerVariable: 'email' },
			{ headerLabel: 'NAME', xs: 6, headerVariable: 'name' },
		]. 
		Length of array is number of row, 
		headerLabel: column's name, 
		headerVariable: varibles of column's value,
		xs: width is calculated by material's grid`,
	},
	{
		propsName: 'isIconClose',
		propsType: 'boolean',
		defaultValue: `false`,
		description: 'variables to show or hidden rowDeleteIcon  ',
	},
	{
		propsName: 'handleDeleteRow',
		propsType: 'function',
		defaultValue: `(object)=>{// object: data of row}`,
		description:
			'when isIconClose equal true, delete icon will be visible. Hit it, call this function. ',
	},
	{
		propsName: 'loadingMore',
		propsType: 'boolean',
		defaultValue: `false`,
		description: `It related to hasNextPage and loadNextPage props. it show state when function loadNextPage run async. When we start to call loadNextPage, it is true. 
			we wait until loadingMore is false again to call loadNextPage again `,
	},
	{
		propsName: 'loadNextPage',
		propsType: 'function',
		defaultValue: `()=>{}`,
		description:
			'if we care about infiniteScroll, let pass props hasNextPage. Then, when scroll down end of table, it call this function, ',
	},
	{
		propsName: 'hasNextPage',
		propsType: 'boolean',
		defaultValue: `false`,
		description:
			'if it is true, we can call function loadNextPage. and, oppositely, nothing',
	},
]

const message = [
	{ email: 'Example@gmail.com', name: 'example', id: '1' },
	{ email: 'Example2@gmail.com', name: 'example2', id: '2' },
	{ email: 'Example3@gmail.com', name: 'example3', id: '3' },
	{ email: 'Example4@gmail.com', name: 'example4', id: '4' },
]

const columns = [
	{ headerLabel: 'EMAIL', xs: 6, headerVariable: 'email' },
	{ headerLabel: 'NAME', xs: 6, headerVariable: 'name' },
]

export const Largetable = () => {
	const codeString = `
	import { LargeTable } from '@views_components'

	...

	const handleCreate = (inputValue) => {
		// inputValue
	}

	// const message = [
	// 	{ email: 'Example@gmail.com', name: 'example', id: '1' },
	// 	{ email: 'Example2@gmail.com', name: 'example2', id: '2' },
	// ]
	
	const columns = [
		{ headerLabel: 'EMAIL', xs: 6, headerVariable: 'email' },
		{ headerLabel: 'NAME', xs: 6, headerVariable: 'name' },
	]

	return (
		...
		<LargeTable
			items={message}
			columns={columns}
			// onClickRow={(object)=>{ }}
			// selectedRow={{}}
			// isIconClose={false}
			// handleDeleteRow={(object)=>{ }}
			// loadingMore={}
			// loadNextPage={(object)=>{ }}
			// hasNextPage={}
		/>
		...
	)
	`
	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h1>Example</h1>

				<div style={{ display: 'flex', height: '250px' }}>
					<LargeTable
						items={message}
						// onClickRow={onSelectAMessage}
						// selectedRow={selectedMessage}
						columns={columns}
						isIconClose={false}
						// handleDeleteRow={dataRow => {
						// 	setDeleteDialogVisible(true)
						// 	setSelectedMessage(dataRow)
						// }}
						// loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
						// loadNextPage={loadNextMessagePage}
						// hasNextPage={dataMsg.messageList && dataMsg.messageList.hasNext}
					/>
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
