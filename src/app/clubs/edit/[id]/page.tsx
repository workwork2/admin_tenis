// src/app/clubs/edit/[id]/page.tsx
"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Divider, Space, Button, Typography, Tabs, Table, Tag, Avatar } from "antd";
import { PlusOutlined, MinusCircleOutlined, EditOutlined, PictureOutlined } from "@ant-design/icons";
import { IClub, ITournament } from "@/interfaces";
import { useList, useNavigation } from "@refinedev/core";

const { Text } = Typography;

export default function ClubEdit() {
    const { formProps, saveButtonProps, query, id } = useForm<IClub>();
    const clubData = query?.data?.data;
    const { edit } = useNavigation();

    const rawTournaments = useList<ITournament>({
        resource: "tournaments",
        filters:[{ field: "clubId", operator: "eq", value: id }]
    }) as any;
    
    const tournamentsQuery = rawTournaments?.query || rawTournaments;
    const tournamentsData = tournamentsQuery?.data;
    const isLoading = tournamentsQuery?.isLoading;

    return (
        <Edit saveButtonProps={saveButtonProps} title="Управление клубом">
            <Tabs defaultActiveKey="1" items={[
                {
                    key: "1",
                    label: "Информация и Настройки",
                    children: (
                        <Form {...formProps} form={formProps.form} layout="vertical">
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
                                <Avatar shape="square" size={100} src={clubData?.logo} icon={<PictureOutlined />} />
                                <div style={{ flex: 1 }}>
                                    <Form.Item label="URL Логотипа клуба" name="logo" style={{ marginBottom: '12px' }}>
                                        <Input placeholder="https://..." />
                                    </Form.Item>
                                    <Form.Item label="Владелец (Создатель)" name="ownerName" style={{ marginBottom: 0 }}>
                                        {/* ОШИБКА ИСПРАВЛЕНА: используем variant="borderless" вместо bordered={false} */}
                                        <Input readOnly variant="borderless" style={{ fontWeight: 'bold', fontSize: '16px', padding: 0 }} />
                                    </Form.Item>
                                </div>
                            </div>

                            <Form.Item label="Статус заявки" name="status">
                                <Select options={[
                                    { label: "🟡 Ожидает проверки", value: "pending" },
                                    { label: "🟢 Одобрен (Активен)", value: "approved" },
                                    { label: "🔴 Отклонен", value: "rejected" }
                                ]} />
                            </Form.Item>

                            <Form.Item label="Название клуба" name="name" rules={[{ required: true }]}><Input /></Form.Item>
                            
                            <Divider>Менеджеры клуба</Divider>
                            <Form.List name="managers">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item {...restField} name={[name, 'name']} rules={[{ required: true, message: 'Укажите ФИО' }]}>
                                                    <Input placeholder="ФИО Менеджера" />
                                                </Form.Item>
                                                
                                                {/* ИЗМЕНЕНИЕ: ТЕПЕРЬ ТУТ ВЫПАДАЮЩИЙ СПИСОК РОЛЕЙ */}
                                                <Form.Item {...restField} name={[name, 'role']} rules={[{ required: true, message: 'Выберите роль' }]} style={{ width: 150 }}>
                                                    <Select placeholder="Роль" options={[
                                                        { label: "Админ", value: "Админ" },
                                                        { label: "Менеджер", value: "Менеджер" }
                                                    ]} />
                                                </Form.Item>

                                                <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Добавить менеджера
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Form>
                    )
                },
                {
                    key: "2",
                    label: "Турниры клуба",
                    children: (
                        <Table dataSource={tournamentsData?.data} loading={isLoading} rowKey="id" pagination={false}>
                            <Table.Column dataIndex="title" title="Название турнира" />
                            <Table.Column dataIndex="format" title="Формат" />
                            <Table.Column dataIndex="startDate" title="Дата начала" />
                            <Table.Column<ITournament> title="Статус" dataIndex="status" render={(val) => (
                                <Tag color={val === 'active' ? 'green' : 'default'}>{val === 'active' ? 'Активен' : 'Неактивен'}</Tag>
                            )} />
                            <Table.Column<ITournament> title="Действия" render={(_, record) => (
                                <Button size="small" icon={<EditOutlined />} onClick={() => edit("tournaments", record.id)}>
                                    Редактировать
                                </Button>
                            )} />
                        </Table>
                    )
                }
            ]} />
        </Edit>
    );
}