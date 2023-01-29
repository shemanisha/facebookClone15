import React from "react";
import AllMenuItem from "./AllMenuItem";
import { menu } from "../../data/allMenu";

export default function AllMenu() {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu"></input>
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header"> Social</div>

            {menu.map((item, i) => {
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
              />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
