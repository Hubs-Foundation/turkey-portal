import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { useGetAccountQuery } from "../services/account";
import { selectAccount, setAccount } from "../store/account";

export function useAccount() {
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);
  const { data, error, isLoading, isError, isSuccess } = useGetAccountQuery({}, { skip: account.isInitialized });

  // Manage unauthorized email
  const isUnauthorized = isError && error?.status === 401;

  if (!account.isInitialized && data) dispatch(setAccount(data));

  const isReady = isSuccess || account.isInitialized;

  return { account, isLoading, isError, isReady, isUnauthorized };
}
