// ==UserScript==
// @name        Rip By CNPJ
// @namespace   Sintegra
// @match       https://www.sintegraws.com.br/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/25/2020, 10:05:22 AM
// ==/UserScript==

// Query string can take `cnpj` param

function fixString(str) {
  const pat = /[^\wÀ-ÿ]+([\wÀ-ÿ])?/g;

  function replacer(m, p) {
    return p ? p.toUpperCase() : ''
  }

  return str.trim()
    .toLowerCase()
    .replace(pat, replacer);
}

function parseSint() {
  const sint = {};
  
  let st = document.getElementById('iframe-st').contentWindow.document.body;
  
  for (let lbl of st.getElementsByTagName('label')) {
      sint[fixString(lbl.textContent)] =
          lbl.nextElementSibling.textContent.trim();
  }
  
  return sint;
}

window.parseSint = parseSint;
