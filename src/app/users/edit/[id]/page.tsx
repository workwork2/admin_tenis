// src/app/users/edit/[id]/page.tsx
"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col, Alert } from "antd";
import { IUser } from "@/interfaces";

export default function UserEdit() {
    const { formProps, saveButtonProps, query } = useForm<IUser>();
    const isBanned = Form.useWatch('status', formProps.form) === 'banned';

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} form={formProps.form} layout="vertical">
                
                <Row gutter={16} style={{ marginBottom: 20, padding: 15, background: '#fff1f0', borderRadius: 8, border: '1px solid #ffa39e' }}>
                    <Col span={12}>
                        <Form.Item label="Статус аккаунта" name="status" initialValue="active" style={{ margin: 0 }}>
                            <Select options={[
                                { label: "🟢 Активен", value: "active" },
                                { label: "🔴 Забанен", value: "banned" }
                            ]} />
                        </Form.Item>
                    </Col>
                    {isBanned && (
                        <Col span={12}>
                            <Form.Item label="Забанен до (Дата)" name="banUntil" style={{ margin: 0 }}>
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                    )}
                </Row>

                <Form.Item label="Фамилия" name="lastName" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item label="Имя" name="firstName" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item label="Отчество" name="middleName"><Input /></Form.Item>
                <Form.Item label="E-mail" name="email" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item label="Город" name="city"><Input /></Form.Item>
                <Form.Item label="Рейтинг" name="rating"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
                
                <Form.Item label="Рабочая рука" name={['preferences', 'hand']}>
                    <Select options={[{ label: "Левая", value: "Левая" }, { label: "Правая", value: "Правая" }, { label: "Обе", value: "Обе" }]} />
                </Form.Item>
            </Form>
        </Edit>
    );
}