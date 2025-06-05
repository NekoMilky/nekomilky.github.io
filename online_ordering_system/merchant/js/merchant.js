document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // 检查用户登录和角色（合并重复检查逻辑）
    if (!currentUser || currentUser.role !== 'merchant') {
        alert('请先登录商家账号');
        window.location.href = '/login/login.html';
        return;
    }

    loadNavigation(); // 加载导航栏
    
    // 根据当前页面路径加载对应内容
    const currentPath = window.location.pathname;
    const pageHandlers = {
        'dashboard.html': loadDashboard,
        'list.html': loadDishList,
        'add.html': setupAddDishForm,
        'new.html': loadNewOrders,
        'history.html': loadOrderHistory,
        'setting.html': () => {
            loadMerchantSettings();
            setupSettingsForm();
        }
    };

    const handler = pageHandlers[currentPath.split('/').pop()];
    handler && handler();

    // 公共点击跳转逻辑（合并仪表盘和导航栏点击）
    if (currentPath.includes('dashboard')) {
        document.querySelectorAll('.stat-card.clickable').forEach(card => {
            card.addEventListener('click', function() {
                const url = this.dataset.url;
                if (url) window.location.href = `/${currentUser.role}/${url}`;
            });
        });
    }
});

// 统一导航栏加载函数（合并重复定义）
function loadNavigation() {
    const navItems = document.querySelector('.nav-items');
    if (!navItems) return;
    
    navItems.innerHTML = `
        <ul class="nav-menu">
            <li><a href="dashboard.html">仪表盘</a></li>
            <li><a href="list.html">菜品管理</a></li>
            <li><a href="orders/new.html">新订单</a></li>
            <li><a href="orders/history.html">订单历史</a></li>
            <li><a href="setting.html">店铺设置</a></li>
        </ul>
        <div class="user-profile">
            <span>${currentUser.username}</span>
            <button id="logout-btn" class="btn-logout">退出</button>
        </div>
    `;
    
    // 退出功能（合并重复事件绑定）
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = '/login/login.html';
    });
}

// 菜品管理相关函数（保持原有逻辑）
function loadDishList() {
    const dishes = JSON.parse(localStorage.getItem('dishes') || []);
    const tableBody = document.getElementById('dishes-table-body');
    tableBody.innerHTML = dishes.map(dish => `
        <tr>
            <td>${dish.id}</td>
            <td><img src="${dish.image || 'images/default-dish.png'}" alt="${dish.name}" class="dish-thumb"></td>
            <td>${dish.name}</td>
            <td>¥${dish.price.toFixed(2)}</td>
            <td>${dish.description || '暂无描述'}</td>
            <td>
                <button class="btn-edit" data-id="${dish.id}">编辑</button>
                <button class="btn-delete" data-id="${dish.id}">删除</button>
            </td>
        </tr>
    `).join('');
    
    // 编辑/删除事件
    document.querySelectorAll('.btn-edit').forEach(btn => 
        btn.addEventListener('click', () => 
            window.location.href = `add.html?edit=${btn.dataset.id}`
        )
    );
    
    document.querySelectorAll('.btn-delete').forEach(btn => 
        btn.addEventListener('click', () => {
            const dishId = parseInt(btn.dataset.id);
            if (confirm('确定要删除这个菜品吗？')) {
                deleteDish(dishId);
            }
        })
    );
    
    document.getElementById('add-dish-btn')?.addEventListener('click', () => 
        window.location.href = 'add.html'
    );
}

function deleteDish(id) {
    let dishes = JSON.parse(localStorage.getItem('dishes') || []);
    dishes = dishes.filter(dish => dish.id !== id);
    localStorage.setItem('dishes', JSON.stringify(dishes));
    loadDishList();
    alert('菜品删除成功');
}

function setupAddDishForm() {
    const form = document.getElementById('add-dish-form');
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const dishes = JSON.parse(localStorage.getItem('dishes') || []);
    const dish = editId ? dishes.find(d => d.id === parseInt(editId)) : null;

    // 初始化表单
    if (dish) {
        document.getElementById('dish-name').value = dish.name;
        document.getElementById('dish-price').value = dish.price;
        document.getElementById('dish-description').value = dish.description || '';
        document.querySelector('h1').textContent = '编辑菜品';
        form.querySelector('button').textContent = '更新菜品';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('dish-name').value.trim();
        const price = parseFloat(document.getElementById('dish-price').value);
        const description = document.getElementById('dish-description').value.trim();
        const imageFile = document.getElementById('dish-image').files[0];
        let imageUrl = imageFile ? URL.createObjectURL(imageFile) : (dish?.image || 'images/default-dish.png');

        if (!name || isNaN(price) || price <= 0) {
            alert('请填写有效的菜品名称和价格');
            return;
        }

        let newDishes = [...dishes];
        if (editId) {
            newDishes = newDishes.map(d => d.id === parseInt(editId) ? { ...d, name, price, description, image: imageUrl } : d);
        } else {
            newDishes.push({
                id: dishes.length > 0 ? Math.max(...dishes.map(d => d.id)) + 1 : 1,
                name,
                price,
                description,
                image: imageUrl
            });
        }

        localStorage.setItem('dishes', JSON.stringify(newDishes));
        alert(editId ? '菜品更新成功' : '菜品添加成功');
        window.location.href = 'list.html';
    });
}

// 订单管理相关函数（合并重复逻辑）
function loadOrders(type) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const filteredOrders = type === 'new' ? 
        orders.filter(order => order.status === 'pending') :
        orders.filter(order => order.status !== 'pending');
    
    const containerId = type === 'new' ? 'new-orders-container' : 'history-orders-container';
    const container = document.getElementById(containerId);
    
    if (filteredOrders.length === 0) {
        container.innerHTML = '<div class="no-orders">暂无' + (type === 'new' ? '新' : '历史') + '订单</div>';
        return;
    }

    container.innerHTML = filteredOrders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <span class="order-id">订单号: #${order.id}</span>
                <span class="order-date">${formatDate(order.date)}</span>
                <span class="order-status ${getStatusClass(order.status)}">
                    ${getStatusText(order.status)}
                </span>
            </div>
            <div class="order-details">
                <div class="order-dishes">
                    ${order.items.map(item => `
                        <div class="dish-item">
                            <span class="dish-name">${item.name} ×${item.quantity}</span>
                            <span class="dish-price">¥${item.price.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-summary">
                    <div class="summary-row">小计<span>¥${order.subtotal.toFixed(2)}</span></div>
                    <div class="summary-row">配送费<span>¥${order.deliveryFee.toFixed(2)}</span></div>
                    <div class="summary-row total">总计<span>¥${order.total.toFixed(2)}</span></div>
                </div>
                ${type === 'new' ? `
                <div class="order-actions">
                    <button class="btn-action btn-accept" data-order-id="${order.id}">接单</button>
                    <button class="btn-action btn-reject" data-order-id="${order.id}">拒单</button>
                </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    if (type === 'new') {
        document.querySelectorAll('.btn-action').forEach(btn => 
            btn.addEventListener('click', () => 
                updateOrderStatus(btn.dataset.orderId, btn.classList.contains('btn-accept') ? 'processing' : 'rejected')
            )
        );
    }
}

// 简化后的订单加载函数
function loadNewOrders() {
    loadOrders('new');
}

function loadOrderHistory() {
    loadOrders('history');
}

// 公共状态更新函数
function updateOrderStatus(orderId, status) {
    let orders = JSON.parse(localStorage.getItem('orders') || []);
    orders = orders.map(order => order.id === orderId ? { ...order, status } : order);
    localStorage.setItem('orders', JSON.stringify(orders));
    alert(`订单 #${orderId} 已${status === 'processing' ? '接单' : '拒单'}`);
    window.location.reload();
}

// 店铺设置相关函数（保持原有逻辑）
function loadMerchantSettings() {
    const settings = JSON.parse(localStorage.getItem('merchantSettings') || {});
    document.getElementById('shop-name').value = settings.shopName || '';
    document.getElementById('shop-address').value = settings.shopAddress || '';
    document.getElementById('shop-contact').value = settings.shopContact || '';
    document.getElementById('shop-logo-preview').src = settings.shopLogo || '';
    document.getElementById('shop-logo-preview').style.display = settings.shopLogo ? 'block' : 'none';
}

function setupSettingsForm() {
    const form = document.getElementById('settings-form');
    const logoInput = document.getElementById('shop-logo');
    const logoPreview = document.getElementById('shop-logo-preview');

    logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) logoPreview.src = URL.createObjectURL(file);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const shopName = document.getElementById('shop-name').value.trim();
        const shopAddress = document.getElementById('shop-address').value.trim();
        const shopContact = document.getElementById('shop-contact').value.trim();
        const logoFile = document.getElementById('shop-logo').files[0];
        const logoUrl = logoFile ? URL.createObjectURL(logoFile) : 
            JSON.parse(localStorage.getItem('merchantSettings') || '{}').shopLogo || '';

        if (!shopName || !shopAddress || !shopContact) {
            alert('请填写所有必填字段');
            return;
        }

        localStorage.setItem('merchantSettings', JSON.stringify({
            shopName,
            shopAddress,
            shopContact,
            shopLogo: logoUrl
        }));
        alert('店铺设置保存成功');
    });
}

// 公共辅助函数（合并重复逻辑）
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });
}

function getStatusClass(status) {
    return ['pending', 'processing', 'completed', 'rejected'].includes(status) ? status : 'pending';
}

function getStatusText(status) {
    return {
        pending: '待处理',
        processing: '处理中',
        completed: '已完成',
        rejected: '已拒绝'
    }[status] || '未知状态';
}