import "./additional-information-page.scss"

import { useContext } from "react"
import SettingsForm from "../../components/settings/settings-form/settings-form"
import { UserContext } from "../../context/userContextProvider"
import { SettingsData } from "../../types/database-types"

export default function AdditionalInformationPage() {
  const { userData } = useContext(UserContext)

  if (!userData) return <>Expected User Data... Error</>

  const loadedSettings: SettingsData = {
    name: userData.name,
    email: userData.email,
    schoolName: userData.schoolName ? userData.schoolName : "",
    yearGroup: userData.yearGroup ? userData.yearGroup : 11,
    subjects: userData.subjects
      ? userData.subjects
      : [{ name: "Physics", examBoard: "AQA" }],
  }

  return (
    <>
      <div className="additional-information-page-container">
        <div className="additional-information-page-title">
          <h2 className="text-6xl text-white">Wolfgang Learning</h2>
          <br />
          <h2 className="text-6xl text-white font-bold">
            Add a few more details to proceed to platform
          </h2>
        </div>
        <div className="additional-information-page-card">
          {" "}
          <SettingsForm
            userUid={userData.uid}
            loadedSettings={loadedSettings}
            titleText="Nearly there..."
            initialForm={true}
          />
        </div>
      </div>
    </>
  )
}
