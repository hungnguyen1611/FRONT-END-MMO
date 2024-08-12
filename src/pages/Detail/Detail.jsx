import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import { Modal, notification } from 'antd'
import load from '~/assets/img/load.png'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './Detail.css'
import { useEffect, useState } from 'react'
import Describe from './Describe'
import Similar from './Similar'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import axios from 'axios'
import Order from './Order'
import { useSelector } from 'react-redux'
import Reseller from './Reseller'
import Favorite from './Favorite'
import Review from './Review'
import ChatMessage from '../Message/message'
import FooterHome from '../Home/FooterHome'
import Login from '~/layouts/Header/Login'
import Register from '~/layouts/Header/Register'

const Detail = () => {
  const { id_business, id_booth } = useParams()
  const id_user = useSelector((state) => state.auth._id)
  const [active, setActive] = useState(0)
  const [data, setData] = useState([])
  const [price, setPrice] = useState(null)
  const [quantityItem, setQuantityItem] = useState(null)
  const [quantitySell, setQuantitySell] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [quantityService, setQuantityService] = useState(1)
  const [totalPrice, setTotalPrice] = useState(null)
  const [id_detailBooth, setId_detailBooth] = useState(null)
  const [promocode, setPromocode] = useState('')
  const [day, setDay] = useState(7)
  const [isModalMssage, setIsModalMessage] = useState(false)
  const [roomId, setroomId] = useState()
  const [totalBlock, setTotalBlock] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('login')
  const accessToken = localStorage.getItem('token')

  // const [idChatReceive, setIdChatReceive] = useState(null)
  // const Navigate = useNavigate()

  const secondId = data?.id_user?._id

  const CreateRoom = async () => {
    const firstId = localStorage.getItem('_id')

    if (!firstId) {
      notification.error({
        message: 'Bạn phải đăng nhập tài khoản.',
        duration: 2
      })

      setIsModalOpen(true)
      return
    }

    // const roomCreated = roomId

    // if (roomId) {
    //   setIsModalMessage(true)
    //   return
    // }

    const idAmin = '6653e82987e75be428b6355a'

    try {
      const Room = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CREATE_ROOM}`,
        {
          members: [firstId, secondId]
        },
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        }
      )

      const Roomadmin = await axios.post(
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
      if ((Room, Roomadmin)) {
        console.log('Room', Room)
        setroomId(Room.data.data._id)
        setTotalBlock(Room.data.data.totalBlock)
        setIsModalMessage(true)
      }
    } catch (error) {
      console.error('Error creating room:', error)
    }
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_BY_BOOTH}?id_business=${id_business}&id_booth=${id_booth}`
        )

        if (response && response.data) {
          const data = response.data.data
          setData(data)

          const initialPrice = data.detailBooth[0]?.price || 0
          const initialQuantity = data.detailBooth[0]?.quantity - data.detailBooth[0]?.countQuantity || 0
          const initialId = data.detailBooth[0]?._id || 0

          setPrice(initialPrice)
          setQuantityItem(initialQuantity)
          setTotalPrice(initialPrice * 1)
          setId_detailBooth(initialId)
          setQuantitySell(data.detailBooth[0]?.quantity)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [id_business, id_booth])

  console.log('dat', data)
  useEffect(() => {
    if (price !== null && quantity !== null && id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT) {
      setTotalPrice(price * quantity)
    }
    if (price !== null && quantityService !== null && id_business === import.meta.env.VITE_API_URL_API_ID_SERVICE) {
      setTotalPrice(price * quantityService)
    }
  }, [price, quantity, quantityService])

  const handleClick = (i, pri, quan, id, countQuantity) => {
    console.log(quan, countQuantity)
    if (quan === countQuantity) {
      return
    }
    setActive(i)
    setPrice(pri)
    setQuantityItem(countQuantity - quan)
    setQuantity(1)
    setId_detailBooth(id)
    setQuantitySell(countQuantity)
  }
  const handleClickService = (i, pri, quan, id, countQuantity) => {
    console.log(quan, countQuantity)
    // if (quan === countQuantity) {
    //   return
    // }
    setActive(i)
    setPrice(pri)
    setQuantityItem(countQuantity - quan)
    setQuantity(1)
    setId_detailBooth(id)
    console.log('quan', quan)
  }

  const handleDegree = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }
  const handleDegreeService = () => {
    if (quantityService > 1) {
      setQuantityService((prevQuantity) => prevQuantity - 1)
    }
  }
  const handleDegreeServiceDay = () => {
    if (day > 1) {
      setDay((prevQuantity) => prevQuantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < quantityItem) {
      setQuantity((prevQuantity) => prevQuantity + 1)
    }
  }
  const handleIncreaseService = () => {
    setQuantityService((prevQuantity) => prevQuantity + 1)
  }
  const handleIncreaseServiceDay = () => {
    setDay((prevQuantity) => prevQuantity + 1)
  }

  const handleQuantityServiceChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (isNaN(value) || value < 1) {
      setQuantityService(1)
    } else {
      setQuantityService(value)
    }
  }
  const handleDayServiceChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (isNaN(value) || value < 1) {
      setDay(1)
    } else {
      setDay(value)
    }
  }
  console.log('data', data)
  const createUrl = () => {
    const typeMapping = {
      email: 'email',
      'phần mềm': 'phan-mem',
      'tài khoản': 'tai-khoan',
      'dịch vụ phần mềm': 'dich-vu-phan-mem',
      'tăng tương tác': 'tang-tuong-tac',
      blockchain: 'block-chain',
      khac: 'khac'
    }
    const businessPath = data?.id_businessType?.nameBusinessLowerCase === 'sản phẩm' ? 'product' : 'service'
    const typePath = typeMapping[data?.id_boothType?.nameBoothTypeLowerCase] || 'khac'
    return `/${businessPath}/type/${typePath}`
  }

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Header />
      <div className='container mb-3'>
        <div className='wrap-detail'>
          <div>
            <nav aria-label='breadcrumb'>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to={'/'}>Home</Link>
                </li>
                <li className='breadcrumb-item'>
                  <Link to={createUrl()}> {data?.id_boothType?.nameBoothType}</Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  {data?.nameBooth}
                </li>
              </ol>
            </nav>
          </div>
          <div className='d-flex flex-md-row flex-column wrap-head-detail justify-content-center p-4'>
            <div className='wrap-img-detail mb-3'>
              {/* <img className='wrap-image-detail' src={sideface} alt='face'></img> */}
              {/* <LazyImage className='wrap-image-detail' src={data?.imageBooth[0]} alt='face' /> */}
              {data.imageBooth && data.imageBooth.length > 0 ? (
                <LazyImage className='wrap-image-detail' src={data.imageBooth[0]} alt='face' />
              ) : (
                <img className='wrap-image-detail' src={load} alt='face'></img>
              )}
              <ul className='wrap-item-detail py-2 d-block flex-wrap gap-lg-5 gap-3'>
                <li className='li-detail me-5 me-md-0'>
                  Người bán:{' '}
                  <Link className='span-link-content' to={`/booth/user/${data?.id_user?._id}`}>
                    {data?.id_user?.username}
                  </Link>
                </li>
                <li className='li-detail'>
                  {data?.id_businessType?.nameBusiness}:{' '}
                  <Link className='span-link-content' to={createUrl()}>
                    {data?.id_boothType?.nameBoothType}
                  </Link>
                </li>
                {/* {data?.id_businessType?.nameBusiness === 'Sản phẩm' && (
    <li className='li-detail'>Tồn kho: {quantityItem}</li>
  )} */}
              </ul>
            </div>
            <div className='d-flex flex-column detail-right'>
              <div className='wrap-item-detail py-2 d-flex align-items-center justify-content-between'>
                <h2 className='heading-detail-name'>{data?.nameBooth}</h2>
              </div>
              {/* <div className='p-3 wrap-detail-info'> */}
              <div className=''>
                {/* <div className='text-center wrap-detail-info-heading p-1'>
                  <h3>Thông tin </h3>
                </div> */}
                <div className='wrap-item-detail py-2'>
                  {data?.id_businessType?.nameBusiness === 'Sản phẩm' && (
                    <>
                      <div className='d-flex gap-3 flex-wrap mb-2 align-items-center'>
                        {/* <p className='me-3 span-detail'>1 Reviews </p> <span className='me-3 line-detail'></span>{' '} */}
                        <p className='' style={{ color: '#B1B1B1', fontSize: '14px' }}>
                          Đã bán: {quantitySell - quantityItem}
                        </p>
                        <Favorite id_user={id_user} id_booth={id_booth} id_business={id_business} />
                        {/* <p className='span-detail'>Đã bán: {totalCountQuantity}</p> */}
                      </div>
                      <h6 className='mb-2 , mt-4' style={{ fontSize: '16px' }}>
                        {data?.shortDesc}
                      </h6>
                    </>
                  )}
                  {data?.id_businessType?.nameBusiness === 'Dịch vụ' && (
                    <>
                      <div className='d-flex gap-3 flex-wrap mb-2 align-items-center'>
                        <h6 className='mt-4 mb-2'>{data?.shortDesc}</h6>
                        <Favorite id_user={id_user} id_booth={id_booth} id_business={id_business} />
                        {/* <p className='span-detail'>Đã bán: {totalCountQuantity}</p> */}
                      </div>
                    </>
                  )}
                </div>
                <div className='wrap-item-detail py-2'>
                  {/* <p className='mb-3 text-uppercase'>{data?.id_businessType?.nameBusiness}</p> */}
                  <div className='d-flex flex-wrap'>
                    {Array.isArray(data?.detailBooth) && data?.detailBooth.length > 0 ? (
                      data?.id_businessType?._id === import.meta.env.VITE_API_URL_API_ID_PRODUCT ? (
                        data?.detailBooth
                          .filter((da) => da.status)
                          .map((da, i) => (
                            <div
                              key={i}
                              onClick={() => handleClick(i, da?.price, da?.countQuantity, da?._id, da?.quantity)}
                              className={`wrap-detail-check me-3 mb-2 ${active === i ? 'active' : ''} ${
                                da?.countQuantity === da?.quantity ? 'disable' : ''
                              }`}
                            >
                              <div className='d-flex flex-column'>
                                <p>{da?.name}</p>
                                {/* <p className='detail-price fw-bold'>{da?.price?.toLocaleString()} VND</p> */}
                              </div>
                            </div>
                          ))
                      ) : (
                        data?.detailBooth
                          .filter((da) => da.status)
                          .map((da, i) => (
                            <div
                              key={i}
                              onClick={() => handleClickService(i, da?.price, da?.countQuantity, da?._id, da?.quantity)}
                              className={`wrap-detail-check me-3 mb-2 ${active === i ? 'active' : ''}`}
                            >
                              <div className='d-flex flex-column'>
                                <p>{da?.name}</p>
                                {/* <p className='detail-price fw-bold'>{da?.price?.toLocaleString()} VND</p> */}
                              </div>
                            </div>
                          ))
                      )
                    ) : (
                      <div>Chưa có sản phẩm</div>
                    )}
                  </div>
                </div>
                {data?.detailBooth && data?.detailBooth.length > 0 ? (
                  <h4 className='total-detail my-3'>
                    đ {totalPrice ? totalPrice.toLocaleString() : price?.toLocaleString()}
                  </h4>
                ) : (
                  <></>
                )}
                {data?.id_businessType?.nameBusiness === 'Sản phẩm' && (
                  <div className=' py-2' style={{ fontSize: '16px' }}>
                    Kho: <span className='span-link-content'>{quantityItem}</span>
                  </div>
                )}
                {/* <ul className='wrap-item-detail py-2'>
                  <li className='li-detail'>
                    Người bán:{' '}
                    <Link className='span-link-content' to='/'>
                      {data?.id_user?.username}
                    </Link>
                  </li>
                  <li className='li-detail'>
                    {data?.id_businessType?.nameBusiness}:{' '}
                    <Link className='span-link-content' to='/'>
                      {data?.id_boothType?.nameBoothType}
                    </Link>
                  </li>
                  {data?.id_businessType?.nameBusiness === 'Sản phẩm' && (
                    <li className='li-detail'>Tồn kho: {quantityItem}</li>
                  )}
                </ul> */}
                {/* <p className='detail-price fw-bold'>{price?.toLocaleString()} VND</p> */}
                <div className='wrap-item-detail py-2'>
                  {data?.id_businessType?._id === import.meta.env.VITE_API_URL_API_ID_PRODUCT && (
                    <div className='d-flex align-items-center mb-4 flex-wrap'>
                      <p className='fs-6 mb-3 mb-lg-0 me-4'>Số lượng: </p>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span
                          onClick={handleDegree}
                          className='wrap-quantity'
                          style={{
                            padding: '0.3rem 0.75rem',
                            margin: 0,
                            borderRightColor: '#B1B1B1',

                            // borderRadius: '0px',
                            cursor: 'pointer',
                            borderColor: '#B1B1B1'
                          }}
                        >
                          -
                        </span>
                        <input
                          className='quantity-input'
                          value={quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10)
                            if (isNaN(value) || value < 1) {
                              setQuantity(1)
                            } else if (value > quantityItem) {
                              setQuantity(quantityItem)
                            } else {
                              setQuantity(value)
                            }
                          }}
                          min='1'
                          style={{
                            width: '60px',
                            textAlign: 'center',
                            padding: '0.3rem 0.75rem',
                            margin: '0',
                            borderRadius: '0px',
                            border: '1px solid #B1B1B1',
                            borderRight: '0px',
                            borderLeft: 'none'
                          }}
                        />
                        <span
                          onClick={handleIncrease}
                          className='wrap-quantity'
                          style={{
                            padding: '0.3rem 0.75rem',
                            margin: 0,
                            // borderLeft: 'none',
                            borderTopRightRadius: '4px',
                            cursor: 'pointer',
                            borderColor: '#B1B1B1',
                            borderLeftColor: '#B1B1B1'
                          }}
                        >
                          +
                        </span>
                      </div>

                      <div className='discount-detail ms-5'>
                        <input
                          id='promocode'
                          type='promocode'
                          placeholder='Nhập mã giảm giá'
                          className='promocode-detail form-control'
                          required
                          onChange={(e) => setPromocode(e.target.value.trim())}
                          onBlur={(e) => setPromocode(e.target.value.trim())}
                          style={{ padding: '2rem 0.75' }}
                        />
                      </div>
                    </div>
                  )}
                  {data?.id_businessType?._id === import.meta.env.VITE_API_URL_API_ID_SERVICE && (
                    <div className='d-flex flex-wrap justify-content-between'>
                      <div className='d-flex align-items-center my-3 flex-wrap'>
                        <p className='mb-3 mb-lg-0 fs-6 me-4'>Số lượng: </p>
                        <div>
                          {/* <span onClick={handleDegreeService} className='wrap-quantity px-3 py-1'>
                            -
                          </span> */}
                          <span
                            onClick={handleDegreeService}
                            className='wrap-quantity'
                            style={{
                              padding: '0.3rem 0.75rem',
                              margin: 0,
                              borderRightColor: '#B1B1B1',

                              // borderRadius: '0px',
                              cursor: 'pointer',
                              borderColor: '#B1B1B1'
                            }}
                          >
                            -
                          </span>
                          <input
                            className='quantity-input'
                            value={quantityService}
                            onChange={handleQuantityServiceChange}
                            min='1'
                            style={{
                              width: '60px',
                              textAlign: 'center',
                              padding: '0.3rem 0.75rem',
                              margin: '0',
                              borderRadius: '0px',
                              border: '1px solid #B1B1B1',
                              borderRight: '0px',
                              borderLeft: 'none'
                            }}
                          />
                          <span
                            onClick={handleIncreaseService}
                            className='wrap-quantity'
                            style={{
                              padding: '0.3rem 0.75rem',
                              margin: 0,
                              // borderLeft: 'none',
                              borderTopRightRadius: '4px',
                              cursor: 'pointer',
                              borderColor: '#B1B1B1',
                              borderLeftColor: '#B1B1B1'
                            }}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className='d-flex align-items-center my-3 flex-wrap'>
                        <p className='mb-3 mb-lg-0 fs-6 me-4'>Số ngày hoàn thành: </p>
                        <div className='mb-3 mb-md-0'>
                          {/* <span onClick={handleDegreeServiceDay} className='wrap-quantity px-3 py-1'>
                            -
                          </span>{' '} */}
                          <span
                            onClick={handleDegreeServiceDay}
                            className='wrap-quantity'
                            style={{
                              padding: '0.3rem 0.75rem',
                              margin: 0,
                              borderRightColor: '#B1B1B1',
                              cursor: 'pointer',
                              borderColor: '#B1B1B1'
                            }}
                          >
                            -
                          </span>
                          {/* <span className='mx-2'>{day}</span>{' '} */}
                          {/* <input
                            type='number'
                            className='mx-2'
                            value={day}
                            onChange={handleDayServiceChange}
                            min='1'
                            style={{ width: '60px' }}
                          /> */}
                          <input
                            className='quantity-input'
                            value={day}
                            onChange={handleDayServiceChange}
                            min='1'
                            style={{
                              width: '60px',
                              textAlign: 'center',
                              padding: '0.3rem 0.75rem',
                              margin: '0',
                              borderRadius: '0px',
                              border: '1px solid #B1B1B1',
                              borderRight: '0px',
                              borderLeft: 'none'
                            }}
                          />
                          {/* <span onClick={handleIncreaseServiceDay} className='wrap-quantity px-3 py-1'>
                            +
                          </span> */}
                          <span
                            onClick={handleIncreaseServiceDay}
                            className='wrap-quantity'
                            style={{
                              padding: '0.3rem 0.75rem',
                              margin: 0,
                              borderTopRightRadius: '4px',
                              cursor: 'pointer',
                              borderColor: '#B1B1B1',
                              borderLeftColor: '#B1B1B1'
                            }}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button type='button' className='btn btn-chat-detail my-2 me-3 py-2' onClick={CreateRoom}>
                    <img src='/nhantin.png' className='me-2' />
                    Nhắn tin
                  </button>

                  <Order
                    id_user={id_user}
                    codeCoupon={promocode}
                    id_business={id_business}
                    id_booth={id_booth}
                    id_detailBooth={id_detailBooth}
                    quantity={quantity}
                    total={totalPrice ? totalPrice : price}
                    id_seller={data?.id_user?._id}
                    linkReseller={data?.detailReseller}
                    day={day}
                    quantityService={quantityService}
                    setIsModalOpen={setIsModalOpen}
                  />

                  {data?.statusReseller && (
                    <Reseller
                      id_user={id_user}
                      id_booth={id_booth}
                      id_business={id_business}
                      id_seller={data?.id_user?._id}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                </div>
              </div>
              {/* {data?.detailBooth && data?.detailBooth.length > 0 ? (
                <h3 className='total-detail ms-3'>
                  Tổng tiền: {totalPrice ? totalPrice.toLocaleString() : price?.toLocaleString()} VND
                </h3>
              ) : (
                <></>
              )} */}
            </div>
          </div>
          <Describe desc={data?.desc} _id={data?._id} id_businessType={data?.id_businessType?._id} />
          <Similar
            name_type={data?.id_boothType?.nameBoothTypeLowerCase}
            name_business={data?.id_businessType?.nameBusinessLowerCase}
          />
          <Review desc={data?.desc} _id={data?._id} id_businessType={data?.id_businessType?._id} />
        </div>
        {totalBlock && roomId ? (
          <>
            <ChatMessage
              isModalVisible={isModalMssage}
              setIsModalMessage={setIsModalMessage}
              idRoom={roomId}
              totalBlock={totalBlock}
              secondId={secondId}
            />
          </>
        ) : (
          <div></div>
        )}
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

      {/* <Modal width={600} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        {getModalContent(handleCancel)}
      </Modal> */}
      <FooterHome />
    </div>
  )
}

export default Detail
