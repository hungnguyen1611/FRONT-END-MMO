import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import { Input, Pagination } from 'antd'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '~/layouts/Header/Header'
import Content from '../Product/Content'
import FooterHome from '../Home/FooterHome'
import SidebarSearch from '~/components/SideBarSearch/SideBarSearch'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SearchResults = () => {
  const query = useQuery()
  const search = query.get('search')
  const type = query.get('type')?.split(',') || []
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(false)

  const nameTypeMapping = {
    email: 'email',
    'phan-mem': 'phần mềm',
    'tai-khoan': 'tài khoản',
    'dich-vu-phan-mem': 'dịch vụ phần mềm',
    'tang-tuong-tac': 'tăng tương tác',
    'block-chain': 'blockchain',
    khac: 'khác'
  }

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SEARCH}`,
          {
            params: { search, type: type.join(',') }
          }
        )

        if (response.data && (response.data.data.boothProduct || response.data.data.boothService)) {
          let combinedData = [...response.data.data.boothProduct, ...response.data.data.boothService]
          if (type.length && type.some((t) => t in nameTypeMapping)) {
            combinedData = combinedData.filter((item) => type.includes(item.id_boothType.nameBoothTypeLowerCase))
          }
          combinedData = combinedData.filter((item) => item.statusBooth === 'Approved')
          setOriginalData(combinedData)
          setData(combinedData)
        } else {
          setData([])
        }
      } catch (error) {
        console.error('Error fetching search results:', error)
        setData([])
      }
    }

    fetchResults()
  }, [search, type, count])

  const currentItems = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }
  console.log('data123', data)
  return (
    <div className='wrap-product'>
      <Header />
      <div className='container d-block d-lg-none product-wrap py-5'>
        <div>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className='breadcrumb-item'>Kết quả tìm kiếm</li>
            </ol>
          </nav>
        </div>
        <div className='d-lg-flex '>
          <SidebarSearch originalData={originalData} setData={setData} setCount={setCount} />
          {data[0]?.id_boothType?.nameBoothTypeLowerCase && (
            <h3 className='ms-2'>Gian hàng {data[0]?.id_boothType?.nameBoothTypeLowerCase}</h3>
          )}
          <div className='container'>
            <div className='head-product p-2 my-3'>Kết quả tìm kiếm cho "{search}"</div>
            <div className='row'>
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <div key={index} className='col-12 col-xl-6 mb-3'>
                    <Content product={item} />
                  </div>
                ))
              ) : (
                <h2>Không có dữ liệu phù hợp</h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-3 d-none d-lg-block'>
        <div>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className='breadcrumb-item'>Kết quả tìm kiếm</li>
            </ol>
          </nav>
        </div>
        <div className='d-flex row'>
          <div className='col-3'>
            <SidebarSearch originalData={originalData} setData={setData} setCount={setCount} />
            {data[0]?.id_boothType?.nameBoothTypeLowerCase && (
              <h3 className='ms-2 mt-5'>Gian hàng {data[0]?.id_boothType?.nameBoothTypeLowerCase}</h3>
            )}
          </div>
          <div className='col-9 wrap-product-container py-3'>
            <div className='container'>
              <div className='d-flex'>
                <h3>Kết quả tìm kiếm cho "{search}"</h3>
              </div>
              <div className='head-product p-3 my-3'>Kết quả tìm kiếm cho "{search}"</div>
              <div className='row'>
                {Array.isArray(currentItems) && currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <div key={index} className='col-12 col-xl-6 mb-3'>
                      <Content product={item} />
                    </div>
                  ))
                ) : (
                  <h2>Không có dữ liệu phù hợp</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center py-3'>
        <Pagination current={currentPage} pageSize={pageSize} onChange={handlePageChange} total={data.length} />
      </div>
      <FooterHome />
    </div>
  )
}

export default SearchResults
