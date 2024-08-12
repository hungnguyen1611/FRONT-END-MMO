import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import sideface from '~/assets/img/side-face.png'
import load from '~/assets/img/load.png'
import { Link, useLocation, useParams } from 'react-router-dom'
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

const DetailSeller = () => {
  // const { id_booth } = useParams()
  const location = useLocation()
  const queryString = location.pathname.split('/reseller/')[1]
  // const queryParams = new URLSearchParams(queryString)
  const queryParams = new URLSearchParams(location.search)
  const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`
  const boothRaw = queryParams.get('booth')
  const resellerRaw = queryParams.get('reseller')

  const id_booth = boothRaw && boothRaw.length > 4 ? boothRaw.substring(4) : boothRaw
  const resellerId = resellerRaw && resellerRaw.length > 4 ? resellerRaw.substring(4) : resellerRaw
  // const id_business = '66441db801be4d530febb867'
  // const id_business = '66441dab01be4d530febb864'
  const id_user = useSelector((state) => state.auth._id)
  const [active, setActive] = useState(0)
  const [id_business, setId_business] = useState(null)
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
  const accessToken = localStorage.getItem('token')

  console.log('123', resellerId, id_booth)
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_RESELLER_AND_BOOTH}?id_reseller=${resellerId}&id_booth=${id_booth}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setData(response?.data?.data[0]?.id_boothService || response?.data?.data[0]?.id_boothProduct)
          // const initialPrice = response?.data?.data?.detailBooth[0]?.price || 0
          const boothService = response.data.data[0]?.id_boothService
          const boothProduct = response.data.data[0]?.id_boothProduct
          const initialPrice = boothService?.detailBooth[0]?.price || boothProduct?.detailBooth[0]?.price || 0
          console.log('initialPrice', initialPrice)
          const initialQuantity =
            boothProduct?.detailBooth[0]?.quantity - boothProduct?.detailBooth[0]?.countQuantity || 0
          const initialId = boothService?.detailBooth[0]?._id || boothProduct?.detailBooth[0]?._id || 0
          if (initialPrice !== null) {
            setPrice(initialPrice)
          }
          setQuantityItem(boothProduct?.detailBooth[0]?.quantity - boothProduct?.detailBooth[0]?.countQuantity || 0)
          setTotalPrice(boothService?.detailBooth[0]?.price * 1 || boothProduct?.detailBooth[0]?.price * 1)
          setId_detailBooth(initialId)
          setQuantitySell(boothService?.detailBooth[0]?.quantity || boothProduct?.detailBooth[0]?.quantity)
          // setQuantitySell(response?.data?.data?.detailBooth[0]?.quantity)
          setId_business(
            response?.data?.data[0]?.id_boothService?.id_businessType?._id ||
              response?.data?.data[0]?.id_boothProduct?.id_businessType?._id
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_booth, resellerId])
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
  // const handleDegree = () => {
  //   if (quantity > 1) {
  //     setQuantity((prevQuantity) => prevQuantity - 1)
  //     setTotalPrice(price * (quantity - 1))
  //   }
  // }

  // const handleDegreeService = () => {
  //   if (quantityService > 1) {
  //     setQuantityService((prevQuantity) => prevQuantity - 1)
  //     setTotalPrice(price * (quantityService - 1))
  //   }
  // }
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
  // const handleIncrease = () => {
  //   if (quantity < quantityItem) {
  //     setQuantity((prevQuantity) => prevQuantity + 1)
  //     setTotalPrice(price * (quantity + 1))
  //   }
  // }

  // const handleIncreaseService = () => {
  //   setQuantityService((prevQuantity) => prevQuantity + 1)
  //   setTotalPrice(price * (quantityService + 1))
  // }
  const handleIncreaseServiceDay = () => {
    setDay((prevQuantity) => prevQuantity + 1)
  }
  // console.log(data)
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
  console.log('price', price)
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
  console.log('location', location.pathname)

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Header />
      <div className='container my-3'>
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
          <div className='d-flex flex-md-row flex-column wrap-head-detail justify-content-center p-3'>
            <div className='wrap-img-detail me-3 mb-3'>
              {/* <img className='wrap-image-detail' src={sideface} alt='face'></img> */}
              {/* <LazyImage className='wrap-image-detail' src={data?.imageBooth[0]} alt='face' /> */}
              {data.imageBooth && data.imageBooth.length > 0 ? (
                <LazyImage className='wrap-image-detail' src={data.imageBooth[0]} alt='face' />
              ) : (
                <img className='wrap-image-detail' src={load} alt='face'></img>
              )}
              <ul className='wrap-item-detail py-2 d-flex flex-wrap gap-lg-5 gap-3'>
                <li className='li-detail me-5 me-md-0'>
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
                {/* {data?.id_businessType?.nameBusiness === 'Sản phẩm' && (
                  <li className='li-detail'>Tồn kho: {quantityItem}</li>
                )} */}
              </ul>
            </div>
            <div className='d-flex flex-column detail-right'>
              <div className='wrap-item-detail py-2 d-flex align-items-center justify-content-between'>
                <h2 className='heading-detail-name ps-3'>{data?.nameBooth}</h2>
              </div>
              {/* <div className='p-3 wrap-detail-info'> */}
              <div className='p-3'>
                {/* <div className='text-center wrap-detail-info-heading p-1'>
                  <h3>Thông tin </h3>
                </div> */}
                <div className='wrap-item-detail py-2'>
                  {data?.id_businessType?.nameBusiness === 'Sản phẩm' && (
                    <>
                      <div className='d-flex gap-3 flex-wrap mb-2 align-items-center'>
                        {/* <p className='me-3 span-detail'>1 Reviews </p> <span className='me-3 line-detail'></span>{' '} */}
                        <p className='fs-5' style={{ color: '#828282' }}>
                          Đã bán: {quantitySell - quantityItem}
                        </p>
                        <Favorite id_user={id_user} id_booth={id_booth} id_business={id_business} />
                        {/* <p className='span-detail'>Đã bán: {totalCountQuantity}</p> */}
                      </div>
                      <h6 className='my-4'>{data?.shortDesc}</h6>
                    </>
                  )}
                  {data?.id_businessType?.nameBusiness === 'Dịch vụ' && (
                    <>
                      <div className='d-flex gap-3 flex-wrap mb-2 align-items-center'>
                        <h6 className='my-4'>{data?.shortDesc}</h6>
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
                        data?.detailBooth.map((da, i) => (
                          <div
                            key={i}
                            onClick={() => handleClick(i, da?.price, da?.countQuantity, da?._id, da?.quantity)}
                            className={`wrap-detail-check me-3 mb-2 ${active === i ? 'active' : ''} ${
                              da?.countQuantity === da?.quantity ? 'disable' : ''
                            } p-2`}
                          >
                            <div className='d-flex flex-column'>
                              <p>{da?.name}</p>
                              {/* <p className='detail-price fw-bold'>{da?.price?.toLocaleString()} VND</p> */}
                            </div>
                          </div>
                        ))
                      ) : (
                        data?.detailBooth.map((da, i) => (
                          <div
                            key={i}
                            onClick={() => handleClickService(i, da?.price, da?.countQuantity, da?._id, da?.quantity)}
                            className={`wrap-detail-check me-3 mb-2 ${active === i ? 'active' : ''} p-2`}
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
                {/* <p className='detail-price fw-bold'>
                  {price?.toLocaleString() || Array.isArray(data.detailBooth)
                    ? data?.detailBooth[0]?.price?.toLocaleString()
                    : 0}{' '}
                  VND
                </p> */}
                {data?.detailBooth && data?.detailBooth.length > 0 ? (
                  <h3 className='total-detail my-3'>
                    đ {totalPrice ? totalPrice.toLocaleString() : price?.toLocaleString()}
                  </h3>
                ) : (
                  <></>
                )}
                {data?.id_businessType?.nameBusiness === 'Sản phẩm' && (
                  <div className='li-detail py-2'>
                    Kho: <span className='span-link-content'>{quantityItem}</span>
                  </div>
                )}
                <div className='wrap-item-detail py-2'>
                  {data?.id_businessType?._id === import.meta.env.VITE_API_URL_API_ID_PRODUCT && (
                    <div className='d-flex align-items-center my-3 flex-wrap'>
                      <p className='fs-6 mb-3 mb-lg-0 me-4'>Số lượng: </p>
                      <div>
                        {/* <span onClick={handleDegree} className='wrap-quantity px-3 py-1'>
                          -
                        </span>{' '} */}
                        <span
                          onClick={handleDegree}
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
                        {/* <span className='mx-2'>{quantity}</span>{' '} */}
                        {/* <input
                          type='number'
                          className='mx-2 centered-input'
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
                          max={quantityItem}
                          style={{ width: '60px' }}
                        />{' '} */}
                        <input
                          className='quantity-input'
                          // value={quantityService}
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
                        {/* <span onClick={handleIncrease} className='wrap-quantity px-3 py-1'>
                          +
                        </span> */}
                        <span
                          onClick={handleIncrease}
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
                  )}
                  {data?.id_businessType?._id === import.meta.env.VITE_API_URL_API_ID_SERVICE && (
                    <div className='d-flex flex-wrap justify-content-between'>
                      <div className='d-flex align-items-center my-3 flex-wrap'>
                        <p className='mb-3 mb-lg-0 fs-6 me-4'>Số lượng: </p>
                        <div>
                          {/* <span onClick={handleDegreeService} className='wrap-quantity px-3 py-1'>
                            -
                          </span>{' '} */}
                          <span
                            onClick={handleDegreeService}
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
                          {/* <span className='mx-2'>{quantityService}</span>{' '} */}
                          {/* <input
                            type='number'
                            className='mx-2'
                            value={quantityService}
                            onChange={handleQuantityServiceChange}
                            min='1'
                            style={{ width: '60px' }}
                          /> */}
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
                          {/* <span onClick={handleIncreaseService} className='wrap-quantity px-3 py-1'>
                            +
                          </span> */}
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
                  <div className='form-group'>
                    <input
                      id='promocode'
                      type='promocode'
                      placeholder='Nhập mã giảm giá'
                      className='form-control'
                      required
                      onChange={(e) => setPromocode(e.target.value.trim())}
                      onBlur={(e) => setPromocode(e.target.value.trim())}
                    />
                  </div>

                  <Order
                    id_user={id_user}
                    codeCoupon={promocode}
                    id_business={id_business}
                    id_booth={id_booth}
                    id_detailBooth={id_detailBooth}
                    quantity={quantity}
                    total={totalPrice ? totalPrice : price}
                    id_seller={data?.id_user?._id}
                    linkReseller={fullUrl}
                    day={day}
                    quantityService={quantityService}
                  />
                  <button type='button' className='btn btn-chat-detail my-2 me-3 px-4 py-2'>
                    Nhắn tin
                  </button>
                  {data?.statusReseller && (
                    <Reseller
                      id_user={id_user}
                      id_booth={id_booth}
                      id_business={id_business}
                      id_seller={data?.id_user?._id}
                    />
                  )}
                </div>
              </div>
              {/* {data?.detailBooth && data?.detailBooth.length > 0 ? (
                <h3 className='total-detail ms-3'>
                  Tổng tiền:{' '}
                  {totalPrice
                    ? totalPrice.toLocaleString()
                    : price?.toLocaleString() || (data?.detailBooth[0]?.price * quantityService).toLocaleString()}{' '}
                  VND
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
      </div>
      <Footer />
    </div>
  )
}

export default DetailSeller
// import { useLocation, useParams } from 'react-router-dom'

// const DetailSeller = () => {
//   const location = useLocation()
//   const queryString = location.pathname.split('/reseller/')[1]
//   const queryParams = new URLSearchParams(queryString)

//   const boothId = queryParams.get('booth')
//   const resellerId = queryParams.get('reseller')

//   // Sử dụng id_booth và id_reseller như bạn cần

//   return (
//     <div>
//       <h1>Detail Seller</h1>
//       <p>Booth ID: {boothId}</p>
//       <p>Reseller ID: {resellerId}</p>
//     </div>
//   )
// }

// export default DetailSeller
