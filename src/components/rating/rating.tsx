import { useState } from "react"
import { useLocation } from "react-router"
import { updateUserRating } from "../../firestore/firestore"
import { SpecPoint } from "../../types/database-types"
import "./rating.scss"

export type RatingProps = {
  specpoint: SpecPoint
  questionId?: number
}

export default function Rating(props: RatingProps) {
  //Requires fixing
  const [submitted, setSubmitted] = useState(false)
  const location = useLocation()
  const question = location.pathname.includes("question")
    ? `Q${props.questionId}`
    : ""
  const video = location.pathname.includes("video") ? "V" : ""

  async function sendUserRating(positive: boolean) {
    if (submitted) return
    await updateUserRating(
      props.specpoint.examBoard,
      props.specpoint.subject,
      props.specpoint.topicId,
      props.specpoint.subtopicId,
      props.specpoint.specpointId,
      question.concat(video),
      positive
    )
    setSubmitted(true)
  }

  return (
    <>
      {submitted && <p className="rating-thank-you">Thank you</p>}
      <div className="flex items-center ">
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={async () => {
            await sendUserRating(true)
          }}
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
          Yes
        </button>
        <button
          type="button"
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={async () => {
            await sendUserRating(false)
          }}
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17 14V2" />
            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
          </svg>
          No
        </button>
      </div>
    </>
  )
}
