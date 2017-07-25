import '../scss/play.scss'
import $ from 'jquery'

$(() => {
  let url = '//localhost:2724',
    songId = '',
    album = {},
    blurPic = '//music.163.com/api/img/blur/',
    song = document.createElement('audio'),
    $cover = $('.cover'),
    $background = $('.song-background'),
    $name = $('.song-name'),
    $author = $('.song-author'),
    $title = $('title')

  songId = location.search.match(/\bid=([^&]*)/)[1]
  console.log(songId)

  $.get(url + '/song/detail?ids=' + songId, res => {
    album = res.songs[0].al
    blurPic += album.pic_str ? album.pic_str : album.pic;

    album.picUrl = album.picUrl.replace(/https?:\/\//, '//')
    album.picUrl = album.picUrl.replace('.jpg', '/music.163.com/api/img/blur/33930928967155923393092896715592')

    $cover[0].src = album.picUrl
    $background.css('background-image', 'url(' + blurPic + ')')

    $title.text(res.songs[0].name)
    $name.text(res.songs[0].name)
    $author.text(res.songs[0].ar[0].name)
  })

  $.getJSON(url + '/music/url?id=' + songId, res => {
    song.src = res.data[0].url
  })

  $('.icon-play').on('touchstart', function () {
    song.play()
    $('.song-turn').addClass('playing')
  })
  $('.icon-pause').on('touchstart', () => {
    song.pause()
    $('.song-turn').removeClass('playing')
  })
})