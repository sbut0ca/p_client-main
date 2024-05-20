import React, {useEffect, useState} from 'react';
import {Search} from "@vkontakte/vkui";
import {Button, Container, Stack} from "react-bootstrap";
import {toast} from "react-toastify";
import UserApi from "../api/userApi";
import {User} from "../api/models/types/User";
import UserCard from "../components/UserCard";
import AddUserModal from "../components/AddUserModal";

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>();
    const [search, setSearch] = useState('');
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const getUsersAsync = async () => {
        try {

            const response = await UserApi.GetAllAsync();

            setUsers(response.data)

        } catch (e: unknown) {
            console.log(e)
            toast.error('Ошибка во время выполнения запроса');
        }
    }

    const filter = (user: User) => {
        const searchLower = search.toLowerCase();

        return user.username.toLowerCase().includes(searchLower) ||
            user.login.toLowerCase().includes(searchLower) ||
            user.roleId.toLowerCase().includes(searchLower)
    }

    useEffect(() => {
        getUsersAsync()
    }, []);

    return (
        <Container>
            <div style={{display: "flex", alignItems: 'center'}}>
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Button variant={'success'} onClick={() => setShowAddUserModal(true)}>Добавить</Button>
            </div>
            <hr/>
            <Stack gap={3} className={'me-md-auto'} style={{marginTop: '10px'}}>
                {users &&
                    users
                        .filter((user) => filter(user))
                        .map((user) => <UserCard key={user.id} user={user} refresh={getUsersAsync}/>)
                }
            </Stack>
            <AddUserModal props={{show: showAddUserModal, onHide: () => setShowAddUserModal(false)}} refresh={getUsersAsync}/>
        </Container>
    );
};

export default UsersPage;