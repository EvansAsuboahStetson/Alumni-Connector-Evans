import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuBar from "../MenuBar/MenuBar";
import LoginPage from "../../pages/Auth/LoginPage";
import SignupPage from "../../pages/Auth/SignupPage";
import HomePage from "../../pages/Main/HomePage";
import UsersPage from "../../pages/Main/UsersPage";
import UserEventsPage from "../../pages/Main/UserEventsPage";
import ProfilePage from "../../pages/Main/ProfilePage";

import Matches from "../../pages/Main/Matches";

import Majorpage from "../../pages/Main/MajorPage";
import SearchDisplay from "../Search/SearchDisplay";
import { useState } from "react";


function getMenuItems(user) {
  if (!user) {
    return [];
  }

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "User Events", link: `/users/${user._id}/events` },
    { name: "Profile", link: `/users/${user._id}` },
  ];

  if (user.role === "admin") {
    menuItems.push({ name: "Users", link: "/users" });
  }

  menuItems.push({ name: "Logout", link: "/logout" });

  return menuItems;
}

function getRoutes(user) {
  return [
    { path: "/", component: user ? HomePage : LoginPage, exact: true },
    { path: "/signup", component: SignupPage, exact: true },
    { path: "/users/:userId/events", component: UserEventsPage, exact: true },
    { path: "/users/:userId", component: ProfilePage, exact: true },
    { path: "/users", component: UsersPage, exact: true },
    { path: "/logout", component: Logout, exact: true },

    {path:"/matches",component: Matches,exact:true},

    { path: "/majorpage", component: Majorpage, exact: true},

  ];
}

function Logout() {
  localStorage.clear();
  window.location = "/";
}

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="app">

    
    <div className="pi">
    <MenuBar
      menuItems={getMenuItems(user)}
      routes={getRoutes(user)}
      bg={"dark"}
      variant={"dark"}
      setFilteredData={setFilteredData}
      filteredData={filteredData}
    />
    <SearchDisplay setFilteredData={setFilteredData}  filteredData={filteredData}/>

     </div>
     </div>
  );
}

export default App;
