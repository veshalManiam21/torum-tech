import { constants } from "buffer";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";

type AuthTrigger = (redirectUrl?: string) => void;

type User = {
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
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
  const [user, setUser] = useState<User | undefined>({
    username: "sdasda",
    image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
    bio: null,
    email: "dasdasd@gmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhc2Rhc2RAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzZGFzZGEiLCJwYXNzd29yZCI6IiQyYSQxMCRld1dtRGlCbmh1VGc0bENzQ3RoMXJ1a2hFRGlzdy5sSzlqbXBCVEVRRGd1N1pKd09hM3dYUyIsImJpbyI6bnVsbCwiaW1hZ2UiOiJodHRwczovL2FwaS5yZWFsd29ybGQuaW8vaW1hZ2VzL3NtaWxleS1jeXJ1cy5qcGVnIiwiaWF0IjoxNjQ3NzA4NzQ3LCJleHAiOjE2NTI4OTI3NDd9.6TdS60WqWdWg9zO6CcUAbGvLG46ZoIQ0SCo-hcD6Y-E",
  });

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

      // const user = data.json();

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
      user,
    } as Auth;
  }, [user, isLoggedIn]);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
