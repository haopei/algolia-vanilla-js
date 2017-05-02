// initialize the algolia client
// given the `Application ID` and `Search-Only API Key`
var algoiaClient = algoliasearch('W2X4985BUI', 'f8bb043934edc7c303304d04bec35bb7');

// then, retrieve existing 'contacts' index from Algolia servers
var index = algoiaClient.initIndex('contacts');

// performs a search query against a provided index
function search(query, index) {
  index.search(query, function(err, content) {
      if (err) {
        console.log(err);
      } else {
        renderResults(content);
      }
  })
}

function renderResults(results) {
  var resultsDiv = document.querySelector('#results');
  resultsDiv.innerHTML = '';
  results.hits.forEach(function(hit) {
    let pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(hit);
    resultsDiv.append(pre);
  })
}

// wire up the event listener on the search input box
var searchInput = document.querySelector('#searchInput');
searchInput.addEventListener('keydown', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    var query = e.target.value;
    search(query, index);
  }
});
