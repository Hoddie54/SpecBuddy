import { Link, useLocation } from "react-router-dom"

export type NavButtonProps = {
  text: string
  link: string
  disabled?: boolean
}

export function NavButton(props: NavButtonProps) {
  const location = useLocation()
  const active = location.pathname === props.link

  const disabled = props.disabled

  return (
    <Link
      to={disabled ? "#" : props.link}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className="nav-button py-3 px-4 m-1 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      <div style={{ opacity: disabled ? "50%" : "100%" }}>
        <input
          type="radio"
          name={`hs-checked-radio-${props.text}`}
          className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          id={`hs-checked-radio-${props.text}`}
          checked={active}
          readOnly={true}
        />
        <div className="font-bold">{props.text}</div>
      </div>
    </Link>
  )
}
