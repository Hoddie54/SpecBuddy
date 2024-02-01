import "./spec-subtopic.scss"
import { SubTopic } from "../../../types/database-types"
import { useState } from "react"
import SpecButton from "../button/spec-button"
import SpecSpecpoint from "../specpoint/spec-specpoint"
import NavBar from "../../nav/nav-bar"

export type SpecSubtopicProps = {
  subtopic: SubTopic
}

export default function SpecSubtopic({ subtopic }: SpecSubtopicProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="spec-subtopic-container">
      <div className="spec-subtopic-title">
        <h3 className="text-xl dark:text-white">
          {subtopic.topicId + "." + subtopic.subtopicId + " " + subtopic.title}
        </h3>
        <SpecButton expanded={expanded} setExpanded={setExpanded} />
      </div>
      <hr />
      <div className="mx-2 my-1 p-1 spec-container" hidden={!expanded}>
        {subtopic.specpoints.map((specpoint, i) => {
          return (
            <SpecSpecpoint
              key={i}
              specpoint={specpoint}
              score={Math.random()}
            />
          )
        })}
      </div>
    </div>
  )
}
