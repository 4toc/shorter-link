import React, { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes"
import { Spinner } from "evergreen-ui"

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
