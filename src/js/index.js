import '../scss/index.scss'
import $ from 'jquery'
import loadPopularList from './popularList'
import createSong from './createSong'

$(() => {
  let url = '//192.168.2.104:2724',
    newSong = url + '/personalized/newsong',
    recommendPlaylist = url + '/personalized'

  // recommend playlist
  $.getJSON(recommendPlaylist, data => {
    let $playlists = $('.playlists')
    data = data.result
    console.log(data)

    function createPlaylist(data) {
      if (data.playCount / 10000 > 30) {
        data.playCount = Math.floor(data.playCount/10000) + ' 万'
      }
      let playlist = `<a class="playlist" href="/dist/playlist.html?id=${data.id}">
            <div class="playlist-cover">
              <img src="${data.picUrl.replace(/https?:\/\//, '//')}"alt="">
              <div class="playlist-num">
                <svg class="icon icon-erji">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-erji"></use>
                </svg>${data.playCount}</div>
            </div>
            <p class="title">${data.name}</p>
          </a>`
      return playlist
    }
    for(let i=0; i<data.length; ++i) {
      $playlists.append(createPlaylist(data[i]))
    }
  })

  // latest songs list
  $.getJSON(newSong, data => {
    let $latestList = $('.latest-list')
    data = data.result
    for (let i = 0; i < data.length; ++i) {
      $latestList.append(createSong(data[i].song))
    }
  })

  $('.site-nav').on('click', 'li', e => {
    let $li = $(e.currentTarget)
    let index = $li.index()
    if (index === 1) {
      //  popular songs list
      if ($li.attr('data-downloaded') != 'true') {
        $li.attr('data-downloaded', 'true')
        loadPopularList(url)
      }
    } else if (index == 2) {
      // search
      if ($li.attr('data-downloaded') != 'true') {
        $li.attr('data-downloaded', 'true')
      }
    }
    $li.addClass('active').siblings().removeClass('active')
    $('.container > div').eq(index).addClass('active').siblings().removeClass('active')
  })

})