'use strict';
const showdown = require('showdown');

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

const converter = new showdown.Converter();

async function init() {
	if (document.body && (document.body.childNodes[0] && document.body.childNodes[0].tagName == "PRE" || document.body.children.length == 0)) {
		const textElement = document.body.children.length ? document.body.childNodes[0] : document.body;
    const htmlContent = converter.makeHtml(textElement.innerText);
    textElement.innerHTML = htmlContent;
	}
}

init();
