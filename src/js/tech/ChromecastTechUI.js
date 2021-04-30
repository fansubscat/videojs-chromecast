'use strict';

var Class = require('class.extend'),
    ChromecastTechUI;

/**
 * This class represents the UI that is shown in the player while the Chromecast Tech is
 * active. The UI has a single root DOM element that displays the poster image of the
 * current item and title and subtitle. This class receives updates to the poster, title
 * and subtitle when the media item that the player is playing changes.
 *
 * @class ChromecastTechUI
 */
ChromecastTechUI = Class.extend(/** @lends ChromecastTechUI.prototype */ {
   init: function() {
      this._el = this._createDOMElement();
   },

   /**
    * Creates and returns a single DOMElement that contains the UI. This implementation
    * of the Chromecast Tech's UI displays a poster image, a title and a subtitle.
    *
    * @private
    * @returns {DOMElement}
    */
   _createDOMElement: function() {
      var el = this._createElement('div', 'vjs-tech vjs-tech-chromecast'),
          coverEl = this._createElement('div', 'vjs-tech-chromecast-cover'),
          iconEl = this._createElement('div', 'vjs-tech-chromecast-icon fab fa-chromecast'),
          titleEl = this._createElement('div', 'vjs-tech-chromecast-title');

      iconEl.style="font-size: 8em; margin-top: 0.1em; z-index: 1;";
      titleEl.style="font-size: 1.6em; z-index: 1;";
      titleEl.innerHTML="S'està emetent";
      el.appendChild(coverEl);
      el.appendChild(iconEl);
      el.appendChild(titleEl);

      return el;
   },

   /**
    * A helper method for creating DOMElements of the given type and with the given class
    * name(s).
    *
    * @param type {string} the kind of DOMElement to create (ex: 'div')
    * @param className {string} the class name(s) to give to the DOMElement. May also be
    * a space-delimited list of class names.
    * @returns {DOMElement}
    */
   _createElement: function(type, className) {
      var el = document.createElement(type);

      el.className = className;
      return el;
   },

   /**
    * Gets the root DOMElement to be shown in the player's UI.
    *
    * @returns {DOMElement}
    */
   getDOMElement: function() {
      return this._el;
   },

   /**
    * Finds the poster's DOMElement in the root UI element.
    *
    * @private
    * @returns {DOMElement}
    */
   _findPosterEl: function() {
      return this._el.querySelector('.vjs-tech-chromecast-poster');
   },

   /**
    * Finds the poster's <img> DOMElement in the root UI element.
    *
    * @private
    * @returns {DOMElement}
    */
   _findPosterImageEl: function() {
      return this._el.querySelector('.vjs-tech-chromecast-poster-img');
   },

   /**
    * Finds the title's DOMElement in the root UI element.
    *
    * @private
    * @returns {DOMElement}
    */
   _findTitleEl: function() {
      return this._el.querySelector('.vjs-tech-chromecast-title');
   },

   /**
    * Finds the image's DOMElement in the root UI element.
    *
    * @private
    * @returns {DOMElement}
    */
   _findImageEl: function() {
      return this._el.querySelector('.vjs-tech-chromecast-cover');
   },

   /**
    * Finds the subtitle's DOMElement in the root UI element.
    *
    * @private
    * @returns {DOMElement}
    */
   _findSubtitleEl: function() {
      return this._el.querySelector('.vjs-tech-chromecast-subtitle');
   },

   /**
    * Sets the current poster image URL and updates the poster image DOMElement with the
    * new poster image URL.
    *
    * @param poster {string} a URL for a poster image
    */
   updatePoster: function(poster) {
      var posterImageEl = this._findPosterImageEl();

      this._poster = poster ? poster : null;
      if (poster) {
         posterImageEl.setAttribute('src', poster);
         posterImageEl.classList.remove('vjs-tech-chromecast-poster-img-empty');
      } else {
         posterImageEl.removeAttribute('src');
         posterImageEl.classList.add('vjs-tech-chromecast-poster-img-empty');
      }
   },

   /**
    * Gets the current poster image URL.
    *
    * @returns {string} the URL for th current poster image
    */
   getPoster: function() {
      return this._poster;
   },

   /**
    * Sets the current title and updates the title's DOMElement with the new text.
    *
    * @param title {string} a title to show
    */
   updateTitle: function(title) {
      var titleEl = this._findTitleEl();

      this._title = title;
      if (title) {
         titleEl.innerHTML = title;
         titleEl.classList.remove('vjs-tech-chromecast-title-empty');
      } else {
         titleEl.classList.add('vjs-tech-chromecast-title-empty');
      }
   },

   /**
    * Sets the current image and updates the image's DOMElement with the new image.
    *
    * @param imageUrl {string} a imageUrl to show
    */
   updateCoverImage: function(imageUrl) {
      var imageEl = this._findImageEl();

      if (imageUrl) {
         imageEl.style="width: 100%; height: 100%; position: absolute; background: url('"+imageUrl+"'); background-position: center; background-size: cover; filter: blur(5px) brightness(50%);";
      } else {
         imageEl.style="width: 100%; height: 100%; position: absolute; background: black;";
      }
   },

   /**
    * Sets the current subtitle and updates the subtitle's DOMElement with the new text.
    *
    * @param subtitle {string} a subtitle to show
    */
   updateSubtitle: function(subtitle) {
      var subtitleEl = this._findSubtitleEl();

      this._subtitle = subtitle;
      if (subtitle) {
         subtitleEl.innerHTML = subtitle;
         subtitleEl.classList.remove('vjs-tech-chromecast-subtitle-empty');
      } else {
         subtitleEl.classList.add('vjs-tech-chromecast-subtitle-empty');
      }
   },
});

module.exports = ChromecastTechUI;
