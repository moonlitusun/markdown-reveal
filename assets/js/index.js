hljs.initHighlightingOnLoad(),$(function(){var i=!0,n=$("body"),t=$("#sidebar");$("#sidebar").on("changed.jstree",function(e,i){var n="#tree"+i.selected;location.hash=n}),mediumZoom(document.querySelectorAll("img")),$("#toggleSidebar").click(function(){var e=i?0:"300px";n.animate({paddingLeft:e},500),t.animate({width:e},500),i=!i})});