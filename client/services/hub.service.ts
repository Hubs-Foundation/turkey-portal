import axios from 'axios'
const API_PATH = '/api/v1/hubs'


/**
 * Get All Hubs
 * @returns Hubs[]
 */
export const getHubs = async () => {
  try {
    return axios.get(`${process.env.API_SERVER }${API_PATH}`, { withCredentials: true })
      .then((response) => {
        return response.data
      })
  } catch (error) {
    // TODO: Make game plan for error handling 
    console.log('Error', error)
  }

}

/**
 * Get Hub By Id
 * @param hubId string
 * @returns Hub{}
 */
export const getHub = async (hubId: string) => {

  try {
    return axios.get(`${process.env.API_SERVER }${API_PATH}/${hubId}`, { withCredentials: true })
      .then((response) => {
        return response.data
      })
  } catch (error) {
    // TODO: Make game plan for error handling 
    console.log('Error', error)
  }

}

/**
 * TODO: UPDATE AND DELETE
**/

/**
 * Update Hub By Id
 * @param hubId string
 */
export const updateHub = async (hubId: string) => { }

/**
* Delete Hub By Id
* @param hubId string
*/
export const deleteHub = async (hubId: string) => { }