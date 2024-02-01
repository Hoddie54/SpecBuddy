import "./spec-button.scss"

export type SpecButtonProps = {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SpecButton(props: SpecButtonProps) {
  return (
    <div
      className="spec-button"
      onClick={() => {
        props.setExpanded((e) => {
          return !e
        })
      }}
    >
      {props.expanded ? "-" : "+"}
    </div>
  )
}
