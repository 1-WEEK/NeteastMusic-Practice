import $ from 'jquery';
import loadSearchResult from './searchResult';
import loadSearchSuggest from './searchSuggest';
import history from './history';


export default function (url) {
  // const suggest = `${url}/search/suggest?keywords=`;
  const $input = $('.search-input');
  const $close = $('.icon-close');
  const $recommendSearch = $('.recommend-search');
  const $searchResult = $('.search-result');
  const $suggestItems = $('.suggest-items');
  const $history = $('.search-history');

  function throttle(md, context) {
    const method = md;
    clearTimeout(method.tId);
    method.tId = setTimeout(() => {
      method(context);
    }, 500);
  }

  function showSearchIndex() {
    $history.children('ul').text('');
    const arr = history.get();
    console.log(arr);
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      $history.children('ul').append(`<li class="history-item borders" data-name="${arr[i]}">
            <svg class="icon icon-time">
              <use xlink:href="#icon-time"></use>
            </svg>
            ${arr[i]}
            <svg class="icon icon-cross">
              <use xlink:href="#icon-cross"></use>
            </svg>
          </li> `);
    }
  }
  showSearchIndex();

  $input.on('keyup', (e) => {
    if ($input.val()) {
      $close.addClass('show');
      $recommendSearch.addClass('active');
      $searchResult.removeClass('active');
      $history.removeClass('active');

      if (e.keyCode !== 13) {
        throttle(loadSearchSuggest, {
          api: url,
          keywords: $input.val(),
        });
      }

      if (e.keyCode === 13) {
        loadSearchResult({
          url,
          limit: 20,
          keywords: $input.val(),
          offset: 0,
        });
        history.add($input.val());
      }
    } else {
      showSearchIndex();
    }
  });

  $close.on('click', () => {
    $input.val('');
    showSearchIndex();
  });

  $history.on('click', '.icon-cross', (e) => {
    const $item = $(e.currentTarget).parent('.history-item');
    $item.remove();
    history.delete($item.attr('data-name'));
  });
  $history.on('click', '.history-item', (e) => {
    if (e.target.classList[1] && e.target.classList[1] !== 'icon-cross') {
      loadSearchResult({
        url,
        limit: 20,
        keywords: e.currentTarget.getAttribute('data-name'),
        offset: 0,
      });
      $close.addClass('show');
      $input.val(e.currentTarget.getAttribute('data-name'));
    }
  });
  $suggestItems.on('click', '.recommend-item', (e) => {
    loadSearchResult({
      url,
      limit: 20,
      keywords: $(e.currentTarget).attr('data-name'),
      offset: 0,
    });
  });

  $('#loading-suggest').hide();
  $close.removeClass('show');
  $recommendSearch.removeClass('active');
  $searchResult.removeClass('active').text('');
  $history.addClass('active');
}
