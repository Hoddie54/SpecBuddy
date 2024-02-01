import { useState } from "react"
import { SpecPoint } from "../../../types/database-types"
import Card from "../../card/card"

export type ContentVideoIframeProps = {
  specpoint: SpecPoint
}

export default function ContentVideoIframe(props: ContentVideoIframeProps) {
  const [video, setVideo] = useState(1)

  let videoCount = 1
  if (props.specpoint.videoLink2 !== "") videoCount++
  if (props.specpoint.videoLink3 !== "") videoCount++

  let videoLink = ""

  switch (video) {
    case 1:
      videoLink = props.specpoint.videoLink
      break
    case 2:
      videoLink = props.specpoint.videoLink2
      break
    case 3:
      videoLink = props.specpoint.videoLink3
      break
  }

  videoLink = videoLink.replace("/watch?v=", "/embed/").split("&list=")[0]

  if (videoCount >= 2)
    return (
      <Card>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex" aria-label="Tabs" role="tablist">
              <button
                type="button"
                className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active"
                id="tabs-with-underline-item-1"
                data-hs-tab="#tabs-with-underline-1"
                aria-controls="tabs-with-underline-1"
                role="tab"
                onClick={(e) => {
                  setVideo(1)
                }}
              >
                Video 1
              </button>
              <button
                type="button"
                className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500"
                id="tabs-with-underline-item-2"
                data-hs-tab="#tabs-with-underline-2"
                aria-controls="tabs-with-underline-2"
                role="tab"
                onClick={(e) => {
                  setVideo(2)
                }}
              >
                Video 2
              </button>
              {videoCount === 3 && (
                <button
                  type="button"
                  className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500"
                  id="tabs-with-underline-item-3"
                  data-hs-tab="#tabs-with-underline-3"
                  aria-controls="tabs-with-underline-3"
                  role="tab"
                  onClick={() => {
                    setVideo(3)
                  }}
                >
                  Video 3
                </button>
              )}
            </nav>
          </div>

          <div className="mt-3 w-100">
            <div
              id="tabs-with-underline-1"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-1"
            >
              <iframe
                height="400px"
                width="100%"
                src={videoLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div
              id="tabs-with-underline-2"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-2"
            >
              <iframe
                height="400px"
                width="100%"
                src={videoLink.replace("/watch?v=", "/embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div
              id="tabs-with-underline-3"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-3"
            >
              <iframe
                height="400px"
                width="100%"
                src={videoLink.replace("/watch?v=", "/embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Card>
    )

  return (
    <Card>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <iframe
          height="400px"
          src={videoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </Card>
  )
}
