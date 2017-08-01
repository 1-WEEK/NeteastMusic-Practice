import $ from 'jquery'
import createSong from './createSong'

export default function (url) {
  let popularUrl = url + '/top/list?idx=1',
    updateTime

  $.getJSON(popularUrl, data => {
    data = data.result
    updateTime = new Date(data.updateTime)
    console.log('++++++++=')
    $('.update-time').text(`更新日期：${updateTime.getMonth()+1} 月 ${updateTime.getDate()} 日`)
    for (let i = 0, length = 20; i<length; ++i) {
      $('.popular-list').append(createSong(data.tracks[i], i+1, true))
    }
  })
}