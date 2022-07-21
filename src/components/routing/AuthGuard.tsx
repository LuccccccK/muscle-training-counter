import React from 'react';

// Import Router Component
import { Navigate } from "react-router-dom";

// Import Provider Component
import { useAuthContext } from './../providers'

// FunctionComponent Props 定義
type Props = {
  component: React.ReactNode;
}

// props でRouting先のReactComponentを受け取って認証済みであれば、そのComponentを表示する
export const RouteAuthGuard: React.FunctionComponent<Props> = (props: Props) => {
  const credential = useAuthContext().credential;

  // todo: 認証済みかどうかの判定は、credentialの有無で判断は危険
  if ( credential == "" ) {
    return <Navigate to="/login" />
  }
  return <>{props.component}</>;
}