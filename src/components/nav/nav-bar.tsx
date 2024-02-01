import { useEffect, useState } from "react"
import "./nav-bar.scss"
import { NavButton } from "./nav-button"
import NavHamburer from "./nav-hamburger"
import NavModal from "./nav-modal"

export default function NavBar() {
  const [showNav, setShowNav] = useState(false)
  const [desktop, setDesktop] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setDesktop(e.matches))
  }, [])

  function handleShowNav() {
    setShowNav((sn) => !sn)
  }

  return (
    <>
      <NavModal />
      <div className="nav-hamburger-container">
        {!desktop && <NavHamburer onClick={handleShowNav} />}
      </div>
      <nav
        className="main-nav"
        style={{
          width: !desktop && !showNav ? "0px" : "100vw",
          padding: !desktop && !showNav ? "0px" : "2rem",
        }}
      >
        <NavButton text="Home" link="/" disabled={false} />
        {/* <NavButton text="My questions" link="/my-questions" /> */}

        {/* <NavButton text="My analytics" link="/my-analytics" disabled={true} /> */}
        <NavButton text="My specification" link="/my-specification" />
        <NavButton text="My settings" link="/my-settings" />
        <button
          type="button"
          data-hs-overlay="#hs-medium-modal"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Give us feedback ♥
        </button>
      </nav>
    </>
  )
}
