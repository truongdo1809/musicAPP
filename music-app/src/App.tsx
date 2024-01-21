
import './App.css'
import Music from './components/Music'
import MusicProvider from './components/MusicContext'
import MusicList from './components/MusicList'


function App() {


  return (
    <MusicProvider>
    <Music/>
      <MusicList/>
    </MusicProvider>
  )
}

export default App
