import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import './OneSignal.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Modal } from 'antd'
import NewOneSignal from './NewOneSignal'

const OneSignal = () => {
  const id = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')

  const [data, setData] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const handleCancel = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_NOTIFICATION_USER}${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)

        if (response && response.data) {
          setData(response?.data?.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [openModal])

  return (
    <div className=''>
      <HeaderSell />
      <div className='w-100 d-flex'>
        <SidebarSell />
        <div className='w-100 wrap-store-all'>
          <div className='d-flex justify-content-between align-items-center mt-5'>
            <h3>Các thông báo của bạn</h3>
            <div className=''>
              <button
                onClick={() => setOpenModal(true)}
                type='button'
                className='btn btn-success btn-sm float-end px-md-3 py-md-2'
              >
                + Thêm
              </button>
            </div>
          </div>
          <div className='table-responsive mt-4'>
            <table className='table'>
              <thead>
                <tr className='custom-header'>
                  <th scope='col'>Tên thông báo</th>
                  <th scope='col'>Hình ảnh</th>
                  <th scope='col'>Nội dung</th>
                  <th scope='col'>Đường dẫn</th>
                  <th scope='col'>Trạng thái</th>
                  <th scope='col'>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data?.length > 0 ? (
                  data.map((a, i) => (
                    <tr key={i} className='mb-2'>
                      <td className='service-booth'>{a?.content}</td>
                      <td>
                        <img className='store-img' src={a?.image[0]} alt='img'></img>
                      </td>
                      <td>{a?.title}</td>
                      <td className='service-booth'>{a?.url}</td>
                      <td>{a?.status === 'Pending' ? 'Đợi duyệt' : a?.status}</td>
                      <td>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</td>
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
        </div>
      </div>
      <Modal className='modal-login' width={600} open={openModal} onCancel={handleCancel} footer={null}>
        <NewOneSignal onCancel={handleCancel} />
      </Modal>
    </div>
  )
}

export default OneSignal
