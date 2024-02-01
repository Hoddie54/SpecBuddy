import "./pre-auth-page-template.scss"

function PreAuthPageTemplate(props: React.PropsWithChildren) {
  return (
    <div className="pre-auth-template-container">
      <div className="pre-auth-template-title">
        <h2 className="text-6xl text-white">SpecBuddy</h2>
        <br />
        <h2 className="text-6xl text-white font-bold">
          The spec point driven learning platform
        </h2>
      </div>
      <div className="pre-auth-template-card">{props.children}</div>
    </div>
  )
}

export default PreAuthPageTemplate
