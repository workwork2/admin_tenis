"use client";

import { List, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Button, App, Tabs, Card, Typography } from "antd";
import { useUpdate, useList } from "@refinedev/core";
import { CheckOutlined, CloseOutlined, StopOutlined } from "@ant-design/icons";
import { IClub } from "@/interfaces";

const { Text } = Typography;

export default function ClubList() {
    const { notification } = App.useApp();
    const { mutate } = useUpdate();

    // ИСПРАВЛЕНИЕ 1: Достаем data и isLoading из объекта query
    const { query } = useList<IClub>({ resource: "clubs" });
    const allClubs = query?.data?.data || [];
    const isLoading = query?.isLoading;

    // ИСПРАВЛЕНИЕ 2: Явно указываем тип (c: IClub)
    const pendingClubs = allClubs.filter((c: IClub) => c.status === 'pending');
    const activeClubs = allClubs.filter((c: IClub) => c.status !== 'pending');

    const handleStatusChange = (id: number, status: string) => {
        mutate({ resource: "clubs", id, values: { status } }, {
            onSuccess: () => notification.success({ message: `Статус изменен` })
        });
    };

    return (
        <List title="Управление клубами">
            <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Tabs defaultActiveKey="1" size="large" items={[
                    {
                        key: "1",
                        label: `Новые заявки (${pendingClubs.length})`,
                        children: (
                            <>
                                <div style={{ marginBottom: 16 }}>
                                    <Text type="secondary">Здесь отображаются клубы, ожидающие модерации. Вы можете только принять или отклонить их.</Text>
                                </div>
                                <Table dataSource={pendingClubs} rowKey="id" loading={isLoading} pagination={false}>
                                    <Table.Column dataIndex="name" title="Название клуба" />
                                    <Table.Column dataIndex="city" title="Город" />
                                    <Table.Column dataIndex="email" title="Email" />
                                    <Table.Column<IClub>
                                        title="Действие"
                                        render={(_, record) => (
                                            <Space>
                                                <Button type="primary" style={{ backgroundColor: '#52c41a' }} icon={<CheckOutlined />} onClick={() => handleStatusChange(record.id, 'approved')}>
                                                    Одобрить
                                                </Button>
                                                <Button danger icon={<CloseOutlined />} onClick={() => handleStatusChange(record.id, 'rejected')}>
                                                    Отклонить
                                                </Button>
                                            </Space>
                                        )}
                                    />
                                </Table>
                            </>
                        )
                    },
                    {
                        key: "2",
                        label: "Общая база клубов",
                        children: (
                            <Table dataSource={activeClubs} rowKey="id" loading={isLoading}>
                                <Table.Column dataIndex="name" title="Название клуба" />
                                <Table.Column dataIndex="city" title="Город" />
                                <Table.Column<IClub>
                                    title="Статус"
                                    dataIndex="status"
                                    render={(val) => {
                                        const colors: any = { approved: 'blue', rejected: 'red', banned: 'default' };
                                        const texts: any = { approved: 'Активен', rejected: 'Отклонен', banned: 'Забанен' };
                                        return <Tag color={colors[val]}>{texts[val]}</Tag>;
                                    }}
                                />
                                <Table.Column<IClub>
                                    title="Действия"
                                    render={(_, record) => (
                                        <Space>
                                            {record.status === 'approved' && (
                                                <Button size="small" danger icon={<StopOutlined />} onClick={() => handleStatusChange(record.id, 'banned')}>Бан</Button>
                                            )}
                                            <EditButton hideText size="small" recordItemId={record.id} />
                                            <DeleteButton hideText size="small" recordItemId={record.id} />
                                        </Space>
                                    )}
                                />
                            </Table>
                        )
                    }
                ]} />
            </Card>
        </List>
    );
}