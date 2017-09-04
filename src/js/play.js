import $ from 'jquery';
import '../scss/play.scss';
import loading from './loading';

$(() => {
  const url = '/api';
  let songId = '';
  let album = {};
  let blurPic = '//music.163.com/api/img/blur/';
  const song = document.createElement('audio');
  const $cover = $('.cover');
  const $background = $('.song-background');
  const $name = $('.song-name');
  const $author = $('.song-author');
  const $title = $('title');
  const $circle = $('.circle');
  const $lyric = $('.song-lrc>div');
  let $lyricItems = {};
  let NolyricState = false;
  let lyricTimer = null;
  let currentLyrItem = 0;
  let currentTime = 0;
  let nextItemTime = 0;
  let translateY = 0;

  function pause() {
    const iTransform = getComputedStyle($cover[0]).transform;
    const cTransform = getComputedStyle($circle[0]).transform;
    $circle[0].style.transform = cTransform === 'none' ?
      iTransform :
      iTransform.concat(' ', cTransform);

    $('.song-turn').removeClass('playing');
  }

  function play() {
    $('.song-turn').addClass('playing');
  }

  function parseTime(element) {
    const a = element.match(/(\d*):/)[1];
    if (a) {
      return (parseFloat(element.match(/:([^&]*)/)[1]) +
        (parseFloat(a) * 60)).toFixed(1);
    }
    return 0;
  }

  songId = location.search.match(/\bid=([^&]*)/)[1];
  $.getJSON(`${url}/music/url?id=${songId}`, (res) => {
    song.src = res.data[0].url;
  }).done(loading('loading-play'));
  $.getJSON(`${url}/song/detail?ids=${songId}`, (res) => {
    album = res.songs[0].al;
    blurPic += album.pic_str ? album.pic_str : album.pic;

    album.picUrl = album.picUrl.replace(/https?:\/\//, '//');
    album.picUrl += '?imageView&thumbnail=360x0&quality=75&tostatic=0';

    $cover[0].src = album.picUrl;
    $background.css('background-image', `url(${blurPic})`);

    $title.text(res.songs[0].name);
    $name.text(res.songs[0].name);
    $author.text(res.songs[0].ar[0].name);
  });
  $.getJSON(`${url}/lyric?id=${songId}`, (data) => {
    NolyricState = (data.nolyric && data.uncollected);

    song.onended = () => {
      clearTimeout(lyricTimer);
      song.pause();
      pause();
      $lyric.css('transform', `translateY(${0}px)`);
    };
    if (data.nolyric) {
      $lyric.append('<p>纯音乐，无歌词</p>');
      return;
    } else if (data.uncollected) {
      $lyric.append('<p>暂无歌词，求歌词</p>');
      return;
    }

    data.lrc.lyric.split('\n').forEach((element) => {
      if (element.length) {
        const obj = {
          time: element.match(/\[([^&]*)\]/)[1],
          data: element.match(/\]([^&]*)/)[1],
        };
        if (obj.data) {
          const lyricItem = `<p class='lyric-item' data-time='${obj.time}'>${obj.data}</p>`;
          $lyric.append(lyricItem);
        }
      }

      $lyricItems = $('.lyric-item');
      if (!currentLyrItem) {
        $($lyricItems[0]).addClass('active');
      }
    });
  });

  // play button
  $('.icon-play').on('touchstart', () => {
    song.play();
    play();
    if (!NolyricState) {
      lyricTimer = setInterval(() => {
        if (currentLyrItem >= $lyricItems.length) {
          clearTimeout(lyricTimer);
          return;
        }
        currentTime = parseFloat(song.currentTime).toFixed(1);
        nextItemTime = parseTime($($lyricItems[currentLyrItem]).attr('data-time'));
        if (currentTime === nextItemTime) {
          if (currentLyrItem) {
            $($lyricItems[currentLyrItem - 1]).removeClass('active');
          }
          $($lyricItems[currentLyrItem]).addClass('active');

          if (currentLyrItem > 1) {
            translateY -= parseInt($($lyricItems[currentLyrItem - 1]).height(), 10);
            $lyric.css('transform', `translateY(${translateY}px)`);
          }
          currentLyrItem += 1;
        }
      }, 100);
    }
  });
  $('.icon-pause').on('touchstart', () => {
    song.pause();
    pause();
    clearTimeout(lyricTimer);
  });
});
