import React from 'react'
import Downshift from 'downshift'
import { makeStyles } from '@material-ui/core'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded'

Dropdown.propTypes = {}

const items = [
	{ value: 'Tất cả tin nhắn' },
	{ value: 'Tin nhắn chưa đọc' },
	{ value: 'Tin nhắn từ người lạ' },
]

const useStyles = makeStyles(() => ({
	itemdropdown: {
		padding: '6px 16px',
		fontSize: 12,
		cursor: 'pointer',
		'&:hover': {
			background: '#00897b80',
		},
	},
	labeldropdown: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#7a869a',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		'&:hover': {
			color: '#00897b80',
		},
	},
	listdropdown: {
		position: 'absolute',
		top: 24,
		left: 0,
		zIndex: 1,
		width: 150,
		border: '1px solid #e5e5e9',
		borderRadius: 4,
		overflow: 'hidden',
		backgroundColor: 'white',
		padding: '8px 0',
	},
}))

export default function Dropdown() {
	const classes = useStyles()
	return (
		<Downshift itemToString={item => (item ? item.value : '')}>
			{({
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				inputValue,
				getToggleButtonProps,
			}) => (
				<div style={{ position: 'relative' }}>
					<label
						{...getLabelProps()}
						{...getToggleButtonProps()}
						className={classes.labeldropdown}
					>
						{inputValue || 'Tin nhắn'}
						{isOpen ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
					</label>

					{isOpen && (
						<ul className={classes.listdropdown} {...getMenuProps()}>
							{items.map((item, index) => (
								<li
									{...getItemProps({
										key: item.value,
										index,
										item,
										className: classes.itemdropdown,
									})}
								>
									{item.value}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</Downshift>
	)
}
