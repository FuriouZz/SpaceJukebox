var Scene,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = (function(_super) {
  __extends(Scene, _super);

  Scene.prototype.paused = false;

  function Scene(bg) {
    this.update = __bind(this.update, this);
    Scene.__super__.constructor.call(this, bg);
  }

  Scene.prototype.update = function(delta) {
    var child, _i, _len, _ref, _results;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.updateObj(child, d));
    }
    return _results;
  };

  Scene.prototype.updateObj = function(obj, delta) {
    var child, _i, _len, _ref, _results;
    obj.update(d);
    if (obj.children && obj.children.length > 0) {
      _ref = obj.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(this.updateObj(child, d));
      }
      return _results;
    }
  };

  Scene.prototype.resize = function() {};

  Scene.prototype.resume = function() {
    return this.paused = false;
  };

  Scene.prototype.pause = function() {
    return this.paused = true;
  };

  Scene.prototype.isPaused = function() {
    return this.paused;
  };

  return Scene;

})(PIXI.Stage);

SPACE.Scene = Scene;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS9zY2VuZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBO0VBQUE7O2lTQUFBOztBQUFBO0FBQ0UsMEJBQUEsQ0FBQTs7QUFBQSxrQkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUVhLEVBQUEsZUFBQyxFQUFELEdBQUE7QUFDWCwyQ0FBQSxDQUFBO0FBQUEsSUFBQSx1Q0FBTSxFQUFOLENBQUEsQ0FEVztFQUFBLENBRmI7O0FBQUEsa0JBS0EsTUFBQSxHQUFRLFNBQUMsS0FBRCxHQUFBO0FBQ04sUUFBQSwrQkFBQTtBQUFBO0FBQUE7U0FBQSwyQ0FBQTt1QkFBQTtBQUNFLG9CQUFBLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWCxFQUFrQixDQUFsQixFQUFBLENBREY7QUFBQTtvQkFETTtFQUFBLENBTFIsQ0FBQTs7QUFBQSxrQkFTQSxTQUFBLEdBQVcsU0FBQyxHQUFELEVBQU0sS0FBTixHQUFBO0FBQ1QsUUFBQSwrQkFBQTtBQUFBLElBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxDQUFYLENBQUEsQ0FBQTtBQUNBLElBQUEsSUFBRyxHQUFHLENBQUMsUUFBSixJQUFnQixHQUFHLENBQUMsUUFBUSxDQUFDLE1BQWIsR0FBc0IsQ0FBekM7QUFDRTtBQUFBO1dBQUEsMkNBQUE7eUJBQUE7QUFDRSxzQkFBQSxJQUFDLENBQUEsU0FBRCxDQUFXLEtBQVgsRUFBa0IsQ0FBbEIsRUFBQSxDQURGO0FBQUE7c0JBREY7S0FGUztFQUFBLENBVFgsQ0FBQTs7QUFBQSxrQkFlQSxNQUFBLEdBQVEsU0FBQSxHQUFBLENBZlIsQ0FBQTs7QUFBQSxrQkFpQkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtXQUNOLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFESjtFQUFBLENBakJSLENBQUE7O0FBQUEsa0JBb0JBLEtBQUEsR0FBTyxTQUFBLEdBQUE7V0FDTCxJQUFDLENBQUEsTUFBRCxHQUFVLEtBREw7RUFBQSxDQXBCUCxDQUFBOztBQUFBLGtCQXVCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsV0FBTyxJQUFDLENBQUEsTUFBUixDQURRO0VBQUEsQ0F2QlYsQ0FBQTs7ZUFBQTs7R0FEa0IsSUFBSSxDQUFDLE1BQXpCLENBQUE7O0FBQUEsS0EyQkssQ0FBQyxLQUFOLEdBQWMsS0EzQmQsQ0FBQSIsImZpbGUiOiJlbmdpbmUvc2NlbmUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTY2VuZSBleHRlbmRzIFBJWEkuU3RhZ2VcbiAgcGF1c2VkOiBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yOiAoYmcpLT5cbiAgICBzdXBlcihiZylcblxuICB1cGRhdGU6IChkZWx0YSk9PlxuICAgIGZvciBjaGlsZCBpbiBAY2hpbGRyZW5cbiAgICAgIEB1cGRhdGVPYmooY2hpbGQsIGQpXG5cbiAgdXBkYXRlT2JqOiAob2JqLCBkZWx0YSktPlxuICAgIG9iai51cGRhdGUoZClcbiAgICBpZiBvYmouY2hpbGRyZW4gJiYgb2JqLmNoaWxkcmVuLmxlbmd0aCA+IDBcbiAgICAgIGZvciBjaGlsZCBpbiBvYmouY2hpbGRyZW5cbiAgICAgICAgQHVwZGF0ZU9iaihjaGlsZCwgZClcblxuICByZXNpemU6IC0+XG5cbiAgcmVzdW1lOiAtPlxuICAgIEBwYXVzZWQgPSBmYWxzZVxuXG4gIHBhdXNlOiAtPlxuICAgIEBwYXVzZWQgPSB0cnVlXG5cbiAgaXNQYXVzZWQ6IC0+XG4gICAgcmV0dXJuIEBwYXVzZWRcblxuU1BBQ0UuU2NlbmUgPSBTY2VuZVxuIl19