import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { DeleteDialog, ModifyDialog } from '@views_components'
import { boolean, object } from '@storybook/addon-knobs'
import LargeTable from '../../src/views/components/LargeTable/LargeTable'
import data from './generatorData'
import PropTypes from 'prop-types'

const Largetable = () => {
	const [message, setMessage] = useState(data(50))
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	const [selectedMessage, setSelectedMessage] = useState(false)

	const column1 = object('column 1', {
		headerLabel: 'EMAIL',
		xs: 6,
		headerVariable: 'email',
	})
	const column2 = object('column 2', {
		headerLabel: 'NAME',
		xs: 6,
		headerVariable: 'name',
	})

	const columns = [column1, column2]

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '500px',
				padding: '20px',
			}}
		>
			<LargeTable
				items={message}
				onClickRow={dataRow => {
					setSelectedMessage(dataRow)
					setModifyDialogVisible(true)
					action('onClickRow')(dataRow)
				}}
				selectedRow={selectedMessage}
				columns={columns}
				isIconClose={boolean('isIconClose')}
				handleDeleteRow={dataRow => {
					setDeleteDialogVisible(true)
					setSelectedMessage(dataRow)
				}}
				// loadingMore={boolean('loadingMore', false)}
				loadNextPage={() => {
					setMessage([...message, ...data(10)])
					action('loadNextPage')()
				}}
				hasNextPage={boolean('hasNextPage', false)}
			/>
			<DeleteDialog
				open={deleteDialogVisible}
				onClose={() => {
					setDeleteDialogVisible(false)
				}}
				onAgree={() => {
					setDeleteDialogVisible(false)

					setMessage(message.filter(item => item.id !== selectedMessage.id))
					action('handleDeleteRow')(selectedMessage)
				}}
				onDisagree={() => {
					setDeleteDialogVisible(false)
					action('Cancel deleteRow')(selectedMessage)
				}}
			/>
			<ModifyDialog
				open={modifyDialogVisible}
				onClose={() => {
					setModifyDialogVisible(false)
				}}
				valueDefault={selectedMessage && selectedMessage.name}
				onAgree={value => {
					setModifyDialogVisible(false)
					setMessage(
						message.map(item => {
							if (item.id === selectedMessage.id)
								return { ...item, name: value }
							return item
						})
					)
				}}
				onDisagree={() => {
					setModifyDialogVisible(false)
				}}
			/>
		</div>
	)
}

export default Largetable

Largetable.propTypes = {
	items: PropTypes.array.isRequired,
	onClickRow: PropTypes.func.isRequired,
	selectedRow: PropTypes.object,
	columns: PropTypes.array.isRequired,
	isIconClose: PropTypes.bool,
	handleDeleteRow: PropTypes.func,
	loadNextPage: PropTypes.func,
	hasNextPage: PropTypes.bool,
	loadingMore: PropTypes.bool,
}
Largetable.defaultProps = {
	items: [],
	// onClickRow: '_',
	selectedRow: {},
	columns: [],
	isIconClose: false,
	// handleDeleteRow: '_',
	// loadNextPage: '_',
	hasNextPage: false,
	loadingMore: false,
}
