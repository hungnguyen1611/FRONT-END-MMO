import { DatePicker, Space, notification } from 'antd'
import axios from 'axios'
const { RangePicker } = DatePicker

const ModalComplain = ({ onCancel, id_business, id_order }) => {
  const accessToken = localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_REFUND_DISPUTE}`,
        {
          id_business,
          id_order
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Bạn đã tranh chấp đơn hàng này.',
        duration: 2
      })
      setTimeout(() => {
        onCancel()
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Tranh chấp đơn hàng thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }
  const handleRefund = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_REFUND_LITIGIOUS}`,
        {
          id_business,
          id_order
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log('res', res)
      notification.success({
        message: 'Hoàn tiền đơn hàng thành công.',
        duration: 2
      })
      setTimeout(() => {
        onCancel()
      }, 2000)
    } catch (error) {
      notification.error({
        message: 'Hoàn tiền đơn hàng thất bại.',
        duration: 2
      })
      console.log(error)
    }
  }

  return (
    <div className='d-flex flex-column'>
      <form className='form' id='form-1'>
        <h3 className='mb-2'>Giải quyết khiếu nại</h3>
        <div className='text-start'>
          <p>Trong trường hợp khách không đồng ý hủy khiếu nại, bạn có thể giải quyết bằng 2 lựa chọn:</p>
          <p className='my-2'>1: Hoàn tiền: Hủy đơn hàng và hoàn tiền lại cho người mua</p>
          <p>2: Tranh chấp: Đưa khiếu nại ra tranh chấp.</p>
        </div>
        {/* <div className='form-group mt-3'>
          <label className='form-label' htmlFor='email'>
            Ghi chú
          </label>
          <textarea
            style={{ minHeight: '200px' }}
            id='node'
            type='text'
            placeholder='VD: Tôi ...'
            className='form-control'
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}

        <button onClick={handleRefund} type='button' className='btn btn-primary btn-primary-bg my-3'>
          Hoàn tiền
        </button>
        <button onClick={handleSubmit} type='button' className='btn btn-primary btn-primary-blue my-3 ms-3'>
          Tranh chấp
        </button>
      </form>
    </div>
  )
}

export default ModalComplain
