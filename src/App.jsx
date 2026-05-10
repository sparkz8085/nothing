import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Random AI Image Generator App
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const generateImages = () => {
    setLoading(true)
    const newImages = []
    for (let i = 0; i < 2; i++) {
      const randomId = Math.floor(Math.random() * 10000)
      const imageUrl = `https://picsum.photos/300/200?random=${randomId}`
      const downloadLink = `${imageUrl}&download=true`
      const imageLink = i === 0 ? 'https://tunnel1.dlproxy.uk/download/IYJPauiQJ5rc6KsONo7yK3BHstHSpi8WwOOHj1Tk1NbA_zVDqVgK2exWBr4huEnQbZu9gSXEvQpzVJ1Umo6fRljE0t1S-jLsbq5vL7e10kcNiJiN09dz9q2owM-n6oghSSrFqDZ3hYMiM-WCbZQdByO-TX5woz-h7ubhNHfEP_0pp0PeZp8ucdu3AweZpFf56ueFdjvVGTKoTBRz-M7ZKNc4CCcmGqo_vnOtxZOLSqPArlSjqgU_Sg-TnAA9XZF0z2wRdIcee7_M3t6RiJLOb2iQqvob40hRSPeNhAe4KWryxqXB0YYebgB4Bw0GJkLLWnCLxJP8pz7b4HMFli5EP2suC6XUDFHgcdZZq-j_wTj8vaVilQF2IFN4-Q04S2IXyDsjg3D8M7vnObCMX8a3hpVWUphUI_7Wtv9djxTrUd8e9J2F_UTQr9JBznhr8HSfAH24qlEhGbBVTPHoKZHS_g76qAirChSQxTDUo6tz-1AOvQOe-8IQHkT7bKAwut-18e2szJ_1OuPG00HnoKTQbzHvMOcECiGg2DvA6vmiRfLtZmVxcGdNxyxbpYBBoeMxsx6rqe0MlmCeJC0bpmAE2ktgIVypIUbZNDW78oLg11vmxva1EaG293c_w330G8Zk?sig=3QgG6RYlIo1piiFQUUGO3EpRMiarrUuD5Od_uM_RttE' : 'https://tunnel1.dlproxy.uk/download/WeS8LM3NotVPGgjmTsQltmUEeVfRNX8d1NAds14ag3E9wc1TSU_YgZEKM20HCgKYAnO_riGWDh7EB5VcUSuVz2Q-tC3qFC5jHInC-Mv3anxLU602HR0nhDlz0xsNxztXHQnPFTNW27XMnA8OxYRhBZCLaM_iOwO8GTWTkBQITKNzKlffST11vhw45LoF4qINcpXowjjbkxV5xyxjBof8GHw1nY6o9uJNYciEIIAy4maTrCwUOWYYTGlASf_pd1iBko5wObcucgQ59VKTugjJcQGJqjHRSxTkfsiyee-wnUARMr3g78dzYnNCHGqIC_lM4jhT0TYnSggn_ACIc93qFY8HCRTPtoP34-YIgDCdhgitVHJDBahhuBM3wxtmLeyvMPVOkprvDQbZLjbrm1PjMsnhxBdPGuqoKEi7hORUlyvEbhMHI6RKIHfRtlSbBuWVe_7RQ9TXvp-E3yjy_UYIznN6qlMVkRRJn9ufKkaN_KlJGgH_dEa1IlJzDDZnKhcnHcYHQ0hwyoVTxPcUKQDOsWrBaJaV8eEizV2Fir81IY-DQXm5DL48hsXdkE8qc3DZzS4-Rt_LQnzHYwXUeU7w73uA7U6l1IHnqGkrcJ500SLJ2I2NPrJBVj-HqFHiAoklp7zSJ5uVe6xtAox81a-KqQ?sig=cy_NsWvq0Aj2H7M2Uux1P0QKmZt-M3zEid9k8k3dviw'
      newImages.push({
        url: imageUrl,
        downloadLink: downloadLink,
        id: `${randomId}-${i}-${Date.now()}`,
        serial: i + 1,
        link: imageLink
      })
    }
    setImages(newImages)
    setLoading(false)
  }

  const handleImageClick = (image) => {
    // Open the link for the image
    window.open(image.link, '_blank')
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
              <div style={styles.serialNumber}>{image.serial}</div>
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
  serialNumber: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '50%',
    fontSize: '1.2em',
    fontWeight: 'bold',
    zIndex: 10,
    minWidth: '30px',
    textAlign: 'center',
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
