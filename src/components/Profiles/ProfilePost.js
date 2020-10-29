import React from 'react'
// import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class ProfilePost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {
        companyName: ''
      }
    }
  }

  handleChange = (event) => {
    // this.setState({ companyName: event.target.value })

    // Used for event handling
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
      method: 'POST',
      url: apiUrl + '/profiles',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { profile: this.state.profile }
    })
  }

  render () {
    // if (this.state.createdBookId !== '') {
    //   return <Redirect to="/" />
    // }
    return (
      <div>
        <h2>Create Customer Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Company Profile:
            <input name="companyName" type="text" value={this.state.profile.companyName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ProfilePost
