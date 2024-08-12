import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import DetailSimilar from './DetailSimilar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Similar = ({ name_type, name_business }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  const sliderRef = useRef()
  const [data, setData] = useState([])
  useEffect(() => {
    let api = null
    if (name_business === 'sản phẩm') {
      api = import.meta.env.VITE_API_URL_API_ALL_BOOTH_PRODUCT
    } else {
      api = import.meta.env.VITE_API_URL_API_ALL_BOOTH_SERVICE
    }

    const nameTypeMapping = {
      email: 'email',
      'phần mềm': 'phần mềm',
      'tài khoản': 'tài khoản',
      'dịch vụ phần mềm': 'dịch vụ phần mềm',
      'tăng tương tác': 'tăng tương tác',
      blockchain: 'blockchain',
      khac: 'khác'
    }

    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${api}`)
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          let filteredData = response.data.data
          if (name_type in nameTypeMapping) {
            if (name_type === 'khac') {
              setData(filteredData)
            } else {
              filteredData = filteredData.filter(
                (item) => item.id_boothType.nameBoothTypeLowerCase === nameTypeMapping[name_type]
              )
              setData(filteredData)
            }
          } else {
            setData(filteredData)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [name_business, name_type])
  console.log('slide', data)
  // Tạo URL từ các tham số đầu vào
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
    const businessPath = name_business === 'sản phẩm' ? 'product' : 'service'
    const typePath = typeMapping[name_type] || 'khac'
    return `/${businessPath}/type/${typePath}`
  }

  return (
    <div className='my-5 wrap-detail-des p-md-5'>
      <div className='d-flex align-items-center mb-3 justify-content-between flex-wrap'>
        <h3 className='similar-product'>Sản phẩm tương tự</h3>
        <div className='d-flex'>
          <Link to={createUrl()} className='span-link-content see-all'>
            Xem tất cả {'>'}
          </Link>
        </div>
      </div>
      <div>
        <Slider ref={sliderRef} {...settings}>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((dat, i) => (
              <div key={i} className='px-sm-2'>
                <DetailSimilar data={dat} />
              </div>
            ))
          ) : (
            <></>
          )}
        </Slider>
      </div>
    </div>
  )
}

export default Similar
