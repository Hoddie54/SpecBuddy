import { Subject } from "../../../types/database-types"
import "./topic-choices.scss"

export type TopicChoicesProps = {
  topicId: number
  subtopicId: number
  setTopicId: React.Dispatch<React.SetStateAction<number>>
  setSubtopicId: React.Dispatch<React.SetStateAction<number>>
  data: Subject
}

export default function TopicChoices(props: TopicChoicesProps) {
  return (
    <div className="topic-choices-container">
      <select className="topic-choices-subject py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
        <option selected>
          {props.data.subject + " " + props.data.examBoard}{" "}
        </option>
        <option disabled>GCSE Chemistry</option>
      </select>
      <select
        className="topic-choices-topic py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        onChange={(e) => {
          props.setTopicId(parseInt(e.target.value))
          props.setSubtopicId(1)
        }}
      >
        {props.data.topics.map((topic, i) => {
          return (
            <option
              key={i}
              selected={props.topicId === topic.topicId ? true : false}
              value={topic.topicId}
            >
              {topic.topicId + ".0 " + topic.title}
            </option>
          )
        })}
      </select>
      <select
        className="topic-choices-subtopic py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        onChange={(e) => {
          props.setSubtopicId(parseInt(e.target.value))
        }}
      >
        {props.data.topics[props.topicId - 1].subtopics
          .sort((a, b) => {
            return a.subtopicId - b.subtopicId
          })
          .map((subtopic, i) => {
            return (
              <option
                selected={
                  props.subtopicId === subtopic.subtopicId ? true : false
                }
                key={i}
                value={subtopic.subtopicId}
              >
                {props.topicId +
                  "." +
                  subtopic.subtopicId +
                  " " +
                  subtopic.title}
              </option>
            )
          })}
      </select>
    </div>
  )
}
