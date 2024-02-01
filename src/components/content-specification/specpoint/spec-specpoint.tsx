import { MathJax } from "better-react-mathjax"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../../context/userContextProvider"
import { SpecPoint } from "../../../types/database-types"
import { FormatSpecpointToReactNode } from "../../../utils/formatting"
import "./spec-specpoint.scss"

export type SpecSpecpointProps = {
  specpoint: SpecPoint
  score: number //As a decimal
}

export default function SpecSpecpoint(props: SpecSpecpointProps) {
  const { userData } = useContext(UserContext)
  let rating = -1

  if (userData && userData.ratings) {
    const rating_id =
      props.specpoint.examBoard +
      "-" +
      props.specpoint.subject +
      "-" +
      props.specpoint.specpointNumber

    if (userData.ratings[rating_id] !== null)
      rating = userData.ratings[rating_id]
  }

  let backgroundColor = "grey"

  switch (rating) {
    case 0:
      backgroundColor = "red"
      break
    case 1:
      backgroundColor = "orange"
      break
    case 2:
      backgroundColor = "green"
      break
  }

  // useEffect(() => {
  //   //@ts-ignore
  //   if (typeof window?.MathJax !== "undefined") {

  //     //@ts-ignore
  //     window.MathJax.typesetClear()
  //     //@ts-ignore
  //     window.MathJax.texReset()
  //     //@ts-ignore
  //     window.MathJax.typeset()
  //   }
  // }, [])

  return (
    <div className="spec-specpoint-container">
      <div className="spec-specpoint-number text-s dark:text-white">
        <span>{props.specpoint.specpointNumber.replaceAll("-", ".")}</span>
      </div>
      <div className="spec-specpoint-description text-s dark:text-white">
        <MathJax dynamic={true}>
          {FormatSpecpointToReactNode(props.specpoint.description)}
        </MathJax>
        <hr />
      </div>
      <div className="spec-specpoint-info">
        {/** TODO - HIDDEN */}
        <span className="inline-flex hidden font-bold items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white">
          {`${Math.round(props.score * 100)}%`}
        </span>
        <button style={{ backgroundColor: backgroundColor }}>
          <Link
            // target="_blank"
            to={`/video/${props.specpoint.specpointNumber.replaceAll(
              "-",
              "/"
            )}`}
          >
            Learn
          </Link>
        </button>
      </div>
    </div>
  )
}
