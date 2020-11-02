import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ProfileForm from '../Templates/ProfileForm'
import messages from '../AutoDismissAlert/messages'

class ProfileEdit extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: {
        companyName: '',
        firstName: '',
        lastName: '',
        telephone: '',
        webHost: '',
        domainName: ''
      },
      updated: false
    }
  }

  handleChange = (event) => {
    event.persist()

    this.setState(() => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedProfile = Object.assign({}, this.state.profile, updatedField)
      return { profile: editedProfile }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props

    axios({
      method: 'PATCH',
      url: `${apiUrl}/profiles/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { profile: this.state.profile }
    })
      .then(() => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Updated',
        message: messages.updateProfileSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed',
        message: messages.updateProfileFailure,
        variant: 'danger'
      }))
      .catch(console.error)
  }

  render () {
    const { profile, updated } = this.state
    // const { profile } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/profiles/${this.props.match.params.id}`} />
    }

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
