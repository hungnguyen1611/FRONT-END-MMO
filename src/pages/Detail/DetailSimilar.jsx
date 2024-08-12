import { Link } from 'react-router-dom'
import facebook from '~/assets/img/side-face.png'
const DetailSimilar = ({ data }) => {
  return (
    <Link
      to={`/detail/${data?.id_businessType?._id}/booth/${data?._id}`}
      className='d-flex flex-column align-items-center justify-content-between wrap-similar-link wrap-similar p-2 border-detail-similar'
    >
      <div className='d-flex flex-column '>
        <div className='similar-detail-img'>
          <img className='similar-detail-image' src={data?.imageBooth} alt='img'></img>
        </div>
        <h5 className='heading-similar text-start'>{data?.nameBooth}</h5>
        <p className='slider-similar text-start'>{data?.shortDesc}</p>
        <p className='similar-price text-start'>đ {data?.detailBooth[0]?.price.toLocaleString()}</p>
        {/* <p className='float-start w-100 mb-2'>11 Reviews</p>
        <p className='float-start w-100 mb-2'>
          Sản phẩm: <Link to='/'>Gmail</Link>
        </p> */}
      </div>
      {/* <h5>11.000 đ - 21.000 đ</h5> */}
    </Link>
  )
}

export default DetailSimilar
