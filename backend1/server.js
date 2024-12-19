const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log("Database Ready!"))

const adminEnpoind = require('./Routes/AdminRoutes')
const pengunjungEnpoind = require('./Routes/PengunjungRoutes')
const KunjunganEnpoind = require('./Routes/KunjunganRoutes')
const session = require('express-session')

const app = express()
app.use(express.json())
// app.use(cors())

app.use(cors({ 
  origin: "http://localhost:3000", 
  credentials: true 
}));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/api/admin', adminEnpoind)
app.use('/api/pengunjung', pengunjungEnpoind)
app.use('/api/Kunjungan', KunjunganEnpoind)

app.listen(port, () => {console.log(`server running to port ${port}`)})