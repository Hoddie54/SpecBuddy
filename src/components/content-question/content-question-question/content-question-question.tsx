import { useState } from "react"
import { Question, SpecPoint } from "../../../types/database-types"
import ContentCard from "../../content-card/content-card"
import ContentQuestionOption from "../content-question-option/content-question-option"

export type ContentQuestionQuestionProps = {
  specpoint: SpecPoint
  question: Question
  setSelectedQuestion: React.Dispatch<React.SetStateAction<number>>
  maxSize: number
}

export default function ContentQuestionQuestion(
  props: ContentQuestionQuestionProps
) {
  const [selectedAnswer, setSelectedAnswer] = useState(-1)

  function increaseSelectedQuestion() {
    props.setSelectedQuestion((a) => {
      if (a === props.maxSize - 1) {
        return a
      }
      setSelectedAnswer(-1)
      return a + 1
    })
  }

  function decreaseSelectedQuestion() {
    props.setSelectedQuestion((a) => {
      if (a === 0) return a
      setSelectedAnswer(-1)
      return a - 1
    })
  }

  return (
    <>
      <div className="content-question-left">
        <ContentCard width="100%" margin="0">
          <div className="content-question-text">
            <b>
              Question {props.question.questionId} {": "}
            </b>
            {props.question.text
              .replace(`Question ${props.question.questionId}`, "")
              .replace(":", "")}
          </div>
        </ContentCard>
        <div className="content-question-options">
          <ContentQuestionOption
            question={props.question}
            optionId={0}
            letter={"A"}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
          <ContentQuestionOption
            question={props.question}
            optionId={1}
            letter={"B"}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
          <ContentQuestionOption
            question={props.question}
            optionId={2}
            letter={"C"}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
          <ContentQuestionOption
            question={props.question}
            optionId={3}
            letter={"D"}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
        </div>
        <ContentCard width="100%" margin="0">
          <div className="content-questions-explanation">
            {selectedAnswer === -1 ? (
              "Please select an answer"
            ) : (
              <>
                <b>Explanation: </b>{" "}
                {props.question.explanation.replace("Explanation: ", "")}
              </>
            )}
          </div>
        </ContentCard>
        <div className="content-question-buttons">
          <ContentCard margin="1rem 1rem" width="30%">
            <div
              className="content-question-button"
              onClick={decreaseSelectedQuestion}
              style={{
                cursor:
                  props.question.questionId === 1 ? "not-allowed" : "pointer",
              }}
            >
              {"< Previous question"}
            </div>
          </ContentCard>
          <ContentCard margin="1rem 1rem" width="30%">
            <div
              className="content-question-button"
              onClick={increaseSelectedQuestion}
              style={{
                cursor:
                  props.question.questionId === props.maxSize
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {"Next question >"}
            </div>
          </ContentCard>
        </div>
      </div>
    </>
  )
}
