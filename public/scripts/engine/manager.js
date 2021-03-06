var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SPACE.SceneManager = (function() {
  SceneManager.prototype.currentScene = null;

  SceneManager.prototype._scenes = null;

  SceneManager.prototype._renderer = null;

  SceneManager.prototype._stats = null;

  SceneManager.prototype._tick = 0;

  function SceneManager(width, height) {
    this._update = __bind(this._update, this);
    this._draw = __bind(this._draw, this);
    if (this._renderer) {
      return this;
    }
    this._tick = Date.now();
    this._scenes = [];
    this._renderer = new PIXI.autoDetectRenderer(width * SPACE.pixelRatio, height * SPACE.pixelRatio);
    document.body.appendChild(this._renderer.view);
    if (SPACE.ENV === 'development') {
      this._setupStats();
    }
    this._draw();
    this._update();
    window.onresize = (function(_this) {
      return function() {
        _this._renderer.resize(window.innerWidth * SPACE.pixelRatio, window.innerHeight * SPACE.pixelRatio);
        return _this.currentScene.resize();
      };
    })(this);
  }

  SceneManager.prototype._setupStats = function() {
    this._stats = new Stats();
    this._stats.setMode(0);
    this._stats.domElement.style.position = 'absolute';
    this._stats.domElement.style.left = '0px';
    this._stats.domElement.style.top = '0px';
    return document.body.appendChild(this._stats.domElement);
  };

  SceneManager.prototype._draw = function() {
    SPACE.ASSERT(SPACE.ENV === 'development', this._stats.begin);
    window.requestAnimationFrame(this._draw);
    if (!this.currentScene || this.currentScene.isPaused()) {
      return;
    }
    this._renderer.render(this.currentScene);
    this.currentScene.draw();
    return SPACE.ASSERT(SPACE.ENV === 'development', this._stats.end);
  };

  SceneManager.prototype._update = function() {
    var c;
    setTimeout(this._update, 1000 / SPACE.FPS);
    if (!this.currentScene || this.currentScene.isPaused()) {
      return;
    }
    c = Date.now();
    this.currentScene.update(c - this._tick);
    return this._tick = c;
  };

  SceneManager.prototype.createScene = function(identifier, aScene, interactive) {
    var scene;
    if (this._scenes[identifier]) {
      return void 0;
    }
    scene = new aScene(0x000000);
    this._scenes[identifier] = scene;
    return scene;
  };

  SceneManager.prototype.goToScene = function(identifier) {
    if (this._scenes[identifier]) {
      if (this.currentScene) {
        this.currentScene.pause();
      }
      this.currentScene = this._scenes[identifier];
      this.currentScene.resume();
      return true;
    }
    return false;
  };

  return SceneManager;

})();

//# sourceMappingURL=data:application/json;base64,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QUFBLElBSUEsSUFBQyxDQUFBLE9BQVEsQ0FBQSxVQUFBLENBQVQsR0FBdUIsS0FKdkIsQ0FBQTtBQU1BLFdBQU8sS0FBUCxDQVBXO0VBQUEsQ0F4RGIsQ0FBQTs7QUFBQSx5QkFpRUEsU0FBQSxHQUFXLFNBQUMsVUFBRCxHQUFBO0FBQ1QsSUFBQSxJQUFHLElBQUMsQ0FBQSxPQUFRLENBQUEsVUFBQSxDQUFaO0FBQ0ksTUFBQSxJQUF5QixJQUFDLENBQUEsWUFBMUI7QUFBQSxRQUFBLElBQUMsQ0FBQSxZQUFZLENBQUMsS0FBZCxDQUFBLENBQUEsQ0FBQTtPQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsWUFBRCxHQUFnQixJQUFDLENBQUEsT0FBUSxDQUFBLFVBQUEsQ0FEekIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFlBQVksQ0FBQyxNQUFkLENBQUEsQ0FGQSxDQUFBO0FBR0EsYUFBTyxJQUFQLENBSko7S0FBQTtBQU1BLFdBQU8sS0FBUCxDQVBTO0VBQUEsQ0FqRVgsQ0FBQTs7c0JBQUE7O0lBRkYsQ0FBQSIsImZpbGUiOiJlbmdpbmUvbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNQQUNFLlNjZW5lTWFuYWdlclxuXG4gIGN1cnJlbnRTY2VuZTogbnVsbFxuICBfc2NlbmVzOiBudWxsXG4gIF9yZW5kZXJlcjogbnVsbFxuICBfc3RhdHM6IG51bGxcbiAgX3RpY2s6IDBcblxuICBjb25zdHJ1Y3RvcjogKHdpZHRoLCBoZWlnaHQpLT5cbiAgICBpZiAoQF9yZW5kZXJlcikgdGhlbiByZXR1cm4gQFxuXG4gICAgQF90aWNrID0gRGF0ZS5ub3coKVxuXG4gICAgQF9zY2VuZXMgICA9IFtdXG4gICAgQF9yZW5kZXJlciA9IG5ldyBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aWR0aCAqIFNQQUNFLnBpeGVsUmF0aW8sIGhlaWdodCAqIFNQQUNFLnBpeGVsUmF0aW8pXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChAX3JlbmRlcmVyLnZpZXcpXG5cbiAgICBAX3NldHVwU3RhdHMoKSBpZiBTUEFDRS5FTlYgPT0gJ2RldmVsb3BtZW50J1xuXG4gICAgQF9kcmF3KClcbiAgICBAX3VwZGF0ZSgpXG5cbiAgICB3aW5kb3cub25yZXNpemUgPSA9PlxuICAgICAgQF9yZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGggKiBTUEFDRS5waXhlbFJhdGlvLCB3aW5kb3cuaW5uZXJIZWlnaHQgKiBTUEFDRS5waXhlbFJhdGlvKVxuICAgICAgQGN1cnJlbnRTY2VuZS5yZXNpemUoKVxuXG4gIF9zZXR1cFN0YXRzOiAtPlxuICAgIEBfc3RhdHMgPSBuZXcgU3RhdHMoKVxuICAgIEBfc3RhdHMuc2V0TW9kZSgwKVxuICAgIEBfc3RhdHMuZG9tRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICBAX3N0YXRzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnXG4gICAgQF9zdGF0cy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICcwcHgnXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggQF9zdGF0cy5kb21FbGVtZW50IClcblxuICBfZHJhdzogPT5cbiAgICBTUEFDRS5BU1NFUlQoU1BBQ0UuRU5WID09ICdkZXZlbG9wbWVudCcsIEBfc3RhdHMuYmVnaW4pXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShAX2RyYXcpXG5cbiAgICBpZiAhQGN1cnJlbnRTY2VuZSBvciBAY3VycmVudFNjZW5lLmlzUGF1c2VkKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICBAX3JlbmRlcmVyLnJlbmRlcihAY3VycmVudFNjZW5lKVxuICAgIEBjdXJyZW50U2NlbmUuZHJhdygpXG5cbiAgICBTUEFDRS5BU1NFUlQoU1BBQ0UuRU5WID09ICdkZXZlbG9wbWVudCcsIEBfc3RhdHMuZW5kKVxuXG5cbiAgX3VwZGF0ZTogPT5cbiAgICBzZXRUaW1lb3V0KEBfdXBkYXRlLCAxMDAwIC8gU1BBQ0UuRlBTKVxuXG4gICAgaWYgIUBjdXJyZW50U2NlbmUgb3IgQGN1cnJlbnRTY2VuZS5pc1BhdXNlZCgpXG4gICAgICAgIHJldHVyblxuXG4gICAgYyA9IERhdGUubm93KClcbiAgICBAY3VycmVudFNjZW5lLnVwZGF0ZSgoYyAtIEBfdGljaykpXG4gICAgQF90aWNrID0gY1xuXG5cbiAgY3JlYXRlU2NlbmU6IChpZGVudGlmaWVyLCBhU2NlbmUsIGludGVyYWN0aXZlKS0+XG4gICAgaWYgQF9zY2VuZXNbaWRlbnRpZmllcl1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgc2NlbmUgPSBuZXcgYVNjZW5lKDB4MDAwMDAwKVxuICAgIEBfc2NlbmVzW2lkZW50aWZpZXJdID0gc2NlbmVcblxuICAgIHJldHVybiBzY2VuZVxuXG4gIGdvVG9TY2VuZTogKGlkZW50aWZpZXIpLT5cbiAgICBpZiBAX3NjZW5lc1tpZGVudGlmaWVyXVxuICAgICAgICBAY3VycmVudFNjZW5lLnBhdXNlKCkgaWYgQGN1cnJlbnRTY2VuZVxuICAgICAgICBAY3VycmVudFNjZW5lID0gQF9zY2VuZXNbaWRlbnRpZmllcl1cbiAgICAgICAgQGN1cnJlbnRTY2VuZS5yZXN1bWUoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgcmV0dXJuIGZhbHNlXG4iXX0=