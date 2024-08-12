// import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
// import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
// import messenger from '../../../assets/img/messenger.png'
// import remove from '../../../assets/img/remove.png'
// import { useEffect, useState } from 'react'
// import { Pagination } from 'antd'
// import { Link } from 'react-router-dom'
// import { Modal } from 'antd'
// import AddStoreCoupon from './AddStoreCoupon'

// const StoreService = () => {
//   const [filteredArr, setFilteredArr] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [pageSize, setPageSize] = useState(10)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const currentItems = filteredArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page)
//     setPageSize(pageSize)
//   }
//   const [formState, setFormState] = useState({
//     code: '',
//     user: '',
//     status: 'default'
//   })
//   const handleCancel = () => {
//     setIsModalOpen(false)
//   }
//   const handleChange = (e) => {
//     e.preventDefault()
//     const { name, value } = e.target
//     setFormState((prevState) => ({
//       ...prevState,
//       [name]: value
//     }))
//   }
//   const arr = [
//     {
//       code: 'ALLKDNCS',
//       dateTime: '14/05/2024 23:03',
//       date: '1 ngày',
//       user: 'kySon_son',
//       booth: 'Số lượng nhỏ phí Gas SUI, đbkajdsfgkj sadbfkjsdgf  ',
//       items: '0.1 SUI',
//       quantity: 20,
//       price: 4000,
//       coupon: 0,
//       total: 80000,
//       refund: 0,
//       reseller: 0,
//       floor: 2400,
//       status: 'chờ xác nhận'
//     },
//     {
//       code: 'BLLKDNCS',
//       dateTime: '14/05/2024 23:03',
//       date: '1 ngày',
//       user: 'tySon_son',
//       booth: 'Số lượng nhỏ phí Gas SUI, đb',
//       items: '0.1 SUI',
//       quantity: 20,
//       price: 4000,
//       coupon: 0,
//       total: 80000,
//       refund: 0,
//       reseller: 0,
//       floor: 2400,
//       status: 'chờ xác nhận'
//     }
//   ]
//   const handleSearch = () => {
//     let filtered = arr

//     if (formState.code) {
//       filtered = filtered.filter((item) => item.code.includes(formState.code))
//     }

//     if (formState.user) {
//       filtered = filtered.filter((item) => item.user.includes(formState.user))
//     }
//     if (formState.status !== 'default') {
//       filtered = filtered.filter((item) => item.status === formState.status)
//     }
//     setFilteredArr(filtered)
//   }
//   useEffect(() => {
//     setFilteredArr(arr)
//     console.log(123)
//   }, [])
//   return (
//     <div className='d-flex'>
//       <SidebarSell />
//       <div className='w-100'>
//         <HeaderSell />
//         <div className='border mt-5 p-2'>
//           <div className='d-flex justify-content-between align-items-center'>
//             <h1 className='mb-3'>Mã giảm giá</h1>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               type='button'
//               className='btn btn-primary btn-primary-bg my-2 me-3'
//             >
//               Tạo mới
//             </button>
//             <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
//               {<AddStoreCoupon onCancel={handleCancel} />}
//             </Modal>
//           </div>
//           {/* <div className='d-flex flex-column flex-md-row justify-content-center mb-3 align-items-center'>
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
//           </div> */}
//           <div className='table-responsive'>
//             <table className='table'>
//               <thead>
//                 <tr className='custom-header'>
//                   <th scope='col'>STT</th>
//                   <th scope='col'>Mã giảm giá</th>
//                   {/* <th scope='col'>Ngày bán</th>
//                   <th scope='col'>Thời gian</th>
//                   <th scope='col'>Người mua</th> */}
//                   <th scope='col'>Gian hàng</th>
//                   <th scope='col'>Bắt đầu</th>
//                   <th scope='col'>Kết thúc</th>
//                   <th scope='col'>Tỷ lệ giảm</th>
//                   <th scope='col'>Giảm tối đa</th>
//                   <th scope='col'>Lượt sử dụng</th>
//                   {/* <th scope='col'>Mặt hàng</th>
//                   <th scope='col'>Số lượng</th>
//                   <th scope='col'>Giá</th>
//                   <th scope='col'>Đã giảm</th>
//                   <th scope='col'>Tổng tiền</th>
//                   <th scope='col'>Hoàn tiền</th>
//                   <th scope='col'>Reseller</th>
//                   <th scope='col'>Sàn</th> */}
//                   <th scope='col'>Trạng thái</th>
//                   <th scope='col'>Thao tác</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* <tr>
//                   <td className='d-flex gap-3'>
//                     <img style={{ width: '50%', height: 'auto' }} src={messenger} alt='' />
//                     <img style={{ width: '50%', height: 'auto' }} src={remove} alt='' />
//                   </td>
//                   <td>dskjlhskfsadlkdsf</td>
//                   <td>14/05/2024 14:51</td>
//                   <td>1 ngày</td>
//                   <td>dapda123</td>
//                   <td>Số lượng nhỏ phí gas, ETH, TON</td>
//                   <td>0.1 SUI</td>
//                   <td>20</td>
//                   <td>2000</td>
//                   <td>-</td>
//                   <td>40000</td>
//                   <td>-</td>
//                   <td>0</td>
//                   <td>2400</td>
//                   <td style={{ backgroundColor: 'orange' }}>Chờ xác nhận</td>
//                 </tr> */}
//                 {Array.isArray(filteredArr) && filteredArr?.length > 0 ? (
//                   currentItems.map((a, i) => (
//                     <tr key={i} className='mb-2'>
//                       {/* <div key={i}> */}
//                       <td>{i + 1}</td>
//                       <td>
//                         <Link className='service-link' to='/store/service/detail'>
//                           {a.code}
//                         </Link>
//                       </td>
//                       <td>{a.dateTime}</td>
//                       <td>{a.date}</td>
//                       <td>{a.user}</td>
//                       <td className='service-booth'>{a.booth}</td>
//                       <td>{a.items}</td>
//                       <td>{a.quantity}</td>
//                       {/* <td>{a.price}</td>
//                       <td>{a.coupon}</td>
//                       <td>{a.total}</td>
//                       <td>{a.refund}</td>
//                       <td>{a.reseller}</td>
//                       <td>{a.floor}</td> */}
//                       <td style={{ backgroundColor: 'orange' }}>{a.status}</td>
//                       <td className='d-flex gap-3'>
//                         <img style={{ width: '40%', height: 'auto' }} src={messenger} alt='' />
//                         <img style={{ width: '40%', height: 'auto' }} src={remove} alt='' />
//                       </td>
//                       {/* </div> */}
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

// export default StoreService
import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import messenger from '../../../assets/img/chat.svg'
import remove from '../../../assets/img/remove.png'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Pagination, Modal, Button, notification } from 'antd'
import { Link } from 'react-router-dom'
// import { Modal } from 'antd'
import AddStoreCoupon from './AddStoreCoupon'
import './StoreCoupon.css'
import axios from 'axios'
import moment from 'moment'

const StoreCoupon = () => {
  const [filteredArr, setFilteredArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentItems = filteredArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const accessToken = localStorage.getItem('token')

  const [activeButton, setActiveButton] = useState('Active')

  const handleClick = (button) => {
    setActiveButton(button)
  }

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  const id = useSelector((state) => state.auth._id)
  const [_id, setSelectedCouponId] = useState(null)
  // const id = '66441eb701be4d530febb87d'

  const [formState, setFormState] = useState({
    code: '',
    user: '',
    status: 'default'
  })
  const showModal = (couponId) => {
    setIsModalVisible(true)
    setSelectedCouponId(couponId)
  }
  const handleCancelCoupon = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
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
    let filtered = arr

    if (formState.code) {
      filtered = filtered.filter((item) => item.code.includes(formState.code))
    }

    if (formState.user) {
      filtered = filtered.filter((item) => item.user.includes(formState.user))
    }
    if (formState.status !== 'default') {
      filtered = filtered.filter((item) => item.status === formState.status)
    }
    setFilteredArr(filtered)
  }

  const handleClickExpired = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_COMPLETED}${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )

      setFilteredArr(res.data.data)
      console.log(res.data.data)
    } catch {
      setFilteredArr('')
    }
  }

  const handleClickActive = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ACTIVE}${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      setFilteredArr(res.data.data)
      console.log(res.data.data)
    } catch {
      setFilteredArr('')
    }
  }

  const handleClickUpcoming = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_UPCOMMING}${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      setFilteredArr(res.data.data)
      console.log(res.data.data)
    } catch {
      setFilteredArr('')
    }
  }

  // const handleClickDelete = async () => {
  //   console.log(filteredArr)
  //   console.log(_id)
  //   await axios.delete(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DELETE}${_id}}`)
  // }
  const handleClickDelete = async (e) => {
    e.preventDefault()
    console.log(_id)
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DELETE_COUPON}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          },
          data: { _id } // Ensure this data is in the correct place
        }
      )
      console.log(response)
      notification.success({
        message: 'Xóa coupon thành công.',
        duration: 2
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Xóa coupon thất bại.',
        duration: 2
      })
    }
  }

  useEffect(() => {
    handleClickActive()
  }, [])
  return (
    <div className=''>
      <HeaderSell />
      <div className='w-100 d-flex'>
        <SidebarSell />
        <div className='w-100'>
          <div className='border mt-5 mt-xl-0 p-2 w-100'>
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className='mb-3'>Mã giảm giá</h3>

              <button onClick={() => setIsModalOpen(true)} type='button' className='btn btn-success my-2 me-3'>
                + Thêm
              </button>

              <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                {<AddStoreCoupon onCancel={handleCancel} />}
              </Modal>
            </div>
            <div className='list-sale'>
              <button
                className={`button ${activeButton === 'Expired' ? 'focus' : ''}`}
                onClick={() => {
                  handleClick('Expired')
                  handleClickExpired()
                }}
              >
                Hết hạn
              </button>
              <button
                className={`button ${activeButton === 'Active' ? 'focus' : ''}`}
                onClick={() => {
                  handleClick('Active')
                  handleClickActive()
                }}
              >
                Đang hoạt động
              </button>
              <button
                className={`button ${activeButton === 'Upcoming' ? 'focus' : ''}`}
                onClick={() => {
                  handleClick('Upcoming')
                  handleClickUpcoming()
                }}
              >
                Sắp ra mắt
              </button>
            </div>

            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr className='custom-header'>
                    <th scope='col'>STT</th>
                    <th scope='col'>Mã giảm giá</th>

                    <th scope='col'>Gian hàng</th>
                    <th scope='col'>Bắt đầu</th>
                    <th scope='col'>Kết thúc</th>
                    <th scope='col'>Tỷ lệ giảm (%)</th>
                    <th scope='col'>Lượt sử dụng</th>
                    <th scope='col'>Đã sử dụng</th>
                    <th scope='col'>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredArr) && filteredArr?.length > 0 ? (
                    currentItems.map((a, i) => (
                      <tr key={i} className='mb-2'>
                        <td>{i + 1}</td>
                        <td>
                          <Link className='service-link' to='/store/service/detail'>
                            {a.code}
                          </Link>
                        </td>
                        <td>{a?.id_boothProduct?.nameBooth || a?.id_boothService?.nameBooth} </td>
                        <td>{moment(a.startDate).format('DD-MM-YYYY HH:mm')}</td>
                        <td>{moment(a.endDate).format('DD-MM-YYYY HH:mm')}</td>
                        <td>{a.percent}</td>

                        <td>{a.numberPromo}</td>
                        <td>{a.soldQuantity}</td>

                        <td className='d-flex gap-3'>
                          <img
                            style={{ maxWidth: '20px', maxHeight: '20px', cursor: 'pointer' }}
                            src={messenger}
                            alt=''
                          />
                          <img
                            style={{ maxWidth: '20px', maxHeight: '20px', cursor: 'pointer' }}
                            src={remove}
                            alt=''
                            onClick={() => {
                              showModal(a._id)
                            }}
                          />
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
      <Modal
        title='Xóa coupon này'
        open={isModalVisible}
        onOk={handleClickDelete}
        onCancel={handleCancelCoupon}
        okText='Đồng ý'
        cancelText='Thoát'
      >
        <p>Bạn có đồng ý xóa mã coupon này không</p>
      </Modal>
    </div>
  )
}

export default StoreCoupon
