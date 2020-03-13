import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { SearchBox, CVTable } from '@views_components'
import { TABLE_TYPES } from '@src/shares/types'

import {
	FETCH_USER_LIST,
	GET_USER_SEARCH_TEXT,
	SET_USER_SEARCH_TEXT,
} from '@views/User/gql/queries'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
	},
	full_screen_height: {
		height: '100vh',
	},
	full_height: {
		height: '100%',
	},
	user_list__container: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
		overflow: 'hidden',
		height: '100%',
	},
	search_box: {
		width: '100%',
		padding: theme.spacing(3),
	},
	search_box__title: {
		fontWeight: 600,
		marginBottom: theme.spacing(2),
	},
}))

const UserList = ({ selectedItem, setSelectedItem }) => {
	const {
		data: { userSearchValue },
	} = useQuery(GET_USER_SEARCH_TEXT)

	const { loading, _, data } = useQuery(FETCH_USER_LIST, {
		variables: { query: { searchText: userSearchValue, limit: 100 } },
	})
	const classes = useStyles()

	console.log('userSearchValue')
	return (
		<Box className={classes.root}>
			<Box className={clsx(classes.user_list__container, classes.full_height)}>
				<Box className={classes.search_box}>
					<Typography variant='h5' className={classes.search_box__title}>
						User List
					</Typography>
					<SearchBox width={400} setSelectedItem={setSelectedItem} />
				</Box>

				{!loading ? (
					<CVTable
						type={TABLE_TYPES.USER_LIST}
						tableData={data.userList.items}
						tableHeight='calc(100vh - 250px)'
						selectedItem={selectedItem}
						setSelectedItem={setSelectedItem}
					/>
				) : (
					<div>Loading...</div>
				)}
			</Box>
		</Box>
	)
}

UserList.propsTypes = {}

export default UserList
