import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ProfileForm from '../Templates/ProfileForm'

class ProfileEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: {
        companyName: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/profiles/${this.props.match.params.id}`, {
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => this.setState({ profile: res.data.profile }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedProfile = Object.assign({}, prevState.profile, updatedField)

      return { profile: editedProfile }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/profiles/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { profile: this.state.profile }
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    // const { profile, updated } = this.state
    const { profile } = this.state
    const { handleChange, handleSubmit } = this

    // if (updated) {
    //   return <Redirect to={`/profiles/${this.props.match.params.id}`} />
    // }

    return (
      <ProfileForm
        profile={profile}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/profiles/${this.props.match.params.id}`}
      />
    )
  }
}

export default ProfileEdit
