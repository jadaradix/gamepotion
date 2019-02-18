import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../Button/Button'
import List from '../List/List'

const StyledCollapsibleList = styled.ul`
  .component--button {
    width: 100%;
    opacity: 0.5;
  }
  .component--button + .component--list {
    margin-top: 0.5rem;
  }
`

class CollapsibleList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: false
    }
    this.onUpdateCollapsed = this.onUpdateCollapsed.bind(this)
  }

  onUpdateCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }

  render() {
    return (
      <StyledCollapsibleList className='component--list'>
        <Button flavour='weak' onClick={this.onUpdateCollapsed}>{this.state.isCollapsed ? 'Show' : 'Hide'} {this.props.label}</Button>
        {this.state.isCollapsed === false &&
          <List>
            {this.props.children}
          </List>
        }
      </StyledCollapsibleList>
    )
  }
}

CollapsibleList.propTypes = {
  label: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool
}

CollapsibleList.defaultProps = {
  isCollapsed: false
}

export default CollapsibleList
