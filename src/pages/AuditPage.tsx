import React, {useEffect, useState} from 'react';
import {Container, Stack} from "react-bootstrap";
import {AuditLog} from "../api/models/types/AuditLog";
import {toast} from "react-toastify";
import AuditApi from "../api/auditApi";
import AuditCard from "../components/AuditCard";
import {Search, Select} from "@vkontakte/vkui";

const AuditPage = () => {

    const [audits, setAudits] = useState<AuditLog[]>();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('desc');
    const getAuditLogsAsync = async () => {
        try {

            const response = await AuditApi.GetAuditLogsAsync();

            setAudits(response.data)

        } catch (e: unknown) {
            console.log(e);
            toast.error("Ошибка во время получения записей")
        }
    }

    const filter = (audit: AuditLog) => {
        const searchLower = search.toLowerCase();

        return audit.user.username.toLowerCase().includes(searchLower) ||
            audit.user.login.toLowerCase().includes(searchLower) ||
            audit.action.toLowerCase().includes(searchLower) ||
            audit.actionDate.toLocaleString().includes(searchLower) ||
            audit.additionalDetails?.toLowerCase().includes(searchLower)
    }

    useEffect(() => {
        getAuditLogsAsync()
    }, []);

    return (
        <Container>
            <div style={{display: "flex", alignItems: 'center'}}>
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Select options={[
                    {value: 'asc', label: 'Сначала старые'},
                    {value: 'desc', label: 'Сначала новые'}
                ]}
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}/>
            </div>
            <hr/>
            <Stack gap={3} className={'me-md-auto'} style={{marginTop: '10px'}}>
                {audits &&
                    audits
                        .sort((a, b) => {
                            if (sort === "asc") {
                                return a.actionDate > b.actionDate ? 1 : -1
                            } else {
                                return b.actionDate > a.actionDate ? 1 : -1
                            }
                        })
                        .filter((audit) => filter(audit))
                        .map((audit) => <AuditCard key={`${audit.id}`} audit={audit}/>)
                }
            </Stack>
        </Container>
    );
};

export default AuditPage;