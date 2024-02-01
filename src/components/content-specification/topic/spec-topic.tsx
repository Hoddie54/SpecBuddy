import "./spec-topic.scss"
import { Topic } from "../../../types/database-types"
import { useState } from "react"
import SpecButton from "../button/spec-button"
import SpecSubtopic from "../subtopic/spec-subtopic"

export type SpecTopicProps = {
  topic: Topic
}

export default function SpecTopic({ topic }: SpecTopicProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="spec-topic-container">
      <div className="spec-topic-title">
        <h2 className="text-3xl dark:text-white">
          {topic.topicId + ".0 " + topic.title}
        </h2>
        <SpecButton expanded={expanded} setExpanded={setExpanded} />
      </div>
      <hr />
      <div className="mx-2 my-1 p-1 spec-container" hidden={!expanded}>
        {topic.subtopics.map((subtopic, i) => {
          return <SpecSubtopic key={i} subtopic={subtopic} />
        })}
      </div>
    </div>
  )
}
