import '../scss/play.scss'
import $ from 'jquery'

$(() => {
  let url = '//139.199.219.110:2724',
    songId = '',
    album = {},
    blurPic = '//music.163.com/api/img/blur/',
    song = document.createElement('audio'),
    $cover = $('.cover'),
    $background = $('.song-background'),
    $name = $('.song-name'),
    $author = $('.song-author'),
    $title = $('title'),
    $circle = $('.circle')

  let isPlaying = false;

  songId = location.search.match(/\bid=([^&]*)/)[1]
  console.log(songId)
  $.getJSON(url + '/music/url?id=' + songId, res => {
    song.src = res.data[0].url
  })
  $.get(url + '/song/detail?ids=' + songId, res => {
    album = res.songs[0].al
    blurPic += album.pic_str ? album.pic_str : album.pic;

    album.picUrl = album.picUrl.replace(/https?:\/\//, '//')
    // album.picUrl = album.picUrl.replace('.jpg', '/music.163.com/api/img/blur/33930928967155923393092896715592')
    album.picUrl += '?imageView&thumbnail=360x0&quality=75&tostatic=0'

    $cover[0].src = album.picUrl
    $background.css('background-image', 'url(' + blurPic + ')')

    $title.text(res.songs[0].name)
    $name.text(res.songs[0].name)
    $author.text(res.songs[0].ar[0].name)
    console.log(res)
  })

  $('.icon-play').on('touchstart', function () {
    song.play()
    play()
    console.log('++++++++++pause++++++++++++')
  })
  $('.icon-pause').on('touchstart', () => {
    song.pause()
    pause()
  })

  function pause() {
    isPlaying = false;
    var iTransform = getComputedStyle($cover[0]).transform;
    var cTransform = getComputedStyle($circle[0]).transform;
    $circle[0].style.transform = cTransform === 'none' ?
      iTransform :
      iTransform.concat(' ', cTransform);

    $('.song-turn').removeClass('playing')
  }

  function play() {
    isPlaying = true;
    $('.song-turn').addClass('playing')
  }
})