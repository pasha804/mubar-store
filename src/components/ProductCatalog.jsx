import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';
import { Search, Flame, Sparkles } from 'lucide-react';

export default function ProductCatalog({ products, onSelectProduct, onQuickBuy }) {
  const [selectedCategory, setSelectedCategory] = useState("All Timepieces");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        let matchesCategory = false;
        if (selectedCategory === "All Timepieces") {
          matchesCategory = true;
        } else if (selectedCategory === "Under Rs. 2,199 Deals") {
          matchesCategory = p.salePrice <= 2199;
        } else {
          matchesCategory = p.category === selectedCategory;
        }

        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.salePrice - b.salePrice;
        if (sortBy === "price-high") return b.salePrice - a.salePrice;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // default popular
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" style={{
      padding: '70px 24px',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      
      {/* Title & Tagline */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '20px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', marginBottom: '14px' }}>
          <Sparkles size={14} color="#D4AF37" />
          <span style={{ fontSize: '0.78rem', color: '#F3E5AB', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {products.length} ICONIC MASTERPIECES IN STOCK
          </span>
        </div>

        <h2 className="font-cinzel" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '8px' }}>
          CURATED <span className="gold-text">TIMEPIECES</span>
        </h2>
        <p style={{ color: '#8E8E93', fontSize: '0.95rem' }}>
          Every timepiece is backed by 100% Open Parcel Doorstep Inspection & 1-Year Movement Warranty.
        </p>
      </div>

      {/* Category Pills & Filters */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '35px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        paddingBottom: '20px'
      }}>
        
        {/* Categories Bar */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            const isHotDeal = cat.includes("Under Rs. 2,199");

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: isSelected 
                    ? 'var(--gold-gradient)' 
                    : isHotDeal ? 'rgba(231, 76, 60, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#070709' : isHotDeal ? '#FF7675' : '#aaa',
                  border: isSelected 
                    ? 'none' 
                    : isHotDeal ? '1px solid rgba(231, 76, 60, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '8px 18px',
                  borderRadius: '25px',
                  fontSize: '0.82rem',
                  fontWeight: isSelected || isHotDeal ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isHotDeal && <Flame size={14} color="#E74C3C" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Search Box */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '7px 14px',
            width: '210px'
          }}>
            <Search size={15} color="#888" style={{ marginRight: '8px' }} />
            <input 
              type="text"
              placeholder="Search timepieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '0.82rem',
                width: '100%'
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: '#0d0d12',
              color: '#F3E5AB',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
          No timepieces found matching "{searchQuery}".
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '30px'
        }}>
          {filteredProducts.map(p => (
            <ProductCard 
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
              onQuickBuy={onQuickBuy}
            />
          ))}
        </div>
      )}

    </section>
  );
}
