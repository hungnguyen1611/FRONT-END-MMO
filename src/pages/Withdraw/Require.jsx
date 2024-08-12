import { notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Require = () => {
  const id_user = useSelector((state) => state.auth._id)
  const [data, setData] = useState({ amount: '', stk: '', nameBank: '' })
  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      address: id_user,
      amount: data.amount,
      stk: data.stk,
      nameBank: data.nameBank
    }
    console.log(body)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_WITHDRAW}`,
        body
      )
      console.log('res', res)
      notification.success({
        message: 'Yêu cầu rút tiền thành công.',
        duration: 2
      })
    } catch (error) {
      notification.error({
        message: 'Yêu cầu rút tiền thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  return (
    <div>
      <h5 className='my-3'>
        Hệ thống chỉ lưu số tài khoản cho đến khi giao dịch thành công. Số tiền GD tối thiểu là 500.000 và phải là bội
        số của 100.000 .
      </h5>
      <div className='form-group'>
        <label className='form-label' htmlFor='money'>
          Số tiền
        </label>
        <input
          id='money'
          type='number'
          placeholder='VD: 500.000'
          className='form-control'
          name='amount'
          value={data.amount}
          onChange={handleChange}
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label className='form-label' htmlFor='money'>
          Tên ngân hàng
        </label>
        <input
          id='user'
          type='text'
          placeholder='VD: BIDV'
          className='form-control'
          name='nameBank'
          value={data.nameBank}
          onChange={handleChange}
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className='form-group'>
        <label className='form-label' htmlFor='money'>
          Số tài khoản
        </label>
        <input
          id='number'
          type='number'
          placeholder='VD: 857486778'
          className='form-control'
          name='stk'
          value={data.stk}
          onChange={handleChange}
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='d-flex flex-row-reverse'>
        <button onClick={handleSubmit} type='button' className='btn btn-primary btn-primary-bg my-3'>
          Rút tiền
        </button>
      </div>
    </div>
  )
}

export default Require
