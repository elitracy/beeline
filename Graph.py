class WEdge:

    def __init__(self, size):
        self.u
        self.v
        self.w


class WuGraph:
    #   ^ ADD YOUR FIELDS HERE

    def __init__(self, size):
        self.list = [None for i in range(size)]
        self.size = size
        
        for i in range(self.size):
           self.list[i] = [None for i in range(self.size)]
        
    def len(self):
        return self.size
        
    def set_edge(self, u, v, w):
        if w:
            self.list[u][v] = w
            self.list[v][u] = w
        else:
            self.list[u][v] = None
            self.list[v][u] = None
        
    def get_edge(self, u, v):
        return self.list[u][v]
        
    def get_adjacent(self, v):
        adj = None
        
        for u in range(len(self.list[v])):
            if self.list[v][u]:
                adj = adj.append(u)
       
        return adj
    def get_all_edges(self):
        s = 0
        
        edges = None
        
        for i in range(len(self.list)):
            for j in range(len(self.list[i])):
                if s < self.size and j <= s:
                    if self.list[i][j]:
                        edges = edges.append(WEdge(i, j, self.list[i][j]), edges)
            s = s + 1
            
        return edges