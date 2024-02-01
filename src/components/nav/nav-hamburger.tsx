export type NavHamburgerProps = {
  onClick: React.MouseEventHandler<SVGSVGElement> | undefined
}

export default function NavHamburer(props: NavHamburgerProps) {
  return (
    <svg viewBox="0 0 100 80" width="40" height="40" onClick={props.onClick}>
      <rect width="100" height="20" rx="10"></rect>
      <rect y="30" width="100" height="20" rx="10"></rect>
      <rect y="60" width="100" height="20" rx="10"></rect>
    </svg>
  )
}
