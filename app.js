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
        const custom = JSON.parse(localStorage.getItem('productsCustom') || '[]');
        state.products = productsSeed.concat(custom);
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
            $('[data-action="details"]', node).addEventListener('click', () => openProductModal(p));

            container.appendChild(node);
        });

        document.body.dataset.view = state.view;
        $$(".view-toggles .icon-btn").forEach(btn => {
            const pressed = btn.dataset.view === state.view;
            btn.setAttribute('aria-pressed', String(pressed));
        });
    }

    function openProductModal(p) {
        const dlg = $('#productModal');
        $('#productTitle').textContent = p.title[state.lang];
        $('#productImage').src = p.img;
        $('#productImage').alt = p.title[state.lang];
        $('#productDesc').textContent = p.desc[state.lang];
        $('#productPrice').textContent = formatPrice(p.price);
        const ul = $('#productSpecs');
        ul.innerHTML = '';
        const specs = p.specs || [];
        specs.forEach(([k, v]) => {
            const li = document.createElement('li');
            li.textContent = `${k}: ${v}`;
            ul.appendChild(li);
        });
        $('#productWishlist').textContent = state.wishlist.has(p.id) ? '❤️' : '♡';
        $('#productWishlist').onclick = () => {
            toggleWishlist(p.id);
            $('#productWishlist').textContent = state.wishlist.has(p.id) ? '❤️' : '♡';
        };
        $('#buyNowBtn').onclick = () => openOrderModal(p);
        $('#productClose').onclick = () => dlg.close();
        dlg.showModal();
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

    // ORDER FLOW
    let currentOrderProduct = null;
    let currentStep = 1;

    function openOrderModal(product) {
        currentOrderProduct = product;
        currentStep = 1;
        const dlg = $('#orderModal');
        $('#orderProductMini').innerHTML = `<span>${product.title[state.lang]}</span><strong>${formatPrice(product.price)}</strong>`;
        setStep(1);
        $('#orderClose').onclick = () => dlg.close();
        $('#prevStep').onclick = () => setStep(Math.max(1, currentStep - 1));
        $('#nextStep').onclick = () => setStep(Math.min(3, currentStep + 1));
        $('#orderForm').onsubmit = handleConfirmOrder;
        dlg.showModal();
    }

    function setStep(step) {
        currentStep = step;
        $$('.steps .step').forEach(s => s.hidden = s.getAttribute('data-step') !== String(step));
        $('#prevStep').disabled = step === 1;
        $('#nextStep').hidden = step === 3;
        $('#confirmOrder').hidden = step !== 3;
    }

    function handleConfirmOrder(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.reportValidity()) return;
        const data = Object.fromEntries(new FormData(form).entries());
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
        const order = {
            id: orderId,
            product: {
                id: currentOrderProduct.id,
                title: currentOrderProduct.title[state.lang],
                price: currentOrderProduct.price
            },
            customer: {
                name: data.name,
                phone: data.phone,
                address: data.address,
                landmark: data.landmark,
                notes: data.notes || ''
            },
            currency: state.currency,
            lang: state.lang,
            createdAt: new Date().toISOString()
        };
        downloadOrderPdf(order);
        tryNotify(order);
        const msg = state.lang === 'ar' ? 'تم تثبيت الحجز بنجاح' : 'Reservation confirmed successfully';
        alert(`${msg}\n${order.id}`);
        $('#orderModal').close();
    }

    function downloadOrderPdf(order) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const title = order.lang === 'ar' ? 'فاتورة طلب' : 'Order Invoice';
        doc.setFontSize(16);
        doc.text(title, 14, 20);
        doc.setFontSize(11);
        doc.text(`Order: ${order.id}`, 14, 30);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 36);
        doc.text(`Product: ${order.product.title}`, 14, 46);
        doc.text(`Price: ${new Intl.NumberFormat(order.lang === 'ar' ? 'ar-EG' : 'en-US', { style: 'currency', currency: order.currency }).format(order.product.price)}`, 14, 52);
        doc.text(`Name: ${order.customer.name}`, 14, 62);
        doc.text(`Phone: ${order.customer.phone}`, 14, 68);
        doc.text(`Address: ${order.customer.address}`, 14, 74);
        doc.text(`Landmark: ${order.customer.landmark}`, 14, 80);
        if (order.customer.notes) doc.text(`Notes: ${order.customer.notes}`, 14, 90);
        doc.save(`order-${order.id}.pdf`);
    }

    function tryNotify(order) {
        const text = `New order ${order.id}\n${order.product.title} - ${order.product.price} ${order.currency}\n${order.customer.name} / ${order.customer.phone}`;
        // Desktop notification
        if ('Notification' in window) {
            if (Notification.permission === 'granted') new Notification('New order', { body: text });
            else if (Notification.permission !== 'denied') Notification.requestPermission().then(p => { if (p === 'granted') new Notification('New order', { body: text }); });
        }
        // WhatsApp share (owner can edit phone in code or just copy)
        const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
        console.log('WhatsApp share:', wa);
        // Telegram share
        const tg = `https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(text)}`;
        console.log('Telegram share:', tg);
    }

    // ADD PRODUCT
    async function handleAddProductSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const file = fd.get('image');
        const dataUrl = await fileToDataUrl(file);
        const specsRaw = (fd.get('specs') || '').toString().split(/\r?\n/).filter(Boolean);
        const specs = specsRaw.map(line => {
            const idx = line.indexOf(':');
            if (idx === -1) return [line.trim(), ''];
            return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
        });
        const product = {
            id: `c_${Date.now().toString(36)}`,
            title: { ar: fd.get('title_ar'), en: fd.get('title_en') },
            desc: { ar: fd.get('desc_ar'), en: fd.get('desc_en') },
            price: parseFloat(fd.get('price')),
            category: fd.get('category'),
            img: dataUrl,
            specs,
            tags: []
        };
        const existing = JSON.parse(localStorage.getItem('productsCustom') || '[]');
        existing.push(product);
        localStorage.setItem('productsCustom', JSON.stringify(existing));
        $('#addProductModal').close();
        form.reset();
        loadProducts();
        initCategories();
        renderProducts();
    }

    function fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
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

        // Order modal events wired in openOrderModal

        // Add product FAB
        $('#addProductFab').addEventListener('click', () => $('#addProductModal').showModal());
        $('#addProductClose').addEventListener('click', (e) => { e.preventDefault(); $('#addProductModal').close(); });
        $('#addProductForm').addEventListener('submit', handleAddProductSubmit);

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


