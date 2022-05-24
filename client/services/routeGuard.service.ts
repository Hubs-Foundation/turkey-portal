import type { GetServerSideProps } from 'next'
import { AxiosRequestHeaders } from 'axios'
import { getAccount } from './account.service'
/**
 * TODO: i dont like how this is set up, i'd like there a way for use to do
 * an apit call the validate the cookie jwt here. not  call te user api
 * and if thats successful count it authenticated...
 */

export function requireAuthentication(gssp: Function): GetServerSideProps {

  return async (context) => {
    const { req } = context

    try {
      // If no errors user is authenticated
      await getAccount(req.headers as AxiosRequestHeaders)
      return await gssp(context);

    } catch (error) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }
  }
}