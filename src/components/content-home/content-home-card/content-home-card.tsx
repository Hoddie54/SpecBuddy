import "./content-home-card.scss"
import ContentCard from "../../content-card/content-card"
import { Link } from "react-router-dom"
import SpecPointRagRating from "./spec-point-rag-rating"
import { SpecPoint } from "../../../types/database-types"
import { FormatSpecpointToReactNode } from "../../../utils/formatting"
import { MathJax } from "better-react-mathjax"

export type ContentHomeCardProps = {
  progressPercentage: number //Note this number is a decimal e.g., 0.6 = 60%
  specPoint: SpecPoint
  questionId?: number
  //TODO - Add links to content and questions
}

export default function ContentHomeCard(props: ContentHomeCardProps) {
  var headerColor = "red"
  if (props.progressPercentage >= 0.4 && props.progressPercentage < 0.7) {
    headerColor = "orange"
  } else if (props.progressPercentage > 0.7) {
    headerColor = "green"
  }

  const shortenedDescription =
    props.specPoint.description.substring(0, 100) + "..."

  return (
    <ContentCard>
      {/** Header */}
      {/** TODO - HIDDEN */}
      {/* <div className="content-home-card-header hidden">
        <div
          className="flex hidden w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
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
          <span className="inline-flex hidden font-bold items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white">
            {Math.round(props.progressPercentage * 100) + "%"}
          </span>
        </div>
      </div> */}
      {/** Spec point and RAG rating */}
      <div className="content-home-card-spec-container">
        <SpecPointRagRating specPoint={props.specPoint} />
      </div>
      {/** Description */}
      <div className="content-home-card-description-container">
        <h3 className="text-4xl dark:text-white font-bold">
          {props.specPoint.title}
        </h3>
        <p className="dark:text-white">
          <MathJax>{FormatSpecpointToReactNode(shortenedDescription)}</MathJax>
        </p>
      </div>
      {/** Links */}
      <div className="content-home-card-links-container">
        <div className="content-home-card-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
          >
            <path
              d="M17.5 52.5H42.5"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 7.5H10C7.23858 7.5 5 9.73858 5 12.5V37.5C5 40.2614 7.23858 42.5 10 42.5H50C52.7614 42.5 55 40.2614 55 37.5V12.5C55 9.73858 52.7614 7.5 50 7.5Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <Link
              to={`/video/${props.specPoint.specpointNumber.replaceAll(
                "-",
                "/"
              )}`}
            >
              Learn content
            </Link>
          </div>
        </div>
        <div className="content-home-card-link">
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
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 45C38.2843 45 45 38.2843 45 30C45 21.7157 38.2843 15 30 15C21.7157 15 15 21.7157 15 30C15 38.2843 21.7157 45 30 45Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 35C32.7614 35 35 32.7614 35 30C35 27.2386 32.7614 25 30 25C27.2386 25 25 27.2386 25 30C25 32.7614 27.2386 35 30 35Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <Link
              to={`/question/${props.specPoint.specpointNumber.replaceAll(
                "-",
                "/"
              )}`}
            >
              Answer questions
            </Link>
          </div>
        </div>
      </div>
    </ContentCard>
  )
}
