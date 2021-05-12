"use strict";

import "./sass/style.scss";

import { getJSON } from "./rest_actions.js";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  getData();
  setInterval(getData, 5000);
}

async function getData() {
  const url = "https://foobarfirefjerdedele.herokuapp.com/";
  const jsonData = await getJSON(url);

  // console.log(jsonData.bar);

  displayBar(jsonData.bar);
  displayQueue(jsonData.queue);
  displayServing(jsonData.serving);
  displayBartenders(jsonData.bartenders);
  displayTaps(jsonData.taps);
  displayStorage(jsonData.storage);
}

function displayBar(data) {
  const container = document.querySelector("#bar");
  container.querySelector(".name").textContent = data.name;
  container.querySelector(".closingTime").textContent = data.closingTime;
}

function displayQueue(data) {
  const container = document.querySelector("#queue");
  container.innerHTML = "";

  if (data.length > 0) {
    data.forEach((elm) => {
      const temp = document.querySelector("#queue_temp");
      const klon = temp.cloneNode(true).content;

      klon.querySelector(".id").textContent = elm.id;
      klon.querySelector(".startTime").textContent = elm.startTime;
      klon.querySelector(".order").textContent = JSON.stringify(elm.order);

      container.appendChild(klon);
    });
  }
}

function displayServing(data) {
  const container = document.querySelector("#serving");
  container.innerHTML = "";

  if (data.length > 0) {
    data.forEach((elm) => {
      const temp = document.querySelector("#queue_temp");
      const klon = temp.cloneNode(true).content;

      klon.querySelector(".id").textContent = elm.id;
      klon.querySelector(".startTime").textContent = elm.startTime;
      klon.querySelector(".order").textContent = JSON.stringify(elm.order);

      container.appendChild(klon);
    });
  }
}

function displayBartenders(data) {
  data.forEach((elm) => {
    const container = document.querySelector("#" + elm.name);
    container.querySelector(".status").textContent = elm.status;
    container.querySelector(".detail").textContent = elm.statusDetail;
    container.querySelector(".serving").textContent = elm.servingCustomer;
    container.querySelector(".using_tap").textContent = elm.usingTap;
  });
}

function displayTaps(data) {
  const container = document.querySelector("#taps");
  container.innerHTML = "";

  data.forEach((elm) => {
    const temp = document.querySelector("#taps_temp");
    const klon = temp.cloneNode(true).content;

    klon.querySelector(".id").textContent = elm.id;
    klon.querySelector(".level").textContent = elm.level;
    klon.querySelector(".capacity").textContent = elm.capacity;
    klon.querySelector(".beer").textContent = elm.beer;
    klon.querySelector(".inUse").textContent = elm.inUSe;
    klon.querySelector("img").src = `images/${generateImgName(elm.beer)}.png`;

    container.appendChild(klon);
  });
}

function displayStorage(data) {
  const container = document.querySelector("#storage");
  container.innerHTML = "";

  data.forEach((elm) => {
    const temp = document.querySelector("#storage_temp");
    const klon = temp.cloneNode(true).content;

    klon.querySelector(".name").textContent = elm.name;
    klon.querySelector(".amount").textContent = elm.amount;

    klon.querySelector("img").src = `images/${generateImgName(elm.name)}.png`;

    container.appendChild(klon);
  });
}

function generateImgName(beerName) {
  const noSpace = beerName.replaceAll(" ", "");
  const lowerCased = noSpace.toLowerCase();

  return lowerCased;
}
