const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const css = `
  <style>
    body {
      background-color: #f0f0f2;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 5em auto;
      padding: 2em;
      background-color: #fff;
      border-radius: 0.5em;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    input[type="text"] {
      width: 80%;
      padding: 0.5em;
      margin: 1em 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 0.5em 1em;
      background-color: #38488f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #2c3771;
    }
    pre {
      text-align: left;
      background: #f4f4f4;
      padding: 1em;
      overflow-x: auto;
      border-radius: 5px;
    }
  </style>
`;

app.get('/', (req, res) => {
  res.send(`
    ${css}
    <div class="container">
      <h1>Meta already stole our data 😈</h1>
      <form method="GET" action="/fetch">
        <input type="text" name="url" placeholder="http://example.com" />
        <br>
        <button type="submit">Fetch URL</button>
      </form>
    </div>
  `);
});

app.get('/fetch', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await axios.get(targetUrl);
    res.send(`
      ${css}
      <div class="container">
        <h2>Response from ${targetUrl}:</h2>
        <pre>${JSON.stringify(response.data, null, 2)}</pre>
      </div>
    `);
  } catch (err) {
    res.status(500).send(`
      ${css}
      <div class="container">
        <h2>Error fetching from ${targetUrl}:</h2>
        <pre>${err.message}</pre>
      </div>
    `);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SSRF demo app running at http://localhost:${PORT}`);
});
