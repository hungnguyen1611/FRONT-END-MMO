import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import Header from '~/layouts/Header/Header'
import topcv from '~/assets/img/topcv.png'
import download from '~/assets/img/download.png'
import tietkiem from '~/assets/img/tietkiem.png'
import baomat from '~/assets/img/baomat.png'
import hotro from '~/assets/img/hotro.png'
import chamsoc from '~/assets/img/chamsoc.png'
import hoantien from '~/assets/img/hoantien.png'
import { Card, Row, Col, Button } from 'antd'
import './Home.css'
import SliderHome from './Slider'

import FooterHome from './FooterHome'
import imgGroup1 from '~/assets/img/Group1.png'
import imgGroup2 from '~/assets/img/Group2.png'
import imgGroup3 from '~/assets/img/Group3.png'
import imgGroup4 from '~/assets/img/Group4.png'
import imgGroup5 from '~/assets/img/Group5.png'
import imgGroup6 from '~/assets/img/Group6.png'
import imgGroup7 from '~/assets/img/Group7.png'
import imgGroup8 from '~/assets/img/Group8.png'
import imgGroupWhite1 from '~/assets/img/GroundWhite1.png'
import imgGroupWhite2 from '~/assets/img/GroundWhite2.png'
import imgGroupWhite3 from '~/assets/img/GroundWhite3.png'
import imgGroupWhite4 from '~/assets/img/GroundWhite4.png'
import imgGroupWhite5 from '~/assets/img/GroundWhite5.png'
import imgGroupWhite6 from '~/assets/img/GroundWhite6.png'
import imgGroupWhite7 from '~/assets/img/GroundWhite7.png'
import imgGroupWhite8 from '~/assets/img/GroundWhite8.png'
import androi from '~/assets/img/Android.png'
import ios from '~/assets/img/aplle.png'
import web from '~/assets/img/Website.png'
import { useTranslation } from 'react-i18next'

const Home = () => {
  // const navigate = useNavigate()
  const { i18n } = useTranslation()
  const [hoveredCard, setHoveredCard] = useState(null)
  const cardData = [
    {
      // icon: <MailOutlined style={{ fontSize: '24px', color: '#fff' }} />,
      id: 1,
      icon: imgGroup4,
      title: 'Email',
      description: 'Các phần mềm kinh doanh online đều có tại đây.',
      link: '/product/type/email',
      hoverIcon: imgGroupWhite1
    },
    {
      // icon: <LaptopOutlined style={{ fontSize: '24px', color: '#fff' }} />,
      id: 2,
      icon: imgGroup2,
      title: 'Phần mềm',
      description: 'Các phần mềm kinh doanh online đều có tại đây.',
      link: '/product/type/phan-mem',
      hoverIcon: imgGroupWhite2
    },
    {
      // icon: <UserOutlined style={{ fontSize: '24px', color: '#fff' }} />,
      id: 3,
      icon: imgGroup1,
      title: 'Tài khoản',
      description: 'Các phần mềm kinh doanh online đều có tại đây.',
      link: '/product/type/tai-khoan',
      hoverIcon: imgGroupWhite3
    },
    {
      // icon: <AppstoreOutlined style={{ fontSize: '24px', color: '#fff' }} />,
      id: 4,
      icon: imgGroup3,
      title: 'Sản phẩm khác',
      description: 'Các phần mềm kinh doanh online đều có tại đây.',
      link: '/product/type/phan-mem',
      hoverIcon: imgGroupWhite4
    }
  ]

  const dataservice = [
    {
      // icon: <MailOutlined style={{ fontSize: '24px', color: '#fff' }} />,
      id: 5,
      icon: imgGroup5,
      title: 'Tăng tương tác',
      description: 'Các phần mềm kinh doanh online đều có tại đây.',
      link: '/product/type/email',
      hoverIcon: imgGroupWhite5
    },
    {
      // icon: <LaptopOutlined style={{ fontSize: '24px', color: '#fff' }} />,
      id: 6,

      icon: imgGroup6,
      title: 'Dịch vụ phần mềm',
      description: 'Các phần mềm kinh doanh online đều có tại đây.',
      link: '/product/type/phan-mem',
      hoverIcon: imgGroupWhite6
    },
    {
      // icon: <UserOutlined style={{ fontSize: '24px', color: '#fff' }} />,
      id: 7,

      icon: imgGroup7,
      title: 'Dịch vụ khác',
      description: 'Các phần mềm kinh doanh online đều có tại đây.',
      link: '/product/type/tai-khoan',
      hoverIcon: imgGroupWhite7
    },
    {
      // icon: <AppstoreOutlined style={{ fontSize: '24px', color: '#fff' }} />,
      id: 8,
      icon: imgGroup8,
      title: 'Blockchain',
      description: 'Các phần mềm kinh doanh online đều có tại đây.',
      link: '/product/type/phan-mem',
      hoverIcon: imgGroupWhite8
    }
  ]

  const handleMouseEnter = (id) => {
    setHoveredCard(id)
  }

  const handleMouseLeave = () => {
    setHoveredCard(null)
  }

  const handleChangRout = (link) => {
    window.location.href = link
  }

  return (
    <div>
      <Header />
      <div className='slider-home'>
        <SliderHome />
      </div>
      <div className='product-container'>
        <div className='container pt-lg-4'>
          <div className='mb-lg-4'>
            {/* <h3 className='heading-home pb-3  fs-1'>Danh sách sản phẩm</h3> */}
            <h3 className='heading-home pb-3  fs-1'> {i18n.t('home.heading-product')}</h3>

            <Row gutter={[16, 16]} justify='center' className='list-product'>
              {cardData.map((card, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                  <Card
                    className='custom-card'
                    hoverable
                    onMouseEnter={() => handleMouseEnter(card.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleChangRout(card.link)}
                  >
                    <img className='card-icon' src={hoveredCard === card.id ? card.hoverIcon : card.icon} />
                    <h5>{card.title}</h5>
                    <p>{card.description}</p>
                    <Button type='link' className='custom-button' onClick={() => handleChangRout(card.link)}>
                      {i18n.t('home.see-more')}
                      <span className='arrow'></span> →
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <div className='list-service pb-5'>
            <h3 className='heading-home mb-3 fs-1'> {i18n.t('home.List-services')}</h3>

            <Row gutter={[16, 16]} justify='center' className='list-product'>
              {dataservice.map((card, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                  <Card
                    className='custom-card'
                    hoverable
                    onMouseEnter={() => handleMouseEnter(card.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleChangRout(card.link)}
                  >
                    <img className='card-icon' src={hoveredCard === card.id ? card.hoverIcon : card.icon} />
                    <h5>{card.title}</h5>
                    <p>{card.description}</p>
                    <Button type='link' className='custom-button' onClick={() => handleChangRout(card.link)}>
                      {i18n.t('home.see-more')} →
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
      <div className='good-home-container'>
        <div className='container'>
          <div className='goods-home'>
            <div className='text-center py-3 heading'>
              <span className='text-center span-goods'>Các mặt hàng đang kinh doanh tại </span>{' '}
              <span className='span-goods-active span-active-goods'>MMOWEB3</span>
            </div>
            <div className='  '>
              <span className='span-active-goods span-text-goods'>MMOWEB3</span>{' '}
              <span className='span-text-goods'>
                là công ty công nghệ nhân sự (HR Tech) hàng đầu Việt Nam. Với năng lực lõi là công nghệ, đặc biệt là trí
                tuệ nhân tạo (AI), sứ mệnh của <span className='span-active-goods span-text-goods'>MMOWEB3</span> đặt ra
                cho mình là thay đổi thị trường tuyển dụng - nhân sự ngày một hiệu quả hơn
              </span>
            </div>
            <div className='mt-3 list-box-good'>
              <div className='d-flex justify-content-center mt-5 flex-wrap gap-5 justify-content-lg-between px-md-2'>
                <div className='box-goods mb-5'>
                  <span className='box-goods-number'>
                    <div className='box-goods-number-head'>540.000+</div>
                    <div className='box-goods-number-title'>Mua bán email</div>
                    <div className='box-goods-number-des'>
                      Mua bán gmail, mail outlook, domain... tất cả đều có thể được tự do mua bán trên trang.
                    </div>
                  </span>
                </div>
                <div className='box-goods mb-5'>
                  <span className='box-goods-number'>
                    <div className='box-goods-number-head'>540.000+</div>
                    <div className='box-goods-number-title'>Mua bán email</div>
                    <div className='box-goods-number-des'>
                      Mua bán gmail, mail outlook, domain... tất cả đều có thể được tự do mua bán trên trang.
                    </div>
                  </span>
                </div>
              </div>
              <div className='w-100 d-flex justify-content-center'>
                <div className='img-goods mb-5 d-xl-none d-block'>
                  <img style={{ width: '100%' }} src={topcv} alt='topcv'></img>
                </div>
              </div>
              <div className='img-goods mb-5 d-xl-block d-block d-none'>
                <img style={{ width: '100%' }} src={topcv} alt='topcv'></img>
              </div>
              <div className='d-flex justify-content-lg-between flex-wrap gap-5 px-md-2 '>
                <div className='box-goods mb-5'>
                  <span className='box-goods-number'>
                    <div className='box-goods-number-head'>540.000+</div>
                    <div className='box-goods-number-title'>Mua bán email</div>
                    <div className='box-goods-number-des'>
                      Mua bán gmail, mail outlook, domain... tất cả đều có thể được tự do mua bán trên trang.
                    </div>
                  </span>
                </div>

                <div className='box-goods mb-5'>
                  <span className='box-goods-number'>
                    <div className='box-goods-number-head'>540.000+</div>
                    <div className='box-goods-number-title'>Mua bán email</div>
                    <div className='box-goods-number-des'>
                      Mua bán gmail, mail outlook, domain... tất cả đều có thể được tự do mua bán trên trang.
                    </div>
                  </span>
                </div>
                {/* <div className='w-100 d-flex justify-content-center'>
              <div className='img-goods mb-5 d-md-none d-block'>
                <img style={{ width: '100%' }} src={topcv} alt='topcv'></img>
              </div>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='customer-containner'>
        <div className='container number-customer'>
          <div className='row align-items-center py-4'>
            <div className='col-12 col-lg-6 mb-4 list-user'>
              <h1 className='heading-user'>+500.000</h1>
              <span className='span-user'> {i18n.t('home.The-chosen')}</span>{' '}
              <span className='span-user span-active-goods'>MMOWEB3</span>
              <p className='title-user mt-3'>{i18n.t('home.Thank-services')}</p>
            </div>
            <div className='col-12 col-lg-6 customer-connect'>
              <div className='row '>
                <div className='col-md-4 col-6 mb-2 d-flex flex-column align-items-center mb-lg-5'>
                  <img style={{ width: '100px' }} src={download} alt='download'></img>
                  <p className='text-center content-img'>{i18n.t('home.Quick-installation')}</p>
                </div>
                <div className='col-md-4 col-6 mb-2 d-flex flex-column align-items-center mb-lg-5 '>
                  <img style={{ width: '100px' }} src={tietkiem} alt='download'></img>
                  <p className='text-center content-img'>{i18n.t('home.Cost-savings')}</p>
                </div>
                <div className='col-md-4 col-6 mb-2 d-flex flex-column align-items-center mb-lg-5'>
                  <img style={{ width: '100px' }} src={baomat} alt='download'></img>
                  <p className='text-center content-img'>{i18n.t('home.Absolute-security')}</p>
                </div>
                <div className='col-md-4 col-6 mb-2 d-flex flex-column align-items-center'>
                  <img style={{ width: '100px' }} src={hotro} alt='download'></img>
                  <p className='text-center content-img'>{i18n.t('home.phone-support')}</p>
                </div>
                <div className='col-md-4 col-6 mb-2 d-flex flex-column align-items-center'>
                  <img style={{ width: '100px' }} src={chamsoc} alt='download'></img>
                  <p className='text-center content-img'>{i18n.t('home.Dedicated-regime')}</p>
                </div>
                <div className='col-md-4 col-6 mb-2 d-flex flex-column align-items-center'>
                  <img style={{ width: '100px' }} src={hoantien} alt='download'></img>
                  <p className='text-center content-img'>{i18n.t('home.30-satisfied')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='technology-mmo'>
        <div className='header-technology'>
          <h6 style={{ marginBottom: '25px' }}>MMO Web3</h6>
          <h2>
            {i18n.t('home.Technology-pioneer')} <br /> {i18n.t('home.Leading-trend')}
          </h2>
        </div>
        <div className='row conten-technology '>
          <div className='col-12 col-sm-6 col-md-4 mt-4 col-lg-4 '>
            {/* <GlobalOutlined className='icon' /> */}
            <img src={`${web}`} className='img-technology' alt='web' />
          </div>

          <div className='col-12 col-sm-6 col-md-4 mt-4'>
            {/* <AndroidOutlined className='icon' /> */}
            <img src={`${androi}`} className='img-technology' alt='android' />
          </div>

          <div className='col-12 col-sm-6 col-md-4 mt-4'>
            {/* <AppleOutlined className='icon' /> */}
            <img src={`${ios}`} className='img-technology' alt='ios' />
          </div>
        </div>
      </div>

      <FooterHome />
    </div>
  )
}

export default Home
