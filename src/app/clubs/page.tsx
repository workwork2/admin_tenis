// src/app/clubs/page.tsx
"use client";

import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
// ИЗМЕНЕНИЕ: Убрали notification, добавили App
import { Table, Space, Tag, Button, Form, Input, Select, Card, App } from "antd";
import { useUpdate } from "@refinedev/core";
import { CheckOutlined, CloseOutlined, SearchOutlined, StopOutlined } from "@ant-design/icons";
import { IClub } from "@/interfaces";

export default function ClubList() {
    // ИЗМЕНЕНИЕ: Достаем notification из контекста приложения
    const { notification } = App.useApp();

    const { tableProps, searchFormProps } = useTable<IClub>({
        onSearch: (values: any) => {
            const filters: any[] =[];
            if (values.name) filters.push({ field: "name", operator: "contains", value: values.name });
            if (values.status) filters.push({ field: "status", operator: "eq", value: values.status });
            return filters;
        }
    });

    const { mutate } = useUpdate();

    const handleStatusChange = (id: number, status: string) => {
        mutate({ resource: "clubs", id, values: { status } }, {
            onSuccess: () => notification.success({ message: `Статус изменен на: ${status}` })
        });
    };

    return (
        <List title="Модерация клубов и заявок">
            <Card styles={{ body: { padding: '16px' } }} style={{ marginBottom: '16px', borderRadius: '12px' }}>
                <Form {...searchFormProps} layout="inline">
                    <Form.Item name="name"><Input placeholder="Поиск по названию" prefix={<SearchOutlined />} style={{ width: 250 }} /></Form.Item>
                    <Form.Item name="status">
                        <Select placeholder="Все статусы" allowClear style={{ width: 200 }}>
                            <Select.Option value="pending">🟡 Ожидают проверки</Select.Option>
                            <Select.Option value="approved">🟢 Одобрены</Select.Option>
                            <Select.Option value="rejected">🔴 Отклонены</Select.Option>
                            <Select.Option value="banned">⚫ Заблокированы</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item><Button type="primary" htmlType="submit">Найти</Button></Form.Item>
                </Form>
            </Card>

            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="name" title="Название клуба" />
                <Table.Column dataIndex="email" title="Email" />
                <Table.Column dataIndex="city" title="Город" />
                <Table.Column<IClub>
                    title="Статус"
                    dataIndex="status"
                    render={(val) => {
                        const colors: any = { approved: 'green', rejected: 'red', pending: 'gold', banned: 'default' };
                        const texts: any = { approved: 'Принят', rejected: 'Отклонен', pending: 'Ожидает', banned: 'Забанен' };
                        return <Tag color={colors[val]}>{texts[val]}</Tag>;
                    }}
                />
                <Table.Column<IClub>
                    title="Действия"
                    render={(_, record) => (
                        <Space>
                            {record.status === 'pending' && (
                                <>
                                    <Button icon={<CheckOutlined />} type="primary" size="small" style={{ backgroundColor: '#52c41a' }} onClick={() => handleStatusChange(record.id, 'approved')} />
                                    <Button icon={<CloseOutlined />} type="primary" danger size="small" onClick={() => handleStatusChange(record.id, 'rejected')} />
                                </>
                            )}
                            {record.status === 'approved' && (
                                <Button size="small" danger icon={<StopOutlined />} onClick={() => handleStatusChange(record.id, 'banned')}>Бан</Button>
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