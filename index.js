const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Generate base64 secret with spotify client id and secret
let base64secret = Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')

app.get('/token', (req, res) => {
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': 'Basic ' + base64secret,
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    res.status(200).json(response.data);
  }).catch((err) => {
    res.status(400).json({
      message: 'Error receiving Spotify Token'
    })
  })
})

module.exports = app