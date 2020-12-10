import React, { Fragment } from "react";
import { connect } from "react-redux";
import { GET_ME } from "./queries/user";
import { useQuery } from "@apollo/client";
import { saveUserInfo } from "./actions/userInfo";
import { Spinner } from "react-bootstrap";
import { userLogout } from './actions/root';

const SafetyChecker = ({
    user,
    saveUserInfo,
    children
}) => {
    const { loading, error, data } = useQuery(GET_ME, {
        fetchPolicy: "network-only"
    });

    if (loading) return <Spinner />;

    if (error)
        userLogout();

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
