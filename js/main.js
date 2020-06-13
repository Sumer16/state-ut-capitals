const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
  const res = await fetch('../data/states.json');
  const states = await res.json();

  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if(searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputInfo(matches);
}

const outputInfo = (info) => {
  if(info.length > 0) {
    const html = info.map(matchy => `
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h4>${matchy.name} (${matchy.abbr}) <span>${matchy.capital}</span></h4>
            <small>Lat: ${matchy.lat} / Long: ${matchy.long}</small>
          </div>
        </div>
      </div>
    `).join('');

    matchList.innerHTML = html;
  }
}

search.addEventListener('input', () => searchStates(search.value));