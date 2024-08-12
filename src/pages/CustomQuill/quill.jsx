import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function MyQuillEditor({ desc, onChange }) {
  const handleChange = (content) => {
    onChange(content)
  }

  // Cấu hình modules để thêm chọn màu chữ
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ color: [] }, { background: [] }], // Thêm lựa chọn màu chữ và màu nền
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background'
  ]

  return (
    <ReactQuill
      theme='snow'
      value={desc}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      style={{ height: '300px' }}
    />
  )
}

export default MyQuillEditor
