import React, {useContext, useState} from 'react';
import {Button, Modal, ModalProps} from "react-bootstrap";
import {FormItem, FormLayout, Input, Select} from "@vkontakte/vkui";
import {toast} from "react-toastify";
import CategoryApi from "../api/categoryApi";
import {RoleType} from "../types/RoleType";
import UserApi from "../api/userApi";
import {User} from "../api/models/types/User";
import {Context} from "../main";

interface DeleteUserProps {
    user: User
    props: ModalProps,
    refresh: () => void
}
const DeleteUserModal : React.FC<DeleteUserProps> = ({user, props, refresh}) => {

    const {store} = useContext(Context)
    const [login, setLogin] = useState<string>(user.login);
    const [password, setPassword] = useState<string>(user.password);
    const [username, setUsername] = useState<string>(user.username);
    const [roleId, setRoleId] = useState<string>(user.roleId);

    const hideThis = () => {
        setUsername(user.username)
        setPassword(user.password)
        setLogin(user.login)
        setRoleId(user.roleId)

        props.onHide()
    }

    const submit = async () => {
        try {
            if (store.currentUser.id === user.id) {
                toast.error('Вы не можете удалить собственный профиль')
                return
            }

            if (!login || !password || !username || !roleId) {
                toast.error('Не все поля заполнены!')
                return
            }

            const response = await UserApi.DeleteUserByIdAsync(user.id)

            if (!response.data.isSuccess) {
                toast.error('Ошибка во время удаления пользователя!')
                return;
            }

            toast.success('Пользователь удален!');

            refresh();

            hideThis()
        } catch (e : unknown) {
            toast.error('Ошибка во время удаления пользователя!')
        }
    }

    return (
        <Modal
            {...props}
            onHide={hideThis}
            size="lg"
            aria-labelledby="addusermodal"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormLayout>
                    <FormItem
                        top={'Логин'}
                        status={login === null ? 'default' : login.length > 0 ? 'default' : 'error'}
                        bottom={login === null ? '' : login.length > 0 ? '' : 'Логин не может быть пустым!'}
                    >
                        <Input
                            disabled
                            value={login ?? ''}
                            onChange={(e) => setLogin(e.target.value)}
                            name={'login'}
                            placeholder={'ivan123'}/>
                    </FormItem>
                    <FormItem
                        top={'Пароль'}
                        status={password === null ? 'default' : password.length > 0 ? 'default' : 'error'}
                        bottom={password === null ? '' : password.length > 0 ? '' : 'Пароль не может быть пустым!'}
                    >
                        <Input
                            disabled
                            value={password ?? ''}
                            onChange={(e) => setPassword(e.target.value)}
                            name={'password'}
                            placeholder={'mypassword'}/>
                    </FormItem>
                    <FormItem
                        top={'Имя'}
                        status={username === null ? 'default' : username.length > 0 ? 'default' : 'error'}
                        bottom={username === null ? '' : username.length > 0 ? '' : 'Имя не может быть пустым!'}
                    >
                        <Input
                            disabled
                            value={username ?? ''}
                            onChange={(e) => setUsername(e.target.value)}
                            name={'username'}
                            placeholder={'Иван Иванович'}/>
                    </FormItem>
                    <FormItem
                        top={'Роль'}
                    >
                        <Select
                            disabled
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                            options={[
                                { value: RoleType.USER, label: 'Пользователь'},
                                { value: RoleType.AUDITOR, label: 'Аудитор'},
                                { value: RoleType.ADMIN, label: 'Администратор'},
                            ]}/>
                    </FormItem>
                </FormLayout>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={submit}>Удалить</Button>
                <Button variant={'secondary'} onClick={hideThis}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUserModal;