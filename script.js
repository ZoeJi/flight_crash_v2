d3.csv("data/trends.csv", function(error, data) {

  // var	parseDate = d3.time.format("%Y-%m").parse;
  var	parseDate = d3.time.format("%Y-%b").parse;
  var timeFormat = d3.time.format("%Y %b");

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.date = timeFormat(d.date);
    d.crash = +d.crash;
    d.fat1 = +d.fat1;
    d.fat2 = +d.fat2;
    d.fat3 = +d.fat3;
    d.fat4 = +d.fat4;
    d.fat5 = +d.fat5;
    d.cause1 = +d.cause1;
    d.cause2 = +d.cause2;
    d.cause3 = +d.cause3;
    d.cause4 = +d.cause4;
    d.cause5 = +d.cause5;
  });

  var colorscale = 11;
  var padding = {top: 100, right: 20, bottom: 0, left: 20},
      w = 8000 - padding.left - padding.right,
      h = 130 - padding.top - padding.bottom;

  var xScale = d3.scale.ordinal()
  		.domain(data.map(function(d) { return d.date; }))
  		.rangeRoundBands([0, w], .01);  // increase current value .05 to increase space between bars. be careful, doing so will make the bars thinner so you'll also have to adjust the h as well.

  		// FYI: RangeBands or RangeRoundBands is a d3 feature that makes all bars even in width based on the chart's overall dimensions. The difference between the two is that one accounts for paddings/margins and the other doesn't.

  var yScale = d3.scale.linear()
  		.domain([0, d3.max(data, function(d) { return d.crash; })])
  		.range([h, 0]);

  var yScale1 = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.fat1; })])
      .range([0,0]);

  var rScale = d3.scale.linear()
      .domain([0, d3.max(data, function(d) {return d.fat1; })])
      .range([0, 100]);

  var svg = d3.select("#chart")
  	.append("svg")
      .attr("width", w + padding.left + padding.right)
      .attr("height", h + padding.top + padding.bottom)
      .append("g")
      .attr("transform",
            "translate(" + padding.left + "," + padding.top + ")");

    var tooltip = d3.select("#chart")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

    var circleTooltip = d3.select("#chart")
                    .append("div")
                    .attr("class", "circleTooltip")
                    .style("opacity", 0);

    var textTooltip = d3.select("#chart")
                        .append("div")
                        .attr("class", "textTooltip")
                        .style("opacity", 0);

  svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("y", 0) // to make bars align to the right, replace this line with ".attr("x", 0)"
      .attr("width", xScale.rangeBand())
      .attr("x", function(d) { return xScale(d.date); })
      .attr("height", 20) // change current value "15" to change height of square. to increase height, you will need to adjust "w" above (currently set to 1280)
      .attr("fill", function(d) {
				return "rgb("+ ( 255 - d.crash ) + ","+ ( 255 - d.crash ) + "," + ( 255 - d.crash ) + ")";
  		})
      .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
  			this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
        tooltip.transition() // enables the tooltip to animate into the page
               .duration(200) // duration of the transition animation in milliseconds
               .style("opacity", 1); // end state of animation -- begin state can be found in line 82

    		tooltip.html(d.date) // text inside the tooltip
    		       .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
               .style("top", "0px"); // vertical position of text

      })
  		.on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
      		tooltip.transition()
                 .duration(3000)
                 .style("opacity", 0);
  		});

    var padding2 = {top: 100, right: 20, bottom: 20, left: 46},
        w2 = 8000 - padding2.left - padding2.right,
        h2 = 200 - padding2.top - padding2.bottom;

    var svg_dots1 = d3.select("#chart")
                     .append("svg")
                     .attr("width", w2 + padding2.left + padding2.right)
                     .attr("height", h2 + padding2.top + padding2.bottom)
                     .append("g")
                     .attr("transform",
                           "translate(" + padding2.left + "," + padding2.top + ")");

    var padding3 = {top: 60, right: 20, bottom: 20, left: 46},
        w3 = 8000 - padding3.left - padding3.right,
        h3 = 125 - padding3.top - padding3.bottom;

    var svg_dots2 = d3.select("#chart")
                    .append("svg")
                    .attr("width", w3 + padding3.left + padding3.right)
                    .attr("height", h3 + padding3.top + padding3.bottom)
                    .append("g")
                    .attr("transform",
                          "translate(" + padding3.left + "," + padding3.top + ")");

    var padding4 = {top: 60, right: 20, bottom: 20, left: 46},
        w4 = 8000 - padding4.left - padding4.right,
        h4 = 125 - padding4.top - padding4.bottom;

    var svg_dots3 = d3.select("#chart")
                    .append("svg")
                    .attr("width", w4 + padding4.left + padding4.right)
                    .attr("height", h4 + padding4.top + padding4.bottom)
                    .append("g")
                    .attr("transform",
                          "translate(" + padding4.left + "," + padding4.top + ")");

    var padding5 = {top: 15, right: 20, bottom: 0, left: 46},
        w5 = 8000 - padding5.left - padding5.right,
        h5 = 30 - padding5.top - padding5.bottom;

    var svg_dots4 = d3.select("#chart")
                    .append("svg")
                    .attr("width", w5 + padding5.left + padding5.right)
                    .attr("height", h5 + padding5.top + padding5.bottom)
                    .append("g")
                    .attr("transform",
                          "translate(" + padding5.left + "," + padding5.top + ")");
    var svg_dots5 = d3.select("#chart")
                    .append("svg")
                    .attr("width", w5 + padding5.left + padding5.right)
                    .attr("height", h5 + padding5.top + padding5.bottom)
                    .append("g")
                    .attr("transform",
                          "translate(" + padding5.left + "," + padding5.top + ")");

    var human_error = "#119163";
    var weather = "#2075B9";
    var mechanical = "#E9B82B";
    var unknown = "#343946";
    var criminal = "#942424";

    svg_dots1.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        			.data(data)
        			.enter()
        			.append("circle")
        			.filter(function(d){
                return d.cause1 == 1
              })
              .attr("class","fat1")
              .style("opacity", 0.7)
              .attr("fill", function(d) {
        				return unknown;
        		  })
        			.attr("cx", function(d) {
        				return xScale(d.date);
        			})
        			.attr("cy", function(d) {
        				return yScale1(d.fat1);
        			})
        			.attr("r", function(d) {
        				return rScale(d.fat1);
        			})
              .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          			this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
                circleTooltip.transition() // enables the tooltip to animate into the page
                       .duration(200) // duration of the transition animation in milliseconds
                       .style("opacity", 1); // end state of animation -- begin state can be found in line 82
                textTooltip.transition()
                           .duration(200)
                           .style("opacity", 1);
            		circleTooltip.html(d.fat1) // text inside the tooltip
            		       .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                       .style("top", "160px"); // vertical position of text
                textTooltip.html("people died")
                           .style("left", xScale(d.date) + 52 + "px")
                           .style("top", "250px");
                d3.select(this).style("opacity", "1");
                d3.select("#unknown").style("opacity", "1");
                tooltip.transition() // enables the tooltip to animate into the page
                       .duration(200) // duration of the transition animation in milliseconds
                       .style("opacity", 1); // end state of animation -- begin state can be found in line 82

            		tooltip.html(d.date) // text inside the tooltip
            		       .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                       .style("top", "0px"); // vertical position of text
              })
          		.on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
              		circleTooltip.transition()
                         .duration(500)
                         .style("opacity", 0);
                  textTooltip.transition()
                         .duration(500)
                         .style("opacity", 0);
                  d3.select(this).style("opacity", "0.7");
                  tooltip.transition()
                         .duration(3000)
                         .style("opacity", 0);
          		});

    svg_dots1.selectAll("dots_c")
             .data(data)
             .enter()
             .append("circle")
             .filter(function(d) { // filter function
        				return d.cause1 == 2 // open candidates.csv and look at column "c_select". Only values with "1" gets selected to appear on chart.
        			})
              .style("opacity", 0.7)
              .attr("fill", function(d){
                return mechanical;
              })
             .attr("cx", function(d) {
       				return xScale(d.date);
       			})
       			.attr("cy", function(d) {
       				return yScale1(d.fat1);
       			})
            .attr("class","fat1")
           .attr("r", function(d) {
     				return rScale(d.fat1);
     			})
          .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
            this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
            circleTooltip.transition() // enables the tooltip to animate into the page
                   .duration(200) // duration of the transition animation in milliseconds
                   .style("opacity", 1); // end state of animation -- begin state can be found in line 82
            textTooltip.transition()
                       .duration(200)
                       .style("opacity", 1);
            circleTooltip.html(d.fat1) // text inside the tooltip
                   .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                   .style("top", "160px"); // vertical position of text
            textTooltip.html("people died")
                       .style("left", xScale(d.date) + 52 + "px")
                       .style("top", "250px");
            d3.select(this).style("opacity", "1");
            d3.select("#mechanical").style("opacity", "1");
            tooltip.transition() // enables the tooltip to animate into the page
                   .duration(200) // duration of the transition animation in milliseconds
                   .style("opacity", 1); // end state of animation -- begin state can be found in line 82

            tooltip.html(d.date) // text inside the tooltip
                   .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                   .style("top", "0px"); // vertical position of text
          })
          .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
              circleTooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
              textTooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
              d3.select(this).style("opacity", "0.7");
              tooltip.transition()
                     .duration(3000)
                     .style("opacity", 0);
          });

// criminal
    svg_dots1.selectAll("dots_c")
             .data(data)
             .enter()
             .append("circle")
             .filter(function(d) { // filter function
        				return d.cause1 == 3 // open candidates.csv and look at column "c_select". Only values with "1" gets selected to appear on chart.
        			})
              .style("opacity", 0.7)
              .attr("fill", function(d){
                return criminal;
              })
             .attr("cx", function(d) {
       				return xScale(d.date);
       			})
       			.attr("cy", function(d) {
       				return yScale1(d.fat1);
       			})
            .attr("class","fat1")
           .attr("r", function(d) {
     				return rScale(d.fat1);
     			})
          .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
            this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
            circleTooltip.transition() // enables the tooltip to animate into the page
                   .duration(200) // duration of the transition animation in milliseconds
                   .style("opacity", 1); // end state of animation -- begin state can be found in line 82
            textTooltip.transition()
                       .duration(200)
                       .style("opacity", 1);
            circleTooltip.html(d.fat1) // text inside the tooltip
                   .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                   .style("top", "160px"); // vertical position of text
            textTooltip.html("people died")
                       .style("left", xScale(d.date) + 52 + "px")
                       .style("top", "250px");
            d3.select(this).style("opacity", "1");
            d3.select("#criminal").style("opacity", "1");
            tooltip.transition() // enables the tooltip to animate into the page
                   .duration(200) // duration of the transition animation in milliseconds
                   .style("opacity", 1); // end state of animation -- begin state can be found in line 82

            tooltip.html(d.date) // text inside the tooltip
                   .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                   .style("top", "0px"); // vertical position of text
          })
          .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
              circleTooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
              textTooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
              d3.select(this).style("opacity", "0.7");
              tooltip.transition()
                     .duration(3000)
                     .style("opacity", 0);
          });

// weather
    svg_dots1.selectAll("dots_c")
             .data(data)
             .enter()
             .append("circle")
             .filter(function(d) { // filter function
        				return d.cause1 == 4 // open candidates.csv and look at column "c_select". Only values with "1" gets selected to appear on chart.
        			})
              .style("opacity", 0.7)
              .attr("fill", function(d){
                return weather;
              })
             .attr("cx", function(d) {
       				return xScale(d.date);
       			})
       			.attr("cy", function(d) {
       				return yScale1(d.fat1);
       			})
            .attr("class","fat1")
           .attr("r", function(d) {
     				return rScale(d.fat1);
     			})
          .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
            this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
            circleTooltip.transition() // enables the tooltip to animate into the page
                   .duration(200) // duration of the transition animation in milliseconds
                   .style("opacity", 1); // end state of animation -- begin state can be found in line 82
            textTooltip.transition()
                       .duration(200)
                       .style("opacity", 1);
            circleTooltip.html(d.fat1) // text inside the tooltip
                   .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                   .style("top", "160px"); // vertical position of text
            textTooltip.html("people died")
                       .style("left", xScale(d.date) + 52 + "px")
                       .style("top", "250px");
            d3.select(this).style("opacity", "1");
            d3.select("#weather").style("opacity", "1");
            tooltip.transition() // enables the tooltip to animate into the page
                   .duration(200) // duration of the transition animation in milliseconds
                   .style("opacity", 1); // end state of animation -- begin state can be found in line 82

            tooltip.html(d.date) // text inside the tooltip
                   .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                   .style("top", "0px"); // vertical position of text
          })
          .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
              circleTooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
              textTooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
              d3.select(this).style("opacity", "0.7");
              tooltip.transition()
                     .duration(3000)
                     .style("opacity", 0);
          });

    svg_dots1.selectAll("dots_c")
             .data(data)
             .enter()
             .append("circle")
             .filter(function(d) { // filter function
        				return d.cause1 == 5 // open candidates.csv and look at column "c_select". Only values with "1" gets selected to appear on chart.
        			})
              .style("opacity", 0.7)
              .attr("fill", function(d){
                return human_error;
              })
             .attr("cx", function(d) {
       				return xScale(d.date);
       			})
       			.attr("cy", function(d) {
       				return yScale1(d.fat1);
       			})
            .attr("class","fat1")
           .attr("r", function(d) {
     				return rScale(d.fat1);
     			})
          .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
            this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
            circleTooltip.transition() // enables the tooltip to animate into the page
                   .duration(200) // duration of the transition animation in milliseconds
                   .style("opacity", 1); // end state of animation -- begin state can be found in line 82
            textTooltip.transition()
                       .duration(200)
                       .style("opacity", 1);
            circleTooltip.html(d.fat1) // text inside the tooltip
                   .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                   .style("top", "160px"); // vertical position of text
            textTooltip.html("people died")
                       .style("left", xScale(d.date) + 52 + "px")
                       .style("top", "250px");
            d3.select(this).style("opacity", "1");
            d3.select("#human").style("opacity", "1");
            tooltip.transition() // enables the tooltip to animate into the page
                   .duration(200) // duration of the transition animation in milliseconds
                   .style("opacity", 1); // end state of animation -- begin state can be found in line 82

            tooltip.html(d.date) // text inside the tooltip
                   .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                   .style("top", "0px"); // vertical position of text
          })
          .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
              circleTooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
              textTooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
              d3.select(this).style("opacity", "0.7");
              tooltip.transition()
                     .duration(3000)
                     .style("opacity", 0);
          });

    svg_dots2.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause2 == 1;
        })
        .attr("class","fat2")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return unknown;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat2);
        })
        .attr("r", function(d) {
          return rScale(d.fat2);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat2) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "320px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "410px");
          d3.select(this).style("opacity", "1");
          d3.select("#unknown").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots2.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause2 == 2;
        })
        .attr("class","fat2")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return mechanical;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat2);
        })
        .attr("r", function(d) {
          return rScale(d.fat2);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat2) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "320px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "410px");
          d3.select(this).style("opacity", "1");
          d3.select("#mechanical").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "1");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots2.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause2 == 3;
        })
        .attr("class","fat2")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return criminal;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat2);
        })
        .attr("r", function(d) {
          return rScale(d.fat2);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat2) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "320px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "410px");
          d3.select(this).style("opacity", "1");
          d3.select("#criminal").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });
    svg_dots2.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause2 == 4;
        })
        .attr("class","fat2")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return weather;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat2);
        })
        .attr("r", function(d) {
          return rScale(d.fat2);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat2) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "320px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "410px");
          d3.select(this).style("opacity", "1");
          d3.select("#weather").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots2.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause2 == 5;
        })
        .attr("class","fat2")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
          return human_error;
        })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat2);
        })
        .attr("r", function(d) {
          return rScale(d.fat2);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat2) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "320px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "410px");
          d3.select(this).style("opacity", "1");
          d3.select("#human").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots3.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause3 == 1;
        })
        .attr("class","fat3")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return unknown;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat3);
        })
        .attr("r", function(d) {
          return rScale(d.fat3);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat3) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "450px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "540px");
          d3.select(this).style("opacity", "1");
          d3.select("#unknown").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots3.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause3 == 2;
        })
        .attr("class","fat3")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return mechanical;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat3);
        })
        .attr("r", function(d) {
          return rScale(d.fat3);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat3) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "450px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "540px");
          d3.select(this).style("opacity", "1");
          d3.select("#mechanical").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots3.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause3 == 3;
        })
        .attr("class","fat3")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return criminal;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat3);
        })
        .attr("r", function(d) {
          return rScale(d.fat3);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat3) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "450px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "540px");
          d3.select(this).style("opacity", "1");
          d3.select("#criminal").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots3.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause3 == 4;
        })
        .attr("class","fat3")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return weather;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat3);
        })
        .attr("r", function(d) {
          return rScale(d.fat3);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat3) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "450px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "540px");
          d3.select(this).style("opacity", "1");
          d3.select("#weather").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots3.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause3 == 5;
        })
        .attr("class","fat3")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return human_error;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat3);
        })
        .attr("r", function(d) {
          return rScale(d.fat3);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat3) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "450px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "540px");
          d3.select(this).style("opacity", "1");
          d3.select("#human").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots4.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause4 == 1;
        })
        .attr("class","fat4")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return unknown;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat4);
        })
        .attr("r", function(d) {
          return rScale(d.fat4);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat4) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "530px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "620px");
          d3.select(this).style("opacity", "1");
          d3.select("#unknown").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots4.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause4 == 2;
        })
        .attr("class","fat4")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return mechanical;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat4);
        })
        .attr("r", function(d) {
          return rScale(d.fat4);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat4) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "530px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "620px");
          d3.select(this).style("opacity", "1");
          d3.select("#mechanical").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots4.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause4 == 3;
        })
        .attr("class","fat4")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
          return criminal;
        })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat4);
        })
        .attr("r", function(d) {
          return rScale(d.fat4);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat4) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "530px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "620px");
          d3.select(this).style("opacity", "1");
          d3.select("#criminal").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots4.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause4 == 4;
        })
        .attr("class","fat4")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
          return weather;
        })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat4);
        })
        .attr("r", function(d) {
          return rScale(d.fat4);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat4) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "530px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "620px");
          d3.select(this).style("opacity", "1");
          d3.select("#weather").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots4.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause4 == 5;
        })
        .attr("class","fat4")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
          return human_error;
        })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat4);
        })
        .attr("r", function(d) {
          return rScale(d.fat4);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat4) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "530px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "620px");
          d3.select(this).style("opacity", "1");
          d3.select("#human").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots5.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause5 == 1;
        })
        .attr("class","fat5")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return unknown;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat5);
        })
        .attr("r", function(d) {
          return rScale(d.fat5);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat5) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "570px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "660px");
          d3.select(this).style("opacity", "1");
          d3.select("#unknown").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });

    svg_dots5.selectAll("dots_c") // drawing the circles -- nothing new until line 98
        .data(data)
        .enter()
        .append("circle")
        .filter(function(d){
          return d.cause5 == 4;
        })
        .attr("class","fat5")
        .style("opacity", 0.7)
        .attr("fill", function(d) {
  				return weather;
  		  })
        .attr("cx", function(d) {
          return xScale(d.date);
        })
        .attr("cy", function(d) {
          return yScale1(d.fat5);
        })
        .attr("r", function(d) {
          return rScale(d.fat5);
        })
        .on("mouseover", function(d) { // hover state events when mouse cursor enters a circle
          this.parentNode.appendChild(this); // makes sure that circle that is being selected is not behind other circles.
          circleTooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82
          textTooltip.transition()
                     .duration(200)
                     .style("opacity", 1);
          circleTooltip.html(d.fat5) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "570px"); // vertical position of text
          textTooltip.html("people died")
                     .style("left", xScale(d.date) + 52 + "px")
                     .style("top", "660px");
          d3.select(this).style("opacity", "1");
          d3.select("#weather").style("opacity", "1");
          tooltip.transition() // enables the tooltip to animate into the page
                 .duration(200) // duration of the transition animation in milliseconds
                 .style("opacity", 1); // end state of animation -- begin state can be found in line 82

          tooltip.html(d.date) // text inside the tooltip
                 .style("left", xScale(d.date) + 46 + "px") // horizontal position of text : needs some adjustment
                 .style("top", "0px"); // vertical position of text
        })
        .on("mouseout", function(d) { // hover events when mouse cursor leaves the circle
            circleTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            textTooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
            d3.select(this).style("opacity", "0.7");
            tooltip.transition()
                   .duration(3000)
                   .style("opacity", 0);
        });
});

$(document).ready(function(){
  var divs = $('.cause'),
      limit = 8000;  /* scrolltop value when opacity should be 0 */

  $(window).on('scroll', function() {
    var st = $(this).scrollLeft();
    /* avoid unnecessary call to jQuery function */
    if (st >= 3000) {
      //  divs.css({ 'opacity' : ((st - 3000)/limit) });
       divs.css({ 'opacity' : ((st-3000)/limit) });
    }
  });
});
