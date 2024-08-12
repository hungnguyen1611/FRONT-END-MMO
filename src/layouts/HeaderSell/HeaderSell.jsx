import './HeaderSell.css'
import avatar from '../../assets/img/messenger.png'
import userImg from '../../assets/img/man.png'
import { Link } from 'react-router-dom'
import logo from '~/assets/img/logo.png'

const HeaderSell = () => {
  return (
    <div className='header d-flex justify-content-between align-items-center'>
      <Link className='navbar-brand nav-logo d-block' to='/'>
        <img className='img-header-sell' src={logo} alt='logo'></img>
      </Link>
      <div className='d-flex gap-3 align-items-center justify-content-end'>
        <img src={avatar} alt='Message' style={{ width: '24px', height: '24px' }} />
        <div className='dropdown'>
          <button
            className='btn btn-secondary dropdown-toggle'
            type='button'
            id='dropdownMenuButton1'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <img className='me-3' src={userImg} alt='User' />
            <span>Swavw_chin</span>
          </button>
          <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
            <li className='d-flex align-items-center justify-content-evenly py-3'>
              <img className='me-3' src={userImg} alt='User' />
              <span>Swavw_chin</span>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeaderSell
