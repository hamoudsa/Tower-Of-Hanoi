$(document).ready(function() {

  console.log('jQ connected');
  draggable($('.ring'));
  droppable($('.move'));
  steps = 0;

  var steps;

  function canBeDragged(from, discId) {
    return $(from).children()[0].id == discId; }

  function canAppend(target, discId) {
    children = $(target).children();
    return children.length == 0 || parseInt(children[0].id) >= parseInt(discId); }

  function cancel(event) {
    event.preventDefault();
    return false; 
  }

  function draggable(element) {
    $(element)
    .attr('draggable', 'true')
    .bind('dragend', cancel)
    .bind('dragstart', function(event) {
      if (canBeDragged($(event.target).parent(), event.target.id))
        event.originalEvent.dataTransfer.setData("Text", event.target.id);
      return true; })
  }

  function droppable(element) {
    $(element)
    .bind('dragover', cancel)
    .bind('drop', function(event) {
      target = $(event.target);
      if (target.attr("class") != "move") 
      target = $(target.parents(".move"));
      event.preventDefault();
      var discId = event.originalEvent.dataTransfer.getData("Text");
      if (discId && canAppend(target.find(".box"), discId)) {
        $("#count").text(++steps);
        disc = $("#"+discId);
        disc.remove();
        target.find(".box").prepend(disc);
        draggable(disc);
        $("#message").text("");
      } else
        $("#message").text("Please Study for Hanoi Tower again.");
        done(target.find(".box"))
        return false;
    });
  }

  function done(target) {
    if ($(target).children().length == 5 && $(target).parent().attr("id") != "drop1"){
      $("#count").text("");
      $("#steps").text("");
      $("#message").text("Finished ! in " + steps + " steps");
    }
  }

});