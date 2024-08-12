import { Link } from 'react-router-dom'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEnvelope, faFaceGrinSquintTears } from '@fortawesome/free-solid-svg-icons'
import insta from '~/assets/img/discord.png'
import linkin from '~/assets/img/tele.png'
import youtube from '~/assets/img/x.png'

const Footer = () => {
  return (
    <div className='wrapper-footer'>
      <div className='container'>
        <div className='row mt-3'>
          <div className='col-12 col-md-6 col-lg-4 mt-3'>
            <div className='d-flex flex-column wrapper-footer-item'>
              <h3> {i18n.t('Footer.Contact')}</h3>
              <p className='my-3'>Liên hệ ngay nếu bạn có khó khăn khi sử dụng dịch vụ hoặc cần hợp tác.</p>
              <Link className='footer-item-link mb-2' to='/'>
                <FontAwesomeIcon icon={faFaceGrinSquintTears} /> Tạp hóa MMO
              </Link>
              <Link className='footer-item-link mb-2' to='/'>
                <FontAwesomeIcon icon={faEnvelope} /> support@taphoammo.net
              </Link>
              <div className=' mb-2' to='/'>
                <FontAwesomeIcon icon={faClock} /> Mon-Sat 08:00am - 10:00pm
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6 col-lg-4 mt-3'>
            <div className='d-flex flex-column wrapper-footer-item'>
              <h3>Thông tin</h3>
              <p className='my-3'>Một ứng dụng nhằm kết nối, trao đổi, mua bán trong cộng đồng kiếm tiền online.</p>
              <p className='mb-2'>Thanh toán tự động, nhận hàng ngay tức thì.</p>
              <Link className='footer-item-link mb-2' to='/'>
                Câu hỏi thường gặp
              </Link>
              <Link className='footer-item-link mb-2' to='/'>
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
          <div className='col-12 col-md-6 col-lg-4 mt-3'>
            <div className='d-flex flex-column wrapper-footer-item'>
              <h3>Đăng ký bán hàng</h3>
              <p className='my-3'>
                Tạo một gian hàng của bạn trên trang của chúng tôi. Đội ngũ hỗ trợ sẽ liên lạc để giúp bạn tối ưu khả
                năng bán hàng.
              </p>
              <p className='mb-2'>Theo dõi chúng tôi trên mạng xã hội.</p>
              <div className='d-flex align-items-center'>
                <Link className='p-2 mx-1' target='_blank' to={'https://t.me/Channel3AiNetwork'}>
                  <img src={youtube}></img>
                </Link>
                <Link className='p-2 mx-1' target='_blank' to={'https://twitter.com/3ainetwork'}>
                  <img src={linkin}></img>
                </Link>
                <Link className='p-2 mx-1' target='_blank' to={'https://discord.gg/C7SDvzBN'}>
                  <img src={insta}></img>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
