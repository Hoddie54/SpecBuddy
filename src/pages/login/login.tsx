import { ChangeEvent, useContext, useState } from "react"
import "./login.scss"
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../auth/firebase"
import Card from "../../components/card/card"
import PreAuthPageTemplate from "../../components/pre-auth-page-template/pre-auth-page-template"
import { UserContext } from "../../context/userContextProvider"
import { Link } from "react-router-dom"

export default function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const { setUser } = useContext(UserContext)

  const login = async () => {
    //e.preventDefault()
    try {
      await logInWithEmailAndPassword(userName, password, setUser)
    } catch (err: any) {
      console.log("error " + err)
      setErrorMessage(err + "")
    }
  }

  return (
    <PreAuthPageTemplate>
      <Card>
        <h2 className="text-4xl dark:text-white">Welcome back</h2>
        <hr className="border-2 w-80" />

        {/** Error message conditional */}
        <p
          className="text-sm text-red-600 mt-2"
          id="hs-validation-name-error-helper"
        >
          {errorMessage + ""}
        </p>

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
              setUserName(event.target.value)
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
            onClick={login}
          >
            <div>Sign in with Email</div>
          </button>
          <button
            type="button"
            className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={async () => {
              await signInWithGoogle(setUser)
            }}
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4132_5805adfqfqdq121)">
                <path
                  d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z"
                  fill="#4285F4"
                />
                <path
                  d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z"
                  fill="#34A853"
                />
                <path
                  d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.6552 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z"
                  fill="#FBBC05"
                />
                <path
                  d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z"
                  fill="#EB4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_4132_5805adfqfqdq121">
                  <rect
                    width="32"
                    height="32"
                    fill="white"
                    transform="translate(0.937439)"
                  />
                </clipPath>
              </defs>
            </svg>
            Sign in with Google
          </button>
        </div>
        {/** Register and forgotten password */}
        <div className="my-2 login-register-and-forget-password-container">
          <Link to="/register">
            <button
              type="button"
              className="email-button py-3 px-4 inline-flex gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <div>Register</div>
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
