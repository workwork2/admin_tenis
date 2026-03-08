"use client";

import React, { useState } from "react";
import { Typography, Card, Row, Col, Statistic, Button, Space, List, Segmented, Tabs, Divider, Badge } from "antd";
import { useNavigation, useList } from "@refinedev/core";
import { UserAddOutlined, ShopOutlined, TrophyOutlined, TeamOutlined, AppstoreAddOutlined, PlaySquareOutlined, SyncOutlined } from "@ant-design/icons";
import { IClub, IUser, ITournament } from "@/interfaces";

const { Title, Text } = Typography;

export default function DashboardPage() {
  const { list, create, edit } = useNavigation();
  const [timeRange, setTimeRange] = useState<string | number>('Все время');

  const rawUsers = useList<IUser>({ resource: "users" }) as any;
  const rawClubs = useList<IClub>({ resource: "clubs" }) as any;
  const rawTournaments = useList<ITournament>({ resource: "tournaments" }) as any;

  const usersQuery = rawUsers?.query || rawUsers;
  const clubsQuery = rawClubs?.query || rawClubs;
  const tournamentsQuery = rawTournaments?.query || rawTournaments;

  const pendingClubs = clubsQuery?.data?.data?.filter((club: IClub) => club.status === 'pending') || [];
  
  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      
      <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
        <Title level={3} style={{ margin: 0 }}>Сводка платформы</Title>
        <Segmented options={['Сегодня', 'Неделя', 'Месяц', 'Все время']} value={timeRange} onChange={setTimeRange} />
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={6}>
          {/* ИСПРАВЛЕНИЕ ЗДЕСЬ: variant="borderless" вместо bordered={false} */}
          <Card variant="borderless" style={{ borderRadius: "12px", boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Statistic title={<Text type="secondary"><TeamOutlined /> Игроков</Text>} value={usersQuery?.data?.total || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="borderless" style={{ borderRadius: "12px", boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Statistic title={<Text type="secondary"><ShopOutlined /> Клубов</Text>} value={clubsQuery?.data?.total || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="borderless" style={{ borderRadius: "12px", boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Statistic title={<Text type="secondary"><TrophyOutlined /> Турниров</Text>} value={tournamentsQuery?.data?.total || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="borderless" style={{ borderRadius: "12px", boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Statistic title={<Text type="secondary"><PlaySquareOutlined /> Матчей сыграно</Text>} value={1240} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Панель управления" variant="borderless" style={{ borderRadius: "12px", height: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Tabs defaultActiveKey="1" items={[
              {
                key: '1', label: 'Создание',
                children: (
                  <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <Button block type="dashed" size="large" icon={<UserAddOutlined />} onClick={() => create("users")}>Создать профиль игрока</Button>
                    <Button block type="dashed" size="large" icon={<AppstoreAddOutlined />} onClick={() => create("clubs")}>Добавить новый клуб</Button>
                    <Button block type="dashed" size="large" icon={<TrophyOutlined />} onClick={() => create("tournaments")}>Создать турнир</Button>
                  </Space>
                )
              },
              {
                key: '2', label: 'Переходы',
                children: (
                  <Row gutter={[8, 8]}>
                    <Col span={12}><Button block type="primary" ghost icon={<TeamOutlined />} onClick={() => list("users")}>Игроки</Button></Col>
                    <Col span={12}><Button block type="primary" ghost icon={<ShopOutlined />} onClick={() => list("clubs")}>Клубы</Button></Col>
                    <Col span={12}><Button block type="primary" ghost icon={<TrophyOutlined />} onClick={() => list("tournaments")}>Турниры</Button></Col>
                  </Row>
                )
              }
            ]} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Row gutter={16}>
              <Col span={12}>
                <Card variant="borderless" style={{ borderRadius: "12px", background: "linear-gradient(135deg, #1677ff 0%, #0050b3 100%)", color: "white" }}>
                  <Text style={{ color: "rgba(255,255,255,0.8)", display: "block", marginBottom: 8 }}><SyncOutlined spin style={{ marginRight: 8 }}/>Общий Рейтинг</Text>
                  <Title level={4} style={{ color: "white", margin: 0 }}>Обновлен сегодня</Title>
                  <Divider style={{ margin: "12px 0", borderColor: "rgba(255,255,255,0.3)" }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: "rgba(255,255,255,0.8)" }}>Затронуто игроков:</Text><Text strong style={{ color: "#fff" }}>+412</Text>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card variant="borderless" style={{ borderRadius: "12px", height: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <Statistic title="Активные турниры (Live)" value={3} valueStyle={{ color: '#1677ff', fontWeight: 700 }} prefix={<Badge status="processing" color="blue" />} />
                </Card>
              </Col>
            </Row>

            <Card title="Уведомления" variant="borderless" style={{ borderRadius: "12px", boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} extra={<Badge count={pendingClubs.length} />}>
                <List size="small" dataSource={pendingClubs} locale={{ emptyText: 'Нет новых заявок' }} renderItem={(club: IClub) => (
                    <List.Item actions={[<Button key="review" size="small" type="primary" onClick={() => edit("clubs", club.id)}>Модерация</Button>]}>
                    <List.Item.Meta title={club.name} description={club.city || 'Город не указан'} />
                    </List.Item>
                )} />
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}