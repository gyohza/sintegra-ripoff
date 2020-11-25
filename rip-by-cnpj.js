// ==UserScript==
// @name        Rip By CNPJ
// @namespace   Sintegra
// @match       https://www.sintegraws.com.br/*
// @grant       none
// @version     1.0
// @author      -
// @runat       document-end
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

const obs = new MutationObserver((mutList, obs) => {
  document.getElementById('iframe-st').onload = evt => {
    const storage = JSON.parse(localStorage.getItem('cnpjOutputList')) || {};
    const search = Object.fromEntries(
      [...new URLSearchParams(location.search).entries()]
    );
    if (search.cnpj) {
      storage[search.cnpj] = parseSint();
      localStorage.setItem('cnpjOutputList', JSON.stringify(storage));
    }
    obs.disconnect();
  }
});

obs.observe(document.querySelector('.be-content'),
    {childList: true, subtree: true});
