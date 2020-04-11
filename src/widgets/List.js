import React, { Component } from 'react'
import Pagination from './Pagination'
import Container from './Container'

export default class List extends Component {
  render() {
    const { children, elements } = this.props
    return (
      <Container>
        {
          elements && elements()
        }
        { Array.isArray(children) && children.length > 25 && <Pagination /> }
        { children }
      </Container>
    )
  }
}
