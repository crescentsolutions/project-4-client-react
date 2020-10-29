import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
    let jsx
    // while the books are loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    // if no books
    } else if (this.state.profiles.length === 0) {
      jsx = <p>No profiles, please create one.</p>
    // if there are books
    } else {
      jsx = (
        <ul>
          {this.state.profiles.map(profile => {
            return <li key={profile._id}><Link to={`/profiles/${profile._id}`}>{profile.companyName}</Link></li>
          })}
        </ul>
      )
    }
    return (
      <div>
        <h2>Profiles</h2>
        {jsx}
      </div>
    )
  }
}
export default ProfileIndex
