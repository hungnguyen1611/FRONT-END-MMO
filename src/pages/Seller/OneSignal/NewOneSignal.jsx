import { notification } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const NewOneSignal = ({ onCancel }) => {
  const [post, setPost] = useState({ content: '', title: '', listImage: [], url: '' })
  const accessToken = localStorage.getItem('token')
  const id = useSelector((state) => state.auth._id)
  const handleChange = (e) => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setPost({ ...post, listImage: file })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', post.content)
    formData.append('title', post.title)
    formData.append('url', post.url)
    formData.append('id_user', id)
    if (post.listImage) {
      formData.append('image', post.listImage)
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND_URL}${import.meta.env.VITE_API_URL_API_PUSH_NOTIFICATION}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: `Bearer ${accessToken}`
          }
        }
      )
      console.log(res)
      if (res) {
        onCancel()
      }
      console.log('res', res)
      notification.success({
        message: 'Tạo mới thông báo thành công.',
        duration: 2
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: 'Tạo mới thông báo thất bại.',
        duration: 2
      })
    }
  }

  return (
    <div>
      <form id='addStoreForm' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='fs-6 my-2'>
            Tên thông báo
            <input
              type='text'
              name='title'
              value={post.title}
              onChange={handleChange}
              className='form-control rounded-2 border w-100 my-2'
              required
            />
          </div>
          <div className='fs-6 my-2'>
            Nội dung thông báo
            <input
              type='text'
              name='content'
              value={post.content}
              onChange={handleChange}
              className='form-control rounded-2 border w-100 my-2'
              required
            />
          </div>
          <div className='fs-6 my-2'>
            Link thông báo
            <input
              type='text'
              name='url'
              value={post.url}
              onChange={handleChange}
              className='form-control rounded-2 border w-100 my-2'
              required
            />
          </div>
          <div className='my-2 fs-6'>
            Ảnh thông báo
            <input
              type='file'
              onChange={handleImageChange}
              name='listImage'
              className='store-input-file rounded-2 border w-100 my-2'
            />
          </div>
          <div className='d-flex gap-3 mb-5'>
            <button
              onClick={() => {
                onCancel()
              }}
              type='button'
              className='btn btn-success btn-sm '
            >
              Quay lại
            </button>
            <button type='submit' className='btn btn-success btn-sm '>
              Tạo mới
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewOneSignal
