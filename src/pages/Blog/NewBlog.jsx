// import Footer from '~/layouts/Footer/Footer'
// import Header from '~/layouts/Header/Header'
// import MyQuillEditor from '../CustomQuill/quill'

// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { notification } from 'antd'

// const NewBlog = () => {
//   const navigate = useNavigate()
//   const id_user = useSelector((state) => state.auth._id)
//   const [category, setCategory] = useState([])
//   const [data, setData] = useState({
//     title: '',
//     content: '',
//     category: '',
//     image: false
//   })
//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     setData({ ...data, image: file })
//   }
//   const handleQuillChange = (content) => {
//     setData({ ...data, content: content })
//   }
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setData({ ...data, [name]: value })
//   }
//   const handleCategoryChange = (e) => {
//     setData({ ...data, category: e.target.value })
//   }
//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_CATEGORY_BLOG}`)
//       .then((response) => {
//         console.log('response', response)
//         if (response && response.data) {
//           setCategory(response?.data)
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [])
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append('title', data.title)
//     formData.append('content', data.content)
//     formData.append('category', data.category)
//     formData.append('id_user', id_user)
//     if (data.image) {
//       formData.append('image', data.image)
//     }

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SAVE_BLOG}`,
//         formData
//       )
//       console.log('res', res)
//       notification.success({
//         message: 'Tạo mới bài viết thành công.',
//         duration: 2
//       })
//       setTimeout(() => {
//         navigate('/blog')
//       }, 2000)
//     } catch (error) {
//       notification.error({
//         message: 'Tạo mới bài viết thất bại.',
//         duration: 2
//       })
//     }
//   }
//   console.log(category)
//   return (
//     <div>
//       <Header />
//       <div style={{ minHeight: '60vh' }} className='container my-5 border rounded-2 p-lg-3 p-1'>
//         <div className=''>
//           <h1 className='fs-5 my-2'>Thêm bài viết</h1>
//         </div>
//         <div className='my-4'>
//           <p className='fs-6 my-2'>
//             Chọn danh mục <span style={{ color: 'red' }}>*</span>
//           </p>
//           <div className='form-group mx-1 mb-3 mb-md-0'>
//             {/* <select
//               name='status'
//               id='status'
//               className='form-control form-control-sm search fs-6'
//               // value={formState.status}
//               // onChange={handleChange}
//             >
//               <option value='default'>-- Tất cả --</option>
//               <option value='chờ xác nhận'>Hoạt động</option>
//               <option value='Đang đợi thực hiện'>Khóa</option>
//               <option value='Tạm giữ tiền'>Chờ duyệt</option>
//             </select> */}
//             <select
//               name='status'
//               id='status'
//               className='form-control rounded-2 border w-100 my-2'
//               onChange={handleCategoryChange}
//               required
//             >
//               <option value='default'>-- Chọn dữ liệu --</option>
//               {category.map((bu, i) => (
//                 <option key={i} value={bu?._id}>
//                   {bu.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className='my-4'>
//           <p className='fs-6 my-2'>
//             Tựa đề <span style={{ color: 'red' }}>*</span>
//           </p>
//           <div className='form-group mx-1 mb-3 mb-md-0'>
//             <input
//               className='rounded-2 border p-2'
//               type='text'
//               id=''
//               name='title'
//               value={data.title}
//               onChange={handleChange}
//               style={{ outline: 'none', boxShadow: 'none' }}
//             />
//           </div>
//           <div className='my-5 fs-6'>
//             Ảnh gian hàng (Kích thước lớn hơn 320px.)
//             <input
//               type='file'
//               onChange={handleImageChange}
//               name='image'
//               className='store-input-file rounded-2 border w-100 my-2'
//             />
//           </div>
//           <div className='my-5'>
//             <p className='fs-6 mb-2'>
//               Nội dung bài viết <span style={{ color: 'red' }}>*</span>
//             </p>
//             <div className='pb-3'>
//               <MyQuillEditor desc={data.content} onChange={handleQuillChange} />
//             </div>
//           </div>
//         </div>

//         <div className='my-3'>
//           <button type='button' className='btn btn-secondary me-2' onClick={() => navigate('/blog')}>
//             Quay lại
//           </button>
//           <button type='button' className='btn btn-success' onClick={handleSubmit}>
//             Tạo mới
//           </button>
//         </div>

//         <div className='mb-5'>
//           <p className='fs-5' style={{ color: 'red' }}>
//             Lưu ý khi viết bài
//           </p>
//           <ul className='fs-6' style={{ color: 'green' }}>
//             <li>
//               Những nội dung được duyệt chỉ gói gọn trong các chia sẻ về "nghề" MMO, kiến thức, kinh nghiệm, trải nghiệm
//               về mọi mảng trong cách kiếm tiền online{' '}
//             </li>
//             <li>Các nội dung về chính trị, tôn giáo, kích động... sẽ không được duyệt!</li>
//             <li>
//               Không đăng các bài viết quảng cáo, tuyển ref, giới thiệu dự án, lùa gà... (không cần biết dự án có lừa đảo
//               hay không)
//             </li>
//             <li>
//               Không đăng nội dung vi phạm quyền sở hữu trí tuệ của người khác, bao gồm vi phạm nhãn hiệu hàng hóa và bản
//               quyền.
//             </li>
//             <li>Những bài viết chất lượng sẽ được lựa chọn để làm điểm tuần và nhận thưởng từ sàn.</li>
//             <li>Tiền donate sẽ được nhận sau 3 ngày.</li>
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default NewBlog

import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import MyQuillEditor from '../CustomQuill/quill'
import { Button, Select, Upload } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons'

const NewBlog = () => {
  const navigate = useNavigate()
  const id_user = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')
  const [category, setCategory] = useState([])
  const [data, setData] = useState({
    title: '',
    content: '',
    category: '',
    image: false
  })
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0]
  //   setData({ ...data, image: file })
  // }
  const handleImageChange = ({ file }) => {
    setData({ ...data, image: file })
    console.log(file)
  }
  const handleQuillChange = (content) => {
    setData({ ...data, content: content })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const handleCategoryChange = (e) => {
    setData({ ...data, category: e.target.value })
  }
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_CATEGORY_BLOG}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setCategory(response?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('category', data.category)
    formData.append('id_user', id_user)
    if (data.image) {
      formData.append('image', data.image)
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SAVE_BLOG}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Tạo mới bài viết thành công.',
        duration: 2
      })
      setTimeout(() => {
        navigate('/blog')
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Tạo mới bài viết thất bại.',
        duration: 2
      })
    }
  }
  console.log(category)
  return (
    <div>
      <Header />
      <div style={{ minHeight: '60vh' }} className='container my-5 border rounded-2 p-lg-3 p-1'>
        <div className='user-profile-container-block'>
          {/* <div className=''>
            <FontAwesomeIcon icon={faUser} className='user-icon' />
            <p>@username</p>
          </div> */}
          <div className='title-new-block'>
            <h1 className='fs-5 my-2'>THÊM BÀI VIẾT</h1>
          </div>{' '}
        </div>

        <div className='my-4'>
          <p className='fs-6 my-2'>
            Chọn danh mục <span style={{ color: 'red' }}>*</span>
          </p>
          <div className='form-group mx-1 mb-3 mb-md-0'>
            {/* <select
              name='status'
              id='status'
              className='form-control form-control-sm search fs-6'
              // value={formState.status}
              // onChange={handleChange}
            >
              <option value='default'>-- Tất cả --</option>
              <option value='chờ xác nhận'>Hoạt động</option>
              <option value='Đang đợi thực hiện'>Khóa</option>
              <option value='Tạm giữ tiền'>Chờ duyệt</option>
            </select> */}
            <select
              name='status'
              id='status'
              className='form-control rounded-2 border w-100 my-2'
              onChange={handleCategoryChange}
              required
            >
              <option value='default'> Chọn danh mục </option>
              {category.map((bu, i) => (
                <option key={i} value={bu?._id}>
                  {bu.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='my-4'>
          <p className='fs-6 my-2'>
            Tựa đề <span style={{ color: 'red' }}>*</span>
          </p>
          <div className='form-group mx-1 mb-3 mb-md-0'>
            <input
              className='rounded-2 border p-2'
              type='text'
              id=''
              name='title'
              value={data.title}
              onChange={handleChange}
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </div>

          <div className='my-5'>
            <p className='fs-6 mb-2'>
              Nội dung bài viết <span style={{ color: 'red' }}>*</span>
            </p>
            <div className='pb-3'>
              <MyQuillEditor desc={data.content} onChange={handleQuillChange} />
            </div>
          </div>
        </div>
        {/* <div className='my-5 fs-6'>
          Ảnh gian hàng (Kích thước lớn hơn 320px.)
          <input
            type='file'
            onChange={handleImageChange}
            name='image'
            className='store-input-file rounded-2 border w-100 my-2'
          />
        </div> */}
        <div className=' fs-6'>
          Ảnh bài viết (Kích thước lớn hơn 320px)
          <Upload
            name='image'
            listType='picture-card'
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageChange}
            className='overflow-hidden mt-3'
          >
            {data.image ? (
              <img src={URL.createObjectURL(data.image)} alt='avatar' style={{ width: '100%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </div>
        {/* <div className='my-5 fs-6'>
          Ảnh bài viết (Kích thước lớn hơn 320px)
          <div className='file-input-wrapper'>
            <input type='file' onChange={handleImageChange} name='image' className='file-input' />
          </div>
        </div> */}
        <div className='my-3'>
          <button type='button' className='btn btn-secondary me-2' onClick={() => navigate('/blog')}>
            Quay lại
          </button>
          <button type='button' className='btn btn-success' onClick={handleSubmit}>
            Tạo mới
          </button>
        </div>
        <div className='mb-5 note-block'>
          <p className='fs-5' style={{ color: 'red' }}>
            Lưu ý khi viết bài
          </p>
          <ul className='fs-6' style={{ color: 'green' }}>
            <li>
              Những nội dung được duyệt chỉ gói gọn trong các chia sẻ về "nghề" MMO, kiến thức, kinh nghiệm, trải nghiệm
              về mọi mảng trong cách kiếm tiền online{' '}
            </li>
            <li>Các nội dung về chính trị, tôn giáo, kích động... sẽ không được duyệt!</li>
            <li>
              Không đăng các bài viết quảng cáo, tuyển ref, giới thiệu dự án, lùa gà... (không cần biết dự án có lừa đảo
              hay không)
            </li>
            <li>
              Không đăng nội dung vi phạm quyền sở hữu trí tuệ của người khác, bao gồm vi phạm nhãn hiệu hàng hóa và bản
              quyền.
            </li>
            <li>Những bài viết chất lượng sẽ được lựa chọn để làm điểm tuần và nhận thưởng từ sàn.</li>
            <li>Tiền donate sẽ được nhận sau 3 ngày.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NewBlog
