import $ from 'jquery';
import createSong from './createSong';
import loading from './loading';

export default function (url) {
  const popularUrl = `${url}/top/list?idx=1`;
  let updateTime = null;

  $.getJSON(popularUrl, (propData) => {
    const data = propData.result;
    updateTime = new Date(data.updateTime);
    $('.update-time').text(`更新日期：${updateTime.getMonth() + 1} 月 ${updateTime.getDate()} 日`);
    for (let i = 0, length = 20; i < length; i += 1) {
      $('.popular-list').append(createSong(data.tracks[i], i + 1, true));
    }
  }).done(loading('loading-popular'));
}
