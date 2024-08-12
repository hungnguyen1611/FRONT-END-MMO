import { useEffect, useState } from 'react'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import MyQuillEditor from '~/pages/CustomQuill/quill'
import axios from 'axios'
import { notification } from 'antd'
import { useSelector } from 'react-redux'
import { Modal } from 'antd'
import NewProduct from '../NewProduct/NewProduct'
import { useQuery } from 'react-query'

const EditStore = ({ id, id_business, showEdit, onCancel }) => {
  const _id = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')
  const [data, setData] = useState({
    id_businessType: '',
    id_booth: '',
    nameBooth: '',
    desc: '',
    shortDesc: '',
    statusReseller: '',
    imageBooth: ''
  })
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const [selectedBoothType, setSelectedBoothType] = useState('')
  const [selectedDiscountType, setSelectedDiscountType] = useState('')
  // const [id, setId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  console.log('showedit', showEdit)
  // // Lấy dữ liệu "Chiết khấu cho sàn" khi "Loại gian hàng" được chọn
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_BY_BOOTH}?id_business=${id_business}&id_booth=${id}`
      )
      .then((response) => {
        console.log('response', response)
        if (response && response.data) {
          setData(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_business, id, showEdit])
  // useEffect(() => {
  //   const fetchDiscount = async () => {
  //     try {
  //       const discountRes = await axios.get(
  //         `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_BY_BOOTH}?id_business=${id_business}&id_booth=${id}`
  //       )
  //       setData(discountRes.data.data)
  //       console.log('discountRes:', discountRes)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchDiscount()
  // }, [id, id_business])
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    const formData = new FormData()
    formData.append('nameBooth', data.nameBooth)
    formData.append('id_businessType', data?.id_businessType?._id)
    formData.append('id_booth', id)
    formData.append('statusReseller', data.statusReseller)
    formData.append('shortDesc', data.shortDesc)
    formData.append('desc', data.desc)
    if (data.imageBooth) {
      formData.append('imageBooth', data.imageBooth)
    }
    formData.forEach((value, key) => {
      console.log(key, value)
    })
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_UPDATE_BOOTH}`,
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
        message: 'Sửa gian hàng thành công.',
        duration: 2
      })
      setTimeout(() => {
        onCancel()
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Sửa gian hàng thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleQuillChange = (content) => {
    setData({ ...data, desc: content })
  }

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
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setData({ ...data, imageBooth: file })
  }
  return (
    <div className='d-flex'>
      {/* <SidebarSell /> */}
      <div className='w-100'>
        {/* <HeaderSell /> */}
        <div className='p-1 p-lg-3'>
          <h2 className='fs-5'>Sửa gian hàng</h2>
          <form id='addStoreForm' onSubmit={handleSubmit}>
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
                  value={data?.id_businessType?._id}
                  disabled
                >
                  <option value={data?.id_businessType?._id}>-- Chọn dữ liệu --</option>
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
                  value={data?.id_boothType?._id}
                  disabled
                >
                  <option value={data?.id_boothType?._id}>-- Chọn dữ liệu --</option>
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
                  value={data?.discountProduct}
                  disabled
                >
                  <option value={data?.discountProduct}>-- Chọn dữ liệu --</option>
                </select>
              </div>
            </div>
            {/* <div className='fs-6'>
              Đánh giá hoàn tiền(%) - "0":tắt |
              <span style={{ color: 'red' }}>
                Khuyến khích khách hàng đánh giá bằng cách hoàn lại một khoản tiền (từ 0.1% - tối đa 5%)
              </span>
              <input placeholder='0,0' type='text' className='form-control rounded-2 border w-100 my-2' required />
            </div> */}
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
            <div className='fs-6 mt-4'>
              <p className='my-2'> Mô tả chi tiết* </p>
              <MyQuillEditor desc={data.desc} onChange={handleQuillChange} />
            </div>
            <div className='my-5 fs-6'>
              Ảnh gian hàng (Kích thước lớn hơn 320px.)
              <input
                onChange={handleImageChange}
                type='file'
                name=''
                className='store-input-file rounded-2 border w-100 my-2'
              />
            </div>
            <div className='d-flex gap-3 mb-5'>
              <button type='button' className='btn btn-success btn-sm '>
                Quay lại
              </button>
              <button type='submit' className='btn btn-success btn-sm '>
                Đồng ý
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

export default EditStore
