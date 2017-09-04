import $ from 'jquery';

function createItem(name) {
  return `<li class="recommend-item" data-name="${name}">
  <svg class="icon icon-search"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-search"></use></svg>
  <p class="borders">${name}</p>
</li>`;
}

export default function (conf) {
  const $suggestItems = $('.suggest-items');

  $suggestItems.text('');
  $.getJSON(
    `${conf.api}/search/suggest?keywords=${conf.keywords}`,
    (propData) => {
      const data = propData.result.songs;
      data.forEach((element) => {
        $suggestItems.append(createItem(element.name));
      });
    },
  );
}
