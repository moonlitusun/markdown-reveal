// hljs
hljs.initHighlightingOnLoad();

$(function () {
  var
    isOpenSidebar = true;
  
  var
    bodyDom = $('body'),
    sidebarDom = $('#sidebar');

  // jstree
  $('#sidebar').on("changed.jstree", function (e, data) {
    var _id = "#" + "tree" + data.selected;
    location.hash = _id;
  });

  // mediumZoom
  mediumZoom(document.querySelectorAll('img'));

  $('#toggleSidebar').click(function() {
    const width = isOpenSidebar ? 0 : '300px';

    bodyDom.animate({ 'paddingLeft': width }, 500);

    sidebarDom.animate({ 'width': width }, 500);

    isOpenSidebar = !isOpenSidebar;
  })
})