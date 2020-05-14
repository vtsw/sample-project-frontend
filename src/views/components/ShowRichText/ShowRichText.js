import React, { useMemo, useCallback, useEffect, useState } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import {
	Slate,
	Editable,
	withReact,
	useSelected,
	useFocused,
} from 'slate-react'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	editable: ({ editableStyle }) => ({
		width: '100%',
		...editableStyle,
	}),
}))

const ShowRichText = ({ valueDefault, textOverflow, editableStyle }) => {
	const classes = useStyles({ editableStyle })
	const [value, setValue] = useState(initialValue)
	const renderElement = useCallback(props => <Element {...props} />, [])
	const editor = useMemo(
		() => withMentions(withReact(withHistory(createEditor()))),
		[]
	)

	useEffect(() => {
		if (valueDefault) {
			setValue(valueDefault)
		} else {
			setValue([
				{
					children: [
						{
							text: '',
						},
					],
				},
			])
		}
	}, [valueDefault])

	return (
		<Box className={classes.root}>
			<Slate editor={editor} value={value} id='slate here'>
				<Editable
					id='Editable here'
					renderElement={renderElement}
					className={classes.editable}
					readOnly={true}
				/>
			</Slate>
			{textOverflow && '...'}
		</Box>
	)
}

const withMentions = editor => {
	const { isInline, isVoid } = editor

	editor.isInline = element => {
		return element.type === 'mention' ? true : isInline(element)
	}

	editor.isVoid = element => {
		return element.type === 'mention' ? true : isVoid(element)
	}

	return editor
}

const Element = props => {
	const { attributes, children, element } = props
	switch (element.type) {
		case 'mention':
			return <MentionElement {...props} />
		default:
			return <p {...attributes}>{children}</p>
	}
}

const MentionElement = ({ attributes, children, element }) => {
	const selected = useSelected()
	const focused = useFocused()
	return (
		<span
			{...attributes}
			contentEditable={false}
			style={{
				padding: '3px 3px 2px',
				margin: '0 1px',
				verticalAlign: 'baseline',
				display: 'inline-block',
				borderRadius: '4px',
				backgroundColor: '#eee',
				fontSize: '0.9em',
				boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
			}}
		>
			@{element.character}
			{children}
		</span>
	)
}

const initialValue = [
	{
		children: [
			{
				text: '',
			},
		],
	},
]

export default ShowRichText

ShowRichText.propTypes = {}

ShowRichText.defaultProps = {}
