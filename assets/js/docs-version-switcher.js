"use strict";

(function () {
  function fetchUrl(url, cb, err) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        cb(JSON.parse(request.responseText));
      } else {
        if (typeof err === 'function') err()
      }
      request.onerror = err
    };

    request.send();
  }

  var el = document.getElementById("docs__version_switcher");
  el = document.createElement('select');
  el.id = "docs__version_switcher";
  el.onchange = switchVersion;

  // <select id="docs__version_switcher" onchange="switchVersion(this)">
  //   {% assign versions = allpaths | remove: "index.html" | strip | split: " " | uniq | sort | reverse %}
  // {% for version in versions %}
  // <option value="{{version}}">{{version}}</option>
  // {% endfor %}
  // </select>

  var verRegExp = new RegExp('(.*/docs/)([^/]*)/?(.*)');

  var docsVer = verRegExp.exec(document.location.pathname);
  if (!docsVer) {
    throw new Error("Could not determine docs version.");
  }

  // get regexp match
  var basePath = docsVer[1];
  var uiRouterVersion = docsVer[2];
  var documentationPage = docsVer[3];

  console.log("ui-router " + uiRouterVersion + " docs");

  function compareDigit(l, r) {
    var ln = parseInt(l, 10), rn = parseInt(r, 10);
    if (!isNaN(ln) && !isNaN(rn)) return ln - rn;
    if (!isNaN(ln)) return -1;
    if (!isNaN(rn)) return 1;
    if (l < r) return -1;
    if (l > r) return 1;
    return 0;
  }

  var compareVersions = function (left, right) {
    var a = left.split(/[.+-]/), b = right.split(/[.+-]/);
    while (a.length && b.length) {
      var diff = compareDigit(a.shift(), b.shift());
      if (diff !== 0) return diff;
    }
    if (a.length) return -1; // sort 1.0.0 before 1.0.0-suffix.0
    if (b.length) return 1;
    return 0;
  };

  function reverse(compareFn) {
    return function (left, right) {
      return compareFn(right, left);
    }
  }

  var injectChecks = 0;
  var tsdBreadcrumb, ngDocMenu;

  function injectVersionSwitcher() {
    var li;

    // TypeDoc
    tsdBreadcrumb = document.querySelectorAll(".tsd-page-title .tsd-breadcrumb")[0];
    if (tsdBreadcrumb) {
      li = document.createElement("li");
      li.appendChild(el);
      if (tsdBreadcrumb.children.length) {
        var firstChild = tsdBreadcrumb.children[0];
        tsdBreadcrumb.insertBefore(li, firstChild);
      } else {
        tsdBreadcrumb.appendChild(li);
      }
    }

    // NgDoc
    ngDocMenu = document.querySelectorAll("header.header .navbar-inner ul.nav")[0];
    if (ngDocMenu) {
      li = document.createElement("li");
      li.appendChild(el);
      li.style.padding = 0;
      li.style.paddingTop = "5px";
      li.style.paddingLeft = "1em";
      li.style.height = "40px";
      ngDocMenu.appendChild(li);
    }

    if (++injectChecks < 5 && !tsdBreadcrumb && !ngDocMenu) {
      setTimeout(injectVersionSwitcher, 250);
    }
  }

  function switchVersion(evt) {
    var version = evt.target.value;
    if (tsdBreadcrumb) window.location.hash = "";

    function gotoRootPage() {
      document.location.pathname = basePath + version;
    }

    function validatePage(versionFiles) {
      var matches = versionFiles.indexOf(documentationPage) !== -1;
      if (matches) {
        document.location.pathname = basePath + version + '/' + documentationPage;
      } else {
        gotoRootPage();
      }
    }

    fetchUrl(basePath + version + "/files.json", validatePage, gotoRootPage);
  }

  injectVersionSwitcher();

  fetchUrl(basePath + 'versions.json', function(versions) {
    console.log(versions);
    versions.sort(reverse(compareVersions));
    console.log(versions);

    versions.forEach(function(ver) {
      var option = document.createElement('option');
      option.value = ver;
      option.innerHTML = ver;
      option.selected = (ver === uiRouterVersion);
      el.appendChild(option);
    });
  })
})();
