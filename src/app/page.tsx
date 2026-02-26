// src/app/page.tsx
"use client";

import { Typography, Card, Row, Col, Statistic, Button, Divider, Space, Avatar } from "antd";
import { useNavigation, useList } from "@refinedev/core";
import { 
  UserOutlined, 
  ShopOutlined, 
  InfoCircleOutlined, 
  ArrowRightOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { IClub, IUser } from "@/interfaces";

const { Title, Paragraph, Text } = Typography;

export default function DashboardPage() {
  const { list } = useNavigation();

  const rawUsers = useList<IUser>({ resource: "users" }) as any;
  const usersQuery = rawUsers?.query || rawUsers;

  const rawClubs = useList<IClub>({ resource: "clubs" }) as any;
  const clubsQuery = rawClubs?.query || rawClubs;

  const pendingClubsCount = clubsQuery?.data?.data?.filter((club: IClub) => club.status === 'pending').length || 0;
  const approvedClubsCount = clubsQuery?.data?.total ? clubsQuery.data.total - pendingClubsCount : 0;

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* Приветственный Баннер */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1890ff 0%, #00e676 100%)', 
        padding: '40px 32px', 
        borderRadius: '20px', 
        color: 'white', 
        marginBottom: '32px',
        boxShadow: '0 10px 30px rgba(0, 230, 118, 0.2)'
      }}>
        <Title level={2} style={{ color: 'white', margin: 0, fontWeight: 800 }}>
          Добро пожаловать в Padel Admin 👋
        </Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: "16px", marginTop: "12px", marginBottom: 0, maxWidth: "600px" }}>
          Единая система управления платформой. Здесь вы можете оперативно модерировать новые клубы, управлять базой игроков и следить за общей статистикой.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        
        {/* Карточка 1: Управление Клубами */}
        <Col xs={24} sm={24} lg={12}>
          <Card
            hoverable
            style={{ 
              height: "100%", 
              borderRadius: "20px", 
              border: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)" 
            }}
            // ОШИБКА ИСПРАВЛЕНА ЗДЕСЬ
            styles={{ body: { padding: '32px' } }}
          >
            <Space align="center" style={{ marginBottom: '24px' }}>
              <Avatar 
                size={56} 
                icon={<ShopOutlined />} 
                style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }} 
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>Клубы и Заявки</Title>
                <Text type="secondary">Управление площадками</Text>
              </div>
            </Space>

            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Активные клубы"
                  value={approvedClubsCount}
                  valueStyle={{ fontSize: "36px", fontWeight: 800, color: '#262626' }}
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px', marginRight: '8px' }} />}
                />
              </Col>
              <Col span={12}>
                <div style={{ 
                  background: pendingClubsCount > 0 ? '#fff7e6' : '#f6ffed', 
                  padding: '12px 16px', 
                  borderRadius: '12px',
                  border: `1px solid ${pendingClubsCount > 0 ? '#ffd591' : '#b7eb8f'}`
                }}>
                  <Statistic
                    title={<span style={{ color: pendingClubsCount > 0 ? '#d46b08' : '#389e0d' }}>Новые заявки</span>}
                    value={pendingClubsCount}
                    valueStyle={{ 
                      fontSize: "28px", 
                      fontWeight: 800, 
                      color: pendingClubsCount > 0 ? '#fa8c16' : '#52c41a' 
                    }}
                    prefix={pendingClubsCount > 0 ? <InfoCircleOutlined /> : null}
                  />
                </div>
              </Col>
            </Row>

            <Divider style={{ margin: '24px 0' }} />
            
            <Button 
              key="clubs-btn" 
              type="primary" 
              size="large" 
              icon={<ArrowRightOutlined />} 
              onClick={() => list("clubs")}
              style={{ width: '100%', borderRadius: '10px', height: '48px', fontWeight: 600 }}
            >
              Перейти к модерации
            </Button>
          </Card>
        </Col>

        {/* Карточка 2: Управление Участниками */}
        <Col xs={24} sm={24} lg={12}>
          <Card
            hoverable
            style={{ 
              height: "100%", 
              borderRadius: "20px", 
              border: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)" 
            }}
            // ОШИБКА ИСПРАВЛЕНА ЗДЕСЬ
            styles={{ body: { padding: '32px' } }}
          >
            <Space align="center" style={{ marginBottom: '24px' }}>
              <Avatar 
                size={56} 
                icon={<UserOutlined />} 
                style={{ backgroundColor: '#f6ffed', color: '#52c41a' }} 
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>Участники платформы</Title>
                <Text type="secondary">База игроков и рейтинги</Text>
              </div>
            </Space>

            <Statistic
              title="Всего зарегистрировано"
              value={usersQuery?.data?.total || 0}
              valueStyle={{ fontSize: "48px", fontWeight: 800, color: '#262626' }}
            />
            
            <Paragraph style={{ marginTop: "12px", color: "gray", minHeight: '44px' }}>
              Просматривайте профили, редактируйте текущий рейтинг, рабочую руку и игровые предпочтения всех участников.
            </Paragraph>

            <Divider style={{ margin: '24px 0' }} />

            <Button 
              key="users-btn" 
              type="default" 
              size="large" 
              icon={<UserOutlined />} 
              onClick={() => list("users")}
              style={{ width: '100%', borderRadius: '10px', height: '48px', fontWeight: 600 }}
            >
              Управление базой игроков
            </Button>
          </Card>
        </Col>

      </Row>
    </div>
  );
}