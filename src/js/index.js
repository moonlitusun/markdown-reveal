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

  $('#toggleSidebar').click(function() {
    const width = isOpenSidebar ? 0 : '300px';

    bodyDom.animate({ 'paddingLeft': width }, 500);

    sidebarDom.animate({ 'width': width }, 500);

    isOpenSidebar = !isOpenSidebar;
  })
})