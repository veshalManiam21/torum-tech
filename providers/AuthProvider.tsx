import { constants } from "buffer";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import { Except } from "type-fest";

type AuthTrigger = (redirectUrl?: string) => void;

export type User = {
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Auth = {
  submit: (loginData: Login) => void;
} & (
  | {
      isLoggedIn: false;
      user: undefined;
    }
  | {
      isLoggedIn: true;
      user: User;
    }
);

export type AuthProviderProps = {};

const AuthContext = React.createContext({} as Auth);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Except<User, "token"> | undefined>();

  const submit = async (loginData: Login) => {
    try {
      const data = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          user: {
            email: loginData.email,
            password: loginData.password,
          },
        }),
      });

      const user = await data.json();
      setUser(user);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
      //todo handle error here.
    }
  };

  const value = useMemo<Auth>(() => {
    return {
      submit,
      isLoggedIn,
      user,
    } as Auth;
  }, [user, isLoggedIn]);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
