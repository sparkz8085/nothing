import { useEffect, useMemo, useState } from 'react'
import './App.css'

const SITES = [
  'neal.fun', 'theuselessweb.com', 'pointerpointer.com',
  'en.wikipedia.org/wiki/Special:Random', 'poki.com', 'crazygames.com',
  'y8.com', 'miniclip.com', 'itch.io/games/free', 'skribbl.io',
  'slither.io', 'agar.io', 'play2048.co', 'play.typeracer.com',
  'monkeytype.com', 'geoguessr.com', 'radio.garden', 'windy.com',
  'hackertyper.net', 'zoom.earth', 'sudoku.com', 'lichess.org',
  'chess.com', 'nytimes.com/games/wordle/index.html',
  'orteil.dashnet.org/cookieclicker', 'ncase.me', 'akinator.com',
  'garticphone.com', 'jklm.fun', 'sporcle.com', 'quickdraw.withgoogle.com',
  'experiments.withgoogle.com', 'artsandculture.google.com', 'archive.org',
  'ted.com', 'atlasobscura.com', 'boredpanda.com', 'reddit.com/r/random',
  'xkcd.com/random/comic', 'apod.nasa.gov', 'earthcam.com',
  'openculture.com', 'gutenberg.org', 'mentalfloss.com', 'kahoot.it',
  'freerice.com', 'thisworddoesnotexist.com', 'thispersondoesnotexist.com',
  'boredbutton.com', 'lofi.cafe', 'asoftmurmur.com', 'mynoise.net',
  'patatap.com', 'weavesilk.com', 'littlealchemy2.com', 'flightradar24.com',
  'worldometers.info', 'ciechanow.ski', 'pudding.cool', 'mapcrunch.com',
  'jigsawexplorer.com', 'howstuffworks.com',
]

const COUNT = 50
const HEIGHTS = [400, 460, 520, 600]

function shuffle(items) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function siteLabel(site) {
  return site.split('/')[0].replace(/^www\./, '')
}

function makeBatch(previous = []) {
  // Avoid repeating the immediately previous set whenever possible.
  const pool = SITES.filter((site) => !previous.includes(site))
  const candidates = pool.length >= COUNT ? pool : SITES
  return shuffle(candidates).slice(0, COUNT).map((site, index) => ({
    site,
    id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`,
    height: HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)],
  }))
}

function App() {
  const [tiles, setTiles] = useState(() => makeBatch())
  const [previousSites, setPreviousSites] = useState([])
  const [failedImages, setFailedImages] = useState({})
  const [batchNumber, setBatchNumber] = useState(1)

  const shuffleTiles = () => {
    const currentSites = tiles.map((tile) => tile.site)
    setPreviousSites(currentSites)
    setTiles(makeBatch(currentSites))
    setFailedImages({})
    setBatchNumber((number) => number + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const siteCount = useMemo(() => SITES.length, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === 'r' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        shuffleTiles()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [tiles])

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="intro">
          <p className="eyebrow">THE INTERNET IS YOUR PLAYGROUND</p>
          <h1>Bored? Pick a photo.</h1>
          <p className="subtitle">
            50 random photos. 50 different rabbit holes. Click one and see where the internet takes you.
          </p>
        </div>
        <div className="header-actions">
          <span className="batch-count">SET {String(batchNumber).padStart(2, '0')}</span>
          <button className="shuffle-button" id="shuffle" type="button" onClick={shuffleTiles}>
            <span aria-hidden="true">↻</span> Shuffle 50 new photos
          </button>
        </div>
      </header>

      <main>
        <div className="wall" id="wall" aria-label="Random websites gallery">
          {tiles.map((tile, index) => {
            const imageSeed = encodeURIComponent(tile.id)
            const imageUrl = `https://picsum.photos/seed/${imageSeed}/400/${tile.height}`
            return (
              <a
                className="tile"
                href={`https://${tile.site}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${siteLabel(tile.site)} in a new tab`}
                key={tile.id}
              >
                {failedImages[tile.id] ? (
                  <div className="image-fallback" role="img" aria-label="Photo unavailable">
                    <span aria-hidden="true">✳</span>
                    <small>PHOTO UNAVAILABLE</small>
                  </div>
                ) : (
                  <img
                    loading={index < 8 ? 'eager' : 'lazy'}
                    decoding="async"
                    width="400"
                    height={tile.height}
                    alt={`Random photo ${index + 1}`}
                    src={imageUrl}
                    onError={() => setFailedImages((current) => ({ ...current, [tile.id]: true }))}
                  />
                )}
                <span className="tile-caption">
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  {siteLabel(tile.site)}
                </span>
              </a>
            )
          })}
        </div>
      </main>

      <footer>
        <p>Photos by <a href="https://picsum.photos/" target="_blank" rel="noopener noreferrer">Picsum</a>. Destinations open in a new tab.</p>
        <p className="footer-note">{siteCount} destinations in the shuffle pool · Press <kbd>R</kbd> to shuffle</p>
      </footer>
    </div>
  )
}

export default App
