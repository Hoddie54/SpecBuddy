import { Subject } from "../../../types/database-types"
import "./spec-filter.scss"

export type SpecFilterProps = {
  data: Subject //TODO - Change to include multiple subjects
  filteredTopic: number
  setFilteredTopic: React.Dispatch<React.SetStateAction<number>>
}

export default function SpecFilter({
  data,
  filteredTopic,
  setFilteredTopic,
}: SpecFilterProps) {
  return (
    <div className="spec-filter-container">
      <select className="topic-choices-subject py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
        <option selected>{data.subject + " " + data.examBoard} </option>
        <option disabled>GCSE Chemistry</option>
      </select>
      <select
        className="topic-choices-topic py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        onChange={(e) => {
          setFilteredTopic(parseInt(e.target.value))
        }}
      >
        <option key={0} value={0} selected={filteredTopic === 0}>
          Filter by topics
        </option>
        {data.topics.map((topic, i) => {
          return (
            <option
              key={i}
              selected={filteredTopic === topic.topicId ? true : false}
              value={topic.topicId}
            >
              {topic.topicId + ".0 " + topic.title}
            </option>
          )
        })}
      </select>
      <select className="topic-choices-subject py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
        <option>Filter by self-rating</option>
        <option disabled>Red</option>
        <option disabled>Amber</option>
        <option disabled>Green</option>
      </select>
      <select className="topic-choices-subject py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
        <option>Filter by question score</option>
        <option disabled>Less than 40%</option>
        <option disabled>Between 40% and 70%</option>
        <option disabled>More than 70%</option>
      </select>
    </div>
  )
}
