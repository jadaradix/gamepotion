import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Input from '../Input/Input'
import List from '../List/List'

const StyledFilterableList = styled.ul`
  .component--input + .component--list {
    margin-top: 0.5rem;
  }
`

class FilterableList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      filter: this.props.filter
    }
    this.onUpdateFilter = this.onUpdateFilter.bind(this)
  }

  onUpdateFilter(filter) {
    this.setState({
      filter
    })
  }

  render() {
    const filteredListItems = this.props.children.filter(c => c.props.children.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)
    return (
      <StyledFilterableList className='component--filterable-list'>
        <Input type='text' placeholder='Filter...' value={this.state.filter} onChange={this.onUpdateFilter} />
        <List>
          {filteredListItems}
        </List>
      </StyledFilterableList>
    )
  }
}

FilterableList.propTypes = {
  filter: PropTypes.string
}

FilterableList.defaultProps = {
  filter: ''
}

export default FilterableList
