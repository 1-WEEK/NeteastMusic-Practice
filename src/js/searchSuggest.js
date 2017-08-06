import $ from 'jquery'

export default function (conf) {
  let $suggestItems = $('.suggest-items')

  $suggestItems.text('')
  $.get(conf.api + '/search/suggest?keywords=' + conf.keywords, data => {
    data = data.result.songs
    data.forEach(element => {
      $suggestItems.append(createItem(element.name))
    })
  })

  function createItem(name) {
    return `<li class="recommend-item" data-name="${name}">
  <svg class="icon icon-search"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-search"></use></svg>
  <p class="borders">${name}</p>
</li>`
  }
}