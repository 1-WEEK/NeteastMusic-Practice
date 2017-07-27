import $ from 'jquery'

export default function (data, index) {
  let highlight = ''
  let song =
    `<a href="/dist/play.html?id=${data.id}" class="song borders">
  <p class="song-title">${data.name}</p>
  <p class="song-info">
    ${data.artists[0].name} - ${data.album.name}</p>
  <svg class="icon">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
  </svg>
</a>`
  if (index) {
    if (index < 10)
      index = '0' + index
    if (index <4)
      highlight = 'highlight'
    song = `<div class="index">${index}</div>` + song
  }
  let songWrapper = `<div class="song-wrapper ${highlight}">${song}</div>`
  return songWrapper
}