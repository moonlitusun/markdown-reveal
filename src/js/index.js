// hljs
hljs.initHighlightingOnLoad();

$(function () {
  var
    isOpenSidebar = true;
  
  var
    bodyDom = $('body'),
    sidebarDom = $('#sidebar');

  // jstree
  $('#sidebar').on('changed.jstree', function (e, data) {
    location.hash = `#mk-${data.selected}`;
  });

  // mediumZoom
  mediumZoom(document.querySelectorAll('img'));
})