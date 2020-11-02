import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import AuthenticatedRender from '../AuthenticatedRender/AuthenticatedRender'

class ProfileIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: [],
      isLoaded: false
    }
  }
  componentDidMount () {
    // axios.get(apiUrl + '/profiles')
    axios({
      method: 'GET',
      url: apiUrl + '/profiles',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          profiles: response.data.profiles
        })
      })
      .catch(console.error)
  }
  render () {
    const profiles = this.state.profiles.map(profile => (
      <li key={profile._id}><Link to={`/profiles/${profile._id}`}>{profile.companyName}</Link></li>
    ))

    return (
      <div>
        <h4>Profiles</h4>
        <ul>
          {profiles}
        </ul>
      </div>
    )
  }
}
export default ProfileIndex
