import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';
import { Search } from 'lucide-react';

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
        padding: 'clamp(14px, 2.5vw, 36px) clamp(12px, 3vw, 24px)',
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      {/* Desktop Editorial Section Heading */}
      <div className="desktop-only" style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '3px 12px',
          borderRadius: '20px',
          backgroundColor: 'var(--bg-gold-subtle, #F3EBDD)',
          marginBottom: '8px'
        }}>
          <span style={{
            fontSize: '0.74rem',
            color: 'var(--brand-navy, #172A3A)',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {filteredProducts.length} TIMEPIECES IN STOCK
          </span>
        </div>

        <h2 
          className="font-playfair"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--brand-navy, #172A3A)',
            margin: '0 0 8px 0',
            fontWeight: 700,
            letterSpacing: '-0.3px'
          }}
        >
          Find Your Everyday.
        </h2>
        
        <p style={{
          color: 'var(--text-secondary, #737B84)',
          fontSize: 'clamp(0.88rem, 1.8vw, 0.98rem)',
          maxWidth: '520px',
          margin: '0 auto',
          lineHeight: 1.55
        }}>
          Thoughtfully crafted timepieces for business, sport, and daily life. Delivered with 100% open parcel check.
        </p>
      </div>

      {/* Mobile Streamlined Section Heading */}
      <div className="mobile-only" style={{ marginBottom: '8px', padding: '0 2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--brand-navy, #172A3A)',
            margin: 0,
            letterSpacing: '-0.2px'
          }}>
            Signature Watches <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #737B84)', fontWeight: 500 }}>({filteredProducts.length})</span>
          </h2>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#15803D',
            backgroundColor: 'rgba(21, 128, 61, 0.08)',
            padding: '2px 8px',
            borderRadius: '12px'
          }}>
            ✓ Open Parcel Check
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="catalog-filter-wrap" style={{
        marginBottom: '28px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-warm, #E6E2DA)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
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
                  transition: 'all 0.15s ease'
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
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-card, #E6E2DA)',
            borderRadius: 'var(--radius-sm, 8px)',
            padding: '7px 12px',
            flex: '1 1 220px',
            maxWidth: '360px'
          }}>
            <Search size={15} color="var(--text-secondary, #737B84)" style={{ marginRight: '8px', flexShrink: 0 }} />
            <input 
              type="text"
              placeholder="Filter by name, color, or movement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter watches"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary, #252A30)',
                fontSize: '0.84rem',
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
                backgroundColor: '#FFFFFF',
                color: 'var(--text-primary, #252A30)',
                border: '1px solid var(--border-card, #E6E2DA)',
                padding: '7px 12px',
                borderRadius: 'var(--radius-sm, 8px)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: 600
              }}
            >
              <option value="popular">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-card, 12px)',
          border: '1px solid var(--border-card, #E6E2DA)',
          color: 'var(--text-secondary, #737B84)'
        }}>
          <p style={{ fontSize: '0.96rem', fontWeight: 600, margin: '0 0 6px 0', color: 'var(--text-primary, #252A30)' }}>
            No timepieces match your selection.
          </p>
          <p style={{ fontSize: '0.84rem', margin: 0 }}>
            Try resetting your search query or choosing another collection.
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
