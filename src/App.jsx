import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import AuthForm from './components/AuthForm';

const products = [
  { id: 1, name: '두릅 파스타', desc: '향긋한 봄 내음이 가득한 오일 파스타', price: '14,500원', image: '/images/dureup_pasta.png' },
  { id: 2, name: '미나리 뇨끼', desc: '아삭한 미나리 페스토와 쫄깃한 감자 뇨끼', price: '16,000원', image: '/images/minari_gnocchi.png' },
  { id: 3, name: '표고 알리오올리오', desc: '진한 표고버섯의 풍미가 담긴 알리오올리오', price: '13,500원', image: '/images/pyogo_aglio.png' },
  { id: 4, name: '들기름 곤드레', desc: '고소한 들기름과 부드러운 곤드레 나물면', price: '15,000원', image: '/images/gondre_pasta.png' },
  { id: 5, name: '참나물 페스토', desc: '싱그러운 참나물로 만든 향긋한 페스토 파스타', price: '15,500원', image: '/images/chamnamul_pesto.png' }
];

const sideMenus = [
  { id: 6, name: '짭짤이 토마토 피클', desc: '새콤달콤 입맛을 돋우는 수제 피클', price: '4,500원', image: '/images/tomato_pickle.png' },
  { id: 7, name: '알타리 피클', desc: '아삭한 식감이 일품인 미니 무 피클', price: '4,500원', image: '/images/altari_pickle.png' }
];

function Header({ onLoginClick, session }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const userEmail = session?.user?.email;
  const displayName = userEmail ? userEmail.split('@')[0] : '';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#" className="logo">풀 담은 면</a>
        <nav className="nav-links">
          <a href="#story">Brand Story</a>
          <a href="#shop">Shop</a>
          <a href="#recipe">Recipe Guide</a>
          <a href="#review">Review</a>
          <a href="#community">Community</a>
        </nav>
        <div className="header-actions">
          {session ? (
            <>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-green-dark)', fontWeight: '500' }}>환영합니다, {displayName}님!</span>
              <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>로그아웃</button>
            </>
          ) : (
            <button className="btn btn-outline" onClick={onLoginClick}>로그인</button>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="/images/hero_banner_forest_pasta.png" alt="풀 담은 면 자연" />
      </div>
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title">자연을 담은 한 그릇,<br/>풀 담은 면</h1>
        <p className="hero-subtitle">식물성 식재료로 완성하는 건강하고 맛있는 파스타 밀키트</p>
        <a href="#shop" className="btn btn-primary">지금 주문하기</a>
      </div>
    </section>
  );
}

function SeasonalProducts() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="container">
        <h2 className="section-title">오늘의 계절 면</h2>
        <p className="section-subtitle">가장 신선한 제철 재료로 만든 특별한 파스타를 만나보세요.</p>
        
        <div className="slider-container">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="img-hover-zoom">
                <img src={product.image} alt={product.name} className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section id="story" className="section-padding brand-story">
      <div className="container">
        <h2 className="section-title" style={{ color: 'var(--color-ivory)', marginBottom: '40px' }}>우리의 이야기</h2>
        <div className="brand-story-text">
          <p>비워냄으로 채워지는 온전한 휴식의 시간.<br/><br/>
          '풀 담은 면'은 바쁜 일상 속에서 자연이 주는 위로를 식탁 위에 올립니다.<br/>
          자극적인 맛은 덜어내고, 식물성 재료 본연의 깊고 따뜻한 맛을 살렸습니다.<br/>
          여백이 있는 맛, 그러나 영양은 가득한 온전한 한 끼를 경험해보세요.</p>
        </div>
      </div>
    </section>
  );
}

function Shop() {
  return (
    <section id="shop" className="section-padding">
      <div className="container">
        <h2 className="section-title">Shop</h2>
        <p className="section-subtitle">건강한 식탁을 위한 다양한 밀키트</p>
        
        <h3 className="side-menu-header" style={{fontFamily: 'var(--font-serif)', color: 'var(--color-green-dark)'}}>
          <span>메인 요리</span>
        </h3>
        <div className="shop-grid">
          {products.map(product => (
            <div className="product-card" key={`shop-${product.id}`}>
              <div className="img-hover-zoom">
                <img src={product.image} alt={product.name} className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="side-menu-header" style={{fontFamily: 'var(--font-serif)', color: 'var(--color-green-dark)', marginTop: '80px'}}>
          <span>곁들임 메뉴</span>
        </h3>
        <div className="shop-grid">
          {sideMenus.map(menu => (
            <div className="product-card" key={`side-${menu.id}`}>
              <div className="img-hover-zoom">
                <img src={menu.image} alt={menu.name} className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{menu.name}</h3>
                <p className="product-desc">{menu.desc}</p>
                <p className="product-price">{menu.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">풀 담은 면</h2>
        <p className="modal-desc">건강한 식생활을 시작하세요.</p>
        
        <AuthForm />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">풀 담은 면</span>
            <p>식물성 식재료 기반 파스타 밀키트<br/>당신의 식탁에 자연을 배달합니다.</p>
          </div>
          <div className="footer-links">
            <div className="footer-link-group">
              <h4>고객센터</h4>
              <ul>
                <li><a href="#">공지사항</a></li>
                <li><a href="#">자주 묻는 질문</a></li>
                <li><a href="#">1:1 문의</a></li>
              </ul>
            </div>
            <div className="footer-link-group">
              <h4>법적고지</h4>
              <ul>
                <li><a href="#">이용약관</a></li>
                <li><a href="#">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} 풀 담은 면 (Pul Dameun Myeon). All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setIsLoginModalOpen(false); // Close modal on login success
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="app-container">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} session={session} />
      <main>
        <Hero />
        <SeasonalProducts />
        <BrandStory />
        <Shop />
      </main>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}

export default App;
