import { constants } from "buffer";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";

type AuthTrigger = (redirectUrl?: string) => void;

type User = {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
};

type Login = {
  email: string;
  password: string;
};

export type Auth = {
  submit: (loginData: Login) => void;
} & (
  | {
      isLoggedIn: false;
      // user: undefined;
    }
  | {
      isLoggedIn: true;
      // user: User;
    }
);

export type AuthProviderProps = {};

const AuthContext = React.createContext({} as Auth);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState<User>();

  const submit = async (loginData: Login) => {
    try {
      const data = await fetch("https://api.realworld.io/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://localhost:3000",
        },
        body: JSON.stringify({ user: loginData }),
      });

      const user = data.json();

      // console.log(user);

      // await setUserInfo(user);
    } catch (err) {
      //todo handle error here.
    }

    // await router.push("/feed");
  };

  const value = useMemo<Auth>(() => {
    return {
      submit,
      isLoggedIn,
      userInfo,
    };
  }, [isLoggedIn, userInfo]);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
