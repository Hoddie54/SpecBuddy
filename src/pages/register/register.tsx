import { ChangeEvent, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerWithEmailAndPassword } from "../../auth/firebase"
import Card from "../../components/card/card"
import PreAuthPageTemplate from "../../components/pre-auth-page-template/pre-auth-page-template"
import { UserContext } from "../../context/userContextProvider"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const { setUser } = useContext(UserContext)
  const nav = useNavigate()

  const register = async () => {
    //e.preventDefault()
    try {
      await registerWithEmailAndPassword(name, email, password, setUser)
      nav("/")
    } catch (err: any) {
      console.log("error " + err)
      setErrorMessage(err + "")
    }
  }

  return (
    <PreAuthPageTemplate>
      <Card>
        <h2 className="text-4xl dark:text-white">Create a new account</h2>
        <hr className="border-2 w-80" />

        {/** Error message conditional */}
        <p
          className="text-sm text-red-600 mt-2"
          id="hs-validation-name-error-helper"
        >
          {errorMessage + ""}
        </p>
        {/** Name */}
        <div>
          <label
            htmlFor="input-label-with-helper-text-name"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="input-label-with-helper-text-password"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Name"
            aria-describedby="hs-input-helper-text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value)
            }}
          />
        </div>
        {/** Email */}
        <div>
          <label
            htmlFor="input-label-with-helper-text-email"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="input-label-with-helper-text-password"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="name@email.com"
            aria-describedby="hs-input-helper-text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value)
            }}
          />
        </div>
        {/** Password */}
        <div>
          <label
            htmlFor="input-label-with-helper-text"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="input-label-with-helper-text"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            aria-describedby="hs-input-helper-text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        {/** Login buttons */}
        <div className="login-buttons">
          <button
            type="button"
            className="email-button py-3 px-4 inline-flex gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={register}
          >
            <div>Register with Email</div>
          </button>
        </div>
        {/** Login and forgotten password */}
        <div className="my-2">
          <Link to="/login">
            <button
              type="button"
              className="email-button py-3 px-4 inline-flex gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <div>Already have an account?</div>
            </button>
          </Link>
          <Link to="/reset-password">
            <h5 className="font-semibold inline-block m-4">
              Forgotten password?
            </h5>
          </Link>
        </div>
      </Card>
    </PreAuthPageTemplate>
  )
}
