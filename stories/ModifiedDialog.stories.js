import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Tables from '../src/views/components/Tables/Tables'
import ModifyDialog from '../src/views/components/ModifyDialog/ModifyDialog'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../src/theme/muiTheme'

export default {
	title: 'Component Api|Modifydialog',
}

const propsDetail = [
	{
		propsName: 'open',
		propsType: 'Boolean',
		defaultValue: `default: false and it's required`,
		description: 'state of opened Popup',
	},
	{
		propsName: 'valueDefault',
		propsType: 'string',
		defaultValue: `''`,
		description: 'Default value of input',
	},
	{
		propsName: 'onClose',
		propsType: 'function',
		defaultValue: `it's required`,
		description: 'when we click outside popup, we trigger this function',
	},
	{
		propsName: 'onAgree',
		propsType: 'function',
		defaultValue: `it's required`,
		description: 'when we click button yes, we trigger this function',
	},
	{
		propsName: 'onDisagree',
		propsType: 'function',
		defaultValue: `it's required`,
		description: 'when we click button no, we trigger this function',
	},
]

export const Modifydialog = () => {
	const [openPopup, setOpenPopup] = useState(false)
	const codeString = `
	import { ModifyDialog } from '@views_components'


	...
	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	...

	const handleAgree = () => {
		// do something when hit button agree
	}

	return (
		...
		<ModifyDialog
			open={modifyDialogVisible}
			onClose={() => {
				setModifyDialogVisible(false)
			}}
			// valueDefault={valueDefault}
			onAgree={() => {
				setModifyDialogVisible(false)
				handleAgree()
			}}
			onDisagree={() => {
				setModifyDialogVisible(false)
			}}
		/>
		...
	)
	`
	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h1>Example</h1>

				<div>
					<button onClick={() => setOpenPopup(true)}>Open popup</button>
					<ModifyDialog
						open={openPopup}
						onClose={() => {
							setOpenPopup(false)
						}}
						onAgree={() => {
							setOpenPopup(false)
						}}
						onDisagree={() => {
							setOpenPopup(false)
						}}
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
