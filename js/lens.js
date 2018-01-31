/**::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@license DigitalGizmo Magic Lens, Copyright DigitalGizmo, 2018. All rights reserved. You may
use this file on private and public websites, for personal and commercial purposes, with or without modifications, so long as this
notice is included. Redistribution via other means is not permitted without prior permission.  www.digitalgizmo.com.
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/

/* Example usage in HTML:
<div id="lens-container"><!-- will be filled by lens-d3.js --></div> 

<script src="js/lens-d3.js" type="text/javascript"></script>
<script type="text/javascript">
  L.showLens("lens-container", "images/indenture-lens-image.jpg", "images/indenture-lens-text.jpg",
    900, 1400, "lensW=400&lensH=100&startX=400&startY=100");
</script>
*/

// Function called with params from HTML
function showLens (containerID, baseImagePath, revealedImagePath, width, height, optionalParams) { 
    var lensW = 300, lensH = 200;
    var startX = 50, startY = 25; 

    // Process optional parameters.
    if (typeof optionalParams !== 'undefined') {
        if (typeof optionalParams === 'string') {
            parameters = parseParameters(optionalParams);
            // console.log(' --- parameters - startX: ' + parameters["startX"]);
            if ( typeof(parameters["lensW"]) !== 'undefined'){ 
                // console.log(' --- lensW not undefined (aka defined): ' + parameters["lensW"]);
                lensW = parameters["lensW"]; 
            }
            if (typeof(parameters["lensH"]) !== 'undefined'){ lensH = parameters["lensH"]; }
            if (typeof(parameters["startX"]) !== 'undefined'){ startX = parameters["startX"]; }
            if (typeof(parameters["startY"]) !== 'undefined'){ startY = parameters["startY"]; }
        }
    }

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
    // adding padding bottom here, dynamically, is critical
    var lensSvg = d3.select("#" + containerID)
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
        .attr("xlink:href", baseImagePath)
        .attr("width", width)
        .attr("height", height)
        ;

    // append background image to existing g
    // d3.select("svg g").append("svg:image")
    lensSvg.append("svg:image")
        .attr("id", "lens-image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("xlink:href", revealedImagePath)
        .attr("width", width)
        .attr("height", height)
        ;

    // add border 
    // d3.select("svg g").append("svg:rect")
    lensSvg.append("svg:rect")
        .attr("id", "lens-border")
        .attr('x', startX)
        .attr('y', startY)
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
        .attr('x', startX)
        .attr('y', startY)
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
    
} // end showLens

function parseParameters(params) { 
    var parsedParams = [];
    if (typeof params === 'object') {
        parsedParams = params;
    } else if (typeof params === 'string') {
        var splitParams = params.split('&');
        for (var i = 0, j = splitParams.length; i < j; i++) {
            var nameValuePair = splitParams[i];
            // console.log(' --- in parseParameters, nameValuePair ' + splitParams[i]);
            var sep = nameValuePair.indexOf('=');
            if (sep > 0) {
                var pName = nameValuePair.substring(0, sep)
                var pValue = nameValuePair.substring(sep + 1)
                parsedParams[pName] = pValue;
            }
        }
    }
    return parsedParams;
}
