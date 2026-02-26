// src/app/tournaments/page.tsx
"use client";

import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space, Tag, Form, Input, Button, Card, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ITournament } from "@/interfaces";

export default function TournamentList() {
    const { tableProps, searchFormProps } = useTable<ITournament>({
        onSearch: (values: any) => {
            const filters: any[] =[];
            
            // Поиск по части названия
            if (values.title) {
                filters.push({ field: "title", operator: "contains", value: values.title });
            }
            // Точный поиск по формату
            if (values.format) {
                filters.push({ field: "format", operator: "eq", value: values.format });
            }
            // Точный поиск по статусу
            if (values.status) {
                filters.push({ field: "status", operator: "eq", value: values.status });
            }
            return filters;
        }
    });

    return (
        <List title="Все турниры">
            {/* БЛОК ПОИСКА И ФИЛЬТРАЦИИ */}
            <Card styles={{ body: { padding: '16px' } }} style={{ marginBottom: '16px', borderRadius: '12px' }}>
                <Form {...searchFormProps} layout="inline">
                    <Form.Item name="title">
                        <Input placeholder="Название турнира" prefix={<SearchOutlined />} style={{ width: 250 }} />
                    </Form.Item>
                    
                    <Form.Item name="format">
                        <Select placeholder="Формат игры" allowClear style={{ width: 200 }} options={[
                            { label: "Олимпийский формат", value: "Олимпийский формат" },
                            { label: "Круговой формат", value: "Круговой формат" },
                            { label: "Группы + Плей-офф", value: "Группы + Плей-офф" },
                            { label: "Мексикано", value: "Мексикано" },
                            { label: "Американо", value: "Американо" },
                        ]} />
                    </Form.Item>

                    <Form.Item name="status">
                        <Select placeholder="Статус" allowClear style={{ width: 150 }} options={[
                            { label: "🟢 Активен", value: "active" },
                            { label: "⚪ Завершен", value: "inactive" }
                        ]} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Найти</Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* ТАБЛИЦА */}
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
                        <Space>
                            <EditButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
}