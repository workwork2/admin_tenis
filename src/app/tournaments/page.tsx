// src/app/tournaments/page.tsx
"use client";

import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { ITournament } from "@/interfaces";

export default function TournamentList() {
    const { tableProps } = useTable<ITournament>();

    return (
        <List title="Все турниры">
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Название" />
                <Table.Column dataIndex="format" title="Формат" />
                <Table.Column dataIndex="level" title="Уровень" />
                <Table.Column<ITournament>
                    title="Статус"
                    dataIndex="status"
                    render={(val) => <Tag color={val === 'active' ? 'green' : 'default'}>{val === 'active' ? 'Активен' : 'Завершен'}</Tag>}
                />
                <Table.Column<ITournament>
                    title="Действия"
                    render={(_, record) => (
                        <Space><EditButton hideText size="small" recordItemId={record.id} /></Space>
                    )}
                />
            </Table>
        </List>
    );
}