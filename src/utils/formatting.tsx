import React from "react"

export function FormatSpecpointToReactNode(specpointText: string) {
  return specpointText.split("\\n").map((item, idx) => {
    const bulletPoints = item.includes("•")
    const content = bulletPoints ? (
      <ul>
        {item
          .split("•")
          .slice(1)
          .map((i, j) => {
            return <li key={j}>{i}</li>
          })}
      </ul>
    ) : (
      item
    )

    return (
      <React.Fragment key={idx}>
        {idx !== 0 && <br />}
        {content}
        <br />
      </React.Fragment>
    )
  })
}
