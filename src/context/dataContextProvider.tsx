import { createContext, useState } from "react"
import { Subject } from "../types/database-types"

export type DataContextType = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  data: Subject | null
  setData: React.Dispatch<React.SetStateAction<Subject | null>>
}

export const DataContext = createContext<DataContextType>({
  loading: true,
  setLoading: () => {},
  data: null,
  setData: () => {},
})

export default function DataContextProvider(props: any) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Subject | null>(null)
  return (
    <DataContext.Provider
      value={{
        loading: loading,
        setLoading: setLoading,
        data: data,
        setData: setData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
