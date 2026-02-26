// src/app/clubs/page.tsx
"use client";

import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space, Tag, Button, notification, Form, Input, Select, Card } from "antd";
import { useUpdate } from "@refinedev/core";
import { CheckOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { IClub } from "@/interfaces";

export default function ClubList() {
    // Подключаем searchFormProps для связки формы поиска с таблицей
    const { tableProps, searchFormProps } = useTable<IClub>({
        onSearch: (values: any) => {
            const filters: any[] =[];
            // Поиск по названию (содержит)
            if (values.name) {
                filters.push({ field: "name", operator: "contains", value: values.name });
            }
            // Фильтр по статусу (строгое совпадение)
            if (values.status) {
                filters.push({ field: "status", operator: "eq", value: values.status });
            }
            return filters;
        }
    });

    const { mutate } = useUpdate();

    const handleStatusChange = (id: number, status: 'approved' | 'rejected') => {
        mutate({ resource: "clubs", id, values: { status } }, {
            onSuccess: () => notification.success({ message: `Клуб ${status === 'approved' ? 'одобрен' : 'отклонен'}` })
        });
    };

    return (
        <List title="Модерация клубов и заявок">
            {/* БЛОК ПОИСКА */}
            <Card styles={{ body: { padding: '16px' } }} style={{ marginBottom: '16px', borderRadius: '12px' }}>
                <Form {...searchFormProps} layout="inline">
                    <Form.Item name="name">
                        <Input placeholder="Поиск по названию клуба" prefix={<SearchOutlined />} style={{ width: 250 }} />
                    </Form.Item>
                    <Form.Item name="status">
                        <Select placeholder="Все статусы" allowClear style={{ width: 200 }}>
                            <Select.Option value="pending">🟡 Ожидают проверки</Select.Option>
                            <Select.Option value="approved">🟢 Одобрены</Select.Option>
                            <Select.Option value="rejected">🔴 Отклонены</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Найти</Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* ТАБЛИЦА */}
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="name" title="Название клуба" />
                <Table.Column dataIndex="email" title="Email" />
                <Table.Column dataIndex="city" title="Город" />
                <Table.Column<IClub>
                    title="Статус"
                    dataIndex="status"
                    render={(_, record) => {
                        let color = record.status === 'approved' ? 'green' : record.status === 'rejected' ? 'red' : 'gold';
                        let text = record.status === 'approved' ? 'Принят' : record.status === 'rejected' ? 'Отклонен' : 'Ожидает';
                        return <Tag color={color}>{text}</Tag>;
                    }}
                />
                <Table.Column<IClub>
                    title="Действия"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            {record.status !== 'approved' && (
                                <Button icon={<CheckOutlined />} type="primary" size="small" style={{ backgroundColor: '#52c41a' }} onClick={() => handleStatusChange(record.id, 'approved')} />
                            )}
                            {record.status !== 'rejected' && (
                                <Button icon={<CloseOutlined />} type="primary" danger size="small" onClick={() => handleStatusChange(record.id, 'rejected')} />
                            )}
                            <EditButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
}