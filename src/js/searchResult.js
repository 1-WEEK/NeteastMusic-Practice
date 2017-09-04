import $ from 'jquery';
import createSong from './createSong';
import loading from './loading';

export default function (conf) {
  $('#loading-search').show();
  const $recommendSearch = $('.recommend-search');
  const $searchResult = $('.search-result');
  const $history = $('.search-history');
  $recommendSearch.removeClass('active');
  $searchResult.addClass('active').text('');
  $history.removeClass('active');

  $.getJSON(`${conf.url}/search?type=1&keywords=${conf.keywords}&limit=${conf.limit}&offset=${conf.offset}`, (data) => {
    data.result.songs.forEach((song) => {
      $searchResult.append(createSong(song));
    });
  }).done(loading('loading-search'));
}
