import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Random AI Image Generator App
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadRandomImage = () => {
    setLoading(true)
    const randomId = Math.floor(Math.random() * 10000)
    const imageUrl = `https://picsum.photos/800/600?random=${randomId}`
    
    const img = new Image()
    img.onload = () => {
      setImage(imageUrl)
      setLoading(false)
    }
    img.onerror = () => {
      setImage(`https://source.unsplash.com/800x600/?abstract,ai,digital`)
      setLoading(false)
    }
    img.src = imageUrl
  }

  useEffect(() => {
    loadRandomImage()
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>🎨 Random AI Generated Image</h1>
      {loading && <div style={styles.loading}>Loading image...</div>}
      {image && !loading && (
        <div style={styles.imageWrapper}>
          <img src={image} alt="Random AI Generated Image" style={styles.img} />
        </div>
      )}
      <br />
      <button style={styles.btn} onClick={loadRandomImage}>
        🔄 Get Another Image
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  },
  h1: {
    color: 'white',
    marginBottom: '30px',
    fontSize: '2.5em',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  imageWrapper: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '15px',
    transition: 'filter 0.3s ease',
  },
  btn: {
    marginTop: '30px',
    padding: '12px 30px',
    fontSize: '1em',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  },
  loading: {
    color: 'white',
    fontSize: '1.2em',
    marginBottom: '20px',
  },
}

export default App
