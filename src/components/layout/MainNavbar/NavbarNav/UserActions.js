import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { AuthContext } from "../../../../contexts/AuthContext";
//import { AuthContext } from "../../../../contexts/AuthContext";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {}
    };
    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  componentDidMount() {
    //console.log(this.props.user.name);
  }

  render() {
    const { user, visible } = this.state;
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2 pointer"
            src={require("./../../../../images/avatars/0.png")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block pointer">
            {user ? user.fullname : ""}
          </span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={visible}>
          <DropdownItem tag={Link} to="/profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="#">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.context.logout} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

UserActions.contextType = AuthContext;
