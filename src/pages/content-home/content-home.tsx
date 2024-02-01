import { useContext, useState } from "react"
import ContentHomeCard from "../../components/content-home/content-home-card/content-home-card"
import TopicChoices from "../../components/content-home/topic-choices/topic-choices"
import NavBar from "../../components/nav/nav-bar"
import { DataContext } from "../../context/dataContextProvider"
import "./content-home.scss"

export default function ContentHome() {
  const [topicId, setTopicId] = useState(1)
  const [subtopicId, setSubtopicId] = useState(1)

  const { data } = useContext(DataContext)

  if (!data?.subject) return <div>Error</div>

  return (
    <>
      <NavBar />{" "}
      <TopicChoices
        topicId={topicId}
        subtopicId={subtopicId}
        setSubtopicId={setSubtopicId}
        setTopicId={setTopicId}
        data={data}
      />
      <div className="content-home-container">
        {data.topics[topicId - 1].subtopics[subtopicId - 1]?.specpoints.map(
          (specpoint, index) => {
            return (
              <ContentHomeCard
                key={index}
                specPoint={specpoint}
                progressPercentage={Math.random()}
              />
            )
          }
        )}
      </div>
    </>
  )
}
