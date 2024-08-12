import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFilter } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Input } from 'antd'

const Sidebar = ({ originalData, setData, setCount }) => {
  const [active, setActive] = useState(false)
  const [discounts, setDiscounts] = useState([])
  const [checkedState, setCheckedState] = useState({})
  const [sortOption, setSortOption] = useState(null)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })

  useEffect(() => {
    if (originalData[0]?.id_boothType?._id) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DISCOUNT_BY_BOOTH_TYPE}${originalData[0]?.id_boothType?._id}`
        )
        .then((response) => {
          if (response.data) {
            console.log('Discount data:', response.data.data)
            setDiscounts(response.data.data)
          }
        })
        .catch((err) => {
          console.error('Error fetching discounts:', err)
          setDiscounts([])
        })
    }
  }, [originalData])

  const handleCheckboxChange = (id) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  const handleSortOptionChange = (option) => {
    setSortOption((prevOption) => (prevOption === option ? null : option))
  }

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: value
    }))
  }

  const filterData = () => {
    const selectedDiscountIds = Object.entries(checkedState)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    let filteredData = [...originalData]

    if (selectedDiscountIds.length > 0) {
      filteredData = filteredData.filter(
        (item) =>
          selectedDiscountIds.includes(item.discountProduct) || selectedDiscountIds.includes(item.discountService)
      )
    }

    if (sortOption) {
      filteredData.sort((a, b) => {
        const minPriceA =
          a?.detailBooth?.reduce((acc, item) => (item.price < acc ? item.price : acc), a?.detailBooth[0]?.price) || 0
        const minPriceB =
          b?.detailBooth?.reduce((acc, item) => (item.price < acc ? item.price : acc), b?.detailBooth[0]?.price) || 0

        return sortOption === 'asc' ? minPriceA - minPriceB : minPriceB - minPriceA
      })
    }

    if (priceRange.min || priceRange.max) {
      filteredData = filteredData.filter((item) => {
        const minPrice = item.detailBooth.reduce(
          (acc, booth) => (booth.price < acc ? booth.price : acc),
          item.detailBooth[0]?.price || 0
        )
        return minPrice >= priceRange.min && minPrice <= priceRange.max
      })
    }

    setData(filteredData)
    setCount((prevCount) => !prevCount)
  }

  return (
    <>
      <div className={`d-flex flex-column wrapper-side ${active ? 'active' : ''}`}>
        <div className='wrapper-filter'>
          <div className='d-flex pb-3 align-items-center'>
            <FontAwesomeIcon height={12} width={12} className='d-lg-block d-none icon-fill' icon={faFilter} />
            <h4 className='heading-fill ms-2 mb-0 d-lg-block d-none'>Bộ lọc tìm kiếm</h4>
          </div>
          <div className='heading-fill pb-3 d-flex d-lg-none justify-content-between align-items-center'>
            <h4>Bộ lọc</h4>
            <FontAwesomeIcon onClick={() => setActive(!active)} icon={faBars} />
          </div>
          {Array.isArray(discounts) && discounts.length > 0 ? (
            discounts.map((dis, i) => (
              <div
                key={i}
                style={{ cursor: 'pointer' }}
                className={`d-flex align-items-center mt-2 ${checkedState[dis._id] ? 'highlight' : ''}`}
                onClick={() => handleCheckboxChange(dis._id)}
              >
                <Input
                  className='checkbox-sidebar'
                  type='checkbox'
                  value={dis?._id}
                  checked={checkedState[dis._id]}
                  onChange={() => handleCheckboxChange(dis._id)}
                  onClick={(e) => e.stopPropagation()}
                ></Input>
                <p className='ms-2 span-sidebar'>{dis?.nameDiscount}</p>
              </div>
            ))
          ) : (
            <p>Không có giảm giá nào</p>
          )}
          <button onClick={filterData} type='button' className='btn btn-primary mt-4 btn-submit-filter py-1'>
            Tìm kiếm
          </button>
        </div>
        <div className='line-sidebar my-4'></div>
        <div className='wrapper-filter'>
          <div className='d-flex pb-3 align-items-center'>
            <FontAwesomeIcon height={12} width={12} icon={faFilter} />
            <h4 className='heading-fill ms-2 mb-0'>Khoảng giá</h4>
          </div>
          <div className='d-flex price-range'>
            <div className='form-group'>
              <Input
                id='minPrice'
                type='number'
                className='form-control form-sidebar'
                name='min'
                value={priceRange.min}
                onChange={handlePriceRangeChange}
                placeholder='Giá thấp nhất'
                required
              />
            </div>

            <div className='driver-input-sidebar'></div>
            <div className='form-group'>
              <Input
                id='maxPrice'
                type='number'
                className='form-control form-sidebar'
                name='max'
                value={priceRange.max}
                onChange={handlePriceRangeChange}
                placeholder='Giá cao nhất'
                required
              />
            </div>
          </div>
          <div className='d-flex flex-column'>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => handleSortOptionChange('asc')}
              className={`d-flex align-items-center mt-2 ${sortOption === 'asc' ? 'highlight' : ''}`}
            >
              <input className='checkbox-sidebar' type='radio' checked={sortOption === 'asc'} readOnly />
              <p className='ms-2 span-sidebar'>Giá tăng dần</p>
            </div>
            <div
              onClick={() => handleSortOptionChange('desc')}
              style={{ cursor: 'pointer' }}
              className={`d-flex align-items-center mt-2 ${sortOption === 'desc' ? 'highlight' : ''}`}
            >
              <input className='checkbox-sidebar' type='radio' checked={sortOption === 'desc'} readOnly />
              <p className='ms-2 span-sidebar'>Giá giảm dần</p>
            </div>
          </div>
          <button onClick={filterData} type='button' className='btn btn-primary mt-4 btn-submit-filter py-1'>
            Áp dụng
          </button>
        </div>
      </div>
      <div onClick={() => setActive(!active)} className={`over-lay ${active ? 'active' : ''}`}></div>
      <div onClick={() => setActive(!active)} className='d-block d-lg-none'>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </>
  )
}

export default Sidebar
