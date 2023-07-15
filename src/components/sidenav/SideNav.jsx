import React, { useState } from "react";
import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { useNavigate, useLocation } from "react-router-dom";
import ClickOutside from "./ClickOutside";
import {
  CameraIcon,
  ClipboardIcon,
  HomeIcon,
  MapIcon,
  NewspaperIcon,
  DeviceMobileIcon,
  UsersIcon,
} from "@heroicons/react/solid";

import "../../styles/sideBar.css";

const navItemsList = [
  { itemKey: "home", itemText: "Home", itemIcon: HomeIcon },
  { itemKey: "projects", itemText: "Projects", itemIcon: ClipboardIcon },
  { itemKey: "templates", itemText: "Templates", itemIcon: NewspaperIcon },
  { itemKey: "sites", itemText: "Sites", itemIcon: MapIcon },
  { itemKey: "pictures", itemText: "Pictures", itemIcon: CameraIcon },
  {
    itemKey: "devices",
    itemText: "Devices",
    itemIcon: DeviceMobileIcon,
  },
  { itemKey: "users", itemText: "Users", itemIcon: UsersIcon },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <ClickOutside
      onClickOutside={() => {
        setExpanded(false);
      }}
    >
      <SideNav
        onToggle={(expanded) => {
          setExpanded(expanded);
        }}
        expanded={expanded}
        onSelect={(selected) => {
          const to = "/" + selected;
          navigate(to);
        }}
        className={"mysidenav sidenavCss"}
      >
        <SideNav.Toggle />
        <SideNav.Nav
          defaultSelected={
            location.pathname ? location.pathname.replace("/", "") : "home"
          }
        >
          {navItemsList.map((item, index) => {
            return (
              <NavItem eventKey={item.itemKey} key={item.itemKey}>
                <NavIcon>
                  <Tooltip label={item.itemText} isDisabled={!!expanded}>
                    <Icon as={item.itemIcon} color={"white"} />
                  </Tooltip>
                </NavIcon>
                <NavText>{item.itemText}</NavText>
              </NavItem>
            );
          })}
        </SideNav.Nav>
      </SideNav>
    </ClickOutside>
  );
};
export default SideBar;
