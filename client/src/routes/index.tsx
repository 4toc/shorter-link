import React, { lazy } from "react"
import { Route, Switch } from "react-router-dom"

const CreateLinkPage = lazy(() => import("../pages/CreateLinkPage"))

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path='/' component={CreateLinkPage} />
    </Switch>
  )
}

export default AppRoutes
