import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';

interface Transaction {
  signature: string;
  slot: number;
  timestamp: number;
  tokenTransfers: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    fromTokenAccount: string;
    toTokenAccount: string;
    tokenAmount: number;
    mint: string;
    tokenStandard: string;
  }>;
  nativeTransfers: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }>;
  accountData: Array<{
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: Array<{
      mint: string;
      rawTokenAmount: {
        tokenAmount: string;
        decimals: number;
      };
      userAccount: string;
    }>;
  }>;
  transactionError: any;
  instructions: Array<{
    accounts: string[];
    data: string;
    programId: string;
    innerInstructions: any[];
  }>;
  events: any;
}

interface Node {
  id: string;
  label: string;
  type: 'main' | 'connected' | 'intermediate';
  value: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  value: number;
  type: 'SOL' | 'TOKEN';
  signature: string;
}

interface D3FundFlowProps {
  address: string;
  isVisible: boolean;
  className?: string;
}

export const D3FundFlow: React.FC<D3FundFlowProps> = ({ 
  address, 
  isVisible, 
  className = "" 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  const HELIUS_API_KEY = '49107f03-be28-4419-b417-8341142ba90a';

  const fetchTransactions = async () => {
    if (!address) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const url = `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${HELIUS_API_KEY}`;
      const options = { 
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Helius API Response:', data);
      
      setTransactions(data);
      processTransactionData(data, address);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const processTransactionData = (transactions: Transaction[], mainAddress: string) => {
    const nodeMap = new Map<string, Node>();
    const linkArray: Link[] = [];

    // Add main node
    nodeMap.set(mainAddress, {
      id: mainAddress,
      label: `${mainAddress.slice(0, 6)}...${mainAddress.slice(-4)}`,
      type: 'main',
      value: 0
    });

    transactions.forEach((tx) => {
      // Process native SOL transfers
      tx.nativeTransfers?.forEach((transfer) => {
        const { fromUserAccount, toUserAccount, amount } = transfer;
        const solAmount = amount / 1e9; // Convert lamports to SOL

        // Add nodes if they don't exist
        if (!nodeMap.has(fromUserAccount)) {
          nodeMap.set(fromUserAccount, {
            id: fromUserAccount,
            label: `${fromUserAccount.slice(0, 6)}...${fromUserAccount.slice(-4)}`,
            type: fromUserAccount === mainAddress ? 'main' : 'connected',
            value: 0
          });
        }

        if (!nodeMap.has(toUserAccount)) {
          nodeMap.set(toUserAccount, {
            id: toUserAccount,
            label: `${toUserAccount.slice(0, 6)}...${toUserAccount.slice(-4)}`,
            type: toUserAccount === mainAddress ? 'main' : 'connected',
            value: 0
          });
        }

        // Update node values
        const fromNode = nodeMap.get(fromUserAccount)!;
        const toNode = nodeMap.get(toUserAccount)!;
        fromNode.value += solAmount;
        toNode.value += solAmount;

        // Add link
        linkArray.push({
          source: fromUserAccount,
          target: toUserAccount,
          value: solAmount,
          type: 'SOL',
          signature: tx.signature
        });
      });

      // Process token transfers
      tx.tokenTransfers?.forEach((transfer) => {
        const { fromUserAccount, toUserAccount, tokenAmount } = transfer;
        
        if (fromUserAccount && toUserAccount && tokenAmount > 0) {
          // Add nodes if they don't exist
          if (!nodeMap.has(fromUserAccount)) {
            nodeMap.set(fromUserAccount, {
              id: fromUserAccount,
              label: `${fromUserAccount.slice(0, 6)}...${fromUserAccount.slice(-4)}`,
              type: fromUserAccount === mainAddress ? 'main' : 'connected',
              value: 0
            });
          }

          if (!nodeMap.has(toUserAccount)) {
            nodeMap.set(toUserAccount, {
              id: toUserAccount,
              label: `${toUserAccount.slice(0, 6)}...${toUserAccount.slice(-4)}`,
              type: toUserAccount === mainAddress ? 'main' : 'connected',
              value: 0
            });
          }

          // Update node values (normalize token amounts)
          const normalizedAmount = tokenAmount / 1e6; // Rough normalization
          const fromNode = nodeMap.get(fromUserAccount)!;
          const toNode = nodeMap.get(toUserAccount)!;
          fromNode.value += normalizedAmount;
          toNode.value += normalizedAmount;

          // Add link
          linkArray.push({
            source: fromUserAccount,
            target: toUserAccount,
            value: normalizedAmount,
            type: 'TOKEN',
            signature: tx.signature
          });
        }
      });
    });

    const nodesArray = Array.from(nodeMap.values());
    setNodes(nodesArray);
    setLinks(linkArray);
  };

  const createVisualization = () => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const nodeScale = d3.scaleLinear()
      .domain(d3.extent(nodes, d => d.value) as [number, number])
      .range([8, 30]);

    const linkScale = d3.scaleLinear()
      .domain(d3.extent(links, d => d.value) as [number, number])
      .range([1, 8]);

    // Create force simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links)
        .id((d: any) => d.id)
        .distance(100)
        .strength(0.5))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d: any) => nodeScale(d.value) + 5));

    // Create arrow markers
    svg.append("defs").selectAll("marker")
      .data(["SOL", "TOKEN"])
      .enter().append("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", d => d === "SOL" ? "#14f195" : "#9945ff");

    // Create links
    const link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", d => d.type === "SOL" ? "#14f195" : "#9945ff")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => linkScale(d.value))
      .attr("marker-end", d => `url(#arrow-${d.type})`);

    // Create nodes
    const node = g.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => nodeScale(d.value))
      .attr("fill", d => {
        switch (d.type) {
          case 'main': return "#ff6b6b";
          case 'connected': return "#4ecdc4";
          default: return "#45b7d1";
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .call(d3.drag<SVGCircleElement, Node>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add labels
    const labels = g.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text(d => d.label)
      .attr("font-size", "12px")
      .attr("font-family", "Poppins, sans-serif")
      .attr("fill", "#ffffff")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em");

    // Add tooltips
    const tooltip = d3.select("body").append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("z-index", "1000");

    node
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .html(`
            <strong>${d.label}</strong><br/>
            Type: ${d.type}<br/>
            Total Value: ${d.value.toFixed(4)}
          `);
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    link
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .html(`
            <strong>${d.type} Transfer</strong><br/>
            Amount: ${d.value.toFixed(4)}<br/>
            Signature: ${d.signature.slice(0, 8)}...
          `);
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y + nodeScale(d.value) + 15);
    });

    // Cleanup function
    return () => {
      tooltip.remove();
      simulation.stop();
    };
  };

  useEffect(() => {
    if (isVisible && address) {
      fetchTransactions();
    }
  }, [address, isVisible]);

  useEffect(() => {
    if (nodes.length > 0 && links.length > 0) {
      const cleanup = createVisualization();
      return cleanup;
    }
  }, [nodes, links]);

  if (!isVisible) return null;

  return (
    <div className={`bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-poppins text-xl font-semibold">
            Fund Flow Visualization
          </h3>
          {transactions.length > 0 && (
            <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full font-poppins">
              {transactions.length} transactions
            </span>
          )}
        </div>
        <button
          onClick={fetchTransactions}
          disabled={isLoading}
          className="bg-sentry-accent text-white px-4 py-2 rounded-lg font-poppins hover:bg-sentry-accent/80 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Refresh
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-sentry-accent animate-spin mx-auto mb-4" />
            <p className="text-white font-poppins">Loading transaction data...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 font-poppins mb-4">Error: {error}</p>
            <button
              onClick={fetchTransactions}
              className="bg-sentry-accent text-white px-4 py-2 rounded-lg font-poppins hover:bg-sentry-accent/80 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!isLoading && !error && nodes.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-white/60 font-poppins">
              No transaction data available for visualization
            </p>
          </div>
        </div>
      )}

      {!isLoading && !error && nodes.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-black/20 rounded-xl p-4 text-center">
              <div className="text-white font-poppins text-2xl font-bold">
                {nodes.length}
              </div>
              <div className="text-white/70 font-poppins text-sm">Addresses</div>
            </div>
            <div className="bg-black/20 rounded-xl p-4 text-center">
              <div className="text-white font-poppins text-2xl font-bold">
                {links.length}
              </div>
              <div className="text-white/70 font-poppins text-sm">Transfers</div>
            </div>
            <div className="bg-black/20 rounded-xl p-4 text-center">
              <div className="text-white font-poppins text-2xl font-bold">
                {links.reduce((sum, link) => sum + link.value, 0).toFixed(2)}
              </div>
              <div className="text-white/70 font-poppins text-sm">Total Volume</div>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 overflow-hidden">
            <svg ref={svgRef} className="w-full h-auto"></svg>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/70 bg-black/20 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span>Main Address</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              <span>Connected Address</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-green-400"></div>
              <span>SOL Transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-purple-400"></div>
              <span>Token Transfer</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};