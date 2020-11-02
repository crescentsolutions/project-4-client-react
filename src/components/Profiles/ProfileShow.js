import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class ProfileShow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: [],
      deleted: false
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    axios(`${apiUrl}/profiles/${this.props.match.params.id}`, {
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => this.setState({ profile: res.data.profile }))
      .catch(() => msgAlert({
        heading: 'Failed',
        message: messages.showProfileFailure,
        variant: 'danger'
      }))
      .catch(console.error)
  }

  destroy = () => {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/profiles/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted',
        message: messages.deleteProfileSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed',
        message: messages.deleteProfileFailure,
        variant: 'danger'
      }))
      .catch(console.error)
  }

  render () {
    const { profile, deleted } = this.state

    if (!profile) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Client succesfully deleted' } }
      } />
      // return <h2>DELETED</h2>
    }

    return (
      <div>
        <h4>{profile.companyName}</h4>
        <p><strong>Name: </strong> {profile.firstName + ' ' + profile.lastName}</p>
        <p><strong>Phone: </strong>{profile.telephone}</p>
        <p><strong>Web Host: </strong>{profile.webHost}</p>
        <p><strong>Domain: </strong>{profile.domainName}</p>
        <button onClick={this.destroy}>Delete Profile</button>
        <Link to={`/profiles/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/profiles">Back to all profiles</Link>
      </div>
    )
  }
}
export default ProfileShow
