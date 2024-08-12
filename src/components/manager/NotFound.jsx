import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className='container'>
        <div style={{ minHeight: '60vh' }} className='d-flex flex-column align-items-center justify-content-center'>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound
