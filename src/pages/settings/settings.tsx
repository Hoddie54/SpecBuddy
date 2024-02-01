import { useContext } from "react"
import NavBar from "../../components/nav/nav-bar"
import SettingsForm from "../../components/settings/settings-form/settings-form"
import { UserContext } from "../../context/userContextProvider"
import { SettingsData } from "../../types/database-types"
import "./settings.scss"

export default function Settings() {
  const { userData } = useContext(UserContext)

  if (!userData) return <>User Data error</>

  const settings: SettingsData = {
    name: userData.name,
    email: userData.email,
    schoolName: userData["schoolName"] ? userData["schoolName"] : "",
    subjects: [{ name: "Physics", examBoard: "AQA" }],
    yearGroup: userData["yearGroup"] ? userData["yearGroup"] : 11,
  }

  return (
    <>
      <NavBar />
      <div className="settings-container">
        <SettingsForm
          loadedSettings={settings}
          userUid={userData.uid}
          titleText="Platform settings"
        />
      </div>
    </>
  )
}
