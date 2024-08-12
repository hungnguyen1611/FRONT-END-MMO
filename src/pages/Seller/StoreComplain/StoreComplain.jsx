import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import messenger from '../../../assets/img/messenger.png'
import remove from '../../../assets/img/remove.png'
import { useEffect, useState } from 'react'
import { Modal, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import ModalComplain from './ModalComplain'
import axios from 'axios'
import { useSelector } from 'react-redux'
import DetailComplain from './DetailComplain'
import moment from 'moment'

const StoreComplain = () => {
  const id = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')
  const [filteredArr, setFilteredArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [dataProduct, setDataProduct] = useState([])
  const [dataService, setDataService] = useState([])
  const [id_order, setId_order] = useState(null)
  const [id_business, setId_business] = useState(null)
  const currentItems = filteredArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }
  const [formState, setFormState] = useState({
    code: '',
    user: '',
    status: 'default'
  })
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleCancelModal = () => {
    setIsOpen(false)
  }
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_AGENT}${id}`)
  //     .then((response) => {
  //       console.log('response', response)
  //       if (response && response.data) {
  //         setDataProduct(response?.data?.data)
  //         // setFilteredArr(response?.data?.data)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_SERVICE_AGENT}${id}`)
  //     .then((response) => {
  //       console.log('response', response)
  //       if (response && response.data) {
  //         setDataService(response?.data?.data)
  //         // setFilteredArr(response?.data?.data)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_AGENT}${id}`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: `Bearer ${accessToken}`
            }
          }
        )
        const serviceResponse = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_SERVICE_AGENT}${id}`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: `Bearer ${accessToken}`
            }
          }
        )

        const productData = productResponse?.data?.data || []
        const serviceData = serviceResponse?.data?.data || []

        const combinedData = [...productData, ...serviceData]
        const filteredData = combinedData.filter((item) => item.status === 'complain' || item.status === 'Dispute')

        setDataProduct(productData)
        setDataService(serviceData)
        setFilteredArr(filteredData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [isModalOpen])
  const handleSearch = () => {
    let filtered = [...dataProduct, ...dataService]
    const combinedData = [...dataProduct, ...dataService]
    let filteredData = combinedData.filter((item) => item.status === 'complain' || item.status === 'Dispute')

    if (formState.code) {
      filteredData = filteredData.filter((item) =>
        item.codeOrder.toLocaleLowerCase().includes(formState.code.toLocaleLowerCase())
      )
    }

    // if (formState.user) {
    //   filtered = filtered.filter((item) => item.user.includes(formState.user))
    // }
    // if (formState.status !== 'default') {
    //   filtered = filtered.filter((item) => item.status === formState.status)
    // }
    setFilteredArr(filteredData)
  }
  // useEffect(() => {
  //   if (dataProduct && dataService) {
  //     setFilteredArr(...dataProduct, ...dataService)
  //   }
  // }, [])
  console.log(filteredArr)
  const handleProblem = (id_business, id_order) => {
    setIsModalOpen(true)
    setId_business(id_business)
    setId_order(id_order)
  }
  const handleModal = (id_business, id_order) => {
    setIsOpen(true)
    setId_business(id_business)
    setId_order(id_order)
  }
  return (
    <div className=''>
      <HeaderSell />
      <div className='w-100 d-flex'>
        <SidebarSell />
        <div className='w-100'>
          <div className='border mt-5 mt-xl-0 p-2'>
            <h3 className='mb-3'>Khiếu nại</h3>
            <div className='d-flex flex-column flex-md-row justify-content-center mb-3 align-items-center'>
              <div className='form-group mx-2 mb-3 mb-md-0'>
                <input
                  id='code'
                  type='search'
                  placeholder='Nhập mã đơn hàng'
                  className='form-control search'
                  name='code'
                  value={formState.code}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type='button' className='btn btn-search-store ms-2' onClick={handleSearch}>
                Tìm kiếm
              </button>
              <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                {<ModalComplain onCancel={handleCancel} id_business={id_business} id_order={id_order} />}
              </Modal>
              <Modal className='width-modal' open={isOpen} onCancel={handleCancelModal} footer={null}>
                {<DetailComplain onCancel={handleCancelModal} id_business={id_business} id_order={id_order} />}
              </Modal>
            </div>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr className='custom-header'>
                    <th scope='col'>STT</th>
                    <th scope='col'>Mã đơn hàng</th>
                    {/* <th scope='col'>Ngày đặt</th> */}
                    <th scope='col'>Người mua</th>
                    <th scope='col'>Ngày mua</th>
                    <th scope='col'>Gian hàng</th>
                    <th scope='col'>Số lượng</th>
                    <th scope='col'>Tổng tiền</th>
                    <th scope='col'>Nội dung</th>
                    <th scope='col'>Trạng thái</th>
                    <th scope='col'>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredArr) && filteredArr?.length > 0 ? (
                    currentItems.map((a, i) => (
                      <tr key={i} className='mb-2'>
                        <td>{i + 1}</td>
                        <td>
                          <div
                            style={{ cursor: 'pointer' }}
                            className='service-link'
                            onClick={() => handleModal(a?.id_business?._id, a?._id)}
                          >
                            {a.codeOrder}
                          </div>
                        </td>
                        <td>{a?.id_user?.username}</td>
                        <td>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                        <td className='service-booth'>
                          {a?.detail?.id_boothService?.nameBooth || a?.detail?.id_boothProduct?.nameBooth}
                        </td>
                        <td>{a?.detail?.quantity}</td>
                        <td>{a.total}</td>
                        <td>{a?.contentComplain}</td>
                        {/* <td style={{ backgroundColor: 'orange' }}>{a.status}</td> */}
                        <td
                          className={
                            a?.status === 'Approved'
                              ? 'status-approved'
                              : a?.status === 'Pending'
                                ? 'status-pending'
                                : a?.status === 'Cancel'
                                  ? 'status-cancel'
                                  : a?.status === 'complain'
                                    ? 'status-complain'
                                    : a?.status === 'Dispute'
                                      ? 'status-dispute'
                                      : a?.status === 'Completed'
                                        ? 'status-completed'
                                        : a?.status === 'Finish'
                                          ? 'status-finish'
                                          : ''
                          }
                        >
                          {' '}
                          {a?.status === 'Approved'
                            ? 'Đã duyệt'
                            : a?.status === 'Pending'
                              ? 'Chưa giải quyết'
                              : a?.status === 'Cancel'
                                ? 'Hủy bỏ'
                                : a?.status === 'complain'
                                  ? 'Bị phàn nàn'
                                  : a?.status === 'Dispute'
                                    ? 'Đang tranh chấp'
                                    : a?.status === 'Completed'
                                      ? 'Hoàn thành'
                                      : a?.status === 'Finish'
                                        ? 'Kết thúc'
                                        : ''}
                        </td>
                        <td>
                          {a?.status === 'complain' ? (
                            <button
                              type='button'
                              className='btn btn-primary ms-2'
                              onClick={() => handleProblem(a?.id_business?._id, a?._id)}
                            >
                              Giải quyết
                            </button>
                          ) : (
                            <button type='button' className='btn btn-primary ms-2' disabled>
                              Giải quyết
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='15' className='text-center'>
                        Không tìm thấy đơn hàng phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              onChange={handlePageChange}
              total={filteredArr.length}
              showSizeChanger
              pageSizeOptions={['10', '20', '30']}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreComplain
