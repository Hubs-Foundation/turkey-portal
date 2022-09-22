import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  Redirect,
} from 'next';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import { getAccount } from './account.service';
import { RoutesE } from 'types/Routes';

type RedirectDataT = {
  error: String;
  redirect: String;
};

export function requireAuthentication(
  gssp: Function
): GetServerSideProps | Redirect {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;

    // If no errors user is authenticated
    try {
      // TODO : MAYBE - Should we make a more explicit way to confirm a JWT here..
      const account = await getAccount(req.headers as AxiosRequestHeaders);
      // User is authenticated
      return await gssp(context, account);
    } catch (error) {
      // User is not authenticated
      const axiosError = error as AxiosError;
      const status: Number | undefined = axiosError.response?.status;
      const data: RedirectDataT | unknown = axiosError.response?.data;

      if (status === 401 && checkTypeRedirectDataT(data)) {
        // Expected authentication redirects from the Phoenix server
        const redirectUrl: String = data.redirect;
        return {
          redirect: {
            source: '/dashboard',
            destination: redirectUrl, // /login OR /subscribe page
            permanent: false,
          },
        };
      } else {
        console.error('Unexpected error in requireAuthentication');
        // Unexpected error
        return {
          redirect: {
            source: '/dashboard',
            destination: `/subscribe`,
            permanent: false,
          },
        };
      }
    }
  };
}

// Type check if obj is RedirectDataT
function checkTypeRedirectDataT(
  obj: unknown | RedirectDataT
): obj is RedirectDataT {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'error' in obj &&
    'redirect' in obj
  );
}

/**
 * Route User If Logged in and visits login/signup page
 * @param gssp
 * @returns GetServerSideProps
 */
export function checkLoggedIn(gssp: Function): GetServerSideProps {
  return async (context) => {
    const { req } = context;

    try {
      await getAccount(req.headers as AxiosRequestHeaders);

      // If Authenticated Redirect to Dashboard.
      return {
        redirect: {
          destination: RoutesE.Dashboard,
          permanent: false,
        },
      };
    } catch (error) {
      return await gssp(context);
    }
  };
}
