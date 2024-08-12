import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

import HeaderSell from '~/layouts/HeaderSell/HeaderSell'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import './StoreManagement.css'
import storedata from './StoreData'

import folder from '../../../assets/img/folder.png'
import edit from '../../../assets/img/edit.png'
import checkicon from '../../../assets/img/check.png'
import removeicon from '../../../assets/img/remove.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import EditProduct from './NewProduct/EditProduct'
import NewProduct from './NewProduct/NewProduct'
import { Modal, Pagination } from 'antd'
import EditStore from './AddStore/EditStore'
import remove from '../../../assets/img/remove.png'
import DeleteStore from './AddStore/DeleteStore'
import LazyImage from '~/hooks/LazyImage/LazyImage'
import moment from 'moment'
import { useQuery } from 'react-query'

const fetchStoreData = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BOOTH_USER}${id}`
  )
  return data.data
}

const StoreManagement = () => {
  const id = useSelector((state) => state.auth._id)
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const navigate = useNavigate()
  const [filteredArr, setFilteredArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  // const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [openStore, setOpenStore] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  const handleClose = () => setShow(false)
  const handleShow = (item) => {
    setCurrentItem(item)
    setShow(true)
  }
  const showModal = (item) => {
    setSelectedItem(item)
    setOpen(true)
  }
  const showStoreModal = (item) => {
    setSelectedItem(item)
    setOpenStore(true)
  }
  const showDeleteModal = (item) => {
    setSelectedItem(item)
    setOpenDelete(true)
  }
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = (item) => {
    setCurrentItem(item)
    setShowEdit(true)
  }
  const { data, isLoading, error, refetch } = useQuery(['storeData', id], () => fetchStoreData(id))
  useEffect(() => {
    if (!openDelete || !openStore) {
      refetch()
    }
  }, [openDelete, refetch, openStore])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log('data1', data)
  const handleProduct = () => {
    setCount(0)
    setCurrentPage(1)
  }
  const handleService = () => {
    setCount(1)
    setCurrentPage(1)
  }
  const handleCancel = () => {
    setOpen(false)
    setOpenStore(false)
    setOpenDelete(false)
  }
  const currentItems =
    Array.isArray(data) && data.length > 0
      ? data[count].slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : []
  // const currentItems =
  //   Array.isArray(data) && data?.length > 0
  //     ? [...data[count]]?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  //     : []
  console.log('select', count)
  return (
    <div className=''>
      <HeaderSell />
      <div className='w-100 d-flex'>
        <SidebarSell />
        <div className='w-100 wrap-store-all'>
          <div className='border mt-5 mt-xl-0 p-2 w-100'>
            <div className='d-flex justify-content-between align-items-center'>
              <h3>Gian hàng của bạn</h3>
              <div className=''>
                <button
                  type='button'
                  className='btn btn-success btn-sm float-end px-md-3 py-md-2'
                  onClick={() => navigate('/store/management/addstore')}
                >
                  + Thêm
                </button>
              </div>
            </div>
            <div className='d-md-flex d-none'>
              <button
                onClick={handleProduct}
                type='button'
                // className=`${count === 0 ? 'btn-primary-bg' : ''}${btn btn-primary my-3}`
                className={`${count === 0 ? 'btn-buy-detail' : 'btn-seller-primary'} btn  my-3 me-3`}
              >
                Gian hàng sản phẩm
              </button>
              <button
                onClick={handleService}
                type='button'
                // className='btn btn-primary btn-primary-blue my-3 ms-3'
                className={`${count === 1 ? 'btn-buy-detail' : 'btn-seller-primary'} btn my-3`}
              >
                Gian hàng dịch vụ
              </button>
            </div>
            <div className='d-flex d-md-none'>
              <button
                onClick={handleProduct}
                type='button'
                // className=`${count === 0 ? 'btn-primary-bg' : ''}${btn btn-primary my-3}`
                className={`${count === 0 ? 'btn-buy-detail' : 'btn-seller-primary'} btn  my-3 me-3`}
              >
                Sản phẩm
              </button>
              <button
                onClick={handleService}
                type='button'
                // className='btn btn-primary btn-primary-blue my-3 ms-3'
                className={`${count === 1 ? 'btn-buy-detail' : 'btn-seller-primary'} btn my-3`}
              >
                Dịch vụ
              </button>
            </div>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr className='custom-header'>
                    <th scope='col'>Ảnh</th>
                    <th scope='col'>Tên gian hàng</th>
                    <th scope='col'>Loại</th>
                    <th scope='col'>Mô tả ngắn</th>
                    {/* <th scope='col'>Reseller</th> */}
                    <th scope='col'>Ngày tạo</th>
                    <th scope='col'>Trạng thái</th>
                    <th scope='col'>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && data?.length > 0 ? (
                    currentItems.map((a, i) => (
                      <tr key={i} className='mb-2'>
                        <td>
                          <LazyImage className='store-img' style={{ width: '100%' }} src={a?.imageBooth[0]} alt='img' />
                        </td>
                        <td className='name-booth'>
                          <Link className='name-booth' to={`/detail/${a?.id_businessType?._id}/booth/${a?._id}`}>
                            {a?.nameBooth}
                          </Link>
                        </td>
                        <td>{a?.id_boothType?.nameBoothType}</td>
                        <td className='service-booth'>{a?.shortDesc}</td>
                        {/* <td>{a.items}</td> */}
                        <td>{moment(a?.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                        <td>
                          <span style={{ color: 'orange' }}>
                            {a?.statusBooth === 'Approved'
                              ? 'Đã duyệt'
                              : a?.statusBooth === 'Pending'
                                ? 'Đang đợi'
                                : ''}
                          </span>
                        </td>
                        {/* <td className='d-flex gap-3'>
                        <img style={{ width: '40%', height: 'auto' }} src={messenger} alt='' />
                        <img style={{ width: '40%', height: 'auto' }} src={remove} alt='' />
                      </td> */}
                        <td>
                          <div className='d-flex flex-wrap gap-3'>
                            <img
                              src={edit}
                              alt=''
                              className='w-100 h-100 cursor'
                              style={{ maxWidth: '20px', maxHeight: '20px' }}
                              onClick={() => showStoreModal(a)}
                            />
                            <img
                              src={folder}
                              alt=''
                              className='w-100 h-100 cursor'
                              style={{ maxWidth: '20px', maxHeight: '20px' }}
                              onClick={() => showModal(a)}
                            />
                            <img
                              src={remove}
                              alt=''
                              className='w-100 h-100 cursor'
                              style={{ maxWidth: '20px', maxHeight: '20px' }}
                              onClick={() => showDeleteModal(a)}
                            />
                          </div>
                        </td>
                        {/* </div> */}
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
            <Modal open={open} onCancel={handleCancel} footer={null}>
              <NewProduct id={selectedItem?._id} id_business={selectedItem?.id_businessType?._id} />
            </Modal>
            <Modal className='width-modal' open={openStore} onCancel={handleCancel} footer={null}>
              <EditStore
                onCancel={handleCancel}
                id={selectedItem?._id}
                id_business={selectedItem?.id_businessType?._id}
                showEdit={openStore}
              />
            </Modal>
            <Modal className='width-modal' open={openDelete} onCancel={handleCancel} footer={null}>
              <DeleteStore
                handleCancel={handleCancel}
                id={selectedItem?._id}
                id_business={selectedItem?.id_businessType?._id}
              />
            </Modal>
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            onChange={handlePageChange}
            // total={data[count]?.length || 0}
            total={Array.isArray(data) ? data[count]?.length : 0}
            showSizeChanger
            pageSizeOptions={['10', '20', '30']}
          />
        </div>
      </div>
    </div>
  )
}

export default StoreManagement
