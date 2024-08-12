import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import { Modal } from 'antd'
import Require from './Require'
import FooterHome from '../Home/FooterHome'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Withdraw = () => {
  const navigate = useNavigate()
  const handleRouter = () => navigate('/history-money')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const id_user = useSelector((state) => state.auth._id)
  const [data, setData] = useState([])
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const columns = [
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (a) => <>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</>
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'nameBank',
      key: 'nameBank'
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'stk',
      key: 'stk'
    },

    {
      title: 'Số tiền rút',
      dataIndex: 'amount',
      key: 'amount'
    },

    {
      title: 'Trạng thái',
      // dataIndex: 'status',
      key: 'status',
      render: (a) => <>{a?.status === 'Pending' ? 'Đợi xử lý' : a?.status === 'Completed' ? 'Đã xong' : 'Lỗi'}</>
    }
  ]
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_HISTORY_BY_USER}${id_user}`
      )
      .then((response) => {
        if (response && response.data) {
          // const combinedData = response.data.data.flat()
          setData(response.data.data)
          console.log(response.data.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_user])
  console.log(data)
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Header />
      <div className='container mb-5'>
        <div className='d-flex mt-md-5'>
          <button onClick={handleRouter} type='button' className='btn btn-primary btn-withdraw my-3 px-3'>
            Lịch sử giao dịch
          </button>
          <button type='button' className='btn btn-edit my-3 ms-3 px-5'>
            Rút tiền
          </button>
        </div>
        <div className='wrap-support p-3'>
          <div className='d-flex justify-content-between wrap-head-history align-items-center'>
            {/* <h3>Lịch sử rút tiền</h3> */}
            <div></div>
            <button onClick={showModal} type='button' className='btn btn-edit my-3 ms-3 px-4'>
              Tạo yêu cầu rút tiền
            </button>
          </div>
          {Array.isArray(data) && data.length > 0 ? (
            <div className='wrapper-purchased table-custom-history'>
              <Table className='table-pur' dataSource={data} columns={columns} />
            </div>
          ) : (
            <div className='wrapper-purchased'>
              <div className='text-center'>
                <h2 className='mt-5'>BẠN CHƯA CÓ RÚT TIỀN LẦN NÀO!</h2>
              </div>
            </div>
          )}
        </div>
        <Modal title='Rút tiền' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <Require />
        </Modal>
      </div>
      <FooterHome />
    </div>
  )
}

export default Withdraw
