export default function Card(props: any) {
  return (
    <div
      className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]"
      style={{ width: "100%", padding: "2rem" }}
    >
      {props.children}
    </div>
  )
}
