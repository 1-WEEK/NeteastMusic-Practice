$(() => {
  let url = '//localhost:2724',
    popularUrl = url + '/top/list?idx=1',
    recommendList = url + '/top/playlist?limit=10'

  $('.site-nav').on('click', 'li', e => {
    let $li = $(e.currentTarget)
    let index = $li.index()
    if (index === 1) {
      if ($li.attr('data-downloaded') != true) {
        console.log($li)
        $li.attr('data-downloaded', 'true')
      }
    } else if (index === 2) {
      if ($li.attr('data-downloaded') != true) {
        console.log($li)
        $li.attr('data-downloaded', 'true')
      }
    }
    $li.addClass('active').siblings().removeClass('active')
    $('.container > div').eq(index).addClass('active').siblings().removeClass('active')
  })
  $.getJSON(popularUrl, data => {
    console.log(data)
  })
  $.getJSON('http://localhost:2724/search?keywords=%27you%20say%20run%27', data=>{
    console.log('this is search')
    console.log(data)
  })
})