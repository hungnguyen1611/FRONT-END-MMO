import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFilter } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Menu, Input, Button } from 'antd'

const { SubMenu } = Menu

const SidebarSearch = ({ originalData, setData, setCount }) => {
  const [active, setActive] = useState(false)
  const [businessTypes, setBusinessTypes] = useState([])
  const [checkedState, setCheckedState] = useState({})
  const [currentGroup, setCurrentGroup] = useState(null)
  const [sortOption, setSortOption] = useState(null)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [subSubTypes, setSubSubTypes] = useState({})
  const [searchInput, setSearchInput] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)
  const search = query.get('search') || ''

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_TYPE}`
        )
        if (response.data && response.data.data) {
          const data = response.data.data
          const structuredData = data.reduce((acc, item) => {
            const businessName = item.id_nameBusinessType.nameBusiness
            if (!acc[businessName]) {
              acc[businessName] = {
                id: item.id_nameBusinessType._id,
                name: businessName,
                boothTypes: []
              }
            }
            acc[businessName].boothTypes.push({
              id: item._id,
              name: item.nameBoothType,
              nameLowerCase: item.nameBoothTypeLowerCase
            })
            return acc
          }, {})
          setBusinessTypes(Object.values(structuredData))
        }
      } catch (err) {
        console.error('Error fetching business types:', err)
        setBusinessTypes([])
      }
    }

    fetchBusinessTypes()
  }, [])

  useEffect(() => {
    const fetchSubSubTypes = async () => {
      const newSubSubTypes = {}
      const requests = []

      for (const business of businessTypes) {
        for (const boothType of business.boothTypes) {
          const request = axios
            .get(
              `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DISCOUNT_BY_BOOTH_TYPE}${boothType.id}`
            )
            .then((response) => {
              if (response.data && response.data.data) {
                newSubSubTypes[boothType.id] = response.data.data
              }
            })
            .catch((err) => {
              console.error('Error fetching discounts:', err)
            })
          requests.push(request)
        }
      }

      await Promise.all(requests)
      setSubSubTypes(newSubSubTypes)
    }

    if (businessTypes.length > 0) {
      fetchSubSubTypes()
    }
  }, [businessTypes])

  const updateUrlParams = (key, value) => {
    const searchParams = new URLSearchParams(location.search)
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    navigate({ search: searchParams.toString() })
  }

  const handleCheckboxChange = (id, parentId) => {
    setCheckedState((prevState) => {
      const newState = { ...prevState }
      if (currentGroup !== parentId) {
        // Clear all selections in other groups
        Object.keys(newState).forEach((key) => {
          if (key !== parentId) {
            newState[key] = {}
          }
        })
        setCurrentGroup(parentId)
        updateUrlParams('type', parentId)
      }

      const groupKey = parentId
      if (!newState[groupKey]) {
        newState[groupKey] = {}
      }

      newState[groupKey][id] = !newState[groupKey][id]
      return newState
    })

    filterData()
  }

  const handleMenuItemClick = (subSubType, boothTypeId) => {
    handleCheckboxChange(subSubType._id, boothTypeId)
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

  const handleSearchInputChange = (e) => {
    const value = e.target.value
    setSearchInput(value)

    const searchParams = new URLSearchParams(location.search)

    if (value) {
      searchParams.set('search', value)
    } else {
      searchParams.set('search', '')
    }

    navigate({ search: searchParams.toString() })
  }

  const filterData = async () => {
    const selectedIds = Object.values(checkedState)
      .flatMap((group) => Object.entries(group))
      .filter(([_, value]) => value)
      .map(([key]) => key)

    let filteredData = [...originalData]

    if (selectedIds.length > 0) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SEARCH_HOME}`,
          {
            params: {
              ids: selectedIds
            }
          }
        )
        filteredData = response.data.data
      } catch (error) {
        console.error('Error fetching filtered data:', error)
        filteredData = []
      }
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

  const businessItems = businessTypes.map((business) => ({
    key: business.id,
    label: business.name,
    children: business.boothTypes.map((boothType) => ({
      key: boothType.id,
      label: boothType.name,
      children: (subSubTypes[boothType.id] || []).map((subSubType) => ({
        key: subSubType._id,
        label: (
          <span
            onClick={() => handleMenuItemClick(subSubType, boothType.id)}
            style={{ cursor: 'pointer', width: '100%' }}
          >
            <Input
              className='checkbox-sidebar'
              color='green'
              type='checkbox'
              value={subSubType._id}
              checked={checkedState[boothType.id]?.[subSubType._id] || false}
              readOnly
            />
            <span className='ms-2 span-sidebar'>{subSubType.nameDiscount}</span>
          </span>
        )
      }))
    }))
  }))

  return (
    <>
      <div className={`d-flex flex-column wrapper-side p-3 ${active ? 'active' : ''}`}>
        <div className='wrapper-filter'>
          <div className='d-flex pb-3 align-items-center'>
            <FontAwesomeIcon className='d-lg-block d-none' icon={faFilter} />
            <h4 className='heading-fill ms-2 mb-0 d-lg-block d-none'>Bộ lọc tìm kiếm</h4>
          </div>
          <div className='heading-fill pb-3 d-flex d-lg-none justify-content-between align-items-center'>
            <h4>Bộ lọc</h4>
            <FontAwesomeIcon onClick={() => setActive(!active)} icon={faBars} />
          </div>
          <div>
            <Input placeholder='Tìm kiếm với từ khóa' value={searchInput} onChange={handleSearchInputChange} />
          </div>
          <Menu
            id='sidebar'
            mode='inline'
            style={{ width: '100%', fontFamily: 'Lexend', fontSize: '17px', backgroundColor: 'transparent' }}
            items={businessItems}
          />
        </div>
        <div className='line-sidebar my-4'></div>
        <div className='wrapper-filter'>
          <div className='d-flex pb-3 align-items-center'>
            <FontAwesomeIcon icon={faFilter} />
            <h4 className='heading-fill ms-2 mb-0'>Khoảng giá</h4>
          </div>
          <div className='d-flex gap-3'>
            <div className='form-group'>
              <input
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
            <div className='form-group'>
              <input
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
          <button onClick={filterData} type='button' className='btn btn-primary mt-4 py-2 btn-submit-filter'>
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

export default SidebarSearch
