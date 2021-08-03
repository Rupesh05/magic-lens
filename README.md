https://rupesh05.github.io/magic-lens/

# Magic Lens Documentation

Start by looking at and the copying the examples.
[Magic Lens - Example 1](example1.html)
[Magic Lens - Example 2](example2.html)

- In the header of your HTML you'll need to call the lens css and the D3 JavaScript library:

```
    <link rel="stylesheet" href="css/lens.css" type="text/css"/>
    <script src="https://d3js.org/d3.v4.min.js"></script>
```

- In the body of your HTML you need an empty div to contain the lens
- and you need to call the script using parameters

```
    <div id="lens-container">
      <!-- Required - will be filled by lens-d3.js -->
    </div> 
    <script src="js/lens-d3.js" type="text/javascript"></script>
    <script type="text/javascript">
      showLens("lens-container", "images/indenture-lens-image.jpg", "images/indenture-lens-text.jpg",
        900, 1400, "startX=160&startY=30");
    </script>

```

## Parameters
Format:
```
showLens( container, baseImagePath, revealedImagePath
   imageWidth, imageHeight, optionalParameters)
```

Parameters that are strings (not numbers) are enclosed in quotes (single or double)
Optional parameters, as a group, enclosed in quotes/

Required
- container - name matches empty div (e.g. "lens-container")
- baseImagePath (e.g. "images/indenture-lens-image.jpg")
- revealedImagePath (e.g. "images/indenture-lens-text.jpg")
- imageWidth (e.g.900)
- imageHeight (e.g.1400)
Optional (separated by &, no spaces)
- startX and startY - the coordinates of upper left corner of the lens, the default is 50, 50
- lensW and lensH - width and height of the lens if you'd like to change it. The default is 300 x 200

## Contents of this package:
- index.html -- documentation and links to examples
- example1.html -- Indenture document
- example2.html 
- README.md - copy of this document
- js/lens.js -- the code
- js/d3.min.js - an alternate local copy of D3 that can be used for testing if offline.
- css/lens.css -- a few required styles
