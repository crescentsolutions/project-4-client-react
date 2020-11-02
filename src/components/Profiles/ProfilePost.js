import React from 'react'
import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import messages from '../AutoDismissAlert/messages'

class ProfilePost extends React.Component {
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
      }
      // createdCustomer: null
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
    // const { msgAlert } = this.props

    axios({
      method: 'POST',
      url: apiUrl + '/profiles',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { profile: this.state.profile }
    })
    // .then(res => this.setState({
    //   createdCustomer: this.props.match.params.id
    // }))
    // .then(() => msgAlert({
    //   heading: `Creating '${this.state.companyName}'`,
    //   message: messages.profileCreated,
    //   variant: 'success'
    // }))
  }

  render () {
    const { createdCustomer } = this.state

    if (createdCustomer) {
      return <Redirect to='/profiles' />
    }
    return (
      <div>
        <h2>Create Customer Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Company Profile:
            <input name="companyName" type="text" value={this.state.profile.companyName} onChange={this.handleChange} />
          </label>
          <label>
            First Name:
            <input name="firstName" type="text" value={this.state.profile.firstName} onChange={this.handleChange} />
          </label>
          <label>
            Last Name:
            <input name="lastName" type="text" value={this.state.profile.lastName} onChange={this.handleChange} />
          </label>
          <label>
            Telephone:
            <input name="telephone" type="text" value={this.state.profile.telephone} onChange={this.handleChange} />
          </label>
          <label>
            Web Host:
            <input name="webHost" type="text" value={this.state.profile.webHost} onChange={this.handleChange} />
          </label>
          <label>
            Domain Name:
            <input name="domainName" type="text" value={this.state.profile.domainName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ProfilePost
