// import axios from 'axios'
// import { Fragment, useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import success from '~/assets/img/success.png'

// const VerifyEmail = () => {
//   const [validUrl, setValidUrl] = useState(true)
//   const param = useParams()

//   useEffect(() => {
//     const verifyEmailUrl = async () => {
//       try {
//         // const url = `http://localhost:8082/api/users/${param.id}/verify/${param.token}`
//         const url = `http://localhost:3026/api/${param.id}/verify/${param.token}`

//         const { data } = await axios.get(url)
//         console.log('data', data)
//         console.log('url', url)
//         setValidUrl(true)
//         return
//       } catch (error) {
//         console.log(error)
//         setValidUrl(false)
//         return
//       }
//     }
//     verifyEmailUrl()
//   }, [])
//   // useEffect(() => {
//   //   axios
//   //     .get(`http://localhost:3026/api/${param.id}/verify/${param.token}`)
//   //     .then((response) => {
//   //       console.log(response)
//   //       setValidUrl(true)
//   //     })
//   //     .catch((error) => {
//   //       setValidUrl(false)
//   //       console.log(error)
//   //     })
//   // }, [param])
//   return (
//     <Fragment>
//       {validUrl ? (
//         <div
//           style={{ minHeight: '50vh' }}
//           className='container d-flex flex-column justify-content-center align-items-center'
//         >
//           <img src={success} alt='success_img' />
//           <h1>Email verified successfully</h1>
//           <Link to='/'>
//             <button className='green_btn'>Login</button>
//           </Link>
//         </div>
//       ) : (
//         <div
//           style={{ minHeight: '50vh' }}
//           className='container d-flex flex-column justify-content-center align-items-center'
//         >
//           <h1>Đường dẫn đã quá thời gian, vui lòng gởi lại đường dẫn mới</h1>
//           <button type='button' className='btn btn-primary ms-2 my-2'>
//             Nhận đường dẫn mới!
//           </button>
//         </div>
//       )}

//       {/* {validUrl ? "Please wait or click the link if you haven't yet." : 'Link has expired or is invalid.'} */}
//     </Fragment>
//   )
// }

// export default VerifyEmail
import axios from 'axios'
import { Fragment, useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import success from '~/assets/img/success.png'

const VerifyEmail = () => {
  const [validUrl, setValidUrl] = useState(false)
  const param = useParams()
  const hasRunOnce = useRef(false)

  useEffect(() => {
    if (!hasRunOnce.current) {
      const verifyEmailUrl = async () => {
        try {
          const url = `${import.meta.env.VITE_API_URL_BACKEND_URL}api/${param.id}/verify/${param.token}`

          const { data } = await axios.get(url)
          console.log('data', data)
          console.log('url', url)
          setValidUrl(true)
        } catch (error) {
          console.log(error)
          setValidUrl(false)
        }
      }
      verifyEmailUrl()
      hasRunOnce.current = true
    }
  }, []) // Dependency array vẫn là rỗng
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(param.id)
    try {
      const res = await axios.post(
        // eslint-disable-next-line no-undef
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_BACK_TOKEN}`,
        {
          _id: param.id
        }
      )
      console.log('res', res)
    } catch (error) {
      console.log(error)
    }
    // await doCreateUserWithEmailAndPassword(gmail, password)
  }
  return (
    <Fragment>
      {validUrl ? (
        <div
          style={{ minHeight: '50vh' }}
          className='container d-flex flex-column justify-content-center align-items-center'
        >
          <img src={success} alt='success_img' />
          <h1>Email verified successfully</h1>
          <Link to='/'>
            <button className='green_btn'>Login</button>
          </Link>
        </div>
      ) : (
        <div
          style={{ minHeight: '50vh' }}
          className='container d-flex flex-column justify-content-center align-items-center'
        >
          <h1>Đường dẫn đã quá thời gian, vui lòng gởi lại đường dẫn mới</h1>
          <button onClick={handleSubmit} type='button' className='btn btn-primary ms-2 my-2'>
            Nhận đường dẫn mới!
          </button>
        </div>
      )}
    </Fragment>
  )
}

export default VerifyEmail
