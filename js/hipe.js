(function () {
  var STORAGE_KEY = 'hipe-lang';
  var DEFAULT_LANG = 'es';

  function setLang(lang) {
    if (lang !== 'es' && lang !== 'en') lang = DEFAULT_LANG;
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    var nodes = document.querySelectorAll('[data-es][data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = el.getAttribute('data-' + lang);
      if (val !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', val);
        } else {
          el.innerHTML = val;
        }
      }
    }

    var attrNodes = document.querySelectorAll('[data-es-placeholder][data-en-placeholder]');
    for (var j = 0; j < attrNodes.length; j++) {
      attrNodes[j].setAttribute('placeholder', attrNodes[j].getAttribute('data-' + lang + '-placeholder'));
    }

    var buttons = document.querySelectorAll('.lang-btn');
    for (var k = 0; k < buttons.length; k++) {
      buttons[k].classList.toggle('active', buttons[k].getAttribute('data-lang') === lang);
    }
  }

  function init() {
    var saved = DEFAULT_LANG;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) {}
    setLang(saved);

    var buttons = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        e.preventDefault();
        setLang(this.getAttribute('data-lang'));
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.HIPE = window.HIPE || {};
  window.HIPE.setLang = setLang;
})();
