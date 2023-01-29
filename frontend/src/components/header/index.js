import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./searchMenu";
import AllMenu from "./AllMenu";

export default function Header() {
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const user = useSelector((user) => ({ ...user }));

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="search_input"
          ></input>
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <Link to="/" className="middle_icon active hover1">
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_Link hover1">
          <img src={user.user?.picture} alt="userImage" />
          <span>{user.user?.first_name}</span>
        </Link>
        <div className="circle_icon hover1">
          <Menu />
          <AllMenu />
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div className="circle_icon hover1">
          <ArrowDown />
        </div>
      </div>
    </header>
  );
}
