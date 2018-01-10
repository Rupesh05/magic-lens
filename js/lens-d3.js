// magic lens JS

(function () {
    // Declare global-to-page object to contain global-to-viewer elements.
    var global = (function () { return this; } ).call();
    global.L = {};
})();

L.showLens = function (containerID, imagePath, lensW, lensH) {
    // // Ensure needed browser functions exist.
    // Z.Utils.addCrossBrowserPrototypes();
    // Z.Utils.addCrossBrowserMethods();
    // Z.Utils.addCrossBrowserEvents();

    // Declare all global variables in one global object and get web page parameters.
    // Z.Utils.declareGlobals();
    // Z.pageContainerID = containerID;
    L.lensW = lensW;
    L.lensH = lensH;

    // console.log(" --- lensW: " + L.lensW)

    // Z.imagePath = Z.Utils.removeExtraSlashCharacters(imagePath);
    // Z.parameters = Z.Utils.parseParameters(optionalParams);

    // // Initialize on content load rather than full page load if supported by browser.
    // Z.Utils.addEventListener(document, "DOMContentLoaded", Z.initialize);
    // Z.Utils.addEventListener(window, "load", Z.initialize);





    // var lw = lensW; //300; // lens width
    // var lh = lensH; // 200;
    var lsx = 160; // lens start x
    var lsy = 25; 


    // drag border and clip with it
    var drag = d3.drag()
        .on("drag", function() {
            var clippy = d3.select('#clip rect');
            clippy.attr('x', +clippy.attr('x') + d3.event.dx);
            clippy.attr('y', +clippy.attr('y') + d3.event.dy);
            var border = d3.select('#lens-border');
            border.attr('x', +border.attr('x') + d3.event.dx);
            border.attr('y', +border.attr('y') + d3.event.dy);
        });

    /*
    // build out svg - superceeded by hard-coded element in html  
    var svg = d3.select("svg")
        .attr("width", w + 2*margin)
        .attr("height", h + 2*margin)
        .append('g')
        .attr('transform', 'translate('+margin+','+margin+')');
    */

    // add border - before lens? hmm, may not matter
    d3.select("svg g").append("svg:rect")
        .attr("id", "lens-border")
        .attr('x', lsx)
        .attr('y', lsy)
        .attr('width', L.lensW)
        .attr('height', L.lensH)
        .attr('rx', 15)
        .attr('ry', 15)
        .style("fill-opacity", 0)
        .style("stroke", "#7d7664")
        .style("stroke-width", 1)
        .style('cursor', 'move')
        .call(drag);
        ;


    // add lens clip
    var clip = d3.select("svg g").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr('x', lsx)
        .attr('y', lsy)
        .attr('rx', 15)
        .attr('ry', 15)
        .attr('width', L.lensW)
        .attr('height', L.lensH)
        ;

    /*
    // test adding sizer
    //var clip = d3.select("svg g").append("svg:clipSizer")
    d3.select("svg g").append("svg:clipSizer")
        .attr("id", "sizer")
        .append("svg:rect")
        .attr('x', 540)
        .attr('y', 180)
        .attr('width', 20)
        .attr('height', 20)
        .style("fill", "orange")
        .style("stroke", "black")
        ;
    */


    /*
    // background rect -- superceeded by actual image
    svg.append('svg:rect')
        .attr('width', w)
        .attr('height', h)
        .attr("clip-path", function(d,i) { return "url(#clip)"; })
        .style("fill", d3.rgb(0, 230, 0))
        .style("stroke", d3.rgb(0, 0, 0))
        .call(drag);

        // adding
        .attr("id", "doc-image")
    */


    // add lens and drag to foreground image
    d3.select("#lens-image")
        .attr("clip-path", function(d,i) { return "url(#clip)"; })
        // drag now needs to be on border object since that's in the foreground
        //.call(drag);



    
};

