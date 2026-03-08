"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col, Card } from "antd";
import { useSelect } from "@refinedev/core";
import { ITournament, IClub } from "@/interfaces";

export default function TournamentCreate() {
    const { formProps, saveButtonProps } = useForm<ITournament>();

    // Получаем список клубов, чтобы админ мог выбрать, где проходит турнир
    const { options: clubOptions } = useSelect<IClub>({
        resource: "clubs",
        optionLabel: "name",
        optionValue: "id",
    });

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '24px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Create 
                    saveButtonProps={saveButtonProps} 
                    title="Создание нового турнира"
                    wrapperProps={{ style: { borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } }}
                >
                    <Form {...formProps} layout="vertical">
                        
                        {/* ВЫБОР КЛУБА - Обязательно, так как создаем не из профиля клуба */}
                        <Card size="small" title="Привязка к клубу" style={{ marginBottom: 24, backgroundColor: '#e6f4ff', borderColor: '#91caff' }}>
                            <Form.Item 
                                label="Выберите клуб (Организатор)" 
                                name="clubId" 
                                rules={[{ required: true, message: 'Клуб обязателен' }]}
                            >
                                <Select 
                                    size="large"
                                    placeholder="Начните вводить название клуба..."
                                    options={clubOptions}
                                    showSearch
                                    filterOption={(input, option) => (option?.label as string)?.toLowerCase().includes(input.toLowerCase())}
                                />
                            </Form.Item>
                        </Card>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Название турнира" name="title" rules={[{ required: true }]}>
                                    <Input size="large" placeholder="Например: Padel Weekend Cup" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Формат игры" name="format" rules={[{ required: true }]}>
                                    <Select size="large" options={[
                                        { value: 'Олимпийский формат (Плей-офф)', label: 'Олимпийский формат (Плей-офф)' },
                                        { value: 'Олимпийский (Короткий 1/1)', label: 'Олимпийский (Короткий 1/1)' },
                                        { value: 'Круговой формат (Round Robin)', label: 'Круговой формат (Round Robin)' },
                                        { value: 'Группы + Плей-офф', label: 'Группы + Плей-офф' },
                                        { value: 'Мексикано / Американо (Игроки)', label: 'Мексикано / Американо (Игроки)' },
                                        { value: 'Американо (Фиксированные пары)', label: 'Американо (Фиксированные пары)' }
                                    ]} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Уровень игроков" name="level">
                                    <Input size="large" placeholder="Например: < 300 или PRO" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Макс. количество игроков (или пар)" name="maxPlayers">
                                    <InputNumber size="large" style={{ width: '100%' }} min={2} placeholder="16" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Взнос с участника (₽)" name="fee">
                                    <InputNumber size="large" style={{ width: '100%' }} min={0} step={500} placeholder="2500" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Дата начала" name="startDate" rules={[{ required: true }]}>
                                    <Input size="large" type="date" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Время начала" name="startTime" rules={[{ required: true }]}>
                                    <Input size="large" type="time" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Статус турнира" name="status" initialValue="active">
                            <Select size="large" options={[
                                { label: "🟢 Активен (Идет регистрация / Игры)", value: "active" },
                                { label: "⚪ Завершен / Черновик", value: "inactive" }
                            ]} />
                        </Form.Item>

                    </Form>
                </Create>
            </div>
        </div>
    );
}