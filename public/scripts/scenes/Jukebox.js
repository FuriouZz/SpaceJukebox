var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SPACE.Jukebox = (function(_super) {
  __extends(Jukebox, _super);

  Jukebox.prototype.playlist = null;

  Jukebox.prototype.current = null;

  function Jukebox(bg) {
    this._whileplaying = __bind(this._whileplaying, this);
    this._onfinish = __bind(this._onfinish, this);
    this._onplay = __bind(this._onplay, this);
    this._starting = __bind(this._starting, this);
    var middlePoint;
    Jukebox.__super__.constructor.call(this, bg);
    middlePoint = new PIXI.Point(window.innerWidth * .5, window.innerHeight * .5);
    this.eq = new SPACE.Equalizer(middlePoint, {
      minLength: 0,
      maxLength: 200
    });
    this.addChild(this.eq);
    this.sc = new SPACE.SoundCloud(SPACE.SOUNDCLOUD.id);
    this.playlist = [];
    this._predefinedPlaylist();
  }

  Jukebox.prototype._events = function() {};

  Jukebox.prototype._predefinedPlaylist = function() {
    this.add('https://soundcloud.com/chonch-2/courte-danse-macabre');
    this.add('https://soundcloud.com/chonch-2/mouais');
    this.add('https://soundcloud.com/huhwhatandwhere/sets/supreme-laziness-the-celestics');
    this.add('https://soundcloud.com/chonch-2/cacaco-2');
    this.add('https://soundcloud.com/chonch-2/duodenum');
    return this.add('https://soundcloud.com/chonch-2/little-green-monkey');
  };

  Jukebox.prototype.draw = function() {
    return this.eq.draw();
  };

  Jukebox.prototype.update = function(delta) {
    var i, track, _i, _len, _ref;
    this.eq.update(delta);
    _ref = this.playlist;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      track = _ref[i];
      track.update(delta);
    }
    if (this.playlist.length > 0) {
      if (this.current === null) {
        return this.next();
      }
    }
  };

  Jukebox.prototype.add = function(soundOrPlaylist) {
    var middlePoint;
    middlePoint = new PIXI.Point(window.innerWidth * .5, window.innerHeight * .5);
    return this.sc.getSoundOrPlaylist(soundOrPlaylist, (function(_this) {
      return function(o) {
        var data, spaceship, track, tracks, _i, _len, _results;
        tracks = null;
        if (o.hasOwnProperty('tracks')) {
          tracks = o.tracks;
        } else {
          tracks = [];
          tracks.push(o);
        }
        _results = [];
        for (_i = 0, _len = tracks.length; _i < _len; _i++) {
          data = tracks[_i];
          spaceship = new SPACE.Spaceship(middlePoint, _this.eq.radius);
          _this.addChild(spaceship);
          track = new SPACE.Track(data, spaceship);
          track.durationBeforeLaunching = _this.getDurationFromPosition(_this.playlist.length - 1);
          _this.playlist.push(track);
          _results.push(_this.totalDuration += data.duration);
        }
        return _results;
      };
    })(this));
  };

  Jukebox.prototype.getDurationFromPosition = function(position) {
    var duration, i, track, _i, _len, _ref;
    duration = 0;
    _ref = this.playlist;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      track = _ref[i];
      duration += track.data.duration;
      if (i === position) {
        break;
      }
    }
    return duration;
  };

  Jukebox.prototype.next = function(track) {
    if (this.current) {
      this._onfinish();
    }
    this.current = this.playlist.shift();
    return this.sc.streamSound(this.current.data, this._starting, {
      onplay: this._onplay,
      onfinish: this._onfinish,
      onstop: this._onstop,
      whileplaying: this._whileplaying
    });
  };

  Jukebox.prototype.play = function() {
    if (this.current && this.current.hasOwnProperty('sound')) {
      return this.current.sound.play();
    }
  };

  Jukebox.prototype.resume = function() {
    if (this.current && this.current.hasOwnProperty('sound')) {
      return this.current.sound.resume();
    }
  };

  Jukebox.prototype.pause = function() {
    if (this.current && this.current.hasOwnProperty('sound')) {
      this.current.sound.pause();
      return this.eq.mute();
    }
  };

  Jukebox.prototype.stop = function() {
    if (this.current && this.current.hasOwnProperty('sound')) {
      this.current.sound.stop();
      return this.eq.mute();
    }
  };

  Jukebox.prototype._starting = function(sound) {
    this.current.sound = sound;
    return document.dispatchEvent(SPACE.Track.ON_PLAY());
  };

  Jukebox.prototype._onplay = function() {
    return console.log('onplay');
  };

  Jukebox.prototype._onfinish = function() {
    this.current.sound.stop();
    this.current = null;
    this.eq.mute();
    this.tmpPosition = 0;
    return document.dispatchEvent(SPACE.Track.ON_STOP());
  };

  Jukebox.prototype.tmpPosition = 0;

  Jukebox.prototype._whileplaying = function() {
    var datas, i, _i;
    datas = Array(256);
    for (i = _i = 0; _i <= 127; i = ++_i) {
      datas[i] = Math.max(this.current.sound.waveformData.left[i], this.current.sound.waveformData.right[i]);
      datas[255 - i] = Math.max(this.current.sound.waveformData.left[i], this.current.sound.waveformData.right[i]);
    }
    if (this.current.sound.paused) {
      return this.eq.mute();
    } else {
      return this.eq.setNewValues(datas);
    }
  };

  return Jukebox;

})(SPACE.Scene);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9KdWtlYm94LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztpU0FBQTs7QUFBQSxLQUFXLENBQUM7QUFFViw0QkFBQSxDQUFBOztBQUFBLG9CQUFBLFFBQUEsR0FBVSxJQUFWLENBQUE7O0FBQUEsb0JBQ0EsT0FBQSxHQUFTLElBRFQsQ0FBQTs7QUFHYSxFQUFBLGlCQUFDLEVBQUQsR0FBQTtBQUNYLHlEQUFBLENBQUE7QUFBQSxpREFBQSxDQUFBO0FBQUEsNkNBQUEsQ0FBQTtBQUFBLGlEQUFBLENBQUE7QUFBQSxRQUFBLFdBQUE7QUFBQSxJQUFBLHlDQUFNLEVBQU4sQ0FBQSxDQUFBO0FBQUEsSUFFQSxXQUFBLEdBQWtCLElBQUEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxNQUFNLENBQUMsVUFBUCxHQUFvQixFQUEvQixFQUFtQyxNQUFNLENBQUMsV0FBUCxHQUFxQixFQUF4RCxDQUZsQixDQUFBO0FBQUEsSUFJQSxJQUFDLENBQUEsRUFBRCxHQUFVLElBQUEsS0FBSyxDQUFDLFNBQU4sQ0FBZ0IsV0FBaEIsRUFBNkI7QUFBQSxNQUFDLFNBQUEsRUFBVyxDQUFaO0FBQUEsTUFBZSxTQUFBLEVBQVcsR0FBMUI7S0FBN0IsQ0FKVixDQUFBO0FBQUEsSUFLQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxFQUFYLENBTEEsQ0FBQTtBQUFBLElBT0EsSUFBQyxDQUFBLEVBQUQsR0FBVSxJQUFBLEtBQUssQ0FBQyxVQUFOLENBQWlCLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBbEMsQ0FQVixDQUFBO0FBQUEsSUFTQSxJQUFDLENBQUEsUUFBRCxHQUFZLEVBVFosQ0FBQTtBQUFBLElBVUEsSUFBQyxDQUFBLG1CQUFELENBQUEsQ0FWQSxDQURXO0VBQUEsQ0FIYjs7QUFBQSxvQkFnQkEsT0FBQSxHQUFTLFNBQUEsR0FBQSxDQWhCVCxDQUFBOztBQUFBLG9CQW1CQSxtQkFBQSxHQUFxQixTQUFBLEdBQUE7QUFDbkIsSUFB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akIsRUFIRjtLQU5hO0VBQUEsQ0FuSGYsQ0FBQTs7aUJBQUE7O0dBRjBCLEtBQUssQ0FBQyxNQUFsQyxDQUFBIiwiZmlsZSI6InNjZW5lcy9KdWtlYm94LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU1BBQ0UuSnVrZWJveCBleHRlbmRzIFNQQUNFLlNjZW5lXG5cbiAgcGxheWxpc3Q6IG51bGxcbiAgY3VycmVudDogbnVsbFxuXG4gIGNvbnN0cnVjdG9yOiAoYmcpLT5cbiAgICBzdXBlcihiZylcblxuICAgIG1pZGRsZVBvaW50ID0gbmV3IFBJWEkuUG9pbnQod2luZG93LmlubmVyV2lkdGggKiAuNSwgd2luZG93LmlubmVySGVpZ2h0ICogLjUpXG5cbiAgICBAZXEgPSBuZXcgU1BBQ0UuRXF1YWxpemVyKG1pZGRsZVBvaW50LCB7bWluTGVuZ3RoOiAwLCBtYXhMZW5ndGg6IDIwMH0pXG4gICAgQGFkZENoaWxkKEBlcSlcblxuICAgIEBzYyA9IG5ldyBTUEFDRS5Tb3VuZENsb3VkKFNQQUNFLlNPVU5EQ0xPVUQuaWQpXG5cbiAgICBAcGxheWxpc3QgPSBbXVxuICAgIEBfcHJlZGVmaW5lZFBsYXlsaXN0KClcblxuICBfZXZlbnRzOiAtPlxuXG5cbiAgX3ByZWRlZmluZWRQbGF5bGlzdDogLT5cbiAgICBAYWRkKCdodHRwczovL3NvdW5kY2xvdWQuY29tL2Nob25jaC0yL2NvdXJ0ZS1kYW5zZS1tYWNhYnJlJylcbiAgICBAYWRkKCdodHRwczovL3NvdW5kY2xvdWQuY29tL2Nob25jaC0yL21vdWFpcycpXG4gICAgQGFkZCgnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9odWh3aGF0YW5kd2hlcmUvc2V0cy9zdXByZW1lLWxhemluZXNzLXRoZS1jZWxlc3RpY3MnKVxuICAgIEBhZGQoJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vY2hvbmNoLTIvY2FjYWNvLTInKVxuICAgIEBhZGQoJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vY2hvbmNoLTIvZHVvZGVudW0nKVxuICAgIEBhZGQoJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vY2hvbmNoLTIvbGl0dGxlLWdyZWVuLW1vbmtleScpXG5cbiAgZHJhdzogLT5cbiAgICBAZXEuZHJhdygpXG5cbiAgdXBkYXRlOiAoZGVsdGEpLT5cbiAgICBAZXEudXBkYXRlKGRlbHRhKVxuXG4gICAgZm9yIHRyYWNrLCBpIGluIEBwbGF5bGlzdFxuICAgICAgdHJhY2sudXBkYXRlKGRlbHRhKVxuXG4gICAgaWYgQHBsYXlsaXN0Lmxlbmd0aCA+IDBcbiAgICAgIEBuZXh0KCkgaWYgQGN1cnJlbnQgPT0gbnVsbFxuXG4gIGFkZDogKHNvdW5kT3JQbGF5bGlzdCktPlxuICAgIG1pZGRsZVBvaW50ID0gbmV3IFBJWEkuUG9pbnQod2luZG93LmlubmVyV2lkdGggKiAuNSwgd2luZG93LmlubmVySGVpZ2h0ICogLjUpXG5cbiAgICBAc2MuZ2V0U291bmRPclBsYXlsaXN0KHNvdW5kT3JQbGF5bGlzdCwgKG8pPT5cbiAgICAgIHRyYWNrcyA9IG51bGxcbiAgICAgIGlmIG8uaGFzT3duUHJvcGVydHkoJ3RyYWNrcycpXG4gICAgICAgIHRyYWNrcyA9IG8udHJhY2tzXG4gICAgICBlbHNlXG4gICAgICAgIHRyYWNrcyA9IFtdXG4gICAgICAgIHRyYWNrcy5wdXNoKG8pXG5cbiAgICAgIGZvciBkYXRhIGluIHRyYWNrc1xuICAgICAgICAjIENyZWF0ZSBTcGFjZXNoaXBcbiAgICAgICAgc3BhY2VzaGlwID0gbmV3IFNQQUNFLlNwYWNlc2hpcChtaWRkbGVQb2ludCwgQGVxLnJhZGl1cylcbiAgICAgICAgQGFkZENoaWxkKHNwYWNlc2hpcClcblxuICAgICAgICAjIENyZWF0ZSB0cmFjayBmcm9tIGRhdGEgYW5kIHNwYWNlc2hpcFxuICAgICAgICB0cmFjayA9IG5ldyBTUEFDRS5UcmFjayhkYXRhLCBzcGFjZXNoaXApXG4gICAgICAgIHRyYWNrLmR1cmF0aW9uQmVmb3JlTGF1bmNoaW5nID0gQGdldER1cmF0aW9uRnJvbVBvc2l0aW9uKEBwbGF5bGlzdC5sZW5ndGgtMSlcbiAgICAgICAgQHBsYXlsaXN0LnB1c2godHJhY2spXG5cbiAgICAgICAgQHRvdGFsRHVyYXRpb24gKz0gZGF0YS5kdXJhdGlvblxuICAgIClcblxuICBnZXREdXJhdGlvbkZyb21Qb3NpdGlvbjogKHBvc2l0aW9uKS0+XG4gICAgZHVyYXRpb24gPSAwXG4gICAgZm9yIHRyYWNrLCBpIGluIEBwbGF5bGlzdFxuICAgICAgZHVyYXRpb24gKz0gdHJhY2suZGF0YS5kdXJhdGlvblxuICAgICAgYnJlYWsgaWYgaSA9PSBwb3NpdGlvblxuICAgIHJldHVybiBkdXJhdGlvblxuXG4gIG5leHQ6ICh0cmFjayktPlxuICAgIEBfb25maW5pc2goKSBpZiBAY3VycmVudFxuICAgIEBjdXJyZW50ID0gQHBsYXlsaXN0LnNoaWZ0KClcblxuICAgIEBzYy5zdHJlYW1Tb3VuZChAY3VycmVudC5kYXRhLCBAX3N0YXJ0aW5nLCB7XG4gICAgICBvbnBsYXkgICAgICAgOiBAX29ucGxheVxuICAgICAgb25maW5pc2ggICAgIDogQF9vbmZpbmlzaFxuICAgICAgb25zdG9wICAgICAgIDogQF9vbnN0b3BcbiAgICAgIHdoaWxlcGxheWluZyA6IEBfd2hpbGVwbGF5aW5nXG4gICAgfSlcblxuICBwbGF5OiAtPlxuICAgIGlmIEBjdXJyZW50IGFuZCBAY3VycmVudC5oYXNPd25Qcm9wZXJ0eSgnc291bmQnKVxuICAgICAgQGN1cnJlbnQuc291bmQucGxheSgpXG5cbiAgcmVzdW1lOiAtPlxuICAgIGlmIEBjdXJyZW50IGFuZCBAY3VycmVudC5oYXNPd25Qcm9wZXJ0eSgnc291bmQnKVxuICAgICAgQGN1cnJlbnQuc291bmQucmVzdW1lKClcblxuICBwYXVzZTogLT5cbiAgICBpZiBAY3VycmVudCBhbmQgQGN1cnJlbnQuaGFzT3duUHJvcGVydHkoJ3NvdW5kJylcbiAgICAgIEBjdXJyZW50LnNvdW5kLnBhdXNlKClcbiAgICAgIEBlcS5tdXRlKClcblxuICBzdG9wOiAtPlxuICAgIGlmIEBjdXJyZW50IGFuZCBAY3VycmVudC5oYXNPd25Qcm9wZXJ0eSgnc291bmQnKVxuICAgICAgQGN1cnJlbnQuc291bmQuc3RvcCgpXG4gICAgICBAZXEubXV0ZSgpXG5cbiAgX3N0YXJ0aW5nOiAoc291bmQpPT5cbiAgICBAY3VycmVudC5zb3VuZCA9IHNvdW5kXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChTUEFDRS5UcmFjay5PTl9QTEFZKCkpXG5cbiAgX29ucGxheTogPT5cbiAgICBjb25zb2xlLmxvZyAnb25wbGF5J1xuXG4gIF9vbmZpbmlzaDogPT5cbiAgICBAY3VycmVudC5zb3VuZC5zdG9wKClcbiAgICBAY3VycmVudCA9IG51bGxcbiAgICBAZXEubXV0ZSgpXG4gICAgQHRtcFBvc2l0aW9uID0gMFxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoU1BBQ0UuVHJhY2suT05fU1RPUCgpKVxuXG4gIHRtcFBvc2l0aW9uOiAwXG5cbiAgX3doaWxlcGxheWluZzogPT5cbiAgICBkYXRhcyA9IEFycmF5KDI1NilcbiAgICBmb3IgaSBpbiBbMC4uMTI3XVxuICAgICAgZGF0YXNbaV0gICAgID0gTWF0aC5tYXgoQGN1cnJlbnQuc291bmQud2F2ZWZvcm1EYXRhLmxlZnRbaV0sIEBjdXJyZW50LnNvdW5kLndhdmVmb3JtRGF0YS5yaWdodFtpXSlcbiAgICAgIGRhdGFzWzI1NS1pXSA9IE1hdGgubWF4KEBjdXJyZW50LnNvdW5kLndhdmVmb3JtRGF0YS5sZWZ0W2ldLCBAY3VycmVudC5zb3VuZC53YXZlZm9ybURhdGEucmlnaHRbaV0pXG5cbiAgICBpZiBAY3VycmVudC5zb3VuZC5wYXVzZWRcbiAgICAgIEBlcS5tdXRlKClcbiAgICBlbHNlXG4gICAgICBAZXEuc2V0TmV3VmFsdWVzKGRhdGFzKVxuXG4iXX0=