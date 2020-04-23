import React from 'react'
import { createPortal } from 'react-dom'
import usePortal from './usePortal'

const Portal = ({ id = 'portal', children }) => {
	const target = usePortal(id)
	return createPortal(children, target)
}

export default Portal

Portal.propTypes = {}
