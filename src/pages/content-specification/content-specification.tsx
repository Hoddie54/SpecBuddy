import { useContext, useEffect, useState } from "react"
import ContentCard from "../../components/content-card/content-card"
import SpecFilter from "../../components/content-specification/filter/spec-filter"
import SpecTopic from "../../components/content-specification/topic/spec-topic"
import NavBar from "../../components/nav/nav-bar"
import { DataContext } from "../../context/dataContextProvider"
import "./content-specification.scss"

export default function ContentSpecification() {
  const [filteredTopic, setFilteredTopic] = useState(0)
  //TODO - Add RAG rating and % score filters

  const { data } = useContext(DataContext)

  useEffect(() => {
    document.querySelectorAll(".MathJax").forEach((e) => e.remove())
  }, [filteredTopic])

  // useEffect(() => {
  //   //@ts-ignore
  //   if (typeof window?.MathJax !== "undefined") {
  //     //@ts-ignore
  //     window.MathJax.typesetClear()
  //     //@ts-ignore
  //     window.MathJax.texReset()
  //     console.log(
  //       //@ts-ignore
  //       window.MathJax.Hub.getAllJax()
  //     )

  //     //@ts-ignore
  //     window.MathJax.typeset()
  //   }
  // }, [filteredTopic])

  if (!data) return <div>Error</div>

  const filteredTopics = data.topics.filter(
    (t) => filteredTopic === 0 || filteredTopic === t.topicId
  )

  return (
    <div className="content-specification-container">
      <NavBar />
      <SpecFilter
        data={data}
        filteredTopic={filteredTopic}
        setFilteredTopic={setFilteredTopic}
      />
      <ContentCard width="90%">
        {filteredTopics.map((topic, i) => {
          return <SpecTopic key={i} topic={topic} />
        })}
      </ContentCard>
    </div>
  )
}
