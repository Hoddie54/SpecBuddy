import "./content-question.scss"
import { useParams } from "react-router-dom"
import ContentVideoCard from "../../components/content-video/content-video-card/content-video-card"
import NavBar from "../../components/nav/nav-bar"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../context/dataContextProvider"
import { Question } from "../../types/database-types"
import ContentQuestionQuestion from "../../components/content-question/content-question-question/content-question-question"
import { getDocument } from "../../firestore/firestore"

export default function ContentQuestion() {
  let { topicId, subtopicId, specpointId } = useParams()
  const { data } = useContext(DataContext)

  const specpoint = //@ts-ignore
    data?.topics[parseInt(topicId) - 1].subtopics[parseInt(subtopicId) - 1] //@ts-ignore
      .specpoints[parseInt(specpointId) - 1]

  const [question, setQuestion] = useState(0)

  const [pageLoading, setPageLoading] = useState(true)
  const [questionData, setQuestionData] = useState<Question[]>()

  useEffect(() => {
    async function main() {
      if (!specpoint) return
      const d = await getDocument(
        "questions",
        `${specpoint.examBoard}-${specpoint.subject}-${specpoint.topicId}-${specpoint.subtopicId}-${specpoint.specpointId}`
      )
      //@ts-ignore
      setQuestionData(d.questions)
      setPageLoading(false)
    }

    main()
  }, [specpoint, setQuestionData])

  if (!specpoint) return <>Error Spec point not found</>
  if (!questionData) return <>Data not loaded</>

  return (
    <>
      <NavBar />
      <div className="content-question-container">
        {pageLoading ? (
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <ContentQuestionQuestion
            specpoint={specpoint}
            question={questionData[question]}
            setSelectedQuestion={setQuestion}
            maxSize={questionData.length}
          />
        )}

        <div className="content-question-right">
          <ContentVideoCard
            specPoint={specpoint}
            progressPercentage={Math.random()}
            questionId={question}
          />
        </div>
      </div>
    </>
  )
}
