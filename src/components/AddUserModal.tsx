import React, {useState} from 'react';
import {Button, Modal, ModalProps} from "react-bootstrap";
import {FormItem, FormLayout, Input, Select} from "@vkontakte/vkui";
import {toast} from "react-toastify";
import CategoryApi from "../api/categoryApi";
import {RoleType} from "../types/RoleType";
import UserApi from "../api/userApi";

interface AddUserProps {
    props: ModalProps,
    refresh: () => void
}
const AddUserModal : React.FC<AddUserProps> = ({props, refresh}) => {

    const [login, setLogin] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);
    const [username, setUsername] = useState<string>(null);
    const [roleId, setRoleId] = useState<string>('user');

    const hideThis = () => {
        setUsername(null)
        setPassword(null)
        setLogin(null)
        setRoleId(RoleType.USER)

        props.onHide()
    }

    const submit = async () => {
        try {
            if (!login || !password || !username || !roleId) {
                toast.error('Не все поля заполнены!')
                return
            }

            const response = await UserApi.AddUserAsync(login, password, username, roleId.toString())

            if (!response.data.id) {
                toast.error('Ошибка во время добавления нового пользователя!')
                return;
            }

            toast.success('Пользователь добавлен!');

            refresh();

            hideThis()
        } catch (e : unknown) {
            toast.error('Ошибка во время добавления нового пользователя!')
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
                    Добавление пользователя
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
                            value={username ?? ''}
                            onChange={(e) => setUsername(e.target.value)}
                            name={'username'}
                            placeholder={'Иван Иванович'}/>
                    </FormItem>
                    <FormItem
                        top={'Роль'}
                    >
                        <Select
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
                <Button variant={'success'} onClick={submit}>Добавить</Button>
                <Button variant={'secondary'} onClick={hideThis}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddUserModal;