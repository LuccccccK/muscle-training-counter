import React from 'react';

// 認証情報を持つContextのTypeを指定
// propertyとして一旦Googleの認証結果を格納するcredentialのみで仮実装
export type AuthContextType = {
  credential: String;
  signin: (credential: String, callback: () => void) => void;
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
// todo: signin / signout 処理が未実装
export const AuthProvider = (props: Props) => {
  const [credential, setCredential] = React.useState<String>("");

  // todo: signin後にリダイレクトが必要
  const signin = (credential: String, callback: () => void) => {
    setCredential(credential);
    callback();
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