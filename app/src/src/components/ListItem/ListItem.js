import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import icons from '../../icons'

const styleAbstractions = {
  colours: {
    'outline': '#a537fd',
    'fore': '#2e3131',
  },
  font: `
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 400;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  `
}

const StyledListItem = styled.li`
  position: relative;
  display: block;
  width: calc(100% - 4px);
  height: 2rem;
  list-style-type: none;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: 4px;
  background-color: transparent;
  transition: border-color 0.2s ease-in-out;
  outline: 0;
  cursor: default;
  &.selected {
    background-color: #dadfe1;
  }
  &:focus {
    border-color: ${styleAbstractions.colours.outline};
  }
  > img {
    display: block;
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    margin-left: 0.3rem;
    // background-color: red;
  }
  > span {
    display: block;
    float: left;
    height: 1.5rem;
    line-height: 1.5rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    margin-left: 0.5rem;
    ${styleAbstractions.font}
    color: ${styleAbstractions.colours.fore};
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
      opacity: 0.5;
      border-radius: 4px;
      transition: opacity 0.1s ease-in-out, background-color 0.1s ease-in-out;
      outline: 0;
      // background-color: blue;
      &:focus {
        opacity: 1;
        background-color: ${styleAbstractions.colours.outline};
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  > .tags {
    position: absolute;
    top: 0;
    right: 0;
    height: 2rem;
    span {
      display: block;
      float: left;
      height: 1.5rem;
      line-height: 1.5rem;
      margin-top: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 5000px;
      ${styleAbstractions.font}
      font-weight: 800;
      font-size: 70%;
      text-transform: uppercase;
      color: white;
    }
    span + span {
      margin-left: 0.5rem;
    }
  }
`

const actions = {
  'load': (id, handleOnAction) => (<img title='Load' key='action-load' onClick={(e) => handleOnAction(e, id, 'load')} className='action' src={icons.generic.actions.load} alt='' tabIndex='0' />),
  'add': (id, handleOnAction) => (<img title='Add' key='action-add' onClick={(e) => handleOnAction(e, id, 'add')} className='action' src={icons.generic.actions.add} alt='' tabIndex='0' />),
  'move-up': (id, handleOnAction) => (<img title='Move up' key='action-move-up' onClick={(e) => handleOnAction(e, id, 'move-up')} className='action' src={icons.generic.actions.move.up} alt='' tabIndex='0' />),
  'move-down': (id, handleOnAction) => (<img title='Move down' key='action-move-down' onClick={(e) => handleOnAction(e, id, 'move-down')} className='action' src={icons.generic.actions.move.down} alt='' tabIndex='0' />),
  'rename': (id, handleOnAction) => (<img title='Rename' key='action-rename' onClick={(e) => handleOnAction(e, id, 'rename')} className='action' src={icons.generic.actions.edit} alt='' tabIndex='0' />),
  'edit': (id, handleOnAction) => (<img title='Edit' key='action-edit' onClick={(e) => handleOnAction(e, id, 'edit')} className='action' src={icons.generic.actions.edit} alt='' tabIndex='0' />),
  'delete': (id, handleOnAction) => (<img title='Delete' key='action-delete' onClick={(e) => handleOnAction(e, id, 'delete')} className='action' src={icons.generic.actions.delete} alt='' tabIndex='0' />)
}

const getAction = (onAction, id, name) => {
  const foundAction = actions[name]
  if (typeof foundAction === 'function') {
    return foundAction(id, onAction)
  }
  return null
}

const ListItem = ({ id, icon, selected, actions, tags, children, onChoose, onAction, indentation }) => {
  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      onChoose(id)
    }
  }
  const handleOnAction = (e, id, action) => {
    e.stopPropagation()
    onAction(id, action)
  }
  const imgStyle = {
    marginLeft: `${indentation}px`
  }
  return (
    <StyledListItem onClick={() => onChoose(id)} onTouchEnd={() => onChoose(id)} className={classnames('component--list-item', {'selected': selected})} tabIndex='0' onKeyPress={handleKeypress}>
      <img src={icon} style={imgStyle} alt='' />
      <span>{children}</span>
      <div className='actions'>
        {actions.map(name => getAction(handleOnAction, id, name))}
      </div>
      <div className='tags'>
        {tags.map(tag => (
          <span key={tag.name} style={{backgroundColor: tag.colour}}>{tag.name}</span>
        ))}
      </div>
    </StyledListItem>
  )
}

ListItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  selected: PropTypes.bool,
  actions: PropTypes.array,
  tags: PropTypes.arrayOf(PropTypes.object),
  onChoose: PropTypes.func,
  onAction: PropTypes.func,
  indentation: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

ListItem.defaultProps = {
  icon: '',
  selected: false,
  actions: [],
  tags: [],
  onChoose: () => {},
  onAction: () => {},
  indentation: 4
}

export default ListItem
