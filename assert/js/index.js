$(()=>{
  $('.site-nav').on('click', 'li', e=>{
    let $li = $(e.currentTarget)
    let index = $li.index()
    if (index === 1) {

    } else if (index ===2) {

    }
  })
})