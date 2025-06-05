document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // 检查用户是否登录
    if (!currentUser || currentUser.role !== 'customer') {
        alert('请先登录顾客账号');
        window.location.href = 'login/login.html'; // 使用超链接跳转跳
    }

    // 动态加载用户信息
    const userAuthElement = document.getElementById('user-auth');
    if (userAuthElement) {
        userAuthElement.innerHTML = `
            <div class="user-profile">
                <span>${currentUser.username}</span>
            </div>
        `;
    }

    // 加载购物车商品
    loadCartItems();

    // 加载商家列表
    loadRestaurants();

    // 加载菜品列表
    const restaurantId = new URLSearchParams(window.location.search).get('restaurantId');
    if (restaurantId) {
        loadDishes(restaurantId);
    }

    // 加载进行中订单或历史订单
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('/active.html')) {
        loadActiveOrders();
    } else if (currentPath.endsWith('/history.html')) {
        loadHistoryOrders();
    }

    // 加入购物车功能
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dishCard = button.closest('.dish-card');
            const dishId = dishCard.dataset.id;
            addToCart(dishId);
        });
    });

    // 购物车操作
    const cartItems = document.querySelector('.cart-items');
    cartItems.addEventListener('click', function(event) {
        if (event.target.classList.contains('quantity-btn')) {
            const quantity = event.target.closest('.cart-item').querySelector('.quantity');
            let count = parseInt(quantity.textContent);

            if (event.target.classList.contains('minus') && count > 1) {
                count--;
            } else if (event.target.classList.contains('plus')) {
                count++;
            }

            quantity.textContent = count;
            updateCartQuantity();
        }

        if (event.target.classList.contains('remove-item')) {
            event.target.closest('.cart-item').remove();
            updateCartQuantity();
        }
    });

    // 结算按钮
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        if (cartItems.children.length === 0) {
            alert('购物车为空');
            return;
        }

        alert('下单成功');
        cartItems.innerHTML = '';
        updateCartQuantity();
    });

    // 加载个人中心信息
    loadProfile();
});

function loadCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const dishes = JSON.parse(localStorage.getItem('dishes') || '[]');

    cartItemsContainer.innerHTML = cart.map(item => {
        const dish = dishes.find(d => d.id === item.dishId);
        return `
            <div class="cart-item">
                <img src="${dish.image}" alt="${dish.name}">
                <div class="item-info">
                    <h3>${dish.name}</h3>
                    <p class="price">¥${dish.price.toFixed(2)}</p>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus" data-dish-id="${dish.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-dish-id="${dish.id}">+</button>
                </div>
                <div class="item-total">¥${(dish.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" data-dish-id="${dish.id}">删除</button>
            </div>
        `;
    }).join('');

    updateCartQuantity();
}

function updateCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalPrice = document.getElementById('total-price');
    const total = cart.reduce((sum, item) => {
        const dish = JSON.parse(localStorage.getItem('dishes')).find(d => d.id === item.dishId);
        return sum + dish.price * item.quantity;
    }, 0);

    totalPrice.textContent = `¥${total.toFixed(2)}`;
}

function loadRestaurants() {
    const restaurantsList = document.querySelector('.restaurants-list');
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');

    restaurantsList.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-item">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.description}</p>
            <button class="view-dishes" data-restaurant-id="${restaurant.id}">查看菜品</button>
        </div>
    `).join('');

    document.querySelectorAll('.view-dishes').forEach(button => {
        button.addEventListener('click', function() {
            const restaurantId = button.dataset.restaurantId;
            window.location.href = `/customer/dishes.html?restaurantId=${restaurantId}`;
        });
    });
}

function loadDishes(restaurantId) {
    const dishesList = document.querySelector('.dishes-list');
    const dishes = JSON.parse(localStorage.getItem('dishes') || '[]');

    dishesList.innerHTML = dishes
        .filter(dish => dish.restaurantId === parseInt(restaurantId))
        .map(dish => `
            <div class="dish-card">
                <img src="${dish.image}" alt="${dish.name}">
                <div class="dish-info">
                    <h3>${dish.name}</h3>
                    <p class="price">¥${dish.price.toFixed(2)}</p>
                    <p class="description">${dish.description}</p>
                    <button class="add-to-cart" data-dish-id="${dish.id}">加入购物车</button>
                </div>
            </div>
        `).join('');
}

function addToCart(dishId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const dish = cart.find(item => item.dishId === dishId);

    if (dish) {
        dish.quantity++;
    } else {
        cart.push({ dishId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('已加入购物车');
}

function loadActiveOrders() {
    const ordersList = document.querySelector('.orders-list');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    ordersList.innerHTML = orders
        .filter(order => order.status === 'processing')
        .map(order => `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-id">订单号: #${order.id}</span>
                    <span class="order-date">${order.date}</span>
                    <span class="order-status ${order.status}">${order.status}</span>
                </div>
                <div class="order-details">
                    <div class="order-dishes">
                        ${order.dishes.map(dish => `
                            <div class="dish-item">
                                <span class="dish-name">${dish.name} ×${dish.quantity}</span>
                                <span class="dish-price">¥${dish.price.toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-summary">
                        <div class="summary-row">
                            <span>总计</span>
                            <span>¥${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
}

function loadHistoryOrders() {
    const ordersList = document.querySelector('.orders-list');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    ordersList.innerHTML = orders
        .filter(order => order.status === 'completed')
        .map(order => `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-id">订单号: #${order.id}</span>
                    <span class="order-date">${order.date}</span>
                    <span class="order-status ${order.status}">${order.status}</span>
                </div>
                <div class="order-details">
                    <div class="order-dishes">
                        ${order.dishes.map(dish => `
                            <div class="dish-item">
                                <span class="dish-name">${dish.name} ×${dish.quantity}</span>
                                <span class="dish-price">¥${dish.price.toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-summary">
                        <div class="summary-row">
                            <span>总计</span>
                            <span>¥${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
}

function loadProfile() {
    const usernameInput = document.getElementById('username');
    const avatarInput = document.getElementById('avatar');

    usernameInput.value = currentUser.username;
    avatarInput.value = currentUser.avatar || '';

    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const avatar = document.getElementById('avatar').files[0];

        if (avatar) {
            currentUser.avatar = URL.createObjectURL(avatar);
        }

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('个人中心设置保存成功');
    });
}

// 在customer.js中添加以下代码
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // 检查用户是否登录
    if (!currentUser || !currentUser.id) {
        alert('请先登录');
        window.location.href = '/login/login.html';
        return;
    }
    
    // 如果是仪表盘页面，加载数据
    if (window.location.pathname.endsWith('dashboard.html')) {
        loadDashboardData();
    }
});

function loadDashboardData() {
    // 加载推荐餐厅数据
    loadRecommendedRestaurants();
    
    // 加载最近订单数据
    loadRecentOrders();
}

function loadRecommendedRestaurants() {
    // 这里应该是从API获取数据，这里使用模拟数据
    const restaurants = [
        {
            id: 1,
            name: "川湘阁",
            image: "images/restaurant1.jpg",
            rating: 4.2,
            cuisine: "川菜 | 湘菜 | 麻辣",
            deliveryFee: 5,
            deliveryTime: "30分钟"
        },
        {
            id: 2,
            name: "粤式茶餐厅",
            image: "images/restaurant2.jpg",
            rating: 4.8,
            cuisine: "粤菜 | 点心 | 烧腊",
            deliveryFee: 3,
            deliveryTime: "25分钟"
        }
    ];
    
    const container = document.querySelector('.recommended-restaurants');
    container.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-card" data-id="${restaurant.id}">
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="restaurant-info">
                <h3>${restaurant.name}</h3>
                <div class="rating">
                    <span class="stars">${getStarRating(restaurant.rating)}</span>
                    <span class="score">${restaurant.rating}</span>
                </div>
                <p class="cuisine">${restaurant.cuisine}</p>
                <p class="delivery">¥${restaurant.deliveryFee}配送费 | ${restaurant.deliveryTime}</p>
            </div>
        </div>
    `).join('');
    
    // 添加点击事件
    document.querySelectorAll('.restaurant-card').forEach(card => {
        card.addEventListener('click', function() {
            const restaurantId = this.dataset.id;
            window.location.href = `restaurant.html?id=${restaurantId}`;
        });
    });
}

function loadRecentOrders() {
    // 这里应该是从API获取数据，这里使用模拟数据
    const orders = [
        {
            id: 12345,
            date: "2023-05-15",
            status: "completed",
            restaurant: "川湘阁",
            items: [
                { name: "宫保鸡丁", quantity: 1, price: 38 },
                { name: "水煮鱼", quantity: 1, price: 30 }
            ],
            total: 68
        }
    ];
    
    const container = document.querySelector('.recent-orders');
    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">订单 #${order.id}</span>
                <span class="order-date">${order.date}</span>
                <span class="order-status ${order.status}">
                    ${order.status === 'completed' ? '已完成' : '进行中'}
                </span>
            </div>
            <div class="order-details">
                <p class="restaurant">${order.restaurant}</p>
                <p class="items">${order.items.map(item => `${item.name} ×${item.quantity}`).join(', ')}</p>
                <p class="total">总计: ¥${order.total.toFixed(2)}</p>
            </div>
            <div class="order-actions">
                <button class="btn-reorder" data-order-id="${order.id}">再来一单</button>
            </div>
        </div>
    `).join('');
    
    // 添加"再来一单"功能
    document.querySelectorAll('.btn-reorder').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const orderId = this.dataset.orderId;
            reorder(orderId);
        });
    });
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

function reorder(orderId) {
    // 这里应该是实现"再来一单"的逻辑
    alert(`将重新下单 #${orderId}`);
    // 实际应用中，这里应该将原订单中的商品加入购物车
}