import "./settings-form.scss"
import Card from "../../card/card"
import SettingsSubjectTable from "../settings-subject-table/settings-subject-table"
import { SettingsData, SettingsSubject } from "../../../types/database-types"
import { useContext, useState } from "react"
import { updateDocument } from "../../../firestore/firestore"
import { UserContext } from "../../../context/userContextProvider"
import { logout } from "../../../auth/firebase"
import { useNavigate } from "react-router"

export type SettingsFormProps = {
  userUid: string
  loadedSettings: SettingsData
  titleText?: string
  initialForm?: boolean
}

export default function SettingsForm(props: SettingsFormProps) {
  const [name, setName] = useState(props.loadedSettings.name)
  const [email, setEmail] = useState(props.loadedSettings.email)
  const [schoolName, setSchoolName] = useState(props.loadedSettings.schoolName)
  const [yearGroup, setYearGroup] = useState(props.loadedSettings.yearGroup)
  const [subjects, setSubjects] = useState<SettingsSubject[]>(
    props.loadedSettings.subjects
  )

  const [errorMessage, setErrorMessage] = useState("")

  const { setUserData, setUser } = useContext(UserContext)
  const nav = useNavigate()

  function onChange(e: any, f: React.Dispatch<React.SetStateAction<string>>) {
    f(e.target.value)
  }

  function validateForm() {
    if (name === "") {
      setErrorMessage("Name cannot be empty")
      return false
    }
    if (schoolName === "") {
      setErrorMessage("School name cannot be empty")
      return false
    }
    return true
  }

  async function submitForm(e: any) {
    e.preventDefault()
    if (!validateForm()) return

    await updateDocument("users", props.userUid, {
      name: name,
      schoolName: schoolName,
      yearGroup: yearGroup,
      subjects: subjects,
    })

    setUserData((v) => {
      if (!v) return v
      return {
        ...v,
        name: name,
        schoolName: schoolName,
        yearGroup: yearGroup,
        subjects: subjects,
      }
    })
  }

  return (
    <div className={`settings-form-container`}>
      <Card>
        <h2 className="text-4xl dark:text-white">
          {props.titleText ? props.titleText : "Change your settings here"}
        </h2>
        <hr className="border-2 my-1" />
        <div
          className={`settings-form-form ${
            props.initialForm ? "initial-form" : ""
          }`}
        >
          {/** Error message conditional */}
          <p
            className="text-sm text-red-600 mt-2"
            id="hs-validation-name-error-helper"
          >
            {errorMessage + ""}
          </p>
          <form onSubmit={submitForm}>
            {/** Name */}
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Name"
              value={name}
              onChange={(e) => onChange(e, setName)}
            />

            {/** Email */}

            <label
              htmlFor="input-email"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Email
            </label>
            <input
              disabled
              type="email"
              id="input-email"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              value={email}
              onChange={(e) => onChange(e, setEmail)}
            />

            {/** School name */}

            <label
              htmlFor="input-school"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              School name
            </label>
            <input
              type="text"
              id="input-school"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Name"
              value={schoolName}
              onChange={(e) => onChange(e, setSchoolName)}
            />

            {/** Year Group */}
            <label
              htmlFor="input-year-group"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Year Group
            </label>
            <select
              value={yearGroup}
              onChange={(e) => {
                setYearGroup(parseInt(e.target.value))
              }}
              className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            >
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option selected value={11}>
                11
              </option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={-1}>Other</option>
            </select>
            {/** Settings Subject Table */}
            <label
              htmlFor="input-subjects"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Current subjects
            </label>
            <SettingsSubjectTable subjects={subjects} />
            {/** Add more subjects */}
            <label
              htmlFor="input-subjects"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Add more subjects
            </label>
            <div
              className="settings-alert bg-blue-600 text-sm text-white rounded-lg p-4 dark:bg-blue-500"
              role="alert"
            >
              <span className="font-bold">Info</span> Currently only AQA GCSE
              Physics is available. Please email us (chat@amirhamza.co.uk) if
              there's a specific subject that you want!
            </div>
            <div className="settings-new-subjects">
              <div className="settings-new-subject">
                <label
                  htmlFor="input-subject"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Subject Name
                </label>
                <select className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                  <option selected>GCSE Physics</option>
                  <option disabled>GCSE Chemistry</option>
                  <option disabled>GCSE Biology</option>
                  <option disabled>GCSE Maths</option>
                  <option disabled>GCSE Physics</option>
                </select>
              </div>
              <div className="settings-new-subject">
                <label
                  htmlFor="input-subjects"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Exam board
                </label>
                <select className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                  <option selected>AQA</option>
                  <option disabled>EdExcel</option>
                  <option disabled>OCR</option>
                </select>
              </div>
            </div>
            <button
              disabled
              type="button"
              className="my-0 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Add new subject
            </button>
            <hr className="border-2 my-4" />
            {/** Settings buttons */}
            <div className="flex ">
              <button
                type="submit"
                className="settings-buttons py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save new settings
              </button>
              <button
                onClick={async () => {
                  await logout(setUser)
                  nav("/")
                }}
                type="button"
                className="settings-buttons  py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Log Out
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
