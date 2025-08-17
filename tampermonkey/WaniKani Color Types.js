// ==UserScript==
// @name         WaniKani Color Types
// @description  Nice Colors for WaniKani types in dark mode!
// @namespace    http://tampermonkey.net/
// @version      2025-05-08
// @author       Dominik Potulski
// @match        https://www.wanikani.com/subjects/review*
// @match        https://www.wanikani.com/subjects/extra_study*
// @match        https://www.wanikani.com/subject-lessons*
// @match        https://www.wanikani.com/recent-mistakes*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    let header = document.getElementsByClassName("character-header")[0];
    let hContent = document.getElementsByClassName("character-header__content")[0];
    let kanji = document.getElementsByClassName("character-header--kanji")[0];
    let vocab = document.getElementsByClassName("character-header--vocabulary")[0];

    const observer = new MutationObserver(changeColor);
    observer.observe(header, {
        childList: true,
        characterData: true,
        subtree: true
    });

    function setColor(color) {
        header.style.background = color;
        hContent.style.background = color;
        kanji.style.textShadow = "0 0 0 " + color;
        kanji.style.borderTop = "0px"; // some stylus style
        vocab.style.textShadow = "0 0 0 " + color;
        vocab.style.borderTop = "0px"; // some stylus style
    }

    function changeColor() {
        let category = document.getElementsByClassName("quiz-input__question-category")[0].innerText.toLowerCase();
        let type = document.getElementsByClassName("quiz-input__question-type")[0].innerText.toLowerCase();


        if ( category == "kanji" && type == "meaning") {
            setColor("#C9A536"); // yellow

        } else if ( category == "kanji" && type == "reading") {
            setColor("#36C95B"); // green

        } else if ( category == "vocabulary" && type == "meaning") {
            setColor("#C936A4"); // pink

        } else if ( category == "vocabulary" && type == "reading") {
            setColor("#365AC9"); // blue

        } else if ( category == "radical") {
            setColor("#9A8B65"); // unsaturated brown

        } else {
            setColor("");
        }
    }
    changeColor();
    setTimeout(changeColor, 1000);
})();
