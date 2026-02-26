// src/app/users/page.tsx
"use client";

import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { IUser } from "@/interfaces";

export default function UserList() {
    const { tableProps } = useTable<IUser>();

    return (
        <List title="Участники платформы">
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="firstName" title="Имя" />
                <Table.Column dataIndex="lastName" title="Фамилия" />
                <Table.Column dataIndex="email" title="E-mail" />
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