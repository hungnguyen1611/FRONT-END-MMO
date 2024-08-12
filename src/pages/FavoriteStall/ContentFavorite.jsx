import { Link } from 'react-router-dom'
import sideface from '~/assets/img/side-face.png'
import LazyImage from '~/hooks/LazyImage/LazyImage'

const ContentFavorite = ({ dat }) => {
  const id_business = '66441db801be4d530febb867'
  const id_booth = '6644243b39c8264a5faf130a'
  console.log(dat)

  const minPrice =
    dat?.id_boothProduct?.detailBooth?.reduce(
      (acc, item) => (item.price < acc ? item.price : acc),
      dat?.id_boothProduct?.detailBooth[0]?.price || 0
    ) ||
    dat?.id_boothService?.detailBooth?.reduce(
      (acc, item) => (item.price < acc ? item.price : acc),
      dat?.id_boothService?.detailBooth[0]?.price || 0
    ) ||
    0

  const product = dat?.id_boothService?.detailBooth || dat?.id_boothProduct?.detailBooth || []
  console.log('product', product)

  return (
    <div className='d-flex wrap-content p-3 flex-column flex-md-row'>
      <div className='me-2 d-flex flex-column justify-content-center align-items-center'>
        <Link
          className='wrap-link-content d-block'
          to={`/detail/${dat?.id_boothService?.id_businessType || dat?.id_boothProduct?.id_businessType}/booth/${dat?.id_boothService?._id || dat?.id_boothProduct?._id}`}
        >
          <LazyImage
            className='wrap-link-content-img'
            width='100%'
            src={dat?.id_boothService?.imageBooth[0] || dat?.id_boothProduct?.imageBooth[0]}
            alt='face'
          />
        </Link>
        <h6 className='mt-3'>đ {minPrice.toLocaleString()}</h6>
      </div>
      <div>
        <h5>
          <Link
            to={`/detail/${dat?.id_boothService?.id_businessType || dat?.id_boothProduct?.id_businessType}/booth/${dat?.id_boothService?._id || dat?.id_boothProduct?._id}`}
          >
            {dat?.id_boothService?.nameBooth || dat?.id_boothProduct?.nameBooth}
          </Link>
        </h5>
        <p>
          Người bán:{' '}
          <Link to='/'>{dat?.id_boothService?.id_user?.username || dat?.id_boothProduct?.id_user?.username}</Link>
        </p>
        <p>
          Sản phẩm:{' '}
          <Link
            to={`/detail/${dat?.id_boothService?.id_businessType || dat?.id_boothProduct?.id_businessType}/booth/${dat?.id_boothService?._id || dat?.id_boothProduct?._id}`}
          >
            {product.map((pro) => pro.name).join(', ')}
          </Link>
        </p>
        <ul className='ps-3'>
          <li>{dat?.id_boothService?.shortDesc || dat?.id_boothProduct?.shortDesc}</li>
        </ul>
      </div>
    </div>
  )
}

export default ContentFavorite
