import axios, { AxiosRequestHeaders } from 'axios'
const API_PATH = '/api/v1/account'
import { API_SERVER } from 'config'


/**
 * Get Account
 * @returns Account:AccountT{}
 */
export const getAccount = async (headers?: AxiosRequestHeaders) => {
  const credentials = { withCredentials: true }
  const contextHeaders = { headers: { ...headers as AxiosRequestHeaders } }
  const config = headers ? contextHeaders : credentials

  try {
    return axios.get(`${API_SERVER}${API_PATH}`, config)
      .then((response) => {
        return response.data
      })
  } catch (error) {
    // TODO: Make game plan for error handling 
    console.log('Error', error)
  }

}

