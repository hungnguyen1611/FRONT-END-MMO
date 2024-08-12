// import './SidebarSell.css'
// import iconBar from '../../assets/img/menu.png'
// import logo from '~/assets/img/logo.png'
// import React, { useState, useEffect } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { LuComponent } from 'react-icons/lu'

// const MenuItem = ({ href, active, text, icon }) => (
//   <li className='nav-item'>
//     <NavLink to={href} className={`nav-link ${active ? 'active' : 'text-black'}`}>
//       <svg className='bi pe-none me-2' width='16' height='16'>
//         {/* <svg xmlns='http://www.w3.org/2000/svg' className='d-none'>
//           <symbol id='bootstrap' viewBox='0 0 118 94'>
//             <title>Bootstrap</title>
//             <path
//               fillRule='evenodd'
//               clipRule='evenodd'
//               d='M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z'
//             ></path>
//           </symbol>
//           <symbol id='home' viewBox='0 0 16 16'>
//             <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z' />
//           </symbol>
//           <symbol id='speedometer2' viewBox='0 0 16 16'>
//             <path d='M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z' />
//             <path
//               fillRule='evenodd'
//               d='M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z'
//             />
//           </symbol>
//           <symbol id='table' viewBox='0 0 16 16'>
//             <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z' />
//           </symbol>
//           <symbol id='people-circle' viewBox='0 0 16 16'>
//             <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
//             <path
//               fillRule='evenodd'
//               d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
//             />
//           </symbol>
//           <symbol id='grid' viewBox='0 0 16 16'>
//             <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z' />
//           </symbol>
//         </svg>
//         <svg xmlns='http://www.w3.org/2000/svg' className='d-none'>
//           <symbol id='bi-hdd-stack-fill' viewBox='0 0 16 16'>
//             <path d='M1 4h14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1zm15 3a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7zm0 5a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1z' />
//           </symbol>
//         </svg> */}
//         <svg xmlns='http://www.w3.org/2000/svg' className='d-none'>
//           <symbol id='home' viewBox='0 0 16 16'>
//             <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z' />
//           </symbol>
//           <symbol id='grid' viewBox='0 0 16 16'>
//             <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z' />
//           </symbol>
//           <symbol id='speedometer2' viewBox='0 0 16 16'>
//             <path d='M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z' />
//             <path
//               fillRule='evenodd'
//               d='M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z'
//             />
//           </symbol>
//           <symbol id='bi-hdd-stack-fill' viewBox='0 0 16 16'>
//             <path d='M1 4h14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1zm15 3a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7zm0 5a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1z' />
//           </symbol>
//           <symbol id='bi-building-exclamation' viewBox='0 0 16 16'>
//             <path d='M1 13.5v-10a1 1 0 0 1 1-1H2V2.5a1.5 1.5 0 1 1 3 0V2h6v-.5a1.5 1.5 0 1 1 3 0V2h.293a1 1 0 0 1 .707.293l.5.5a1 1 0 0 1 .207.707V12a1 1 0 0 1-1 1v.5a.5.5 0 0 1-1 0V13H1v.5a.5.5 0 0 1-1 0v-.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1V3H2v-.5A1.5 1.5 0 1 1 4 3V2h1v-.5a1.5 1.5 0 1 1 3 0V2h1v-.5a1.5 1.5 0 1 1 3 0V2h1v-.5A1.5 1.5 0 1 1 16 2V2h-.293a1 1 0 0 1-.707-.293l-.5-.5A1 1 0 0 1 15 2H1zm14 11.5H1v-10h14v10zm-5.5-2a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2h-1a1 1 0 0 0-1 1zm-.854-.646a.5.5 0 0 1 .707.707L8 11.207l1.646 1.647a.5.5 0 0 1-.707.707l-1.646-1.647-1.646 1.647a.5.5 0 0 1-.707-.707L7.293 11 5.646 9.354a.5.5 0 1 1 .707-.707L8 10.293l1.646-1.647z' />
//           </symbol>
//           <symbol id='bi-share-fill' viewBox='0 0 16 16'>
//             <path d='M11.267 7.467c.258-.485.425-1.034.469-1.61C13.055 5.44 14 4.645 14 3.5a2.5 2.5 0 1 0-5 0 2.49 2.49 0 0 0 .467 1.469 1 1 0 1 0-.233.804 2.51 2.51 0 0 0 1.033.23c.67 0 1.297-.276 1.733-.732zm.567-1.467a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm-2.567 6.267a1.5 1.5 0 1 0 3 0 1.49 1.49 0 0 0-.469-1.033 1 1 0 1 0-.233-.804 2.51 2.51 0 0 0-1.033.23 2.51 2.51 0 0 0-.467 1.469zm.933-.267a1 1 0 1 0 1 1 1 1 0 0 0-1-1zM4 8a2.49 2.49 0 0 0 1.469-.467 1 1 0 1 0 .804-.233A2.51 2.51 0 0 0 7.5 5a2.5 2.5 0 1 0-3.5 3zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1zm5.267 7.467a2.49 2.49 0 0 0-1.469-.467 1 1 0 1 0-.804.233A2.51 2.51 0 0 0 5.5 11a2.5 2.5 0 1 0 3.5-3zm0 4a1 1 0 1 0-1-1 1 1 0 0 0 1 1zM3.267 5.467a2.49 2.49 0 0 0 1.469-.467 1 1 0 1 0 .804-.233A2.51 2.51 0 0 0 6.5 3a2.5 2.5 0 1 0-3.5 3zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1z' />
//           </symbol>
//           <symbol id='bi-bell-fill' viewBox='0 0 16 16'>
//             <path d='M8 16a2 2 0 0 1-1.985-1.75h3.97A2 2 0 0 1 8 16zm.5-1.75h-1A1.5 1.5 0 0 1 6 12.75h4a1.5 1.5 0 0 1-1.5 1.5zM8 1.75A4.48 4.48 0 0 0 4.75 5c0 1.215-.487 2.588-1.235 3.59-.768 1.03-.989 2.212-1.168 3.275H13.65c-.18-1.063-.4-2.245-1.168-3.275C10.737 7.588 10.25 6.215 10.25 5A4.48 4.48 0 0 0 8 1.75zm-4 3.25A3.5 3.5 0 0 1 8 2.5 3.5 3.5 0 0 1 12 5a5.016 5.016 0 0 0 1 3.25c.756 1.015.976 2.166 1.154 3.212h-10.32c.178-1.046.398-2.197 1.154-3.212A5.016 5.016 0 0 0 4 5zm4-2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' />
//           </symbol>
//           <symbol id='bi-receipt' viewBox='0 0 16 16'>
//             <path d='M7 1a1 1 0 0 1 .5.133A1 1 0 0 1 8 1a1 1 0 0 1 .5.133A1 1 0 0 1 9 1a1 1 0 0 1 .5.133A1 1 0 0 1 10 1a1 1 0 0 1 .5.133A1 1 0 0 1 11 1a1 1 0 0 1 .5.133A1 1 0 0 1 12 1a1 1 0 0 1 .5.133A1 1 0 0 1 13 1a1 1 0 0 1 .5.133A1 1 0 0 1 14 1a1 1 0 0 1 .5.133A1 1 0 0 1 15 1a1 1 0 0 1 .5.133V15c0 .223-.21.387-.432.267L14 14.5l-.5.5a1 1 0 0 1-1 0L12 14.5l-.5.5a1 1 0 0 1-1 0L10 14.5l-.5.5a1 1 0 0 1-1 0L8 14.5l-.5.5a1 1 0 0 1-1 0L6 14.5l-.5.5a1 1 0 0 1-1 0L4 14.5l-.5.5a1 1 0 0 1-1 0L2 14.5l-.568.267A.25.25 0 0 1 1 15V1.133A1 1 0 0 1 1.5 1a1 1 0 0 1 .5-.133A1 1 0 0 1 3 1a1 1 0 0 1 .5-.133A1 1 0 0 1 4 1a1 1 0 0 1 .5-.133A1 1 0 0 1 5 1a1 1 0 0 1 .5-.133A1 1 0 0 1 6 1a1 1 0 0 1 .5-.133A1 1 0 0 1 7 1zm-4 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 7zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z' />
//           </symbol>
//         </svg>

//         <use xlinkHref={`#${icon}`} />
//       </svg>
//       {text}
//     </NavLink>
//   </li>
// )

// const SidebarSell = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen)
//   }

//   useEffect(() => {
//     const mainElement = document.querySelector('main')
//     if (mainElement) {
//       if (isSidebarOpen) {
//         mainElement.style.marginLeft = '0px'
//       } else {
//         mainElement.style.marginLeft = '-280px'
//       }
//     }
//   }, [isSidebarOpen])

//   return (
//     <div className='App position-relative side-wrap'>
//       <main className='d-flex flex-nowrap '>
//         <div
//           className='d-flex flex-column flex-shrink-0 p-3 side-bar-responsive'
//           // style={{ width: '280px', minHeight: '100vh' }}
//         >
//           {/* <a href='/' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
//             <svg className='bi pe-none me-2' width='40' height='32'>
//               <use xlinkHref='#bootstrap' />
//             </svg>
//             <span className='fs-4'>taphoammo.net</span>
//           </a> */}
//           {/* <Link className='navbar-brand nav-logo d-block' to='/'>
//             {' '}
//             <img style={{ width: '100%' }} src={logo} alt='logo'></img>
//           </Link>
//           <hr /> */}
//           {/* <ul className='nav nav-pills flex-column'>
//             <li className='nav-item'>
//               <span>Sales</span>
//               <MenuItem href='/store/management/salesstore' text='Sales' icon='home' />
//             </li>
//           </ul> */}
//           {/* <hr /> */}
//           <ul className='nav nav-pills flex-column mb-auto side-bar-cell'>
//             <li style={{ textAlign: 'justify' }} className='nav-item'>
//               {/* <span>Shop</span> */}
//               <MenuItem href='/store/dashboard' text='Dashboard' icon='home' />
//               <MenuItem href='/store/management' text='Quản lý gian hàng' icon='bi-grid-fill' />
//               <MenuItem href='/store/product' text='Đơn sản phẩm' icon='speedometer2' />
//               <MenuItem href='/store/service' text='Đơn dịch vụ' icon='bi-hdd-stack-fill' />
//               {/* <MenuItem href='/store/reserve' text='Đặt trước' icon='grid' /> */}
//               <MenuItem href='/store/complain' text='Khiếu nại' icon='bi-building-exclamation' />
//               <MenuItem href='/store/reseller' text='Quản lý Reseller' icon='bi-share-fill' />
//               <MenuItem href='/store/onesignal' text='Thêm thông báo' icon='bi-bell-fill' />
//               {/* <MenuItem href='/store/evaluate' text='Đánh giá' icon='people-circle' /> */}
//               <MenuItem href='/store/coupon' text='Mã giảm giá' icon='bi-receipt' />
//               {/* <MenuItem href='/' text='Gian hàng Top 1' icon='people-circle' /> */}
//             </li>
//           </ul>
//           <hr />
//         </div>

//         <div
//           className='position-absolute btn-openMenu d-flex align-items-center btn-po d-lg-flex'
//           onClick={toggleSidebar}
//           style={{ height: '70px' }}
//         >
//           <div className=''>
//             <img src={iconBar} alt='' className='' style={{ width: '24px' }} />
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default SidebarSell
// // import './SidebarSell.css'
// // import iconBar from '../../assets/img/menu.png'
// // import logo from '~/assets/img/logo.png'
// // import React, { useState, useEffect } from 'react'
// // import { Link, NavLink } from 'react-router-dom'

// // const MenuItem = ({ href, text, icon }) => (
// //   <li className='nav-item'>
// //     <NavLink to={href} className='nav-link'>
// //       <svg className='bi pe-none me-2' width='16' height='16'>
// //         <use xlinkHref={`#${icon}`} />
// //       </svg>
// //       {text}
// //     </NavLink>
// //   </li>
// // )

// // const SidebarSell = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen)
// //   }

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth > 1024) {
// //         setIsSidebarOpen(true)
// //       } else {
// //         setIsSidebarOpen(false)
// //       }
// //     }

// //     window.addEventListener('resize', handleResize)
// //     handleResize() // call initially to set the correct state

// //     return () => {
// //       window.removeEventListener('resize', handleResize)
// //     }
// //   }, [])

// //   return (
// //     <div className={`App position-relative side-wrap ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //       <main className='d-flex flex-nowrap'>
// //         <div className={`d-flex flex-column flex-shrink-0 p-3 side-bar-responsive ${isSidebarOpen ? '' : 'd-none'}`}>
// //           <Link className='navbar-brand nav-logo d-block' to='/'>
// //             <img style={{ width: '100%' }} src={logo} alt='logo' />
// //           </Link>
// //           <hr />
// //           <ul className='nav nav-pills flex-column mb-auto'>
// //             <MenuItem href='/store/management' text='Quản lý gian hàng' icon='home' />
// //             <MenuItem href='/store/product' text='Đơn sản phẩm' icon='speedometer2' />
// //             <MenuItem href='/store/service' text='Đơn dịch vụ' icon='bi-hdd-stack-fill' />
// //             <MenuItem href='/store/complain' text='Khiếu nại' icon='bi-building-exclamation' />
// //             <MenuItem href='/store/reseller' text='Quản lý Reseller' icon='people-circle' />
// //             <MenuItem href='/store/coupon' text='Mã giảm giá' icon='people-circle' />
// //           </ul>
// //           <hr />
// //         </div>
// //         <div
// //           className='position-absolute btn-openMenu d-flex align-items-center btn-po'
// //           onClick={toggleSidebar}
// //           style={{ height: '70px' }}
// //         >
// //           <img src={iconBar} alt='menu icon' style={{ width: '24px' }} />
// //         </div>
// //       </main>
// //     </div>
// //   )
// // }

// // export default SidebarSell
import './SidebarSell.css'
import iconBar from '../../assets/img/menu.png'
import logo from '~/assets/img/logo.png'
import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LuComponent } from 'react-icons/lu'

const MenuItem = ({ href, active, text, icon }) => (
  <li className='nav-item'>
    <NavLink to={href} className={`nav-link ${active ? 'active' : 'text-black'}`}>
      <svg className='bi pe-none me-2' width='16' height='16'>
        <use xlinkHref={`#${icon}`} />
      </svg>
      {text}
    </NavLink>
  </li>
)

const SidebarSell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    const mainElement = document.querySelector('main')
    if (mainElement) {
      if (isSidebarOpen) {
        mainElement.style.marginLeft = '0px'
      } else {
        mainElement.style.marginLeft = '-280px'
      }
    }
  }, [isSidebarOpen])

  return (
    <div className='App position-relative side-wrap'>
      <main className='d-flex flex-nowrap '>
        <div className='d-flex flex-column flex-shrink-0 p-3 side-bar-responsive'>
          <ul className='nav nav-pills flex-column mb-auto side-bar-cell'>
            <li style={{ textAlign: 'justify' }} className='nav-item'>
              <MenuItem href='/store/dashboard' text='Dashboard' icon='home' />
              <MenuItem href='/store/management' text='Quản lý gian hàng' icon='grid' />
              <MenuItem href='/store/product' text='Đơn sản phẩm' icon='speedometer2' />
              <MenuItem href='/store/service' text='Đơn dịch vụ' icon='bi-hdd-stack-fill' />
              <MenuItem href='/store/complain' text='Khiếu nại' icon='bi-building-exclamation' />
              <MenuItem href='/store/reseller' text='Quản lý Reseller' icon='bi-share-fill' />
              <MenuItem href='/store/onesignal' text='Thêm thông báo' icon='bi-bell-fill' />
              <MenuItem href='/store/coupon' text='Mã giảm giá' icon='bi-receipt' />
            </li>
          </ul>
          <hr />
        </div>

        <div
          className='position-absolute btn-openMenu d-flex align-items-center btn-po d-lg-flex'
          onClick={toggleSidebar}
          style={{ height: '70px' }}
        >
          <div className=''>
            <img src={iconBar} alt='' className='' style={{ width: '24px' }} />
          </div>
        </div>
      </main>
      <svg xmlns='http://www.w3.org/2000/svg' className='d-none'>
        <symbol id='home' viewBox='0 0 16 16'>
          <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z' />
        </symbol>
        <symbol id='grid' viewBox='0 0 16 16'>
          <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z' />
        </symbol>
        <symbol id='speedometer2' viewBox='0 0 16 16'>
          <path d='M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z' />
          <path
            fillRule='evenodd'
            d='M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z'
          />
        </symbol>
        <symbol id='bi-hdd-stack-fill' viewBox='0 0 16 16'>
          <path d='M1 4h14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1zm15 3a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7zm0 5a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1z' />
        </symbol>
        <symbol id='bi-building-exclamation' viewBox='0 0 16 16'>
          <path d='M1 13.5v-10a1 1 0 0 1 1-1H2V2.5a1.5 1.5 0 1 1 3 0V2h6v-.5a1.5 1.5 0 1 1 3 0V2h.293a1 1 0 0 1 .707.293l.5.5a1 1 0 0 1 .207.707V12a1 1 0 0 1-1 1v.5a.5.5 0 0 1-1 0V13H1v.5a.5.5 0 0 1-1 0v-.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1V3H2v-.5A1.5 1.5 0 1 1 4 3V2h1v-.5a1.5 1.5 0 1 1 3 0V2h1v-.5a1.5 1.5 0 1 1 3 0V2h1v-.5A1.5 1.5 0 1 1 16 2V2h-.293a1 1 0 0 1-.707-.293l-.5-.5A1 1 0 0 1 15 2H1zm14 11.5H1v-10h14v10zm-5.5-2a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2h-1a1 1 0 0 0-1 1zm-.854-.646a.5.5 0 0 1 .707.707L8 11.207l1.646 1.647a.5.5 0 0 1-.707.707l-1.646-1.647-1.646 1.647a.5.5 0 0 1-.707-.707L7.293 11 5.646 9.354a.5.5 0 1 1 .707-.707L8 10.293l1.646-1.647z' />
        </symbol>
        <symbol id='bi-share-fill' viewBox='0 0 16 16'>
          <path d='M11.267 7.467c.258-.485.425-1.034.469-1.61C13.055 5.44 14 4.645 14 3.5a2.5 2.5 0 1 0-5 0 2.49 2.49 0 0 0 .467 1.469 1 1 0 1 0-.233.804 2.51 2.51 0 0 0 1.033.23c.67 0 1.297-.276 1.733-.732zm.567-1.467a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm-2.567 6.267a1.5 1.5 0 1 0 3 0 1.49 1.49 0 0 0-.469-1.033 1 1 0 1 0-.233-.804 2.51 2.51 0 0 0-1.033.23 2.51 2.51 0 0 0-.467 1.469zm.933-.267a1 1 0 1 0 1 1 1 1 0 0 0-1-1zM4 8a2.49 2.49 0 0 0 1.469-.467 1 1 0 1 0 .804-.233A2.51 2.51 0 0 0 7.5 5a2.5 2.5 0 1 0-3.5 3zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1zm5.267 7.467a2.49 2.49 0 0 0-1.469-.467 1 1 0 1 0-.804.233A2.51 2.51 0 0 0 5.5 11a2.5 2.5 0 1 0 3.5-3zm0 4a1 1 0 1 0-1-1 1 1 0 0 0 1 1zM3.267 5.467a2.49 2.49 0 0 0 1.469-.467 1 1 0 1 0 .804-.233A2.51 2.51 0 0 0 6.5 3a2.5 2.5 0 1 0-3.5 3zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1z' />
        </symbol>
        <symbol id='bi-bell-fill' viewBox='0 0 16 16'>
          <path d='M8 16a2 2 0 0 1-1.985-1.75h3.97A2 2 0 0 1 8 16zm.5-1.75h-1A1.5 1.5 0 0 1 6 12.75h4a1.5 1.5 0 0 1-1.5 1.5zM8 1.75A4.48 4.48 0 0 0 4.75 5c0 1.215-.487 2.588-1.235 3.59-.768 1.03-.989 2.212-1.168 3.275H13.65c-.18-1.063-.4-2.245-1.168-3.275C10.737 7.588 10.25 6.215 10.25 5A4.48 4.48 0 0 0 8 1.75zm-4 3.25A3.5 3.5 0 0 1 8 2.5 3.5 3.5 0 0 1 12 5a5.016 5.016 0 0 0 1 3.25c.756 1.015.976 2.166 1.154 3.212h-10.32c.178-1.046.398-2.197 1.154-3.212A5.016 5.016 0 0 0 4 5zm4-2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' />
        </symbol>
        <symbol id='bi-receipt' viewBox='0 0 16 16'>
          <path d='M7 1a1 1 0 0 1 .5.133A1 1 0 0 1 8 1a1 1 0 0 1 .5.133A1 1 0 0 1 9 1a1 1 0 0 1 .5.133A1 1 0 0 1 10 1a1 1 0 0 1 .5.133A1 1 0 0 1 11 1a1 1 0 0 1 .5.133A1 1 0 0 1 12 1a1 1 0 0 1 .5.133A1 1 0 0 1 13 1a1 1 0 0 1 .5.133A1 1 0 0 1 14 1a1 1 0 0 1 .5.133V15c0 .223-.21.387-.432.267L14 14.5l-.5.5a1 1 0 0 1-1 0L12 14.5l-.5.5a1 1 0 0 1-1 0L10 14.5l-.5.5a1 1 0 0 1-1 0L8 14.5l-.5.5a1 1 0 0 1-1 0L6 14.5l-.5.5a1 1 0 0 1-1 0L4 14.5l-.5.5a1 1 0 0 1-1 0L2 14.5l-.568.267A.25.25 0 0 1 1 15V1.133A1 1 0 0 1 1.5 1a1 1 0 0 1 .5-.133A1 1 0 0 1 3 1a1 1 0 0 1 .5-.133A1 1 0 0 1 4 1a1 1 0 0 1 .5-.133A1 1 0 0 1 5 1a1 1 0 0 1 .5-.133A1 1 0 0 1 6 1a1 1 0 0 1 .5-.133A1 1 0 0 1 7 1zm-4 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 7zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z' />
        </symbol>
      </svg>
    </div>
  )
}

export default SidebarSell
