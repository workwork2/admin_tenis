// src/app/users/page.tsx
"use client";

import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space, Tag, Form, Input, Button, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IUser } from "@/interfaces";

export default function UserList() {
    const { tableProps, searchFormProps } = useTable<IUser>({
        onSearch: (values: any) => {
            const filters: any[] =[];
            if (values.lastName) {
                filters.push({ field: "lastName", operator: "contains", value: values.lastName });
            }
            if (values.city) {
                filters.push({ field: "city", operator: "contains", value: values.city });
            }
            return filters;
        }
    });

    return (
        <List title="Участники платформы">
            {/* БЛОК ПОИСКА */}
            <Card styles={{ body: { padding: '16px' } }} style={{ marginBottom: '16px', borderRadius: '12px' }}>
                <Form {...searchFormProps} layout="inline">
                    <Form.Item name="lastName">
                        <Input placeholder="Поиск по Фамилии" prefix={<SearchOutlined />} style={{ width: 250 }} />
                    </Form.Item>
                    <Form.Item name="city">
                        <Input placeholder="Город (например, Москва)" style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Найти</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="firstName" title="Имя" />
                <Table.Column dataIndex="lastName" title="Фамилия" />
                <Table.Column dataIndex="email" title="E-mail" />
                <Table.Column dataIndex="city" title="Город" />
                <Table.Column dataIndex="rating" title="Рейтинг" render={(val) => <Tag color="blue">{val}</Tag>} />
                <Table.Column<IUser>
                    title="Действия"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
}