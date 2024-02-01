import { cloneElement, useContext, useEffect } from "react"
import "./App.css"
import { useLocation, useRoutes } from "react-router"
import { UserContext } from "./context/userContextProvider"
import Login from "./pages/login/login"
import ResetPassword from "./pages/reset-password/reset-password"
import Register from "./pages/register/register"
import ContentHome from "./pages/content-home/content-home"
import ContentVideo from "./pages/content-video/content-video"
import { DataContext } from "./context/dataContextProvider"
import { getCollection } from "./firestore/firestore"
import Loading from "./pages/loading/loading"
import ContentSpecification from "./pages/content-specification/content-specification"
import ContentQuestion from "./pages/content-question/content-question"
import Settings from "./pages/settings/settings"
import AdditionalInformationPage from "./pages/additional-information-page/additional-information-page"
import { auth } from "./auth/firebase"
import { onAuthStateChanged } from "firebase/auth"

function App() {
  let pathRoutes = null
  //TODO - Add 404

  const { user, userData, setUser } = useContext(UserContext)
  const { loading, setData, setLoading, data } = useContext(DataContext)

  const location = useLocation()

  useEffect(() => {
    require("preline/preline")
  }, [])

  useEffect(() => {
    // @ts-ignore
    HSStaticMethods.autoInit()
  }, [location.pathname])

  useEffect(() => {
    const load = async () => {
      if (loading && userData) {
        //@ts-ignore
        const res: Subject[] = await getCollection("subjects")
        console.log(res)
        setData(res[0]) //TODO - Change to include multiople subjects
      }
    }
    load()
  }, [setData, data, userData, loading])

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // console.log("a ", user)
      if (!user && currentUser) setUser(auth.currentUser)
    })
  }, [setUser, user])

  useEffect(() => {
    if (data && userData && loading) {
      setLoading(false)
    }
  }, [loading, setLoading, data, userData])

  const hasUserFilledOutSubjects = user && userData && userData.subjects

  if (user && userData && !loading && hasUserFilledOutSubjects)
    pathRoutes = [
      { path: "/", element: <ContentHome /> },
      {
        path: "/video/:topicId/:subtopicId/:specpointId",
        element: <ContentVideo />,
      },
      {
        path: "/question/:topicId/:subtopicId/:specpointId",
        element: <ContentQuestion />,
      },
      { path: "/my-settings/", element: <Settings /> },
      { path: "/my-specification/", element: <ContentSpecification /> },
      { path: "*", element: <ContentHome /> },
    ]
  else if (user && !loading && !hasUserFilledOutSubjects)
    pathRoutes = [{ path: "*", element: <AdditionalInformationPage /> }]
  else if (user && loading) pathRoutes = [{ path: "*", element: <Loading /> }]
  else
    pathRoutes = [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "*", element: 404 },
    ]

  const paths = useRoutes(pathRoutes)

  if (!paths) return null

  return cloneElement(paths, { key: location.pathname })
}

export default App
