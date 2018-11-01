import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import icons from '../../icons'
import { font, colours } from '../../styleAbstractions'

const StyledListItem = styled.button`
  position: relative;
  display: block;
  width: 100%;
  height: calc(2rem + 4px);
  list-style-type: none;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: 4px;
  background-color: transparent;
  transition: border-color 0.2s ease-in-out;
  outline: 0;
  &.selected {
    background-color: #dadfe1;
  }
  &:focus {
    border-color: ${colours.outline};
  }
  > img {
    display: block;
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    // background-color: red;
  }
  > span {
    display: block;
    float: left;
    height: 2rem;
    line-height: 2rem;
    margin-left: 0.5rem;
    ${font}
    color: ${colours.fore};
    // background-color: green;
  }
  &:hover {
    > .actions {
      visibility: visible;
      opacity: 1;
    }
  }
  > .actions {
    position: absolute;
    top: 0;
    right: 0;
    height: 2rem;
    transition: opacity 0.1s ease-in-out;
    visibility: hidden;
    opacity: 0;
    // background-color: pink;
    img {
      display: block;
      float: left;
      width: 1.5rem;
      height: 1.5rem;
      margin-top: 0.25rem;
      margin-left: 0.25rem;
      background-color: transparent;
      opacity: 0.5;
      border-radius: 4px;
      transition: opacity 0.1s ease-in-out;
      outline: 0;
      // background-color: blue;
      &:focus {
        opacity: 1;
        background-color: ${colours.outline};
      }
      &:hover {
        opacity: 1;
      }
    }
  }
`

const actions = {
  'add': (id, handleOnAction) => (<img title='Add' key='action-add' onClick={(e) => handleOnAction(e, id, 'add')} className='action' src={icons.generic.actions.add} alt='' tabIndex='0' />),
  'rename': (id, handleOnAction) => (<img title='Rename' key='action-rename' onClick={(e) => handleOnAction(e, id, 'rename')} className='action' src={icons.generic.actions.edit} alt='' tabIndex='0' />),
  'delete': (id, handleOnAction) => (<img title='Delete' key='action-delete' onClick={(e) => handleOnAction(e, id, 'delete')} className='action' src={icons.generic.actions.delete} alt='' tabIndex='0' />)
}

const getAction = (onAction, id, name) => {
  const foundAction = actions[name]
  if (typeof foundAction === 'function') {
    return foundAction(id, onAction)
  }
  return null
}

const ListItem = ({ id, icon, selected, actions, children, onChoose, onAction }) => {
  const handleOnAction = (e, id, action) => {
    e.stopPropagation()
    onAction(id, action)
  }
  return (
    <StyledListItem onClick={() => onChoose(id)} className={classnames('component--list-item', {'selected': selected})}>
      <img src={icon} alt='' />
      <span>{children}</span>
      <div className='actions'>
        {actions.map(name => getAction(handleOnAction, id, name))}
      </div>
    </StyledListItem>
  )
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  selected: PropTypes.bool,
  actions: PropTypes.array,
  onChoose: PropTypes.func,
  onAction: PropTypes.func
}

ListItem.defaultProps = {
  icon: '',
  selected: false,
  actions: [],
  onChoose: () => {},
  onAction: () => {}
}

export default ListItem
