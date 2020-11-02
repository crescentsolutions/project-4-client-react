import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class ProfileShow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: [],
      deleted: false
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

  destroy = () => {
    axios({
      url: `${apiUrl}/profiles/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { profile, deleted } = this.state

    if (!profile) {
      return <p>Loading...</p>
    }

    if (deleted) {
      // return <Redirect to={
      //   { pathname: '/', state: { msg: 'Book succesfully deleted!' } }
      // } />
      return <h2>DELETED</h2>
    }

    return (
      <div>
        <h4>{profile.companyName}</h4>
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
