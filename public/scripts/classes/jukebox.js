var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SPACE.Jukebox = (function() {
  Jukebox.prototype.current = null;

  Jukebox.prototype.playlist = null;

  Jukebox.prototype.SC = null;

  function Jukebox() {
    this._onfinish = __bind(this._onfinish, this);
    this._onplay = __bind(this._onplay, this);
    this._starting = __bind(this._starting, this);
    this._eTrackAdded = __bind(this._eTrackAdded, this);
    this.SC = new SPACE.SoundCloud(SPACE.SOUNDCLOUD.id);
    this.playlist = [];
    this._events();
    this._predefinedPlaylist();
  }

  Jukebox.prototype._events = function() {
    return document.addEventListener(JUKEBOX.TRACK_ADDED.type, this._eTrackAdded);
  };

  Jukebox.prototype._eTrackAdded = function(e) {
    var track;
    track = e.object.track;
    track.pendingDuration = this._calcPending(this.playlist.length - 1);
    this.playlist.push(e.object.track);
    return console.log('Sound added: ' + e.object.track.data.title);
  };

  Jukebox.prototype._predefinedPlaylist = function() {
    return this.add('https://soundcloud.com/professorkliq/sets/trackmania-valley-ost');
  };

  Jukebox.prototype.list = function() {
    var list, track, _i, _len, _ref;
    list = [];
    _ref = this.playlist;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      track = _ref[_i];
      list.push({
        title: track.data.title,
        pendingDuration: track.pendingDuration
      });
    }
    return list;
  };

  Jukebox.prototype.add = function(soundOrPlaylist) {
    return this.SC.getSoundOrPlaylist(soundOrPlaylist, (function(_this) {
      return function(o) {
        var data, track, tracks, _i, _len, _results;
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
          track = new SPACE.Track(data);
          _results.push(HELPERS.trigger(JUKEBOX.TRACK_ON_ADD, {
            track: track
          }));
        }
        return _results;
      };
    })(this));
  };

  Jukebox.prototype._calcPending = function(position) {
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

  Jukebox.prototype.update = function(delta) {
    var i, track, _i, _len, _ref;
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

  Jukebox.prototype.next = function(track) {
    if (this.current) {
      this._onfinish();
    }
    this.current = this.playlist.shift();
    this.current.spaceship.parent.removeChild(this.current.spaceship);
    return this.SC.streamSound(this.current.data, this._starting, {
      onplay: this._onplay,
      onfinish: this._onfinish,
      onstop: this._onstop,
      whileplaying: this.whileplaying
    });
  };

  Jukebox.prototype._starting = function(sound) {
    return this.current.sound = sound;
  };

  Jukebox.prototype._onplay = function() {
    console.log('Next: ' + this.current.data.title);
    return HELPERS.trigger(JUKEBOX.IS_PLAYING);
  };

  Jukebox.prototype._onfinish = function() {
    console.log('onstop');
    this.current.sound.stop();
    this.current.sound.destruct();
    this.current = null;
    this.eq.mute();
    return HELPERS.trigger(JUKEBOX.IS_STOPPED);
  };

  return Jukebox;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzZXMvanVrZWJveC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxrRkFBQTs7QUFBQSxLQUFXLENBQUM7QUFFVixvQkFBQSxPQUFBLEdBQVMsSUFBVCxDQUFBOztBQUFBLG9CQUNBLFFBQUEsR0FBVSxJQURWLENBQUE7O0FBQUEsb0JBR0EsRUFBQSxHQUFJLElBSEosQ0FBQTs7QUFLYSxFQUFBLGlCQUFBLEdBQUE7QUFDWCxpREFBQSxDQUFBO0FBQUEsNkNBQUEsQ0FBQTtBQUFBLGlEQUFBLENBQUE7QUFBQSx1REFBQSxDQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsRUFBRCxHQUFVLElBQUEsS0FBSyxDQUFDLFVBQU4sQ0FBaUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFsQyxDQUFWLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxRQUFELEdBQVksRUFGWixDQUFBO0FBQUEsSUFHQSxJQUFDLENBQUEsT0FBRCxDQUFBLENBSEEsQ0FBQTtBQUFBLElBS0EsSUFBQyxDQUFBLG1CQUFELENBQUEsQ0FMQSxDQURXO0VBQUEsQ0FMYjs7QUFBQSxvQkFhQSxPQUFBLEdBQVMsU0FBQSxHQUFBO1dBQ1AsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBOUMsRUFBb0QsSUFBQyxDQUFBLFlBQXJELEVBRE87RUFBQSxDQWJULENBQUE7O0FBQUEsb0JBZ0JBLFlBQUEsR0FBYyxTQUFDLENBQUQsR0FBQTtBQUNaLFFBQUEsS0FBQTtBQUFBLElBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBakIsQ0FBQTtBQUFBLElBQ0EsS0FBSyxDQUFDLGVBQU4sR0FBd0IsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsR0FBaUIsQ0FBL0IsQ0FEeEIsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxL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QUlBLElBQUMsQ0FBQSxFQUFFLENBQUMsSUFBSixDQUFBLENBSkEsQ0FBQTtXQUtBLE9BQU8sQ0FBQyxPQUFSLENBQWdCLE9BQU8sQ0FBQyxVQUF4QixFQU5TO0VBQUEsQ0FsR1gsQ0FBQTs7aUJBQUE7O0lBRkYsQ0FBQSIsImZpbGUiOiJjbGFzc2VzL2p1a2Vib3guanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTUEFDRS5KdWtlYm94XG5cbiAgY3VycmVudDogbnVsbFxuICBwbGF5bGlzdDogbnVsbFxuXG4gIFNDOiBudWxsXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQFNDID0gbmV3IFNQQUNFLlNvdW5kQ2xvdWQoU1BBQ0UuU09VTkRDTE9VRC5pZClcblxuICAgIEBwbGF5bGlzdCA9IFtdXG4gICAgQF9ldmVudHMoKVxuXG4gICAgQF9wcmVkZWZpbmVkUGxheWxpc3QoKVxuXG4gIF9ldmVudHM6IC0+XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihKVUtFQk9YLlRSQUNLX0FEREVELnR5cGUsIEBfZVRyYWNrQWRkZWQpXG5cbiAgX2VUcmFja0FkZGVkOiAoZSk9PlxuICAgIHRyYWNrID0gZS5vYmplY3QudHJhY2tcbiAgICB0cmFjay5wZW5kaW5nRHVyYXRpb24gPSBAX2NhbGNQZW5kaW5nKEBwbGF5bGlzdC5sZW5ndGgtMSlcbiAgICBAcGxheWxpc3QucHVzaChlLm9iamVjdC50cmFjaylcblxuICAgICMgQHBsYXlsaXN0ID0gSEVMUEVSUy5zaHVmZmxlKEBwbGF5bGlzdClcbiAgICBjb25zb2xlLmxvZyAnU291bmQgYWRkZWQ6ICcgKyBlLm9iamVjdC50cmFjay5kYXRhLnRpdGxlXG4gICAgIyBjb25zb2xlLmxvZyBAbGlzdCgpXG5cbiAgX3ByZWRlZmluZWRQbGF5bGlzdDogLT5cbiAgICAjIEBhZGQoJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vY2hvbmNoLTIvY291cnRlLWRhbnNlLW1hY2FicmUnKVxuICAgICMgc2V0VGltZW91dCg9PlxuICAgICMgICBAYWRkKCdodHRwczovL3NvdW5kY2xvdWQuY29tL2Nob25jaC0yL21vdWFpcycpXG4gICAgIyAsIDEwMDApXG4gICAgIyAjIEBhZGQoJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vaHVod2hhdGFuZHdoZXJlL3NldHMvc3VwcmVtZS1sYXppbmVzcy10aGUtY2VsZXN0aWNzJylcbiAgICAjICMgQGFkZCgnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS90b21taXNjaC9zZXRzL3RvbS1taXNjaC1zb3VsZWN0aW9uLXdoaXRlJylcbiAgICAjIHNldFRpbWVvdXQoPT5cbiAgICAjICAgQGFkZCgnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9jaG9uY2gtMi9jYWNhY28tMicpXG4gICAgIyAsIDIwMDApXG4gICAgIyBzZXRUaW1lb3V0KD0+XG4gICAgIyAgIEBhZGQoJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vY2hvbmNoLTIvZHVvZGVudW0nKVxuICAgICMgLCAzMDAwKVxuICAgICMgc2V0VGltZW91dCg9PlxuICAgICMgICBAYWRkKCdodHRwczovL3NvdW5kY2xvdWQuY29tL2Nob25jaC0yL2xpdHRsZS1ncmVlbi1tb25rZXknKVxuICAgICMgLCA0MDAwKVxuICAgIEBhZGQoJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vcHJvZmVzc29ya2xpcS9zZXRzL3RyYWNrbWFuaWEtdmFsbGV5LW9zdCcpXG5cbiAgbGlzdDogLT5cbiAgICBsaXN0ID0gW11cbiAgICBmb3IgdHJhY2sgaW4gQHBsYXlsaXN0XG4gICAgICBsaXN0LnB1c2goe3RpdGxlOiB0cmFjay5kYXRhLnRpdGxlLCBwZW5kaW5nRHVyYXRpb246IHRyYWNrLnBlbmRpbmdEdXJhdGlvbn0pXG4gICAgcmV0dXJuIGxpc3RcblxuICBhZGQ6IChzb3VuZE9yUGxheWxpc3QpLT5cbiAgICBAU0MuZ2V0U291bmRPclBsYXlsaXN0KHNvdW5kT3JQbGF5bGlzdCwgKG8pPT5cbiAgICAgIHRyYWNrcyA9IG51bGxcbiAgICAgIGlmIG8uaGFzT3duUHJvcGVydHkoJ3RyYWNrcycpXG4gICAgICAgIHRyYWNrcyA9IG8udHJhY2tzXG4gICAgICBlbHNlXG4gICAgICAgIHRyYWNrcyA9IFtdXG4gICAgICAgIHRyYWNrcy5wdXNoKG8pXG5cbiAgICAgIGZvciBkYXRhIGluIHRyYWNrc1xuICAgICAgICB0cmFjayA9IG5ldyBTUEFDRS5UcmFjayhkYXRhKVxuICAgICAgICBIRUxQRVJTLnRyaWdnZXIoSlVLRUJPWC5UUkFDS19PTl9BREQsIHsgdHJhY2s6IHRyYWNrIH0pXG4gICAgKVxuXG4gIF9jYWxjUGVuZGluZzogKHBvc2l0aW9uKS0+XG4gICAgZHVyYXRpb24gPSAwXG4gICAgZm9yIHRyYWNrLCBpIGluIEBwbGF5bGlzdFxuICAgICAgZHVyYXRpb24gKz0gdHJhY2suZGF0YS5kdXJhdGlvblxuICAgICAgYnJlYWsgaWYgaSA9PSBwb3NpdGlvblxuICAgIHJldHVybiBkdXJhdGlvblxuXG4gIHVwZGF0ZTogKGRlbHRhKS0+XG4gICAgZm9yIHRyYWNrLCBpIGluIEBwbGF5bGlzdFxuICAgICAgdHJhY2sudXBkYXRlKGRlbHRhKVxuXG4gICAgaWYgQHBsYXlsaXN0Lmxlbmd0aCA+IDBcbiAgICAgIEBuZXh0KCkgaWYgQGN1cnJlbnQgPT0gbnVsbFxuXG4gIG5leHQ6ICh0cmFjayktPlxuICAgIEBfb25maW5pc2goKSBpZiBAY3VycmVudFxuICAgIEBjdXJyZW50ID0gQHBsYXlsaXN0LnNoaWZ0KClcbiAgICBAY3VycmVudC5zcGFjZXNoaXAucGFyZW50LnJlbW92ZUNoaWxkKEBjdXJyZW50LnNwYWNlc2hpcClcblxuICAgIEBTQy5zdHJlYW1Tb3VuZChAY3VycmVudC5kYXRhLCBAX3N0YXJ0aW5nLCB7XG4gICAgICBvbnBsYXkgICAgICAgOiBAX29ucGxheVxuICAgICAgb25maW5pc2ggICAgIDogQF9vbmZpbmlzaFxuICAgICAgb25zdG9wICAgICAgIDogQF9vbnN0b3BcbiAgICAgIHdoaWxlcGxheWluZyA6IEB3aGlsZXBsYXlpbmdcbiAgICB9KVxuXG4gIF9zdGFydGluZzogKHNvdW5kKT0+XG4gICAgQGN1cnJlbnQuc291bmQgPSBzb3VuZFxuICAgICMgY29uc29sZS5sb2cgQGN1cnJlbnQuZGF0YS5kdXJhdGlvbiwgQHBsYXlsaXN0WzBdLnBlbmRpbmdEdXJhdGlvblxuICAgICMgY29uc29sZS5sb2cgc291bmQsIEBwbGF5bGlzdFswXS5wZW5kaW5nRHVyYXRpb25cblxuICBfb25wbGF5OiA9PlxuICAgIGNvbnNvbGUubG9nICdOZXh0OiAnICsgQGN1cnJlbnQuZGF0YS50aXRsZVxuICAgIEhFTFBFUlMudHJpZ2dlcihKVUtFQk9YLklTX1BMQVlJTkcpXG5cbiAgX29uZmluaXNoOiA9PlxuICAgIGNvbnNvbGUubG9nICdvbnN0b3AnXG4gICAgQGN1cnJlbnQuc291bmQuc3RvcCgpXG4gICAgQGN1cnJlbnQuc291bmQuZGVzdHJ1Y3QoKVxuICAgIEBjdXJyZW50ID0gbnVsbFxuICAgIEBlcS5tdXRlKClcbiAgICBIRUxQRVJTLnRyaWdnZXIoSlVLRUJPWC5JU19TVE9QUEVEKVxuIl19