import React, { useState, useEffect, createContext }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import CommonLayout from "./components/layouts/CommonLayout"
import Home from "./components/pages/Home"
import SignUp from "./components/pages/SignUp"
import SignIn from "./components/pages/SignIn"

import { getCurrentUser } from "./apis/auth"

User.propTypes = {
  id: number,
  uid: string,
  provider: string,
  email: string,
  name: string,
  nickname?: string,
  image?: string,
  allowPasswordChange: boolean,
  created_at: Date,
  updated_at: Date,
}

// グローバルで扱う変数・関数
// crerateContext https://qiita.com/ryokkkke/items/dc25111fcf52ea579d58
export const AuthContext = createContext({
  loading: boolean,
  setLoading,
  isSignedIn: boolean,
  setIsSignedIn,
  currentUser: User | undefined,  // A | B =>  ビット論理和 (OR) です。
  setCurrentUser,
})


const App = () => {
  // stateの宣言
  // const[現在の状態, 更新関数] = useState(初期値)
  const [loading, setLoading] = useState(true)          // Loading中か？
  const [isSignedIn, setIsSignedIn] = useState(false)   // ログイン済か？
  const [currentUser, setCurrentUser] = useState()      // Current_userの判別

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      // login中なら、
      if (res?.data.isLogin === true) {
        // 更新関数に値を渡す = stateの更新
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])
  

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return ( 
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}} >
        <CommonLayout>

          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signip" component={SignIn} />

            <Private>
              <Route exact path="/" component={Home} />
            </Private>
          </Switch>
        
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;