$(() => {
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
  $.get('/a.json', data=>{
    console.log(data)
  })
})