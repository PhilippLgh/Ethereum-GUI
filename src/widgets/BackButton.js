import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from './Button'

export default withRouter(({ history, style }) => {
  return (
    <Button style={style} onClick={() => history.goBack()}>{"<- Back"}</Button>
  )
})