import $ from 'jquery';
import '../scss/index.scss';
import loadPopularList from './popularList';
import createSong from './createSong';
import loadSearch from './search';
import loading from './loading';

function createPlaylist(propData) {
  const data = propData;
  data.playCount = Math.floor(data.playCount);
  if (data.playCount / 10000 > 30) {
    data.playCount = `${Math.floor(data.playCount / 10000)} 万`;
  }
  data.picUrl = data.picUrl.replace(/https?:\/\//, '//');

  // check chrome
  if (!!window.chrome && !!window.chrome.webstore) {
    data.picUrl = data.picUrl.replace('.jpg', '.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp');
  } else {
    data.picUrl += '?imageView&thumbnail=360x0&quality=75&tostatic=0';
  }

  const playlist = `<a class="playlist" href="./playlist.html?id=${data.id}">
        <div class="playlist-cover">
          <img src="${data.picUrl}"alt="">
          <div class="playlist-num">
            <svg class="icon icon-erji">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-erji"></use>
            </svg>${data.playCount}</div>
        </div>
        <p class="title">${data.name}</p>
      </a>`;
  return playlist;
}

$(() => {
  const url = '/api';
  const newSong = `${url}/personalized/newsong`;
  const recommendPlaylist = `${url}/personalized`;

  // recommend playlist
  $.getJSON(recommendPlaylist, (propData) => {
    const $playlists = $('.playlists');
    const data = propData.result;

    data.forEach((e) => {
      $playlists.append(createPlaylist(e));
    });
  }).done(loading('loading-playlists'));

  // latest songs list
  $.getJSON(newSong, (propData) => {
    let data = propData;
    const $latestList = $('.latest-list');
    data = data.result;
    data.forEach((e) => {
      $latestList.append(createSong(e.song));
    });
  }).done(loading('loading-latest'));

  // tabs
  $('.site-nav').on('click', 'li', (e) => {
    const $li = $(e.currentTarget);
    const index = $li.index();
    if (index === 1) {
      //  popular songs list
      if ($li.attr('data-downloaded') !== 'true') {
        $li.attr('data-downloaded', 'true');
        loadPopularList(url);
      }
    } else if (index === 2) {
      // search
      if ($li.attr('data-downloaded') !== 'true') {
        $li.attr('data-downloaded', 'true');
        loadSearch(url);
      }
    }
    $li.addClass('active').siblings().removeClass('active');
    $('.container > div').eq(index).addClass('active').siblings()
      .removeClass('active');
  });
});
