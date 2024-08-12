// import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
// import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
// import messenger from '../../../assets/img/messenger.png'
// import remove from '../../../assets/img/remove.png'
// import { useEffect, useState } from 'react'
// import { Pagination } from 'antd'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { useSelector } from 'react-redux'
// import { useQuery } from 'react-query'

// const fetchStoreProduct = async (id) => {
//   const { data } = await axios.get(
//     `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_AGENT}${id}`
//   )
//   return data.data
// }
// const StoreProduct = () => {
//   const id = useSelector((state) => state.auth._id)
//   const [filteredArr, setFilteredArr] = useState([])
//   // const [data, setData] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [pageSize, setPageSize] = useState(10)
//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page)
//     setPageSize(pageSize)
//   }
//   const [formState, setFormState] = useState({
//     code: '',
//     user: '',
//     status: 'default'
//   })
//   const { data, isLoading, error } = useQuery(['storeProduct', id], () => fetchStoreProduct(id), {
//     onSuccess: (data) => {
//       setFilteredArr(data)
//     }
//   })
//   console.log(data)
//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>An error occurred: {error.message}</div>
//   const handleChange = (e) => {
//     e.preventDefault()
//     const { name, value } = e.target
//     setFormState((prevState) => ({
//       ...prevState,
//       [name]: value
//     }))
//   }

//   const handleSearch = () => {
//     let filtered = data

//     if (formState.code) {
//       filtered = filtered.filter((item) => item.codeOrder.includes(formState.code))
//     }

//     if (formState.user) {
//       filtered = filtered.filter((item) => item?.id_user?.username.includes(formState.user))
//     }
//     if (formState.status !== 'default') {
//       filtered = filtered.filter((item) => item.status === formState.status)
//     }
//     setFilteredArr(filtered)
//   }
//   // useEffect(() => {
//   //   axios
//   //     .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_AGENT}${id}`)
//   //     .then((response) => {
//   //       console.log('response', response)
//   //       if (response && response.data) {
//   //         setData(response?.data?.data)
//   //         setFilteredArr(response?.data?.data)
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.log(err)
//   //     })
//   // }, [])
//   const currentItems = filteredArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)

//   console.log(data)
//   return (
//     <div className='d-flex'>
//       <SidebarSell />
//       <div className='w-100'>
//         <HeaderSell />
//         <div className='border mt-5 p-2'>
//           <h1 className='mb-3'>Sản phẩm đã bán</h1>
//           <div className='d-flex flex-column flex-md-row justify-content-center mb-3 align-items-center'>
//             <div className='form-group mx-2 mb-3 mb-md-0'>
//               <input
//                 id='code'
//                 type='search'
//                 placeholder='Nhập mã đơn hàng'
//                 className='form-control search'
//                 name='code'
//                 value={formState.code}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className='form-group mx-2 mb-3 mb-md-0'>
//               <input
//                 id='user'
//                 type='search'
//                 placeholder='Nhập tên người mua'
//                 className='form-control search'
//                 name='user'
//                 value={formState.user}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className='form-group mx-2 mb-3 mb-md-0'>
//               <select
//                 name='status'
//                 id='status'
//                 className='form-control search'
//                 value={formState.status}
//                 onChange={handleChange}
//               >
//                 <option value='default'>-- Tùy chọn tìm kiếm --</option>
//                 <option value='chờ xác nhận'>Đang đợi chấp nhận</option>
//                 <option value='Đang đợi thực hiện'>Đang đợi thực hiện</option>
//                 <option value='Tạm giữ tiền'>Tạm giữ tiền</option>
//                 <option value='Hoàn thành'>Hoàn thành</option>
//                 <option value='Hủy'>Hủy</option>
//                 <option value='Thất bại'>Thất bại</option>
//               </select>
//             </div>
//             <button type='button' className='btn btn-primary ms-2' onClick={handleSearch}>
//               Tìm kiếm
//             </button>
//           </div>
//           <div className='table-responsive'>
//             <table className='table'>
//               <thead>
//                 <tr className='custom-header'>
//                   <th scope='col'>Mã đơn hàng</th>
//                   <th scope='col'>Ngày bán</th>
//                   {/* <th scope='col'>Thời gian</th> */}
//                   <th scope='col'>Người mua</th>
//                   <th scope='col'>Gian hàng</th>
//                   <th scope='col'>Mặt hàng</th>
//                   <th scope='col'>Số lượng</th>
//                   <th scope='col'>Giá</th>
//                   <th scope='col'>Đã giảm (%)</th>
//                   <th scope='col'>Tổng tiền</th>
//                   {/* <th scope='col'>Hoàn tiền</th> */}
//                   <th scope='col'>Reseller</th>
//                   <th scope='col'>Trạng thái</th>
//                   <th scope='col'>Thao tác</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.isArray(filteredArr) && filteredArr?.length > 0 ? (
//                   currentItems.map((a, i) => (
//                     <tr key={i} className='mb-2'>
//                       {/* <div key={i}> */}

//                       <td>
//                         <Link
//                           className='service-link'
//                           to={
//                             a?.status === 'Pending'
//                               ? `/store/${a?.id_business?._id}/detail/${a?._id}`
//                               : a?.status === 'Approved'
//                                 ? `/store/${a?.id_business?._id}/confirm/${a?._id}`
//                                 : a?.status === 'Cancel'
//                                   ? `/store/${a?.id_business?._id}/cancel/${a?._id}`
//                                   : a?.status === 'Completed'
//                                     ? `/store/${a?.id_business?._id}/transaction/${a?._id}`
//                                     : a?.status === 'Finish'
//                                       ? `/store/${a?.id_business?._id}/transaction/${a?._id}`
//                                       : null
//                           }
//                         >
//                           {a?.codeOrder}
//                         </Link>
//                       </td>
//                       <td>{a.dateTime}</td>
//                       {/* <td>{a.date}</td> */}
//                       <td>{a?.id_user?.username}</td>
//                       <td className='service-booth'>{a?.detail?.id_boothProduct?.nameBooth}</td>
//                       <td>{a?.detail?.id_detailBooth?.name}</td>
//                       <td>{a?.detail?.quantity}</td>
//                       <td>{a?.detail?.id_detailBooth?.price}</td>
//                       <td>{a.codeCoupon?.percent || 0}</td>
//                       <td>{a.total}</td>
//                       {/* <td>{a.totalRefund}</td> */}
//                       <td>{a.reseller}</td>
//                       <td style={{ backgroundColor: 'orange' }}>{a.status}</td>
//                       <td className='d-flex gap-3'>
//                         <img style={{ maxWidth: '20px' }} src={messenger} alt='' />
//                         <img style={{ maxWidth: '20px' }} src={remove} alt='' />
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan='15' className='text-center'>
//                       Không tìm thấy đơn hàng phù hợp
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <Pagination
//             current={currentPage}
//             pageSize={pageSize}
//             onChange={handlePageChange}
//             total={filteredArr.length}
//             showSizeChanger
//             pageSizeOptions={['10', '20', '30']}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StoreProduct

import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import messenger from '../../../assets/img/chat.svg'
import remove from '../../../assets/img/remove.png'
import { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import moment from 'moment'

const fetchStoreProduct = async (id) => {
  const accessToken = localStorage.getItem('token')
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ORDER_PRODUCT_AGENT}${id}`,
    {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        token: `Bearer ${accessToken}`
      }
    }
  )
  return data.data
}
const StoreProduct = () => {
  const id = useSelector((state) => state.auth._id)
  const Navigate = useNavigate()
  const [filteredArr, setFilteredArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [formState, setFormState] = useState({
    code: '',
    user: '',
    status: 'default'
  })

  const { data, isLoading, error } = useQuery(['storeProduct', id], () => fetchStoreProduct(id), {
    onSuccess: (data) => {
      // setFilteredArr(data)
      setFilteredArr([...data].reverse())
    }
  })

  useEffect(() => {
    if (data) {
      // setFilteredArr(data)
      setFilteredArr([...data].reverse())
    }
  }, [data])

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSearch = () => {
    let filtered = data

    if (formState.code) {
      filtered = filtered.filter((item) =>
        item.codeOrder.toLocaleLowerCase().includes(formState.code.toLocaleLowerCase())
      )
    }

    if (formState.user) {
      filtered = filtered.filter((item) =>
        item?.id_user?.username.toLocaleLowerCase().includes(formState.user.toLocaleLowerCase())
      )
    }

    if (formState.status !== 'default') {
      filtered = filtered.filter((item) => item.status === formState.status)
    }

    setFilteredArr(filtered)
  }

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>An error occurred: {error.message}</div>

  const currentItems = filteredArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const CreateRoom = async (id) => {
    const firstId = localStorage.getItem('_id')

    const secondId = id
    console.log('secondId', secondId)
    const Room = await axios.post(
      `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CREATE_ROOM}`,
      {
        members: [firstId, secondId]
      }
    )
    if (Room) {
      console.log(Room)
      Navigate('/message')
    }
  }
  console.log('da', data)
  return (
    <div className=''>
      <HeaderSell />
      <div className='w-100 d-flex'>
        <SidebarSell />
        <div className='w-100'>
          <div className='border mt-5 mt-xl-0 p-2 w-100'>
            <h3 className='mb-3'>Đơn hàng sản phẩm</h3>
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
              <div className='form-group mx-2 mb-3 mb-md-0'>
                <input
                  id='user'
                  type='search'
                  placeholder='Nhập tên người mua'
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
                  <option value='Approved'>Đã duyệt</option>
                  <option value='Cancel'>Hủy bỏ</option>
                  <option value='complain'>Bị phàn nàn</option>
                  <option value='Dispute'>Đang tranh chấp</option>
                  <option value='Completed'>Hoàn thành</option>
                  <option value='Finish'>Kết thúc</option>
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
                    <th scope='col'>Mã đơn hàng</th>
                    <th scope='col'>Ngày bán</th>
                    <th scope='col'>Người mua</th>
                    <th scope='col'>Gian hàng</th>
                    <th scope='col'>Mặt hàng</th>
                    <th scope='col'>Số lượng</th>
                    <th scope='col'>Giá</th>
                    <th scope='col'>Đã giảm (%)</th>
                    <th scope='col'>Tổng tiền</th>
                    {/* <th scope='col'>Reseller</th> */}
                    <th scope='col'>Trạng thái</th>
                    <th scope='col'>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredArr) && filteredArr.length > 0 ? (
                    currentItems.map((a, i) => (
                      <tr key={i} className='mb-2'>
                        <td>
                          <Link
                            className='service-link'
                            to={
                              a?.status === 'Pending'
                                ? `/store/${a?.id_business?._id}/detail/${a?._id}`
                                : a?.status === 'Approved'
                                  ? `/store/${a?.id_business?._id}/confirm/${a?._id}`
                                  : a?.status === 'Cancel'
                                    ? `/store/${a?.id_business?._id}/cancel/${a?._id}`
                                    : a?.status === 'Completed'
                                      ? `/store/${a?.id_business?._id}/transaction/${a?._id}`
                                      : a?.status === 'Finish'
                                        ? `/store/${a?.id_business?._id}/transaction/${a?._id}`
                                        : a?.status === 'Dispute' || a?.status === 'complain'
                                          ? `/store/complain`
                                          : null
                            }
                          >
                            {a?.codeOrder}
                          </Link>
                        </td>
                        <td>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                        <td>{a?.id_user?.username}</td>
                        <td className='service-booth'>{a?.detail?.id_boothProduct?.nameBooth}</td>
                        <td>{a?.detail?.id_detailBooth?.name}</td>
                        <td>{a?.detail?.quantity}</td>
                        <td>{a?.detail?.id_detailBooth?.price}</td>
                        <td>{a.codeCoupon?.percent || 0}</td>
                        <td>{a.total}</td>
                        {/* <td>{a.reseller}</td> */}
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
                        <td className='d-flex gap-3 flex-wrap'>
                          <img
                            style={{ maxWidth: '20px', maxHeight: '20px', cursor: 'pointer' }}
                            src={messenger}
                            onClick={() => CreateRoom(a?.id_user?._id)}
                            alt=''
                          />
                          {/* <img style={{ maxWidth: '20px', maxHeight: '20px', cursor: 'pointer' }} src={remove} alt='' /> */}
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

export default StoreProduct
