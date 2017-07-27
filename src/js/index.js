import '../scss/index.scss'
import $ from 'jquery'
import loadPopularList from './popularList'

$(() => {
  let url = '//localhost:2724',
    newSong = url + '/personalized/newsong',
    recommendPlaylist = url + '/personalized'

  $('.site-nav').on('click', 'li', e => {
    let $li = $(e.currentTarget)
    let index = $li.index()
    if (index === 1) {
      //  popular list
      if ($li.attr('data-downloaded') != 'true') {
        $li.attr('data-downloaded', 'true')
        loadPopularList(url)
      }
    } else if (index === 2) {
      // search
      if ($li.attr('data-downloaded') != 'true') {
        $li.attr('data-downloaded', 'true')
      }
    }
    $li.addClass('active').siblings().removeClass('active')
    $('.container > div').eq(index).addClass('active').siblings().removeClass('active')
  })

})