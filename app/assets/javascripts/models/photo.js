(function(root){
  var Project = root.Project = (root.Project || {});

  var Photo = Project.Photo = function(attrs){
    this.attributes = (attrs || {});
  }

  _.extend(Photo, {
    all: [],
    _events: {},

    fetchByUserId: function(userId, callback) {
      callback = callback || function(res){console.log(res)};
      that = this;
      $.ajax({
        type: 'get',
        url: '/api/users/' + userId + '/photos',
        success: function(res) {
          res = _(res).map(function(el){
            return new Photo(el);
          })
          that.all = res;
          callback(res);
        }
      })
    },
    on: function(eventName, callback){
      var cbArr = this._events[eventName] = (this._events[eventName] || []);
      cbArr.push(callback);
    },

    trigger: function(eventName){
      _(this._events[eventName]).each(function(callback){
        callback();
      })
    }
  })

  _.extend(Photo.prototype, {
    get: function(attr_name){
      return this.attributes[attr_name];
    },

    set: function(attr_name, val){
      this.attributes[attr_name] = val;
    },

    create: function(){
      var photo = this;

      if(this.get('id')){
        return false;
      }

      $.ajax({
        data: { photo: photo.attributes },
        url: '/api/photos',
        type: 'post',
        success: function(res){
          _.extend(photo.attributes, res);
          Photo.all.push(photo);
          Photo.trigger('add');
        }
      })
    },

    save: function(){
      var photo = this;

      if(this.get('id')) {
        $.ajax({
          data: { photo: photo.attributes },
          url: '/api/photos/' + photo.attributes['id'],
          type: 'put',
          success: function(res){
            _.extend(photo.attributes, res);
          }
        })
      } else {
        this.create()
      }
    }
  });
})(this);