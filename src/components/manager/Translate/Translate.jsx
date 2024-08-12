import { useEffect } from 'react'

const Translate = () => {
  useEffect(() => {
    const scriptId = 'google-translate-script'
    if (!document.getElementById(scriptId)) {
      const addScript = document.createElement('script')
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      addScript.id = scriptId
      document.body.appendChild(addScript)

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: '' }, 'google_translate_element')
      }
    }
  }, [])

  return <div id='google_translate_element'></div>
}

export default Translate
// import { useEffect } from 'react'

// const Translate = () => {
//   useEffect(() => {
//     const scriptId = 'google-translate-script'
//     if (!document.getElementById(scriptId)) {
//       const addScript = document.createElement('script')
//       addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//       addScript.id = scriptId
//       document.body.appendChild(addScript)

//       window.googleTranslateElementInit = () => {
//         new window.google.translate.TranslateElement({ pageLanguage: 'vn' }, 'google_translate_element')
//       }
//     }

//     const styleId = 'google-translate-style'
//     if (!document.getElementById(styleId)) {
//       const style = document.createElement('style')
//       style.id = styleId
//       style.innerHTML = `
//         .goog-te-banner-frame.skiptranslate {
//           display: none !important;
//         }
//         body {
//           top: 0px !important;
//         }
//       `
//       document.head.appendChild(style)
//     }
//   }, [])

//   return <div id='google_translate_element'></div>
// }

// export default Translate
