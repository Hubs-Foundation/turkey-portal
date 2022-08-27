import type { GetServerSideProps, GetServerSidePropsContext, Redirect } from 'next';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import { getAccount } from './account.service';

type RedirectDataT = {
  error: String;
  redirect: String;
};

export function requireAuthentication(gssp: Function): GetServerSideProps | Redirect {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;

    // If no errors user is authenticated
    try {
      await getAccount(req.headers as AxiosRequestHeaders);
      return await gssp(context);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status: Number | undefined = axiosError.response?.status;
      const data: RedirectDataT | unknown = axiosError.response?.data;

      if (status === 401 && checkRedirectDataType(data)) {
        // Expected authentication redirects from the phoenix server
        const redirectUrl: String = data.redirect;
        return {
          redirect: {
            source: '/dashboard',
            destination: redirectUrl, // FxA auth server OR /subscribe
            permanent: false,
          },
        };
      } else {
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

// Type checker if obj is RedirectDataT
function checkRedirectDataType(
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
          destination: '/dashboard',
          permanent: false,
        },
      };
    } catch (error) {
      return await gssp(context);
    }
  };
}
