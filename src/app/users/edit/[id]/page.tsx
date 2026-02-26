// src/app/users/edit/[id]/page.tsx
"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";
import { IUser } from "@/interfaces";

export default function UserEdit() {
    const { formProps, saveButtonProps } = useForm<IUser>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
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
                <Form.Item label="E-mail" name="email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Город" name="city">
                    <Input />
                </Form.Item>
                <Form.Item label="Рейтинг" name="rating">
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                
                {/* Предпочтения из твоего скриншота */}
                <Form.Item label="Рабочая рука" name={['preferences', 'hand']}>
                    <Select options={[
                        { label: "Левая", value: "Левая" },
                        { label: "Правая", value: "Правая" },
                        { label: "Обе", value: "Обе" }
                    ]} />
                </Form.Item>
                <Form.Item label="Тип игр" name={['preferences', 'gameType']}>
                    <Select options={[
                        { label: "Друж.", value: "Друж." },
                        { label: "Турниры", value: "Турниры" },
                        { label: "Оба", value: "Оба" }
                    ]} />
                </Form.Item>
            </Form>
        </Edit>
    );
}