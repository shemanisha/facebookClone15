import React from "react";
import { useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Header from "../../components/header";
import "./styles.css";

export default function Home() {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });
  return (
    <div>
      <Header></Header>
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
}
