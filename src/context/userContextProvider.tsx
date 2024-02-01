import { createContext, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { UserData } from "../types/database-types"
import { getDocument } from "../firestore/firestore"

export type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  userData: UserData | null
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  userData: null,
  setUserData: () => {},
})

export default function UserContextProvider(props: any) {
  const auth: User | null = null
  const [user, setUser] = useState<User | null>(auth)
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    async function getData() {
      const res = await getDocument("users", user?.uid)
      console.log(res)
      //@ts-ignore
      setUserData(res)
    }
    if (user && !userData) getData()
  }, [user, userData, setUserData])

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        userData: userData,
        setUserData: setUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
