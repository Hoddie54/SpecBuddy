import "./content-card.scss"

export type ContentCardProps = {
  width?: string
  margin?: string
  backgroundColor?: string
  children: any
}

export default function ContentCard(props: ContentCardProps) {
  return (
    <div
      className="content-card flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]"
      style={{
        width: props.width ? props.width : "",
        margin: props.margin ? props.margin : "",
        backgroundColor: props.backgroundColor ? props.backgroundColor : "",
      }}
    >
      <div className="content-card-svg">
        <div className="content-card-svg-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="211"
            height="172"
            viewBox="0 0 211 172"
            fill="none"
          >
            <path
              opacity="0.8"
              d="M20 20L191 152"
              stroke="url(#paint0_radial_72532_109762)"
              stroke-width="40"
              stroke-linecap="round"
            />
            <defs>
              <radialGradient
                id="paint0_radial_72532_109762"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(105.5 86) rotate(90) scale(66 85.5)"
              >
                <stop stop-color="#C084FC" />
                <stop offset="1" stop-color="#76D8F9" stop-opacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="content-card-svg-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="169"
            height="166"
            viewBox="0 0 169 166"
            fill="none"
          >
            <path
              opacity="0.8"
              d="M12.8262 0.265034L160.221 33.046C167.923 34.7589 170.701 44.2994 165.121 49.8786L52.1513 162.849C46.6138 168.386 37.1482 165.698 35.348 158.076L0.923017 12.3252C-0.772864 5.14503 5.62452 -1.33664 12.8262 0.265034Z"
              fill="url(#paint0_radial_72532_109763)"
              fillOpacity="0.5"
            />
            <defs>
              <radialGradient
                id="paint0_radial_72532_109763"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(174.465 21.2349) rotate(-178.848) scale(124.729 147.178)"
              >
                <stop stop-color="#67E8F9" />
                <stop offset="1" stop-color="#C084FC" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="content-card-svg-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="114"
            height="98"
            viewBox="0 0 114 98"
            fill="none"
          >
            <path
              opacity="0.8"
              d="M20 20L94 78"
              stroke="url(#paint0_radial_72532_109764)"
              stroke-width="40"
              stroke-linecap="round"
            />
            <defs>
              <radialGradient
                id="paint0_radial_72532_109764"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(15.4326 27.1618) rotate(45.9679) scale(65.6574 77.4926)"
              >
                <stop stop-color="#67E8F9" />
                <stop offset="1" stop-color="#C084FC" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="content-card-svg-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="211"
            height="172"
            viewBox="0 0 211 172"
            fill="none"
          >
            <path
              opacity="0.8"
              d="M20 20L191 152"
              stroke="url(#paint0_radial_72532_109765)"
              stroke-width="40"
              stroke-linecap="round"
            />
            <defs>
              <radialGradient
                id="paint0_radial_72532_109765"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(105.5 86) rotate(90) scale(66 85.5)"
              >
                <stop stop-color="#C084FC" />
                <stop offset="1" stop-color="#76D8F9" stop-opacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="p-4 md:p-7 content-card-content">{props.children}</div>
    </div>
  )
}
