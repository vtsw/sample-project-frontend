import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'

import { DeleteDialog, FormEditor } from '@views_components'

import {
	FETCH_USER_LIST,
	GET_USER_SEARCH_TEXT,
	GET_SELECTED_USER,
} from '@views/User/gql/query'
import {
	CREATE_USER,
	UPDATE_USER,
	DELETE_USER,
	SET_SELECTED_USER,
} from '@views/User/gql/mutation'
import { useCreateUser, useDeleteUser } from '@views/User/gql/useMutation'

import { PAGE_LIMIT } from '@src/configs.local'

const UserFormEditor = () => {
	const { data: userSearchTextData } = useQuery(GET_USER_SEARCH_TEXT)
	const queryVariables = {
		query: {
			searchText: userSearchTextData ? userSearchTextData.userSearchValue : '',
			limit: PAGE_LIMIT,
		},
	}
	const { data: selectedUserData } = useQuery(GET_SELECTED_USER)
	const [setSelectedUser] = useMutation(SET_SELECTED_USER, {
		onError: err => alert(err),
	})
	const [updateUser] = useMutation(UPDATE_USER, {
		onError: err => alert(err),
	})
	const [createNewUser] = useCreateUser(
		CREATE_USER,
		FETCH_USER_LIST,
		queryVariables
	)
	const [deleteUser] = useDeleteUser(
		DELETE_USER,
		FETCH_USER_LIST,
		queryVariables
	)

	const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)

	const resetSelectedUser = () => {
		setSelectedUser({
			variables: {
				selectedUser: {
					id: '',
					name: '',
					email: '',
					__typename: 'User',
				},
			},
		})
	}

	const shouldUseRefetchQueries = () => {
		return userSearchTextData && userSearchTextData.userSearchValue
			? [
					{
						query: FETCH_USER_LIST,
						variables: queryVariables,
					},
			  ]
			: []
	}

	const updateUserInfo = ({ id, email, name, password }) => {
		let userInfo = { id, email, name }
		if (password) userInfo = { ...userInfo, password }
		updateUser({
			variables: { user: userInfo },
		}).then(() => {
			resetSelectedUser()
		})
	}

	const createUser = ({ email, name, password }) => {
		createNewUser({
			variables: { user: { email, name, password } },
			refetchQueries: shouldUseRefetchQueries(),
			awaitRefetchQueries:
				!!userSearchTextData && userSearchTextData.userSearchValue,
		})
	}

	const onSubmit = ({ id, email, name, password }) => {
		if (selectedUserData.selectedUser.id) {
			updateUserInfo({ id, email, name, password })
		} else {
			createUser({ email, name, password })
		}
	}

	const onAgreeDeleteAnUser = id => {
		deleteUser({
			variables: { id },
		}).then(() => {
			resetSelectedUser()
			setOpenConfirmDeleteDialog(false)
		})
	}

	const handleOnCancel = () => {
		setSelectedUser({
			variables: {
				selectedUser: {
					id: '',
					name: '',
					email: '',
					__typename: 'User',
				},
			},
		})
	}

	const handleOnDelete = () => {
		setOpenConfirmDeleteDialog(true)
	}

	return (
		<React.Fragment>
			<FormEditor
				selectedUser={selectedUserData ? selectedUserData.selectedUser : {}}
				onSubmit={onSubmit}
				onCancel={handleOnCancel}
				onDelete={handleOnDelete}
			/>
			<DeleteDialog
				open={openConfirmDeleteDialog}
				onClose={() => {
					setOpenConfirmDeleteDialog(false)
				}}
				onAgree={() => onAgreeDeleteAnUser(selectedUserData.selectedUser.id)}
				onDisagree={() => {
					setOpenConfirmDeleteDialog(false)
				}}
			/>
		</React.Fragment>
	)
}

export default UserFormEditor
