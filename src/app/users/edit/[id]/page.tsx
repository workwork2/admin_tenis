"use client";

import { useForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";
import { Form, Input, Row, Col, Typography, Radio, Card, Button } from "antd";
import { IUser } from "@/interfaces";
import { LeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function UserEdit() {
    const { formProps, saveButtonProps } = useForm<IUser>(); 
    const { list } = useNavigation(); 

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', cursor: 'pointer' }} onClick={() => list("users")}>
                    <LeftOutlined style={{ marginRight: '16px', fontSize: '18px' }} />
                    <Title level={3} style={{ margin: 0 }}>Редактировать профиль</Title>
                </div>

                <Form {...formProps} form={formProps.form} layout="vertical">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <Form.Item label="ФАМИЛИЯ" name="lastName"><Input size="large" /></Form.Item>
                                <Form.Item label="ИМЯ" name="firstName"><Input size="large" /></Form.Item>
                                <Form.Item label="ОТЧЕСТВО" name="middleName"><Input size="large" /></Form.Item>
                                <Form.Item label="ДАТА РОЖДЕНИЯ" name="birthDate"><Input size="large" /></Form.Item>
                                <Form.Item label="ГОРОД" name="city"><Input size="large" /></Form.Item>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card title="Предпочтения" bordered={false} style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <Form.Item label="РУКА" name={['preferences', 'hand']} initialValue="Правая">
                                    <Radio.Group optionType="button" buttonStyle="solid" style={{ width: '100%', display: 'flex' }}>
                                        <Radio.Button value="Обе" style={{ flex: 1, textAlign: 'center' }}>Обе</Radio.Button>
                                        <Radio.Button value="Левая" style={{ flex: 1, textAlign: 'center' }}>Левая</Radio.Button>
                                        <Radio.Button value="Правая" style={{ flex: 1, textAlign: 'center' }}>Правая</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="КВАДРАТ" name={['preferences', 'side']} initialValue="Левый">
                                    <Radio.Group optionType="button" buttonStyle="solid" style={{ width: '100%', display: 'flex' }}>
                                        <Radio.Button value="Оба" style={{ flex: 1, textAlign: 'center' }}>Оба</Radio.Button>
                                        <Radio.Button value="Левый" style={{ flex: 1, textAlign: 'center' }}>Левый</Radio.Button>
                                        <Radio.Button value="Правый" style={{ flex: 1, textAlign: 'center' }}>Правый</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="ТИП ИГР" name={['preferences', 'gameType']} initialValue="Оба">
                                    <Radio.Group optionType="button" buttonStyle="solid" style={{ width: '100%', display: 'flex' }}>
                                        <Radio.Button value="Оба" style={{ flex: 1, textAlign: 'center' }}>Оба</Radio.Button>
                                        <Radio.Button value="Друж." style={{ flex: 1, textAlign: 'center' }}>Друж.</Radio.Button>
                                        <Radio.Button value="Турниры" style={{ flex: 1, textAlign: 'center' }}>Турниры</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>

                    <Button type="primary" size="large" onClick={saveButtonProps.onClick} style={{ marginTop: '24px', width: '200px' }}>
                        СОХРАНИТЬ ИЗМЕНЕНИЯ
                    </Button>
                </Form>
            </div>
        </div>
    );
}