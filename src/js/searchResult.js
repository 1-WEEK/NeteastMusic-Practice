import $ from 'jquery'
import createSong from './createSong'

export default function (conf) {
  let $recommendSearch = $('.recommend-search'),
      $searchResult = $('.search-result')
  $recommendSearch.removeClass('active')
  $searchResult.addClass('active').text('')

  $.getJSON(conf.url + '/search?type=1&keywords=' + conf.keywords + '&limit=' + conf.limit + '&offset=' + conf.offset, data => {
    console.log(data)
    data.result.songs.forEach(song=>{
      $searchResult.append(createSong(song))
    })
  })
}