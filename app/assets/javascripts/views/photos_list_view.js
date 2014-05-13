(function(root){
  var Project = root.Project = (root.Project || {});

  var PhotosListView = Project.PhotosListView = function() {
    this.$el = $('<div></div>');
    Project.Photo.on('add', this.render.bind(this, Project.Photo.all));
  };

  _.extend(PhotosListView.prototype, {
    render: function(photos) {
      this.$el.html('');
      var $list = $('<ul></ul>');
      _(photos).each(function(photo){
        $list.append('<li>' + photo.get('title') + '</li>');
      })
      this.$el.html($list);
      return this;
    }
  })
})(this);