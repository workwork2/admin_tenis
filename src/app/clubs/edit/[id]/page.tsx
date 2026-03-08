"use client";

import { useForm } from "@refinedev/antd";
import { Form, Input, Typography, Button, Card, Row, Col } from "antd";
import { IClub } from "@/interfaces";
import { PictureOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function ClubEdit() {
    const { formProps, saveButtonProps, query } = useForm<IClub>();
    const clubData = query?.data?.data;

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    
                    <Row align="middle" style={{ marginBottom: 32, backgroundColor: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
                        <Col flex="100px">
                            <div style={{ width: 80, height: 80, backgroundColor: '#e6f4ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PictureOutlined style={{ fontSize: 24, color: '#1677ff' }} />
                            </div>
                        </Col>
                        <Col flex="auto">
                            <Title level={4} style={{ margin: 0 }}>{clubData?.name || 'Клуб'}</Title>
                            <Text type="secondary">{clubData?.city}</Text>
                        </Col>
                        <Col>
                            <Button>Загрузить логотип</Button>
                        </Col>
                    </Row>

                    <Form {...formProps} form={formProps.form} layout="vertical">
                        <Form.Item label="Название клуба" name="name"><Input size="large" /></Form.Item>
                        <Row gutter={16}>
                            <Col span={12}><Form.Item label="Город" name="city"><Input size="large" /></Form.Item></Col>
                            <Col span={12}><Form.Item label="Адрес" name="address"><Input size="large" /></Form.Item></Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}><Form.Item label="Часы работы" name="workingHours"><Input size="large" /></Form.Item></Col>
                            <Col span={8}><Form.Item label="Телефон" name="phone"><Input size="large" /></Form.Item></Col>
                            <Col span={8}><Form.Item label="Email" name="email"><Input size="large" /></Form.Item></Col>
                        </Row>
                        <Form.Item label="Описание" name="description"><Input.TextArea rows={4} /></Form.Item>

                        <Button type="primary" size="large" onClick={saveButtonProps.onClick} style={{ marginTop: 16 }}>
                            Сохранить изменения
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    )
}