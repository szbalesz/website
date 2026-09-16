const q = `query { user(id: "01J271H92G000EMJ0VXF577YSV") { style { badge { id name tooltip host { url files { name width height format } } } } } }`;

fetch('https://7tv.io/v3/gql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: q })
})
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
  .catch(console.error);
