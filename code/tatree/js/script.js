var data = null;
var transcripts = [];

var currTransc = 0;
var colors = [];

var z = 0;
var total = 0;
var nodeDepths = [];
var strLen = 0;

var dragging = null;
var selected = null;
var highlighted = null;

var dragStEvent = null;

var dragListener = d3.behavior.drag()
  .on("dragstart", function(d){
    if(d.parent == null) return;
    dragStEvent = d3.event;
  })
  .on("drag", function(d){
    if(d.parent == null) return;
    d.x0 += d3.event.dy;
    d.y0 += d3.event.dx;
    var n = d3.select(this);
    n.attr("transform", "translate("+d.y0+","+d.x0+")");
  })
  .on("dragend", function(d){
    if(dragStEvent == null) return;

    // simply clicked on a node?
    if((matchTest(selected) || selected === null)){

      dragging = null;

      var delta = {};

      delta.x = Math.abs(d3.event.sourceEvent.clientX - dragStEvent.sourceEvent.clientX),
        delta.y = Math.abs(d3.event.sourceEvent.clientY - dragStEvent.sourceEvent.clientY);

      // clicked near origin - treat event as just a click
      if(delta.x < 5 && delta.y < 5){
        if(this !== highlighted){
          if(highlighted != null){
            d3.select(highlighted)
              .attr("fill", "#000000");
          }
            //d3.select(highlighted).classed("highlighted", false);
          highlighted = this;
          d3.select(this)
            .attr("fill", "#4499FF");

        }
        else{
          hideChildren(d);
          d3.select(this).classed("collapsedParent", d._children);
        }
      }

      //update(d);
      update(data);
      dragStEvent = null;
      selected = null;

      return;
    }
    else{

      endDrag(selected);
      update(data);

      return;
    }

  });

var tree = d3.layout.tree()
  .sort(null)
  .size([4000, 480])
  .children(function(d){
    return(!d.children || d.children.length === 0) ? null : d.children;
  })
  .separation(function(a, b){
    if(!(hasChildren(a) || hasChildren(b)))
      return a.parent === b.parent ? 3 : 4;
    else
      return a.parent === b.parent ? 5 : 7;
  });

var link = d3.svg.diagonal()
  .projection(function(d){
    return [d.y, d.x];
  });

var layoutRoot = d3.select("#view")
.append("svg:svg")
.attr("width", 1600)
.attr("height", 8000)
.append("svg:g")
.attr("class", "container")
.attr("transform", "translate(60, 0)");

var tempCat = localStorage.categories != undefined ? JSON.parse(localStorage.categories) : undefined;
var categories = tempCat ? tempCat.nodes : [];
var tempFLinks = tempCat ? tempCat.links: [];
var fLinks = [];

for(var i = 0; i < tempFLinks.length; i++){
  var l = tempFLinks[i]

  if(!l.source) continue;

  var s = categories[l.source.index];
  var t = categories[l.target.index];
  fLinks.push({source: s, target: t});

  if(s.weight)
    s.weight++;
  else
    s.weight = 1;

  if(t.weight)
    t.weight++;
  else
    t.weight = 1;
}

var force = d3.layout.force()
  .size([3200, 3200])
  .nodes(categories)
  .links(fLinks)
  .linkDistance(100)
  .charge(-600)
  .on("tick", tick);

var forceRoot = d3.select("#network")
  .append("svg:svg")
  .attr("width", 3200)
  .attr("height", 3200)
  .append("svg:g")
  .attr("class", "container")
  .attr("transform", "translate(100, 100)")
  .on("mousemove", mousemove);

var forceNodes = force.nodes(),
    forceLinks = force.links(),
    forceNode = forceRoot.selectAll('.node'),
    forceLink = forceRoot.selectAll('.link');

// mouse event vars
var selected_node = null,
  selected_link = null,
  mousedown_link = null,
  mousedown_node = null,
  mouseup_node = null;

var drag_line = forceRoot.append("line")
  .attr("class", "drag_line")
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", 0)
  .attr("y2", 0);

forceDraw();

/*
  draw node hierarchy
*/
function update(source) {

  if(source == null && localStorage.data){
    source = JSON.parse(localStorage.getItem("data"));

    if(source.transcripts){
      transcripts = source.transcripts;

      resetSelect();
    }

    if(source.data)
      source = source.data;
  }
  else if(source == null) {
    transcripts = ["This is an example text file being used to demonstrate TATree." +
      " There is no useful data in this file. Qualitative data analysis is" +
      " subjective, however, so theoretically, a researcher can assign meaning" +
      " to this file, depending on what she is looking for.\n\n" +
      "For my purposes, however, this file is not intended to have any meaning." +
      " This should just be enough text to code some text and create some" +
      " meaningless categories to represent in the tree and network views."];

    source = {
      name: "Root",
      children: []
    }

    resetSelect();
  };

  data = source;

  var hueStep = 360 / transcripts.length;
  colors = [];
  for(var i = 0; i < transcripts.length; i++){
    colors.push(i * hueStep);
  }

  var h = 0;
  nodeDepths = [];
  depthCounts(data);
  total = countChildren(data);

  var newHeight = d3.max(nodeDepths) * 60;
  newHeight = Math.max(newHeight, 640);

  var newWidth = Math.max(strLen * 3 * nodeDepths.length, 800);

  tree = tree.size([newHeight, newWidth]);

  var svgCanvas = document.getElementById("view").firstChild
  svgCanvas.setAttribute("height", newHeight);
  svgCanvas.setAttribute("width", newWidth * 2);

  var nodes = tree.nodes(data);
  var links = tree.links(nodes);

  layoutRoot.selectAll("path.link")
    .data(links)
    .enter()
    .append("svg:path")
    .attr("class", "link")
    .attr("d", link);

  var node = layoutRoot.selectAll("g.node")
    .data(nodes, function(d){
      return d.id || (d.id = ++z);
    });

  var nodeGroup = node.enter().append("svg:g")
    .call(dragListener)
    .attr("class", function(d){
      return d._children ? "node collapsedParent" : "node";
    })
    .attr("transform", function(d){
      return "translate("+(d.depth * 100)+","+d.x+")";
    })
    .on('mousedown', function(d){
      startDrag(d);
    })
    .on("mouseover", function(d){
      if(dragging && d !== dragging)
        selected = d;
      if(d.transcript){
        var str = transcripts[d.transcript];
        var s = d.start > 80 ? d.start - 80 : 0;
        var e = str.length > d.end + 80 ? d.end + 80 : str.length;

        var sub = str.substr(s, e-s);
        nodeContext.textContent = sub;

      }
      else if(d.name != undefined)
        nodeContext.textContent = d.name;
    })
    .on("mouseout", function(d){
      if(dragging && d !== dragging)
        selected = null;
      nodeContext.textContent = "";
    });

  nodeGroup.append("svg:circle")
    .attr("class", "node-dot")
    .attr("r", 5)
    .attr("fill", function(d){
      //console.log(d.transcript);
      //if(d.transcript != undefined) console.log(colors[d.transcript]);
      return "hsl("+ (d.transcript != undefined ? colors[d.transcript] : 0)+", 100%, "+(d.transcript != undefined ? 50 : 0) + "%)"
    });

  nodeGroup.append("svg:text")
    .attr("text-anchor", function(d){
      return d.children ? "end" : "start";
    })
    .attr("dx", function(d){
      var gap = 20;
      return d.children ? -gap : gap;
    })
    .attr("dy", function(d){
      return (d.children) ? -15 : 3;
    })
    .text(function(d){
      return d.name;
    });

  var nodeUpdate = node.transition()
    .duration(300)
    .attr("transform", function(d){

      if(d._children){
        d.count = countChildren(d);
        h += d.count / total * 5;
      }
      else
        d.count = 0;

    //d.x = 20 + 20 * h++;
    //d.y = 80 * d.depth;

    if(total > 0)
      h += d.count / total * 5;

    return "translate(" + d.y + "," + d.x + ")";
  });

  nodeUpdate.select("circle")
    .attr("r", function(d){

      if(d._children){
        d.count = countChildren(d);
      }
      else
        d.count = 0;

      return total === 0 ? 5 : 5 + d.count / total * 50;
    });

  nodeUpdate.select("text")
    .style("fill-opacity", 1)
    .attr("text-anchor", function(d){
      return d.parent ? d.children ? "end" : "start" : "end";
    })
    .attr("dx", function(d){
      return d.parent ? d.children ? 0 : d._children ? 25 : 20 : -10;
    })
    .attr("dy", function(d){
      return d.parent && d.children ? 15 : 3;
    });

  var nodeExit = node.exit().transition()
    .duration(300)
    .attr("style", "hidden")
    .remove();

  nodeExit.select("circle")
    .attr("r", 1e-6);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);

  var nuLink = layoutRoot.selectAll("path.link")
    .data(tree.links(nodes), function(d){
      return d.target.id;
    });

  nuLink.enter().insert("svg:path", "g")
    .attr("class", "link")
    .attr("d", function(d){
      var o = {x: source.x0, y: source.y0};
      return link({source: o, target: o});
    })
    .transition()
    .duration(300)
    .attr("d", link);

  nuLink.transition()
  .duration(300)
  .attr("d", link);

  nuLink.exit().transition()
  .duration(300)
  .attr("d", function(d){
    var o = {x: source.x, y: source.y};
  })
  .remove();

  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  var saveData = {data: getJSON(data), transcripts: transcripts};

  document.getElementById("json").innerHTML = JSON.stringify(saveData, null, 4);
  localStorage.setItem("data", JSON.stringify(saveData));

}

function forceDraw(){

  forceLink = forceLink.data(forceLinks);

  forceNode = forceNode.data(forceNodes);

  //var forceGroup.enter().append("svg:g")
  forceNode.enter().append("svg:g");

  //forceNode.enter().insert("circle")
  forceNode.append("circle")
    .attr("class", "node")
    .attr("r", 8)
    .on("mousedown", function(d){

      mousedown_node = d;
      if (mousedown_node == selected_node)
        selected_node = null;
      else selected_node = mousedown_node;
        selected_link = null;

      // reposition drag line
      drag_line
        //.attr("class", "link")
        .attr("class", "drag_line")
        .attr("x1", mousedown_node.x)
        .attr("y1", mousedown_node.y)
        .attr("x2", mousedown_node.x)
        .attr("y2", mousedown_node.y);

      forceDraw();
    })
    .on("mouseup", function(d){
      finishLine();
      if(mousedown_node){
        mouseup_node = d;
        if (mouseup_node == mousedown_node){
          mousedown_node = null;
          mouseup_node = null;
          mousedown_link = null;

          return;
        }

        // add link
        var link = {
          source: mousedown_node,
          target: mouseup_node
        };
        forceLinks.push(link);

        // select new link
        selected_link = link;
        selected_node = null;

        forceDraw();
      }
    })
    .transition()
      .duration(750)
      .ease("elastic")
      .attr("r", 9);

  forceNode.append("svg:text")
    .attr("text-anchor", function(d){
      return "start";
    })
    .attr("dx", function(d){
      return 20;
    })
    .attr("dy", function(d){
      return 3;
    })
    .text(function(d){
      return d.name;
    });

  forceNode.exit().transition()
    .attr("r", 0)
    .remove();

  forceNode.classed("node_selected", function(d){
    return d === selected_node;
  });

  forceLink.enter().append("line")
    .attr("class", "link")
    .on("mousedown", function(d){
      mousedown_link = d;
      if (mousedown_link == selected_link)
        selected_link = null;
      else selected_link = mousedown_link;
        selected_node = null;
      forceDraw();
    });

  forceLink.exit().remove();

  forceLink.classed("link_selected", function(d){
    return d === selected_link;
  });

  if (d3.event) {
    // prevent browser's default behavior
    d3.event.preventDefault();
  }

  localStorage.categories = JSON.stringify({ nodes: categories, links: forceLinks });

  force.start();

}

function resetSelect(){
  var selectEl = document.querySelector('#showTranscript');
  while(selectEl.firstChild)
    selectEl.removeChild(selectEl.firstChild);

  for(var i = 0; i < transcripts.length; i++){
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(i))
    selectEl.appendChild(opt);

    if(i + 2 > transcripts.length)
      opt.setAttribute("selected", "selected");
  }

  showTranscript(selectEl.value);
}

/*
  return whether the node has children
*/
function hasChildren(d){
  return (true && d.children || d._children);
}

/*
  hide the nodes children
*/
function hideChildren(d){
  if(!d) return;
  if(d.children){
    d._children = d.children;
    d.children = null;
  }
  else{
    d.children = d._children;
    d._children = null;
  }

}

function iterateNodes(d, fn){

  var c = d.children || d._children;

  if(c != null || c != undefined)
    for(var i = 0; i < c.length; i++)
      iterateNodes(c[i], fn);

  fn(d);
}

/*
  count the node's children
*/
function countChildren(d){

  if(d == null) return 0;

  var c = 0;

  if(d.children){
    c = d.children.length;

    for(var i = 0; i < d.children.length; i++)
      c += countChildren(d.children[i]);
  }
  else if(d._children){
    c = d._children.length;

    for(var i = 0; i < d._children.length; i++)
      c += countChildren(d._children[i]);
  }

  return c;

}

function countLeaves(d){

  var c = 0;

  if(d.children){

    for(var i = 0; i < d.children.length; i++)
      c += countLeaves(d.children[i]);

    return 0;

  }

  else
    return 1;

}

function depthCounts(d, l){

  if(d == null)
    return 0;

  if(!l)
    l = 0;

  strLen = Math.max(strLen, d.name.length);

  if(!nodeDepths[l])
    nodeDepths[l] = 1;

  else
    nodeDepths[l] += 1;

  var ch = d.children;

  if(ch){
    for(var i = 0; i < ch.length; i++){
      depthCounts(ch[i], l+1);
    }
  }

}

function startDrag(d){
  dragging = d;

  var group = d3.selectAll("g.node").sort(function(a,b){
    if(a.id != dragging.id) return 1;
    else return -1;
  });
}

function endDrag(d){

  if(!d){
    return;
  }

  if(isDescendant(d)){
    console.log("Error: cannot move node to descendant node");
    return;
  }

  removeNode(dragging);
  dragging.parent = d;

  if(d._children){
    d._children.push(dragging);
  }
  else{
    if(!d.children)
      d.children = [];

    d.children.push(dragging);
  }

  selected = null;

}

function removeNode(d){
  var parent = d.parent;
  for(var i = 0; i < parent.children.length; i++){
    if(parent.children[i] == d){
      parent.children.splice(i, 1);
    }
  }
}

function isDescendant(d){

  if(!d) return false;

  if(d === dragging)
    return true;

  if(d.parent && isDescendant(d.parent))
    return true;

  return false;

}

function countPrev(t){
  if(t.previousSibling)
    return countPrev(t.previousSibling) + 1;
  else
    return 0;
}

function matchTest(d){
  var result = dragging === d;
  return result;
}

function tick() {
  forceLink
    .attr("x1", function(d){ return d.source.x; })
    .attr("y1", function(d){ return d.source.y; })
    .attr("x2", function(d){ return d.target.x; })
    .attr("y2", function(d){ return d.target.y; });

  forceNode
    //.attr("cx", function(d){ return d.x; })
    //.attr("cy", function(d){ return d.y; });
    .attr("transform", function(d){
      if(!isNaN(d.x))
        return "translate("+d.x+","+d.y+")";
      else
        return "translate(0,0)";
    });
}

function drawLine(){
  // update drag line
  drag_line
    .attr("x1", mousedown_node.x)
    .attr("y1", mousedown_node.y)
    .attr("x2", d3.svg.mouse(this)[0])
    .attr("y2", d3.svg.mouse(this)[1]);

}

function finishLine(){
  if (mousedown_node) {
    // hide drag line
      drag_line
        .attr("class", "drag_line_hidden");
  }
}

function mousemove(){
if (!mousedown_node) return;

    // update drag line
    drag_line
      .attr("x1", mousedown_node.x)
      .attr("y1", mousedown_node.y)
      //console.log(this, d3.mouse(this));
      .attr("x2", d3.mouse(this)[0])
      .attr("y2", d3.mouse(this)[1]);
}

function getJSON(d){
  var ob = {
    "name": d.name,
    "children" : []
  };

  if(d.transcript != null){
    ob.transcript = d.transcript;
    ob.el = d.el;
    ob.start = d.start;
    ob.end = d.end;
  }

  if(d.children)
    for(var i = 0; i < d.children.length; i++){
      ob.children.push(getJSON(d.children[i]));
    }

  if(d._children){
    for(var i = 0; i < d._children.length; i++){
      ob.children.push(getJSON(d._children[i]));
    }
  }

  return ob;
}

function uploadJSON(e){
  var t = e.target || window.event.srcElement;
  var files = t.files;

  if(FileReader && files && files.length){
    var fr = new FileReader();
    fr.onload = function(){
      var ld = JSON.parse(fr.result);
      data = ld.data;
      transcripts = ld.transcripts;
      update(data);
      t.value = "";
    }
    fr.readAsText(files[0]);
  }
}

function uploadTranscript(e){
  var t = e.target || window.event.srcElement;
  var files = t.files;

  if(FileReader && files && files.length){
    var fr = new FileReader();
    fr.onload = function(){
      transcript = fr.result;
      transcripts.push(transcript);
      //update(data);
      t.value = "";
      update(data || {name:"codes", children:{}});

      resetSelect();
    }
    fr.readAsText(files[0]);
  }
}

function showTranscript(ind){
  if(transcripts.length < 1)
    return;

  if(ind == undefined || ind == null){
    currTransc++;

    if(currTransc > transcripts.length - 1)
      currTransc = 0;
  }
  else
    currTransc = parseInt(ind);

  var scr = document.querySelector("#script");
  while(scr.firstChild)
    scr.removeChild(scr.firstChild);

  var nodeList = [];
  if(data)
    iterateNodes(data, function(d){
      if(d.transcript != null || d.transcript != undefined)
        if(d.transcript == currTransc) nodeList.push(d);

  });

  nodeList.sort(function(a, b){ return b.start - a.start; });

  scr.appendChild(document.createTextNode(transcripts[currTransc]));

  var el = scr.firstChild;

  var r = new Range();

  for(var i = 0; i < nodeList.length; i++){
    r.setStart(el, nodeList[i].start);
    r.setEnd(el, nodeList[i].end);

    r.surroundContents(document.createElement('span'));
  }

}

function encodeSelection(){
  var text = "";
  if(window.getSelection){
    text = window.getSelection().getRangeAt(0);
  }
  else if(document.selection && document.selection.type != "Control"){
    text = document.selection.createRange();
  }

  var str = text.toString();

  var txt = document.querySelector('#script').textContent;
  var indStart = 0;
  var matches = 0;

  indStart = txt.indexOf(str, 0);
  while(txt.indexOf(str, indStart+1) > -1){
    matches++;
  }

  if(matches < 2){
    var selection = {
      name: text.toString(),
      children: [],
      transcript: currTransc,
      el: countPrev(text.startContainer),
      start: indStart,
      end: indStart + str.length
    }
    if(highlighted != null)
      addNode(d3.select(highlighted).data()[0], selection);
    else
      addNode(data, selection);

    text.surroundContents(document.createElement('span'));
  }
}

function addNode(parent, node){
  if(parent){
    if(!parent.hasOwnProperty('children') && !parent.hasOwnProperty('_children'))
      parent.children = [];

    if(parent._children)
      hideChildren(parent);
    parent.children.push(node);

  }
  else
    parent = node;

  update(data);

  forceNodes.push({name: node.name});
  forceDraw();
}

function init(){

  document.querySelector("#zoomIn")
    .addEventListener("click", function(e){

    var svg = document.querySelector("#view")
      .firstChild
      .firstChild;
    var tr = svg.getAttribute("transform");

    if(tr == "translate(60, 0) scale(1)" || tr == "translate(60, 0)")
      svg
        .setAttribute("transform", "translate(120, 0) scale(2)");
    else
      svg
        .setAttribute("transform", "translate(60, 0) scale(1)");
  });

  document.querySelector("#zoomOut")
    .addEventListener("click", function(e){

    var svg = document.querySelector("#view")
      .firstChild
      .firstChild;
    var tr = svg.getAttribute("transform");

    if(tr == "translate(60, 0) scale(1)" || tr == "translate(60, 0)")
      svg
        .setAttribute("transform", "translate(30, 0) scale(.5)");
    else
      svg.setAttribute("transform", "translate(60, 0) scale(1)");

  });
  document.getElementById("fileField").addEventListener("change", function(e){
    uploadJSON(e);
  });

  document.getElementById("transcriptField").addEventListener("change", function(e){
    uploadTranscript(e);
  });

 /* document.getElementById("showTranscript").addEventListener("click", function(e){
    showTranscript();
  });
  */
  document.getElementById('showTranscript').addEventListener("change", function(e){
    showTranscript(this.value);
  });

  document.getElementById('toggleTranscript').addEventListener("click", function(e){
    document.getElementById('view').classList.toggle('expand');
    document.getElementById('script').classList.toggle('hidden');
  });
  document.getElementById("encodeSelection").addEventListener("click", function(e){
    encodeSelection();
  });

  document.getElementById("insertNode").addEventListener("click", function(e){
    e.preventDefault();
    var n = document.getElementById("nodeField").value;
    document.getElementById("nodeField").value = "";

    if(n && n !== ""){
      var o = {
        "name": n,
        "children": []
      };

      if(highlighted != null)
        addNode(d3.select(highlighted).data()[0], o);
      else
        addNode(data, o);
    }
  });
  document.getElementById("json").addEventListener("click", function(){
    var range = document.createRange();
    range.selectNodeContents(this);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  });

  var nodeContext = document.getElementById('nodeContext');

  update();
};

window.onload = init;
