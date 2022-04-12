import { useDispatch, useSelector } from "react-redux";

import { useGetAccountQuery } from "../services/account";
import { selectAccount, setAccount } from "../store/account";

export function useAccount() {
  const dispatch = useDispatch();

  const account = useSelector(selectAccount);

  const { data, isLoading, isError, isSuccess } = useGetAccountQuery({}, {skip: account.isInitialized});

  if (!account.isInitialized && data) dispatch(setAccount(data));

  const isReady = isSuccess || account.isInitialized;

  return { account, isLoading, isError, isReady };
}
