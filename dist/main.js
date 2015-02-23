System.register(["./instagramLoader", "jquery"], function (_export) {
  "use strict";

  var loader, $, instagramLoader;
  return {
    setters: [function (_instagramLoader) {
      loader = _instagramLoader["default"];
    }, function (_jquery) {
      $ = _jquery["default"];
    }],
    execute: function () {
      instagramLoader = new loader();
      instagramLoader.load().then(function (data) {
        console.log(data);
        data.data.map(function (x) {
          return x.images.thumbnail.url;
        }).forEach(function (url) {
          var imagestring = "<img src=\"" + url + "\" />";
          $("#images").append(imagestring);
        });
      });
    }
  };
});