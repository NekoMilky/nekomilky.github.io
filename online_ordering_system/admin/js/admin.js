document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // 检查用户是否登录
    if (!currentUser || currentUser.role !== 'admin') {
        alert('请先登录管理员账号');
        window.location.href = '/login/login.html';
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

    // 加载管理员数据
    loadAdminData();

    // 初始化订单监控页面
    const orderTabs = document.querySelectorAll('.order-tabs .tab');
    const orderItemsContainer = document.querySelector('.order-items');

    orderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            orderTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const status = tab.dataset.status;
            loadOrders(status);
        });
    });

    // 默认加载全部订单
    loadOrders('all');

    // 加载系统设置
    loadSystemSettings();

    // 保存系统设置
    const systemSettingsForm = document.getElementById('system-settings-form');
    systemSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const platformName = document.getElementById('platform-name').value;
        const contactInfo = document.getElementById('contact-info').value;

        // 模拟保存系统设置
        localStorage.setItem('systemSettings', JSON.stringify({ platformName, contactInfo }));

        alert('设置保存成功');
    });
});

function loadAdminData() {
    // 模拟从本地存储获取订单数据
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const todayOrders = orders.filter(order => new Date(order.date).toDateString() === new Date().toDateString()).length;
    const monthlyOrders = orders.filter(order => new Date(order.date).getMonth() === new Date().getMonth()).length;
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    document.getElementById('today-orders').textContent = todayOrders;
    document.getElementById('monthly-orders').textContent = monthlyOrders;
    document.getElementById('total-sales').textContent = `¥${totalSales.toFixed(2)}`;
}

function loadOrders(status) {
    const orderItemsContainer = document.querySelector('.order-items');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    orderItemsContainer.innerHTML = orders
        .filter(order => status === 'all' || order.status === status)
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

function loadSystemSettings() {
    const settings = JSON.parse(localStorage.getItem('systemSettings') || '{}');
    document.getElementById('platform-name').value = settings.platformName || '';
    document.getElementById('contact-info').value = settings.contactInfo || '';
}