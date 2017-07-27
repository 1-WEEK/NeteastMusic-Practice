import '../scss/index.scss'
import $ from 'jquery'
import loadPopularList from './popularList'
import createSong from './createSong'

$(() => {
  let url = '//localhost:2724',
    newSong = url + '/personalized/newsong',
    recommendPlaylist = url + '/personalized'

  // latest songs list
  $.getJSON(newSong, data => {
    let $latestList = $('.latest-list')
    data = data.result
    console.log(data)
    for (let i = 0; i < data.length; ++i) {
      $latestList.append(createSong(data[i].song))
      console.log(data[i].song.artists[0])
    }
  })

  $('.site-nav').on('click', 'li', e => {
    let $li = $(e.currentTarget)
    let index = $li.index()
    if (index === 1) {
      //  popular songs list
      if ($li.attr('data-downloaded') != 'true') {
        $li.attr('data-ownloaded', 'true')
        loadPopularList(url)
      }
    } else if (index == 2) {
      // search
      if ($li.attr('data-downloaded') != 'true') {
        $li.attr('data-ownloaded', 'true')
      }
    }
    $li.addClass('activ').siblings().removeClass('active')
    $('.container > div').eq(index).addClass('active').siblings().removeClass('active')
  })

})