import React from 'react';
import { extractEmail } from './../../utility/jwt'

const allowedEmails = process.env.REACT_APP_ALLOWED_EMAILS ? process.env.REACT_APP_ALLOWED_EMAILS : "";

// 認証情報を持つContextのTypeを指定
// propertyとして一旦Googleの認証結果を格納するcredentialのみで仮実装
export type AuthContextType = {
  credential: string;
  signin: (credential: string, callback: (ok: boolean) => void) => void;
  signout: (callback:() => void) => void;
}

// 認証情報を持つContextを生成し、Contextを外部から利用できるようにuseメソッドをexport
const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export const useAuthContext = (): AuthContextType => {
  return React.useContext<AuthContextType>(AuthContext);
}

type Props = {
  children: React.ReactNode
}

// AuthContextType の実装
// todo: signout 処理が未実装
export const AuthProvider = (props: Props) => {
  const [credential, setCredential] = React.useState<string>("");

  const signin = (credential: string, callback: (ok: boolean) => void) => {
    const email = extractEmail(credential);
    const allowed = allowedEmails.split(',');
    setCredential(credential);
    callback(allowed.includes(email));
  }

  const signout = (callback: () => void) => {
    setCredential("");
    callback();
  }

  const value: AuthContextType = { credential, signin, signout };
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}