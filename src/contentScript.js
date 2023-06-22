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

const VIEW_PREVIEW = 'view preview'
const VIEW_RAW = 'view raw'
const VIEW_SOURCE_ELEMENT = document.createElement('button');
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
  mdText = textElement.innerText
  mdHTML = converter.makeHtml(mdText);
  setHTML();
}

const setRaw = () => {
  const textElement = document.body.childNodes[0]
  textElement.innerHTML = mdText;
  textElement.style = '';
}

const setHTML = () => {
  const textElement = document.body.childNodes[0]
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

const setViewRawButton = () => {
	VIEW_SOURCE_ELEMENT.title = VIEW_RAW;
	VIEW_SOURCE_ELEMENT.innerText = VIEW_RAW;
  VIEW_SOURCE_ELEMENT.addEventListener(
    'click',
    () => {
      setViewPreviewButton();
      setRaw();
    },
    false
  );
}

const setViewPreviewButton = () => {
	VIEW_SOURCE_ELEMENT.title = VIEW_PREVIEW;
	VIEW_SOURCE_ELEMENT.innerText = VIEW_PREVIEW;
  VIEW_SOURCE_ELEMENT.addEventListener(
    'click',
    () => {
      setViewRawButton();
      setHTML();
    },
    false
  );
}

const addActionBar = () => {
	document.body.appendChild(VIEW_SOURCE_ELEMENT);
  VIEW_SOURCE_ELEMENT.style = `
    position: fixed;
    top: 10px;
    right: 10px;
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 6px 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
  `
  setViewRawButton()
}

async function init() {
	if (isIncludePRE()) {
    applyHighlightStyle()
    applyGlobalStyle()
    addActionBar()
    mdToHtml()
	}
}

init();
