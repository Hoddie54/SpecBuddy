import { useContext } from "react"
import { logout } from "../../auth/firebase"
import Card from "../../components/card/card"
import PreAuthPageTemplate from "../../components/pre-auth-page-template/pre-auth-page-template"
import { UserContext } from "../../context/userContextProvider"

export default function Test() {
  const { setUser } = useContext(UserContext)

  return (
    <PreAuthPageTemplate>
      <Card>You are now logged in</Card>
      <button
        onClick={async () => {
          await logout(setUser)
        }}
      >
        Logout
      </button>
    </PreAuthPageTemplate>
  )
}
