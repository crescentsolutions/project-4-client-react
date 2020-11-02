import React from 'react'
import { Redirect } from 'react-router-dom'

const AuthenticatedRender = props => {
  const auth = this.props.user
  if (auth === null) {
    return <Redirect to="/" />
  } else {
    return props.children
  }
}

export default AuthenticatedRender
