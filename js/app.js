/* =========================================================
   STOCKFLOW
   Inventory & Sales Management System
   Vanilla JavaScript + LocalStorage
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE KEYS
   ========================================================= */

const STORAGE_KEYS = {
    products: "stockflow_products",
    sales: "stockflow_sales",
    settings: "stockflow_settings",
    theme: "stockflow_theme"
};

/* =========================================================
   DEFAULT SETTINGS
   ========================================================= */

const DEFAULT_SETTINGS = {
    businessName: "StockFlow Demo",
    currency: "Rs.",
    defaultThreshold: 10
};

/* =========================================================
   DEMO PRODUCTS
   ========================================================= */

const DEMO_PRODUCTS = [
    {
        id: "p001",
        name: "Wireless Mouse",
        sku: "WM-001",
        category: "Electronics",
        purchasePrice: 1500,
        sellingPrice: 2000,
        stock: 25,
        minimumStock: 10,
        description: "Comfortable wireless mouse for everyday productivity."
    },
    {
        id: "p002",
        name: "Mechanical Keyboard",
        sku: "MK-002",
        category: "Electronics",
        purchasePrice: 5500,
        sellingPrice: 7200,
        stock: 14,
        minimumStock: 8,
        description: "Compact mechanical keyboard with tactile switches."
    },
    {
        id: "p003",
        name: "USB-C Hub",
        sku: "UH-003",
        category: "Electronics",
        purchasePrice: 2800,
        sellingPrice: 3900,
        stock: 7,
        minimumStock: 10,
        description: "Multi-port USB-C hub for laptops and tablets."
    },
    {
        id: "p004",
        name: "Bluetooth Speaker",
        sku: "BS-004",
        category: "Electronics",
        purchasePrice: 3500,
        sellingPrice: 4800,
        stock: 18,
        minimumStock: 8,
        description: "Portable Bluetooth speaker with clear audio."
    },
    {
        id: "p005",
        name: "Premium Coffee",
        sku: "PC-005",
        category: "Grocery",
        purchasePrice: 900,
        sellingPrice: 1250,
        stock: 32,
        minimumStock: 10,
        description: "Fresh roasted premium coffee beans."
    },
    {
        id: "p006",
        name: "Green Tea",
        sku: "GT-006",
        category: "Grocery",
        purchasePrice: 500,
        sellingPrice: 750,
        stock: 28,
        minimumStock: 10,
        description: "Refreshing green tea packed for daily use."
    },
    {
        id: "p007",
        name: "Organic Honey",
        sku: "OH-007",
        category: "Grocery",
        purchasePrice: 1100,
        sellingPrice: 1500,
        stock: 5,
        minimumStock: 8,
        description: "Natural organic honey in a premium glass jar."
    },
    {
        id: "p008",
        name: "Cotton T-Shirt",
        sku: "CT-008",
        category: "Clothing",
        purchasePrice: 1200,
        sellingPrice: 1800,
        stock: 42,
        minimumStock: 12,
        description: "Soft cotton everyday T-shirt."
    },
    {
        id: "p009",
        name: "Casual Hoodie",
        sku: "CH-009",
        category: "Clothing",
        purchasePrice: 2800,
        sellingPrice: 3900,
        stock: 11,
        minimumStock: 8,
        description: "Comfortable casual hoodie for everyday wear."
    },
    {
        id: "p010",
        name: "Denim Jeans",
        sku: "DJ-010",
        category: "Clothing",
        purchasePrice: 3200,
        sellingPrice: 4500,
        stock: 4,
        minimumStock: 8,
        description: "Classic regular-fit denim jeans."
    },
    {
        id: "p011",
        name: "Face Wash",
        sku: "FW-011",
        category: "Cosmetics",
        purchasePrice: 650,
        sellingPrice: 950,
        stock: 21,
        minimumStock: 8,
        description: "Gentle daily face wash for clean and fresh skin."
    },
    {
        id: "p012",
        name: "Moisturizer",
        sku: "MO-012",
        category: "Cosmetics",
        purchasePrice: 850,
        sellingPrice: 1250,
        stock: 16,
        minimumStock: 7,
        description: "Lightweight daily moisturizing cream."
    },
    {
        id: "p013",
        name: "Sunscreen",
        sku: "SS-013",
        category: "Cosmetics",
        purchasePrice: 950,
        sellingPrice: 1400,
        stock: 3,
        minimumStock: 7,
        description: "Daily sunscreen for broad-spectrum protection."
    },
    {
        id: "p014",
        name: "Notebook",
        sku: "NB-014",
        category: "Other",
        purchasePrice: 250,
        sellingPrice: 400,
        stock: 35,
        minimumStock: 10,
        description: "Minimal hardcover notebook for notes and planning."
    },
    {
        id: "p015",
        name: "Desk Organizer",
        sku: "DO-015",
        category: "Other",
        purchasePrice: 750,
        sellingPrice: 1100,
        stock: 9,
        minimumStock: 10,
        description: "Modern desk organizer for stationery and accessories."
    }
];

/* =========================================================
   DEMO SALES
   ========================================================= */

const DEMO_SALES = [
    {
        id: "INV-1048",
        productId: "p001",
        customer: "Ali",
        quantity: 2,
        unitPrice: 2000,
        purchasePrice: 1500,
        revenue: 4000,
        profit: 1000,
        status: "Completed",
        date: getDateOffset(-1, 10)
    },
    {
        id: "INV-1047",
        productId: "p005",
        customer: "Sara",
        quantity: 3,
        unitPrice: 1250,
        purchasePrice: 900,
        revenue: 3750,
        profit: 1050,
        status: "Completed",
        date: getDateOffset(-1, 14)
    },
    {
        id: "INV-1046",
        productId: "p008",
        customer: "Hamza",
        quantity: 2,
        unitPrice: 1800,
        purchasePrice: 1200,
        revenue: 3600,
        profit: 1200,
        status: "Completed",
        date: getDateOffset(-2, 11)
    },
    {
        id: "INV-1045",
        productId: "p002",
        customer: "Ayesha",
        quantity: 1,
        unitPrice: 7200,
        purchasePrice: 5500,
        revenue: 7200,
        profit: 1700,
        status: "Completed",
        date: getDateOffset(-2, 16)
    },
    {
        id: "INV-1044",
        productId: "p011",
        customer: "Usman",
        quantity: 4,
        unitPrice: 950,
        purchasePrice: 650,
        revenue: 3800,
        profit: 1200,
        status: "Completed",
        date: getDateOffset(-3, 13)
    },
    {
        id: "INV-1043",
        productId: "p004",
        customer: "Hassan",
        quantity: 2,
        unitPrice: 4800,
        purchasePrice: 3500,
        revenue: 9600,
        profit: 2600,
        status: "Completed",
        date: getDateOffset(-3, 18)
    },
    {
        id: "INV-1042",
        productId: "p006",
        customer: "Mariam",
        quantity: 5,
        unitPrice: 750,
        purchasePrice: 500,
        revenue: 3750,
        profit: 1250,
        status: "Completed",
        date: getDateOffset(-4, 12)
    },
    {
        id: "INV-1041",
        productId: "p012",
        customer: "Bilal",
        quantity: 2,
        unitPrice: 1250,
        purchasePrice: 850,
        revenue: 2500,
        profit: 800,
        status: "Completed",
        date: getDateOffset(-5, 15)
    },
    {
        id: "INV-1040",
        productId: "p009",
        customer: "Zain",
        quantity: 1,
        unitPrice: 3900,
        purchasePrice: 2800,
        revenue: 3900,
        profit: 1100,
        status: "Completed",
        date: getDateOffset(-6, 10)
    },
    {
        id: "INV-1039",
        productId: "p014",
        customer: "Noor",
        quantity: 6,
        unitPrice: 400,
        purchasePrice: 250,
        revenue: 2400,
        profit: 900,
        status: "Completed",
        date: getDateOffset(-7, 17)
    }
];

/* =========================================================
   APPLICATION STATE
   ========================================================= */

const state = {
    products: [],
    sales: [],
    settings: { ...DEFAULT_SETTINGS },
    currentPage: "dashboard",
    confirmCallback: null
};

/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", init);

function init() {
    loadData();
    applySavedTheme();
    populateSettings();
    setupNavigation();
    setupProductEvents();
    setupSalesEvents();
    setupModalEvents();
    setupSettingsEvents();
    setupGlobalSearch();
    setupNotifications();

    renderAll();
}

/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function loadData() {
    try {
        const storedProducts = localStorage.getItem(
            STORAGE_KEYS.products
        );

        const storedSales = localStorage.getItem(
            STORAGE_KEYS.sales
        );

        const storedSettings = localStorage.getItem(
            STORAGE_KEYS.settings
        );

        state.products = storedProducts
            ? JSON.parse(storedProducts)
            : cloneData(DEMO_PRODUCTS);

        state.sales = storedSales
            ? JSON.parse(storedSales)
            : cloneData(DEMO_SALES);

        state.settings = storedSettings
            ? {
                ...DEFAULT_SETTINGS,
                ...JSON.parse(storedSettings)
            }
            : { ...DEFAULT_SETTINGS };

        saveData();

    } catch (error) {
        console.error("Unable to load LocalStorage data:", error);

        state.products = cloneData(DEMO_PRODUCTS);
        state.sales = cloneData(DEMO_SALES);
        state.settings = { ...DEFAULT_SETTINGS };

        showToast(
            "warning",
            "Storage Notice",
            "Demo data was loaded because stored data was unavailable."
        );
    }
}

function saveData() {
    try {
        localStorage.setItem(
            STORAGE_KEYS.products,
            JSON.stringify(state.products)
        );

        localStorage.setItem(
            STORAGE_KEYS.sales,
            JSON.stringify(state.sales)
        );

        localStorage.setItem(
            STORAGE_KEYS.settings,
            JSON.stringify(state.settings)
        );

    } catch (error) {
        console.error("Unable to save LocalStorage data:", error);

        showToast(
            "warning",
            "Storage Error",
            "Your browser could not save the latest changes."
        );
    }
}

function cloneData(data) {
    return JSON.parse(JSON.stringify(data));
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {
    $$(".nav-item").forEach((button) => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.page);
        });
    });

    $$("[data-page-link]").forEach((button) => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.pageLink);
        });
    });

    $("#menuButton").addEventListener("click", openSidebar);
    $("#sidebarClose").addEventListener("click", closeSidebar);
    $("#mobileOverlay").addEventListener("click", closeSidebar);
}

function navigateTo(page) {
    state.currentPage = page;

    $$(".page-section").forEach((section) => {
        section.classList.remove("active");
    });

    const target = $(`#${page}Page`);

    if (target) {
        target.classList.add("active");
    }

    $$(".nav-item").forEach((item) => {
        item.classList.toggle(
            "active",
            item.dataset.page === page
        );
    });

    const titles = {
        dashboard: "Dashboard",
        products: "Products",
        inventory: "Inventory",
        sales: "Sales",
        reports: "Reports",
        settings: "Settings"
    };

    $("#pageTitle").textContent = titles[page] || "Dashboard";

    closeSidebar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (page === "dashboard") {
        drawSalesChart();
    }
}

function openSidebar() {
    $("#sidebar").classList.add("open");
    $("#mobileOverlay").classList.add("active");
}

function closeSidebar() {
    $("#sidebar").classList.remove("open");
    $("#mobileOverlay").classList.remove("active");
}

/* =========================================================
   RENDER ALL
   ========================================================= */

function renderAll() {
    updateDashboard();
    renderProducts();
    renderInventory();
    renderSales();
    renderReports();
    renderNotifications();

    drawSalesChart();
    renderCategoryChart();
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {
    const totalProducts = state.products.length;

    const totalStock = state.products.reduce(
        (sum, product) => sum + Number(product.stock),
        0
    );

    const completedSales = state.sales.filter(
        (sale) => sale.status === "Completed"
    );

    const revenue = completedSales.reduce(
        (sum, sale) => sum + Number(sale.revenue),
        0
    );

    const profit = completedSales.reduce(
        (sum, sale) => sum + Number(sale.profit),
        0
    );

    const todaySales = completedSales.filter(
        (sale) => isToday(sale.date)
    );

    const todayRevenue = todaySales.reduce(
        (sum, sale) => sum + Number(sale.revenue),
        0
    );

    const lowStock = state.products.filter(
        (product) => getStockStatus(product) === "low"
    );

    $("#totalProducts").textContent = totalProducts;
    $("#totalStock").textContent = formatNumber(totalStock);

    $("#todaySales").textContent =
        formatCurrency(todayRevenue);

    $("#todaySalesCount").textContent =
        `${todaySales.length} order${todaySales.length === 1 ? "" : "s"} today`;

    $("#totalRevenue").textContent =
        formatCurrency(revenue);

    $("#totalProfit").textContent =
        formatCurrency(profit);

    $("#lowStockCount").textContent =
        lowStock.length;

    renderRecentSales();
    renderDashboardLowStock();
}

function renderRecentSales() {
    const container = $("#recentSalesTable");

    const recent = [...state.sales]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    if (!recent.length) {
        container.innerHTML = emptyState(
            "No sales yet",
            "Your completed sales will appear here."
        );

        return;
    }

    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                ${recent.map((sale) => {
                    const product = getProduct(sale.productId);

                    return `
                        <tr>
                            <td>
                                <strong>${escapeHTML(sale.id)}</strong>
                            </td>

                            <td>
                                ${escapeHTML(product?.name || "Deleted product")}
                            </td>

                            <td>
                                ${escapeHTML(sale.customer || "Walk-in")}
                            </td>

                            <td class="price">
                                ${formatCurrency(sale.revenue)}
                            </td>

                            <td>
                                ${statusBadge(sale.status)}
                            </td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
    `;
}

function renderDashboardLowStock() {
    const container = $("#dashboardLowStock");

    const products = state.products
        .filter((product) => getStockStatus(product) !== "in-stock")
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 6);

    if (!products.length) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">✓</div>
                <h3>Stock looks good</h3>
                <p>No products currently need attention.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = products.map((product) => `
        <div class="low-stock-item">

            <div class="product-avatar">
                ${getInitials(product.name)}
            </div>

            <div class="low-stock-main">
                <strong>${escapeHTML(product.name)}</strong>
                <span>
                    Minimum: ${product.minimumStock} units
                </span>
            </div>

            <span class="stock-number">
                ${product.stock} left
            </span>

        </div>
    `).join("");
}

/* =========================================================
   PRODUCTS
   ========================================================= */

function setupProductEvents() {
    $("#addProductButton").addEventListener(
        "click",
        () => openProductModal()
    );

    $("#productForm").addEventListener(
        "submit",
        handleProductSubmit
    );

    $("#productSearch").addEventListener(
        "input",
        renderProducts
    );

    $("#categoryFilter").addEventListener(
        "change",
        renderProducts
    );

    $("#stockFilter").addEventListener(
        "change",
        renderProducts
    );

    $("#productSort").addEventListener(
        "change",
        renderProducts
    );

    $("#productsTable").addEventListener(
        "click",
        handleProductTableClick
    );
}

function renderProducts() {
    const container = $("#productsTable");

    let products = [...state.products];

    const search =
        $("#productSearch")?.value
            .trim()
            .toLowerCase() || "";

    const category =
        $("#categoryFilter")?.value || "all";

    const stock =
        $("#stockFilter")?.value || "all";

    const sort =
        $("#productSort")?.value || "default";

    if (search) {
        products = products.filter((product) => {
            return (
                product.name.toLowerCase().includes(search) ||
                product.sku.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search)
            );
        });
    }

    if (category !== "all") {
        products = products.filter(
            (product) => product.category === category
        );
    }

    if (stock !== "all") {
        products = products.filter((product) => {
            const status = getStockStatus(product);

            if (stock === "in-stock") {
                return status === "in-stock";
            }

            if (stock === "low-stock") {
                return status === "low";
            }

            if (stock === "out-of-stock") {
                return status === "out";
            }

            return true;
        });
    }

    switch (sort) {
        case "name-asc":
            products.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "price-low":
            products.sort(
                (a, b) => a.sellingPrice - b.sellingPrice
            );
            break;

        case "price-high":
            products.sort(
                (a, b) => b.sellingPrice - a.sellingPrice
            );
            break;

        case "stock-low":
            products.sort((a, b) => a.stock - b.stock);
            break;
    }

    if (!products.length) {
        container.innerHTML = emptyState(
            "No products found",
            "Try changing your search or filters."
        );

        return;
    }

    container.innerHTML = `
        <table class="table">

            <thead>
                <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Purchase</th>
                    <th>Selling</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                ${products.map(productRow).join("")}
            </tbody>

        </table>
    `;
}

function productRow(product) {
    return `
        <tr>

            <td>
                <div class="product-cell">

                    <div class="product-avatar">
                        ${getInitials(product.name)}
                    </div>

                    <div>
                        <span class="product-name">
                            ${escapeHTML(product.name)}
                        </span>

                        <span class="product-subtitle">
                            ${escapeHTML(product.description || "No description")}
                        </span>
                    </div>

                </div>
            </td>

            <td>${escapeHTML(product.sku)}</td>

            <td>${escapeHTML(product.category)}</td>

            <td class="price">
                ${formatCurrency(product.purchasePrice)}
            </td>

            <td class="price">
                ${formatCurrency(product.sellingPrice)}
            </td>

            <td>
                <strong>${product.stock}</strong>
            </td>

            <td>
                ${stockBadge(product)}
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="table-action"
                        data-action="edit"
                        data-id="${product.id}"
                        title="Edit product"
                        aria-label="Edit ${escapeHTML(product.name)}"
                    >
                        ✎
                    </button>

                    <button
                        class="table-action delete"
                        data-action="delete"
                        data-id="${product.id}"
                        title="Delete product"
                        aria-label="Delete ${escapeHTML(product.name)}"
                    >
                        ×
                    </button>

                </div>

            </td>

        </tr>
    `;
}

function handleProductTableClick(event) {
    const button =
        event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    const id = button.dataset.id;
    const action = button.dataset.action;

    if (action === "edit") {
        openProductModal(id);
    }

    if (action === "delete") {
        confirmDeleteProduct(id);
    }
}

function openProductModal(productId = null) {
    const form = $("#productForm");

    form.reset();

    clearProductErrors();

    $("#productId").value = "";

    $("#productModalTitle").textContent =
        productId ? "Edit Product" : "Add Product";

    if (productId) {
        const product = getProduct(productId);

        if (!product) {
            showToast(
                "error",
                "Product Not Found",
                "The selected product no longer exists."
            );

            return;
        }

        $("#productId").value = product.id;
        $("#productName").value = product.name;
        $("#productSku").value = product.sku;
        $("#productCategory").value = product.category;
        $("#purchasePrice").value = product.purchasePrice;
        $("#sellingPrice").value = product.sellingPrice;
        $("#stockQuantity").value = product.stock;
        $("#minimumStock").value = product.minimumStock;
        $("#productDescription").value =
            product.description || "";
    }

    openModal("productModal");

    setTimeout(() => {
        $("#productName").focus();
    }, 100);
}

function handleProductSubmit(event) {
    event.preventDefault();

    clearProductErrors();

    const id = $("#productId").value.trim();

    const name = $("#productName").value.trim();
    const sku = $("#productSku").value.trim();
    const category = $("#productCategory").value;
    const purchasePrice =
        Number($("#purchasePrice").value);

    const sellingPrice =
        Number($("#sellingPrice").value);

    const stock =
        Number($("#stockQuantity").value);

    const minimumStock =
        Number($("#minimumStock").value);

    const description =
        $("#productDescription").value.trim();

    let valid = true;

    if (!name) {
        setFieldError(
            "productNameError",
            "Product name is required."
        );

        valid = false;
    }

    if (!sku) {
        setFieldError(
            "productSkuError",
            "SKU is required."
        );

        valid = false;
    }

    const duplicateSku = state.products.some(
        (product) =>
            product.sku.toLowerCase() === sku.toLowerCase() &&
            product.id !== id
    );

    if (duplicateSku) {
        setFieldError(
            "productSkuError",
            "This SKU already exists."
        );

        valid = false;
    }

    if (!category) {
        setFieldError(
            "productCategoryError",
            "Please select a category."
        );

        valid = false;
    }

    if (
        !Number.isFinite(purchasePrice) ||
        purchasePrice < 0
    ) {
        setFieldError(
            "purchasePriceError",
            "Enter a valid purchase price."
        );

        valid = false;
    }

    if (
        !Number.isFinite(sellingPrice) ||
        sellingPrice < 0
    ) {
        setFieldError(
            "sellingPriceError",
            "Enter a valid selling price."
        );

        valid = false;
    }

    if (
        !Number.isFinite(stock) ||
        stock < 0
    ) {
        setFieldError(
            "stockQuantityError",
            "Stock cannot be negative."
        );

        valid = false;
    }

    if (
        !Number.isInteger(stock) ||
        stock < 0
    ) {
        setFieldError(
            "stockQuantityError",
            "Stock must be a whole number."
        );

        valid = false;
    }

    if (
        !Number.isFinite(minimumStock) ||
        minimumStock < 1
    ) {
        setFieldError(
            "minimumStockError",
            "Minimum stock must be at least 1."
        );

        valid = false;
    }

    if (
        !Number.isInteger(minimumStock) ||
        minimumStock < 1
    ) {
        setFieldError(
            "minimumStockError",
            "Minimum stock must be a whole number."
        );

        valid = false;
    }

    if (!valid) {
        return;
    }

    const productData = {
        name,
        sku: sku.toUpperCase(),
        category,
        purchasePrice,
        sellingPrice,
        stock,
        minimumStock,
        description
    };

    if (id) {
        const index = state.products.findIndex(
            (product) => product.id === id
        );

        if (index !== -1) {
            state.products[index] = {
                ...state.products[index],
                ...productData
            };

            saveData();
            renderAll();
            closeModal("productModal");

            showToast(
                "success",
                "Product Updated",
                `${name} was updated successfully.`
            );
        }

    } else {

        state.products.push({
            id: createId("p"),
            ...productData
        });

        saveData();
        renderAll();
        closeModal("productModal");

        showToast(
            "success",
            "Product Added",
            `${name} was added successfully.`
        );
    }
}

function confirmDeleteProduct(id) {
    const product = getProduct(id);

    if (!product) {
        return;
    }

    openConfirm(
        "Delete Product?",
        `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
        () => {
            state.products = state.products.filter(
                (item) => item.id !== id
            );

            saveData();
            renderAll();

            showToast(
                "success",
                "Product Deleted",
                `${product.name} was removed.`
            );
        }
    );
}

function clearProductErrors() {
    $$(".field-error").forEach((element) => {
        element.textContent = "";
    });
}

function setFieldError(id, message) {
    const element = $(`#${id}`);

    if (element) {
        element.textContent = message;
    }
}

/* =========================================================
   INVENTORY
   ========================================================= */

function renderInventory() {
    const totalItems = state.products.reduce(
        (sum, product) => sum + product.stock,
        0
    );

    const inventoryValue = state.products.reduce(
        (sum, product) =>
            sum + product.purchasePrice * product.stock,
        0
    );

    const lowStock = state.products.filter(
        (product) => getStockStatus(product) === "low"
    ).length;

    const outOfStock = state.products.filter(
        (product) => getStockStatus(product) === "out"
    ).length;

    $("#inventoryTotalItems").textContent =
        formatNumber(totalItems);

    $("#inventoryValue").textContent =
        formatCurrency(inventoryValue);

    $("#inventoryLowStock").textContent =
        lowStock;

    $("#inventoryOutStock").textContent =
        outOfStock;

    const container = $("#inventoryTable");

    if (!state.products.length) {
        container.innerHTML = emptyState(
            "No inventory",
            "Add products to start tracking stock."
        );

        return;
    }

    const products = [...state.products].sort(
        (a, b) => a.stock - b.stock
    );

    container.innerHTML = `
        <table class="table">

            <thead>
                <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Current Stock</th>
                    <th>Minimum</th>
                    <th>Stock Level</th>
                    <th>Stock Value</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>

                ${products.map((product) => {

                    const status =
                        getStockStatus(product);

                    const percentage =
                        product.minimumStock > 0
                            ? Math.min(
                                100,
                                (product.stock /
                                    (product.minimumStock * 2)) *
                                    100
                            )
                            : 100;

                    return `
                        <tr>

                            <td>
                                <div class="product-cell">

                                    <div class="product-avatar">
                                        ${getInitials(product.name)}
                                    </div>

                                    <div>
                                        <span class="product-name">
                                            ${escapeHTML(product.name)}
                                        </span>

                                        <span class="product-subtitle">
                                            ${escapeHTML(product.category)}
                                        </span>
                                    </div>

                                </div>
                            </td>

                            <td>${escapeHTML(product.sku)}</td>

                            <td>
                                <strong>${product.stock}</strong>
                            </td>

                            <td>
                                ${product.minimumStock}
                            </td>

                            <td>
                                <div
                                    class="stock-progress ${
                                        status === "low"
                                            ? "low"
                                            : status === "out"
                                            ? "empty"
                                            : ""
                                    }"
                                >
                                    <span
                                        style="width:${percentage}%"
                                    ></span>
                                </div>
                            </td>

                            <td class="price">
                                ${formatCurrency(
                                    product.purchasePrice *
                                    product.stock
                                )}
                            </td>

                            <td>
                                ${stockBadge(product)}
                            </td>

                        </tr>
                    `;
                }).join("")}

            </tbody>

        </table>
    `;
}

/* =========================================================
   SALES
   ========================================================= */

function setupSalesEvents() {
    $("#newSaleButton").addEventListener(
        "click",
        openSaleModal
    );

    $("#dashboardAddSale").addEventListener(
        "click",
        () => {
            navigateTo("sales");
            openSaleModal();
        }
    );

    $("#saleForm").addEventListener(
        "submit",
        handleSaleSubmit
    );

    $("#saleProduct").addEventListener(
        "change",
        updateSaleCalculation
    );

    $("#saleQuantity").addEventListener(
        "input",
        updateSaleCalculation
    );

    $("#salesSearch").addEventListener(
        "input",
        renderSales
    );

    $("#salesStatusFilter").addEventListener(
        "change",
        renderSales
    );

    $("#salesSort").addEventListener(
        "change",
        renderSales
    );

    $("#salesTable").addEventListener(
        "click",
        handleSalesTableClick
    );
}

function renderSales() {
    const container = $("#salesTable");

    let sales = [...state.sales];

    const search =
        $("#salesSearch")?.value
            .trim()
            .toLowerCase() || "";

    const status =
        $("#salesStatusFilter")?.value || "all";

    const sort =
        $("#salesSort")?.value || "newest";

    if (search) {
        sales = sales.filter((sale) => {
            const product = getProduct(sale.productId);

            const values = [
                sale.id,
                sale.customer,
                sale.status,
                product?.name,
                product?.sku
            ];

            return values.some((value) =>
                String(value || "")
                    .toLowerCase()
                    .includes(search)
            );
        });
    }

    if (status !== "all") {
        sales = sales.filter(
            (sale) => sale.status === status
        );
    }

    switch (sort) {
        case "newest":
            sales.sort(
                (a, b) =>
                    new Date(b.date) - new Date(a.date)
            );
            break;

        case "oldest":
            sales.sort(
                (a, b) =>
                    new Date(a.date) - new Date(b.date)
            );
            break;

        case "revenue-high":
            sales.sort(
                (a, b) => b.revenue - a.revenue
            );
            break;

        case "profit-high":
            sales.sort(
                (a, b) => b.profit - a.profit
            );
            break;
    }

    if (!sales.length) {
        container.innerHTML = emptyState(
            "No sales found",
            "Try changing your search or filters."
        );

        return;
    }

    container.innerHTML = `
        <table class="table">

            <thead>
                <tr>
                    <th>Sale ID</th>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Quantity</th>
                    <th>Revenue</th>
                    <th>Profit</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                ${sales.map((sale) => {

                    const product =
                        getProduct(sale.productId);

                    return `
                        <tr>

                            <td>
                                <strong>
                                    ${escapeHTML(sale.id)}
                                </strong>
                            </td>

                            <td>
                                ${formatDate(sale.date)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    product?.name ||
                                    "Deleted product"
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    sale.customer ||
                                    "Walk-in"
                                )}
                            </td>

                            <td>
                                ${sale.quantity}
                            </td>

                            <td class="price">
                                ${formatCurrency(sale.revenue)}
                            </td>

                            <td class="price">
                                ${formatCurrency(sale.profit)}
                            </td>

                            <td>
                                ${statusBadge(sale.status)}
                            </td>

                            <td>

                                <button
                                    class="table-action"
                                    data-sale-action="details"
                                    data-id="${sale.id}"
                                    title="View sale"
                                >
                                    ↗
                                </button>

                            </td>

                        </tr>
                    `;
                }).join("")}
            </tbody>

        </table>
    `;
}

function openSaleModal() {
    populateSaleProducts();

    $("#saleForm").reset();

    $("#salePrice").value = "";
    $("#saleTotal").textContent =
        formatCurrency(0);

    $("#saleProfit").textContent =
        formatCurrency(0);

    $("#saleStockInfo").textContent =
        "Select a product to view available stock.";

    clearSaleErrors();

    openModal("saleModal");

    setTimeout(() => {
        $("#customerName").focus();
    }, 100);
}

function populateSaleProducts() {
    const select = $("#saleProduct");

    const availableProducts =
        state.products.filter(
            (product) => product.stock > 0
        );

    select.innerHTML = `
        <option value="">
            Select available product
        </option>

        ${availableProducts.map((product) => `
            <option value="${product.id}">
                ${escapeHTML(product.name)}
                — ${product.stock} available
            </option>
        `).join("")}
    `;
}

function updateSaleCalculation() {
    const productId =
        $("#saleProduct").value;

    const product =
        getProduct(productId);

    const quantity =
        Number($("#saleQuantity").value) || 0;

    if (!product) {
        $("#salePrice").value = "";
        $("#saleTotal").textContent =
            formatCurrency(0);
        $("#saleProfit").textContent =
            formatCurrency(0);

        $("#saleStockInfo").textContent =
            "Select a product to view available stock.";

        return;
    }

    $("#salePrice").value =
        product.sellingPrice;

    $("#saleStockInfo").innerHTML = `
        Available Stock:
        <strong>${product.stock}</strong>
        &nbsp;•&nbsp;
        Minimum Stock:
        <strong>${product.minimumStock}</strong>
    `;

    const revenue =
        product.sellingPrice * quantity;

    const profit =
        (product.sellingPrice -
            product.purchasePrice) *
        quantity;

    $("#saleTotal").textContent =
        formatCurrency(revenue);

    $("#saleProfit").textContent =
        formatCurrency(profit);

    const quantityError = $("#saleQuantityError");

    if (
        quantity > product.stock &&
        quantity > 0
    ) {
        quantityError.textContent =
            `Only ${product.stock} units are available.`;
    } else {
        quantityError.textContent = "";
    }
}

function handleSaleSubmit(event) {
    event.preventDefault();

    clearSaleErrors();

    const customer =
        $("#customerName").value.trim();

    const productId =
        $("#saleProduct").value;

    const quantity =
        Number($("#saleQuantity").value);

    const product =
        getProduct(productId);

    let valid = true;

    if (!product) {
        setFieldError(
            "saleProductError",
            "Please select a product."
        );

        valid = false;
    }

    if (
        !Number.isInteger(quantity) ||
        quantity < 1
    ) {
        setFieldError(
            "saleQuantityError",
            "Quantity must be at least 1."
        );

        valid = false;
    }

    if (
        product &&
        quantity > product.stock
    ) {
        setFieldError(
            "saleQuantityError",
            `Only ${product.stock} units are available.`
        );

        valid = false;
    }

    if (!valid) {
        return;
    }

    const revenue =
        product.sellingPrice * quantity;

    const profit =
        (product.sellingPrice -
            product.purchasePrice) *
        quantity;

    const sale = {
        id: createSaleId(),
        productId: product.id,
        customer: customer || "Walk-in Customer",
        quantity,
        unitPrice: product.sellingPrice,
        purchasePrice: product.purchasePrice,
        revenue,
        profit,
        status: "Completed",
        date: new Date().toISOString()
    };

    product.stock -= quantity;

    state.sales.push(sale);

    saveData();
    renderAll();

    closeModal("saleModal");

    showToast(
        "success",
        "Sale Completed",
        `Order ${sale.id} — ${formatCurrency(revenue)}`
    );
}

function clearSaleErrors() {
    $("#saleProductError").textContent = "";
    $("#saleQuantityError").textContent = "";
}

function handleSalesTableClick(event) {
    const button =
        event.target.closest("[data-sale-action]");

    if (!button) {
        return;
    }

    const saleId = button.dataset.id;

    if (button.dataset.saleAction === "details") {
        openSaleDetails(saleId);
    }
}

function openSaleDetails(saleId) {
    const sale =
        state.sales.find(
            (item) => item.id === saleId
        );

    if (!sale) {
        return;
    }

    const product =
        getProduct(sale.productId);

    $("#saleDetailsContent").innerHTML = `
        <div class="sale-detail-grid">

            <div class="detail-item">
                <span>Sale ID</span>
                <strong>${escapeHTML(sale.id)}</strong>
            </div>

            <div class="detail-item">
                <span>Date</span>
                <strong>${formatDate(sale.date)}</strong>
            </div>

            <div class="detail-item">
                <span>Customer</span>
                <strong>${escapeHTML(
                    sale.customer || "Walk-in"
                )}</strong>
            </div>

            <div class="detail-item">
                <span>Status</span>
                <strong>${sale.status}</strong>
            </div>

            <div class="detail-item">
                <span>Product</span>
                <strong>${escapeHTML(
                    product?.name || "Deleted product"
                )}</strong>
            </div>

            <div class="detail-item">
                <span>Quantity</span>
                <strong>${sale.quantity}</strong>
            </div>

            <div class="detail-item">
                <span>Unit Price</span>
                <strong>${formatCurrency(
                    sale.unitPrice
                )}</strong>
            </div>

            <div class="detail-item">
                <span>Revenue</span>
                <strong>${formatCurrency(
                    sale.revenue
                )}</strong>
            </div>

            <div class="detail-item">
                <span>Estimated Cost</span>
                <strong>${formatCurrency(
                    sale.purchasePrice *
                    sale.quantity
                )}</strong>
            </div>

            <div class="detail-item">
                <span>Estimated Profit</span>
                <strong>${formatCurrency(
                    sale.profit
                )}</strong>
            </div>

        </div>
    `;

    openModal("detailsModal");
}

/* =========================================================
   REPORTS
   ========================================================= */

function renderReports() {
    const completedSales =
        state.sales.filter(
            (sale) => sale.status === "Completed"
        );

    const revenue =
        completedSales.reduce(
            (sum, sale) => sum + sale.revenue,
            0
        );

    const profit =
        completedSales.reduce(
            (sum, sale) => sum + sale.profit,
            0
        );

    const average =
        completedSales.length
            ? revenue / completedSales.length
            : 0;

    $("#reportSales").textContent =
        completedSales.length;

    $("#reportRevenue").textContent =
        formatCurrency(revenue);

    $("#reportProfit").textContent =
        formatCurrency(profit);

    $("#reportAverage").textContent =
        formatCurrency(average);

    renderProductPerformance();
    renderCategoryPerformance();
}

function renderProductPerformance() {
    const container =
        $("#productPerformanceTable");

    const productStats =
        state.products.map((product) => {

            const productSales =
                state.sales.filter(
                    (sale) =>
                        sale.productId === product.id &&
                        sale.status === "Completed"
                );

            const units =
                productSales.reduce(
                    (sum, sale) =>
                        sum + sale.quantity,
                    0
                );

            const revenue =
                productSales.reduce(
                    (sum, sale) =>
                        sum + sale.revenue,
                    0
                );

            const profit =
                productSales.reduce(
                    (sum, sale) =>
                        sum + sale.profit,
                    0
                );

            return {
                product,
                units,
                revenue,
                profit
            };
        })
        .sort((a, b) => b.revenue - a.revenue);

    if (!productStats.some((item) => item.units > 0)) {
        container.innerHTML = emptyState(
            "No product performance data",
            "Sales data will appear here after transactions."
        );

        return;
    }

    const ranked =
        productStats.filter(
            (item) => item.units > 0
        );

    container.innerHTML = `
        <table class="table">

            <thead>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                    <th>Profit</th>
                </tr>
            </thead>

            <tbody>

                ${ranked.map((item, index) => `
                    <tr>

                        <td>
                            <span class="rank">
                                ${index + 1}
                            </span>
                        </td>

                        <td>
                            <strong>
                                ${escapeHTML(
                                    item.product.name
                                )}
                            </strong>
                        </td>

                        <td>
                            ${item.units}
                        </td>

                        <td class="price">
                            ${formatCurrency(
                                item.revenue
                            )}
                        </td>

                        <td class="price">
                            ${formatCurrency(
                                item.profit
                            )}
                        </td>

                    </tr>
                `).join("")}

            </tbody>

        </table>
    `;
}

function renderCategoryPerformance() {
    const container =
        $("#categoryPerformanceTable");

    const categories = {};

    state.sales
        .filter((sale) => sale.status === "Completed")
        .forEach((sale) => {

            const product =
                getProduct(sale.productId);

            if (!product) {
                return;
            }

            if (!categories[product.category]) {
                categories[product.category] = {
                    units: 0,
                    revenue: 0,
                    profit: 0
                };
            }

            categories[product.category].units +=
                sale.quantity;

            categories[product.category].revenue +=
                sale.revenue;

            categories[product.category].profit +=
                sale.profit;
        });

    const rows =
        Object.entries(categories)
            .sort(
                (a, b) =>
                    b[1].revenue - a[1].revenue
            );

    if (!rows.length) {
        container.innerHTML = emptyState(
            "No category data",
            "Category performance will appear after sales."
        );

        return;
    }

    container.innerHTML = `
        <table class="table">

            <thead>
                <tr>
                    <th>Category</th>
                    <th>Units</th>
                    <th>Revenue</th>
                    <th>Profit</th>
                </tr>
            </thead>

            <tbody>

                ${rows.map(([category, data]) => `
                    <tr>

                        <td>
                            <strong>
                                ${escapeHTML(category)}
                            </strong>
                        </td>

                        <td>
                            ${data.units}
                        </td>

                        <td class="price">
                            ${formatCurrency(
                                data.revenue
                            )}
                        </td>

                        <td class="price">
                            ${formatCurrency(
                                data.profit
                            )}
                        </td>

                    </tr>
                `).join("")}

            </tbody>

        </table>
    `;
}

/* =========================================================
   CHARTS
   ========================================================= */

function drawSalesChart() {
    const canvas = $("#salesChart");

    if (!canvas) {
        return;
    }

    const wrapper =
        canvas.parentElement;

    const rect =
        wrapper.getBoundingClientRect();

    const width =
        Math.max(280, rect.width - 40);

    const height =
        Math.max(180, rect.height - 40);

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    const styles =
        getComputedStyle(document.documentElement);

    const textColor =
        styles.getPropertyValue("--muted").trim();

    const borderColor =
        styles.getPropertyValue("--border").trim();

    const primary =
        styles.getPropertyValue("--primary").trim();

    const labels = [];

    const values = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - i);

        labels.push(
            date.toLocaleDateString(
                "en-US",
                { weekday: "short" }
            )
        );

        const dayValue =
            state.sales
                .filter(
                    (sale) =>
                        sale.status === "Completed" &&
                        sameDate(
                            new Date(sale.date),
                            date
                        )
                )
                .reduce(
                    (sum, sale) =>
                        sum + sale.revenue,
                    0
                );

        values.push(dayValue);
    }

    const maxValue =
        Math.max(...values, 1000);

    const padding = {
        top: 15,
        right: 15,
        bottom: 35,
        left: 50
    };

    const chartWidth =
        width -
        padding.left -
        padding.right;

    const chartHeight =
        height -
        padding.top -
        padding.bottom;

    /* Grid */
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
        const y =
            padding.top +
            (chartHeight / 4) * i;

        ctx.beginPath();
        ctx.moveTo(
            padding.left,
            y
        );

        ctx.lineTo(
            width - padding.right,
            y
        );

        ctx.stroke();

        const value =
            maxValue -
            (maxValue / 4) * i;

        ctx.fillStyle = textColor;
        ctx.font = "9px Arial";
        ctx.textAlign = "right";

        ctx.fillText(
            formatCompactCurrency(value),
            padding.left - 8,
            y + 3
        );
    }

    /* Points */
    const points = values.map(
        (value, index) => {

            const x =
                padding.left +
                (chartWidth / 6) *
                index;

            const y =
                padding.top +
                chartHeight -
                (value / maxValue) *
                chartHeight;

            return { x, y };
        }
    );

    /* Area */
    const gradient =
        ctx.createLinearGradient(
            0,
            padding.top,
            0,
            height
        );

    gradient.addColorStop(
        0,
        hexToRgba(primary, 0.2)
    );

    gradient.addColorStop(
        1,
        hexToRgba(primary, 0)
    );

    ctx.beginPath();

    ctx.moveTo(
        points[0].x,
        height - padding.bottom
    );

    points.forEach((point) => {
        ctx.lineTo(point.x, point.y);
    });

    ctx.lineTo(
        points[points.length - 1].x,
        height - padding.bottom
    );

    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();

    /* Line */
    ctx.beginPath();

    points.forEach((point, index) => {

        if (index === 0) {
            ctx.moveTo(
                point.x,
                point.y
            );
        } else {
            ctx.lineTo(
                point.x,
                point.y
            );
        }

    });

    ctx.strokeStyle = primary;
    ctx.lineWidth = 2.5;

    ctx.stroke();

    /* Points */
    points.forEach((point) => {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            3.5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            getComputedStyle(document.documentElement)
                .getPropertyValue("--surface")
                .trim();

        ctx.fill();

        ctx.strokeStyle = primary;
        ctx.lineWidth = 2;

        ctx.stroke();

    });

    /* Labels */
    labels.forEach((label, index) => {

        const point = points[index];

        ctx.fillStyle = textColor;

        ctx.font = "10px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            label,
            point.x,
            height - 11
        );

    });
}

function renderCategoryChart() {
    const container =
        $("#categoryChart");

    if (!container) {
        return;
    }

    const categories = {};

    state.sales
        .filter((sale) => sale.status === "Completed")
        .forEach((sale) => {

            const product =
                getProduct(sale.productId);

            if (!product) {
                return;
            }

            categories[product.category] =
                (categories[product.category] || 0) +
                sale.revenue;
        });

    const entries =
        Object.entries(categories)
            .sort((a, b) => b[1] - a[1]);

    if (!entries.length) {
        container.innerHTML = emptyState(
            "No category data",
            "Sales category data will appear here."
        );

        return;
    }

    const total =
        entries.reduce(
            (sum, [, value]) => sum + value,
            0
        );

    container.innerHTML = entries.map(
        ([category, value]) => {

            const percent =
                total
                    ? Math.round(
                        (value / total) * 100
                    )
                    : 0;

            return `
                <div class="category-row">

                    <span class="category-name">
                        ${escapeHTML(category)}
                    </span>

                    <div class="category-bar">
                        <div
                            class="category-fill"
                            style="width:${percent}%"
                        ></div>
                    </div>

                    <span class="category-percent">
                        ${percent}%
                    </span>

                </div>
            `;
        }
    ).join("");
}

window.addEventListener(
    "resize",
    debounce(() => {
        drawSalesChart();
    }, 150)
);

/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

function setupGlobalSearch() {
    $("#globalSearch").addEventListener(
        "input",
        handleGlobalSearch
    );
}

function handleGlobalSearch(event) {
    const value =
        event.target.value.trim();

    if (!value) {
        return;
    }

    const query =
        value.toLowerCase();

    const productMatch =
        state.products.find(
            (product) =>
                product.name.toLowerCase().includes(query) ||
                product.sku.toLowerCase().includes(query)
        );

    if (productMatch) {
        navigateTo("products");

        $("#productSearch").value = value;

        renderProducts();

        return;
    }

    const saleMatch =
        state.sales.find((sale) => {

            const product =
                getProduct(sale.productId);

            return (
                sale.id.toLowerCase().includes(query) ||
                (sale.customer || "")
                    .toLowerCase()
                    .includes(query) ||
                (product?.name || "")
                    .toLowerCase()
                    .includes(query)
            );
        });

    if (saleMatch) {
        navigateTo("sales");

        $("#salesSearch").value = value;

        renderSales();
    }
}

/* =========================================================
   SETTINGS
   ========================================================= */

function setupSettingsEvents() {
    $("#saveSettings").addEventListener(
        "click",
        saveSettings
    );

    $("#themeToggle").addEventListener(
        "change",
        toggleTheme
    );

    $("#resetDemoData").addEventListener(
        "click",
        confirmResetData
    );

    $("#clearAllData").addEventListener(
        "click",
        confirmClearData
    );
}

function populateSettings() {
    $("#businessName").value =
        state.settings.businessName;

    $("#currency").value =
        state.settings.currency;

    $("#defaultThreshold").value =
        state.settings.defaultThreshold;

    $("#themeToggle").checked =
        document.documentElement.dataset.theme ===
        "dark";
}

function saveSettings() {
    const businessName =
        $("#businessName").value.trim();

    const currency =
        $("#currency").value;

    const threshold =
        Number($("#defaultThreshold").value);

    if (!businessName) {
        showToast(
            "error",
            "Invalid Settings",
            "Business name cannot be empty."
        );

        return;
    }

    if (
        !Number.isInteger(threshold) ||
        threshold < 1
    ) {
        showToast(
            "error",
            "Invalid Threshold",
            "Enter a threshold of at least 1."
        );

        return;
    }

    state.settings = {
        businessName,
        currency,
        defaultThreshold: threshold
    };

    saveData();
    renderAll();

    showToast(
        "success",
        "Settings Saved",
        "Your settings have been updated."
    );
}

/* =========================================================
   THEME
   ========================================================= */

function applySavedTheme() {
    const theme =
        localStorage.getItem(
            STORAGE_KEYS.theme
        );

    if (theme === "dark") {
        document.documentElement.dataset.theme =
            "dark";
    }
}

function toggleTheme(event) {
    const isDark =
        event.target.checked;

    if (isDark) {
        document.documentElement.dataset.theme =
            "dark";

        localStorage.setItem(
            STORAGE_KEYS.theme,
            "dark"
        );
    } else {
        document.documentElement.removeAttribute(
            "data-theme"
        );

        localStorage.setItem(
            STORAGE_KEYS.theme,
            "light"
        );
    }

    drawSalesChart();
    renderCategoryChart();
}

/* =========================================================
   RESET / CLEAR DATA
   ========================================================= */

function confirmResetData() {
    openConfirm(
        "Reset Demo Data?",
        "All products and sales will return to the original demo data.",
        resetDemoData
    );
}

function resetDemoData() {
    state.products =
        cloneData(DEMO_PRODUCTS);

    state.sales =
        cloneData(DEMO_SALES);

    state.settings =
        { ...DEFAULT_SETTINGS };

    saveData();
    populateSettings();
    renderAll();

    showToast(
        "success",
        "Demo Data Reset",
        "The original demo data has been restored."
    );
}

function confirmClearData() {
    openConfirm(
        "Clear All Data?",
        "This will remove every product and sale stored in this browser.",
        clearAllData
    );
}

function clearAllData() {
    state.products = [];
    state.sales = [];

    saveData();
    renderAll();

    showToast(
        "success",
        "Data Cleared",
        "All local business data has been removed."
    );
}

/* =========================================================
   MODALS
   ========================================================= */

function setupModalEvents() {
    $$("[data-close-modal]").forEach((button) => {

        button.addEventListener(
            "click",
            () => {
                closeModal(
                    button.dataset.closeModal
                );
            }
        );

    });

    $$(".modal-overlay").forEach((overlay) => {

        overlay.addEventListener(
            "mousedown",
            (event) => {

                if (event.target === overlay) {
                    closeModal(overlay.id);
                }

            }
        );

    });

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                $$(".modal-overlay.open")
                    .forEach((modal) => {
                        closeModal(modal.id);
                    });

                $("#notificationPopover")
                    .classList.remove("open");
            }

        }
    );

    $("#confirmCancel").addEventListener(
        "click",
        () => closeModal("confirmModal")
    );

    $("#confirmAction").addEventListener(
        "click",
        () => {

            if (typeof state.confirmCallback === "function") {
                state.confirmCallback();
            }

            state.confirmCallback = null;

            closeModal("confirmModal");
        }
    );
}

function openModal(id) {
    const modal = $(`#${id}`);

    if (modal) {
        modal.classList.add("open");

        document.body.style.overflow = "hidden";
    }
}

function closeModal(id) {
    const modal = $(`#${id}`);

    if (!modal) {
        return;
    }

    modal.classList.remove("open");

    if (!$(".modal-overlay.open")) {
        document.body.style.overflow = "";
    }
}

function openConfirm(title, message, callback) {
    $("#confirmTitle").textContent = title;
    $("#confirmMessage").textContent = message;

    state.confirmCallback = callback;

    openModal("confirmModal");
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function setupNotifications() {
    $("#notificationButton").addEventListener(
        "click",
        () => {
            $("#notificationPopover")
                .classList.toggle("open");
        }
    );

    $("#closeNotifications").addEventListener(
        "click",
        () => {
            $("#notificationPopover")
                .classList.remove("open");
        }
    );

    document.addEventListener(
        "click",
        (event) => {

            const popover =
                $("#notificationPopover");

            const button =
                $("#notificationButton");

            if (
                popover.classList.contains("open") &&
                !popover.contains(event.target) &&
                !button.contains(event.target)
            ) {
                popover.classList.remove("open");
            }

        }
    );
}

function renderNotifications() {
    const lowStock =
        state.products.filter(
            (product) =>
                getStockStatus(product) !== "in-stock"
        ).length;

    const recentSale =
        [...state.sales]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )[0];

    const notifications = [];

    if (lowStock > 0) {
        notifications.push({
            icon: "!",
            title: "Low stock alert",
            message:
                `${lowStock} product${lowStock === 1 ? "" : "s"} need attention.`
        });
    }

    if (recentSale) {
        notifications.push({
            icon: "↗",
            title: "Recent sale recorded",
            message:
                `${recentSale.id} — ${formatCurrency(
                    recentSale.revenue
                )}`
        });
    }

    notifications.push({
        icon: "▤",
        title: "Inventory synced",
        message:
            "Product stock is stored locally in this browser."
    });

    $("#notificationCount").textContent =
        notifications.length;

    $("#notificationList").innerHTML =
        notifications.map((item) => `
            <div class="notification-item">

                <div class="notification-icon">
                    ${item.icon}
                </div>

                <div>
                    <strong>
                        ${escapeHTML(item.title)}
                    </strong>

                    <p>
                        ${escapeHTML(item.message)}
                    </p>
                </div>

            </div>
        `).join("");
}

/* =========================================================
   TOASTS
   ========================================================= */

function showToast(type, title, message) {
    const container =
        $("#toastContainer");

    const toast =
        document.createElement("div");

    toast.className = "toast";

    const icon =
        type === "error"
            ? "!"
            : type === "warning"
            ? "!"
            : "✓";

    toast.innerHTML = `
        <div class="toast-icon">
            ${icon}
        </div>

        <div>
            <strong>
                ${escapeHTML(title)}
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("removing");

        setTimeout(() => {
            toast.remove();
        }, 180);

    }, 3500);
}

/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function getProduct(id) {
    return state.products.find(
        (product) => product.id === id
    );
}

function getStockStatus(product) {
    if (product.stock === 0) {
        return "out";
    }

    if (product.stock <= product.minimumStock) {
        return "low";
    }

    return "in-stock";
}

function stockBadge(product) {
    const status =
        getStockStatus(product);

    if (status === "out") {
        return `
            <span class="badge danger">
                Out of Stock
            </span>
        `;
    }

    if (status === "low") {
        return `
            <span class="badge warning">
                Low Stock
            </span>
        `;
    }

    return `
        <span class="badge success">
            In Stock
        </span>
    `;
}

function statusBadge(status) {
    if (status === "Completed") {
        return `
            <span class="badge success">
                Completed
            </span>
        `;
    }

    if (status === "Pending") {
        return `
            <span class="badge warning">
                Pending
            </span>
        `;
    }

    if (status === "Cancelled") {
        return `
            <span class="badge danger">
                Cancelled
            </span>
        `;
    }

    return `
        <span class="badge neutral">
            ${escapeHTML(status)}
        </span>
    `;
}

function formatCurrency(value) {
    const amount =
        Number(value) || 0;

    return `${state.settings.currency} ${amount.toLocaleString(
        "en-PK",
        {
            maximumFractionDigits: 0
        }
    )}`;
}

function formatCompactCurrency(value) {
    const amount =
        Number(value) || 0;

    if (amount >= 1000000) {
        return `${state.settings.currency}${(
            amount / 1000000
        ).toFixed(1)}M`;
    }

    if (amount >= 1000) {
        return `${state.settings.currency}${(
            amount / 1000
        ).toFixed(0)}k`;
    }

    return `${state.settings.currency}${Math.round(amount)}`;
}

function formatNumber(value) {
    return Number(value || 0).toLocaleString(
        "en-PK"
    );
}

function formatDate(value) {
    const date =
        new Date(value);

    return date.toLocaleDateString(
        "en-PK",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}

function getDateOffset(days, hour = 12) {
    const date = new Date();

    date.setDate(
        date.getDate() + days
    );

    date.setHours(
        hour,
        0,
        0,
        0
    );

    return date.toISOString();
}

function isToday(value) {
    return sameDate(
        new Date(value),
        new Date()
    );
}

function sameDate(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function createId(prefix) {
    return (
        prefix +
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2, 7)
    );
}

function createSaleId() {
    const highest =
        state.sales.reduce(
            (highestId, sale) => {

                const number =
                    Number(
                        String(sale.id)
                            .replace(/\D/g, "")
                    ) || 0;

                return Math.max(
                    highestId,
                    number
                );
            },
            1000
        );

    return `INV-${highest + 1}`;
}

function getInitials(name) {
    return String(name)
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) =>
            part.charAt(0).toUpperCase()
        )
        .join("");
}

function emptyState(title, message) {
    return `
        <div class="empty-state">

            <div class="empty-icon">
                ◌
            </div>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>
    `;
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function hexToRgba(hex, alpha) {
    const clean =
        hex.replace("#", "").trim();

    if (clean.length !== 6) {
        return `rgba(47, 107, 79, ${alpha})`;
    }

    const r =
        parseInt(
            clean.substring(0, 2),
            16
        );

    const g =
        parseInt(
            clean.substring(2, 4),
            16
        );

    const b =
        parseInt(
            clean.substring(4, 6),
            16
        );

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function debounce(callback, delay) {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);

        timeout = setTimeout(
            () => callback(...args),
            delay
        );
    };
}

/* =========================================================
   KEYBOARD / ACCESSIBILITY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "/" &&
            !["INPUT", "TEXTAREA", "SELECT"].includes(
                document.activeElement.tagName
            )
        ) {
            event.preventDefault();

            $("#globalSearch").focus();
        }

    }
);

/* =========================================================
   INITIAL DATA SAFETY
   ========================================================= */

window.addEventListener(
    "error",
    (event) => {
        console.error(
            "StockFlow error:",
            event.error
        );
    }
);