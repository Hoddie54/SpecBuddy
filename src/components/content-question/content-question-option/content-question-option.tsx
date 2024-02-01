import "./content-question-option.scss"

import { Question } from "../../../types/database-types"
import ContentCard from "../../content-card/content-card"

export type ContentQuestionOptionProps = {
  question: Question
  optionId: number
  letter: string
  selectedAnswer: number
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number>>
}

export default function ContentQuestionOption(
  props: ContentQuestionOptionProps
) {
  function onClick() {
    props.setSelectedAnswer((a) => {
      if (a === -1) return props.optionId
      else return a
    })
  }

  const correctAnswerAndUserCorrect =
    props.question.correctAnswer === props.optionId &&
    props.selectedAnswer === props.optionId
  const correctAnswerAndUserIncorrect =
    props.question.correctAnswer === props.optionId &&
    props.selectedAnswer !== props.optionId &&
    props.selectedAnswer !== -1
  const incorrectAnswerAndUserSelectedIt =
    props.question.correctAnswer !== props.optionId &&
    props.selectedAnswer === props.optionId

  let backgroundColor = ""
  if (correctAnswerAndUserCorrect || correctAnswerAndUserIncorrect)
    backgroundColor = "lightgreen"
  if (incorrectAnswerAndUserSelectedIt) backgroundColor = "pink"

  return (
    <ContentCard
      width="45%"
      margin="1rem 1rem"
      backgroundColor={backgroundColor}
    >
      <div className="content-question-option-letter">{props.letter}</div>
      <div className="content-question-option" onClick={onClick}>
        {props.question.options[props.optionId]}
      </div>
    </ContentCard>
  )
}
