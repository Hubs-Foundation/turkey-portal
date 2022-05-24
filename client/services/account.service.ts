import axios, { AxiosRequestHeaders } from 'axios'
const API_SERVER = process.env.API_SERVER || "http://localhost:4000"
const API_PATH = '/api/v1/account'

/**
 * Get Account
 * @returns Account:AccountT{}
 */
export const getAccount = async (headers?: AxiosRequestHeaders) => {
  const credentials = { withCredentials: true }
  const ContextHeaders = { headers: { ...headers as AxiosRequestHeaders } }
  const config = headers ? ContextHeaders : credentials
  
  return axios.get(`${API_SERVER}${API_PATH}`, config)
    .then((response) => {
      return response.data
    })
}

