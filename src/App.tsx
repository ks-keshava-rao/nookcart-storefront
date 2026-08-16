import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Box,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CreditCard,
  Download,
  Heart,
  Headphones,
  HelpCircle,
  House,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Truck,
  User,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type View = "home" | "catalog" | "product" | "cart" | "account" | "orders";

const products = [
  {
    id: 1,
    name: "AeroTune Studio Headphones",
    category: "Audio",
    price: 7999,
    oldPrice: 10999,
    rating: 4.7,
    reviews: 2384,
    badge: "Best seller",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    tint: "mint",
  },
  {
    id: 2,
    name: "CloudForm Everyday Sneakers",
    category: "Footwear",
    price: 3499,
    oldPrice: 4999,
    rating: 4.5,
    reviews: 986,
    badge: "30% off",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    tint: "peach",
  },
  {
    id: 3,
    name: "Nori Skin Ritual Set",
    category: "Beauty",
    price: 1899,
    oldPrice: 2399,
    rating: 4.8,
    reviews: 621,
    badge: "New arrival",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
    tint: "cream",
  },
  {
    id: 4,
    name: "Orbit Minimal Watch",
    category: "Accessories",
    price: 5299,
    oldPrice: 6499,
    rating: 4.6,
    reviews: 754,
    badge: "Limited deal",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    tint: "blue",
  },
  {
    id: 5,
    name: "Mellow Lounge Chair",
    category: "Home",
    price: 12490,
    oldPrice: 15990,
    rating: 4.4,
    reviews: 319,
    badge: "Editor pick",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85",
    tint: "lavender",
  },
  {
    id: 6,
    name: "Field Notes Travel Pack",
    category: "Lifestyle",
    price: 1299,
    oldPrice: 1699,
    rating: 4.7,
    reviews: 441,
    badge: "Fresh drop",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
    tint: "sand",
  },
];

const categories = [
  ["Audio", "Headphones", "🎧"],
  ["Fashion", "Trending fits", "👟"],
  ["Beauty", "Self care", "🧴"],
  ["Home", "Better spaces", "🪑"],
  ["Mobiles", "Smart tech", "📱"],
  ["Grocery", "Daily needs", "🥑"],
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function Rating({ value, count }: { value: number; count: number }) {
  return (
    <div className="rating" aria-label={`${value} out of 5 stars, ${count} reviews`}>
      <span><Star size={13} fill="currentColor" /> {value}</span>
      <b>({count.toLocaleString("en-IN")})</b>
    </div>
  );
}

function ProductCard({ product, liked, onLike, onOpen }: { product: (typeof products)[number]; liked: boolean; onLike: () => void; onOpen: () => void }) {
  return (
    <article className="product-card">
      <div className={`product-media ${product.tint}`}>
        <button className={`heart-button ${liked ? "active" : ""}`} onClick={onLike} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}>
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
        <button className="media-button" onClick={onOpen} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} />
        </button>
        <span className="product-badge">{product.badge}</span>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <button className="product-name" onClick={onOpen}>{product.name}</button>
        <Rating value={product.rating} count={product.reviews} />
        <div className="price-row">
          <strong>{money(product.price)}</strong>
          <del>{money(product.oldPrice)}</del>
          <span>{Math.round((1 - product.price / product.oldPrice) * 100)}% off</span>
        </div>
        <p className="delivery"><Truck size={14} /> Free delivery by tomorrow</p>
      </div>
    </article>
  );
}

function Header({ view, setView, cartCount }: { view: View; setView: (view: View) => void; cartCount: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span><MapPin size={14} /> Deliver to Bengaluru 560001</span>
          <div><span>Download app</span><span>Help centre</span><span>Track order</span></div>
        </div>
      </div>
      <header className="main-header">
        <div className="container header-inner">
          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"><Menu /></button>
          <button className="brand" onClick={() => setView("home")} aria-label="NookCart home">
            <span className="brand-mark"><ShoppingBag size={21} /></span><span>Nook<span>Cart</span></span>
          </button>
          <label className="search-box">
            <span className="search-category">All <ChevronDown size={14} /></span>
            <input placeholder="Search products, categories and brands" aria-label="Search products" />
            <button aria-label="Search" onClick={() => setView("catalog")}><Search size={20} /></button>
          </label>
          <nav className="header-actions" aria-label="Account navigation">
            <button onClick={() => setView("account")} className={view === "account" ? "active" : ""}><CircleUserRound /><span><small>Hello, Keshav</small>Account</span></button>
            <button onClick={() => setView("orders")} className={view === "orders" ? "active" : ""}><Box /><span><small>Returns</small>& Orders</span></button>
            <button onClick={() => setView("cart")} className={view === "cart" ? "active cart-link" : "cart-link"}><ShoppingCart /><i>{cartCount}</i><span>Cart</span></button>
          </nav>
        </div>
        <nav className={`category-nav ${mobileOpen ? "open" : ""}`} aria-label="Shop categories">
          <div className="container category-nav-inner">
            <button onClick={() => setView("catalog")}><Menu size={17} /> All categories</button>
            <button onClick={() => setView("catalog")}>Fresh</button>
            <button onClick={() => setView("catalog")}>Mobiles</button>
            <button onClick={() => setView("catalog")}>Fashion</button>
            <button onClick={() => setView("catalog")}>Electronics</button>
            <button onClick={() => setView("catalog")}>Home & Kitchen</button>
            <button onClick={() => setView("catalog")}>Beauty</button>
            <button className="deal-link" onClick={() => setView("catalog")}><Zap size={15} /> Today&apos;s deals</button>
          </div>
        </nav>
      </header>
    </>
  );
}

function ServiceStrip() {
  return (
    <div className="service-strip container">
      <div><Truck /><span><b>Free delivery</b><small>On orders above ₹499</small></span></div>
      <div><RotateCcw /><span><b>7-day returns</b><small>Easy doorstep returns</small></span></div>
      <div><ShieldCheck /><span><b>Secure payments</b><small>100% protected checkout</small></span></div>
      <div><Headphones /><span><b>Here to help</b><small>Support from 8am–10pm</small></span></div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, action, onClick }: { eyebrow?: string; title: string; action?: string; onClick?: () => void }) {
  return (
    <div className="section-heading">
      <div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2></div>
      {action && <button onClick={onClick}>{action} <ArrowRight size={17} /></button>}
    </div>
  );
}

function ProductGrid({ liked, toggleLike, setView, limit = 4 }: { liked: number[]; toggleLike: (id: number) => void; setView: (view: View) => void; limit?: number }) {
  return <div className="product-grid">{products.slice(0, limit).map(product => <ProductCard key={product.id} product={product} liked={liked.includes(product.id)} onLike={() => toggleLike(product.id)} onOpen={() => setView("product")} />)}</div>;
}

function HomeView({ liked, toggleLike, setView }: { liked: number[]; toggleLike: (id: number) => void; setView: (view: View) => void }) {
  return (
    <main>
      <section className="hero-wrap">
        <div className="container hero-grid">
          <div className="hero-main">
            <div className="hero-copy">
              <span className="eyebrow"><Sparkles size={15} /> Fresh finds, less spend</span>
              <h1>Upgrade your everyday.</h1>
              <p>Thoughtfully picked essentials for work, home and everything in between.</p>
              <div className="hero-actions"><button className="primary" onClick={() => setView("catalog")}>Shop new arrivals <ArrowRight size={17} /></button><button className="secondary" onClick={() => setView("catalog")}>Explore deals</button></div>
              <div className="hero-proof"><span><BadgeCheck size={16} /> Verified quality</span><span><Truck size={16} /> Fast delivery</span></div>
            </div>
            <div className="hero-visual">
              <div className="halo" />
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1100&q=90" alt="Premium wireless headphones" />
              <div className="floating-card"><span>Sound, refined</span><strong>AeroTune Studio</strong><small>From ₹7,999</small></div>
            </div>
          </div>
          <div className="promo-stack">
            <article className="mini-promo peach"><span>BEAUTY EDIT</span><h3>Glow starts here.</h3><p>Up to 35% off skincare</p><button onClick={() => setView("catalog")}>Shop beauty <ChevronRight size={16} /></button></article>
            <article className="mini-promo navy"><span>HOME RESET</span><h3>Calm corners.</h3><p>Furniture from ₹899</p><button onClick={() => setView("catalog")}>Shop home <ChevronRight size={16} /></button></article>
          </div>
        </div>
      </section>
      <ServiceStrip />
      <section className="section container">
        <SectionHeading eyebrow="SHOP YOUR WAY" title="Popular categories" action="View all" onClick={() => setView("catalog")} />
        <div className="category-grid">{categories.map(([name, sub, emoji]) => <button key={name} onClick={() => setView("catalog")}><span>{emoji}</span><b>{name}</b><small>{sub}</small></button>)}</div>
      </section>
      <section className="section container">
        <SectionHeading eyebrow="TRENDING NOW" title="Most-loved picks" action="Shop all" onClick={() => setView("catalog")} />
        <ProductGrid liked={liked} toggleLike={toggleLike} setView={setView} />
      </section>
      <section className="container deal-banner">
        <div><span className="eyebrow"><Clock3 size={15} /> Ends tonight</span><h2>Deal drop: up to 50% off.</h2><p>Curated tech, fashion and home essentials at limited-time prices.</p><button className="primary" onClick={() => setView("catalog")}>See all deals</button></div>
        <div className="deal-stat"><strong>50%</strong><span>OFF</span><small>selected styles</small></div>
      </section>
      <section className="section container">
        <SectionHeading eyebrow="JUST LANDED" title="New and noteworthy" action="View new arrivals" onClick={() => setView("catalog")} />
        <ProductGrid liked={liked} toggleLike={toggleLike} setView={setView} limit={4} />
      </section>
      <section className="newsletter">
        <div className="container newsletter-inner"><div><span>NOOK NOTES</span><h2>Good finds. Zero noise.</h2><p>Weekly edits, useful guides and private offers.</p></div><form onSubmit={e => e.preventDefault()}><input type="email" placeholder="Email address" aria-label="Email address" /><button className="primary">Join the list</button></form></div>
      </section>
    </main>
  );
}

function CatalogView({ liked, toggleLike, setView }: { liked: number[]; toggleLike: (id: number) => void; setView: (view: View) => void }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <main className="container page-shell">
      <div className="breadcrumbs"><button onClick={() => setView("home")}>Home</button><ChevronRight size={14} /><span>All products</span></div>
      <div className="catalog-title"><div><span>CURATED FOR EVERYDAY</span><h1>Shop all products</h1><p>124 thoughtful finds across home, style, tech and beauty.</p></div><button className="filter-mobile" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={18} /> Filters</button></div>
      <div className="catalog-toolbar"><span><b>124</b> products</span><div><label>Sort by</label><button>Featured <ChevronDown size={16} /></button></div></div>
      <div className="catalog-layout">
        <aside className={`filters ${filtersOpen ? "open" : ""}`}>
          <div className="filter-title"><b>Filters</b><button onClick={() => setFiltersOpen(false)}><X size={18} /></button></div>
          {[
            ["Category", ["Audio", "Fashion", "Beauty", "Home & living", "Electronics"]],
            ["Price", ["Under ₹2,000", "₹2,000 – ₹5,000", "₹5,000 – ₹10,000", "Above ₹10,000"]],
            ["Customer rating", ["4★ & above", "3★ & above"]],
            ["Delivery", ["Get it tomorrow", "Free delivery"]],
          ].map(([title, values]) => <div className="filter-group" key={title as string}><h3>{title as string}<ChevronDown size={16} /></h3>{(values as string[]).map((value, index) => <label key={value}><input type="checkbox" defaultChecked={index === 0 && title === "Customer rating"} /><span>{value}</span></label>)}</div>)}
          <button className="secondary full">Clear all filters</button>
        </aside>
        <div className="catalog-results"><div className="active-filters"><span>4★ & above <X size={13} /></span><span>Free delivery <X size={13} /></span><button>Clear all</button></div><ProductGrid liked={liked} toggleLike={toggleLike} setView={setView} limit={6} /></div>
      </div>
    </main>
  );
}

function ProductView({ setView, addToCart, liked, toggleLike }: { setView: (view: View) => void; addToCart: () => void; liked: number[]; toggleLike: (id: number) => void }) {
  const [color, setColor] = useState("Midnight");
  const [thumb, setThumb] = useState(0);
  const images = [products[0].image, "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=85"];
  return (
    <main className="container page-shell">
      <div className="breadcrumbs"><button onClick={() => setView("home")}>Home</button><ChevronRight size={14} /><button onClick={() => setView("catalog")}>Audio</button><ChevronRight size={14} /><span>Headphones</span></div>
      <section className="product-detail">
        <div className="gallery"><div className="thumbs">{images.map((image, i) => <button key={image} className={thumb === i ? "active" : ""} onClick={() => setThumb(i)}><img src={image} alt={`Headphones view ${i + 1}`} /></button>)}</div><div className="main-image"><span className="product-badge">Best seller</span><img src={images[thumb]} alt="AeroTune Studio Headphones" /><button className="zoom">Hover to zoom</button></div></div>
        <div className="product-copy">
          <span className="product-category">AEROTUNE · SIGNATURE SERIES</span><h1>AeroTune Studio Headphones</h1><p className="product-lead">Immersive wireless sound, feather-soft comfort and 45 hours of battery life—made for deep-focus days.</p><Rating value={4.7} count={2384} />
          <div className="detail-price"><strong>₹7,999</strong><del>₹10,999</del><span>Save ₹3,000</span></div><p className="tax-note">Inclusive of all taxes · EMI from ₹388/month</p>
          <div className="choice-block"><div><b>Colour</b><span>{color}</span></div><div className="swatches">{[["Midnight","#152535"],["Oat","#ded5c5"],["Sage","#708b7f"]].map(([name, hex]) => <button key={name} className={color === name ? "active" : ""} style={{"--swatch": hex} as React.CSSProperties} onClick={() => setColor(name)} aria-label={name}><span /></button>)}</div></div>
          <div className="stock-card"><PackageCheck /><div><b>In stock</b><p>Order in 2h 18m for delivery <strong>tomorrow</strong></p><button>Change delivery location</button></div></div>
          <div className="buy-actions"><button className="primary" onClick={() => { addToCart(); setView("cart"); }}><Zap size={18} /> Buy now</button><button className="secondary" onClick={addToCart}><ShoppingCart size={18} /> Add to cart</button><button className={`wish-detail ${liked.includes(1) ? "active" : ""}`} onClick={() => toggleLike(1)} aria-label="Toggle wishlist"><Heart fill={liked.includes(1) ? "currentColor" : "none"} /></button></div>
          <div className="benefits"><span><ShieldCheck /> 1-year warranty</span><span><RotateCcw /> 7-day returns</span><span><BadgeCheck /> Genuine product</span></div>
        </div>
      </section>
      <section className="detail-panels"><article><span>01</span><h3>Silence, on demand.</h3><p>Adaptive noise cancellation responds to your surroundings in real time.</p></article><article><span>02</span><h3>Built for long listens.</h3><p>Memory foam cushions and a balanced headband keep pressure low.</p></article><article><span>03</span><h3>Charge less. Play more.</h3><p>Up to 45 hours playback. Ten-minute charge gives five hours.</p></article></section>
      <section className="reviews-section"><SectionHeading eyebrow="VERIFIED REVIEWS" title="Loved by listeners" /><div className="review-grid"><div className="rating-summary"><strong>4.7</strong><div><div className="big-stars">★★★★★</div><p>Based on 2,384 reviews</p></div></div><div className="review-card"><Rating value={5} count={1} /><h3>“Comfort that actually lasts.”</h3><p>I wear these through an entire workday. Sound is detailed, ANC is excellent, and they never feel heavy.</p><span>Rhea M. · Verified buyer</span></div></div></section>
    </main>
  );
}

function CartView({ qty, setQty, setView }: { qty: number; setQty: (n: number) => void; setView: (view: View) => void }) {
  const [coupon, setCoupon] = useState(false);
  const subtotal = products[0].price * qty;
  const discount = coupon ? 500 : 0;
  return (
    <main className="container page-shell checkout-page">
      <div className="checkout-head"><button onClick={() => setView("catalog")}><ArrowLeft size={18} /> Continue shopping</button><span><ShieldCheck size={17} /> Secure checkout</span></div>
      <div className="checkout-title"><span>YOUR BAG</span><h1>Ready when you are.</h1><p>{qty} item · Delivery to Bengaluru 560001</p></div>
      <div className="checkout-layout">
        <div className="cart-column">
          <article className="cart-item"><div className="cart-image"><img src={products[0].image} alt={products[0].name} /></div><div className="cart-info"><span>Audio</span><h2>{products[0].name}</h2><p>Colour: Midnight</p><b>In stock · Free delivery tomorrow</b><div className="cart-controls"><div><button onClick={() => setQty(Math.max(1,qty-1))}><Minus size={15} /></button><span>{qty}</span><button onClick={() => setQty(qty+1)}><Plus size={15} /></button></div><button>Move to wishlist</button><button>Remove</button></div></div><div className="cart-price"><strong>{money(subtotal)}</strong><del>{money(products[0].oldPrice * qty)}</del><span>27% off</span></div></article>
          <section className="address-card"><div className="address-title"><span><MapPin /></span><div><b>Deliver to</b><h3>Keshav Rao · Home</h3></div><button>Change</button></div><p>12, Richmond Road, Bengaluru, Karnataka 560001</p><div className="delivery-slot"><Check size={17} /><div><b>Free delivery tomorrow</b><small>Order within 2 hours 18 minutes</small></div></div></section>
          <section className="payment-options"><h2>Payment method</h2>{[[CreditCard,"UPI / Cards / Net banking","Fast, secure online payment"],[WalletCards,"Cash on delivery","Pay when your order arrives"]].map(([Icon,title,sub],i) => {const C=Icon as typeof CreditCard;return <label key={title as string}><input type="radio" name="payment" defaultChecked={i===0} /><C /><span><b>{title as string}</b><small>{sub as string}</small></span></label>})}</section>
        </div>
        <aside className="summary-card"><h2>Order summary</h2><label className="coupon"><input placeholder="Coupon code" /><button onClick={() => setCoupon(true)}>{coupon ? "Applied" : "Apply"}</button></label>{coupon && <p className="coupon-success"><Check size={14} /> NOOK500 applied</p>}<dl><div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div><dt>Discount</dt><dd className="saving">−{money(2199 + discount)}</dd></div><div><dt>Shipping</dt><dd className="saving">FREE</dd></div><div><dt>GST (included)</dt><dd>{money(1220)}</dd></div></dl><div className="summary-total"><span>Total</span><strong>{money(subtotal-discount)}</strong></div><button className="primary full" onClick={() => setView("orders")}>Place order securely <ArrowRight size={17} /></button><p className="secure-note"><ShieldCheck size={15} /> Encrypted and protected payment</p><div className="accepted"><span>UPI</span><span>VISA</span><span>RuPay</span><span>COD</span></div></aside>
      </div>
    </main>
  );
}

function AccountView({ setView, liked, toggleLike }: { setView: (view: View) => void; liked: number[]; toggleLike: (id: number) => void }) {
  return (
    <main className="container page-shell account-page">
      <div className="account-hero"><div className="avatar">KR</div><div><span>WELCOME BACK</span><h1>Keshav Rao</h1><p>kskrao2192000@gmail.com · +91 98••• ••210</p></div><button className="secondary">Edit profile</button></div>
      <div className="account-layout"><aside className="account-nav">{[[User,"Profile"],[MapPin,"Saved addresses"],[Box,"My orders"],[Heart,"Wishlist"],[CreditCard,"Payments"],[HelpCircle,"Help & support"]].map(([Icon,label],i)=>{const C=Icon as typeof User;return <button key={label as string} className={i===0?"active":""} onClick={() => label==="My orders"&&setView("orders")}><C size={18}/>{label as string}<ChevronRight size={16}/></button>})}<button className="signout">Sign out</button></aside><div className="account-content"><section><div className="content-head"><div><span>PROFILE DETAILS</span><h2>Your information</h2></div><button>Edit</button></div><div className="detail-grid"><div><small>Full name</small><b>Keshav Rao</b></div><div><small>Email</small><b>kskrao2192000@gmail.com</b><span className="verified"><Check size={12}/> Verified</span></div><div><small>Mobile</small><b>+91 98••• ••210</b><span className="verified"><Check size={12}/> Verified</span></div><div><small>Date of birth</small><b>12 October 1998</b></div></div></section><section><div className="content-head"><div><span>SAVED ADDRESS</span><h2>Home</h2></div><button>Edit</button></div><p className="address-line">12, Richmond Road, Bengaluru, Karnataka 560001</p></section><section><SectionHeading eyebrow="YOUR SHORTLIST" title="Wishlist" action="View all" /><div className="mini-products">{products.slice(0,3).map(p=><ProductCard key={p.id} product={p} liked={liked.includes(p.id)} onLike={()=>toggleLike(p.id)} onOpen={()=>setView("product")}/>)}</div></section></div></div>
    </main>
  );
}

function OrdersView({ setView }: { setView: (view: View) => void }) {
  return (
    <main className="container page-shell orders-page">
      <div className="orders-head"><div><span>ORDERS & RETURNS</span><h1>Everything on track.</h1><p>Manage deliveries, downloads, cancellations and returns.</p></div><label><Search size={17}/><input placeholder="Search your orders" /></label></div>
      <div className="order-tabs"><button className="active">All orders <span>6</span></button><button>In progress <span>1</span></button><button>Delivered <span>4</span></button><button>Returns <span>1</span></button></div>
      <article className="order-card current"><div className="order-meta"><div><small>ORDER PLACED</small><b>14 August 2026</b></div><div><small>TOTAL</small><b>₹7,999</b></div><div><small>ORDER ID</small><b>#NC-482910</b></div><button><Download size={15}/> Invoice</button></div><div className="order-body"><img src={products[0].image} alt={products[0].name}/><div className="order-product"><span className="status-pill"><Truck size={14}/> Out for delivery</span><h2>{products[0].name}</h2><p>Colour: Midnight · Qty 1</p><button onClick={()=>setView("product")}>View product</button></div><div className="delivery-card"><small>ARRIVING TODAY</small><h3>By 9:00 PM</h3><div className="progress"><span className="done"/><span className="done"/><span className="done"/><span/></div><div className="progress-labels"><small>Confirmed</small><small>Shipped</small><small>Out for delivery</small><small>Delivered</small></div><button className="secondary full"><MapPin size={16}/> Track live order</button></div></div><div className="order-actions"><button>Cancel order</button><button>Need help?</button></div></article>
      <article className="order-card"><div className="order-meta"><div><small>ORDER PLACED</small><b>2 August 2026</b></div><div><small>TOTAL</small><b>₹3,499</b></div><div><small>ORDER ID</small><b>#NC-479201</b></div><button><Download size={15}/> Invoice</button></div><div className="order-body compact"><img src={products[1].image} alt={products[1].name}/><div className="order-product"><span className="status-pill delivered"><Check size={14}/> Delivered 5 August</span><h2>{products[1].name}</h2><p>Size: UK 8 · Colour: Red</p></div><div className="past-actions"><button className="primary">Buy again</button><button className="secondary">Return or exchange</button><button>Write a review</button></div></div></article>
      <section className="recovery-panel"><div className="recovery-icon"><RotateCcw/></div><div><span>RETURN IN PROGRESS</span><h2>Nori Skin Ritual Set</h2><p>Pickup completed. Refund of ₹1,899 will reach your UPI account by 17 August.</p></div><button className="secondary">View return details</button></section>
    </main>
  );
}

function Footer({ setView }: { setView: (view: View) => void }) {
  return <footer><div className="container footer-grid"><div><button className="brand footer-brand" onClick={()=>setView("home")}><span className="brand-mark"><ShoppingBag size={21}/></span><span>Nook<span>Cart</span></span></button><p>Better everyday finds, thoughtfully brought together.</p></div>{[["Shop",["New arrivals","Best sellers","Today’s deals","Gift cards"]],["Help",["Track order","Returns","Payments","Contact us"]],["About",["Our story","Careers","Sustainability","Privacy"]]].map(([title,links])=><div key={title as string}><h3>{title as string}</h3>{(links as string[]).map(link=><button key={link} onClick={()=>setView(link==="Track order"?"orders":"catalog")}>{link}</button>)}</div>)}</div><div className="container footer-bottom"><span>© 2026 NookCart. Designed for demonstration.</span><span>India · English · INR</span></div></footer>;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [liked, setLiked] = useState<number[]>([3]);
  const [cartCount, setCartCount] = useState(1);
  const [qty, setQty] = useState(1);
  const toggleLike = (id: number) => setLiked(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const addToCart = () => setCartCount(count => count + 1);
  const content = useMemo(() => {
    if (view === "catalog") return <CatalogView liked={liked} toggleLike={toggleLike} setView={setView}/>;
    if (view === "product") return <ProductView setView={setView} addToCart={addToCart} liked={liked} toggleLike={toggleLike}/>;
    if (view === "cart") return <CartView qty={qty} setQty={setQty} setView={setView}/>;
    if (view === "account") return <AccountView setView={setView} liked={liked} toggleLike={toggleLike}/>;
    if (view === "orders") return <OrdersView setView={setView}/>;
    return <HomeView liked={liked} toggleLike={toggleLike} setView={setView}/>;
  }, [view, liked, qty]);
  return <div className="site"><Header view={view} setView={setView} cartCount={cartCount}/>{content}<Footer setView={setView}/></div>;
}
