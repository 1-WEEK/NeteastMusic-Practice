import $ from 'jquery'
import loadSearchResult from './searchResult'
import loadSearchSuggest from './searchSuggest'
let suggestResult = {}

export default function (url) {
  let suggest = url + '/search/suggest?keywords=',
    $input = $('.search-input'),
    $close = $('.icon-close'),
    $recommendSearch = $('.recommend-search'),
    $searchResult = $('.search-result'),
    $suggestItems = $('.suggest-items')

  $input.on('paste keyup', e => {
    if ($input.val()) {
      $close.addClass('show')
      $recommendSearch.addClass('active')
      $searchResult.removeClass('active')

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
      }

    } else {
      showSearchIndex()
    }
  })

  $close.on('click', e => {
    $input.val('')
    showSearchIndex()
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
    $close.removeClass('show')
    $recommendSearch.removeClass('active')
    $searchResult.removeClass('active').text('')
  }

}