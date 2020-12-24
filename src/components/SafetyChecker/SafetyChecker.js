import React from "react";
import { connect } from "react-redux";
import { GET_ME } from "../../queries/user";
import { useQuery } from "@apollo/client";
import { saveUserInfo } from "../../actions/userInfo";
import { userLogout } from "../../actions/root";

export const SafetyChecker = ({ user, saveUserInfo, userLogout, children }) => {
  const { error, data } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
  });

  if (error) {
    //localStorage.removeItem("auth-token");

    userLogout();
  }

  if (localStorage.getItem("auth-token") && !user && data) {
    saveUserInfo({
      ...data.getMe,
    });
  }

  return <div> {children}</div>;
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveUserInfo: (user) => dispatch(saveUserInfo(user)),
  userLogout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SafetyChecker);
