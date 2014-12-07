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
    window.requestAnimationFrame(this._draw);
    if (!this.currentScene || this.currentScene.isPaused()) {
      return;
    }
    this._renderer.render(this.currentScene);
    return this.currentScene.draw();
  };

  SceneManager.prototype._update = function() {
    var c;
    setTimeout(this._update, 1000 / SPACE.FPS);
    if (!this.currentScene || this.currentScene.isPaused()) {
      return;
    }
    SPACE.ASSERT(SPACE.ENV === 'development', this._stats.begin);
    c = Date.now();
    this.currentScene.update((c - this._tick) / 1000);
    this._tick = c;
    return SPACE.ASSERT(SPACE.ENV === 'development', this._stats.end);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS9tYW5hZ2VyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGtGQUFBOztBQUFBLEtBQVcsQ0FBQztBQUVSLHlCQUFBLFlBQUEsR0FBYyxJQUFkLENBQUE7O0FBQUEseUJBQ0EsT0FBQSxHQUFTLElBRFQsQ0FBQTs7QUFBQSx5QkFFQSxTQUFBLEdBQVcsSUFGWCxDQUFBOztBQUFBLHlCQUdBLE1BQUEsR0FBUSxJQUhSLENBQUE7O0FBQUEseUJBSUEsS0FBQSxHQUFPLENBSlAsQ0FBQTs7QUFNYSxFQUFBLHNCQUFDLEtBQUQsRUFBUSxNQUFSLEdBQUE7QUFDVCw2Q0FBQSxDQUFBO0FBQUEseUNBQUEsQ0FBQTtBQUFBLElBQUEsSUFBSSxJQUFDLENBQUEsU0FBTDtBQUFxQixhQUFPLElBQVAsQ0FBckI7S0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFBLENBRlQsQ0FBQTtBQUFBLElBSUEsSUFBQyxDQUFBLE9BQUQsR0FBYSxFQUpiLENBQUE7QUFBQSxJQUtBLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsSUFBSSxDQUFDLGtCQUFMLENBQXdCLEtBQUEsR0FBUSxLQUFLLENBQUMsVUFBdEMsRUFBa0QsTUFBQSxHQUFTLEtBQUssQ0FBQyxVQUFqRSxDQUxqQixDQUFBO0FBQUEsSUFNQSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFyQyxDQU5BLENBQUE7QUFRQSxJQUFBLElBQWtCLEtBQUssQ0FBQyxHQUFOLEtBQWEsYUFBL0I7QUFBQSxNQUFBLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBQSxDQUFBO0tBUkE7QUFBQSxJQVVBLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FWQSxDQUFBO0FBQUEsSUFXQSxJQUFDLENBQUEsT0FBRCxDQUFBLENBWEEsQ0FEUztFQUFBLENBTmI7O0FBQUEseUJBb0JBLFdBQUEsR0FBYSxTQUFBLEdB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QSxNQUNBLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUMsQ0FBQSxPQUFRLENBQUEsVUFBQSxDQUR6QixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsWUFBWSxDQUFDLE1BQWQsQ0FBQSxDQUZBLENBQUE7QUFHQSxhQUFPLElBQVAsQ0FKSjtLQUFBO0FBTUEsV0FBTyxLQUFQLENBUE87RUFBQSxDQTNEWCxDQUFBOztzQkFBQTs7SUFGSixDQUFBIiwiZmlsZSI6ImVuZ2luZS9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU1BBQ0UuU2NlbmVNYW5hZ2VyXG5cbiAgICBjdXJyZW50U2NlbmU6IG51bGxcbiAgICBfc2NlbmVzOiBudWxsXG4gICAgX3JlbmRlcmVyOiBudWxsXG4gICAgX3N0YXRzOiBudWxsXG4gICAgX3RpY2s6IDBcblxuICAgIGNvbnN0cnVjdG9yOiAod2lkdGgsIGhlaWdodCktPlxuICAgICAgICBpZiAoQF9yZW5kZXJlcikgdGhlbiByZXR1cm4gQFxuXG4gICAgICAgIEBfdGljayA9IERhdGUubm93KClcblxuICAgICAgICBAX3NjZW5lcyAgID0gW11cbiAgICAgICAgQF9yZW5kZXJlciA9IG5ldyBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aWR0aCAqIFNQQUNFLnBpeGVsUmF0aW8sIGhlaWdodCAqIFNQQUNFLnBpeGVsUmF0aW8pXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoQF9yZW5kZXJlci52aWV3KVxuXG4gICAgICAgIEBfc2V0dXBTdGF0cygpIGlmIFNQQUNFLkVOViA9PSAnZGV2ZWxvcG1lbnQnXG5cbiAgICAgICAgQF9kcmF3KClcbiAgICAgICAgQF91cGRhdGUoKVxuXG4gICAgX3NldHVwU3RhdHM6IC0+XG4gICAgICAgIEBfc3RhdHMgPSBuZXcgU3RhdHMoKVxuICAgICAgICBAX3N0YXRzLnNldE1vZGUoMClcbiAgICAgICAgQF9zdGF0cy5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBAX3N0YXRzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9ICcwcHgnXG4gICAgICAgIEBfc3RhdHMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnMHB4J1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBAX3N0YXRzLmRvbUVsZW1lbnQgKVxuXG4gICAgX2RyYXc6ID0+XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoQF9kcmF3KVxuXG4gICAgICAgIGlmICFAY3VycmVudFNjZW5lIG9yIEBjdXJyZW50U2NlbmUuaXNQYXVzZWQoKVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQF9yZW5kZXJlci5yZW5kZXIoQGN1cnJlbnRTY2VuZSlcbiAgICAgICAgQGN1cnJlbnRTY2VuZS5kcmF3KClcblxuICAgIF91cGRhdGU6ID0+XG4gICAgICAgIHNldFRpbWVvdXQoQF91cGRhdGUsIDEwMDAgLyBTUEFDRS5GUFMpXG5cbiAgICAgICAgaWYgIUBjdXJyZW50U2NlbmUgb3IgQGN1cnJlbnRTY2VuZS5pc1BhdXNlZCgpXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBTUEFDRS5BU1NFUlQoU1BBQ0UuRU5WID09ICdkZXZlbG9wbWVudCcsIEBfc3RhdHMuYmVnaW4pXG4gICAgICAgIGMgPSBEYXRlLm5vdygpXG4gICAgICAgIEBjdXJyZW50U2NlbmUudXBkYXRlKChjIC0gQF90aWNrKS8xMDAwKVxuICAgICAgICBAX3RpY2sgPSBjXG5cbiAgICAgICAgU1BBQ0UuQVNTRVJUKFNQQUNFLkVOViA9PSAnZGV2ZWxvcG1lbnQnLCBAX3N0YXRzLmVuZClcblxuICAgIGNyZWF0ZVNjZW5lOiAoaWRlbnRpZmllciwgYVNjZW5lLCBpbnRlcmFjdGl2ZSktPlxuICAgICAgICBpZiBAX3NjZW5lc1tpZGVudGlmaWVyXVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgICAgIHNjZW5lID0gbmV3IGFTY2VuZSgweDAwMDAwMClcbiAgICAgICAgQF9zY2VuZXNbaWRlbnRpZmllcl0gPSBzY2VuZVxuXG4gICAgICAgIHJldHVybiBzY2VuZVxuXG4gICAgZ29Ub1NjZW5lOiAoaWRlbnRpZmllciktPlxuICAgICAgICBpZiBAX3NjZW5lc1tpZGVudGlmaWVyXVxuICAgICAgICAgICAgQGN1cnJlbnRTY2VuZS5wYXVzZSgpIGlmIEBjdXJyZW50U2NlbmVcbiAgICAgICAgICAgIEBjdXJyZW50U2NlbmUgPSBAX3NjZW5lc1tpZGVudGlmaWVyXVxuICAgICAgICAgICAgQGN1cnJlbnRTY2VuZS5yZXN1bWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgICByZXR1cm4gZmFsc2VcbiJdfQ==