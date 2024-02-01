import { ChangeEvent, useContext } from "react"
import { UserContext } from "../../../context/userContextProvider"
import { updateRating } from "../../../firestore/firestore"
import { SpecPoint } from "../../../types/database-types"

export type SpecPointRagRatingProps = {
  specPoint: SpecPoint
}

export default function SpecPointRagRating(props: SpecPointRagRatingProps) {
  const { userData, setUserData } = useContext(UserContext)

  let selected = -1
  const rating_id =
    props.specPoint.examBoard +
    "-" +
    props.specPoint.subject +
    "-" +
    props.specPoint.specpointNumber

  if (userData && userData.ratings) {
    selected = userData.ratings[rating_id]
  }

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value)

    await updateRating(
      userData?.uid,
      props.specPoint.subject,
      props.specPoint.examBoard,
      props.specPoint.specpointNumber,
      value
    )
    setUserData((data) => {
      if (data) {
        return { ...data, ratings: { ...data.ratings, [rating_id]: value } }
      }
      return null
    })
    //userData?.ratings[rating_id] = value
  }

  let color = ""
  if (userData && userData.ratings) {
    switch (userData?.ratings[rating_id]) {
      case 0:
        color = "lightpink"
        break
      case 1:
        color = "orange"
        break
      case 2:
        color = "lightgreen"
        break
    }
  }

  return (
    <>
      <span className="inline-flex font-bold items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-slate-900 dark:border-gray-700 dark:text-white">
        {`Spec ${props.specPoint.specpointNumber.replaceAll("-", ".")}`}
      </span>
      <select
        defaultValue={selected}
        onChange={onChange}
        style={color ? { border: `${color} 2px solid` } : {}}
        // style={{ backgroundColor: color }}
        className="topic-choices-topic font-bold py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
      >
        <option value="-1">Rate yourself</option>
        <option value="0">Red</option>
        <option value="1">Amber</option>
        <option value="2">Green</option>
      </select>
    </>
  )
}
