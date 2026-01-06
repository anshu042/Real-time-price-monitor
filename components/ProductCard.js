"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2, LineChart, Tag } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Stop tracking this item?")) return;
    setDeleting(true);
    await deleteProduct(product.id);
    toast.success("Removed from watchlist");
  };

  return (
    <div className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-purple-600/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
      
      <div className="h-full bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[23px] overflow-hidden flex flex-col shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-primary/5 relative">
        
        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />

        <div className="p-6 flex-1 relative z-20">
          <div className="flex justify-between items-start gap-4 mb-5">
            <div className="relative w-16 h-16 shrink-0 bg-white dark:bg-white/90 rounded-2xl p-2 shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              {product.image_url ? (
                <img src={product.image_url} alt="" className="w-full h-full object-contain" />
              ) : (
                <Tag className="w-6 h-6 text-gray-300" />
              )}
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border-2 border-white dark:border-black animate-pulse">
                LIVE
              </div>
            </div>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full text-muted-foreground/50 hover:text-red-500 hover:bg-red-500/10 transition-colors" 
              onClick={handleDelete} 
              disabled={deleting}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <h3 className="font-bold text-lg leading-tight mb-4 line-clamp-2 h-[3rem] text-foreground/90 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Current Price</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black tracking-tight text-foreground">
                  {product.currency} {product.current_price}
                </span>
              </div>
            </div>
            <Button 
              size="icon" 
              className="rounded-full w-10 h-10 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95" 
              asChild
            >
              <Link href={product.url} target="_blank">
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-2 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5 relative z-20">
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-black/5 dark:hover:bg-white/10 rounded-xl h-9 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
            onClick={() => setShowChart(!showChart)}
          >
            <span className="flex items-center gap-2">
              <LineChart className="w-3.5 h-3.5" />
              View History
            </span>
            <span className="opacity-50 group-hover:opacity-100 transition-opacity">
               {showChart ? "Collapse" : "Expand"}
            </span>
          </Button>
          
          {showChart && (
            <div className="pt-4 pb-2 px-2 animate-in slide-in-from-top-4 fade-in duration-300">
              <PriceChart productId={product.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}