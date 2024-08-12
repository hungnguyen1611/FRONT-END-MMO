// import { useEffect, useState } from 'react'
// import './addStore.css'
// import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
// import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
// import MyQuillEditor from '~/pages/CustomQuill/quill'
// import axios from 'axios'
// import { notification } from 'antd'
// import { useSelector } from 'react-redux'
// import { Modal } from 'antd'
// import NewProduct from '../NewProduct/NewProduct'
// import { useQuery } from 'react-query'

// const fetchBusinessTypes = async () => {
//   const res = await axios.get(
//     `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_BUSINESS_TYPE}`
//   )
//   return res.data.data
// }

// const fetchBoothTypes = async (selectedBusiness) => {
//   if (!selectedBusiness) return []
//   const res = await axios.get(
//     `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_TYPE_BY_BUSINESS}${selectedBusiness}`
//   )
//   return res.data.data
// }

// const fetchDiscounts = async (selectedBoothType) => {
//   if (!selectedBoothType) return []
//   const res = await axios.get(
//     `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DISCOUNT_BY_BOOTH_TYPE}${selectedBoothType}`
//   )
//   return res.data.data
// }
// const AddStore = () => {
//   const _id = useSelector((state) => state.auth._id)
//   // const user = JSON.parse(localStorage.getItem('user') || '{}')
//   const accessToken = localStorage.getItem('token')
//   const [data, setData] = useState({
//     nameBooth: '',
//     desc: '',
//     shortDesc: '',
//     statusReseller: false,
//     discount: ''
//     // imageBooth: []
//   })
//   const [images, setImages] = useState([])
//   const [selectedBusiness, setSelectedBusiness] = useState('')
//   const [selectedBoothType, setSelectedBoothType] = useState('')
//   const [selectedDiscountType, setSelectedDiscountType] = useState('')
//   const [id, setId] = useState('')
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   // const [business, setBusiness] = useState([])
//   // const [discount, setDiscout] = useState([])
//   // const [booth, setBooth] = useState([])
//   const { data: business = [] } = useQuery('businessTypes', fetchBusinessTypes)
//   const { data: booth = [] } = useQuery(['boothTypes', selectedBusiness], () => fetchBoothTypes(selectedBusiness), {
//     enabled: !!selectedBusiness
//   })
//   const { data: discount = [] } = useQuery(['discounts', selectedBoothType], () => fetchDiscounts(selectedBoothType), {
//     enabled: !!selectedBoothType
//   })
//   const showModal = () => {
//     setIsModalOpen(true)
//   }
//   const handleCancel = () => {
//     setIsModalOpen(false)
//   }
//   console.log('selectedBusiness', selectedBusiness)
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setData({ ...data, [name]: value })
//   }

//   const handleQuillChange = (content) => {
//     setData({ ...data, desc: content })
//   }

//   // const handleImageChange = (e) => {
//   //   const file = e.target.files
//   //   setData({ ...data, imageBooth: file })
//   // }
//   // const handleImageChange = (e) => {
//   //   const files = Array.from(e.target.files)
//   //   setData({ ...data, imageBooth: files })
//   // }
//   const handleImageChange = (e) => {
//     setImages(e.target.files)
//   }
//   const handleBusinessChange = (e) => {
//     setSelectedBusiness(e.target.value)
//   }

//   const handleBoothType = (e) => {
//     setSelectedBoothType(e.target.value)
//   }

//   const handleDiscountType = (e) => {
//     setSelectedDiscountType(e.target.value)
//   }

//   const handleCheckboxChange = (e) => {
//     setData({ ...data, statusReseller: e.target.checked })
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const form = new FormData()
//     form.append('nameBooth', data.nameBooth)
//     form.append('id_business', selectedBusiness)
//     form.append('id_booth_type', selectedBoothType)
//     form.append('discount', selectedDiscountType)
//     form.append('statusReseller', data.statusReseller)
//     form.append('shortDesc', data.shortDesc)
//     form.append('desc', data.desc)
//     form.append('id_user', _id)
//     // if (data?.imageBooth && data?.imageBooth.length > 0) {
//     //   data?.imageBooth.forEach((image) => {
//     //     formData.append('imageBooth', image)
//     //   })
//     // }
//     for (let i = 0; i < images.length; i++) {
//       form.append('imageBooth', images[i])
//     }
//     // data?.imageBooth.forEach((image) => {
//     //   console.log('data', image)
//     //   formData.append('imageBooth', image)
//     // })

//     // formData.forEach((value, key) => {
//     //   console.log(`${key}:`, value)
//     // })

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CREATE_BOOTH}`,
//         form,
//         {
//           // headers: {
//           //   'Content-Type': 'multipart/form-data',
//           //   token: `Bearer ${accessToken}`
//           // }
//           headers: {
//             token: `Bearer ${accessToken}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       )
//       setId(res?.data?.data?._id)
//       if (res) {
//         showModal()
//       }
//       console.log('res', res)
//       notification.success({
//         message: 'Tạo mới gian hàng thành công.',
//         duration: 2
//       })
//     } catch (error) {
//       console.log(error)
//       const errorMessage = error?.response?.data?.message || 'Đã xảy ra lỗi không xác định.'
//       notification.error({
//         message: 'Tạo mới gian hàng thất bại.',
//         description: errorMessage,
//         duration: 2
//       })
//       // notification.error({
//       //   message: 'Tạo mới gian hàng thất bại.',
//       //   duration: 2
//       // })
//     }
//   }

//   return (
//     <div className=''>
//       <HeaderSell />
//       <div className='w-100 d-flex'>
//         <SidebarSell />
//         <div className='p-1 p-lg-3 mt-5'>
//           <h2 className='fs-5'>Thêm gian hàng</h2>
//           <form id='addStoreForm' onSubmit={handleSubmit}>
//             <div className='row'>
//               <div className='col-lg-6 col-12 fs-6 my-4'>
//                 Tên gian hàng
//                 <input
//                   type='text'
//                   name='nameBooth'
//                   value={data.nameBooth}
//                   onChange={handleChange}
//                   className='form-control rounded-2 border w-100 my-2'
//                   required
//                 />
//               </div>
//               <div className='col-lg-6 col-12 fs-6 my-4'>
//                 Loại hình kinh doanh
//                 <select
//                   name='status'
//                   id='status'
//                   className='form-control rounded-2 border w-100 my-2'
//                   onChange={handleBusinessChange}
//                   required
//                 >
//                   <option value='default'>-- Chọn dữ liệu --</option>
//                   {business.map((bu, i) => (
//                     <option key={i} value={bu?._id}>
//                       {bu.nameBusiness}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className='col-lg-6 col-12 fs-6 my-4'>
//                 Loại gian hàng
//                 <select
//                   name='status'
//                   id='status'
//                   className='form-control rounded-2 border w-100 my-2'
//                   onChange={handleBoothType}
//                   required
//                 >
//                   <option value='default'>-- Chọn dữ liệu --</option>
//                   {booth.map((bu, i) => (
//                     <option key={i} value={bu?._id}>
//                       {bu?.nameBoothType}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className='col-lg-6 col-12 fs-6 my-4'>
//                 Loại sản phẩm - Chiết khấu cho sàn
//                 <select
//                   name='discount'
//                   id='status'
//                   className='form-control rounded-2 border w-100 my-2'
//                   onChange={handleDiscountType}
//                   required
//                 >
//                   <option value='default'>-- Chọn dữ liệu --</option>
//                   {discount.map((bu, i) => (
//                     <option key={i} value={bu?._id}>
//                       {bu?.nameDiscount} ({bu?.percent}%)
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             {/* <div className='fs-6'>
//               Đánh giá hoàn tiền(%) - "0":tắt |
//               <span style={{ color: 'red' }}>
//                 Khuyến khích khách hàng đánh giá bằng cách hoàn lại một khoản tiền (từ 0.1% - tối đa 5%)
//               </span>
//               <input placeholder='0,0' type='text' className='form-control rounded-2 border w-100 my-2' required />
//             </div> */}
//             <div className='fs-6 my-3'>
//               <input
//                 type='checkbox'
//                 name='statusReseller'
//                 id=''
//                 checked={data.statusReseller}
//                 onChange={handleCheckboxChange}
//                 className='custom-checkbox me-2 '
//               />
//               Bạn có muốn cho reseller bán hàng không ?
//             </div>
//             <div className='fs-6 mt-4'>
//               Mô tả ngắn*
//               <input
//                 type='text'
//                 name='shortDesc'
//                 value={data.shortDesc}
//                 onChange={handleChange}
//                 className='form-control rounded-2 border w-100 my-2'
//                 required
//               />
//             </div>
//             <div className='fs-6 mt-4'>
//               <p className='my-2'> Mô tả chi tiết* </p>
//               <MyQuillEditor desc={data.desc} onChange={handleQuillChange} />
//             </div>
//             <div className='my-5 fs-6'>
//               Ảnh gian hàng (Kích thước lớn hơn 320px.)
//               <input
//                 type='file'
//                 onChange={handleImageChange}
//                 name='imageBooth'
//                 id='imageBooth'
//                 accept='.jpg, .png'
//                 className='store-input-file rounded-2 border w-100 my-2'
//                 multiple
//               />
//             </div>
//             <div className='d-flex gap-3 mb-5'>
//               <button type='button' className='btn btn-success btn-sm '>
//                 Quay lại
//               </button>
//               <button type='submit' className='btn btn-success btn-sm '>
//                 Tạo mới
//               </button>
//             </div>

//             <div className='fs-6'>
//               <p style={{ color: 'red' }}>Vui lòng đọc kỹ trước khi tạo mới:</p>
//               <ul>
//                 <li style={{ color: 'green' }}>
//                   Vì bên mình là sàn thương mại điện tử, nên nếu sản phẩm của bạn không bán trực tiếp trên site được thì
//                   sẽ không được duyệt. Ví dụ các sản phẩm không thể số hóa thành text file, phần mềm không có API để get
//                   hay active key (hãy liên hệ để coder 2 bên có thể map với nhau nhé)....
//                 </li>
//                 <li style={{ color: 'green' }}>
//                   Không đăng thông tin liên hệ nào khác lên gian hàng (kể cả hình ảnh), không nhắn tin cách thức liên hệ
//                   ngoài site. Mong các bạn hiểu, bên mình là sàn, chi phí rất nhiều cho đội ngũ kỹ thuật, hỗ trợ,
//                   marketing, server, nên hi vọng chúng ta có thể hợp tác đôi bên cùng có lợi, về lâu về dài bên mình
//                   cũng cần có chi phí duy trì, phát triển nền tảng... nên rất cần đối tác hiểu, và có thể gắn bó lâu dài
//                   với site
//                 </li>
//                 <li style={{ color: 'green' }}>
//                   Nếu có yêu cầu gì thêm cho phần bán hàng, các bạn cứ nhắn tin cho support, bên mình sẵn sàng hỗ trợ
//                   sao cho các bạn bán được thuận tiện nhất.
//                 </li>
//                 <li style={{ color: 'green' }}>
//                   Gian hàng mới có thể sẽ bán chậm hơn 1 chút, mong các bạn thông cảm, đừng nóng vội, chăm chút cho sản
//                   phẩm và khách hàng hơn, từ kết quả bán hàng sẽ quyết định thứ hạn hiển thị trên site.
//                 </li>
//                 <li style={{ color: 'green' }}>
//                   Các quy định khác về gian hàng các bạn đọc thêm ở đây:
//                   <a href='#' className='spanqd'>
//                     {' '}
//                     Quy định về gian hàng và các mặt hàng bị cấm.
//                   </a>{' '}
//                 </li>
//               </ul>
//             </div>
//           </form>
//         </div>
//         <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
//           <NewProduct id={id} id_business={selectedBusiness} />
//         </Modal>
//       </div>
//     </div>
//   )
// }

// export default AddStore
import React, { useState } from 'react'
import './addStore.css'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import MyQuillEditor from '~/pages/CustomQuill/quill'
import axios from 'axios'
import { notification } from 'antd'
import { useSelector } from 'react-redux'
import { Modal } from 'antd'
import NewProduct from '../NewProduct/NewProduct'
import { useQuery } from 'react-query'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const fetchBusinessTypes = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_BUSINESS_TYPE}`
  )
  return res.data.data
}

const fetchBoothTypes = async (selectedBusiness) => {
  if (!selectedBusiness) return []
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_TYPE_BY_BUSINESS}${selectedBusiness}`
  )
  return res.data.data
}

const fetchDiscounts = async (selectedBoothType) => {
  if (!selectedBoothType) return []
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_DISCOUNT_BY_BOOTH_TYPE}${selectedBoothType}`
  )
  return res.data.data
}

const AddStore = () => {
  const _id = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')
  const [data, setData] = useState({
    nameBooth: '',
    desc: '',
    shortDesc: '',
    statusReseller: false
    // discount: ''
  })
  const [images, setImages] = useState(null)
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const [selectedBoothType, setSelectedBoothType] = useState('')
  const [selectedDiscountType, setSelectedDiscountType] = useState('')
  const [id, setId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: business = [] } = useQuery('businessTypes', fetchBusinessTypes)
  const { data: booth = [] } = useQuery(['boothTypes', selectedBusiness], () => fetchBoothTypes(selectedBusiness), {
    enabled: !!selectedBusiness
  })
  const { data: discount = [] } = useQuery(['discounts', selectedBoothType], () => fetchDiscounts(selectedBoothType), {
    enabled: !!selectedBoothType
  })

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleQuillChange = (content) => {
    setData({ ...data, desc: content })
  }

  // const handleImageChange = async (e) => {
  //   const files = Array.from(e.target.files)
  //   const imagesBase64 = await Promise.all(files.map((file) => convertToBase64(file)))
  //   setImages(imagesBase64)
  // }
  // const handleImageChange = (e) => {
  //   setImages(e.target.files)
  // }
  const handleImageChange = ({ file }) => {
    setImages(file)
  }
  // const handleImageChange = async (e) => {
  //   // const fileArray = Array.from(e.target.files)
  //   const fileArray = e.target.files
  //   setImages(fileArray)
  // }

  // const handleImageChange = (e) => {
  //   setImages(Array.from(e.target.files))
  // }

  const handleBusinessChange = (e) => {
    setSelectedBusiness(e.target.value)
  }

  const handleBoothType = (e) => {
    setSelectedBoothType(e.target.value)
  }

  const handleDiscountType = (e) => {
    setSelectedDiscountType(e.target.value)
  }

  const handleCheckboxChange = (e) => {
    setData({ ...data, statusReseller: e.target.checked })
  }
  const validateForm = () => {
    if (
      !data.nameBooth ||
      !data.desc ||
      !data.shortDesc ||
      !selectedBusiness ||
      !selectedBoothType ||
      !selectedDiscountType ||
      !images
    ) {
      return false
    }
    return true
  }
  const handleSubmit = async () => {
    if (!validateForm()) {
      notification.error({
        message: 'Lỗi',
        description: 'Vui lòng điền đầy đủ thông tin tất cả các trường trước khi tạo mới gian hàng.',
        duration: 2
      })
      return
    }
    const form = new FormData()
    // for (const image of images) {
    // }
    form.append('imageBooth', images)

    form.append('nameBooth', data.nameBooth)
    form.append('id_business', selectedBusiness)
    form.append('id_booth_type', selectedBoothType)
    form.append('discount', selectedDiscountType)
    form.append('statusReseller', data.statusReseller)
    form.append('shortDesc', data.shortDesc)
    form.append('desc', data.desc)
    form.append('id_user', _id)

    // for (const [key, value] of form) {
    //   console.log(key, value)
    // }

    // return

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CREATE_BOOTH}`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      setId(res?.data?.data?._id)
      if (res) {
        showModal()
      }
      notification.success({
        message: 'Tạo mới gian hàng thành công.',
        duration: 2
      })
    } catch (error) {
      console.error('Error creating booth:', error)
      const errorMessage = error?.response?.data?.message || 'Đã xảy ra lỗi không xác định.'
      notification.error({
        message: 'Tạo mới gian hàng thất bại.',
        description: errorMessage,
        duration: 2
      })
    }
  }

  return (
    <div>
      <HeaderSell />
      <div className='w-100 d-flex'>
        <SidebarSell />
        <div className='p-1 p-lg-3 mt-5'>
          <h2 className='fs-5'>Thêm gian hàng</h2>
          <form id='addStoreForm'>
            <div className='row'>
              <div className='col-lg-6 col-12 fs-6 my-4'>
                Tên gian hàng
                <input
                  type='text'
                  name='nameBooth'
                  value={data.nameBooth}
                  onChange={handleChange}
                  className='form-control rounded-2 border w-100 my-2'
                  required
                />
              </div>
              <div className='col-lg-6 col-12 fs-6 my-4'>
                Loại hình kinh doanh
                <select
                  name='status'
                  id='status'
                  className='form-control rounded-2 border w-100 my-2'
                  onChange={handleBusinessChange}
                  required
                >
                  <option value='default'>-- Chọn dữ liệu --</option>
                  {business.map((bu, i) => (
                    <option key={i} value={bu?._id}>
                      {bu.nameBusiness}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-lg-6 col-12 fs-6 my-4'>
                Loại gian hàng
                <select
                  name='status'
                  id='status'
                  className='form-control rounded-2 border w-100 my-2'
                  onChange={handleBoothType}
                  required
                >
                  <option value='default'>-- Chọn dữ liệu --</option>
                  {booth.map((bu, i) => (
                    <option key={i} value={bu?._id}>
                      {bu?.nameBoothType}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-lg-6 col-12 fs-6 my-4'>
                Loại sản phẩm - Chiết khấu cho sàn
                <select
                  name='discount'
                  id='status'
                  className='form-control rounded-2 border w-100 my-2'
                  onChange={handleDiscountType}
                  required
                >
                  <option value='default'>-- Chọn dữ liệu --</option>
                  {discount.map((bu, i) => (
                    <option key={i} value={bu?._id}>
                      {bu?.nameDiscount} ({bu?.percent}%)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='fs-6 my-3'>
              <input
                type='checkbox'
                name='statusReseller'
                id=''
                checked={data.statusReseller}
                onChange={handleCheckboxChange}
                className='custom-checkbox me-2 '
              />
              Bạn có muốn cho reseller bán hàng không ?
            </div>
            <div className='fs-6 mt-4'>
              Mô tả ngắn*
              <input
                type='text'
                name='shortDesc'
                value={data.shortDesc}
                onChange={handleChange}
                className='form-control rounded-2 border w-100 my-2'
                required
              />
            </div>
            <div className='fs-6 mt-4 description-quill-cus'>
              <p className='my-2'> Mô tả chi tiết* </p>
              <MyQuillEditor desc={data.desc} onChange={handleQuillChange} />
            </div>

            {/* <div className='my-5 fs-6'>
              Ảnh gian hàng (Kích thước lớn hơn 320px.)
              <input
                type='file'
                onChange={handleImageChange}
                name='imageBooth'
                id='imageBooth'
                accept='.jpg, .png'
                className='store-input-file rounded-2 border w-100 my-2'
                multiple
              />
            </div> */}
            <div className='my-5 fs-6'>
              Ảnh bài viết (Kích thước lớn hơn 320px)
              <Upload
                name='image'
                listType='picture-card'
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageChange}
                className='overflow-hidden'
              >
                {images ? (
                  <img src={URL.createObjectURL(images)} alt='avatar' style={{ width: '100%' }} />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </div>
            <div className='d-flex gap-3 mb-5'>
              <button type='button' className='btn btn-success btn-sm '>
                Quay lại
              </button>
              <button type='button' className='btn btn-success btn-sm ' onClick={handleSubmit}>
                Tạo mới
              </button>
            </div>
            <div className='fs-6'>
              <p style={{ color: 'red' }}>Vui lòng đọc kỹ trước khi tạo mới:</p>
              <ul>
                <li style={{ color: 'green' }}>
                  Vì bên mình là sàn thương mại điện tử, nên nếu sản phẩm của bạn không bán trực tiếp trên site được thì
                  sẽ không được duyệt. Ví dụ các sản phẩm không thể số hóa thành text file, phần mềm không có API để get
                  hay active key (hãy liên hệ để coder 2 bên có thể map với nhau nhé)....
                </li>
                <li style={{ color: 'green' }}>
                  Không đăng thông tin liên hệ nào khác lên gian hàng (kể cả hình ảnh), không nhắn tin cách thức liên hệ
                  ngoài site. Mong các bạn hiểu, bên mình là sàn, chi phí rất nhiều cho đội ngũ kỹ thuật, hỗ trợ,
                  marketing, server, nên hi vọng chúng ta có thể hợp tác đôi bên cùng có lợi, về lâu về dài bên mình
                  cũng cần có chi phí duy trì, phát triển nền tảng... nên rất cần đối tác hiểu, và có thể gắn bó lâu dài
                  với site
                </li>
                <li style={{ color: 'green' }}>
                  Nếu có yêu cầu gì thêm cho phần bán hàng, các bạn cứ nhắn tin cho support, bên mình sẵn sàng hỗ trợ
                  sao cho các bạn bán được thuận tiện nhất.
                </li>
                <li style={{ color: 'green' }}>
                  Gian hàng mới có thể sẽ bán chậm hơn 1 chút, mong các bạn thông cảm, đừng nóng vội, chăm chút cho sản
                  phẩm và khách hàng hơn, từ kết quả bán hàng sẽ quyết định thứ hạn hiển thị trên site.
                </li>
                <li style={{ color: 'green' }}>
                  Các quy định khác về gian hàng các bạn đọc thêm ở đây:
                  <a href='#' className='spanqd'>
                    {' '}
                    Quy định về gian hàng và các mặt hàng bị cấm.
                  </a>{' '}
                </li>
              </ul>
            </div>
          </form>
        </div>
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <NewProduct id={id} id_business={selectedBusiness} />
        </Modal>
      </div>
    </div>
  )
}

export default AddStore
