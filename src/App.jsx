import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Random AI Image Generator App
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const generateImages = () => {
    setLoading(true)
    const newImages = []
    for (let i = 0; i < 20; i++) {
      const randomId = Math.floor(Math.random() * 10000)
      const imageUrl = `https://picsum.photos/300/200?random=${randomId}`
      const downloadLink = `${imageUrl}&download=true`
      newImages.push({
        url: imageUrl,
        downloadLink: downloadLink,
        id: `${randomId}-${i}-${Date.now()}`
      })
    }
    setImages(newImages)
    setLoading(false)
  }

  const handleImageClick = (image) => {
    // Open the image in a new tab and trigger download
    const link = document.createElement('a')
    link.href = image.url
    link.download = `random-image-${image.id}.jpg`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    generateImages()
  }, [])

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.h1}>🎨 Random AI Generated Image</h1>
        <button style={styles.btn} onClick={generateImages}>
          🔄 Get Another Image
        </button>
      </div>
      
      {loading ? (
        <div style={styles.loading}>Loading images...</div>
      ) : (
        <div style={styles.gallery}>
          {images.map((image, index) => (
            <div 
              key={image.id} 
              style={styles.imageWrapper}
              onClick={() => handleImageClick(image)}
            >
              <img src={image.url} alt={`Random AI Generated ${index}`} style={styles.img} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #66eac2 0%, #75a24b 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '40px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto 40px',
    gap: '20px',
  },
  h1: {
    color: 'white',
    fontSize: '2.5em',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    margin: 0,
    flex: 1,
    textAlign: 'center',
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  imageWrapper: {
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    aspectRatio: '3/2',
  },
  img: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '15px',
    transition: 'filter 0.3s ease',
  },

  btn: {
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
    whiteSpace: 'nowrap',
  },
  loading: {
    color: 'white',
    fontSize: '1.2em',
    textAlign: 'center',
    marginTop: '50px',
  },
}

export default App
