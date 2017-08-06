import $ from 'jquery'

export default function (id) {
  $('#'+id).delay(500).fadeOut(300)
}