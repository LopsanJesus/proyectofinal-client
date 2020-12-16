import React from "react";
import { connect } from "react-redux";
import { GET_ME } from "./queries/user";
import { useQuery } from "@apollo/client";
import { saveUserInfo } from "./actions/userInfo";
import { userLogout } from './actions/root';
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";

const SafetyChecker = ({
    user,
    saveUserInfo,
    children
}) => {
    const { t } = useTranslation();
    const { loading, error, data } = useQuery(GET_ME, {
        fetchPolicy: "network-only"
    });

    if (loading) return (
        <>
            <h1>{t('home.welcome')}</h1>
            <h3>{t('home.wateringTrees')}</h3>
            <Spinner
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
            />
        </>
    );

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
