import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
// import messenger from '../../../assets/img/messenger.png'
import messenger from '../../../assets/img/chat.svg'
import { useEffect, useState } from 'react'
import { Modal, Pagination } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import edit from '../../../assets/img/edit.png'
import ModalReseller from './ModalReseller'
import moment from 'moment'
import { useQuery } from 'react-query'

const fetchStoreReseller = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_RESELLER_AGENT}${id}`
  )
  return data.data
}
const StoreReseller = () => {
  const id = useSelector((state) => state.auth._id)
  const [open, setOpen] = useState(false)
  const [arr, setArr] = useState([])
  const [idResell, setIdResell] = useState(null)
  const [idBooth, setIdBooth] = useState(null)
  const [filteredArr, setFilteredArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const accessToken = localStorage.getItem('token')
  const [pageSize, setPageSize] = useState(10)
  const [formState, setFormState] = useState({
    code: '',
    user: '',
    status: 'default'
  })
  // const { data, isLoading, error } = useQuery(['storeReseller', id], () => fetchStoreReseller(id), {
  //   onSuccess: (data) => {
  //     setFilteredArr(data)
  //   }
  // })
  // console.log('arr', data.data)
  // useEffect(() => {
  //   if (data) {
  //     setFilteredArr(data.data)
  //   }
  // }, [data])
  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error.message}</div>

  const currentItems = filteredArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  // const currentItems = [...filteredArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)].reverse()

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleClose = () => setOpen(false)
  const showModal = (item) => {
    setOpen(true)
  }
  const handleSearch = () => {
    let filtered = arr

    if (formState.code) {
      filtered = filtered.filter((item) => item.code.toLocaleLowerCase().includes(formState.code.toLocaleLowerCase()))
    }

    if (formState.user) {
      filtered = filtered.filter(
        (item) =>
          item?.id_boothProduct?.nameBooth.toLocaleLowerCase().includes(formState.user.toLocaleLowerCase()) ||
          item?.id_boothService?.nameBooth.toLocaleLowerCase().includes(formState.user.toLocaleLowerCase())
      )
    }
    if (formState.status !== 'default') {
      filtered = filtered.filter((item) => item.statusReseller === formState.status)
    }
    setFilteredArr(filtered)
  }
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_RESELLER_AGENT}${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)
        if (response && response.data && response.data.data) {
          setArr(response.data.data)
          setFilteredArr(response.data.data)
          setFilteredArr(response.data.data.reverse())
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [open])
  const handleClick = (id, id_booth) => {
    setOpen(true)
    setIdBooth(id_booth)
    setIdResell(id)
  }
  console.log(arr)
  return (
    <div className=''>
      <HeaderSell />
      <div className='w-100 d-flex'>
        <SidebarSell />
        <div className='w-100'>
          <div className='border mt-5 mt-xl-0 p-2 w-100'>
            <h3 className='mb-3'>Quản lý reseller</h3>
            <div className='d-flex flex-column flex-md-row justify-content-center mb-3 align-items-center'>
              {/* <div className='form-group mx-2 mb-3 mb-md-0'>
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
            </div> */}
              <div className='form-group mx-2 mb-3 mb-md-0'>
                <input
                  id='user'
                  type='search'
                  placeholder='Nhập tên gian hàng'
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
                  className='form-control search'
                  value={formState.status}
                  onChange={handleChange}
                >
                  <option value='default'>-- Tùy chọn tìm kiếm --</option>
                  <option value='Pending'>Chưa giải quyết</option>
                  <option value='approved'>Đã duyệt</option>
                  <option value='cancel'>Hủy bỏ</option>
                  <option value='complain'>Bị phàn nàn</option>
                  <option value='dispute'>Đang tranh chấp</option>
                  <option value='completed'>Hoàn thành</option>
                  <option value='finish'>Kết thúc</option>
                </select>
              </div>
              <button type='button' className='btn btn-search-store ms-2' onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr className='custom-header'>
                    <th scope='col'>STT</th>
                    <th scope='col'>Tên gian hàng</th>
                    <th scope='col'>Tên Reseller</th>
                    {/* <th scope='col'>Gian hàng</th> */}
                    <th scope='col'>Chiết khấu(%)</th>
                    <th scope='col'>Ngày yêu cầu</th>
                    <th scope='col'>Lời giới thiệu</th>
                    <th scope='col'>Trạng thái</th>
                    <th scope='col'>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredArr) && filteredArr?.length > 0 ? (
                    currentItems.map((a, i) => (
                      <tr key={i} className='mb-2'>
                        <td>{i + 1}</td>
                        <td>{a?.id_boothService?.nameBooth || a?.id_boothProduct?.nameBooth}</td>
                        <td>{a?.id_user_reseller?.username}</td>
                        <td>{a?.percent}</td>
                        <td>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                        {/* <td className='service-booth'>{a?.createdAt}</td> */}
                        <td>{a?.message}</td>
                        {/* <td style={{ backgroundColor: 'orange' }}>{a?.statusReseller}</td> */}
                        <td
                          className={
                            a?.statusReseller === 'approved'
                              ? 'status-approved'
                              : a?.statusReseller === 'Pending'
                                ? 'status-pending'
                                : a?.statusReseller === 'cancel'
                                  ? 'status-cancel'
                                  : a?.statusReseller === 'complain'
                                    ? 'status-complain'
                                    : a?.statusReseller === 'dispute'
                                      ? 'status-dispute'
                                      : a?.statusReseller === 'completed'
                                        ? 'status-completed'
                                        : a?.statusReseller === 'finish'
                                          ? 'status-finish'
                                          : ''
                          }
                        >
                          {' '}
                          {a?.statusReseller === 'approved'
                            ? 'Đã duyệt'
                            : a?.statusReseller === 'Pending'
                              ? 'Chưa giải quyết'
                              : a?.statusReseller === 'cancel'
                                ? 'Hủy bỏ'
                                : a?.statusReseller === 'complain'
                                  ? 'Bị phàn nàn'
                                  : a?.statusReseller === 'dispute'
                                    ? 'Đang tranh chấp'
                                    : a?.statusReseller === 'completed'
                                      ? 'Hoàn thành'
                                      : a?.statusReseller === 'finish'
                                        ? 'Kết thúc'
                                        : ''}
                        </td>
                        <td className='d-flex gap-3'>
                          <img style={{ maxWidth: '20px', maxHeight: '20px' }} src={messenger} alt='' />
                          {a?.statusReseller === 'cancel' || a?.statusReseller === 'approved' ? (
                            <></>
                          ) : (
                            <img
                              onClick={() =>
                                handleClick(
                                  a?._id,
                                  a?.id_boothProduct ? a?.id_boothProduct._id : a?.id_boothService._id
                                )
                              }
                              style={{ maxWidth: '20px', maxHeight: '20px', cursor: 'pointer' }}
                              src={edit}
                              alt=''
                            />
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
        <Modal className='width-modal' open={open} onCancel={handleClose} footer={null}>
          <ModalReseller id={idResell} id_booth={idBooth} handleClose={handleClose} />
        </Modal>
      </div>
    </div>
  )
}

export default StoreReseller
