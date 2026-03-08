"use client";

import { useState } from "react";
import { useForm } from "@refinedev/antd";
import { Input, Select, Row, Col, Typography, Button, Tabs, Card, Space } from "antd";
import { ITournament } from "@/interfaces";

const { Title, Text } = Typography;

export default function TournamentEdit() {
    const { query } = useForm<ITournament>();
    const tournamentData = query?.data?.data;
    const [bracketFormat, setBracketFormat] = useState<string>("Олимпийский формат (Плей-офф)");

    // --- ФУНКЦИИ РЕНДЕРА СЕТОК ---
    
    // Олимпийская (Сеты)
    const renderOlympic = () => (
        <Card bordered style={{ borderColor: '#e6f4ff', backgroundColor: '#fafafa', marginBottom: 16 }}>
            <Title level={5} style={{ color: '#1677ff' }}>1/4 ФИНАЛА</Title>
            <div style={{ backgroundColor: '#fff', border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <Text strong>Волков А.В. / Иванов М.С.</Text>
                    <Space>
                        <Input defaultValue="6" style={{ width: '40px', textAlign: 'center' }} />
                        <Input defaultValue="4" style={{ width: '40px', textAlign: 'center' }} />
                        <Input placeholder="-" style={{ width: '40px', textAlign: 'center' }} />
                    </Space>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Соколов Д.Н. / Петров Е.А.</Text>
                    <Space>
                        <Input defaultValue="4" style={{ width: '40px', textAlign: 'center' }} />
                        <Input defaultValue="6" style={{ width: '40px', textAlign: 'center' }} />
                        <Input placeholder="-" style={{ width: '40px', textAlign: 'center' }} />
                    </Space>
                </div>
            </div>
        </Card>
    );

    // Американо (Очки)
    const renderAmericano = () => (
        <Card bordered style={{ borderColor: '#e6f4ff', backgroundColor: '#fafafa', marginBottom: 16 }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                Вводите заработанные очки за матч. Обычно сумма очков равна 32 или 24.
            </Text>
            <Title level={5} style={{ color: '#1677ff', marginTop: 16 }}>РАУНД 1</Title>
            
            <div style={{ backgroundColor: '#fff', border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text strong style={{ width: '30%', textAlign: 'right' }}>Волков А.В. / Иванов М.С.</Text>
                <Space align="center">
                    <Input defaultValue="18" style={{ width: '60px', textAlign: 'center', fontWeight: 'bold', color: '#1677ff', borderColor: '#1677ff' }} />
                    <Text>-</Text>
                    <Input defaultValue="14" style={{ width: '60px', textAlign: 'center', fontWeight: 'bold', color: '#1677ff', borderColor: '#1677ff' }} />
                </Space>
                <Text strong style={{ width: '30%' }}>Соколов Д.Н. / Петров Е.А.</Text>
            </div>
        </Card>
    );

    // Круговой (Сеты 2:0)
    const renderRoundRobin = () => (
        <Card bordered style={{ borderColor: '#e6f4ff', backgroundColor: '#fafafa', marginBottom: 16 }}>
            <Text type="secondary">Вводите итоговый счет матча (например, 2-0 или 2-1 по сетам).</Text>
            <div style={{ backgroundColor: '#fff', border: '1px solid #d9d9d9', borderRadius: '8px', padding: '16px', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text strong style={{ width: '30%', textAlign: 'right' }}>Волков А.В. / Иванов М.С.</Text>
                <Space align="center">
                    <Input defaultValue="2" style={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }} />
                    <Text>:</Text>
                    <Input defaultValue="1" style={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }} />
                </Space>
                <Text strong style={{ width: '30%' }}>Соколов Д.Н. / Петров Е.А.</Text>
            </div>
        </Card>
    );

    return (
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fff', minHeight: '100vh' }}>
            <Tabs defaultActiveKey="bracket" size="large" items={[
                {
                    key: 'info',
                    label: 'Параметры турнира',
                    children: (
                        <Card bordered={false} style={{ backgroundColor: '#f5f5f5' }}>
                            <Title level={4}>{tournamentData?.title || 'Название турнира'}</Title>
                            <Text>Формат: {tournamentData?.format || 'Олимпийский'}</Text><br/>
                            <Text>Участники: 32/32</Text>
                        </Card>
                    )
                },
                {
                    key: 'bracket',
                    label: 'Редактировать сетку',
                    children: (
                        <div>
                            {/* Выбор формата */}
                            <Card style={{ marginBottom: 24, backgroundColor: '#e6f4ff', borderColor: '#91caff' }}>
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Text strong style={{ color: '#1677ff', display: 'block' }}>ФОРМАТ ПРОВЕДЕНИЯ</Text>
                                        <Text type="secondary">Измените формат, чтобы увидеть другой редактор</Text>
                                    </Col>
                                    <Col>
                                        <Select 
                                            value={bracketFormat} 
                                            onChange={setBracketFormat}
                                            style={{ width: 300 }}
                                            options={[
                                                { value: 'Олимпийский формат (Плей-офф)', label: 'Олимпийский формат (Плей-офф)' },
                                                { value: 'Олимпийский (Короткий 1/1)', label: 'Олимпийский (Короткий 1/1)' },
                                                { value: 'Круговой формат (Round Robin)', label: 'Круговой формат (Round Robin)' },
                                                { value: 'Группы + Плей-офф', label: 'Группы + Плей-офф' },
                                                { value: 'Мексикано / Американо (Игроки)', label: 'Мексикано / Американо (Игроки)' },
                                                { value: 'Американо (Фиксированные пары)', label: 'Американо (Фиксированные пары)' }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Card>

                            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                                <Title level={3} style={{ margin: 0 }}>
                                    {bracketFormat}
                                </Title>
                                <Button type="primary" size="large">Сохранить результаты</Button>
                            </Row>

                            {/* Рендер нужной сетки */}
                            {bracketFormat.includes('Олимпийский') && renderOlympic()}
                            
                            {(bracketFormat.includes('Американо') || bracketFormat.includes('Мексикано')) && renderAmericano()}
                            
                            {bracketFormat === 'Круговой формат (Round Robin)' && renderRoundRobin()}
                            
                            {/* Группы + Плей-офф (Скриншоты 9 и 10) */}
                            {bracketFormat === 'Группы + Плей-офф' && (
                                <Tabs type="card" items={[
                                    {
                                        key: 'group', 
                                        label: 'Групповой этап', 
                                        children: (
                                            <>
                                                <Title level={5}>Группа А</Title>
                                                {renderRoundRobin()}
                                                <Title level={5} style={{ marginTop: 24 }}>Группа В</Title>
                                                {renderRoundRobin()}
                                            </>
                                        )
                                    },
                                    {
                                        key: 'playoff', 
                                        label: 'Плей-офф', 
                                        children: renderOlympic()
                                    }
                                ]} />
                            )}
                        </div>
                    )
                }
            ]} />
        </div>
    );
}