import { useState, useEffect, useRef } from 'react'
import load from '~/assets/img/load.png'

const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src])

  return (
    <img
      ref={imgRef}
      src={loaded ? src : load} // Provide a placeholder image
      alt={alt}
      {...props}
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
    />
  )
}

export default LazyImage
