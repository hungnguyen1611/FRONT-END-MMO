import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { Link } from 'react-router-dom'
import messenger from '~/assets/img/messenger.png'
import chat from '~/assets/img/chat.svg'
import remove from '~/assets/img/remove.png'
import dispute from '~/assets/img/dispute.jpg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Modal } from 'antd'
import DetailOrder from './DetailOrder'
import './PurchasedOrder.css'
import ModalDispute from './ModalDispute'
import moment from 'moment'
import FooterHome from '../Home/FooterHome'

const PurchasedOrder = () => {
  const id = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')
  const [filteredArr, setFilteredArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [count, setCount] = useState(0)
  const [api, setApi] = useState(import.meta.env.VITE_API_URL_API_PRODUCT_BY_USER)
  const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  // const accessToken = user.token
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
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [codeOrder, setCodeOrder] = useState(null)
  const handleCancel = () => {
    setOpen(false)
  }
  const handleCancelModal = () => {
    setOpenModal(false)
  }
  const handleOpen = async () => {
    console.log('123')
    setOpen(true)
  }
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSearch = () => {
    let filtered = data

    if (formState.code) {
      filtered = filtered.filter((item) => item?.codeOrder?.toLowerCase().includes(formState.code?.toLocaleLowerCase()))
    }

    if (formState.user) {
      filtered = filtered.filter(
        (item) =>
          item?.detail?.id_boothProduct?.id_user?.username?.toLowerCase().includes(formState.user?.toLowerCase()) ||
          item?.detail?.id_boothService?.id_user?.username?.toLowerCase().includes(formState.user?.toLowerCase())
      )
    }
    if (formState.status !== 'default') {
      filtered = filtered.filter((item) => item.status === formState.status)
    }
    setFilteredArr(filtered)
  }
  const handleProduct = () => {
    setCount(0)
    setCurrentPage(1)
    setApi(import.meta.env.VITE_API_URL_API_PRODUCT_BY_USER)
  }
  const handleService = () => {
    setCount(1)
    setCurrentPage(1)
    setApi(import.meta.env.VITE_API_URL_API_SERVICE_BY_USER)
  }
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${api}${id}`, {
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setData(response?.data?.data)
          setFilteredArr(response?.data?.data.reverse())
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [api, open, openModal])
  const handleCode = (id_business, id_order) => {
    setOpen(true)
    setSelectedBusiness(id_business)
    setSelectedOrder(id_order)
  }
  const handleModal = (i, id_business, id_order) => {
    setOpenModal(true)
    setCodeOrder(i)
    setSelectedBusiness(id_business)
    setSelectedOrder(id_order)
  }
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Header />
      <div className='mt-5'>
        <div className='wrapper-purchased'>
          <div className='text-center mb-5'>
            <h2>ĐƠN HÀNG ĐÃ MUA</h2>
          </div>
          <div style={{ backgroundColor: '#fff' }} className='border mt-5 p-2'>
            <div className='d-flex flex-column flex-md-row justify-content-center mb-3 align-items-center mt-4'>
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
              <div className='form-group mx-2 mb-3 mb-md-0'>
                <input
                  id='user'
                  type='search'
                  placeholder='Nhập tên người bán'
                  className='form-control search'
                  name='user'
                  value={formState.user}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group mx-2 mb-3 mb-md-0'>
                <select
                  name='status'
                  id='status'
                  className='form-control search select-color'
                  value={formState.status}
                  onChange={handleChange}
                >
                  {/* <option value='default'>-- Tùy chọn tìm kiếm --</option>
                  <option value='chờ xác nhận'>Đang đợi chấp nhận</option>
                  <option value='Đang đợi thực hiện'>Đang đợi thực hiện</option>
                  <option value='Tạm giữ tiền'>Tạm giữ tiền</option>
                  <option value='Hoàn thành'>Hoàn thành</option>
                  <option value='Hủy'>Hủy</option>
                  <option value='Thất bại'>Thất bại</option> */}
                  <option value='default'>-- Tùy chọn tìm kiếm --</option>
                  <option value='Pending'>Chưa giải quyết</option>
                  <option value='Approved'>Đã duyệt</option>
                  <option value='Cancel'>Hủy bỏ</option>
                  <option value='complain'>Phàn nàn</option>
                  <option value='Dispute'>Đang tranh chấp</option>
                  <option value='Completed'>Hoàn thành</option>
                  <option value='Finish'>Kết thúc</option>
                </select>
              </div>
              <button type='button' className='btn btn-primary ms-2 px-4 search-order' onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
            <div className='d-md-flex d-none'>
              <button
                onClick={handleProduct}
                type='button'
                // className=`${count === 0 ? 'btn-primary-bg' : ''}${btn btn-primary my-3}`
                className={`${count === 0 ? 'btn-primary-bg-order' : 'bg-orange-order'} btn btn-primary my-3 me-3 px-5`}
              >
                Đơn hàng sản phẩm
              </button>
              <button
                onClick={handleService}
                type='button'
                // className='btn btn-primary btn-primary-blue my-3 ms-3'
                className={`${count !== 0 ? 'btn-primary-bg-order' : 'bg-orange-order'} btn btn-primary my-3 px-5`}
              >
                Đơn hàng dịch vụ
              </button>
            </div>
            <div className='d-flex d-md-none'>
              <button
                onClick={handleProduct}
                type='button'
                // className=`${count === 0 ? 'btn-primary-bg' : ''}${btn btn-primary my-3}`
                className={`${count === 0 ? 'btn-primary-bg-order' : 'btn-primary bg-orange'} btn btn-primary my-3 me-3`}
              >
                Sản phẩm
              </button>
              <button
                onClick={handleService}
                type='button'
                // className='btn btn-primary btn-primary-blue my-3 ms-3'
                className={`${count !== 0 ? 'btn-primary-bg-order' : 'btn-primary bg-orange'} btn btn-primary my-3`}
              >
                Dịch vụ
              </button>
            </div>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr className='custom-header custom-header-order'>
                    <th scope='col'>Mã đơn hàng</th>
                    {/* <th scope='col'>Ngày mua</th> */}
                    <th scope='col'>Gian hàng</th>
                    <th scope='col'>Mặt hàng</th>
                    <th scope='col'>Người bán</th>
                    <th scope='col'>Số lượng</th>
                    <th scope='col'>Đơn Giá</th>
                    <th scope='col'>Giảm(%)</th>
                    <th scope='col'>Tổng tiền</th>
                    {/* <th scope='col'>Hoàn tiền</th> */}
                    <th scope='col'>Trạng thái</th>
                    <th scope='col'>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredArr) && filteredArr?.length > 0 ? (
                    currentItems.map((a, i) => (
                      <tr key={i} className='mb-2 body-custom-order'>
                        {/* <div key={i}> */}

                        <td>
                          <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleCode(a?.id_business?._id, a?._id)}
                            className='service-link'
                          >
                            {a?.codeOrder}
                          </div>
                        </td>
                        {/* <td>{a?.detail?.id_boothProduct?.updatedAt}</td> */}
                        {/* <td>{moment(a?.detail?.id_boothProduct?.updatedAt).format('DD-MM-YYYY HH:mm')}</td> */}
                        <td className='service-booth'>
                          {a?.detail?.id_boothProduct?.nameBooth || a?.detail?.id_boothService?.nameBooth}
                        </td>
                        <td>{a?.detail?.id_detailBooth?.name}</td>
                        <td>
                          {a?.detail?.id_boothProduct?.id_user?.username ||
                            a?.detail?.id_boothService?.id_user?.username}
                        </td>
                        <td>{a?.detail?.quantity}</td>
                        <td>{a?.detail?.id_detailBooth?.price.toLocaleString()}</td>
                        <td>{a?.codeCoupon?.percent || 0}</td>
                        <td>{a.total.toLocaleString()}</td>
                        {/* <td>{a.resell}</td> */}
                        <td>
                          {/* <span style={{ color: '#F17022' }}>{a.status}</span> */}
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
                        </td>
                        <td className='d-flex'>
                          <img className='btn-order' src={chat} alt='me' />
                          {/* <img className='btn-order mx-2' src={remove} alt='me' /> */}
                          {a?.status === 'Completed' && (
                            <img
                              onClick={() => handleModal(a?.codeOrder, a?.id_business?._id, a?._id)}
                              className='btn-order ms-2'
                              src={dispute}
                              alt='me'
                            />
                          )}
                        </td>
                        {/* </div> */}
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
        <Modal className='width-modal' open={open} onCancel={handleCancel} footer={null}>
          <DetailOrder id_business={selectedBusiness} id_order={selectedOrder} />
        </Modal>
        <Modal className='width-modal' open={openModal} onCancel={handleCancelModal} footer={null}>
          <ModalDispute
            id_business={selectedBusiness}
            id_order={selectedOrder}
            codeOrder={codeOrder}
            onCancel={handleCancelModal}
          />
        </Modal>
      </div>
      <FooterHome />
    </div>
  )
}

export default PurchasedOrder
