import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CVTableItem } from '@views_components'
import { TABLE_TYPES } from '@src/shares/types'

const useStyles = makeStyles(theme => ({
	root: {
		overflow: 'hidden',
		flexWrap: 'nowrap',
	},
	table__header: {
		padding: '13px 16px',
		borderTop: `1px solid ${theme.palette.common.gray}`,
		borderBottom: `1px solid ${theme.palette.common.gray}`,
		'&>div:first-child': {
			paddingLeft: theme.spacing(3),
		},
	},
	table__header__item: {
		fontWeight: 600,
	},
	table__content: {
		overflowY: 'overlay',
		height: ({ tableHeight }) => tableHeight,
	},
}))

const CVTable = ({
	selectedItem,
	setSelectedItem,
	tableData,
	type,
	tableHeight,
	setDeleteDialogVisible,
}) => {
	const classes = useStyles({ tableHeight })

	return (
		<Grid
			container
			alignItems='stretch'
			className={classes.root}
			direction='column'
		>
			<Grid container className={classes.table__header}>
				<Grid item xs={5}>
					<Typography variant='body2' className={classes.table__header__item}>
						{type === TABLE_TYPES.USER_INFO ? 'EMAIL' : 'DATE'}
					</Typography>
				</Grid>
				<Grid item xs={7}>
					<Typography variant='body2' className={classes.table__header__item}>
						{type === TABLE_TYPES.USER_INFO ? 'NAME' : 'TEXT'}
					</Typography>
				</Grid>
			</Grid>
			<Box className={classes.table__content}>
				{tableData.map(item => (
					<CVTableItem
						key={item.id}
						hasCloseIcon={type === TABLE_TYPES.MESSAGE}
						selectedItem={selectedItem}
						setSelectedItem={setSelectedItem}
						setDeleteDialogVisible={setDeleteDialogVisible}
						{...item}
					/>
				))}
			</Box>
		</Grid>
	)
}

CVTable.propsTypes = {
	selectedItem: PropTypes.string,
	setSelectedItem: PropTypes.func,
	tableData: PropTypes.array,
	type: PropTypes.string,
	tableHeight: PropTypes.string,
	setDeleteDialogVisible: PropTypes.func,
}

export default CVTable
