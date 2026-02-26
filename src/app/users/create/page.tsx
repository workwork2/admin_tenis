// src/app/users/create/page.tsx
"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";
import { IUser } from "@/interfaces";

export default function UserCreate() {
    const { formProps, saveButtonProps } = useForm<IUser>();

    return (
        <Create saveButtonProps={saveButtonProps} title="Добавить участника">
            <Form {...formProps} form={formProps.form} layout="vertical">
                <Form.Item label="Фамилия" name="lastName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Имя" name="firstName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Отчество" name="middleName">
                    <Input />
                </Form.Item>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item label="E-mail" name="email" rules={[{ required: true, type: 'email' }]} style={{ flex: 1 }}>
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Город" name="city" style={{ flex: 1 }}>
                        <Input />
                    </Form.Item>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item label="Стартовый Рейтинг" name="rating" initialValue={100} style={{ flex: 1 }}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Рабочая рука" name={['preferences', 'hand']} initialValue="Правая" style={{ flex: 1 }}>
                        <Select options={[
                            { label: "Левая", value: "Левая" },
                            { label: "Правая", value: "Правая" },
                            { label: "Обе", value: "Обе" }
                        ]} />
                    </Form.Item>
                </div>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item label="Предпочитаемый квадрат" name={['preferences', 'side']} initialValue="Оба" style={{ flex: 1 }}>
                        <Select options={[
                            { label: "Левый", value: "Левый" },
                            { label: "Правый", value: "Правый" },
                            { label: "Оба", value: "Оба" }
                        ]} />
                    </Form.Item>
                    <Form.Item label="Тип игр" name={['preferences', 'gameType']} initialValue="Оба" style={{ flex: 1 }}>
                        <Select options={[
                            { label: "Друж.", value: "Друж." },
                            { label: "Турниры", value: "Турниры" },
                            { label: "Оба", value: "Оба" }
                        ]} />
                    </Form.Item>
                </div>
            </Form>
        </Create>
    );
}