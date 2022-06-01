import type { GetServerSideProps } from 'next'
import { AxiosRequestHeaders } from 'axios'
import { getAccount } from './account.service'

export function requireAuthentication(gssp: Function): GetServerSideProps {

  return async (context) => {
    const { req } = context

    // If no errors user is authenticated
    try {
      // TODO : MAYBE - Should we make a more explicit way to confirm a JWT here..
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