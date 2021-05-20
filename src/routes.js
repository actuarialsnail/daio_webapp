// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import DemoPage from "views/Demo/Demo.js";
import GlossaryPage from "views/Glossary/Glossary.js";
import TodoPage from "views/Todo/Todo.js";
import AboutMe from "views/AboutMe/AboutMe.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/demo",
    name: "Demo",
    icon: VideoLibraryIcon,
    component: DemoPage,
    layout: "/admin"
  },
  {
    path: "/glossary",
    name: "Glossary",
    icon: LibraryBooks,
    component: GlossaryPage,
    layout: "/admin"
  },
  {
    path: "/todo",
    name: "To-do list",
    icon: FormatListNumberedIcon,
    component: TodoPage,
    layout: "/admin"
  },
  {
    path: "/about",
    name: "About me",
    icon: Person,
    component: AboutMe,
    layout: "/admin"
  }
];

export default dashboardRoutes;
