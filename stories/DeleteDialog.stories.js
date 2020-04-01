import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Tables from '../src/views/components/Tables/Tables'
import DeleteDialog from '../src/views/components/DeleteDialog/DeleteDialog'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Component Api|Deletedialog',
	// decorators: [withKnobs],
}

const propsDetail = [
	{
		propsName: 'open',
		propsType: 'Boolean',
		defaultValue: `default: false and it's required`,
		description: 'state of opened Popup',
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

export const Deletedialog = () => {
	const [openPopup, setOpenPopup] = useState(false)
	const codeString = `
	import { Deletedialog } from '@views_components'


	...
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
	...

	const handleAgree = () => {
		// do something when hit button agree
	}

	return (
		...
		<DeleteDialog
			open={deleteDialogVisible}
			onClose={() => {
				setDeleteDialogVisible(false)
			}}
			onAgree={() => {
				setDeleteDialogVisible(false)
				handleAgree()
			}}
			onDisagree={() => {
				setDeleteDialogVisible(false)
			}}
		/>
		...
	)
	`

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h1>Example</h1>

			<div>
				<button
					onClick={e => {
						console.log('onClick')
						setOpenPopup(true)
						action('click')(e)
					}}
					// onMouseOver={e => {
					// 	console.log('onMouseOver')
					// 	// setOpenPopup(true)
					// 	action('hovered')(e)
					// }}
					// {...actions({
					// 	onClick: 'button -click',
					// 	onMouseOver: 'on mouse over',
					// })}
				>
					Open popup
				</button>
				<DeleteDialog
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
			<SyntaxHighlighter language='javascript'>{codeString}</SyntaxHighlighter>

			<h1>Props</h1>

			<Tables data={propsDetail} />
		</div>
	)
}
