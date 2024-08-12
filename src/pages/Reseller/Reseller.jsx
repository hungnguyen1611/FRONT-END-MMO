import { notification, Table, Tooltip } from 'antd'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment'

import FooterHome from '../Home/FooterHome'

const Reseller = () => {
  const id = useSelector((state) => state.auth._id)
  const accessToken = localStorage.getItem('token')
  console.log(id)
  const navigate = useNavigate()
  const handleRouter = () => navigate('/reseller-order')
  const [data, setData] = useState([])
  // const dataSource = [
  //   {
  //     key: '1',
  //     date: '10-02-2024',
  //     type: 'Mua hàng',
  //     price: '-30.000',
  //     reason: 'Thanh toán cho đơn hàng SDKHGDKJDS15'
  //   },
  //   {
  //     key: '1',
  //     date: '10-02-2024',
  //     type: 'Mua hàng',
  //     price: '-30.000',
  //     reason: 'Thanh toán cho đơn hàng SDKHGDKJDS15'
  //   }
  // ]
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_RESELLER_ID_RESELLER}${id}`, {
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('response', response)
        if (response && response.data && response.data.data) {
          setData(response.data.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  console.log(data)
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard')
        notification.success({
          message: 'Copy link.',
          duration: 2
        })
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }
  const columns = [
    {
      title: 'Gian hàng',
      dataIndex: '',
      key: 'a',
      render: (a) => <>{a?.id_boothService?.nameBooth || a?.id_boothProduct?.nameBooth}</>
    },
    // {
    //   title: 'Link Reseller',
    //   dataIndex: 'type',
    //   key: 'type'
    // },
    {
      title: 'Link Reseller',
      dataIndex: '',
      key: 'link',
      render: (a) => (
        <Tooltip title={a.linkReseller}>
          <div
            style={{
              width: '120px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer'
            }}
            onClick={() => copyToClipboard(a.linkReseller)}
          >
            {a.linkReseller}
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Chiếc khấu(%)',
      dataIndex: '',
      key: 'percent',
      render: (a) => <>{a.percent}</>
    },

    {
      title: 'Ngày yêu cầu',
      dataIndex: '',
      key: '',
      // render: (a) => <>{a.createdAt}</>
      render: (a) => <>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</>
    },

    {
      title: 'Trạng thái',
      dataIndex: '',
      key: 'status',
      render: (a) => (
        <>
          {a?.statusReseller === 'approved'
            ? 'Đã duyệt'
            : a?.statusReseller === 'Pending'
              ? 'Chưa giải quyết'
              : a?.statusReseller === 'Cancel'
                ? 'Hủy bỏ'
                : a?.statusReseller === 'complain'
                  ? 'Bị phàn nàn'
                  : a?.statusReseller === 'Dispute'
                    ? 'Đang tranh chấp'
                    : a?.statusReseller === 'Completed'
                      ? 'Hoàn thành'
                      : a?.statusReseller === 'Finish'
                        ? 'Kết thúc'
                        : ''}
        </>
      )
    }
  ]
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Header />
      <div className='container'>
        <div className='d-flex'>
          {/* <button type='button' className='btn btn-primary btn-primary-bg my-3'> */}
          <button type='button' className='btn-primary-bg-order btn btn-primary me-3 px-5 my-3'>
            Danh sách
          </button>
          <button
            onClick={handleRouter}
            type='button'
            className='bg-orange-order btn btn-primary btn-primary-blue my-3 ms-3 px-5'
          >
            Lịch sử
          </button>
        </div>
        <div className='wrap-support p-3 mb-3'>
          <div className='d-flex justify-content-between wrap-head-history align-items-center'>
            <h3>Gian hàng Reseller</h3>
            {/* <button type='button' className='btn btn-primary btn-primary-bg my-3 ms-3'>
              Tổng tiền tạm giữ: 0
            </button> */}
          </div>
          {Array.isArray(data) && data.length > 0 ? (
            <div className='wrapper-purchased'>
              <Table className='table-pur' dataSource={data} columns={columns} />
            </div>
          ) : (
            <div className='wrapper-purchased'>
              <div className='text-center'>
                <h2 className='mt-5'>BẠN CHƯA CÓ HỢP TÁC VỚI GIAN HÀNG NÀO!</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterHome />
    </div>
  )
}

export default Reseller
