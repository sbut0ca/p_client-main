import React, {useContext, useState} from 'react';
import {Button, Card, FormItem, FormLayout, Input} from "@vkontakte/vkui";
import classes from '../styles/authform.module.css'
import {toast} from "react-toastify";
import {Context} from "../main";
import {useNavigate} from "react-router-dom";

const AuthForm = () => {

    const {store} = useContext(Context)
    const navigate = useNavigate();

    const [login, setLogin] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);
    const [loading, setLoading] = useState(false);

    const loginClick = async () => {
        setLoading(true)
        const result = await store.LoginAsync(login, password);

        if (result.isSuccess) {
            toast.success(`Вы успешно авторизовались под пользователем '${result.user.username}'`)
            setLoading(false)
            navigate('/')
            return;
        }
        setLoading(false)
        toast.error(`Ошибка при авторизации: ${result.error}`)
    }

    return (
        <Card mode={'outline'} className={classes.wrapper}>
            <h2 className={classes.header}>Вход в аккаунт</h2>
            <FormLayout className={classes.form}>
                <FormItem
                    top='Логин'
                    status={login === null ? 'default' : login.length > 0 ? 'default' : 'error'}
                    bottom={login === null ? '' : login.length > 0 ? '' : 'Введите логин!'}
                >
                    <Input name={'login'} value={login ?? ''} onChange={(e) => {
                        setLogin(e.target.value)
                    }}/>
                </FormItem>
                <FormItem
                    top='Пароль'
                    status={password === null ? 'default' : password.length > 0 ? 'default' : 'error'}
                    bottom={password === null ? '' : password.length > 0 ? '' : 'Введите пароль!'}
                >

                    <Input type={'password'} name={'password'} value={password ?? ''}
                           onChange={(e) => {
                               setPassword(e.target.value)
                           }}/>
                </FormItem>
                <Button className={classes.button} stretched onClick={loginClick} loading={loading}
                        disabled={loading}>Войти</Button>
            </FormLayout>
        </Card>
    )
};

export default AuthForm;