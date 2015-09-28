function Vertex(label) {
  this.label = label;
}

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
    //this.adj[i].push("");
  }
  this.addEdge = addEdge;
  this.toString = toString;
  this.showGraph = showGraph;
  this.marked = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.marked[i] = false;
  }
  this.dfs = dfs;
  this.bfs = bfs;

  this.lookAtNextLevel = function(paths, destinationVertex) {
    var newPaths = [];
    var self = this;

      paths.forEach(function(path, indx, arr) {
        var vertex = path[path.length - 1];
        self.adj[vertex].forEach(function(child, indx2, arr2) {
          if(path.indexOf(child) === -1) {
            newPaths.push( [].concat.apply(path, [child]) );
          }
        });
      });

    return newPaths;
  };

  this.containsDestinationVertex = function(paths, destinationVertex) {
    var temparr = [];
    paths.forEach(function(path, indx, arr) {
      if(path.indexOf(destinationVertex) != -1) {
        temparr.push(path);
      }
    });

    return temparr;
  };

  // recursion
  this._traverseToShortestPath = function(startPath, destinationVertex) {
    var shortPath = this.containsDestinationVertex(startPath, destinationVertex);
    var genPaths = this.lookAtNextLevel(startPath, destinationVertex);
    if (shortPath.length != 0) {
      if (shortPath.length > 1) {
        console.log('there are more than one shortest paths: ');
        for (var i in shortPath) {
          console.log(shortPath[i].toString());
        }
      } else {
        console.log('the shortest path is: ', shortPath.toString());
      }
    } else {
      this._traverseToShortestPath(genPaths, destinationVertex); // no need to return
    }
  }


  this.shortestPath = function(sourceVertex, destinationVertex) {
    var startPath = [[sourceVertex]];
    return this._traverseToShortestPath(startPath, destinationVertex);
  }
}

function addEdge(v,w) {
  if(this.adj[v].indexOf(w) == -1) {
    this.adj[v].push(w);
  }

  if(this.adj[w].indexOf(v) == -1) {
    this.adj[w].push(v);
  }
  this.edges++;
}

function showGraph() {
  for (var i = 0; i < this.vertices; ++i) {
    var members = [];
    console.log('node2:', this.adj[i]);
    for (var j = 0; j < this.vertices; ++j) {
      if (this.adj[i][j] != undefined) {
        members.push(this.adj[i][j]);
      }
    }
    console.log("node: ", i + "->" + members.toString());
  }
}

function dfs(v) {
  var start = new Date().getTime();
  this.marked[v] = true;
  if (this.adj[v] != undefined) {
        console.log("dfs Visited vertex: " + v);
     }
  for each (var w in this.adj[v]) {
    if (!this.marked[w]) {
    this.dfs(w);
    }
  }
  var stop = new Date().getTime();
  var res = stop - start;
  console.log('milliseconds: ',res);
}

function bfs(s) {
  var queue = [];
  this.marked[s] = true;
  queue.push(s); // add to back of queue
  while (queue.length > 0) {
    var v = queue.shift(); // remove from front of queue
    if (v != undefined) {
      console.log("bfs Visited vertex: " + v);
    }

    for each (var w in this.adj[v]) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.marked[w] = true;
        queue.push(w);
      }
    }
  }
}





g = new Graph(12);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,2);
g.addEdge(1,4);
g.addEdge(3,2);
g.addEdge(7,8);
g.addEdge(3,0);
g.addEdge(4,5);
g.addEdge(5,2);
g.addEdge(7,5);
g.addEdge(5,6);
g.addEdge(5,7);
g.addEdge(6,5);
g.addEdge(6,7);
g.addEdge(4,2);
g.addEdge(9,8);
g.addEdge(9,10);
g.addEdge(9,11);
//g.addEdge(9,10);
//g.addEdge(9,11);
//g.showGraph();
console.log(g);
//g.bfs(6);
//console.log("is true when is member", g.isMemberOfSet(6, 5) === true); // should be true
//console.log("is true when is not member", g.isMemberOfSet(6, 1) === false); // should be false
//console.log("when one hop, outputs the two nodes",
            //g.shortestPath(6, 5) === "6,5"); // should be true
//console.log('when more than one hop, undefined',g.shortestPath(6, 0)); // should be flase
//console.log('members of destination include source', g.shortestPath(6, 2));
//console.log("when two sets intersect, return intersecting values",
           //g.intersectingElements([1,2,3], [2,3,4]).length === 2);
//console.log("when two sets don't intersect, return empty array",
           //g.intersectingElements([1,2,3], [4,5,6]).length === 0);
g.shortestPath(1, 8);
//console.log("when more than two hops away, consider each verticies children",
            //g.shortestPath(1,8));