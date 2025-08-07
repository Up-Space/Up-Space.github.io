const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public')); // Serve static files
app.use(express.json()); // Parse JSON requests

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve your main HTML file
});

// Replit Auth configuration
app.get('/login', (req, res) => {
  res.send(`
    <h1>Login with Replit</h1>
    <div>
      <script
        authed="location.reload()"
        src="https://auth.util.repl.co/script.js"
      ></script>
    </div>
  `);
});

app.get('/auth', (req, res) => {
  if (req.headers['x-replit-user-name']) {
    res.json({
      authenticated: true,
      user: {
        id: req.headers['x-replit-user-id'],
        name: req.headers['x-replit-user-name'],
        roles: req.headers['x-replit-user-roles']
      }
    });
  } else {
    res.json({
      authenticated: false
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});