import clock from '../../../../assets/img/clock.png'
import shopping from '../../../../assets/img/shopping-bag.png'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import SidebarSell from '~/layouts/SidebarSell/SidebarSell'
import HeaderSell from '~/layouts/HeaderSell/HeaderSell'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Biểu đồ doanh số 30 ngày gần nhất'
    }
  }
}

const data = {
  labels: ['Ngày 1', 'Ngày 2', 'Ngày 3', 'Ngày 4', 'Ngày 5', 'Ngày 6', 'Ngày 7'],
  datasets: [
    {
      label: 'Doanh số',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)'
    }
  ]
}

function SalesStore() {
  return (
    <div className='d-flex' style={{ backgroundColor: '#E1E8F0' }}>
      <SidebarSell />
      <div className='w-100'>
        <HeaderSell />
        <div className='p-lg-3 p-2 row '>
          <div className='border col-lg-3 col-12 rounded-2 mx-lg-2 mx-0 p-3' style={{ backgroundColor: '#fff' }}>
            <p>Số đơn hàng</p>
            <div className='d-flex gap-3 align-items-center'>
              <img className='w-100 h-100' style={{ maxWidth: '20px' }} src={clock} alt='' />
              <p>0</p>
            </div>
          </div>
          <div className='border col-lg-3 col-12 rounded-2 mx-lg-2 mx-0 p-3' style={{ backgroundColor: '#fff' }}>
            <p>Doanh số</p>
            <div className='d-flex gap-3 align-items-center'>
              <img className='w-100 h-100' style={{ maxWidth: '20px' }} src={shopping} alt='' />
              <p>0</p>
            </div>
          </div>
        </div>
        <div className='border m-2 rounded' style={{ backgroundColor: '#fff'}}>
          <Line options={options} data={data} />
        </div>
        <div className='position-relative text-center my-4'>
          <span className='text'>KINH DOANH THÁNG 05/2024</span>
          <div className='my-3'>
            <input type='date' />
          </div>

          <div className='row'>
            <div
              className='border col-lg-3 col-12 rounded-2 m-lg-2 m-0 text-start p-3'
              style={{ backgroundColor: '#fff' }}
            >
              <p>Số đơn hàng</p>
              <div className='d-flex gap-3 align-items-center'>
                <img className='w-100 h-100' style={{ maxWidth: '20px' }} src={clock} alt='' />
                <p>0</p>
              </div>
            </div>
            <div
              className='border col-lg-3 col-12 rounded-2 m-lg-2 m-0 text-start p-3'
              style={{ backgroundColor: '#fff' }}
            >
              <p>Doanh số</p>
              <div className='d-flex gap-3 align-items-center'>
                <img className='w-100 h-100' style={{ maxWidth: '20px' }} src={shopping} alt='' />
                <p>0</p>
              </div>
            </div>
            <div
              className='border col-lg-3 col-12 rounded-2 m-lg-2 m-0 text-start p-3'
              style={{ backgroundColor: '#fff' }}
            >
              <p>Doanh số</p>
              <div className='d-flex gap-3 align-items-center'>
                <img className='w-100 h-100' style={{ maxWidth: '20px' }} src={shopping} alt='' />
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesStore
