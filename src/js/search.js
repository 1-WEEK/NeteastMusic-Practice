import $ from 'jquery'
import loadSearchResult from './searchResult'
import loadSearchSuggest from './searchSuggest'
import history from './history'

export default function (url) {
  let suggest = url + '/search/suggest?keywords=',
    $input = $('.search-input'),
    $close = $('.icon-close'),
    $recommendSearch = $('.recommend-search'),
    $searchResult = $('.search-result'),
    $suggestItems = $('.suggest-items'),
    $history = $('.search-history')

  showSearchIndex()

  $input.on('keyup change', e => {
    if ($input.val()) {
      $close.addClass('show')
      $recommendSearch.addClass('active')
      $searchResult.removeClass('active')
      $history.removeClass('active')


      throttle(
        loadSearchSuggest, {
          api: url,
          keywords: $input.val()
        })


      if (e.keyCode == 13) {
        loadSearchResult({
          url: url,
          limit: 20,
          keywords: $input.val(),
          offset: 0
        })
        history.add($input.val())
      }

    } else {
      showSearchIndex()
    }
  })

  $close.on('click', e => {
    $input.val('')
    showSearchIndex()
  })

  $history.on('click', '.icon-cross', e => {
    let $item = $(e.currentTarget).parent('.history-item')
    $item.remove()
    history.delete($item.attr('data-name'))
  })
  $history.on('click', '.history-item', e => {
    if (e.target.classList[1] && e.target.classList[1] != 'icon-cross') {
      loadSearchResult({
        url: url,
        limit: 20,
        keywords: e.currentTarget.getAttribute('data-name'),
        offset: 0
      })
      $close.addClass('show')
      $input.val(e.currentTarget.getAttribute('data-name'))
      console.log(e)
    }
  })
  $suggestItems.on('click', '.recommend-item', e => {
    loadSearchResult({
      url: url,
      limit: 20,
      keywords: $(e.currentTarget).attr('data-name'),
      offset: 0
    })
  })

  function throttle(method, context) {
    clearTimeout(method.tId)
    method.tId = setTimeout(function () {
      method(context)
    }, 1000);
  }

  function showSearchIndex() {
    $history.children('ul').text('')
    history.get().forEach(e => {
      $history.children('ul').append(`<li class="history-item borders" data-name="${e}">
            <svg class="icon icon-time">
              <use xlink:href="#icon-time"></use>
            </svg>
            ${e}
            <svg class="icon icon-cross">
              <use xlink:href="#icon-cross"></use>
            </svg>
          </li> `)
    })
    $('.loading').hide()
    $close.removeClass('show')
    $recommendSearch.removeClass('active')
    $searchResult.removeClass('active').text('')
    $history.addClass('active')
  }
  console.log(history.get())
  // for (let i = 0; i < 21; i++) {
  //   h.add('no. ' + i)
  // }
  // h.delete('no. 12')
  // console.log(h.get())
}