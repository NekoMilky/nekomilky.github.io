document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.querySelector('.tab[data-tab="login"]');
    const registerTab = document.querySelector('.tab[data-tab="register"]');

    // 切换登录和注册表单
    loginTab.addEventListener('click', function() {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    });

    registerTab.addEventListener('click', function() {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
    });

    // 登录表单提交
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // 模拟登录验证
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // 根据用户角色跳转到不同的仪表盘
            let redirectUrl = '';
            switch(user.role) {
                case 'customer':
                    redirectUrl = '/customer/dashboard.html';
                    break;
                case 'merchant':
                    redirectUrl = '/merchant/dashboard.html';
                    break;
                case 'admin':
                    redirectUrl = '/admin/dashboard.html';
                    break;
                default:
                    redirectUrl = '/customer/dashboard.html';
            }
            
            window.location.href = redirectUrl;
        } else {
            alert('用户名或密码错误');
        }
    });

    // 注册表单提交
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        const role = document.getElementById('register-role').value;

        if (password !== confirmPassword) {
            alert('密码不一致');
            return;
        }

        // 模拟保存用户信息
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ username, password, role });
        localStorage.setItem('users', JSON.stringify(users));

        alert('注册成功，请登录');
        loginTab.click();
    });
});    