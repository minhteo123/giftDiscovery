import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await axios.get(`${API_URL}/gifts`);
        setGifts(res.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(gift => gift.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gifts');
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/gifts/search?query=${searchTerm}`);
      setGifts(res.data);
      setLoading(false);
    } catch (err) {
      setError('Search failed');
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/gifts/category/${category}`);
      setGifts(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to filter by category');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container text-center mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="home-container">
      {/* Hero Section with MBTI Test Feature */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover the Perfect Gift Based on Personality</h1>
          <p>Take our MBTI personality test to find gifts that truly match the recipient's unique traits and preferences.</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate('/mbti-test')}>
              Take Personality Test
            </button>
            <button className="secondary-btn" onClick={() => window.scrollTo({ top: document.querySelector('.how-it-works').offsetTop, behavior: 'smooth' })}>
              Learn How It Works
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/gift-discovery-hero.jpg" alt="Personality-based gift discovery" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Take the Test</h3>
            <p>Answer questions about preferences and behaviors to determine your MBTI personality type.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Get Your Results</h3>
            <p>Discover your personality type and learn about your unique traits and preferences.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Browse Recommendations</h3>
            <p>Explore gift suggestions tailored specifically to your personality type.</p>
          </div>
        </div>
      </section>
      <section className="gift-search-section">
      <div className="gifts-grid">
          {gifts.length > 0 ? (
            gifts.map(gift => (
              <div key={gift._id} className="gift-card">
                <img src={gift.imageUrl || "https://via.placeholder.com/200"} alt={gift.name} />
                <div className="gift-info">
                  <h3>{gift.name}</h3>
                  <p className="price">${gift.price}</p>
                  <Link to={`/gift/${gift._id}`} className="view-btn">View Details</Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-gifts">No gifts found. Try a different search term or category.</p>
          )}
        </div>
      </section> 
      {/* Gift Search Section
      <section className="gift-search-section">
        <h2>Find Gifts</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for gifts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="categories">
          <button 
            className="category-btn active" 
            onClick={() => {
              setLoading(true);
              axios.get(`${API_URL}/gifts`)
                .then(res => {
                  setGifts(res.data);
                  setLoading(false);
                })
                .catch(err => {
                  setError('Failed to fetch gifts');
                  setLoading(false);
                });
            }}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button 
              key={index} 
              className="category-btn"
              onClick={() => filterByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gifts-grid">
          {gifts.length > 0 ? (
            gifts.map(gift => (
              <div key={gift._id} className="gift-card">
                <img src={gift.imageUrl || "https://via.placeholder.com/200"} alt={gift.name} />
                <div className="gift-info">
                  <h3>{gift.name}</h3>
                  <p className="price">${gift.price}</p>
                  <Link to={`/gift/${gift._id}`} className="view-btn">View Details</Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-gifts">No gifts found. Try a different search term or category.</p>
          )}
        </div>
      </section> */}

      {/* Personality Types Overview */}
      <section className="personality-types-section">
        <h2>MBTI Personality Types & Gift Matches</h2>
        <p>Every personality type has unique preferences. Discover the perfect gifts for each type.</p>
        
        <div className="personality-grid">
          <div className="personality-group">
            <h3>Analysts</h3>
            <div className="types">
              <Link to="/products?mbti=INTJ" className="type-card">INTJ</Link>
              <Link to="/products?mbti=INTP" className="type-card">INTP</Link>
              <Link to="/products?mbti=ENTJ" className="type-card">ENTJ</Link>
              <Link to="/products?mbti=ENTP" className="type-card">ENTP</Link>
            </div>
          </div>
          
          <div className="personality-group">
            <h3>Diplomats</h3>
            <div className="types">
              <Link to="/products?mbti=INFJ" className="type-card">INFJ</Link>
              <Link to="/products?mbti=INFP" className="type-card">INFP</Link>
              <Link to="/products?mbti=ENFJ" className="type-card">ENFJ</Link>
              <Link to="/products?mbti=ENFP" className="type-card">ENFP</Link>
            </div>
          </div>
          
          <div className="personality-group">
            <h3>Sentinels</h3>
            <div className="types">
              <Link to="/products?mbti=ISTJ" className="type-card">ISTJ</Link>
              <Link to="/products?mbti=ISFJ" className="type-card">ISFJ</Link>
              <Link to="/products?mbti=ESTJ" className="type-card">ESTJ</Link>
              <Link to="/products?mbti=ESFJ" className="type-card">ESFJ</Link>
            </div>
          </div>
          
          <div className="personality-group">
            <h3>Explorers</h3>
            <div className="types">
              <Link to="/products?mbti=ISTP" className="type-card">ISTP</Link>
              <Link to="/products?mbti=ISFP" className="type-card">ISFP</Link>
              <Link to="/products?mbti=ESTP" className="type-card">ESTP</Link>
              <Link to="/products?mbti=ESFP" className="type-card">ESFP</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 