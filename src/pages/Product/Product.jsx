// import Header from '~/layouts/Header/Header'
// import Sidebar from './Sidebar'
// import Footer from '~/layouts/Footer/Footer'
// import Content from './Content'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars } from '@fortawesome/free-solid-svg-icons'
// import { useEffect, useState } from 'react'
// import FooterHome from '../Home/FooterHome'
// import { Link, useParams } from 'react-router-dom'
// import axios from 'axios'
// import { Pagination } from 'antd'

// const Product = () => {
//   const { name_business, name_type } = useParams()
//   const [active, setActive] = useState(1)
//   const [active1, setActive1] = useState(false)
//   const [data, setData] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [pageSize, setPageSize] = useState(10)
//   const [count, setCount] = useState(false)

//   const currentItems = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
//   const handlePageChange = (page, pageSize) => {
//     setCurrentPage(page)
//     setPageSize(pageSize)
//   }
//   useEffect(() => {
//     let api = null
//     if (name_business === 'product') {
//       api = import.meta.env.VITE_API_URL_API_ALL_BOOTH_PRODUCT
//     } else {
//       api = import.meta.env.VITE_API_URL_API_ALL_BOOTH_SERVICE
//     }

//     const nameTypeMapping = {
//       email: 'email',
//       'phan-mem': 'phần mềm',
//       'tai-khoan': 'tài khoản',
//       'dich-vu-phan-mem': 'dịch vụ phần mềm',
//       'tang-tuong-tac': 'tăng tương tác',
//       'block-chain': 'blockchain',
//       khac: 'khác'
//     }

//     axios
//       .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${api}`)
//       .then((response) => {
//         console.log('response', response)
//         if (response && response.data) {
//           let filteredData = response.data.data
//           if (name_type in nameTypeMapping) {
//             if (name_type === 'khac') {
//               setData(filteredData)
//             } else {
//               filteredData = filteredData.filter(
//                 (item) => item.id_boothType.nameBoothTypeLowerCase === nameTypeMapping[name_type]
//               )
//               setData(filteredData)
//             }
//           } else {
//             setData(filteredData)
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [name_business, name_type])
//   console.log(data)
//   return (
//     <div className='wrap-product'>
//       <Header />
//       <div className='container my-3 d-block d-lg-none product-wrap py-3'>
//         <div>
//           <nav aria-label='breadcrumb'>
//             <ol className='breadcrumb'>
//               <li className='breadcrumb-item'>
//                 <Link to={'/'}>Home</Link>
//               </li>
//               <li className='breadcrumb-item'>{data[0]?.id_boothType?.nameBoothType}</li>
//             </ol>
//           </nav>
//         </div>
//         <div className='d-flex'>
//           <div className='d-flex'>
//             <Sidebar data={data} />
//             <h3 className='ms-2'>Gian hàng {data[0]?.id_boothType?.nameBoothTypeLowerCase}</h3>
//           </div>
//         </div>
//         <div className='container'>
//           <div className='head-product p-2 my-3'>
//             Đối với gian hàng không trùng, chúng tôi cam kết sản phẩm được bán ra 1 lần duy nhất trên hệ thống, tránh
//             trường hợp sản phẩm đó được bán nhiều lần.
//           </div>
//           <div className='row'>
//             {Array.isArray(data) && data.length > 0 ? (
//               currentItems.map((da, i) => (
//                 <div key={i} className='col-12 col-xl-6 mb-3'>
//                   <Content product={da} />
//                 </div>
//               ))
//             ) : (
//               <h1>Không có dữ liệu phù hợp</h1>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* <div className='container-fluid my-3 d-none d-lg-block'> */}
//       <div className='container my-3 d-none d-lg-block'>
//         <div>
//           <nav aria-label='breadcrumb'>
//             <ol className='breadcrumb'>
//               <li className='breadcrumb-item'>
//                 <Link to={'/'}>Home</Link>
//               </li>
//               <li className='breadcrumb-item'>{data[0]?.id_boothType?.nameBoothType}</li>
//             </ol>
//           </nav>
//         </div>
//         <div className='d-flex row'>
//           <div className='col-3'>
//             <Sidebar data={data} setData={setData} setCount={setCount} count={count} />
//           </div>
//           {/* <div className='container'> */}
//           <div className='col-9 wrap-product-container py-3'>
//             <div className='container'>
//               <div className='d-flex'>
//                 <h3>Gian hàng {data[0]?.id_boothType?.nameBoothTypeLowerCase}</h3>
//               </div>
//               <div className='head-product p-3 my-3'>
//                 Đối với gian hàng không trùng, chúng tôi cam kết sản phẩm được bán ra 1 lần duy nhất trên hệ thống,
//                 tránh trường hợp sản phẩm đó được bán nhiều lần.
//               </div>
//               {/* <div className='container'> */}
//               <div className='row'>
//                 {Array.isArray(data) && data.length > 0 ? (
//                   currentItems.map((da, i) => (
//                     <div key={i} className='col-12 col-xl-6 mb-3'>
//                       <Content product={da} />
//                     </div>
//                   ))
//                 ) : (
//                   <h1>Không có dữ liệu phù hợp</h1>
//                 )}
//               </div>
//             </div>
//             {/* </div> */}
//           </div>
//         </div>
//       </div>
//       <div className='d-flex justify-content-center'>
//         <Pagination
//           current={currentPage}
//           pageSize={pageSize}
//           onChange={handlePageChange}
//           total={data.length}
//           // showSizeChanger
//           // pageSizeOptions={['10', '20', '30']}
//         />
//       </div>
//       <FooterHome />
//     </div>
//   )
// }

// export default Product
import Header from '~/layouts/Header/Header'
import Sidebar from './Sidebar'
import Footer from '~/layouts/Footer/Footer'
import Content from './Content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import FooterHome from '../Home/FooterHome'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Pagination, Skeleton } from 'antd'
import ChatMessage from '../Message/message'
import './Product.css'
// import { c } from 'vite/dist/node/types.d-aGj9QkWt'

const Product = () => {
  const { name_business, name_type } = useParams()
  const [active, setActive] = useState(1)
  const [active1, setActive1] = useState(false)
  const [originalData, setOriginalData] = useState([]) // Data from API
  const [data, setData] = useState([]) // Filtered data
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isModalMssage, setIsModalMessage] = useState(false)
  const currentItems = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const [roomId, setroomId] = useState()
  const [totalBlock, setTotalBlock] = useState()
  const accessToken = localStorage.getItem('token')

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  // const CreateRoom = async () => {
  //   const firstId = localStorage.getItem('_id')

  //   const idAmin = '6653e82987e75be428b6355a'

  //   const RoomAdmin = await axios.post(
  //     `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CREATE_ROOM}`,
  //     {
  //       members: [firstId, idAmin]
  //     }
  //   )

  //   if (RoomAdmin) {
  //     console.log(RoomAdmin)
  //     setroomId(RoomAdmin.data.data._id)
  //     setTotalBlock(RoomAdmin.data.data.totalBlock)
  //     setIsModalMessage(true)
  //   }
  // }

  const CreateRoom = async () => {
    // const roomCreated = roomId

    // if (roomId) {
    //   setIsModalMessage(true)
    //   return
    // }

    const firstId = localStorage.getItem('_id')

    const idAmin = '6653e82987e75be428b6355a'

    try {
      const RoomAdmin = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_CREATE_ROOM}`,
        {
          members: [firstId, idAmin]
        },
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        }
      )

      if (RoomAdmin) {
        console.log(RoomAdmin)
        setroomId(RoomAdmin.data.data._id)
        setTotalBlock(RoomAdmin.data.data.totalBlock)
        setIsModalMessage(true)
      }
    } catch (error) {
      console.error('Error creating room:', error)
    }
  }

  // useEffect(() => {
  //   let api = null
  //   if (name_business === 'product') {
  //     api = import.meta.env.VITE_API_URL_API_ALL_BOOTH_PRODUCT
  //   } else {
  //     api = import.meta.env.VITE_API_URL_API_ALL_BOOTH_SERVICE
  //   }

  //   const nameTypeMapping = {
  //     email: 'email',
  //     'phan-mem': 'phần mềm',
  //     'tai-khoan': 'tài khoản',
  //     'dich-vu-phan-mem': 'dịch vụ phần mềm',
  //     'tang-tuong-tac': 'tăng tương tác',
  //     'block-chain': 'blockchain',
  //     khac: 'khác'
  //   }
  //   setLoading(true)
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${api}`)
  //     .then((response) => {
  //       if (response && response.data) {
  //         let filteredData = response.data.data
  //         if (name_type in nameTypeMapping) {
  //           if (name_type === 'khac') {
  //             setOriginalData(filteredData)
  //             setData(filteredData)
  //           } else {
  //             filteredData = filteredData.filter(
  //               (item) => item.id_boothType.nameBoothTypeLowerCase === nameTypeMapping[name_type]
  //             )
  //             setOriginalData(filteredData)
  //             setData(filteredData)
  //           }
  //         } else {
  //           setOriginalData(filteredData)
  //           setData(filteredData)
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [name_business, name_type])
  useEffect(() => {
    let api = null
    if (name_business === 'product') {
      api = import.meta.env.VITE_API_URL_API_ALL_BOOTH_PRODUCT
    } else {
      api = import.meta.env.VITE_API_URL_API_ALL_BOOTH_SERVICE
    }

    const nameTypeMapping = {
      email: 'email',
      'phan-mem': 'phần mềm',
      'tai-khoan': 'tài khoản',
      'dich-vu-phan-mem': 'dịch vụ phần mềm',
      'tang-tuong-tac': 'tăng tương tác',
      'block-chain': 'blockchain',
      khac: 'khác'
    }

    setLoading(true)
    axios
      .get(`${import.meta.env.VITE_API_URL_BACKEND_URL}${api}`)
      .then((response) => {
        if (response && response.data) {
          let filteredData = response.data.data.filter((item) => item.statusBooth === 'Approved')

          if (name_type in nameTypeMapping) {
            filteredData = filteredData.filter(
              (item) => item.id_boothType.nameBoothTypeLowerCase === nameTypeMapping[name_type]
            )
          }
          setOriginalData(filteredData)
          setData(filteredData)
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [name_business, name_type])
  console.log('data', data)
  return (
    <div className='wrap-product'>
      <Header />
      <div className='container my-3 d-block d-lg-none product-wrap py-3'>
        <div>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className='breadcrumb-item'>{data[0]?.id_boothType?.nameBoothType}</li>
            </ol>
          </nav>
        </div>
        <div className='d-flex'>
          <div className='d-flex title-product'>
            <Sidebar originalData={originalData} setData={setData} setCount={setCount} />
            <h3 className='ms-2 '>Gian hàng {data[0]?.id_boothType?.nameBoothTypeLowerCase}</h3>
          </div>
        </div>
        <div className='container'>
          <div className='head-product p-2 my-3'>
            Đối với gian hàng không trùng, chúng tôi cam kết sản phẩm được bán ra 1 lần duy nhất trên hệ thống, tránh
            trường hợp sản phẩm đó được bán nhiều lần.
          </div>
          <div className='row'>
            {Array.isArray(currentItems) && currentItems.length > 0 ? (
              currentItems.map((da, i) => (
                <div key={i} className='col-12 col-xl-6 mb-3'>
                  <Skeleton loading={loading}>
                    <Content product={da} />
                  </Skeleton>
                </div>
              ))
            ) : (
              <h2>Không có dữ liệu phù hợp</h2>
            )}
          </div>
        </div>
      </div>
      <div className='container d-none d-lg-block'>
        <div>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className='breadcrumb-item'>{data[0]?.id_boothType?.nameBoothType}</li>
            </ol>
          </nav>
        </div>
        <div className='d-flex row'>
          <div className='col-3'>
            <Sidebar originalData={originalData} setData={setData} setCount={setCount} />
          </div>
          <div className='col-9 wrap-product-container py-3'>
            <div className='container'>
              <div className='d-flex'>
                <h3>Gian hàng {data[0]?.id_boothType?.nameBoothTypeLowerCase}</h3>
              </div>
              <div className='head-product p-3 my-3'>
                Đối với gian hàng không trùng, chúng tôi cam kết sản phẩm được bán ra 1 lần duy nhất trên hệ thống,
                tránh trường hợp sản phẩm đó được bán nhiều lần.
              </div>
              <div className='row'>
                {Array.isArray(currentItems) && currentItems.length > 0 ? (
                  currentItems.map((da, i) => (
                    <div key={i} className='col-12 col-xl-6 mb-3'>
                      <Skeleton loading={loading}>
                        <Content product={da} />
                      </Skeleton>
                    </div>
                  ))
                ) : (
                  <h2>Không có dữ liệu phù hợp</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center py-3'>
        <Pagination current={currentPage} pageSize={pageSize} onChange={handlePageChange} total={data.length} />
      </div>
      {totalBlock && roomId ? (
        <>
          <ChatMessage
            isModalVisible={isModalMssage}
            setIsModalMessage={setIsModalMessage}
            idRoom={roomId}
            totalBlock={totalBlock}
          />
        </>
      ) : (
        <div></div>
      )}
      <FooterHome />

      <div className='echbay-sms-messenger style-for-position-br'>
        <div className='phonering-alo-sms' onClick={CreateRoom}>
          <a rel='nofollow' className='echbay-phonering-sms-event'>
            <img src='/Vector.png' alt='Telegram' height={30}></img>
          </a>
        </div>
        <div className='phonering-alo-zalo'>
          <a href='https://zalo.me/0903123456' target='_blank' rel='nofollow' className='echbay-phonering-zalo-event'>
            .
          </a>
        </div>
      </div>
    </div>
  )
}

export default Product
