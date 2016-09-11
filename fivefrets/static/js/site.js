$(document).ready(function(){
  var paper = new Raphael("logo", 120, 55);
  var frets = paper.set();
  frets.push(
    paper.rect(10, 10, 100, 25, 2),
    paper.path("M10 15L110 15"),
    paper.path("M10 20L110 20"),
    paper.path("M10 25L110 25"),
    paper.path("M10 30L110 30"),paper.path("M27.82 10L27.82 35"),
    paper.path("M46.57 10L46.57 35"),
    paper.path("M66.57 10L66.57 35"),
    paper.path("M87.66 10L87.66 35"),
    paper.circle(56.57, 22.5, 0.75),
    paper.circle(18.91, 22.5, 0.75)
  );
  frets.attr({
    stroke: "#ffffff"
  });
  var brand = paper.text(60, 45, "f i v e f r e t s")
  brand.attr({
    stroke: "#ffffff",
    'stroke-width': 0.5,
    'fill': '#ffffff',
    'stroke-opacity': 0,
    'font-size': 16
  });
})
