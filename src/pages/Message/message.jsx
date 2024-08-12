import React, { useState, useEffect, useRef } from 'react'
import { Layout, Input, Avatar, List, Typography, Modal, Upload, Badge } from 'antd'
import { SearchOutlined, SendOutlined, PictureOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import './message.css'
import avartar from '~/assets/img/imgUser.jpg'
import io from 'socket.io-client'
import axios from 'axios'
import moment from 'moment'

import { IoReload } from 'react-icons/io5'

const SOCKET_URL = import.meta.env.VITE_API_URL_API_SOCKET_URL

const { Header, Sider, Content, Footer } = Layout
const { Text } = Typography

const ChatMessage = ({ isModalVisible, setIsModalMessage, idRoom, totalBlock }) => {
  const [socket, setSocket] = useState()

  const [roomId, setRoomId] = useState(null)

  const [content, setContent] = useState('')

  const [listfen, setListfen] = useState([])
  const [lisPastFen, setLisPastFen] = useState()
  const [isModalImg, setIsModalImg] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [imagePath, setImagePath] = useState('')

  const [block, setBlock] = useState(0)
  const [userName, setUserName] = useState('')
  const id = localStorage.getItem('_id')

  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [isopenModal, setIsopenModal] = useState(false)

  const [isClicked, setIsClicked] = useState(false)
  const accessToken = localStorage.getItem('token')

  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const [idChatSender, setIdChatSender] = useState()
  const [sortedListfen, setSortedListfen] = useState([])
  const [idChatReceive, setIdChatReceive] = useState()

  const [file, setFile] = useState(null)
  const [receiverIds, setReceiverIds] = useState([])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
    const updatedReceiverIds = receiverIds.filter((id) => id != roomId)
    setReceiverIds(updatedReceiverIds)
    localStorage.setItem('receiverIds', JSON.stringify(updatedReceiverIds))
  }, [messages])

  const isValidUrl = (string) => {
    return string?.startsWith('blob:') || string?.startsWith('http')
  }

  const handleCloseModal = () => {
    setIsModalMessage(false)
  }

  const handleCloseModalImg = () => {
    setIsopenModal(false)
  }

  const openModal = () => {
    setIsopenModal(true)
  }

  const handleShowchat = async (roomId, block) => {
    setIsClicked(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CHAT_BY_ROOM}`,
        {
          params: {
            roomId: roomId,
            block
          },

          headers: {
            token: `Bearer ${accessToken}`
          }
        }
      )

      setMessages(response.data.data)

      setRoomId(roomId)
      setBlock(block)
    } catch (error) {
      console.error('Lỗi:', error)
    }
    setIsClicked(false)
  }

  const handleShowchatLoading = async (roomId, block) => {
    setIsClicked(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CHAT_BY_ROOM}`,
        {
          params: {
            roomId: roomId,
            block
          },
          headers: {
            token: `Bearer ${accessToken}`
          }
        }
      )

      setMessages([...response.data.data, ...messages])

      setBlock(block)
    } catch (error) {
      console.error('Lỗi:', error)
    }
    setIsClicked(false)
  }

  const loadmorechat = async () => {
    if (block > 1) {
      handleShowchatLoading(roomId, block - 1)
    } else {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 1000)
    }
  }

  useEffect(() => {
    const memberId = id
    const getRoom = async () => {
      if (id === import.meta.env.VITE_API_URL_ID_ADMIM) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_ROOM}`,
            {
              headers: {
                token: `Bearer ${accessToken}`
              }
            }
          )

          setListfen(response.data.data)

          setLisPastFen(response.data.data)
        } catch (error) {
          console.error('Lỗi:', error)
        }
      } else {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ROOM_BY_USER}`,
            {
              params: { memberId },

              headers: {
                token: `Bearer ${accessToken}`
              }
            }
          )

          setListfen(response.data.data)

          setLisPastFen(response.data.data)
        } catch (error) {
          console.error('Lỗi:', error)
        }
      }
    }

    getRoom()
  }, [])

  useEffect(() => {
    handleShowchat(idRoom, totalBlock)
    setRoomId(idRoom)
    setBlock(totalBlock)
  }, [idRoom, totalBlock])

  useEffect(() => {
    if (searchTerm) {
      setListfen(
        listfen.filter((item) => {
          const otherMember = item.members.find((member) => member._id !== id)
          return otherMember && otherMember.username.toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    } else {
      setListfen(lisPastFen)
    }
  }, [searchTerm])

  useEffect(() => {
    if (Array.isArray(listfen)) {
      const memberNames = listfen.filter((item) => item._id === idRoom).map((item) => item.members[1]?.username)

      setUserName(memberNames)
    }
  }, [listfen, idRoom])

  const handleFileChange = ({ file }) => {
    setFile(file)
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  useEffect(() => {
    if (Array.isArray(listfen)) {
      const sorted = [...listfen].sort((a, b) => {
        const aOtherMember = a.members.find((member) => member._id !== id)
        const bOtherMember = b.members.find((member) => member._id !== id)

        const aHasChatSenderMember = a.members.some((member) => member._id === idChatSender)
        const bHasChatSenderMember = b.members.some((member) => member._id === idChatSender)

        if (aOtherMember?.username === 'admin' && bOtherMember?.username !== 'admin') {
          return -1
        }
        if (bOtherMember?.username === 'admin' && aOtherMember?.username !== 'admin') {
          return 1
        }

        if (aHasChatSenderMember && !bHasChatSenderMember) {
          return -1
        }
        if (!aHasChatSenderMember && bHasChatSenderMember) {
          return 1
        }
      })
      setSortedListfen(sorted)
    }
  }, [listfen, id, idChatSender])

  useEffect(() => {
    const item = listfen?.find((element) => element._id === roomId)
    const username = item ? item.members.find((member) => member._id !== id)?.username : null

    setUserName(username)
  }, [listfen, roomId, idChatReceive, id])

  const sendMessage = async () => {
    const formData = new FormData()
    formData.append('sender', id)
    formData.append('roomId', roomId)

    formData.append('content', content || file)

    let newBlock = block

    if (messages.length == 11 || messages.length > 11) {
      newBlock = block + 1
    } else {
      newBlock = block
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SEND_CHAT}`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      setContent('')
      setFile('')
      handleShowchat(roomId, newBlock)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
  const handleSendSocket = () => {
    const data = {
      senderId: id,
      receiverId: roomId,
      text: content,
      blockSocket: block,
      length: messages.length
    }
    socket.emit('send-message', data)
  }
  useEffect(() => {
    const newSocket = io(SOCKET_URL, { transports: ['websocket'] })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [setSocket])

  useEffect(() => {
    if (socket) {
      socket.on('get-users', (users) => {})

      socket.on('recieve-message', (data) => {
        setIdChatSender(data.senderId)
        if (data.senderId === id) {
          return
        } else {
          saveReceiverIds([...receiverIds, data.receiverId])

          if (data?.receiverId !== roomId) {
            return
          }
          let newBlock = data.blockSocket

          if (data?.length >= 11) {
            newBlock = data.blockSocket + 1
          }
          setTimeout(
            () => {
              handleShowchat(data?.receiverId, newBlock)
            },
            data.text ? 200 : 3000
          )
        }
      })
    }
  }, [socket, roomId])

  useEffect(() => {
    const savedReceiverIds = localStorage.getItem('receiverIds')
    if (savedReceiverIds) {
      setReceiverIds(JSON.parse(savedReceiverIds))
    }
  }, [])

  const saveReceiverIds = (newReceiverIds) => {
    setReceiverIds(newReceiverIds)
    localStorage.setItem('receiverIds', JSON.stringify(newReceiverIds))
  }
  const updatedReceiverIds = (item) => {
    const updatedReceiverIds = receiverIds.filter((id) => id != item._id)
    setReceiverIds(updatedReceiverIds)
    localStorage.setItem('receiverIds', JSON.stringify(updatedReceiverIds))
  }
  return (
    <div className='Message'>
      <Modal open={isModalVisible} onCancel={handleCloseModal} footer={null} width={800} className='message-chat'>
        <Layout className='chat-container'>
          <Header className='header'>
            <div className='header-content'>
              <Text className='header-title'>MMOWEB3 CHATS</Text>
            </div>
          </Header>

          <Layout>
            {isSidebarVisible && (
              <Sider width={200} className='search-sider'>
                <div className='sidebar-header'>
                  <Input
                    prefix={<SearchOutlined />}
                    suffix={<CloseOutlined onClick={toggleSidebar} className='close-icon' />}
                    className='search-sidebar'
                    placeholder='Nhập để tìm kiếm'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  ></Input>
                </div>

                <List
                  itemLayout='horizontal'
                  dataSource={sortedListfen}
                  renderItem={(item) => {
                    const isUnread = receiverIds.includes(item._id)
                    const otherMember = item.members.filter((member) => member._id !== id)[0]

                    if (otherMember) {
                      return (
                        <>
                          <List.Item
                            className={`item-inbox ${roomId == item._id ? 'highlight' : ''}`}
                            onClick={() => {
                              handleShowchat(item._id, item.totalBlock)

                              setUserName(otherMember.username)
                              setIdChatReceive(otherMember._id)
                              updatedReceiverIds(item)
                            }}
                          >
                            <List.Item.Meta
                              avatar={
                                <Badge dot={isUnread && roomId !== item._id}>
                                  <Avatar src={avartar} />
                                </Badge>
                              }
                              title={otherMember?.username}
                              // description={moment(otherMember.createdAt).format('DD-MM-YYYY HH:mm')}
                            />
                          </List.Item>
                        </>
                      )
                    }
                  }}
                />
              </Sider>
            )}

            {!isSidebarVisible && (
              <Sider width={80} className='sidebar'>
                <div className='sidebar-search' onClick={toggleSidebar}>
                  <SearchOutlined />
                </div>
                <List
                  dataSource={sortedListfen}
                  renderItem={(item) => {
                    const otherMember = item.members.filter((member) => member._id !== id)[0]
                    return (
                      <List.Item
                        className='sidebar-item'
                        onClick={() => {
                          handleShowchat(item._id, item.totalBlock)

                          setUserName(otherMember?.username)
                        }}
                      >
                        <Avatar src={avartar} />
                      </List.Item>
                    )
                  }}
                />
              </Sider>
            )}
            <Content className='chat-content'>
              <div className='chat-header'>
                <Avatar src={avartar} />
                <div className='user-info'>
                  <Text className='user-name'>{userName}</Text>{' '}
                </div>
              </div>
              <div className='chat-messages'>
                {block > 1 ? (
                  <div className={`loading-message ${isClicked ? 'clicked' : ''}`} onClick={loadmorechat}>
                    <IoReload />
                  </div>
                ) : (
                  <>
                    <div></div>
                  </>
                )}

                {messages.map((message, index) => (
                  <div key={index} className={`message-bubble ${id === message.senderId ? 'sender' : 'receiver'}`}>
                    <Avatar src={avartar} />
                    <div className={`content-chat ${id === message.senderId ? 'sender' : 'receiver'}`}>
                      {isValidUrl(message.content) ? (
                        <img
                          style={{ margin: 'auto' }}
                          src={message.content}
                          height={60}
                          width={60}
                          onClick={() => {
                            setIsModalImg(true), setImagePath(message.content)
                          }}
                        />
                      ) : (
                        <Text>{message.content}</Text>
                      )}

                      <Text className='message-time'>{moment(message.updatedAt).format('DD-MM-YYYY HH:mm')}</Text>
                    </div>
                    {index === messages.length - 1 && <div ref={messagesEndRef}></div>}
                  </div>
                ))}
              </div>
              <Footer className='footer'>
                <Input
                  className='message-input'
                  placeholder='Viết một tin nhắn...'
                  prefix={
                    file ? (
                      <img
                        onClick={openModal}
                        src={URL.createObjectURL(file)}
                        alt='Attachment'
                        style={{ width: '24px', marginRight: '8px' }}
                      />
                    ) : (
                      <PictureOutlined onClick={openModal} />
                    )
                  }
                  suffix={
                    <SendOutlined
                      onClick={() => {
                        sendMessage(), handleSendSocket()
                      }}
                    />
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onPressEnter={handleSendSocket}
                />
              </Footer>

              <Modal
                title={'Select file'}
                open={isopenModal}
                onCancel={handleCloseModalImg}
                onOk={() => {
                  // handleSendSocket(),
                  handleCloseModalImg()
                }}
              >
                {/* <input onChange={handleFileChange} type='file' id='imageUpload' name='image' accept='image/*' /> */}
                <Upload
                  name='image'
                  listType='picture-card'
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                  className='overflow-hidden  mt-3'
                >
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt='avatar' style={{ width: '100%' }} />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Modal>
            </Content>
          </Layout>
        </Layout>

        <Modal open={isModalImg} onCancel={() => setIsModalImg(false)} footer={null} closable={false}>
          {' '}
          <div className='message-img'>
            <img src={imagePath} height={300} width={300} alt='message content' />{' '}
          </div>{' '}
        </Modal>
      </Modal>
    </div>
  )
}

export default ChatMessage
