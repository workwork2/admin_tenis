// src/app/tournaments/edit/[id]/page.tsx
"use client";

import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col, Typography, Tabs, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ITournament, IUser } from "@/interfaces";
import { useList } from "@refinedev/core";

const { Text } = Typography;

export default function TournamentEdit() {
    const { formProps, saveButtonProps, query } = useForm<ITournament>();
    const tournamentData = query?.data?.data;

    // Состояние для строки поиска по участникам
    const [searchParticipant, setSearchParticipant] = useState("");

    const rawUsers = useList<IUser>({ resource: "users" }) as any;
    const usersQuery = rawUsers?.query || rawUsers;
    const allUsers = usersQuery?.data?.data ||[];

    // 1. Получаем всех участников турнира
    const tournamentParticipants = allUsers.filter((user: IUser) => 
        tournamentData?.participantIds?.includes(user.id)
    );

    // 2. Фильтруем участников на лету по введенному тексту (Имя или Фамилия)
    const filteredParticipants = tournamentParticipants.filter((user: IUser) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchParticipant.toLowerCase());
    });

    return (
        <Edit saveButtonProps={saveButtonProps} title="Редактирование турнира">
            <Tabs defaultActiveKey="1" items={[
                {
                    key: "1",
                    label: "Настройки турнира",
                    children: (
                        <Form {...formProps} form={formProps.form} layout="vertical">
                            
                            <Row justify="space-between" align="middle" style={{ marginBottom: 20, padding: 15, background: '#f5f5f5', borderRadius: 8 }}>
                                <Text strong>Статус турнира (Активен / Неактивен)</Text>
                                <Form.Item name="status" style={{ margin: 0 }}>
                                    <Select options={[
                                        { label: "🟢 Активен", value: "active" },
                                        { label: "⚪ Неактивен / Завершен", value: "inactive" }
                                    ]} style={{ width: 200 }} />
                                </Form.Item>
                            </Row>

                            <Form.Item label="URL Обложки турнира" name="coverImage">
                                <Input placeholder="https://..." />
                            </Form.Item>

                            <Form.Item label="НАЗВАНИЕ ТУРНИРА" name="title" rules={[{ required: true }]}>
                                <Input size="large" />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="ФОРМАТ ИГРЫ" name="format">
                                        <Select size="large" options={[
                                            { label: "Олимпийский формат", value: "Олимпийский формат" },
                                            { label: "Круговой формат", value: "Круговой формат" },
                                            { label: "Группы + Плей-офф", value: "Группы + Плей-офф" },
                                            { label: "Мексикано", value: "Мексикано" },
                                            { label: "Американо", value: "Американо" },
                                        ]} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="УРОВЕНЬ" name="level">
                                        <Input size="large" placeholder="<300" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="МАКС. ИГРОКОВ (ПАР)" name="maxPlayers">
                                        <InputNumber size="large" style={{ width: '100%' }} min={2} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="ВЗНОС (₽)" name="fee">
                                        <InputNumber size="large" style={{ width: '100%' }} min={0} step={500} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="ДАТА НАЧАЛА" name="startDate">
                                        <Input size="large" type="date" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="ВРЕМЯ НАЧАЛА" name="startTime">
                                        <Input size="large" type="time" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="ДАТА ОКОНЧАНИЯ" name="endDate">
                                        <Input size="large" type="date" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="ВРЕМЯ ОКОНЧАНИЯ" name="endTime">
                                        <Input size="large" type="time" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="ОПИСАНИЕ И ПРАВИЛА" name="description">
                                <Input.TextArea rows={5} placeholder="Опишите правила турнира, доп. условия, призовой фонд..." />
                            </Form.Item>
                        </Form>
                    )
                },
                {
                    key: "2",
                    label: `Участники турнира (${tournamentParticipants.length})`,
                    children: (
                        <>
                            {/* ЛОКАЛЬНЫЙ ПОИСК ПО УЧАСТНИКАМ ТУРНИРА */}
                            <Input 
                                placeholder="Найти игрока (по имени или фамилии)..." 
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                value={searchParticipant}
                                onChange={(e) => setSearchParticipant(e.target.value)}
                                style={{ marginBottom: '16px', maxWidth: '400px', borderRadius: '8px' }}
                                size="large"
                            />
                            <Table dataSource={filteredParticipants} rowKey="id" pagination={{ pageSize: 10 }}>
                                <Table.Column dataIndex="firstName" title="Имя" />
                                <Table.Column dataIndex="lastName" title="Фамилия" />
                                <Table.Column dataIndex="rating" title="Рейтинг" render={(val) => <Tag color="blue">{val}</Tag>} />
                                <Table.Column<IUser> 
                                    title="Рабочая рука" 
                                    render={(_, record) => record.preferences?.hand || "Не указана"} 
                                />
                                <Table.Column dataIndex="city" title="Город" />
                            </Table>
                        </>
                    )
                }
            ]} />
        </Edit>
    );
}