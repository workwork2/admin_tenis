// src/app/clubs/create/page.tsx
"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Divider, Space, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { IClub } from "@/interfaces";

export default function ClubCreate() {
    const { formProps, saveButtonProps } = useForm<IClub>();

    return (
        <Create saveButtonProps={saveButtonProps} title="Добавить новый клуб">
            <Form {...formProps} form={formProps.form} layout="vertical">
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item label="Владелец (Создатель)" name="ownerName" rules={[{ required: true }]} style={{ flex: 1 }}>
                        <Input placeholder="ФИО Владельца" />
                    </Form.Item>
                    <Form.Item label="URL Логотипа клуба" name="logo" style={{ flex: 1 }}>
                        <Input placeholder="https://..." />
                    </Form.Item>
                </div>

                <Form.Item label="Статус заявки" name="status" initialValue="pending">
                    <Select options={[
                        { label: "🟡 Ожидает проверки", value: "pending" },
                        { label: "🟢 Одобрен (Активен)", value: "approved" },
                        { label: "🔴 Отклонен", value: "rejected" }
                    ]} />
                </Form.Item>

                <Form.Item label="Название клуба" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Адрес" name="address" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item label="Часы работы" name="workingHours" style={{ flex: 1 }}>
                        <Input placeholder="Например: 07:00 - 23:00" />
                    </Form.Item>
                    <Form.Item label="Телефон" name="phone" style={{ flex: 1 }}>
                        <Input placeholder="+7 (999) 000-00-00" />
                    </Form.Item>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item label="E-mail" name="email" rules={[{ required: true, type: 'email' }]} style={{ flex: 1 }}>
                        <Input type="email" placeholder="info@padel.ru" />
                    </Form.Item>
                    <Form.Item label="Сайт" name="website" style={{ flex: 1 }}>
                        <Input placeholder="https://..." />
                    </Form.Item>
                </div>

                <Form.Item label="Описание" name="description">
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Divider>Менеджеры клуба</Divider>
                <Form.List name="managers">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item {...restField} name={[name, 'name']} rules={[{ required: true, message: 'Укажите ФИО' }]}>
                                        <Input placeholder="ФИО Менеджера" />
                                    </Form.Item>
                                    
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
        </Create>
    );
}