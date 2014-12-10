var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SPACE.Equalizer = (function(_super) {
  __extends(Equalizer, _super);

  Equalizer.prototype.center = null;

  Equalizer.prototype._values = null;

  Equalizer.prototype._oldValues = null;

  Equalizer.prototype._newValues = null;

  Equalizer.prototype._time = 1;

  Equalizer.prototype.maxLength = 0;

  Equalizer.prototype.minLength = 0;

  Equalizer.prototype.radius = 0;

  Equalizer.prototype.interpolationTime = 0;

  function Equalizer(point, opts) {
    var defaults;
    if (opts == null) {
      opts = {};
    }
    this.mute = __bind(this.mute, this);
    this.random = __bind(this.random, this);
    Equalizer.__super__.constructor.apply(this, arguments);
    defaults = {
      maxLength: 200,
      minLength: 50,
      radius: 250,
      interpolationTime: 150
    };
    opts = HELPERS.merge(defaults, opts);
    this.minLength = opts.minLength;
    this.maxLength = opts.maxLength;
    this.radius = opts.radius;
    this.interpolationTime = opts.interpolationTime;
    this.center = new PIXI.Point(point.x, point.y);
    this._values = [];
    this._oldValues = [];
    this._newValues = [];
  }

  Equalizer.prototype.setNewValues = function(values) {
    var length, newValues, value, _i, _len;
    newValues = [];
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      length = this.minLength + parseFloat(value) * (this.maxLength - this.minLength);
      newValues.push(length);
    }
    this._newValues = newValues;
    return this.resetTime();
  };

  Equalizer.prototype.random = function() {
    var i, rands, _i;
    rands = [];
    for (i = _i = 0; _i <= 255; i = ++_i) {
      rands[i] = Math.random();
    }
    return this.setNewValues(rands);
  };

  Equalizer.prototype.mute = function() {
    var i, mute, _i;
    mute = [];
    for (i = _i = 0; _i <= 255; i = ++_i) {
      mute[i] = 0;
    }
    return this.setNewValues(mute);
  };

  Equalizer.prototype.update = function(delta) {
    var diff, i, t, _i, _ref, _results;
    this._time += delta;
    t = this._time / this.interpolationTime;
    if (t > 1) {
      return;
    }
    _results = [];
    for (i = _i = 0, _ref = this._newValues.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      diff = this._oldValues[i] - this._newValues[i];
      _results.push(this._values[i] = this._oldValues[i] - t * diff);
    }
    return _results;
  };

  Equalizer.prototype.resetTime = function() {
    var i, _i, _ref, _ref1, _results;
    this._time = 0;
    this._oldValues = this._values;
    if (this._newValues.length > this._oldValues.length) {
      _results = [];
      for (i = _i = _ref = this._oldValues.length, _ref1 = this._newValues.length - 1; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        _results.push(this._oldValues[i] = 0);
      }
      return _results;
    }
  };

  Equalizer.prototype.calculateLinePoint = function(angle, length) {
    var center, x, y;
    center = HELPERS.retina(this.center);
    x = center.x + Math.cos(angle) * length;
    y = center.y + Math.sin(angle) * length;
    return new PIXI.Point(x, y);
  };

  Equalizer.prototype.draw = function() {
    var angle, from, i, length, radius, to, _i, _ref, _results;
    this.clear();
    this.lineStyle(SPACE.pixelRatio, 0xFFFFFF, 1);
    _results = [];
    for (i = _i = 0, _ref = this._values.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      angle = PIXI.PI_2 * i / this._values.length;
      angle += Math.PI * .5;
      length = this._values[i];
      radius = HELPERS.retina(this.radius);
      from = this.calculateLinePoint(angle, radius - length * .5);
      to = this.calculateLinePoint(angle, radius + length * .5);
      _results.push(this.drawline(from.x, from.y, to.x, to.y));
    }
    return _results;
  };

  Equalizer.prototype.drawline = function(fromX, fromY, toX, toY) {
    this.moveTo(fromX, fromY);
    return this.lineTo(toX, toY);
  };

  return Equalizer;

})(PIXI.Graphics);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvZXF1YWxpemVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztpU0FBQTs7QUFBQSxLQUFXLENBQUM7QUFFViw4QkFBQSxDQUFBOztBQUFBLHNCQUFBLE1BQUEsR0FBWSxJQUFaLENBQUE7O0FBQUEsc0JBRUEsT0FBQSxHQUFZLElBRlosQ0FBQTs7QUFBQSxzQkFHQSxVQUFBLEdBQVksSUFIWixDQUFBOztBQUFBLHNCQUlBLFVBQUEsR0FBWSxJQUpaLENBQUE7O0FBQUEsc0JBTUEsS0FBQSxHQUFPLENBTlAsQ0FBQTs7QUFBQSxzQkFTQSxTQUFBLEdBQW1CLENBVG5CLENBQUE7O0FBQUEsc0JBVUEsU0FBQSxHQUFtQixDQVZuQixDQUFBOztBQUFBLHNCQVdBLE1BQUEsR0FBbUIsQ0FYbkIsQ0FBQTs7QUFBQSxzQkFZQSxpQkFBQSxHQUFtQixDQVpuQixDQUFBOztBQWNhLEVBQUEsbUJBQUMsS0FBRCxFQUFRLElBQVIsR0FBQTtBQUNYLFFBQUEsUUFBQTs7TUFEbUIsT0FBSztLQUN4QjtBQUFBLHVDQUFBLENBQUE7QUFBQSwyQ0FBQSxDQUFBO0FBQUEsSUFBQSw0Q0FBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLElBR0EsUUFBQSxHQUNFO0FBQUEsTUFBQSxTQUFBLEVBQW1CLEdBQW5CO0FBQUEsTUFDQSxTQUFBLEVBQW1CLEVBRG5CO0FBQUEsTUFFQSxNQUFBLEVBQW1CLEdBRm5CO0FBQUEsTUFHQSxpQkFBQSxFQUFtQixHQUhuQjtLQUpGLENBQUE7QUFBQSxJQVNBLElBQUEsR0FBcUIsT0FBTyxDQUFDLEtBQVIsQ0FBYyxRQUFkLEVBQXdCLElBQXhCLENBVHJCLENBQUE7QUFBQSxJQVVBLElBQUMsQ0FBQSxTQUFELEdBQXFCLElBQUksQ0FBQyxTQVYxQixDQUFBO0FBQUEsSUFXQSxJQUFDLENBQUEsU0FBRCxHQUFxQixJQUFJLENBQUMsU0FYMUIsQ0FBQTtBQUFBLElBWUEsSUFBQyxDQUFBLE1BQUQsR0FBcUIsSUFB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SlQsQ0FBQTtBQUFBLE1BTUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxrQkFBRCxDQUFvQixLQUFwQixFQUEyQixNQUFBLEdBQU8sTUFBQSxHQUFPLEVBQXpDLENBTlAsQ0FBQTtBQUFBLE1BT0EsRUFBQSxHQUFPLElBQUMsQ0FBQSxrQkFBRCxDQUFvQixLQUFwQixFQUEyQixNQUFBLEdBQU8sTUFBQSxHQUFPLEVBQXpDLENBUFAsQ0FBQTtBQUFBLG9CQVNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBSSxDQUFDLENBQWYsRUFBa0IsSUFBSSxDQUFDLENBQXZCLEVBQTBCLEVBQUUsQ0FBQyxDQUE3QixFQUFnQyxFQUFFLENBQUMsQ0FBbkMsRUFUQSxDQURGO0FBQUE7b0JBSkk7RUFBQSxDQWhGTixDQUFBOztBQUFBLHNCQWdHQSxRQUFBLEdBQVUsU0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEdBQWYsRUFBb0IsR0FBcEIsR0FBQTtBQUNSLElBQUEsSUFBQyxDQUFBLE1BQUQsQ0FBUSxLQUFSLEVBQWUsS0FBZixDQUFBLENBQUE7V0FDQSxJQUFDLENBQUEsTUFBRCxDQUFRLEdBQVIsRUFBYSxHQUFiLEVBRlE7RUFBQSxDQWhHVixDQUFBOzttQkFBQTs7R0FGNEIsSUFBSSxDQUFDLFNBQW5DLENBQUEiLCJmaWxlIjoiY2xhc3Nlcy9lcXVhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTUEFDRS5FcXVhbGl6ZXIgZXh0ZW5kcyBQSVhJLkdyYXBoaWNzXG5cbiAgY2VudGVyOiAgICAgbnVsbFxuXG4gIF92YWx1ZXM6ICAgIG51bGxcbiAgX29sZFZhbHVlczogbnVsbFxuICBfbmV3VmFsdWVzOiBudWxsXG5cbiAgX3RpbWU6IDFcblxuICAjIFBhcmFtZXRlcnNcbiAgbWF4TGVuZ3RoOiAgICAgICAgIDBcbiAgbWluTGVuZ3RoOiAgICAgICAgIDBcbiAgcmFkaXVzOiAgICAgICAgICAgIDBcbiAgaW50ZXJwb2xhdGlvblRpbWU6IDBcblxuICBjb25zdHJ1Y3RvcjogKHBvaW50LCBvcHRzPXt9KS0+XG4gICAgc3VwZXJcblxuICAgICMgU2V0IHBhcmFtZXRlcnNcbiAgICBkZWZhdWx0cyA9XG4gICAgICBtYXhMZW5ndGg6ICAgICAgICAgMjAwXG4gICAgICBtaW5MZW5ndGg6ICAgICAgICAgNTBcbiAgICAgIHJhZGl1czogICAgICAgICAgICAyNTBcbiAgICAgIGludGVycG9sYXRpb25UaW1lOiAxNTBcblxuICAgIG9wdHMgICAgICAgICAgICAgICA9IEhFTFBFUlMubWVyZ2UoZGVmYXVsdHMsIG9wdHMpXG4gICAgQG1pbkxlbmd0aCAgICAgICAgID0gb3B0cy5taW5MZW5ndGhcbiAgICBAbWF4TGVuZ3RoICAgICAgICAgPSBvcHRzLm1heExlbmd0aFxuICAgIEByYWRpdXMgICAgICAgICAgICA9IG9wdHMucmFkaXVzXG4gICAgQGludGVycG9sYXRpb25UaW1lID0gb3B0cy5pbnRlcnBvbGF0aW9uVGltZVxuXG4gICAgIyBTZXQgdmFsdWVzXG4gICAgQGNlbnRlciAgICAgPSBuZXcgUElYSS5Qb2ludChwb2ludC54LCBwb2ludC55KVxuICAgIEBfdmFsdWVzICAgID0gW11cbiAgICBAX29sZFZhbHVlcyA9IFtdXG4gICAgQF9uZXdWYWx1ZXMgPSBbXVxuXG4gIHNldE5ld1ZhbHVlczogKHZhbHVlcyktPlxuICAgIG5ld1ZhbHVlcyA9IFtdXG4gICAgZm9yIHZhbHVlIGluIHZhbHVlc1xuICAgICAgbGVuZ3RoID0gQG1pbkxlbmd0aCArIHBhcnNlRmxvYXQodmFsdWUpKihAbWF4TGVuZ3RoIC0gQG1pbkxlbmd0aClcbiAgICAgIG5ld1ZhbHVlcy5wdXNoKGxlbmd0aClcblxuICAgIEBfbmV3VmFsdWVzID0gbmV3VmFsdWVzXG4gICAgQHJlc2V0VGltZSgpXG5cbiAgcmFuZG9tOiA9PlxuICAgIHJhbmRzID0gW11cbiAgICBmb3IgaSBpbiBbMC4uMjU1XVxuICAgICAgcmFuZHNbaV0gPSBNYXRoLnJhbmRvbSgpXG4gICAgQHNldE5ld1ZhbHVlcyhyYW5kcylcblxuICBtdXRlOiA9PlxuICAgIG11dGUgPSBbXVxuICAgIGZvciBpIGluIFswLi4yNTVdXG4gICAgICBtdXRlW2ldID0gMFxuICAgIEBzZXROZXdWYWx1ZXMobXV0ZSlcblxuICB1cGRhdGU6IChkZWx0YSktPlxuICAgIEBfdGltZSArPSBkZWx0YVxuICAgIHQgPSBAX3RpbWUgLyBAaW50ZXJwb2xhdGlvblRpbWVcbiAgICByZXR1cm4gaWYgdCA+IDFcblxuICAgIGZvciBpIGluIFswLi4oQF9uZXdWYWx1ZXMubGVuZ3RoLTEpXVxuICAgICAgZGlmZiAgICAgICAgPSBAX29sZFZhbHVlc1tpXSAtIEBfbmV3VmFsdWVzW2ldXG4gICAgICBAX3ZhbHVlc1tpXSA9IEBfb2xkVmFsdWVzW2ldIC0gdCAqIGRpZmZcblxuICByZXNldFRpbWU6IC0+XG4gICAgQF90aW1lID0gMFxuICAgIEBfb2xkVmFsdWVzID0gQF92YWx1ZXNcblxuICAgIGlmIEBfbmV3VmFsdWVzLmxlbmd0aCA+IEBfb2xkVmFsdWVzLmxlbmd0aFxuICAgICAgZm9yIGkgaW4gWyhAX29sZFZhbHVlcy5sZW5ndGgpLi4oQF9uZXdWYWx1ZXMubGVuZ3RoLTEpXVxuICAgICAgICBAX29sZFZhbHVlc1tpXSA9IDBcblxuICBjYWxjdWxhdGVMaW5lUG9pbnQ6IChhbmdsZSwgbGVuZ3RoKS0+XG4gICAgY2VudGVyID0gSEVMUEVSUy5yZXRpbmEoQGNlbnRlcilcbiAgICB4ID0gY2VudGVyLnggKyBNYXRoLmNvcyhhbmdsZSkgKiBsZW5ndGhcbiAgICB5ID0gY2VudGVyLnkgKyBNYXRoLnNpbihhbmdsZSkgKiBsZW5ndGhcbiAgICByZXR1cm4gbmV3IFBJWEkuUG9pbnQoeCwgeSlcblxuICBkcmF3OiAtPlxuICAgIEBjbGVhcigpXG4gICAgQGxpbmVTdHlsZShTUEFDRS5waXhlbFJhdGlvLCAweEZGRkZGRiwgMSlcblxuICAgIGZvciBpIGluIFswLi4oQF92YWx1ZXMubGVuZ3RoLTEpXVxuICAgICAgYW5nbGUgID0gUElYSS5QSV8yICogaSAvIChAX3ZhbHVlcy5sZW5ndGgpXG4gICAgICBhbmdsZSAgKz0gTWF0aC5QSSouNVxuXG4gICAgICBsZW5ndGggPSBAX3ZhbHVlc1tpXVxuICAgICAgcmFkaXVzID0gSEVMUEVSUy5yZXRpbmEoQHJhZGl1cylcblxuICAgICAgZnJvbSA9IEBjYWxjdWxhdGVMaW5lUG9pbnQoYW5nbGUsIHJhZGl1cy1sZW5ndGgqLjUpXG4gICAgICB0byAgID0gQGNhbGN1bGF0ZUxpbmVQb2ludChhbmdsZSwgcmFkaXVzK2xlbmd0aCouNSlcblxuICAgICAgQGRyYXdsaW5lKGZyb20ueCwgZnJvbS55LCB0by54LCB0by55KVxuXG4gIGRyYXdsaW5lOiAoZnJvbVgsIGZyb21ZLCB0b1gsIHRvWSktPlxuICAgIEBtb3ZlVG8oZnJvbVgsIGZyb21ZKVxuICAgIEBsaW5lVG8odG9YLCB0b1kpXG4iXX0=