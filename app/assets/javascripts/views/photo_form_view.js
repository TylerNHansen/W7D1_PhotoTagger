(function(root){
  var Project = root.Project = (root.Project || {});

  var PhotoForm = Project.PhotoForm = function() {
    this.$el = $('<div></div>');
    this.template = JST['photo_form'];
    this.$el.on('submit', '#photo-form', this.submit.bind(this));
  };

  _.extend(PhotoForm.prototype, {
    render: function() {
      var renderedForm = this.template();
      this.$el.append(renderedForm);
      return this;
    },

    submit: function(event) {
      event.preventDefault();
      var $form = $(event.target);
      var obj = $form.serializeJSON();
      var photo = new Project.Photo(obj.photo);
      photo.save();
    }
  })

})(this);