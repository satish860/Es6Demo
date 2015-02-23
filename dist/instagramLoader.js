System.register(["request"], function (_export) {
  "use strict";

  var jsonp, _prototypeProperties, _classCallCheck, accessToken, InstagramLoader;
  return {
    setters: [function (_request) {
      jsonp = _request["default"];
    }],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      accessToken = "db3e8e27d73c4a0a83699012432520aa";
      InstagramLoader = (function () {
        function InstagramLoader() {
          _classCallCheck(this, InstagramLoader);

          this.url = "https://api.instagram.com/v1/media/popular?client_id=" + accessToken;
        }

        _prototypeProperties(InstagramLoader, null, {
          load: {
            value: function load() {
              var _this = this;
              var promise = new Promise(function (resolve, reject) {
                jsonp(_this.url, function (err, data) {
                  resolve(data);
                });
              });
              return promise;
            },
            writable: true,
            configurable: true
          }
        });

        return InstagramLoader;
      })();
      _export("default", InstagramLoader);
    }
  };
});