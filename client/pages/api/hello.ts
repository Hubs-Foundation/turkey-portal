// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingHttpHeaders } from 'http';
import axios, { AxiosRequestHeaders } from 'axios'


type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const API_SERVER = "http://localhost:4000"
  const API_PATH = '/api/v1/hubs/33226328979275778'
  const contextHeaders = { headers: { ...req.headers as AxiosRequestHeaders } }


  axios.get(`${API_SERVER}${API_PATH}`, contextHeaders)
      .then((response) => {
        console.log(response.data)
        res.status(200).json(response.data)
      })

  // console.log('req',req.headers)

  // res.status(200).json({ name: 'John Doe' })

  // const _headers: IncomingHttpHeaders = {...req.headers}

  // fetch(`${API_SERVER}${API_PATH}`,{
  //   credentials: 'include',
  //   headers: _headers as HeadersInit
  // }).then((resp) => {
  //   console.log('resp',resp)
  // }).catch((error) => {
  //   console.log('error',error)
  // })
}
