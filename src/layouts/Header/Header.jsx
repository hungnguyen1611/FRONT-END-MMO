import logo from '~/assets/img/logo.png'
import { Button, Modal, Menu, Typography, Dropdown, Row, Col, Layout } from 'antd'
import { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import Translate from '~/components/manager/Translate/Translate'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setError } from '~/constants/sliceRedux/auth.slice'
import { MdClose } from 'react-icons/md'
import './Header.css'
import { FaFacebook, FaLinkedinIn } from 'react-icons/fa'
import { FaTwitter, FaTiktok } from 'react-icons/fa6'
import { IoLogoYoutube } from 'react-icons/io'
import ChatMessage from '~/pages/Message/message'
import { useTranslation } from 'react-i18next'

import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
import axios from 'axios'
import { id } from 'ethers/lib/utils'
import OneSignal from 'react-onesignal'

const { Text } = Typography

const Header = () => {
  const id_user = useSelector((state) => state.auth._id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('login')
  const [active, setActive] = useState(false)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [isModalMssage, setIsModalMessage] = useState(false)
  const [roomId, setroomId] = useState()
  const [totalBlock, setTotalBlock] = useState()
  const accessToken = localStorage.getItem('token')
  const { i18n } = useTranslation()

  window.addEventListener('scroll', function () {
    const header = document.querySelector('.bg-header')
    const headerTop = document.querySelector('.header-top')
    const scrollPosition = window.scrollY

    if (scrollPosition > 0) {
      headerTop.style.position = 'fixed'
      headerTop.style.top = '0'
      headerTop.style.left = '0'
      headerTop.style.width = '100%'
      headerTop.style.zIndex = '1000'
      header.style.position = 'fixed'
      header.style.top = '0'
      header.style.left = '0'
      header.style.width = '100%'
      header.style.zIndex = '1000'

      const opacity = Math.max(0, 1 - scrollPosition / 300)
      const translateY = Math.min(100, scrollPosition)

      headerTop.style.opacity = opacity
      headerTop.style.transform = `translateY(-${translateY}px)`

      const headerOpacity = Math.max(0.8, 1 - scrollPosition / 600)
      header.style.opacity = headerOpacity

      const headerTopPosition = Math.max(0, 60 - scrollPosition)
      header.style.top = `${headerTopPosition}px`
    } else {
      headerTop.style.position = 'relative'
      headerTop.style.opacity = 1
      headerTop.style.transform = 'translateY(0)'
      header.style.opacity = 1
      header.style.top = '0px'
      header.style.position = 'relative'
    }
  })

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const switchToRegister = () => {
    setModalContent('register')
  }
  const switchToLogin = () => {
    setModalContent('login')
  }

  const getModalContent = () => {
    switch (modalContent) {
      case 'register':
        return <Register switchToLogin={() => setModalContent('login')} />
      case 'login':
        return <Login handleCancel={handleCancel} switchToRegister={() => setModalContent('register')} />
      default:
        return <Login switchToRegister={switchToRegister} />
    }
  }

  const handleLogout = async () => {
    dispatch(logout())

    await OneSignal.logout()

    navigate('/')
  }
  useEffect(() => {
    if (id_user) {
      axios
        .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_USER_BY}${id_user}`)
        .then((response) => {
          if (response && response.data) {
            setData(response?.data?.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [id_user])

  const CreateRoom = async () => {
    // if (roomId) {
    //   setIsModalMessage(true)
    //   return
    // }

    const firstId = localStorage.getItem('_id')

    const idAmin = '6653e82987e75be428b6355a'

    try {
      const RoomAdmin = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CREATE_ROOM}`,
        {
          members: [firstId, idAmin]
        },
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        }
      )

      if (RoomAdmin) {
        setroomId(RoomAdmin.data.data._id)
        setTotalBlock(RoomAdmin.data.data.totalBlock)
        setIsModalMessage(true)
      }
    } catch (error) {
      console.error('Error creating room:', error)
    }
  }

  // console.log(data, 'ádasdasd')

  const menu = (
    <>
      <Menu style={{ width: '240px' }}>
        <Menu.Item key='1' disabled>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '40px', marginRight: '20px' }} />
            <div>
              <Text strong style={{ fontSize: '16px' }}>
                {data?.username}
              </Text>
              <br />
              <Text type='secondary' style={{ fontSize: '16px' }}>
                @{data?.username}
              </Text>
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='2'>
          {' '}
          <Link className='dropdown-item' to='/information'>
            {i18n.t('header.account-information')}
          </Link>
        </Menu.Item>
        <Menu.Item key='3'>
          <Link className='dropdown-item' to='/purchased'>
            {i18n.t('header.Purchased-order')}
          </Link>
        </Menu.Item>
        <Menu.Item key='4'>
          <Link className='dropdown-item' to='/favorite'>
            {i18n.t('header.Favorite-stall')}
          </Link>
        </Menu.Item>
        <Menu.Item key='5'>
          <Link className='dropdown-item' to='/history-money'>
            {i18n.t('header.Payment -history')}
          </Link>
        </Menu.Item>
        <Menu.Item key='6'>
          {' '}
          <Link className='dropdown-item' to='/reseller-user'>
            Reseller
          </Link>
        </Menu.Item>
        <Menu.Item key='7'>
          {' '}
          <Link className='dropdown-item' to='/blog'>
            {i18n.t('header.Content-Management')}
          </Link>
        </Menu.Item>
        <Menu.Item key='8'>
          {' '}
          <Link className='dropdown-item' to='/change/password'>
            {i18n.t('header.Change-Password')}
          </Link>
        </Menu.Item>
        {role === 'user' ? (
          <Menu.Item key='9'>
            <Link className='dropdown-item' to='/register-store'>
              {i18n.t('header.Register-sell')}
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item key={10}>
            <Link key='11' className='dropdown-item' to='/store/management'>
              {i18n.t('header.Store-management')}
            </Link>
          </Menu.Item>
        )}

        <Menu.Item key={11}>
          {' '}
          <div style={{ cursor: 'pointer' }} className='dropdown-item primary' onClick={handleLogout}>
            {i18n.t('header.Logout')}
          </div>{' '}
        </Menu.Item>
      </Menu>
    </>
  )
  return (
    <>
      <div className='wrap-header d-none d-lg-block'>
        <div className='header-top'>
          <Row justify='space-between' align='middle'>
            <Col>
              <Row gutter={20}>
                <Col className='contact-item'>
                  <MailOutlined />
                  <span className='contact-text'>Web3mmo@gmail.com</span>
                </Col>
                <Col className='contact-item'>
                  <PhoneOutlined />
                  <span className='contact-text'>+208-66-0112</span>
                </Col>
              </Row>
            </Col>

            <Col className='contact-icon'>
              <Row className='d-flex justify-content-between align-items-center gap-3'>
                <span>Follow Us:</span>
                <Button className='icon-button-header' type='link' icon={<FaFacebook />} href='https://facebook.com' />
                <Button className='icon-button-header' type='link' icon={<FaTiktok />} href='https://tiktok.com' />

                <Button
                  className='icon-button-header'
                  type='link'
                  icon={<IoLogoYoutube />}
                  href='https://youtube.com'
                />
              </Row>
            </Col>
          </Row>
        </div>
        <nav className='navbar navbar-expand-lg navbar-light bg-header w-100 header-home'>
          <div className='container-fluid container-headerHome'>
            <Link className='navbar-brand nav-logo d-block' to='/'>
              {' '}
              <img style={{ width: '100%', height: '100%' }} src={logo} alt='logo'></img>
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0 gap-4'>
                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle'
                    to='#'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {i18n.t('header.product')}
                  </Link>
                  <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <li>
                      <Link className='dropdown-item' to='/product/type/email'>
                        Email
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/product/type/tai-khoan'>
                        {i18n.t('header.Account')}
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/product/type/phan-mem'>
                        {i18n.t('header.Software')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle'
                    to='#'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {i18n.t('header.service')}
                  </Link>
                  <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <li>
                      <Link className='dropdown-item' to='/service/type/tang-tuong-tac'>
                        {i18n.t('header.Increase-interaction')}
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/service/type/block-chain'>
                        Blockchain
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/service/type/dich-vu-phan-mem'>
                        {i18n.t('header.Software services')}
                      </Link>
                    </li>
                    {/* <li>
                    <Link className='dropdown-item' to='#'>
                      Dịch vụ khác
                    </Link>
                  </li> */}
                  </ul>
                </li>
                <li className='nav-item blog'>
                  <Link className='nav-link active' aria-current='page' to='/support'>
                    {i18n.t('header.support')}
                  </Link>
                </li>
                <li className='nav-item blog'>
                  <Link className='nav-link' to='/share'>
                    {i18n.t('header.share')}
                  </Link>
                </li>

                <li className='FAQsnav-item blog '>
                  <Link className='nav-link active' aria-current='page' to='#'>
                    {i18n.t('header.FAQ')}
                  </Link>
                </li>
              </ul>

              <div className=' '>
                {/* <li className='nav-item'>
                  <button onClick={() => changeLanguage('en')}>English</button>
                  <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
                </li> */}

                {isLoggedIn ? (
                  <div className='d-flex flex-column flex-md-row list-active-user'>
                    <Link className='text-start nav-link active mb-3 mb-md-0  ' aria-current='page' to='/banking'>
                      {/* Nạp tiền */}
                      {i18n.t('header.home')}
                    </Link>
                    <Link className='nav-link active mb-3 mb-md-0' aria-current='page' onClick={CreateRoom}>
                      {i18n.t('header.Chat')}
                    </Link>

                    <Dropdown overlay={menu} trigger={['click']}>
                      <a href='/' className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faUser} />
                        {/* <FontAwesomeIcon style={{ width: '60px' }} /> */}
                      </a>
                    </Dropdown>
                  </div>
                ) : (
                  <div>
                    <button type='button' className='btn btn-primary btn-login' onClick={showModal}>
                      {i18n.t('header.Login')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <Modal width={600} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            {getModalContent(handleCancel)}
          </Modal> */}
        </nav>
      </div>
      <div onClick={() => setActive(false)} className={`modal-lay ${active ? 'active' : ''}`}></div>
      <div className='wrap-header d-block d-lg-none'>
        <nav className='navbar navbar-expand-lg navbar-light bg-header w-100'>
          <div className='container-fluid'>
            <Link className='navbar-brand nav-logo d-block' to='/'>
              {' '}
              <img style={{ width: '100%' }} src={logo} alt='logo'></img>
            </Link>

            <button onClick={() => setActive(true)} className='navbar-toggler' type='button'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className={`collapse navbar-collapse header-nav-wrap d-block p-3 ${active ? 'active' : ''}`}
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <div className='d-flex justify-content-between align-items-center'>
                  <li className='nav-item dropdown'>
                    <Link
                      className='nav-link dropdown-toggle'
                      to='#'
                      id='navbarDropdown'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      {i18n.t('header.product')}
                    </Link>
                    <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                      <li>
                        <Link className='dropdown-item' to='/product/type/email'>
                          Email
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item' to='/product/type/tai-khoan'>
                          {i18n.t('header.Account')}
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item' to='/product/type/phan-mem'>
                          {i18n.t('header.Software')}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <MdClose className='fs-2' onClick={() => setActive(false)} />
                </div>
                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle'
                    to='#'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {i18n.t('header.service')}
                  </Link>
                  <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <li>
                      <Link className='dropdown-item' to='/service/type/tang-tuong-tac'>
                        {i18n.t('header.Increase-interaction')}
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/service/type/block-chain'>
                        Blockchain
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/service/type/dich-vu-phan-mem'>
                        {i18n.t('header.Software services')}
                      </Link>
                    </li>
                    {/* <li>
                    <Link className='dropdown-item' to='#'>
                      Dịch vụ khác
                    </Link>
                  </li> */}
                  </ul>
                </li>
                <li className='nav-item blog'>
                  <Link className='nav-link active' aria-current='page' to='/support'>
                    {i18n.t('header.support')}
                  </Link>
                </li>
                <li className='nav-item blog'>
                  <Link className='nav-link' to='/share'>
                    {i18n.t('header.share')}
                  </Link>
                </li>
                <li className='nav-item blog'>
                  <Link className='nav-link active' aria-current='page' to='#'>
                    {i18n.t('header.FAQ')}
                  </Link>
                </li>
              </ul>
              <div className=' '>
                <li className='nav-item'>{/* <Translate /> */}</li>

                {isLoggedIn ? (
                  <div className='d-flex flex-column'>
                    <Link className='text-start nav-link active py-2' aria-current='page' to='/banking'>
                      {i18n.t('header.recharge')}
                    </Link>
                    <Link className='nav-link active mb-3 mb-md-0 py-2' aria-current='page' onClick={CreateRoom}>
                      {i18n.t('header.Chat')}
                    </Link>
                    <div className='nav-item dropdown py-2'>
                      <Link
                        className='nav-link dropdown-toggle'
                        to='#'
                        id='navbarDropdown'
                        role='button'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        <FontAwesomeIcon icon={faUser} style={{ width: '60px' }} />
                      </Link>
                      <ul className='dropdown-menu user-menu' aria-labelledby='navbarDropdown'>
                        <li>
                          <Link className='dropdown-item' to='/information'>
                            {i18n.t('header.account-information')}
                          </Link>
                        </li>
                        <li>
                          <Link className='dropdown-item' to='/purchased'>
                            {i18n.t('header.Purchased-order')}
                          </Link>
                        </li>
                        <li>
                          <Link className='dropdown-item' to='/favorite'>
                            {i18n.t('header.Favorite-stall')}
                          </Link>
                        </li>
                        <li>
                          <Link className='dropdown-item' to='/history-money'>
                            {i18n.t('header.Payment -history')}
                          </Link>
                        </li>
                        <li>
                          <Link className='dropdown-item' to='/reseller-user'>
                            Reseller
                          </Link>
                        </li>
                        <li>
                          <Link className='dropdown-item' to='/blog'>
                            {i18n.t('header.Content-Management')}
                          </Link>
                        </li>
                        <li>
                          <Link className='dropdown-item' to='/change/password'>
                            {i18n.t('header.Change-Password')}
                          </Link>
                        </li>
                        {role === 'user' ? (
                          <li>
                            <Link className='dropdown-item' to='/register-store'>
                              {i18n.t('header.Register-sell')}
                            </Link>
                          </li>
                        ) : (
                          <li>
                            <Link className='dropdown-item' to='/store/management'>
                              {i18n.t('header.Store-management')}
                            </Link>
                          </li>
                        )}
                        <li>
                          <div style={{ cursor: 'pointer' }} className='dropdown-item primary' onClick={handleLogout}>
                            {i18n.t('header.Logout')}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button type='button' className='btn btn-primary btn-login' onClick={showModal}>
                      {i18n.t('header.Login')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Modal
            className='modal-login'
            width={600}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {getModalContent(handleCancel)}
          </Modal>

          {totalBlock && roomId ? (
            <>
              <ChatMessage
                isModalVisible={isModalMssage}
                setIsModalMessage={setIsModalMessage}
                idRoom={roomId}
                totalBlock={totalBlock}
              />
            </>
          ) : (
            <div></div>
          )}
        </nav>
      </div>
    </>
  )
}

export default Header
