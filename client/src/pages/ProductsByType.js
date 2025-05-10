import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductsByType.css';

const ProductsByType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    category: 'all',
    sortBy: 'relevance'
  });

  // Get MBTI type from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const mbtiType = queryParams.get('mbti') || '';

  useEffect(() => {
    // This would normally be an API call to get products by MBTI type
    // For now we'll simulate it with mock data
    setLoading(true);
    
    const fetchProducts = async () => {
      try {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration
        const mockProducts = [
          {
            id: 1,
            name: mbtiType.includes('I') ? 'Noise-Cancelling Headphones' : 'Wireless Party Speaker',
            description: mbtiType.includes('I') 
              ? 'Perfect for creating a private space in noisy environments.' 
              : 'High-quality sound for your next social gathering.',
            price: 199.99,
            category: 'Electronics',
            imageUrl: 'https://via.placeholder.com/200',
            compatibility: 4.8,
            reviews: 125
          },
          {
            id: 2,
            name: mbtiType.includes('N') ? 'Abstract Art Canvas' : 'Practical Home Organizer',
            description: mbtiType.includes('N') 
              ? 'Stimulate your imagination with this abstract piece.' 
              : 'Keep your space tidy with this elegant storage solution.',
            price: 89.99,
            category: mbtiType.includes('N') ? 'Art' : 'Home',
            imageUrl: 'https://via.placeholder.com/200',
            compatibility: 4.5,
            reviews: 74
          },
          {
            id: 3,
            name: mbtiType.includes('F') ? 'Handwritten Letter Kit' : 'Logic Puzzle Collection',
            description: mbtiType.includes('F') 
              ? 'Express your feelings with personalized stationery.' 
              : 'Challenge your logical thinking with these complex puzzles.',
            price: 29.99,
            category: mbtiType.includes('F') ? 'Stationery' : 'Games',
            imageUrl: 'https://via.placeholder.com/200',
            compatibility: 4.7,
            reviews: 52
          },
          {
            id: 4,
            name: mbtiType.includes('J') ? 'Premium Planner' : 'Adaptable Travel Backpack',
            description: mbtiType.includes('J') 
              ? 'Plan your days with precision using this structured planner.' 
              : 'Ready for any adventure with multiple configuration options.',
            price: 49.99,
            category: mbtiType.includes('J') ? 'Stationery' : 'Travel',
            imageUrl: 'https://via.placeholder.com/200',
            compatibility: 4.9,
            reviews: 96
          },
          {
            id: 5,
            name: getPersonalizedProductName(mbtiType),
            description: getPersonalizedProductDescription(mbtiType),
            price: 129.99,
            category: getPersonalizedCategory(mbtiType),
            imageUrl: 'https://via.placeholder.com/200',
            compatibility: 5.0,
            reviews: 42
          },
          {
            id: 6,
            name: getSecondPersonalizedProductName(mbtiType),
            description: getSecondPersonalizedProductDescription(mbtiType),
            price: 79.99,
            category: getSecondPersonalizedCategory(mbtiType),
            imageUrl: 'https://via.placeholder.com/200',
            compatibility: 4.6,
            reviews: 63
          }
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [mbtiType]);

  // Helper functions to generate personalized products based on MBTI type
  function getPersonalizedProductName(type) {
    const personalizedProducts = {
      'ISTJ': 'Premium Leather Organizer',
      'ISFJ': 'Custom Family Photo Album',
      'INFJ': 'Mindfulness Meditation Set',
      'INTJ': 'Strategic Board Game Collection',
      'ISTP': 'Professional Tool Set',
      'ISFP': 'Watercolor Painting Kit',
      'INFP': 'Vintage Journal with Quote',
      'INTP': 'Complex Puzzle Box',
      'ESTP': 'Adventure Experience Gift Card',
      'ESFP': 'Karaoke Microphone System',
      'ENFP': 'Creative Writing Workshop',
      'ENTP': 'Innovation and Ideas Book Bundle',
      'ESTJ': 'Executive Desk Organizer',
      'ESFJ': 'Hosting and Entertainment Set',
      'ENFJ': 'Personal Development Course',
      'ENTJ': 'Leadership Book Collection'
    };
    
    return personalizedProducts[type] || 'Personalized Gift Set';
  }
  
  function getPersonalizedProductDescription(type) {
    const descriptions = {
      'ISTJ': 'High-quality leather organizer with practical compartments for optimal efficiency.',
      'ISFJ': 'Beautiful album to preserve your cherished family memories.',
      'INFJ': 'Create inner peace with this complete meditation kit designed for deep reflection.',
      'INTJ': 'Challenge your strategic mind with these complex and intellectually stimulating games.',
      'ISTP': 'Premium quality tools for any hands-on project or mechanical challenge.',
      'ISFP': 'Express your artistic side with these high-quality watercolors and supplies.',
      'INFP': 'Handcrafted journal with inspirational quotes to capture your thoughts and dreams.',
      'INTP': 'Multi-layered puzzle that will engage your analytical mind for hours.',
      'ESTP': 'Choose your next adrenaline-pumping adventure with this experience gift card.',
      'ESFP': 'Be the life of the party with this professional-grade karaoke system.',
      'ENFP': 'Unlock your creative potential in this inspiring writing workshop.',
      'ENTP': 'Explore revolutionary ideas and innovations with this curated book collection.',
      'ESTJ': 'Keep your workspace organized efficiently with this premium desk solution.',
      'ESFJ': 'Everything you need to host the perfect gathering for friends and family.',
      'ENFJ': 'Develop your leadership and people skills with this acclaimed course.',
      'ENTJ': 'Master the art of leadership with insights from world-class business minds.'
    };
    
    return descriptions[type] || 'A carefully selected gift perfect for your personality type.';
  }
  
  function getPersonalizedCategory(type) {
    if (['ISTJ', 'ESTJ', 'ISFJ', 'ESFJ'].includes(type)) return 'Organization';
    if (['INFJ', 'ENFJ', 'INFP', 'ENFP'].includes(type)) return 'Personal Growth';
    if (['INTJ', 'ENTJ', 'INTP', 'ENTP'].includes(type)) return 'Intellectual';
    if (['ISTP', 'ESTP', 'ISFP', 'ESFP'].includes(type)) return 'Experiential';
    
    return 'Personalized';
  }
  
  function getSecondPersonalizedProductName(type) {
    const personalizedProducts = {
      'ISTJ': 'Classic Timepiece Watch',
      'ISFJ': 'Premium Cooking Set',
      'INFJ': 'Philosophy Book Collection',
      'INTJ': 'Smart Home Starter Kit',
      'ISTP': 'DIY Electronics Project',
      'ISFP': 'Handcrafted Jewelry Set',
      'INFP': 'Fantasy Novel Collection',
      'INTP': 'Science and Technology Kit',
      'ESTP': 'Premium Sports Equipment',
      'ESFP': 'Experience Gift Voucher',
      'ENFP': 'Art Inspiration Set',
      'ENTP': 'Debate and Discussion Game',
      'ESTJ': 'Business Success Book Bundle',
      'ESFJ': 'Home Décor Gift Set',
      'ENFJ': 'Charity Donation Gift Card',
      'ENTJ': 'Executive Accessory Collection'
    };
    
    return personalizedProducts[type] || 'Curated Gift Collection';
  }
  
  function getSecondPersonalizedProductDescription(type) {
    const descriptions = {
      'ISTJ': 'Reliable, classic design that values tradition and precision.',
      'ISFJ': 'High-quality cookware for creating nurturing meals for loved ones.',
      'INFJ': 'Thought-provoking books exploring deep philosophical concepts.',
      'INTJ': 'Efficient home automation to streamline your living environment.',
      'ISTP': 'Hands-on electronics project to understand how things work.',
      'ISFP': 'Beautiful, artistic jewelry that expresses individuality.',
      'INFP': 'Immerse yourself in these imaginative and idealistic worlds.',
      'INTP': 'Explore scientific concepts and technological innovations.',
      'ESTP': 'High-performance equipment for your active lifestyle.',
      'ESFP': 'Create memories with this experience-based gift option.',
      'ENFP': 'Spark your creativity with these inspiring artistic tools.',
      'ENTP': 'Exercise your mind with thought-provoking discussions and debates.',
      'ESTJ': 'Practical guides to leadership and organizational success.',
      'ESFJ': 'Beautiful items to create a warm and welcoming home.',
      'ENFJ': 'Make a difference with this charitable contribution.',
      'ENTJ': 'Premium quality accessories befitting a natural leader.'
    };
    
    return descriptions[type] || 'Specially selected items that complement your personality.';
  }
  
  function getSecondPersonalizedCategory(type) {
    if (['ISTJ', 'INTJ', 'ESTJ', 'ENTJ'].includes(type)) return 'Luxury';
    if (['ISFJ', 'INFJ', 'ESFJ', 'ENFJ'].includes(type)) return 'Lifestyle';
    if (['ISTP', 'INTP', 'ESTP', 'ENTP'].includes(type)) return 'Technology';
    if (['ISFP', 'INFP', 'ESFP', 'ENFP'].includes(type)) return 'Creative';
    
    return 'Premium';
  }

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    if (filters.priceRange === 'low' && product.price > 50) return false;
    if (filters.priceRange === 'medium' && (product.price < 50 || product.price > 100)) return false;
    if (filters.priceRange === 'high' && product.price < 100) return false;
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    
    return true;
  });
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'reviews') return b.reviews - a.reviews;
    // Default: sort by compatibility (relevance)
    return b.compatibility - a.compatibility;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Perfect Gifts for {mbtiType || 'Your Personality Type'}</h1>
        <p>We've curated these items based on the preferences of {mbtiType || 'your personality type'}.</p>
      </div>
      
      <div className="filter-section">
        <div className="filter-group">
          <label>Price Range:</label>
          <select 
            name="priceRange" 
            value={filters.priceRange}
            onChange={handleFilterChange}
          >
            <option value="all">All Prices</option>
            <option value="low">Under $50</option>
            <option value="medium">$50 - $100</option>
            <option value="high">Over $100</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Category:</label>
          <select 
            name="category" 
            value={filters.category}
            onChange={handleFilterChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Sort By:</label>
          <select 
            name="sortBy" 
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Finding the perfect gifts for {mbtiType}...</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {sortedProducts.length > 0 ? (
              sortedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                    <div className="compatibility-badge">
                      <span>{product.compatibility}/5</span>
                      <small>Match</small>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-meta">
                      <span className="product-category">{product.category}</span>
                      <span className="product-reviews">{product.reviews} reviews</span>
                    </div>
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <button className="view-details-btn">View Details</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>No products match your current filters. Try adjusting your criteria.</p>
              </div>
            )}
          </div>
          
          <div className="products-footer">
            <button 
              className="take-test-btn"
              onClick={() => navigate('/mbti-test')}
            >
              Retake Personality Test
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsByType; 