// src/app/users/page.tsx
"use client";

import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
// ИЗМЕНЕНИЕ: Убрали notification, добавили App
import { Table, Space, Tag, Form, Input, Button, Card, App } from "antd";
import { SearchOutlined, StopOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useUpdate } from "@refinedev/core";
import { IUser } from "@/interfaces";

export default function UserList() {
    // ИЗМЕНЕНИЕ: Достаем notification из контекста приложения (чтобы работали темы)
    const { notification } = App.useApp();
    
    const { tableProps, searchFormProps } = useTable<IUser>({
        onSearch: (values: any) => {
            const filters: any[] =[];
            if (values.lastName) filters.push({ field: "lastName", operator: "contains", value: values.lastName });
            if (values.city) filters.push({ field: "city", operator: "contains", value: values.city });
            return filters;
        }
    });

    const { mutate } = useUpdate();

    const toggleBan = (id: number, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'banned' : 'active';
        mutate({ resource: "users", id, values: { status: newStatus } }, {
            onSuccess: () => notification.success({ message: `Пользователь ${newStatus === 'banned' ? 'забанен' : 'разбанен'}` })
        });
    };

    return (
        <List title="Участники платформы">
            <Card styles={{ body: { padding: '16px' } }} style={{ marginBottom: '16px', borderRadius: '12px' }}>
                <Form {...searchFormProps} layout="inline">
                    <Form.Item name="lastName"><Input placeholder="Поиск по Фамилии" prefix={<SearchOutlined />} style={{ width: 250 }} /></Form.Item>
                    <Form.Item name="city"><Input placeholder="Город (например, Москва)" style={{ width: 200 }} /></Form.Item>
                    <Form.Item><Button type="primary" htmlType="submit">Найти</Button></Form.Item>
                </Form>
            </Card>

            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="firstName" title="Имя" />
                <Table.Column dataIndex="lastName" title="Фамилия" />
                <Table.Column dataIndex="email" title="E-mail" />
                <Table.Column<IUser> title="Статус" dataIndex="status" render={(val) => (
                    <Tag color={val === 'banned' ? 'red' : 'green'}>{val === 'banned' ? 'Забанен' : 'Активен'}</Tag>
                )} />
                <Table.Column<IUser>
                    title="Действия"
                    render={(_, record) => (
                        <Space>
                            {record.status === 'active' ? (
                                <Button size="small" danger icon={<StopOutlined />} onClick={() => toggleBan(record.id, record.status)}>Бан</Button>
                            ) : (
                                <Button size="small" type="primary" style={{ background: '#52c41a' }} icon={<CheckCircleOutlined />} onClick={() => toggleBan(record.id, record.status)}>Разбан</Button>
                            )}
                            <EditButton hideText size="small" recordItemId={record.id} />
                            <DeleteButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
}