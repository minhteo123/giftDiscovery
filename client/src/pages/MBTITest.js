import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MBTITest.css';

const MBTITest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [mbtiType, setMbtiType] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);


  const questions = [
    // E vs I questions
    {
      id: 1,
      text: "At social gatherings, you:",
      options: [
        { text: "Interact with many, including strangers", type: "E" },
        { text: "Interact with a few, known to you", type: "I" }
      ]
    },
    {
      id: 2,
      text: "You tend to:",
      options: [
        { text: "Think out loud and speak freely", type: "E" },
        { text: "Think privately and speak selectively", type: "I" }
      ]
    },
    {
      id: 3,
      text: "After a long week, you prefer to:",
      options: [
        { text: "Go out with friends to recharge", type: "E" },
        { text: "Spend time alone to recharge", type: "I" }
      ]
    },
    {
      id: 4,
      text: "When working on projects, you prefer:",
      options: [
        { text: "Collaborative group work", type: "E" },
        { text: "Individual focused work", type: "I" }
      ]
    },
    // S vs N questions
    {
      id: 5,
      text: "You are more interested in:",
      options: [
        { text: "What is actual and present", type: "S" },
        { text: "What is possible and future-oriented", type: "N" }
      ]
    },
    {
      id: 6,
      text: "You prefer explanations that are:",
      options: [
        { text: "Concrete and literal", type: "S" },
        { text: "Figurative and metaphorical", type: "N" }
      ]
    },
    {
      id: 7,
      text: "You value more:",
      options: [
        { text: "Experience and practical solutions", type: "S" },
        { text: "Theories and innovative ideas", type: "N" }
      ]
    },
    {
      id: 8,
      text: "You are more drawn to:",
      options: [
        { text: "Details and facts", type: "S" },
        { text: "Patterns and possibilities", type: "N" }
      ]
    },
    // T vs F questions
    {
      id: 9,
      text: "When making decisions, you typically:",
      options: [
        { text: "Use logic and objective analysis", type: "T" },
        { text: "Consider people and special circumstances", type: "F" }
      ]
    },
    {
      id: 10,
      text: "You value more in yourself:",
      options: [
        { text: "Being competent and reasonable", type: "T" },
        { text: "Being authentic and compassionate", type: "F" }
      ]
    },
    {
      id: 11,
      text: "When giving feedback, you tend to be:",
      options: [
        { text: "Frank and straightforward", type: "T" },
        { text: "Tactful and encouraging", type: "F" }
      ]
    },
    {
      id: 12,
      text: "In conflicts, you focus more on:",
      options: [
        { text: "Finding the most logical solution", type: "T" },
        { text: "Maintaining harmony and understanding feelings", type: "F" }
      ]
    },
    // J vs P questions
    {
      id: 13,
      text: "You prefer to:",
      options: [
        { text: "Plan ahead and follow schedules", type: "J" },
        { text: "Be spontaneous and adapt as you go", type: "P" }
      ]
    },
    {
      id: 14,
      text: "Your workspace is usually:",
      options: [
        { text: "Organized and structured", type: "J" },
        { text: "Flexible and adaptable", type: "P" }
      ]
    },
    {
      id: 15,
      text: "You feel better when things are:",
      options: [
        { text: "Settled and decided", type: "J" },
        { text: "Open to change and possibilities", type: "P" }
      ]
    },
    {
      id: 16,
      text: "In your daily life, you prefer:",
      options: [
        { text: "To-do lists and clear priorities", type: "J" },
        { text: "Flexibility to respond to what happens", type: "P" }
      ]
    },
  ];

  useEffect(() => {
    // Update progress whenever current question changes
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion, questions.length]);

  const handleAnswer = (type) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: type
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateMBTI();
    }
  };

  const calculateMBTI = () => {
    setLoading(true);
    
    // Calculate MBTI type based on answers
    const counts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    Object.values(answers).forEach(type => {
      counts[type]++;
    });

    const type = [
      counts.E > counts.I ? 'E' : 'I',
      counts.S > counts.N ? 'S' : 'N',
      counts.T > counts.F ? 'T' : 'F',
      counts.J > counts.P ? 'J' : 'P'
    ].join('');

    // Simulate API call to get detailed results
    setTimeout(() => {
      setMbtiType(type);
      setShowResult(true);
      setLoading(false);
    }, 1500);
  };

  const getTypeDescription = (type) => {
    const descriptions = {
      'ISTJ': 'The Inspector - Practical, fact-minded, and reliable. You value tradition, security, and peaceful living.',
      'ISFJ': 'The Protector - Warm-hearted, conscientious, and cooperative. You are committed and steady in meeting your obligations.',
      'INFJ': 'The Counselor - Quietly forceful, creative, and highly principled. You have a clear sense of moral direction.',
      'INTJ': 'The Mastermind - Strategic, logical, and innovative. You have original minds and great drive for implementing your ideas.',
      'ISTP': 'The Craftsman - Tolerant, flexible, and practical problem-solver. You excel at analyzing situations objectively.',
      'ISFP': 'The Composer - Quiet, friendly, sensitive, and kind. You enjoy the present moment and are often artistic.',
      'INFP': 'The Healer - Idealistic, loyal, and curious about possibilities. You seek to understand people and help them fulfill their potential.',
      'INTP': 'The Architect - Analytical, detached, and objectively critical. You are driven to create logical explanations for everything.',
      'ESTP': 'The Dynamo - Energetic, action-oriented, and pragmatic. You are adaptable, resourceful, and focused on immediate results.',
      'ESFP': 'The Performer - Outgoing, friendly, and accepting. You love people and new experiences, finding joy in the present moment.',
      'ENFP': 'The Champion - Warmly enthusiastic, creative, and sociable. You see life as full of possibilities.',
      'ENTP': 'The Visionary - Quick, ingenious, and stimulating. You are adept at generating conceptual possibilities.',
      'ESTJ': 'The Supervisor - Practical, matter-of-fact, and realistic. You are decisive and focused on getting results efficiently.',
      'ESFJ': 'The Provider - Warmhearted, conscientious, and cooperative. You value harmony and cooperation.',
      'ENFJ': 'The Teacher - Warm, empathetic, responsive, and responsible. You are highly attuned to the emotions of others.',
      'ENTJ': 'The Commander - Frank, decisive, and strategic leader. You excel at logical reasoning and leadership.'
    };

    return descriptions[type] || 'Your personality type is unique and complex. To get a more detailed description, we recommend reading more about your type.';
  };

  const getTypeTraits = (type) => {
    const traits = {
      'ISTJ': ['Responsible', 'Organized', 'Loyal', 'Traditional', 'Practical', 'Logical', 'Detail-oriented', 'Dependable'],
      'ISFJ': ['Considerate', 'Loyal', 'Traditional', 'Detailed', 'Warm', 'Reliable', 'Patient', 'Supportive'],
      'INFJ': ['Insightful', 'Principled', 'Creative', 'Passionate', 'Altruistic', 'Complex', 'Empathetic', 'Determined'],
      'INTJ': ['Strategic', 'Independent', 'Innovative', 'Analytical', 'Determined', 'Private', 'Logical', 'Ambitious'],
      'ISTP': ['Logical', 'Adaptable', 'Observant', 'Practical', 'Self-contained', 'Spontaneous', 'Independent', 'Adventurous'],
      'ISFP': ['Artistic', 'Sensitive', 'Harmonious', 'Loyal', 'Adaptable', 'Observant', 'Gentle', 'Present-focused'],
      'INFP': ['Idealistic', 'Compassionate', 'Creative', 'Authentic', 'Open-minded', 'Adaptable', 'Dedicated', 'Curious'],
      'INTP': ['Analytical', 'Objective', 'Curious', 'Theoretical', 'Abstract', 'Logical', 'Inventive', 'Independent'],
      'ESTP': ['Energetic', 'Direct', 'Spontaneous', 'Practical', 'Observant', 'Risk-taking', 'Adaptable', 'Resourceful'],
      'ESFP': ['Enthusiastic', 'Social', 'Spontaneous', 'Practical', 'Observant', 'Supportive', 'Playful', 'Present-focused'],
      'ENFP': ['Enthusiastic', 'Creative', 'Sociable', 'Perceptive', 'Expressive', 'Optimistic', 'Flexible', 'Passionate'],
      'ENTP': ['Innovative', 'Entrepreneurial', 'Adaptable', 'Analytical', 'Outspoken', 'Quick-thinking', 'Theoretical', 'Debative'],
      'ESTJ': ['Organized', 'Efficient', 'Structured', 'Practical', 'Dependable', 'Traditional', 'Direct', 'Decisive'],
      'ESFJ': ['Supportive', 'Sociable', 'Organized', 'Practical', 'Loyal', 'Traditional', 'Cooperative', 'Caring'],
      'ENFJ': ['Charismatic', 'Inspiring', 'Supportive', 'Idealistic', 'Diplomatic', 'Organized', 'Appreciative', 'Compassionate'],
      'ENTJ': ['Strategic', 'Efficient', 'Decisive', 'Ambitious', 'Assertive', 'Direct', 'Logical', 'Structured']
    };

    return traits[type] || ['Unique', 'Complex', 'Thoughtful', 'Adaptable'];
  };

  const getGiftRecommendations = (type) => {
    const recommendations = {
      'ISTJ': [
        { name: 'Leather organizer', reason: 'Appeals to their practical nature and love of organization', priceRange: 'Medium' },
        { name: 'High-quality multi-tool', reason: 'Practical and durable, matching their appreciation for useful items', priceRange: 'Medium' },
        { name: 'Classic timepiece', reason: 'Reflects their traditional values and appreciation for reliability', priceRange: 'High' },
        { name: 'Premium stationery set', reason: 'Suits their detail-oriented approach to life and work', priceRange: 'Medium' },
        { name: 'Home security system', reason: 'Aligns with their desire for security and order', priceRange: 'High' }
      ],
      'ISFJ': [
        { name: 'Personalized photo album', reason: 'Connects with their sentimental nature and appreciation for memories', priceRange: 'Low' },
        { name: 'High-quality cookware', reason: 'Supports their nurturing tendencies and love of taking care of others', priceRange: 'Medium' },
        { name: 'Cozy home décor', reason: 'Creates comfort in their personal space, important to ISFJs', priceRange: 'Medium' },
        { name: 'Custom family tree print', reason: 'Celebrates their values of tradition and family connections', priceRange: 'Medium' },
        { name: 'Plant care subscription', reason: 'Appeals to their nurturing nature and attention to detail', priceRange: 'Medium' }
      ],
      'INFJ': [
        { name: 'Meaningful book on philosophy or psychology', reason: 'Engages their deep thinking and personal growth interests', priceRange: 'Low' },
        { name: 'Handcrafted journal', reason: 'Perfect for their reflective nature and desire to express complex thoughts', priceRange: 'Medium' },
        { name: 'Art with symbolic meaning', reason: 'Resonates with their appreciation for depth and meaning', priceRange: 'Medium' },
        { name: 'Meditation accessories', reason: 'Supports their reflective practices and inner peace', priceRange: 'Medium' },
        { name: 'Donation to a meaningful cause', reason: 'Aligns with their altruistic values and desire to make a difference', priceRange: 'Varies' }
      ],
      'INTJ': [
        { name: 'Strategic board game', reason: 'Challenges their analytical mind and strategic thinking', priceRange: 'Medium' },
        { name: 'Premium e-reader', reason: 'Efficient way to consume the knowledge they value', priceRange: 'High' },
        { name: 'High-quality noise-cancelling headphones', reason: 'Provides the solitude they need for deep thinking', priceRange: 'High' },
        { name: 'Smart home technology', reason: 'Appeals to their interest in efficiency and innovation', priceRange: 'High' },
        { name: 'Online course in a specialized topic', reason: 'Feeds their constant desire for competence and knowledge', priceRange: 'Medium' }
      ],
      'ISTP': [
        { name: 'High-quality tool set', reason: 'Perfect for their hands-on approach to problem-solving', priceRange: 'Medium' },
        { name: 'DIY electronics kit', reason: 'Engages their mechanical aptitude and desire to understand how things work', priceRange: 'Medium' },
        { name: 'Adventure sports equipment', reason: 'Supports their spontaneous side and love of action', priceRange: 'High' },
        { name: 'Specialized technical manual', reason: 'Appeals to their interest in practical knowledge', priceRange: 'Low' },
        { name: 'Custom pocket knife', reason: 'Combines practicality with craftsmanship they appreciate', priceRange: 'Medium' }
      ],
      'ISFP': [
        { name: 'Art supplies', reason: 'Nurtures their creative expression and artistic tendencies', priceRange: 'Medium' },
        { name: 'Handcrafted jewelry', reason: 'Appeals to their aesthetic appreciation and uniqueness', priceRange: 'Medium' },
        { name: 'Nature experience', reason: 'Connects with their love of beauty and sensory experiences', priceRange: 'Varies' },
        { name: 'Musical instrument', reason: 'Provides another channel for their natural creativity', priceRange: 'High' },
        { name: 'Artisanal food basket', reason: 'Delights their sensory appreciation and present-moment enjoyment', priceRange: 'Medium' }
      ],
      'INFP': [
        { name: 'Poetic or fantasy literature', reason: 'Engages their imagination and idealism', priceRange: 'Low' },
        { name: 'Handmade item with personal meaning', reason: 'Resonates with their value of authenticity and personal connection', priceRange: 'Varies' },
        { name: 'Creative writing course', reason: 'Nurtures their self-expression and creativity', priceRange: 'Medium' },
        { name: 'Ethical, sustainable fashion', reason: 'Aligns with their values and desire for meaning', priceRange: 'Medium' },
        { name: 'Donation to humanitarian cause', reason: 'Supports their idealistic nature and desire to help others', priceRange: 'Varies' }
      ],
      'INTP': [
        { name: 'Complex puzzle', reason: 'Challenges their logical mind and problem-solving abilities', priceRange: 'Medium' },
        { name: 'Book on theoretical concepts', reason: 'Feeds their hunger for abstract knowledge', priceRange: 'Low' },
        { name: 'Programming or robotics kit', reason: 'Engages their logical thinking and inventiveness', priceRange: 'Medium' },
        { name: 'Scientific gadget', reason: 'Appeals to their curiosity about how things work', priceRange: 'Varies' },
        { name: 'Online course in logic or philosophy', reason: 'Stimulates their theoretical interests', priceRange: 'Medium' }
      ],
      'ESTP': [
        { name: 'Experience gift (skydiving, racing)', reason: 'Perfect for their thrill-seeking and active nature', priceRange: 'High' },
        { name: 'Latest tech gadget', reason: 'Appeals to their love of novelty and practical tools', priceRange: 'High' },
        { name: 'High-quality sports equipment', reason: 'Supports their active lifestyle and physical capabilities', priceRange: 'High' },
        { name: 'Luxury accessories', reason: 'Matches their appreciation for style and sensory pleasures', priceRange: 'High' },
        { name: 'Outdoor adventure gear', reason: 'Enables their spontaneous adventures and physical activities', priceRange: 'Medium' }
      ],
      'ESFP': [
        { name: 'Experience gift (concert, show)', reason: 'Perfect for their love of experiences and social enjoyment', priceRange: 'Medium' },
        { name: 'Trendy fashion item', reason: 'Appeals to their style consciousness and present enjoyment', priceRange: 'Medium' },
        { name: 'Party games', reason: 'Supports their social nature and love of fun', priceRange: 'Low' },
        { name: 'Gourmet food basket', reason: 'Aligns with their sensory enjoyment and love of sharing', priceRange: 'Medium' },
        { name: 'Karaoke machine', reason: 'Perfect for their performative side and social gatherings', priceRange: 'Medium' }
      ],
      'ENFP': [
        { name: 'Creative experience workshop', reason: 'Engages their enthusiasm for new ideas and experiences', priceRange: 'Medium' },
        { name: 'Inspirational book', reason: 'Feeds their imagination and optimistic outlook', priceRange: 'Low' },
        { name: 'Unique artwork', reason: 'Appeals to their appreciation for novelty and creative expression', priceRange: 'Medium' },
        { name: 'Travel accessories', reason: 'Supports their love of new experiences and possibilities', priceRange: 'Medium' },
        { name: 'Personalized keepsake', reason: 'Connects with their value for personal meaning and relationships', priceRange: 'Varies' }
      ],
      'ENTP': [
        { name: 'Intellectual debate game', reason: 'Perfect for their love of mental sparring and ideas', priceRange: 'Low' },
        { name: 'Innovative tech gadget', reason: 'Appeals to their interest in possibilities and novel solutions', priceRange: 'High' },
        { name: 'Book on revolutionary ideas', reason: 'Stimulates their interest in new concepts and theories', priceRange: 'Low' },
        { name: 'Unusual experience gift', reason: 'Provides the novelty and challenge they enjoy', priceRange: 'Varies' },
        { name: 'Entrepreneurial course', reason: 'Nurtures their innovative spirit and strategic thinking', priceRange: 'Medium' }
      ],
      'ESTJ': [
        { name: 'High-quality business accessory', reason: 'Reflects their professional values and practical nature', priceRange: 'Medium' },
        { name: 'Premium planner or organizer', reason: 'Supports their structured approach to life', priceRange: 'Medium' },
        { name: 'Traditional watch', reason: 'Appeals to their appreciation for tradition and reliability', priceRange: 'High' },
        { name: 'Professional development course', reason: 'Aligns with their value of competence and achievement', priceRange: 'Medium' },
        { name: 'Home improvement tools', reason: 'Practical and useful, matching their pragmatic outlook', priceRange: 'Medium' }
      ],
      'ESFJ': [
        { name: 'Family photo session', reason: 'Celebrates their value of relationships and connections', priceRange: 'Medium' },
        { name: 'Hosting or entertaining items', reason: 'Supports their love of bringing people together', priceRange: 'Medium' },
        { name: 'Spa day experience', reason: 'Provides appreciation for their nurturing of others', priceRange: 'Medium' },
        { name: 'Personalized home décor', reason: 'Creates harmony in their environment, important to ESFJs', priceRange: 'Medium' },
        { name: 'Traditional cookbook', reason: 'Connects with their nurturing nature and practical skills', priceRange: 'Low' }
      ],
      'ENFJ': [
        { name: 'Personal development course', reason: 'Nurtures their interest in human potential and growth', priceRange: 'Medium' },
        { name: 'Meaningful memento', reason: 'Symbolizes the relationships they value highly', priceRange: 'Medium' },
        { name: 'Book on leadership or communication', reason: 'Enhances their natural strengths and interests', priceRange: 'Low' },
        { name: 'Charitable donation', reason: 'Aligns with their humanitarian values', priceRange: 'Varies' },
        { name: 'Quality time experience', reason: 'Fulfills their desire for meaningful connection', priceRange: 'Varies' }
      ],
      'ENTJ': [
        { name: 'Leadership or business book', reason: 'Supports their ambition and desire for competence', priceRange: 'Low' },
        { name: 'Executive-quality accessory', reason: 'Reflects their appreciation for quality and success', priceRange: 'High' },
        { name: 'Strategic planning tools', reason: 'Enhances their natural organizational abilities', priceRange: 'Medium' },
        { name: 'Professional development course', reason: 'Furthers their goals and competence', priceRange: 'Medium' },
        { name: 'Time management system', reason: 'Supports their efficiency and productivity values', priceRange: 'Medium' }
      ]
    };

    return recommendations[type] || [
      { name: 'Gift card', reason: 'Allows them to choose something that matches their unique preferences', priceRange: 'Varies' },
      { name: 'Books', reason: 'Provides knowledge and entertainment that can be tailored to interests', priceRange: 'Medium' },
      { name: 'Tech gadgets', reason: 'Useful in today\'s digital world for almost everyone', priceRange: 'High' }
    ];
  };

  const navigateToProducts = (type) => {
    // Ideally, this would navigate to a filtered product list based on MBTI type
    navigate(`/products?mbti=${type}`);
  };

  if (loading) {
    return (
      <div className="mbti-container">
        <div className="mbti-test loading-screen">
          <h2>Analyzing Your Answers...</h2>
          <div className="loading-spinner"></div>
          <p>Calculating your personality type and finding the perfect gift recommendations for you.</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="mbti-container">
        <div className="mbti-result">
          <h2>Your MBTI Type: {mbtiType}</h2>
          <p className="type-description">{getTypeDescription(mbtiType)}</p>
          
          <div className="personality-traits">
            <h3>Your Key Traits</h3>
            <div className="traits-list">
              {getTypeTraits(mbtiType).map((trait, index) => (
                <span key={index} className="trait-tag">{trait}</span>
              ))}
            </div>
          </div>
          
          <div className="recommendations">
            <h3>Recommended Gifts for {mbtiType}</h3>
            <div className="gift-recommendations">
              {getGiftRecommendations(mbtiType).map((gift, index) => (
                <div key={index} className="gift-card">
                  <h4>{gift.name}</h4>
                  <p className="gift-reason">{gift.reason}</p>
                  <p className="gift-price">Price range: {gift.priceRange}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="result-actions">
            <button 
              className="btn primary"
              //onClick={() => navigateToProducts(mbtiType)}
            >
              Browse Recommended Gifts
            </button>
            <button 
              className="btn secondary"
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setShowResult(false);
                setMbtiType('');
              }}
            >
              Retake Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mbti-container">
      <div className="mbti-test">
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="question-container">
          <h2>Question {currentQuestion + 1} of {questions.length}</h2>
          <p className="question-text">{questions[currentQuestion].text}</p>
          
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${answers[currentQuestion] === option.type ? 'selected' : ''}`}
                onClick={() => handleAnswer(option.type)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBTITest;