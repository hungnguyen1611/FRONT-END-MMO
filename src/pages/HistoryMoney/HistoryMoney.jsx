import { Table } from 'antd'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import { useNavigate } from 'react-router-dom'
import FooterHome from '../Home/FooterHome'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment'

const HistoryMoney = () => {
  const navigate = useNavigate()
  const handleRouter = () => navigate('/withdraw')
  const id_user = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')
  const [data, setData] = useState([])

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'time',
      key: 'time',
      render: (a) => <>{moment(a?.time).format('DD-MM-YYYY HH:mm')}</>
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Số tiền',
      // dataIndex: 'a',
      key: 'a',
      render: (a) => <>{a?.amount?.toLocaleString()}</>
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason'
    }
  ]
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_ALL_HISTORY_BY_USER}${id_user}`,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           token: `Bearer ${accessToken}`
  //         }
  //       }
  //     )
  //     .then((response) => {
  //       if (response && response.data) {
  //         setData(response.data.data)
  //         console.log(response.data.data)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [id_user])
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_TRANSACTION_BY_USER}${id_user}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
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
  }, [])
  console.log(data)
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Header />
      <div className='container'>
        <div className='d-flex mt-md-5'>
          <button type='button' className='btn btn-edit my-3 px-3'>
            Lịch sử giao dịch
          </button>
          <button onClick={handleRouter} type='button' className='btn btn-primary btn-withdraw my-3 ms-3 px-5'>
            Rút tiền
          </button>
        </div>
        <div className='wrap-support p-3 mb-5'>
          <div className='d-flex justify-content-between wrap-head-history align-items-center'>
            {/* <h3>Lịch sử giao dịch</h3> */}
            <div></div>
            <button type='button' className='btn btn-edit my-3 ms-3 px-4'>
              Tổng tiền tạm giữ: 0
            </button>
          </div>
          {Array.isArray(data) && data.length > 0 ? (
            <div className='wrapper-purchased'>
              <Table className='table-pur table-custom-history' dataSource={data} columns={columns} />
            </div>
          ) : (
            <div className='wrapper-purchased'>
              <div className='text-center'>
                <h2 className='mt-5'>BẠN CHƯA CÓ GIAO DỊCH NÀO!</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterHome />
    </div>
  )
}

export default HistoryMoney
