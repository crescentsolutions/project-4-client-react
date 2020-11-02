import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ProfileForm from '../Templates/ProfileForm'

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

    axios({
      method: 'PATCH',
      url: `${apiUrl}/profiles/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      // data: {
      //   profile: {
      //     companyName: this.state.profile.companyName
      //   }
      // }
      data: { profile: this.state.profile }
    })
      .then(() => this.setState({ updated: true }))
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
