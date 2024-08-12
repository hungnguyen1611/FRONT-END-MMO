import { Link } from 'react-router-dom'
import facebook from '~/assets/img/side-face.png'
const DetailSimilarPost = ({ data, category }) => {
  console.log(category)

  return (
    <Link
      to={`/detailpost/${data?._id}`}
      className='d-flex flex-column align-items-center justify-content-between wrap-similar-link wrap-similar p-2'
    >
      <div className='d-flex flex-column align-items-center'>
        <div className='similar-detail-img'>
          <img className='similar-detail-image' src={data?.image} alt='img'></img>
        </div>
        <h5 className='heading-similar text-start'>{data?.title}</h5>
        <p className='slider-similar text-start'>{data?.id_user?.username}</p>
        {/* <p className='similar-price text-start'>đ {data?.detailBooth[0]?.price.toLocaleString()}</p> */}
        {/* <p className='float-start w-100 mb-2'>11 Reviews</p>
                <p className='float-start w-100 mb-2'>
                  Sản phẩm: <Link to='/'>Gmail</Link>
                </p> */}
      </div>
      {/* <h5>11.000 đ - 21.000 đ</h5> */}
    </Link>
  )
}

export default DetailSimilarPost
