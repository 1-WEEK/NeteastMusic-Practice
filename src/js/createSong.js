import $ from 'jquery'

export default function (data, index) {
  let highlight = ''
  let song =
    `<a href="./play.html?id=${data.id}" class="song borders">
  <div><p class="song-title">${data.name}<span class="sgalia">${data.alias[0] ? ' ('+data.alias[0]+')' : ''}</span></p>
  <p class="song-info">
    ${data.artists[0].name} - ${data.album.name}</p></div>
  <svg class="icon">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
  </svg>
</a>`
  if (index) {
    if (index < 10)
      index = '0' + index
    if (index < 4)
      highlight = 'highlight'
    song = `<div class="index">${index}</div>` + song
  }
  let songWrapper = `<div class="song-wrapper ${highlight}">${song}</div>`
  return songWrapper
}