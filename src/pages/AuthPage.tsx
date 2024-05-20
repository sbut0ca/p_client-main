import React from 'react';
import AuthForm from "../components/AuthForm";

const AuthPage: React.FC = (): JSX.Element => {
    return (
        <div style={{
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            margin: 'auto auto auto auto',
            height: '100vh',
            width: '100vm'
        }}>
            <AuthForm/>
        </div>
    );
};

export default AuthPage;