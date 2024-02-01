import { Link } from "react-router-dom"
import { SpecPoint } from "../../../types/database-types"

export type ContentVideoNotesProps = {
  specpoint: SpecPoint
}

function NotesSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
    >
      <path
        d="M5 7.5H20C22.6522 7.5 25.1957 8.55357 27.0711 10.4289C28.9464 12.3043 30 14.8478 30 17.5V52.5C30 50.5109 29.2098 48.6032 27.8033 47.1967C26.3968 45.7902 24.4891 45 22.5 45H5V7.5Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M55 7.5H40C37.3478 7.5 34.8043 8.55357 32.9289 10.4289C31.0536 12.3043 30 14.8478 30 17.5V52.5C30 50.5109 30.7902 48.6032 32.1967 47.1967C33.6032 45.7902 35.5109 45 37.5 45H55V7.5Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default function ContentVideoNotes(props: ContentVideoNotesProps) {
  if (props.specpoint.notesLink2 !== "" && props.specpoint.notesLink3 !== "")
    return (
      <>
        <Link target="_blank" to={props.specpoint.notesLink1}>
          <div className="content-video-notes-and-questions flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <NotesSVG />
            <p className="dark:text-white font-bold">Notes 1</p>
          </div>
        </Link>
        <Link target="_blank" to={props.specpoint.notesLink2}>
          <div className="content-video-notes-and-questions flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <NotesSVG />
            <p className="dark:text-white font-bold">Notes 2</p>
          </div>
        </Link>
        <Link target="_blank" to={props.specpoint.notesLink3}>
          <div className="content-video-notes-and-questions flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <NotesSVG />
            <p className="dark:text-white font-bold">Notes 3</p>
          </div>
        </Link>
      </>
    )

  if (props.specpoint.notesLink2 !== "" && props.specpoint.notesLink3 === "")
    return (
      <>
        <Link target="_blank" to={props.specpoint.notesLink1}>
          <div className="content-video-notes-and-questions flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <NotesSVG />
            <p className="dark:text-white font-bold">Notes 1</p>
          </div>
        </Link>
        <Link target="_blank" to={props.specpoint.notesLink2}>
          <div className="content-video-notes-and-questions flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <NotesSVG />
            <p className="dark:text-white font-bold">Notes 2</p>
          </div>
        </Link>
      </>
    )

  return (
    <>
      <Link target="_blank" to={props.specpoint.notesLink1}>
        <div className="content-video-notes-and-questions flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <NotesSVG />
          <p className="dark:text-white font-bold">Read notes</p>
        </div>
      </Link>
    </>
  )
}
