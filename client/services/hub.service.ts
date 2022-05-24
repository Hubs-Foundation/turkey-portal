import axios from 'axios'
const API_SERVER = process.env.API_SERVER || "http://localhost:4000"
const API_PATH = '/api/v1/hubs'


/**
 * Get All Hubs
 * @returns Hubs[]
 */
export const getHubs = async () => {
  return axios.get(`${API_SERVER}${API_PATH}`, { withCredentials: true })
    .then((response) => {
      return response.data
    })
}

/**
 * Get Hub By Id
 * @param hubId string
 * @returns Hub{}
 */
export const getHub = async (hubId:string) => {
  return axios.get(`${API_SERVER}${API_PATH}/${hubId}`, { withCredentials: true })
    .then((response) => {
      return response.data
    })
}

/**
 * TODO: UPDATE AND DELETE
**/

/**
 * Update Hub By Id
 * @param hubId string
 */
 export const updateHub = async (hubId:string) => {}

 /**
 * Delete Hub By Id
 * @param hubId string
 */
  export const deleteHub = async (hubId:string) => {}