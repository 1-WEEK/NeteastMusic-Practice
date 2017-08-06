import $ from 'jquery'
import createSong from './createSong'
import loading from './loading'

export default function (conf) {
  $('#loading-search').show()
  let $recommendSearch = $('.recommend-search'),
    $searchResult = $('.search-result'),
    $history = $('.search-history')
  $recommendSearch.removeClass('active')
  $searchResult.addClass('active').text('')
  $history.removeClass('active')

  $.get(conf.url + '/search?type=1&keywords=' + conf.keywords + '&limit=' + conf.limit + '&offset=' + conf.offset, data => {
    console.log(data)
    data.result.songs.forEach(song => {
      $searchResult.append(createSong(song))
    })
  }).done(loading('loading-search'))
}