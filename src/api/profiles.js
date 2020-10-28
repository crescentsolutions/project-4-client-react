import apiUrl from '../apiConfig'
import axios from 'axios'

// Request to Create a chat message
export const createProfile = (event) => {
  console.log('event is ', event)
  return axios({
    method: 'POST',
    url: apiUrl + '/profiles',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      profile: {
        companyName: event.content
      }
    }
  })
}
