import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

const SidebarContent = () => {

  let { navStyle, themeType, pathname } = useSelector(({ settings }) => settings);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (<>

    <SidebarLogo />
    <div className="gx-sidebar-content">
      <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
        <UserProfile />
        <AppsNavigation />
      </div>
      <CustomScrollbars className="gx-layout-sider-scrollbar">
        <Menu
          defaultOpenKeys={[defaultOpenKeys]}
          selectedKeys={[selectedKeys]}
          theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
          mode="inline">

          <Menu.Item key="sample">
            <Link to="/sample"><i className="icon icon-widgets" />
              <span><IntlMessages id="sidebar.samplePage" /></span>
            </Link>
          </Menu.Item>

        </Menu>
      </CustomScrollbars>
    </div>
  </>
  );
};

SidebarContent.propTypes = {};

export default SidebarContent;

