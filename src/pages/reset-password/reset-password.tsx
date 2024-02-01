import { ChangeEvent, useState } from "react"
import { sendPasswordReset } from "../../auth/firebase"
import Card from "../../components/card/card"
import PreAuthPageTemplate from "../../components/pre-auth-page-template/pre-auth-page-template"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const resetPassword = async () => {
    //e.preventDefault()
    try {
      await sendPasswordReset(email)
      setSuccessMessage("Success! Please check your email")
    } catch (err: any) {
      console.log("error " + err)
      setErrorMessage(err + "")
    }
  }

  return (
    <PreAuthPageTemplate>
      <Card>
        <h2 className="text-4xl dark:text-white">Reset password</h2>
        <hr className="border-2 w-80" />
        {/** Error message conditional */}
        <p
          className="text-sm text-red-600 mt-2"
          id="hs-validation-name-error-helper"
        >
          {errorMessage + ""}
        </p>

        {/** Success message conditional */}
        <p
          className="text-sm text-600 mt-2"
          id="hs-validation-name-error-helper"
        >
          {successMessage + ""}
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
              setEmail(event.target.value)
            }}
          />
        </div>
        {/** Password reset button */}
        <div className="w-50 my-2">
          <button
            type="button"
            className="email-button py-3 px-4 inline-flex gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={resetPassword}
          >
            <div>Reset Password</div>
          </button>
        </div>
      </Card>
    </PreAuthPageTemplate>
  )
}
