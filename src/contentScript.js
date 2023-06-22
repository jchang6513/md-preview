'use strict';
const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight");

// chrome.runtime.sendMessage(
//   {
//     type: 'messagetype',
//     payload: {
//       message: 'message',
//     },
//   },
//   (response) => {
//     console.log(response.message);
//   }
// );

const converter = new showdown.Converter(
  {
    extensions: [showdownHighlight({
        pre: true,
    })]
  }
);

let mdHTML = ''
let mdText = ''

const isIncludePRE = () => document.body && (document.body.childNodes[0] && document.body.childNodes[0].tagName == "PRE")

const mdToHtml = () => {
  const textElement = document.body.childNodes[0]
  if (!mdText) {
    mdText = textElement.innerText
  }
  if (!mdHTML) {
    mdHTML = converter.makeHtml(mdText);
  }
  textElement.innerHTML = mdHTML;
  textElement.style = 'white-space: unset; word-wrap: unset; max-width: 1012px; margin: auto';
}

const applyGlobalStyle = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    body { font-size: 16px }
    a { text-decoration: none; }
    code { background: #f8f8f8; }
  `;
  document.body.appendChild(style);
}

const applyHighlightStyle = () => {
  const githubCss = document.createElement('link');
    githubCss.rel = 'stylesheet';
    githubCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark-dimmed.min.css';
    document.head.appendChild(githubCss);
}

async function init() {
	if (isIncludePRE()) {
    applyHighlightStyle()
    applyGlobalStyle()
    mdToHtml()
	}
}

init();
