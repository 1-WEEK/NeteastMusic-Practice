import $ from 'jquery'
import createSong from './createSong'
import loading from './loading'

export default function (conf) {
  $('#loading-search').show()
  let $recommendSearch = $('.recommend-search'),
      $searchResult = $('.search-result')
  $recommendSearch.removeClass('active')
  $searchResult.addClass('active').text('')

  $.get(conf.url + '/search?type=1&keywords=' + conf.keywords + '&limit=' + conf.limit + '&offset=' + conf.offset, data => {
    console.log(data)
    data.result.songs.forEach(song=>{
      $searchResult.append(createSong(song))
    })
  }).done(loading('loading-search'))
}