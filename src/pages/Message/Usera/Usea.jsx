import React from 'react'
import { List, Avatar, Typography, Badge } from 'antd'
import { CheckCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import './Usea.css'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

const data = [
  {
    title: 'system_bot',
    message: 'aa',
    date: '21/5/2024',
    avatar: 'https://via.placeholder.com/40',
    verified: true
  },
  {
    title: 'taphoammo',
    message: 'Chào mừng bạn đến với taphoammo. ...',
    date: '15/11/2023',
    avatar: 'https://via.placeholder.com/40',
    verified: true
  }
]

const listMessage = () => {
  const navigate = useNavigate()

  return (
    <div className='chat-list-container chat-body'>
      <div className='header'>
        <ArrowLeftOutlined
          className='back-icon'
          style={{ marginLeft: '10px' }}
          onClick={() => {
            navigate(-1)
          }}
        />
        <Text strong>Gần đây</Text>
      </div>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Badge
                  dot
                  offset={[0, 35]}
                  style={{ backgroundColor: item.verified ? 'red' : 'transparent' }}
                  icon={<CheckCircleOutlined />}
                >
                  <Avatar src={item.avatar} />
                </Badge>
              }
              title={
                <div className='title'>
                  {item.title} {item.verified && <CheckCircleOutlined style={{ color: 'red', marginLeft: 5 }} />}
                </div>
              }
              description={item.message}
            />
            <div className='date'>{item.date}</div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default listMessage
