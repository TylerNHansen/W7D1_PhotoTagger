(function(root){
  var Project = root.Project = (root.Project || {});

  var Photo = Project.Photo = function(attrs){
    this.attributes = (attrs || {});

  }

  _.extend(Photo, {
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


    all: []
  })

  _.extend(Photo.prototype, {
    get: function(attr_name){
      return this.attributes[attr_name];
    },

    set: function(attr_name, val){
      this.attributes[attr_name] = val;
    },

    create: function(callback){
      var photo = this;

      if(this.get('id')){
        return false;
      }

      callback = callback || function(){console.log("test")};

      $.ajax({
        data: { photo: photo.attributes },
        url: '/api/photos',
        type: 'post',
        success: function(res){
          _.extend(photo.attributes, res);
          Photo.all.push(photo);
          callback();
        }
      })
    },

    save: function(callback){
      var photo = this;

      callback = callback || function(){console.log("test")};

      if(this.get('id')) {
        $.ajax({
          data: { photo: photo.attributes },
          url: '/api/photos/' + photo.attributes['id'],
          type: 'put',
          success: function(res){
            _.extend(photo.attributes, res);
            callback();
          }
        })
      } else {
        this.create(callback)
      }
    }
  });
})(this);