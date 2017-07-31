import '../scss/playlist.scss'
import $ from 'jquery'
import createSong from './createSong'

$(() => {
  let url = '//192.168.123.132:2724',
    playlistDetail = url + '/playlist/detail?id=',
    playlistId = '',
    $bg = $('.list-header-bg'),
    $name = $('.list-title'),
    $playCount = $('.playlist-num>p'),
    $cover = $('.playlist-cover>img'),
    $usrName = $('.list-author>p'),
    $usrAvatar = $('.u-avatar'),
    $tags = $('.list-tags'),
    $des = $('.description'),
    $songs = $('.list-songs'),
    bgPic = ''

    playlistId = location.search.match(/\bid=([^&]*)/)[1]

  $.getJSON(playlistDetail + playlistId, data => {
    console.log(data)
    data = data.playlist
    $('title').text(data.name)
    $name.text(data.name)
    $usrName.text(data.creator.nickname)

    // play count
    data.playCount = Math.floor(data.playCount)
    if (data.playCount / 10000 > 30) {
      data.playCount = Math.floor(data.playCount / 10000) + ' 万'
    }
    $playCount.text(data.playCount)
    //info
    data.tags.forEach(tag => {
      $tags.append(createTag(tag))
    })
    // console.log(data.tags)
    data.description = '简介：' + data.description
    data.description.split('\n').forEach(e => {
      $des.append(createP(e))
    })

    // pic
    bgPic += '//music.163.com/api/img/blur/' + (data.coverImgId_str ? data.coverImgId_str : data.coverImgId).toString() + '.jpg?imageView&thumbnail=40x0&quality=75&tostatic=0'
    data.creator.avatarUrl = data.creator.avatarUrl.replace(/https?:\/\//, '//')
    data.coverImgUrl = data.coverImgUrl.replace(/https:\/\//, '//')

    // check chrome
    if (!!window.chrome && !!window.chrome.webstore) {
      data.creator.avatarUrl = data.creator.avatarUrl.replace('.jpg', '.webp?imageView&thumbnail=60x0&quality=75&tostatic=0&type=webp')
      data.coverImgUrl = data.coverImgUrl.replace('.jpg', '.webp?imageView&thumbnail=252x0&quality=75&tostatic=0&type=webp')
    } else {
      // data.avatarUrl += '?imageView&thumbnail=360x0&quality=75&tostatic=0'
      data.creator.avatarUrl += '?imageView&thumbnail=60x0&quality=75&tostatic=0'
      data.coverImgUrl += '?imageView&thumbnail=252x0&quality=75&tostatic=0'
    }
    // console.log(data.playlist.description.split('\n'))
    $bg.css('background-image', 'url(' + bgPic + ')')
    $usrAvatar[0].src = data.creator.avatarUrl
    $cover[0].src = data.coverImgUrl

    // console.log(createSong(data.tracks[0]))
    data.tracks.forEach(song=>{
      $songs.append(createSong(song))
    })
  })
  $('.list-intro-arrows').on('click', e=>{
    $('.icon-more').toggleClass('active')
    $('.icon-less').toggleClass('active')
    $('.description').toggleClass('active')
  })
  function createTag(tag) {
    return `<div class="list-tag borders">${tag}</div>`
  }

  function createP(e) {
    return `<span>${e}<br></span>`
  }
})