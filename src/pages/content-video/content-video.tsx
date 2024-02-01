import "./content-video.scss"
import NavBar from "../../components/nav/nav-bar"
import ContentVideoCard from "../../components/content-video/content-video-card/content-video-card"
import { useParams } from "react-router"
import { useContext } from "react"
import { DataContext } from "../../context/dataContextProvider"
import { Link } from "react-router-dom"
import ContentVideoNotes from "../../components/content-video/content-video-notes/content-video-notes"
import ContentVideoIframe from "../../components/content-video/content-video-iframe/content-video-iframe"

export default function ContentVideo() {
  let { topicId, subtopicId, specpointId } = useParams()
  const { data } = useContext(DataContext)

  const specpoint = //@ts-ignore
    data?.topics[parseInt(topicId) - 1].subtopics[parseInt(subtopicId) - 1] //@ts-ignore
      .specpoints[parseInt(specpointId) - 1]

  if (!specpoint) return <div>Error</div>

  const isFirstSpecPoint = parseInt(specpointId + "") === 1
  const isFinalSpecPoint =
    parseInt(specpointId + "") === //@ts-ignore
    data?.topics[parseInt(topicId) - 1].subtopics[parseInt(subtopicId) - 1]
      .specpoints.length

  return (
    <>
      <NavBar />
      <div className="content-video-container">
        <div className="content-video-left">
          {/** Video */}
          <ContentVideoIframe specpoint={specpoint} />
          {/** Notes and questions */}
          <div className="content-video-notes-and-questions-container">
            <ContentVideoNotes specpoint={specpoint} />
            <Link
              to={`/question/${specpoint.topicId}/${specpoint.subtopicId}/${specpoint.specpointId}`}
            >
              <div className="content-video-notes-and-questions flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <path
                    d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M30 45C38.2843 45 45 38.2843 45 30C45 21.7157 38.2843 15 30 15C21.7157 15 15 21.7157 15 30C15 38.2843 21.7157 45 30 45Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M30 35C32.7614 35 35 32.7614 35 30C35 27.2386 32.7614 25 30 25C27.2386 25 25 27.2386 25 30C25 32.7614 27.2386 35 30 35Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="dark:text-white font-bold">Answer questions</p>
              </div>
            </Link>
          </div>
          {/** Spec buttons */}
          <div className="content-video-buttons">
            <div
              className={`content-video-button ${
                isFirstSpecPoint ? "disabled" : ""
              } flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]`}
            >
              {isFirstSpecPoint ? (
                <div>{"< Previous Spec Point"}</div>
              ) : (
                <Link
                  to={`/video/${specpoint.topicId}/${specpoint.subtopicId}/${
                    specpoint.specpointId - 1
                  }`}
                >
                  {"< Previous Spec Point"}
                </Link>
              )}
            </div>
            <div
              className={`content-video-button ${
                isFinalSpecPoint ? "disabled" : ""
              } flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]`}
            >
              {isFinalSpecPoint ? (
                <div>{"Next Spec Point >"}</div>
              ) : (
                <Link
                  to={`/video/${specpoint.topicId}/${specpoint.subtopicId}/${
                    specpoint.specpointId + 1
                  }`}
                >
                  {"Next Spec Point >"}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="content-video-right">
          <ContentVideoCard
            specPoint={specpoint}
            progressPercentage={Math.random()}
          />
        </div>
      </div>
    </>
  )
}
