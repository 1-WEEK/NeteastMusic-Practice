import $ from 'jquery'

export default function(conf) {
  let $suggestItems = $('.suggest-items')

  $suggestItems.text('')
  $.getJSON(conf.api + '/search/suggest?keywords=' + conf.keywords, data => {
    data = data.result.songs
    console.log($suggestItems)
    data.forEach(element => {
      $suggestItems.append(createItem(element.name))
      console.log(element)
    })
  })

  function createItem(name) {
    return `<li class="recommend-item ">
  <svg class="icon icon-search"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-search"></use></svg>
  <p class="borders">${name}</p>
</li>`
  }
}