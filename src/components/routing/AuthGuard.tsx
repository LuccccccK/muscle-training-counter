import React from 'react';

// Import Router Component
import { Navigate } from "react-router-dom";

// Import Redux
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/store';

// Import Layout
import { Footer } from './../layouts/Footer'

// FunctionComponent Props 定義
type Props = {
  component: React.ReactNode;
}

// props でRouting先のReactComponentを受け取って認証済みであれば、そのComponentを表示する
export const RouteAuthGuard = (props: Props) => {
  const credential = useSelector((state: IStore) => state.credential.credential);

  // todo: 認証済みかどうかの判定は、credentialの有無で判断は危険
  if ( credential === "" ) {
    return <Navigate to="/login" />
  }
  return (
    <>
      {/* AuthGuardされたページには共通でFooterを付与 */}
      {/* ただし、これはAuthGuardの責任外なので、あまりよくない... */}
      {/* 本来は各page componentで任意のlayoutを指定できるよう方がよい */}
      <Footer component={props.component}></Footer>
    </>
  );
}