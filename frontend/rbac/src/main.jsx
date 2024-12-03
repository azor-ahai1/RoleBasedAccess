import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider, HashRouter } from 'react-router-dom'

import {Home, Login, Signup, AdminHome, AllUsers, UserPage, AllAdmins, AdminPage, AllProjects, ProjectPage, EditProjectPage, CreateProjectPage, EditUserPage, CreateUserPage, EditAdminPage} from './pages/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/admin/dashboard",
          element: <AdminHome />,
        },
        {
          path: "/user/users",
          element: <AllUsers />,
        },
        {
          path: "/users/:userId/view",
          element: <UserPage />
        },
        {
          path: "/users/:userId/edit",
          element: <EditUserPage />
        },
        {
          path: "/users/create",
          element: <CreateUserPage />
        },
        {
          path: "/admin/admins",
          element: <AllAdmins />
        },
        {
          path: "/admins/:adminId/view",
          element: <AdminPage />
        },
        {
          path: "/admins/:adminId/edit",
          element: <EditAdminPage />
        },
        {
          path: "/project/projects",
          element: <AllProjects />
        },
        {
          path: "/project/:projectId/view",
          element: <ProjectPage />
        },
        {
          path: "/project/:projectId/edit",
          element: <EditProjectPage />
        },
        {
          path: "/project/create",
          element: <CreateProjectPage />
        },

    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <RouterProvider router={router} />
      </HashRouter>
    </Provider>
  </StrictMode>,
)

