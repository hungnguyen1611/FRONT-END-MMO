// import { DatePicker, Space } from 'antd'
// const { RangePicker } = DatePicker

// const AddStoreCoupon = ({ onCancel }) => {
//   const onSubmit = () => {}
//   return (
//     <div className='d-flex flex-column'>
//       <form onSubmit={onSubmit} className='form' id='form-1'>
//         <h3 className='mb-2'>Thêm mã giảm giá</h3>
//         <div className='form-group'>
//           <label className='form-label' htmlFor='email'>
//             Mã giảm giá
//           </label>
//           <input
//             id='code'
//             type='text'
//             placeholder='VD: HGJFGFG'
//             className='form-control'
//             // value={email}
//             // onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label className='form-label' htmlFor='email'>
//             Gian hàng
//           </label>
//           <select
//             name='status'
//             id='status'
//             className='form-control'
//             // value={formState.status}
//             // onChange={handleChange}
//           >
//             <option value='default'>-- Tất cả --</option>
//             <option value='chờ xác nhận'>Đang đợi chấp nhận</option>
//             <option value='Đang đợi thực hiện'>Đang đợi thực hiện</option>
//             <option value='Tạm giữ tiền'>Tạm giữ tiền</option>
//             <option value='Hoàn thành'>Hoàn thành</option>
//             <option value='Hủy'>Hủy</option>
//             <option value='Thất bại'>Thất bại</option>
//           </select>
//         </div>
//         <div className='form-group'>
//           <label className='form-label' htmlFor='email'>
//             Mô tả
//           </label>
//           <input
//             id='des'
//             type='text'
//             placeholder='VD: Sử dụng 1 lần 1 tài khoản'
//             className='form-control'
//             // value={email}
//             // onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label className='form-label' htmlFor='email'>
//             Thời gian bắt đầu và kết thúc
//           </label>
//           <Space direction='vertical' size={12}>
//             <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
//           </Space>
//         </div>
//         <div className='form-group'>
//           <label className='form-label' htmlFor='email'>
//             Loại giảm giá
//           </label>
//           <select
//             name='status'
//             id='status'
//             className='form-control'
//             // value={formState.status}
//             // onChange={handleChange}
//           >
//             <option value='default'>-- Giảm theo phần trăm --</option>
//             <option value='chờ xác nhận'>Đang đợi chấp nhận</option>
//             <option value='Đang đợi thực hiện'>Đang đợi thực hiện</option>
//             <option value='Tạm giữ tiền'>Tạm giữ tiền</option>
//             <option value='Hoàn thành'>Hoàn thành</option>
//             <option value='Hủy'>Hủy</option>
//             <option value='Thất bại'>Thất bại</option>
//           </select>
//         </div>
//         <div className='form-group'>
//           <label className='form-label' htmlFor='email'>
//             Tỷ lệ giảm
//           </label>
//           <input
//             id='percent'
//             type='text'
//             placeholder='VD: 0'
//             className='form-control'
//             // value={email}
//             // onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label className='form-label' htmlFor='email'>
//             Số tiền tối đa
//           </label>
//           <input
//             id='des'
//             type='number'
//             placeholder='VD: 0'
//             className='form-control'
//             // value={email}
//             // onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <label className='form-label' htmlFor='email'>
//             Số lần sử dụng
//           </label>
//           <input
//             id='des'
//             type='number'
//             placeholder='VD: 0'
//             className='form-control'
//             // value={email}
//             // onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           // onClick={() => setIsModalOpen(true)}
//           type='button'
//           className='btn btn-primary btn-primary-bg my-3'
//         >
//           Tạo mới
//         </button>
//         <button onClick={() => onCancel()} type='button' className='btn btn-primary btn-primary-blue my-3 ms-3'>
//           Hủy
//         </button>
//       </form>
//     </div>
//   )
// }

// export default AddStoreCoupon
import { DatePicker, Space, notification } from 'antd'
const { RangePicker } = DatePicker
import axios from 'axios'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import React from 'react'
import moment from 'moment'

const AddStoreCoupon = ({ onCancel }) => {
  const [data, setData] = useState([])
  const [coupon, setCoupon] = useState({
    code: '',
    numberPromo: '',
    percent: '',
    startDate: '',
    endDate: '',
    id_booth: '',
    id_business: '',
    id_user: ''
  })

  const [count, setCount] = useState(0)
  const id = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_USER}${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        // console.log('response', response)
        if (response && response.data) {
          setData(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const fetchBusinessTypes = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_BUSINESS_TYPE}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      }
    )
    return res.data.data
  }
  const { data: business = [] } = useQuery('businessTypes', fetchBusinessTypes)
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(coupon)
    const body = {
      code: coupon.code,
      numberPromo: coupon.numberPromo,
      percent: coupon.percent,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      id_booth: coupon.id_booth,
      id_business: coupon.id_business,
      id_user: coupon.id_user
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SAVE_COUPON}`,
        body,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Tạo mới mã giảm giá thành công.',
        duration: 2
      })
      setTimeout(() => {
        onCancel
      }, 2000)
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Tạo mới mã giảm giá thất bại.',
        duration: 2
      })
    }
    // { console.log(coupon) }
  }

  const formatDateTime = (isoString) => {
    return moment(isoString).format('DD-MM-YYYY HH:mm')
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setCoupon({ ...coupon, [name]: value })
  }

  const handleDateChange = (dates, dateStrings) => {
    if (dates) {
      const [start, end] = dates
      setCoupon((prevCoupon) => ({
        ...prevCoupon,
        startDate: formatDateTime(start.toISOString()), // Hoặc format khác nếu cần
        endDate: formatDateTime(end.toISOString())
      }))
    } else {
      // Nếu người dùng xóa lựa chọn thời gian, reset các giá trị
      setCoupon((prevCoupon) => ({
        ...prevCoupon,
        startDate: '',
        endDate: ''
      }))
    }
  }

  // const handleChangebooth = (e) => {
  //   const { name, value } = e.target
  //   // Tìm booth trong dữ liệu dựa trên _id
  //   const booth = data.flat().find((booth) => booth._id === value)

  //   if (booth) {
  //     setCoupon((prevCoupon) => ({
  //       ...prevCoupon,
  //       id_booth: booth._id, // Giả định rằng `_id` là id_booth
  //       id_user: booth.id_user // Giả định rằng `id_user` là trường có sẵn trong dữ liệu booth
  //     }))
  //   }
  // }

  const handleChangebooth = (e) => {
    const { name, value } = e.target
    // Làm phẳng mảng và tìm booth dựa trên _id
    const booth = data.flat().find((booth) => booth._id === value)

    if (booth) {
      console.log(booth)
      setCoupon((prevCoupon) => ({
        ...prevCoupon,
        id_booth: booth._id, // Cập nhật id_booth từ _id của booth
        id_user: booth.id_user._id, // Giả định rằng id_user là một trường có trong dữ liệu của booth
        id_business: booth.id_businessType._id // Giả định rằng id_businessType là trường cung cấp id_business
      }))
    } else {
      // Cập nhật state nếu không tìm thấy booth
      setCoupon((prevCoupon) => ({
        ...prevCoupon,
        id_booth: '',
        id_user: '',
        id_business: ''
      }))
    }
  }

  return (
    <div className='d-flex flex-column'>
      <form onSubmit={onSubmit} className='form' id='form-1'>
        <h3 className='mb-2'>Thêm mã giảm giá</h3>
        <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Mã giảm giá
          </label>
          <input
            id='code'
            type='text'
            placeholder='VD: HGJFGFG'
            className='form-control'
            name='code'
            value={coupon.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Gian hàng
          </label>
          <select
            name='booth'
            id='status'
            className='form-control'
            // value={formState.status}
            // value={coupon.id_booth}
            onChange={handleChangebooth}
          >
            <option value='default'>-- Chọn gian hàng --</option>
            {data.map((subArray, index) =>
              subArray.map((bu, i) => (
                <option key={`${index}-${i}`} value={bu._id}>
                  {bu.nameBooth}
                </option>
              ))
            )}

            {/* <option value='chờ xác nhận'>Đang đợi chấp nhận</option>
            <option value='Đang đợi thực hiện'>Đang đợi thực hiện</option>
            <option value='Tạm giữ tiền'>Tạm giữ tiền</option>
<option value='Hoàn thành'>Hoàn thành</option>
            <option value='Hủy'>Hủy</option>
            <option value='Thất bại'>Thất bại</option> */}
          </select>
        </div>
        {/* <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Mô tả
          </label>
          <input
            id='des'
            type='text'
            placeholder='VD: Sử dụng 1 lần 1 tài khoản'
            className='form-control'
            name='numberPromo'
            value={coupon.numberPromo}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
        <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Thời gian bắt đầu và kết thúc
          </label>
          <Space direction='vertical' size={12}>
            <RangePicker
              renderExtraFooter={() => 'extra footer'}
              showTime
              name='dateRange'
              onChange={handleDateChange}
            />
          </Space>
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Loại giảm giá
          </label>
          <select
            name='status'
            id='status'
            className='form-control'
            onChange={handleChange}

            // value={formState.status}
            // onChange={handleChange}
          >
            <option value='default'>-- Giảm theo phần trăm --</option>
            {/* <option value='chờ xác nhận'>Đang đợi chấp nhận</option>
            <option value='Đang đợi thực hiện'>Đang đợi thực hiện</option>
            <option value='Tạm giữ tiền'>Tạm giữ tiền</option>
            <option value='Hoàn thành'>Hoàn thành</option>
            <option value='Hủy'>Hủy</option>
            <option value='Thất bại'>Thất bại</option> */}
          </select>
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Tỷ lệ giảm (%)
          </label>
          <input
            id='percent'
            type='number'
            placeholder='VD: 0'
            className='form-control'
            name='percent'
            value={coupon.percent}
            onChange={handleChange}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Số tiền tối đa
          </label>
          <input
            id='des'
            type='number'
            placeholder='VD: 0'
            className='form-control'
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
        <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Số lần sử dụng
          </label>
          <input
            id='des'
            type='number'
            placeholder='VD: 0'
            className='form-control'
            name='numberPromo'
            value={coupon.numberPromo}
            onChange={handleChange}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          // onClick={() => setIsModalOpen(true)}
          type='submit'
          className='btn btn-primary btn-primary-bg my-3'
        >
          Tạo mới
        </button>
        <button onClick={() => onCancel()} type='button' className='btn btn-primary btn-primary-blue my-3 ms-3'>
          Hủy
        </button>
      </form>
    </div>
  )
}

export default AddStoreCoupon
