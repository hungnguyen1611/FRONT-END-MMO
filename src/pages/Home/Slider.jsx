import React, { useRef } from 'react'
import Slider from 'react-slick'
import slide1 from '~/assets/img/slide1.png'
import slide2 from '~/assets/img/slide2.png'
import slide3 from '~/assets/img/slide3.png'
import logo from '~/assets/img/logo.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Search from './Search'
import sliderBottom from '~/assets/img/GroupBotom.png'
import sliderStar from '~/assets/img/star.png'

export default function SliderHome() {
  const slideRef = useRef(null)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  }
  const prev = () => {
    slideRef.current.slickPrev()
  }
  const next = () => {
    slideRef.current.slickNext()
  }
  const blog = [{ image: slide1 }, { image: slide2 }, { image: slide3 }]
  const items = ['Technology', 'Business', 'IT Solution', 'Work Process']
  const allItems = [...items, ...items, ...items]
  return (
    <div className='wrapper slider'>
      <div className='slide'>
        <div className='slide-show'>
          <Slider {...settings} ref={slideRef}>
            {blog.map((image, index) => (
              <div key={index} className='slide-wrapper'>
                <img src={image.image} alt='slider' className='slide-img' />
              </div>
            ))}
          </Slider>
        </div>

        {/* <div className='btn-prev' onClick={() => prev()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className='btn-next' onClick={() => next()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div> */}
        <div className='search-wrap search-lg container '>
          <Search />
        </div>
      </div>

      <div className='marquee'>
        <div className='marquee-content'>
          {allItems.map((item, index) => (
            <React.Fragment key={index}>
              <span style={{ padding: '20px 35px' }}>{item}</span>
              <img src={sliderStar} alt='Star' /> {/* Update the path as needed */}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='container search-sm'>
        <Search />
      </div>

      {/* <marquee behavior='scroll' direction='left'>
        {' '}
        <img src={sliderBottom} alt='sliderBottom' className='slide-img-Bottom' />
      </marquee> */}
    </div>
  )
}
