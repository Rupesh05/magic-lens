// magic lens JS

// (function () {
//     // Declare global-to-page object to contain global-to-viewer elements.
//     var global = (function () { return this; } ).call();
//     global.L = {};
// })();

// L.showLens = function (containerID, imagePath, lensW = 300, lensH = 200) {
    // // Ensure needed browser functions exist.
    // Z.Utils.addCrossBrowserPrototypes();
    // Z.Utils.addCrossBrowserMethods();
    // Z.Utils.addCrossBrowserEvents();

    // Declare all global variables in one global object and get web page parameters.
    // Z.Utils.declareGlobals();
    // Z.pageContainerID = containerID;

    // L.lensW = lensW;
    // L.lensH = lensH;

    // console.log(" --- lensW: " + L.lensW)

    // Z.imagePath = Z.Utils.removeExtraSlashCharacters(imagePath);
    // Z.parameters = Z.Utils.parseParameters(optionalParams);

    // // Initialize on content load rather than full page load if supported by browser.
    // Z.Utils.addEventListener(document, "DOMContentLoaded", Z.initialize);
    // Z.Utils.addEventListener(window, "load", Z.initialize);

    var lensW = 300;
    var lensH = 200;


    // var lw = lensW; //300; // lens width
    // var lh = lensH; // 200;
    var lsx = 160; // lens start x
    var lsy = 25; 


    var width = 900,
        height = 1400;

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

    // add padding to container and append svg
    var lensSvg = d3.select("#lens-container")
            .attr(
                "style",
                "padding-bottom: " + Math.ceil(height * 100 / width) + "%"
            )
            .append("svg")
            .attr("viewBox", "0 0 " + width + " " + height);


    // append g and foreground image
    // lensSvg.append("svg:g")
    lensSvg
        // .attr("transform","translate(50,50)")
        .append("svg:image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("xlink:href", "images/indenture-lens-image.jpg")
        .attr("width", "900")
        .attr("height", "1400")
        ;

    // append background image to existing g
    // d3.select("svg g").append("svg:image")
    lensSvg.append("svg:image")
        .attr("id", "lens-image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("xlink:href", "images/indenture-lens-text.jpg")
        .attr("width", "900")
        .attr("height", "1400")
        ;

    // add border 
    // d3.select("svg g").append("svg:rect")
    lensSvg.append("svg:rect")
        .attr("id", "lens-border")
        .attr('x', lsx)
        .attr('y', lsy)
        // .attr('width', L.lensW)
        // .attr('height', L.lensH)
        .attr('width', lensW)
        .attr('height', lensH)
        .attr('rx', 15)
        .attr('ry', 15)
        .style("fill-opacity", 0)
        .style("stroke", "#7d7664")
        .style("stroke-width", 1)
        .style('cursor', 'move')
        .call(drag);
        ;

    // add lens clip
    // var clip = d3.select("svg g").append("svg:clipPath")
    lensSvg.append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr('x', lsx)
        .attr('y', lsy)
        .attr('rx', 15)
        .attr('ry', 15)
        // .attr('width', L.lensW)
        // .attr('height', L.lensH)
        .attr('width', lensW)
        .attr('height', lensH)
        ;

    // add lens and drag to foreground image
    d3.select("#lens-image")
        .attr("clip-path", function(d,i) { return "url(#clip)"; });

    
// };

