import '../scss/playlist.scss'
import $ from 'jquery'

let url = '//192.168.123.132:2724',
  playlistDetail = url + '/playlist/detail?id=',
  playlistId = '712491491'

$.getJSON(playlistDetail+playlistId, data=>{
  console.log(data)
  console.log(data.playlist.description.split('\n'))
})