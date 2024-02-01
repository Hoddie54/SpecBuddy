import { MathJax } from "better-react-mathjax"
import { useEffect } from "react"
import { useLocation } from "react-router"
import { FormatSpecpointToReactNode } from "../../../utils/formatting"
import ContentCard from "../../content-card/content-card"
import { ContentHomeCardProps } from "../../content-home/content-home-card/content-home-card"
import SpecPointRagRating from "../../content-home/content-home-card/spec-point-rag-rating"
import Rating from "../../rating/rating"
import "./content-video-card.scss"

export default function ContentVideoCard(props: ContentHomeCardProps) {
  var headerColor = "red"
  if (props.progressPercentage >= 0.4 && props.progressPercentage < 0.7) {
    headerColor = "orange"
  } else if (props.progressPercentage > 0.7) {
    headerColor = "green"
  }

  // useEffect(() => {
  //   //@ts-ignore
  //   if (typeof window?.MathJax !== "undefined") {
  //     //@ts-ignore
  //     window.MathJax.typeset()
  //   }
  // }, [])

  const location = useLocation()

  return (
    <ContentCard width="100%" margin="0rem 2rem">
      {/** Header */}
      {/** TODO */}
      {/* <div className="content-video-card-header">
        <div
          className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
          role="progressbar"
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
            style={{
              width: props.progressPercentage * 100 + "%",
              backgroundColor: headerColor,
            }}
          ></div>
        </div>
        <div>
          <span className="inline-flex font-bold items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white">
            {Math.round(props.progressPercentage * 100) + "%"}
          </span>
        </div>
      </div> */}
      {/** Spec point and RAG rating */}
      <div className="content-video-card-spec-container">
        <SpecPointRagRating specPoint={props.specPoint} />
      </div>
      {/** Description */}
      <div className="content-video-card-description-container" id="scrollbar">
        <h3 className="text-4xl dark:text-white font-bold content-video-card-description-title">
          {props.specPoint.title}
        </h3>
        <p className="dark:text-white content-video-card-description-description">
          <MathJax>
            {FormatSpecpointToReactNode(props.specPoint.description)}
          </MathJax>
        </p>
      </div>
      {/** Rating */}
      <div className="content-video-card-rating-container">
        <h4 className="text-xl dark:text-white content-video-card-rating-text">
          Was this {location.pathname.includes("video") ? "video" : "question"}{" "}
          useful?
        </h4>
        <Rating specpoint={props.specPoint} questionId={props.questionId} />
      </div>
    </ContentCard>
  )
}
