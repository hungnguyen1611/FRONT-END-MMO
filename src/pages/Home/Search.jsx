import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AutoComplete, Button, Input, Select } from 'antd'
import { SearchOutlined, BarsOutlined } from '@ant-design/icons'
// import { c } from 'vite/dist/node/types.d-aGj9QkWt'
// import Select from 'react-select'
const { Option } = Select

const Search = () => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState({ value: '', label: 'ALL' })
  const [options, setOptions] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchBoothTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SEARCH_HOME}`
        )
        const data = response.data
        if (data && data.data) {
          const formattedOptions = data.data.map((item) => ({
            value: item._id,
            label: item.nameBoothType
          }))
          setOptions([{ value: '', label: 'ALL' }, ...formattedOptions])
        }
      } catch (error) {
        console.error('Error fetching booth types:', error)
      }
    }
    fetchBoothTypes()
  }, [])
  const handleChangeType = (value) => {
    // setType(selectedOption ? selectedOption : { value: '', label: 'ALL' })
    setType(value)
    console.log(type)
  }
  const handleSearchChange = async (value) => {
    setSearch(value)
    if (value) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SEARCH}`,
          {
            params: { search: value, type: type.value }
          }
        )
        if (response.data && response.data.data) {
          const combinedData = [...response.data.data.boothProduct, ...response.data.data.boothService]
          setSuggestions(combinedData.map((item) => ({ value: item.nameBooth })))
        } else {
          setSuggestions([])
        }
      } catch (error) {
        console.error('Error fetching search suggestions:', error)
        setSuggestions([])
      }
    } else {
      setSuggestions([])
    }
  }
  const handleSelectSuggestion = (value) => {
    setSearch(value)
    navigate(`/search-results?search=${value}&type=${type.value}`)
  }
  const handleSearch = () => {
    navigate(`/search-results?search=${search}&type=${type}`)
  }

  return (
    <div className='search-bar-container'>
      {/* <div className='navbar-divider'></div> */}
      <AutoComplete
        options={suggestions}
        style={{ width: '100%' }}
        onSelect={handleSelectSuggestion}
        onSearch={handleSearchChange}
        value={search}
      >
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Tìm kiếm gian hàng hoặc người bán'
          prefix={<SearchOutlined />}
          className='search-input'
        />
      </AutoComplete>
      <div className='div'>
        <span className='select-label'>
          {' '}
          <BarsOutlined />
        </span>
        {/* <Select
          defaultValue='Tất cả'
          className='search-select'
          onChange={handleChangeType}
          value={type}
          options={options}
        ></Select> */}
        {/* 
        {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))} */}

        <Select
          defaultValue='Tất cả'
          className='search-select'
          onChange={handleChangeType}
          value={type}
          style={{ width: 200 }} // Bạn có thể điều chỉnh chiều rộng theo nhu cầu
        >
          {/* Lặp qua danh sách tùy chọn và tạo các Option */}
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>

        <div className='btn-search-lider'></div>
        <Button type='primary' className='search-button' onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>
    </div>
  )
}

export default Search

// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { AutoComplete, Button, Input } from 'antd'
// import { SearchOutlined, BarsOutlined } from '@ant-design/icons'
// import Select from 'react-select'
// const Search = () => {
//   const [search, setSearch] = useState('')
//   const [type, setType] = useState({ value: '', label: 'ALL' })
//   const [options, setOptions] = useState([])
//   const [suggestions, setSuggestions] = useState([])
//   const navigate = useNavigate()
//   useEffect(() => {
//     const fetchBoothTypes = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SEARCH_HOME}`
//         )
//         const data = response.data
//         if (data && data.data) {
//           const formattedOptions = data.data.map((item) => ({
//             value: item._id,
//             label: item.nameBoothType
//           }))
//           setOptions([{ value: '', label: 'ALL' }, ...formattedOptions])
//         }
//       } catch (error) {
//         console.error('Error fetching booth types:', error)
//       }
//     }
//     fetchBoothTypes()
//   }, [])
//   const handleChangeType = (selectedOption) => {
//     setType(selectedOption ? selectedOption : { value: '', label: 'ALL' })
//   }
//   const handleSearchChange = async (value) => {
//     setSearch(value)
//     if (value) {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_SEARCH}`,
//           {
//             params: { search: value, type: type.value }
//           }
//         )
//         if (response.data && response.data.data) {
//           const combinedData = [...response.data.data.boothProduct, ...response.data.data.boothService]
//           setSuggestions(combinedData.map((item) => ({ value: item.nameBooth })))
//         } else {
//           setSuggestions([])
//         }
//       } catch (error) {
//         console.error('Error fetching search suggestions:', error)
//         setSuggestions([])
//       }
//     } else {
//       setSuggestions([])
//     }
//   }
//   const handleSelectSuggestion = (value) => {
//     setSearch(value)
//     navigate(`/search-results?search=${value}&type=${type.value}`)
//   }
//   const handleSearch = () => {
//     navigate(`/search-results?search=${search}&type=${type.value}`)
//   }
//   return (
//     <div className='container mt-5'>
//       <div className='row justify-content-center'>
//         <div className='col-md-10'>
//           <div className='card w-100'>
//             <div className=' row align-items-center'>
//               <div style={{ width: '600px' }} className='container col ps-2 pe-0 border-end border-2'>
//                 <AutoComplete
//                   options={suggestions}
//                   style={{ width: '100%' }}
//                   onSelect={handleSelectSuggestion}
//                   onSearch={handleSearchChange}
//                   value={search}
//                 >
//                   <Input
//                     prefix={<SearchOutlined />}
//                     placeholder='Tìm kiếm gian hàng hoặc người bán'
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     style={{ border: 'none', boxShadow: 'none' }}
//                     style={{ border: 'none', boxShadow: 'none', fontSize: '20px' }}
//                   />
//                 </AutoComplete>
//               </div>
//               <div style={{ width: '320px' }} className='container col-auto d-flex align-items-center p-0'>
//                 <BarsOutlined className='ms-2' />
//                 <Select
//                   options={options}
//                   value={type}
//                   onChange={handleChangeType}
//                   styles={{
//                     control: (base) => ({
//                       ...base,
//                       minWidth: '280px',
//                       border: 'none',
//                       boxShadow: 'none',
//                       appearance: 'none',
//                       background: 'none',
//                       fontSize: '15px'
//                     }),
//                     menu: (base) => ({
//                       ...base,
//                       border: 'none',
//                       boxShadow: 'none'
//                     }),
//                     option: (base, state) => ({
//                       ...base,
//                       backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
//                       color: 'black',
//                       fontSize: '15px',
//                       height: '50px'
//                     }),
//                     indicatorSeparator: () => ({
//                       display: 'none'
//                     })
//                   }}
//                 />
//               </div>
//               <div className='col-auto ps-0 container'>
//                 <Button type='green' className='btn-search' onClick={handleSearch}>
//                   Tìm kiếm
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Search
