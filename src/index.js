// babel polyfill can be removed when ie11 support drops
import 'babel-polyfill'

import { h, render, Component } from 'preact'

const styles = {

}

class NinaPlayer extends Component {
  constructor (props) {
    super()
    this.state = {
      currentItem: undefined
    }
    this.Player = document.createElement('audio')

    // set the playlist
    this.Data = [
      {mp3: 'Hoerspiel-_Kurze_Zeit_in_Saus_und_Braus.mp3', text: 'Hörspiel- Kurze Zeit in Saus und Braus'},
      {mp3: 'Hoerspiel-mit_Charles_Rettinghaus.mp3', text: 'Hörspiel mit Charles Rettinghaus'},
      {mp3: 'Image-Cecini-0162-_5134909.mp3', text: 'Hörspiel 4'},
      {mp3: 'Synchron_J.Connelly_nachgesprochen_N.Cecini_0162-_5134909.mp3', text: 'Synchronsprecherin Jennifer Connelly'},
      {mp3: 'Synchron_H.Berry_nachgesprochen_N.Cecini_0162-_5134909.mp3', text: 'Synchronsprecherin Halle Berry'},
      {mp3: 'Synchron_S.Weaver_nachgesprochen_N.Cecini_0162-_5134909.mp3', text: 'Synchronsprecherin Sigourney Weaver'},
      {mp3: 'Synchron_N.Cecini.mp3', text: 'Synchronsprecherin Nina Cecini'},
      {mp3: 'Hoerspiel-mit_ChrRode_N.Cecini_0162-_5134909.mp3', text: 'Hörspiel mit Christian Rode'},
      {mp3: 'Telefonansage_Nina_Cecini_0162-_5134909_1_.mp3', text: 'Telefonansage Debitel'}
    ]
  }
  stop () {
    this.Player.pause()
    this.Player.currentTime = 0
  }
  play () {
    this.Player.src = this.state.currentFile
    this.Player.play()
  }
  handleClickStop () {
    this.setState({currentItem: undefined, currentFile: undefined})
    this.stop()
  }
  handleClickPlay (index, item) {
    const path = 'audio/'
    this.setState({currentItem: index, currentFile: path + item.mp3})
    this.play()
  }

  render (props) {
    return (<div>
      <ul class='playlist'>
        {this.Data.map((item, index) => {
          if (index === this.state.currentItem) {
            return (<li class='active' onClick={this.handleClickStop.bind(this)}>{item.text}</li>)
          } else {
            return (<li onClick={this.handleClickPlay.bind(this, index, item)}>{item.text}</li>)
          }
        })}
      </ul>
    </div>)
  }
}
render(<NinaPlayer />, document.querySelector('.music-cover-list'))
