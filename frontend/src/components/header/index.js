import "./style.css";
import { Link } from "react-router-dom";
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

export default function Header() {
  const color = "#65676b";
  const user = useSelector((user) => ({ ...user }));
  console.log(user);
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="search_input"
          ></input>
        </div>
      </div>
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
        <Link to="/profile" className="profile_link hover1">
          <img src="user?.picture" alt="" />
          <span>Manisha</span>
        </Link>
        <div className="circle_icon hover1">
          <Menu />
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