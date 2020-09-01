//import ChartsEmbedSDK, { getRealmUserToken }from "@mongodb-js/charts-embed-dom";
//const ChartsEmbedSDK = require("@mongodb-js/charts-embed-dom");
//import { Stitch, UserPasswordCredential } from 'mongodb-stitch-browser-sdk'
//const SDK = require('mongodb-stitch-browser-sdk');
//const RUNTIME = require("regenerator-runtime/runtime");

const client = stitch.Stitch.initializeAppClient(
    'chartsembedd-idmlf'
//  'chartswebapp-hxzsrt', // Optional: ~REPLACE~ with your Realm App ID
);

const ChartsEmbedSDK = window.ChartsEmbedSDK;

function getUser() {
  return document.getElementById("username").value;
}

function getPass() {
  return document.getElementById("password").value;
}

function logOut() {
  document.body.classList.toggle("logged-in", false);
}

document
  .getElementById("login-page")
  .addEventListener("input", () => document.body.classList.toggle("error", false));

document
  .getElementById("loginButton")
  .addEventListener("click", () => tryLogin());

document
  .getElementById("logoutButton")
  .addEventListener("click", () => logOut());

async function tryLogin() {
  const credential = new stitch.UserPasswordCredential(getUser(), getPass())
  client.auth.loginWithCredential(credential).then(() =>
  {
    const sdk = new ChartsEmbedSDK({
	baseUrl: "https://charts.mongodb.com/charts-bi-atlas-dev-xfzvk", // Optional: ~REPLACE~ with your Charts URL
	getUserToken: () => ChartsEmbedSDK.getRealmUserToken(client),
    });

      const chart = sdk.createChart({
	  chartId: "dec89274-b39e-42a5-8a57-18022ddc2362", // Optional: ~REPLACE~ with your Chart ID

    });

    chart.render(document.getElementById("chart"));
    document.body.classList.toggle("logged-in", true);

  }).catch(err => {
    console.error("Authentication failed. If you are using the pre-built sample, please use one of the listed email addresses and use 'password' as the password.")
    document.body.classList.toggle("error", true);
  });
}
