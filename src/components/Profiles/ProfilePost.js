import React from 'react'
import { Redirect } from 'react-router-dom'

class ProfilePost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {
        companyName: ''
      }
    }
  }

  // handleChange runs on every keystroke to update the React state, the displayed value will update as the user types.
  handleChange = (event) => {
    this.setState({ companyName: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('profile was created')
  }

  render () {
    if (this.state.createdBookId !== '') {
      return <Redirect to="/" />
    }
    return (
      <div>
        <h2>Create Customer Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Company Profile:
            <input name="company-profile" type="text" value={this.state.profile.companyName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ProfilePost
