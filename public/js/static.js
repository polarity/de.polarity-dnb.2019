var mp3Player = {}
mp3Player.path = 'https://polaritymusic.s3.amazonaws.com/album/growing-old/'
mp3Player.list = [
  {file: 'Polarity-%28Growing%20Old%29-01_-_Sunrize.mp3', title: 'Sunrize', artist: 'Polarity', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-02_-_Wo%20Sind%20Denn%20Die%20%28feat.%20Cyrilla%29.mp3', title: 'Wo sind denn die?', artist: 'Polarity', feat: 'Cyrilla', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-03_-_Wald.mp3', title: 'Wald', artist: 'Polarity', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-04_-_Fleek%20%28feat.%20Jericho%20%26%20Skyence%29.mp3', title: 'Fleek', artist: 'Polarity', feat: 'Jericho & Skyence', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-05_-_Trisexual%20%28feat.%20Wellnesspunk%29.mp3', title: 'Trisexual', artist: 'Polarity', feat: 'Wellnesspunk', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-06_-_Black%20Moon.mp3', title: 'Black Moon', artist: 'Polarity', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-07_-_Ghetto%20Clarinet.mp3', title: 'Ghetto Clarinet', artist: 'Polarity', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-08_-_Comeback.mp3', title: 'Comeback', artist: 'Polarity', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-09_-_Breed.mp3', title: 'Breed', artist: 'Polarity', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-10_-_Schiff.mp3', title: 'Schiff', artist: 'Polarity', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-11_-_Summer%20Break%20%28feat.%20Jericho%29.mp3', title: 'Summerbreak', artist: 'Polarity', feat: 'Jericho', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-12_-_Nahtraum%20%28feat.%20Wellnesspunk%29.mp3', title: 'Nahtraum', artist: 'Polarity', feat: 'Wellnesspunk', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-13_-_Jupiter.mp3', title: 'Jupiter', artist: 'Polarity', number: 1},
  {file: 'Polarity-%28Growing%20Old%29-14_-_Abendrot.mp3', title: 'Abendrot', artist: 'Polarity', number: 1}
]
mp3Player.index = 0
window.onload = function () {
  mp3Player.wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#939386',
    progressColor: '#556f49',
    backend: 'MediaElement'
  })

  mp3Player.wavesurfer.on('loading', function (status) {
    $('.duration').text('--')
    $('.position').text('--')
    var loadingBar = document.querySelector('.loading')
    loadingBar.style.display = 'block'
    var progressbar = document.querySelector('.progressbar')
    progressbar.style.width = status + '%'
  })

  mp3Player.wavesurfer.on('ready', function () {
    var loadingBar = document.querySelector('.loading')
    loadingBar.style.display = 'none'
    mp3Player.playFile()
  })

  mp3Player.wavesurfer.on('audioprocess', function () {
    $('.duration').text(
      (mp3Player.wavesurfer.getDuration() / 60).toFixed(2).replace('.', ':'))
    $('.position').text(
      (mp3Player.wavesurfer.getCurrentTime() / 60).toFixed(2).replace('.', ':')
    )
  })
  mp3Player.wavesurfer.on('finish', function () {
    mp3Player.next()
    mp3Player.load(mp3Player.list[mp3Player.index])
  })

  mp3Player.next = function () {
    if ((mp3Player.index + 2) > mp3Player.list.length) {
      mp3Player.index = 0
    } else {
      mp3Player.index = mp3Player.index + 1
    }
  }
  mp3Player.load = function (fileObj) {
    var url = mp3Player.path + fileObj.file
    mp3Player.wavesurfer.load(url)
  }
  mp3Player.goToIndex = function (index) {
    mp3Player.index = index
    mp3Player.load(mp3Player.list[mp3Player.index])
  }
  mp3Player.playFile = function () {
    mp3Player.wavesurfer.playPause()
  }

  // init
  mp3Player.load(mp3Player.list[mp3Player.index])

  var createPlaylist = function () {
    $.each(mp3Player.list, function (key, mp3) {
      var feat = ''
      if (mp3.feat) {
        feat = ' (feat.: ' + mp3.feat + ')'
      }
      var listEl = $('<li><a onclick="mp3Player.goToIndex(' + key + ')">' + (key + 1) + ' ' + mp3.artist + ' - ' + mp3.title + feat + '</a></li>')
      $('.track_list').append(listEl)
    })
  }
  createPlaylist()
}
