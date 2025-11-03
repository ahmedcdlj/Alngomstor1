(() => {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const i18n = {
        ar: {
            brand: 'Bilingual Store',
            'nav.home': 'الرئيسية',
            'nav.shop': 'المتجر',
            'nav.deals': 'العروض',
            'nav.contact': 'تواصل',
            'hero.title': 'تسوق بذكاء. تجربة سلسة.',
            'hero.subtitle': 'واجهات احترافية، سرعة، وتعدد لغات.',
            'hero.ctaShop': 'تسوق الآن',
            'hero.ctaDeals': 'اكتشف العروض',
            'search.placeholder': 'ابحث عن منتج...',
            'filters.all': 'كل الأقسام',
            'sort.popular': 'الأكثر شهرة',
            'sort.priceAsc': 'السعر: من الأقل للأعلى',
            'sort.priceDesc': 'السعر: من الأعلى للأقل',
            'sort.new': 'الأحدث',
            'product.details': 'تفاصيل',
            'product.addToCart': 'أضف للسلة',
            'cart.title': 'سلة التسوق',
            'cart.subtotal': 'الإجمالي',
            'cart.checkout': 'إتمام الشراء',
            'checkout.title': 'معلومات الدفع',
            'checkout.name': 'الاسم الكامل',
            'checkout.email': 'البريد الإلكتروني',
            'checkout.address': 'العنوان',
            'checkout.card': 'بطاقة الدفع',
            'checkout.cancel': 'إلغاء',
            'checkout.pay': 'ادفع الآن',
            'footer.privacy': 'الخصوصية',
            'footer.terms': 'الشروط'
        },
        en: {
            brand: 'Bilingual Store',
            'nav.home': 'Home',
            'nav.shop': 'Shop',
            'nav.deals': 'Deals',
            'nav.contact': 'Contact',
            'hero.title': 'Shop smarter. Seamless experience.',
            'hero.subtitle': 'Professional UI, speed, and multilingual.',
            'hero.ctaShop': 'Shop now',
            'hero.ctaDeals': 'View deals',
            'search.placeholder': 'Search products...',
            'filters.all': 'All categories',
            'sort.popular': 'Most popular',
            'sort.priceAsc': 'Price: Low to High',
            'sort.priceDesc': 'Price: High to Low',
            'sort.new': 'Newest',
            'product.details': 'Details',
            'product.addToCart': 'Add to cart',
            'cart.title': 'Shopping cart',
            'cart.subtotal': 'Subtotal',
            'cart.checkout': 'Checkout',
            'checkout.title': 'Payment info',
            'checkout.name': 'Full name',
            'checkout.email': 'Email',
            'checkout.address': 'Address',
            'checkout.card': 'Card number',
            'checkout.cancel': 'Cancel',
            'checkout.pay': 'Pay now',
            'footer.privacy': 'Privacy',
            'footer.terms': 'Terms'
        }
    };

    const state = {
        lang: localStorage.getItem('lang') || 'ar',
        currency: localStorage.getItem('currency') || 'USD',
        theme: localStorage.getItem('theme') || 'dark',
        view: localStorage.getItem('view') || 'grid',
        products: [],
        cart: JSON.parse(localStorage.getItem('cart') || '[]'),
        wishlist: new Set(JSON.parse(localStorage.getItem('wishlist') || '[]')),
        filters: { query: '', category: 'all', sort: 'pop' }
    };

    const productsSeed = [
        { id: 'p1', title: { ar: 'سماعات لاسلكية', en: 'Wireless Headphones' }, desc: { ar: 'صوت نقي وعزل ضوضاء.', en: 'Crisp sound with noise cancelation.' }, price: 79.99, category: 'audio', img: 'https://images.unsplash.com/photo-1518444083033-3936a5d6d9a9?q=80&w=800&auto=format&fit=crop', tags: ['popular'] },
        { id: 'p2', title: { ar: 'ساعة ذكية', en: 'Smart Watch' }, desc: { ar: 'صحة، إشعارات، وبطارية قوية.', en: 'Health, notifications, and strong battery.' }, price: 129.00, category: 'wearables', img: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=800&auto=format&fit=crop', tags: ['new'] },
        { id: 'p3', title: { ar: 'كيبورد ميكانيكي', en: 'Mechanical Keyboard' }, desc: { ar: 'أزرار مريحة وإضاءة RGB.', en: 'Comfortable switches with RGB lighting.' }, price: 99.00, category: 'pc', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop', tags: [] },
        { id: 'p4', title: { ar: 'كاميرا فورية', en: 'Instant Camera' }, desc: { ar: 'ذكريات مطبوعة فوراً.', en: 'Instant printed memories.' }, price: 69.00, category: 'photo', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop', tags: ['deal'] },
        { id: 'p5', title: { ar: 'حقيبة ظهر', en: 'Backpack' }, desc: { ar: 'خفة ومتانة للاستخدام اليومي.', en: 'Lightweight and durable daily use.' }, price: 39.99, category: 'lifestyle', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop', tags: [] },
        { id: 'p6', title: { ar: 'ماوس احترافي', en: 'Pro Mouse' }, desc: { ar: 'دقة عالية وسرعة.', en: 'High precision and speed.' }, price: 49.00, category: 'pc', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop', tags: [] },
        { id: 'p7', title: { ar: 'سماعة بلوتوث', en: 'Bluetooth Speaker' }, desc: { ar: 'صوت قوي وعملي.', en: 'Powerful and portable sound.' }, price: 59.00, category: 'audio', img: 'https://images.unsplash.com/photo-1585386959984-a4155223168f?q=80&w=800&auto=format&fit=crop', tags: ['popular'] },
        { id: 'p8', title: { ar: 'لوحي 10 بوصات', en: '10" Tablet' }, desc: { ar: 'شاشة رائعة وأداء جيد.', en: 'Great display and performance.' }, price: 189.00, category: 'tablets', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', tags: ['new'] }
    ];

    function setupTheme() {
        document.documentElement.classList.toggle('light', state.theme === 'light');
        $('#themeToggle').textContent = state.theme === 'light' ? '🌙' : '☀️';
    }

    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        setupTheme();
    }

    function setupLang() {
        const dir = state.lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = state.lang;
        document.documentElement.dir = dir;
        $('#langToggle').textContent = state.lang.toUpperCase();
        applyTranslations();
        const search = $('#searchInput');
        if (search) search.placeholder = t('search.placeholder');
    }

    function toggleLang() {
        state.lang = state.lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('lang', state.lang);
        setupLang();
        renderProducts();
        renderCart();
    }

    function t(key) {
        return i18n[state.lang][key] || key;
    }

    function formatPrice(value) {
        const currency = state.currency;
        const locale = state.lang === 'ar' ? 'ar-EG' : 'en-US';
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
    }

    function toggleCurrency() {
        state.currency = state.currency === 'USD' ? 'EUR' : 'USD';
        localStorage.setItem('currency', state.currency);
        $('#currencyToggle').textContent = state.currency;
        renderProducts();
        renderCart();
    }

    function initCategories() {
        const categories = Array.from(new Set(productsSeed.map(p => p.category)));
        const select = $('#categoryFilter');
        categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = capitalize(cat);
            select.appendChild(opt);
        });
    }

    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

    function loadProducts() {
        state.products = productsSeed;
    }

    function productMatches(p) {
        const q = state.filters.query.trim().toLowerCase();
        const inCat = state.filters.category === 'all' || p.category === state.filters.category;
        const title = (p.title[state.lang] || '').toLowerCase();
        const desc = (p.desc[state.lang] || '').toLowerCase();
        const inText = !q || title.includes(q) || desc.includes(q);
        return inCat && inText;
    }

    function sortProducts(list) {
        switch (state.filters.sort) {
            case 'priceAsc':
                return list.slice().sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return list.slice().sort((a, b) => b.price - a.price);
            case 'new':
                return list.slice().reverse();
            default:
                return list;
        }
    }

    function renderProducts() {
        const container = $('#products');
        container.innerHTML = '';
        const tpl = $('#productCardTemplate');
        const list = sortProducts(state.products.filter(productMatches));
        list.forEach(p => {
            const node = tpl.content.cloneNode(true);
            const card = $('.card', node);
            card.dataset.id = p.id;
            const img = $('img', node);
            img.src = p.img;
            img.alt = p.title[state.lang];
            $('.card-title', node).textContent = p.title[state.lang];
            $('.card-desc', node).textContent = p.desc[state.lang];
            $('.price', node).textContent = formatPrice(p.price);
            const badge = $('.badge', node);
            if (p.tags.includes('new')) { badge.hidden = false; badge.textContent = state.lang === 'ar' ? 'جديد' : 'New'; }
            if (p.tags.includes('deal')) { badge.hidden = false; badge.textContent = state.lang === 'ar' ? 'عرض' : 'Deal'; }

            const wishBtn = $('.wishlist', node);
            wishBtn.textContent = state.wishlist.has(p.id) ? '❤️' : '♡';
            wishBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleWishlist(p.id);
                wishBtn.textContent = state.wishlist.has(p.id) ? '❤️' : '♡';
            });

            $('[data-action="add"]', node).addEventListener('click', () => addToCart(p.id));
            $('[data-action="details"]', node).addEventListener('click', () => alertDetails(p));

            container.appendChild(node);
        });

        document.body.dataset.view = state.view;
        $$(".view-toggles .icon-btn").forEach(btn => {
            const pressed = btn.dataset.view === state.view;
            btn.setAttribute('aria-pressed', String(pressed));
        });
    }

    function alertDetails(p) {
        alert(`${p.title[state.lang]}\n\n${p.desc[state.lang]}`);
    }

    function toggleWishlist(id) {
        if (state.wishlist.has(id)) state.wishlist.delete(id); else state.wishlist.add(id);
        localStorage.setItem('wishlist', JSON.stringify(Array.from(state.wishlist)));
    }

    function addToCart(id) {
        const item = state.cart.find(i => i.id === id);
        if (item) item.qty += 1; else state.cart.push({ id, qty: 1 });
        persistCart();
        renderCart();
        openCart();
    }

    function removeFromCart(id) {
        state.cart = state.cart.filter(i => i.id !== id);
        persistCart();
        renderCart();
    }

    function updateQty(id, delta) {
        const item = state.cart.find(i => i.id === id);
        if (!item) return;
        item.qty = Math.max(1, item.qty + delta);
        persistCart();
        renderCart();
    }

    function persistCart() {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }

    function cartTotal() {
        return state.cart.reduce((sum, it) => {
            const p = state.products.find(pp => pp.id === it.id);
            return sum + (p ? p.price * it.qty : 0);
        }, 0);
    }

    function renderCart() {
        $('#cartToggle').dataset.count = String(state.cart.reduce((a, b) => a + b.qty, 0));
        const holder = $('#cartItems');
        holder.innerHTML = '';
        state.cart.forEach(it => {
            const p = state.products.find(pp => pp.id === it.id);
            if (!p) return;
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <img src="${p.img}" alt="${p.title[state.lang]}">
                <div>
                    <div style="font-weight:600">${p.title[state.lang]}</div>
                    <div class="muted">${formatPrice(p.price)}</div>
                    <div class="qty">
                        <button class="btn" aria-label="decrease">-</button>
                        <span>${it.qty}</span>
                        <button class="btn" aria-label="increase">+</button>
                    </div>
                </div>
                <div class="inline">
                    <strong>${formatPrice(p.price * it.qty)}</strong>
                    <button class="icon-btn" aria-label="remove">🗑️</button>
                </div>
            `;
            const [dec, , inc] = $$('.qty button', row);
            dec.addEventListener('click', () => updateQty(it.id, -1));
            inc.addEventListener('click', () => updateQty(it.id, +1));
            $('.icon-btn[aria-label="remove"]', row).addEventListener('click', () => removeFromCart(it.id));
            holder.appendChild(row);
        });
        $('#cartTotal').textContent = formatPrice(cartTotal());
    }

    function openCart() {
        const drawer = $('#cartDrawer');
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
    }
    function closeCart() {
        const drawer = $('#cartDrawer');
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
    }

    function applyTranslations() {
        $$('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });
        $$('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.setAttribute('placeholder', t(key));
        });
    }

    function setupEvents() {
        $('#themeToggle').addEventListener('click', toggleTheme);
        $('#langToggle').addEventListener('click', toggleLang);
        $('#currencyToggle').addEventListener('click', toggleCurrency);
        $('#cartToggle').addEventListener('click', openCart);
        $('#cartClose').addEventListener('click', closeCart);
        $('#viewDeals').addEventListener('click', () => {
            state.filters.sort = 'priceDesc';
            $('#sortSelect').value = 'priceDesc';
            renderProducts();
            window.scrollTo({ top: $('#products').offsetTop - 60, behavior: 'smooth' });
        });

        $('#searchInput').addEventListener('input', (e) => {
            state.filters.query = e.target.value;
            renderProducts();
        });
        $('#categoryFilter').addEventListener('change', (e) => {
            state.filters.category = e.target.value;
            renderProducts();
        });
        $('#sortSelect').addEventListener('change', (e) => {
            state.filters.sort = e.target.value;
            renderProducts();
        });
        $$('.view-toggles .icon-btn').forEach(btn => btn.addEventListener('click', () => {
            state.view = btn.dataset.view;
            localStorage.setItem('view', state.view);
            renderProducts();
        }));

        // No payment flow

        // mobile menu toggle visual only
        $('.menu-toggle').addEventListener('click', (e) => {
            const nav = $('.site-nav');
            const expanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
            e.currentTarget.setAttribute('aria-expanded', String(!expanded));
            nav.style.display = expanded ? 'none' : 'inline-flex';
        });
    }

    function init() {
        $('#year').textContent = new Date().getFullYear();
        setupTheme();
        setupLang();
        $('#currencyToggle').textContent = state.currency;
        initCategories();
        loadProducts();
        setupEvents();
        renderProducts();
        renderCart();
    }

    document.addEventListener('DOMContentLoaded', init);
})();


