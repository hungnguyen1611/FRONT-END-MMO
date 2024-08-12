import axios from 'axios'
import { useEffect, useState } from 'react'
import user from '~/assets/img/user.svg'
import { Flex, Rate } from 'antd'
import moment from 'moment'

const Review = ({ desc, _id, id_businessType }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [data, setData] = useState([])
  const [averageStars, setAverageStars] = useState(0)
  const [visibleItems, setVisibleItems] = useState(5)

  useEffect(() => {
    // let api = null
    // if (id_business === import.meta.env.VITE_API_URL_API_ID_PRODUCT) {
    //   api = import.meta.env.VITE_API_URL_API_ORDER_PRODUCT
    // } else {
    //   api = import.meta.env.VITE_API_URL_API_ORDER_SERVICE
    // }
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_REVIEWS_BY_BOOTH}?id_booth=${_id}&id_businessType=${id_businessType}`
      )
      .then((response) => {
        console.log('response', response)
        if (response && response.data && response.data.data) {
          setData(response.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [_id, id_businessType])
  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5)
  }

  useEffect(() => {
    if (data) {
      const totalStars = data?.data?.reduce((acc, review) => acc + review.stars || acc + 0, 0)
      console.log('totalStars', totalStars)
      const avgStars = totalStars / data?.data?.length
      setAverageStars(avgStars)
    }
  }, [])
  console.log('desc', data)
  console.log(averageStars)
  return (
    <div className='mt-5'>
      {/* <div className='d-flex justify-content-center gap-4'>
        <h4 onClick={() => setActiveTab(1)} className={`${activeTab === 1 ? 'status-product' : ''} cursor pb-2`}>
          Mô tả
        </h4>
        <h4 onClick={() => setActiveTab(2)} className={`${activeTab === 2 ? 'status-product' : ''} cursor pb-2`}>
          Reviews
        </h4>
      </div> */}
      <div className='wrap-detail-des p-md-5 mb-4'>
        <h3 className='mb-4'>ĐÁNH GIÁ SẢN PHẨM</h3>
        {Array.isArray(data?.data) && data.data.length > 0 ? (
          data.data.slice(0, visibleItems).map((dat, i) => (
            <div key={i} className='d-flex mb-5'>
              <div className='detail-img-user me-4'>
                <img width={'100%'} src={user} alt='User profile' />
              </div>
              <div>
                <h5>{dat?.id_user?.username}</h5>
                <div>
                  <Flex gap='middle' vertical>
                    <Rate tooltips={desc} value={dat?.stars} />
                  </Flex>
                </div>
                <p>{dat?.review}</p>
                <p>{moment(dat?.createdAt).format('DD-MM-YYYY HH:mm')}</p>
              </div>
            </div>
          ))
        ) : (
          <h5>Chưa có đánh giá nào</h5>
        )}
        {visibleItems < data?.data?.length && (
          <button onClick={loadMoreItems} className='btn btn-primary'>
            Load More
          </button>
        )}
      </div>
    </div>
  )
}

export default Review
