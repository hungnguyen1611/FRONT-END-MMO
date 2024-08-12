import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './FooterHome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEnvelope, faFaceGrinSquintTears } from '@fortawesome/free-solid-svg-icons'
import insta from '~/assets/img/discord.png'
import linkin from '~/assets/img/tele.png'
import youtube from '~/assets/img/x.png'
import { Button, Modal } from 'antd'
import logo from '~/assets/img/logo.png'
import Login from '~/layouts/Header/Login'
import Register from '~/layouts/Header/Register'
import {
  FacebookOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  ClockCircleOutlined,
  MailOutlined,
  MessageOutlined,
  DownOutlined,
  SendOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'

const FooterHome = () => {
  const { i18n } = useTranslation()
  const role = useSelector((state) => state.auth.role)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('login')

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

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleJoin = () => {
    if (role === 'user') {
      navigate('/register-store')
      return
    }
    // navigate('/register-store')

    setIsModalOpen(true)
  }
  return (
    <div className='wrapper-footer'>
      <div className='container-fluid'>
        <div className='row pb-md-5 py-lg-5 no-margin-sm'>
          <div className='col-12 col-md-12 col-lg-3 mt-md-3 py-md-2 px-md-3'>
            <img width={'100%'} src={logo} alt='logo' className='logo-img-footer'></img>
          </div>

          <div className='col-12 col-md-6 col-lg-3 mt-md-3 px-md-3'>
            <div className='d-flex flex-column wrapper-footer-item'>
              <h3 className='title-colum-footer'> {i18n.t('Footer.Contact')}</h3>
              <p className='content-footer'>{i18n.t('Footer.Contact-cooperation')}</p>
              <p className='content-footer'>
                <SendOutlined /> {i18n.t('Footer.Chat-staff')}
              </p>
              <p className='content-footer'>
                <FacebookOutlined /> MMOWEB3
              </p>
              <p className='content-footer'>
                <MailOutlined /> {i18n.t('Footer.Support')}
              </p>
              <p className='content-footer'>
                <ClockCircleOutlined /> {i18n.t('Footer.Mon-Sat')}
              </p>
            </div>

            <div className='divider-footer'></div>
          </div>
          <div className='col-12 col-md-6 col-lg-3 mt-3 px-md-3'>
            <div className='d-flex flex-column wrapper-footer-item'>
              <h3 className='title-colum-footer'>{i18n.t('Footer.Infor')}</h3>
              <p className='content-footer'>{i18n.t('Footer.An-community')}</p>
              <p className='content-footer'>{i18n.t('Footer.Automatic-delivery')}</p>
              <Link className='footer-item-link content-footer' to='/'>
                <p> {i18n.t('Footer.Frequently-questions')}</p>
              </Link>
              <Link className='footer-item-link content-footer' to='/'>
                <p> {i18n.t('Footer.terms-use')}</p>
              </Link>
            </div>
            <div className='divider-footer'></div>
          </div>
          <div className='col-12 col-md-6 col-lg-3 mt-3 px-md-3'>
            <div className='d-flex flex-column wrapper-footer-item'>
              <h3 className='title-colum-footer'>{i18n.t('Footer.Register-sell')}</h3>
              <p className='content-footer'>{i18n.t('Footer.Create-ability')}</p>

              {role === 'user' ? (
                <Button
                  onClick={() => navigate('/register-store')}
                  type='primary'
                  style={{ backgroundColor: '#FF6600', borderColor: '#FF6600', width: '7rem' }}
                  className='content-footer'
                >
                  {i18n.t('Footer.Join')}
                </Button>
              ) : role === 'agent' ? (
                <>
                  {/* <Button
                    onClick={handleJoin}
                    type='primary'
                    style={{ backgroundColor: '#FF6600', borderColor: '#FF6600', width: '7rem' }}
                    className='content-footer'
                  >
                    Tham gia
                  </Button> */}
                </>
              ) : (
                <Button
                  onClick={handleJoin}
                  type='primary'
                  style={{ backgroundColor: '#FF6600', borderColor: '#FF6600', width: '7rem' }}
                  className='content-footer'
                >
                  {i18n.t('Footer.Join')}
                </Button>
              )}

              <p className='content-footer'>{i18n.t('Footer.Follow-networks')}</p>
              <div className='d-flex align-items-center content-footer '>
                <FacebookOutlined style={{ fontSize: '24px', marginRight: '10px', cursor: 'pointer' }} />
                <LinkedinOutlined style={{ fontSize: '24px', marginRight: '10px', cursor: 'pointer' }} />
                <YoutubeOutlined style={{ fontSize: '24px', marginRight: '10px', cursor: 'pointer' }} />
                <InstagramOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
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
        </div>
      </div>
    </div>
  )
}

export default FooterHome
