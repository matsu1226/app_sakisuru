import client from "./client"
import Cookies from "js-cookie"   // cookie操作用ライブラリ

// import { SignUpParams, SignInParams } from "interfaces/index"

// サインアップ（新規アカウント作成）
export const signUp = (params) => {
  return client.post("auth", params)
}

signUp.propTypes = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

// サインイン（ログイン）
export const signIn = (params)  => {
  return client.post("auth/sign_in", params)
}

signIn.propTypes = {
  email: string,
  password: string
}

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})  
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get("/auth/sessions", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}