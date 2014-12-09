var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SPACE.MainScene = (function(_super) {
  __extends(MainScene, _super);

  MainScene.prototype.playlist = null;

  MainScene.prototype.current = null;

  MainScene.prototype.totalDuration = 0;

  function MainScene(bg) {
    this._whileplaying = __bind(this._whileplaying, this);
    this._onfinish = __bind(this._onfinish, this);
    this._onplay = __bind(this._onplay, this);
    this._starting = __bind(this._starting, this);
    var middlePoint;
    MainScene.__super__.constructor.call(this, bg);
    middlePoint = new PIXI.Point(window.innerWidth, window.innerHeight);
    this.eq = new SPACE.Equalizer(middlePoint, {
      minLength: 0,
      maxLength: 200
    });
    this.addChild(this.eq);
    this.sc = new SPACE.SoundCloud(SPACE.SOUNDCLOUD.id);
    this.playlist = [];
    this.add('https://soundcloud.com/chonch-2/courte-danse-macabre');
    setTimeout((function(_this) {
      return function() {
        return _this.add('https://soundcloud.com/chonch-2/mouais');
      };
    })(this), 1000);
    setTimeout((function(_this) {
      return function() {
        return _this.add('https://soundcloud.com/chonch-2/cacaco-2');
      };
    })(this), 2000);
    setTimeout((function(_this) {
      return function() {
        return _this.add('https://soundcloud.com/chonch-2/duodenum');
      };
    })(this), 3000);
    this.add('https://soundcloud.com/chonch-2/little-green-monkey');
  }

  MainScene.prototype.draw = function() {
    return this.eq.draw();
  };

  MainScene.prototype.update = function(delta) {
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

  MainScene.prototype.add = function(soundOrPlaylist) {
    var middlePoint;
    middlePoint = new PIXI.Point(window.innerWidth, window.innerHeight);
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

  MainScene.prototype.getDurationFromPosition = function(position) {
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

  MainScene.prototype.next = function(track) {
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

  MainScene.prototype.play = function() {
    if (this.current && this.current.hasOwnProperty('sound')) {
      return this.current.sound.play();
    }
  };

  MainScene.prototype.resume = function() {
    if (this.current && this.current.hasOwnProperty('sound')) {
      return this.current.sound.resume();
    }
  };

  MainScene.prototype.pause = function() {
    if (this.current && this.current.hasOwnProperty('sound')) {
      this.current.sound.pause();
      return this.eq.mute();
    }
  };

  MainScene.prototype.stop = function() {
    if (this.current && this.current.hasOwnProperty('sound')) {
      this.current.sound.stop();
      return this.eq.mute();
    }
  };

  MainScene.prototype._starting = function(sound) {
    this.current.sound = sound;
    return document.dispatchEvent(SPACE.Track.ON_PLAY());
  };

  MainScene.prototype._onplay = function() {
    return console.log('onplay');
  };

  MainScene.prototype._onfinish = function() {
    this.current.sound.stop();
    this.current = null;
    this.eq.mute();
    this.tmpPosition = 0;
    return document.dispatchEvent(SPACE.Track.ON_STOP());
  };

  MainScene.prototype.tmpPosition = 0;

  MainScene.prototype._whileplaying = function() {
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

  return MainScene;

})(SPACE.Scene);

//# sourceMappingURL=data:application/json;base64,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QUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQWxCO2FBQ0UsSUFBQyxDQUFBLEVBQUUsQ0FBQyxJQUFKLENBQUEsRUFERjtLQUFBLE1BQUE7YUFHRSxJQUFDLENBQUEsRUFBRSxDQUFDLFlBQUosQ0FBaUIsS0FBakIsRUFIRjtLQWpCYTtFQUFBLENBekhmLENBQUE7O21CQUFBOztHQUY0QixLQUFLLENBQUMsTUFBcEMsQ0FBQSIsImZpbGUiOiJzY2VuZXMvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNQQUNFLk1haW5TY2VuZSBleHRlbmRzIFNQQUNFLlNjZW5lXG5cbiAgcGxheWxpc3Q6IG51bGxcbiAgY3VycmVudDogbnVsbFxuXG4gIHRvdGFsRHVyYXRpb246IDBcblxuICBjb25zdHJ1Y3RvcjogKGJnKS0+XG4gICAgc3VwZXIoYmcpXG5cbiAgICBtaWRkbGVQb2ludCA9IG5ldyBQSVhJLlBvaW50KHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG5cbiAgICBAZXEgPSBuZXcgU1BBQ0UuRXF1YWxpemVyKG1pZGRsZVBvaW50LCB7bWluTGVuZ3RoOiAwLCBtYXhMZW5ndGg6IDIwMH0pXG4gICAgQGFkZENoaWxkKEBlcSlcblxuICAgIEBzYyA9IG5ldyBTUEFDRS5Tb3VuZENsb3VkKFNQQUNFLlNPVU5EQ0xPVUQuaWQpXG5cbiAgICBAcGxheWxpc3QgPSBbXVxuXG4gICAgQGFkZCgnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9jaG9uY2gtMi9jb3VydGUtZGFuc2UtbWFjYWJyZScpXG4gICAgc2V0VGltZW91dCg9PlxuICAgICAgQGFkZCgnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9jaG9uY2gtMi9tb3VhaXMnKVxuICAgICwgMTAwMClcbiAgICBzZXRUaW1lb3V0KD0+XG4gICAgICBAYWRkKCdodHRwczovL3NvdW5kY2xvdWQuY29tL2Nob25jaC0yL2NhY2Fjby0yJylcbiAgICAsIDIwMDApXG4gICAgc2V0VGltZW91dCg9PlxuICAgICAgQGFkZCgnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9jaG9uY2gtMi9kdW9kZW51bScpXG4gICAgLCAzMDAwKVxuICAgIEBhZGQoJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vY2hvbmNoLTIvbGl0dGxlLWdyZWVuLW1vbmtleScpXG4gICAgIyBAYWRkKCcvdHJhY2tzLzE3OTAxMzY3MycpXG4gICAgIyBAYWRkKCcvdHJhY2tzLzE1NzE3MDI4NCcpXG4gICAgIyBAYWRkKCdodHRwczovL3NvdW5kY2xvdWQuY29tL2h1aHdoYXRhbmR3aGVyZS9zZXRzL3N1cHJlbWUtbGF6aW5lc3MtdGhlLWNlbGVzdGljcycpXG5cbiAgZHJhdzogLT5cbiAgICBAZXEuZHJhdygpXG4gICAgIyBAc3BhY2VzaGlwLmRyYXcoKVxuXG4gIHVwZGF0ZTogKGRlbHRhKS0+XG4gICAgQGVxLnVwZGF0ZShkZWx0YSlcblxuICAgIGZvciB0cmFjaywgaSBpbiBAcGxheWxpc3RcbiAgICAgIHRyYWNrLnVwZGF0ZShkZWx0YSkjIGlmIGkgPT0gMVxuXG4gICAgaWYgQHBsYXlsaXN0Lmxlbmd0aCA+IDBcbiAgICAgIEBuZXh0KCkgaWYgQGN1cnJlbnQgPT0gbnVsbFxuXG4gIGFkZDogKHNvdW5kT3JQbGF5bGlzdCktPlxuICAgIG1pZGRsZVBvaW50ID0gbmV3IFBJWEkuUG9pbnQod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcblxuICAgIEBzYy5nZXRTb3VuZE9yUGxheWxpc3Qoc291bmRPclBsYXlsaXN0LCAobyk9PlxuICAgICAgdHJhY2tzID0gbnVsbFxuICAgICAgaWYgby5oYXNPd25Qcm9wZXJ0eSgndHJhY2tzJylcbiAgICAgICAgdHJhY2tzID0gby50cmFja3NcbiAgICAgIGVsc2VcbiAgICAgICAgdHJhY2tzID0gW11cbiAgICAgICAgdHJhY2tzLnB1c2gobylcblxuICAgICAgZm9yIGRhdGEgaW4gdHJhY2tzXG4gICAgICAgICMgQ3JlYXRlIFNwYWNlc2hpcFxuICAgICAgICBzcGFjZXNoaXAgPSBuZXcgU1BBQ0UuU3BhY2VzaGlwKG1pZGRsZVBvaW50LCBAZXEucmFkaXVzKVxuICAgICAgICBAYWRkQ2hpbGQoc3BhY2VzaGlwKVxuXG4gICAgICAgICMgQ3JlYXRlIHRyYWNrIGZyb20gZGF0YSBhbmQgc3BhY2VzaGlwXG4gICAgICAgIHRyYWNrID0gbmV3IFNQQUNFLlRyYWNrKGRhdGEsIHNwYWNlc2hpcClcbiAgICAgICAgdHJhY2suZHVyYXRpb25CZWZvcmVMYXVuY2hpbmcgPSBAZ2V0RHVyYXRpb25Gcm9tUG9zaXRpb24oQHBsYXlsaXN0Lmxlbmd0aC0xKVxuICAgICAgICBAcGxheWxpc3QucHVzaCh0cmFjaylcblxuICAgICAgICBAdG90YWxEdXJhdGlvbiArPSBkYXRhLmR1cmF0aW9uXG4gICAgKVxuXG4gIGdldER1cmF0aW9uRnJvbVBvc2l0aW9uOiAocG9zaXRpb24pLT5cbiAgICBkdXJhdGlvbiA9IDBcbiAgICBmb3IgdHJhY2ssIGkgaW4gQHBsYXlsaXN0XG4gICAgICBkdXJhdGlvbiArPSB0cmFjay5kYXRhLmR1cmF0aW9uXG4gICAgICBicmVhayBpZiBpID09IHBvc2l0aW9uXG4gICAgcmV0dXJuIGR1cmF0aW9uXG5cbiAgbmV4dDogKHRyYWNrKS0+XG4gICAgQF9vbmZpbmlzaCgpIGlmIEBjdXJyZW50XG4gICAgQGN1cnJlbnQgPSBAcGxheWxpc3Quc2hpZnQoKVxuXG4gICAgQHNjLnN0cmVhbVNvdW5kKEBjdXJyZW50LmRhdGEsIEBfc3RhcnRpbmcsIHtcbiAgICAgIG9ucGxheSAgICAgICA6IEBfb25wbGF5XG4gICAgICBvbmZpbmlzaCAgICAgOiBAX29uZmluaXNoXG4gICAgICBvbnN0b3AgICAgICAgOiBAX29uc3RvcFxuICAgICAgd2hpbGVwbGF5aW5nIDogQF93aGlsZXBsYXlpbmdcbiAgICB9KVxuXG4gIHBsYXk6IC0+XG4gICAgaWYgQGN1cnJlbnQgYW5kIEBjdXJyZW50Lmhhc093blByb3BlcnR5KCdzb3VuZCcpXG4gICAgICBAY3VycmVudC5zb3VuZC5wbGF5KClcblxuICByZXN1bWU6IC0+XG4gICAgaWYgQGN1cnJlbnQgYW5kIEBjdXJyZW50Lmhhc093blByb3BlcnR5KCdzb3VuZCcpXG4gICAgICBAY3VycmVudC5zb3VuZC5yZXN1bWUoKVxuXG4gIHBhdXNlOiAtPlxuICAgIGlmIEBjdXJyZW50IGFuZCBAY3VycmVudC5oYXNPd25Qcm9wZXJ0eSgnc291bmQnKVxuICAgICAgQGN1cnJlbnQuc291bmQucGF1c2UoKVxuICAgICAgQGVxLm11dGUoKVxuXG4gIHN0b3A6IC0+XG4gICAgaWYgQGN1cnJlbnQgYW5kIEBjdXJyZW50Lmhhc093blByb3BlcnR5KCdzb3VuZCcpXG4gICAgICBAY3VycmVudC5zb3VuZC5zdG9wKClcbiAgICAgIEBlcS5tdXRlKClcblxuICBfc3RhcnRpbmc6IChzb3VuZCk9PlxuICAgIEBjdXJyZW50LnNvdW5kID0gc291bmRcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFNQQUNFLlRyYWNrLk9OX1BMQVkoKSlcblxuICBfb25wbGF5OiA9PlxuICAgIGNvbnNvbGUubG9nICdvbnBsYXknXG5cbiAgX29uZmluaXNoOiA9PlxuICAgIEBjdXJyZW50LnNvdW5kLnN0b3AoKVxuICAgIEBjdXJyZW50ID0gbnVsbFxuICAgIEBlcS5tdXRlKClcbiAgICBAdG1wUG9zaXRpb24gPSAwXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChTUEFDRS5UcmFjay5PTl9TVE9QKCkpXG5cbiAgdG1wUG9zaXRpb246IDBcblxuICBfd2hpbGVwbGF5aW5nOiA9PlxuICAgICMgY29uc29sZS5sb2cgRGF0ZS5ub3coKSAtIEB0bXBQb3NpdGlvblxuICAgICMgQHRtcFBvc2l0aW9uID0gRGF0ZS5ub3coKVxuICAgICMgQHRvdGFsRHVyYXRpb24gLT0gQGN1cnJlbnQuc291bmQucG9zaXRpb24gLSBAdG1wUG9zaXRpb25cbiAgICAjIEB0bXBQb3NpdGlvbiAgID0gQGN1cnJlbnQuc291bmQucG9zaXRpb25cbiAgICAjIGZvciB0cmFjaywgaSBpbiBAcGxheWxpc3RcbiAgICAjICAgdHJhY2suc3BhY2VzaGlwLndhaXQgLT0gQGN1cnJlbnQuc291bmQucG9zaXRpb24gLSBAdG1wUG9zaXRpb25cbiAgICAjICAgQHRtcFBvc2l0aW9uID0gQGN1cnJlbnQuc291bmQucG9zaXRpb25cblxuICAgICMgcGVyID0gQGN1cnJlbnQuc291bmQucG9zaXRpb24gLyBAY3VycmVudC5zb3VuZC5kdXJhdGlvblxuICAgICMgY29uc29sZS5sb2cgcGVyXG5cbiAgICBkYXRhcyA9IEFycmF5KDI1NilcbiAgICBmb3IgaSBpbiBbMC4uMTI3XVxuICAgICAgZGF0YXNbaV0gICAgID0gTWF0aC5tYXgoQGN1cnJlbnQuc291bmQud2F2ZWZvcm1EYXRhLmxlZnRbaV0sIEBjdXJyZW50LnNvdW5kLndhdmVmb3JtRGF0YS5yaWdodFtpXSlcbiAgICAgIGRhdGFzWzI1NS1pXSA9IE1hdGgubWF4KEBjdXJyZW50LnNvdW5kLndhdmVmb3JtRGF0YS5sZWZ0W2ldLCBAY3VycmVudC5zb3VuZC53YXZlZm9ybURhdGEucmlnaHRbaV0pXG5cbiAgICBpZiBAY3VycmVudC5zb3VuZC5wYXVzZWRcbiAgICAgIEBlcS5tdXRlKClcbiAgICBlbHNlXG4gICAgICBAZXEuc2V0TmV3VmFsdWVzKGRhdGFzKVxuXG4iXX0=