export default function (propData, i, top) {
  const data = propData;
  let index = i;
  if (!data.album) {
    data.album = data.al;
  }
  if (!data.alias) {
    data.alias = data.alia;
  }
  if (!data.artists) {
    data.artists = data.ar;
  }
  let highlight = '';
  let song =
    `<a href="./play.html?id=${data.id}" class="song borders">
  <div><p class="song-title">${data.name}<span class="sgalia">${data.alias[0] ? ` (${data.alias[0]})` : ''}</span></p>
  <p class="song-info">
    ${data.artists[0].name} - ${data.album.name}</p></div>
  <svg class="icon">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-song"></use>
  </svg>
</a>`;
  if (index || index > 99) {
    if (index < 4 && top) { highlight = 'highlight'; }
    if (index < 10) {
      index = `0${index}`;
    }
    song = `<div class="index">${index}</div>${song}`;
  }
  const songWrapper = `<div class="song-wrapper ${highlight}">${song}</div>`;
  return songWrapper;
}
