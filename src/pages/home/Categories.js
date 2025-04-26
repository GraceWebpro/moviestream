import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/Main.css';

const categories = [
  { name: "Action", image: "/images/action.jpg" },
  { name: "Comedy", image: "/images/comedy.jpg" },
  { name: "Drama", image: "/images/drama.jpg" },
  { name: "Sci-Fi", image: "/images/scifi.jpg" },
  { name: "Romance", image: "/images/romance.jpg" },
  { name: "Thriller", image: "/images/thriller.jpg" },
];

const CategoriesSection = () => {
  const sliderRef = useRef(null); // renamed for clarity
  const [showButtons, setShowButtons] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isScrolledLeft, setIsScrolledLeft] = useState(false);
  const [isScrolledRight, setIsScrolledRight] = useState(false);
  
  useEffect(() => {
    const checkScroll = () => {
      const container = sliderRef.current;
      if (container && container.scrollWidth > container.clientWidth) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    const slider = sliderRef.current;
    setIsScrolledLeft(slider.scrollLeft > 0);
    setIsScrolledRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth);
  };

  const slider = sliderRef.current;
  if (slider) {
    slider.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
  }

  return () => {
    if (slider) {
      slider.removeEventListener('scroll', handleScroll);
    }
  };
}, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <section className={`categories-wrapper ${isVisible ? "fade-in" : ""}`}>
      <h2 className="categories-title">Browse by Category</h2>

      <div className="categories-container">
  {showButtons && (
    <button onClick={scrollLeft} className={`scroll-btn left ${loaded ? 'show' : ''}`}>&lt;</button>
  )}
  
  {isScrolledLeft && <div className="fade-left" />}
  
  <div className="categories-slider" ref={sliderRef}>
    {categories.map((cat, index) => (
      <Link
        to={`/movies?category=${cat.name}`}
        key={cat.name}
        className={`category-card ${isVisible ? "fade-up" : ""}`}
        style={{ animationDelay: `${index * 0.15}s` }}
      >
        <div className="img-wrapper">
          <img src={cat.image} alt={cat.name} />
        </div>
        <div className="category-name">{cat.name}</div>
      </Link>
    ))}
  </div>
  
  {isScrolledRight && <div className="fade-right" />}

  {showButtons && (
    <button onClick={scrollRight} className={`scroll-btn right ${loaded ? 'show' : ''}`}>&gt;</button>
  )}
</div>

    </section>
  );
};

export default CategoriesSection;
