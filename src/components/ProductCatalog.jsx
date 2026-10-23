import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';
import { Search, Sparkles, Filter } from 'lucide-react';

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
    <section 
      id="catalog" 
      style={{
        padding: 'clamp(36px, 6vw, 72px) clamp(16px, 3.5vw, 32px)',
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      {/* Editorial Section Heading */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: '20px',
          backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
          border: '1px solid rgba(182, 154, 99, 0.3)',
          marginBottom: '12px'
        }}>
          <Sparkles size={13} color="var(--accent-gold, #B69A63)" />
          <span style={{
            fontSize: '0.74rem',
            color: 'var(--brand-navy, #172A3A)',
            fontWeight: 700,
            letterSpacing: '1.2px',
            textTransform: 'uppercase'
          }}>
            {products.length} VERIFIED TIMEPIECES IN STOCK
          </span>
        </div>

        <h2 
          className="font-playfair"
          style={{
            fontSize: 'clamp(1.8rem, 3.6vw, 2.75rem)',
            color: 'var(--brand-navy, #172A3A)',
            margin: '0 0 10px 0',
            fontWeight: 700,
            letterSpacing: '-0.3px'
          }}
        >
          Curated Horology Collection
        </h2>
        
        <p style={{
          color: 'var(--text-secondary, #737B84)',
          fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Handpicked for weight, finish, and durability. Backed by our signature 100% open parcel inspection before paying courier.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div style={{
        marginBottom: '28px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-warm, #E6E2DA)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        
        {/* Horizontal Category Pill Bar */}
        <div 
          className="hide-scrollbar" 
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            const isDeal = cat.includes("Under Rs. 2,199");

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  backgroundColor: isSelected 
                    ? 'var(--brand-navy, #172A3A)' 
                    : isDeal ? 'rgba(158, 52, 56, 0.08)' : 'var(--bg-card, #FFFFFF)',
                  color: isSelected 
                    ? '#FFFFFF' 
                    : isDeal ? 'var(--badge-burgundy, #9E3438)' : 'var(--text-primary, #252A30)',
                  border: isSelected 
                    ? '1px solid var(--brand-navy, #172A3A)' 
                    : isDeal ? '1px solid rgba(158, 52, 56, 0.3)' : '1px solid var(--border-card, #E6E2DA)',
                  padding: '7px 16px',
                  borderRadius: '30px',
                  fontSize: '0.8rem',
                  fontWeight: isSelected || isDeal ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.18s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(23, 42, 58, 0.15)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input & Sort Dropdown Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-card, #FFFFFF)',
            border: '1px solid var(--border-card, #E6E2DA)',
            borderRadius: 'var(--radius-sm, 8px)',
            padding: '8px 14px',
            flex: '1 1 240px',
            maxWidth: '380px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <Search size={16} color="var(--text-secondary, #737B84)" style={{ marginRight: '8px', flexShrink: 0 }} />
            <input 
              type="text"
              placeholder="Search watch name, dial, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search watches"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary, #252A30)',
                fontSize: '0.85rem',
                width: '100%'
              }}
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary, #737B84)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  padding: '0 4px'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #737B84)', fontWeight: 600 }}>
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort watches"
              style={{
                backgroundColor: 'var(--bg-card, #FFFFFF)',
                color: 'var(--text-primary, #252A30)',
                border: '1px solid var(--border-card, #E6E2DA)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm, 8px)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: 600
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Catalog Grid: Renders strictly in 2-columns on mobile screens via CSS */}
      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'var(--bg-card, #FFFFFF)',
          borderRadius: 'var(--radius-card, 12px)',
          border: '1px solid var(--border-card, #E6E2DA)',
          color: 'var(--text-secondary, #737B84)'
        }}>
          <p style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 8px 0', color: 'var(--text-primary, #252A30)' }}>
            No timepieces found
          </p>
          <p style={{ fontSize: '0.86rem', margin: 0 }}>
            Try clearing your search query or choosing another category.
          </p>
        </div>
      ) : (
        <div className="catalog-product-grid">
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
