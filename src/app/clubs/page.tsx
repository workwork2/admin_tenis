// src/app/clubs/page.tsx
"use client";

import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space, Tag, Button, notification } from "antd";
import { useUpdate } from "@refinedev/core";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { IClub } from "@/interfaces";

export default function ClubList() {
    const { tableProps } = useTable<IClub>();
    const { mutate } = useUpdate(); // Хук для быстрого обновления статуса

    // Функция для принятия/отклонения заявки
    const handleStatusChange = (id: number, status: 'approved' | 'rejected') => {
        mutate({
            resource: "clubs",
            id,
            values: { status },
        }, {
            onSuccess: () => {
                notification.success({ 
                    message: `Клуб успешно ${status === 'approved' ? 'одобрен' : 'отклонен'}` 
                });
            }
        });
    };

    return (
        <List title="Модерация клубов и заявок">
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
                            {/* Если статус еще не одобрен - показываем зеленую галочку */}
                            {record.status !== 'approved' && (
                                <Button 
                                    icon={<CheckOutlined />} 
                                    type="primary" 
                                    size="small"
                                    style={{ backgroundColor: '#52c41a' }}
                                    onClick={() => handleStatusChange(record.id, 'approved')}
                                />
                            )}
                            {/* Если статус еще не отклонен - показываем красный крестик */}
                            {record.status !== 'rejected' && (
                                <Button 
                                    icon={<CloseOutlined />} 
                                    type="primary" danger 
                                    size="small"
                                    onClick={() => handleStatusChange(record.id, 'rejected')}
                                />
                            )}
                            <EditButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
}