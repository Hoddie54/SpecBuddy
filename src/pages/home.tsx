import { logout } from "../auth/firebase"

export default function Home() {
  async function action() {
    await logout()
  }

  return (
    <>
      <div>You're logged in!</div>
      <button onClick={action}>Log out</button>
    </>
  )
}
