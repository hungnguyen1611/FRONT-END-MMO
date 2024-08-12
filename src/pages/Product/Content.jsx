import { Flex, Rate, Tag } from 'antd'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Content = ({ product }) => {
  const [reviews, setReviews] = useState([])
  const totalQuantity = product?.detailBooth?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0
  const totalCountQuantity = product?.detailBooth?.reduce((acc, item) => acc + (item.countQuantity || 0), 0) || 0
  const navigate = useNavigate()
  const minPrice =
    product?.detailBooth?.reduce(
      (acc, item) => (item.price < acc ? item.price : acc),
      product?.detailBooth[0]?.price || 0
    ) || 0

  const observer = useRef()
  const contentRef = useRef()
  const fetchReviews = async () => {
    if (product?._id && product?.id_businessType) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_REVIEWS_BY_BOOTH}?id_booth=${product._id}&id_businessType=${product.id_businessType._id || product.id_businessType}`
        )
        if (response && response.data && response.data.data) {
          setReviews(response.data.data)
        }
      } catch (err) {
        console.error('Error fetching reviews:', err)
      }
    }
  }

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchReviews()
          observer.current.disconnect()
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    if (contentRef.current) observer.current.observe(contentRef.current)
  }, [product?._id, product?.id_businessType?._id, product?.id_businessType])
  const handleClick = () => {
    navigate(`/detail/${product?.id_businessType?._id || product?.id_businessType}/booth/${product?._id}`)
  }
  const handleSellerClick = (e) => {
    e.stopPropagation()
    navigate(`/booth/user/${product?.id_user?._id}`)
  }
  const totalStars = reviews.reduce((acc, review) => acc + (review.stars || 0), 0)
  const averageStars = reviews.length > 0 ? totalStars / reviews.length : 0
  return (
    <div
      style={{ cursor: 'pointer' }}
      className='d-flex wrap-content p-3 flex-column flex-md-row'
      ref={contentRef}
      onClick={handleClick}
    >
      <Tag className='wrap-title-content px-2 py-1'>{product?.id_businessType?.nameBusiness}</Tag>
      <div className='me-5 d-flex flex-column align-items-center'>
        <Link
          className='wrap-link-content d-block'
          to={`/detail/${product?.id_businessType?._id || product?.id_businessType}/booth/${product?._id}`}
        >
          <img className='wrap-link-content-img' width='100%' src={product?.imageBooth?.[0]} alt='product'></img>
        </Link>
        <h5 className='price-content mt-2'>đ {minPrice.toLocaleString()}</h5>
      </div>
      <div className='item-product'>
        <h5>
          <Link
            className='name-content'
            to={`/detail/${product?.id_businessType?._id || product?.id_businessType}/booth/${product?._id}`}
          >
            {product?.nameBooth}
          </Link>
        </h5>
        <div className='d-flex align-items-center conten-product'>
          <Flex gap='middle' vertical className='my-2'>
            <Rate value={averageStars} className='fs-6' />
          </Flex>
          {product?.id_businessType?.nameBusiness === 'Sản phẩm' ? (
            <p className='ms-3' style={{ color: '#828282' }}>
              Đã bán: {totalCountQuantity}
            </p>
          ) : (
            <></>
          )}
          {/* <p className='ms-3' style={{ color: '#828282' }}>
            Đã bán: {totalCountQuantity}
          </p> */}
        </div>
        <p className='my-2' style={{ color: '#828282' }}>
          {reviews.length} Reviews
        </p>
        <p className='my-2' style={{ color: '#828282' }}>
          {product?.id_businessType?.nameBusiness}:{' '}
          <Link className='span-link-content'>{product?.id_boothType?.nameBoothType}</Link>
        </p>
        {product?.id_businessType?.nameBusiness === 'Sản phẩm' ? (
          <p className='my-2' style={{ color: '#828282' }}>
            Còn: <Link className='span-link-content'>{totalQuantity}</Link>
          </p>
        ) : (
          <></>
        )}
        {/* <p className='my-2' style={{ color: '#828282' }} onClick={handleSellerClick}>
          Người bán:{' '}
          <Link className='span-link-content' to={`/booth/user/${product?.id_user?._id}`}>
            {product?.id_user?.username || product?.id_user}
          </Link>
        </p> */}
        <p className='my-2' style={{ color: '#828282', cursor: 'pointer' }} onClick={handleSellerClick}>
          Người bán: <span className='span-link-content'>{product?.id_user?.username || product?.id_user}</span>
        </p>
      </div>
    </div>
  )
}

export default Content
