const projects = [
    {
        title: "智能化网上订餐Web平台",
        subtitle: "Intelligent Online Ordering Web Platform",
        img: "source/img/project/8.jpg",
        link: "https://dgcrohmmlkgk.cloud.sealos.io",
        tags: ["Vue3", "Laravel", "Nginx", "Web应用"]
    },
    {
        title: "扫雷",
        subtitle: "MineSweeper",
        img: "source/img/project/7.jpg",
        link: "source/file/MineSweeper.zip",
        tags: ["Java", "Python", "小游戏"]
    },
    {
        title: "密室杀手",
        subtitle: "Murder Mystery",
        img: "source/img/project/1.gif",
        link: "https://www.bilibili.com/opus/608222434889664218",
        tags: ["Minecraft", "数据包", "小游戏", "1.16", "1.17", "1.18", "1.19"]
    },
    {
        title: "太阳视运动模拟器",
        subtitle: "Solar Visual Motion Simulator",
        img: "source/img/project/2.gif",
        link: "https://aerfaying.com/Projects/211369",
        tags: ["Scratch", "地理", "模拟", "小程序"]
    },
    {
        title: "更真实的昼夜交替",
        subtitle: "Realistic Daylight Cycle",
        img: "source/img/project/3.gif",
        link: "https://www.bilibili.com/opus/684545601710325769",
        tags: ["Minecraft", "数据包", "模拟", "地理", "1.13", "1.14", "1.15", "1.16", "1.17", "1.18", "1.19", "1.20", "1.21"]
    },
    {
        title: "微信聊天机器人",
        subtitle: "WeChat Bot",
        img: "source/img/project/6.jpg",
        link: "source/file/wechatbot.zip",
        tags: ["Python", "聊天", "机器人"]
    }
];

function projectCreate() {
    const projectTable = document.querySelector('.table_project');
    projects.forEach (project => {
        // 创建行
        const newRow = document.createElement('tr');
        // 创建图片列
        const projectImg = document.createElement('img');
        projectImg.src = project.img;
        projectImg.className = "img img_project";
        projectImg.addEventListener('mouseenter', function () {
            projectImg.style.transform = 'scale(1.02)';
        });
        projectImg.addEventListener('mouseleave', function () {
            projectImg.style.transform = 'scale(1)';
        });
        const projectLink = document.createElement('a');
        projectLink.href = project.link;
        projectLink.target = "_blank";
        projectLink.appendChild(projectImg);
        const imgColumn = document.createElement('td');
        imgColumn.className = "table_project_column";
        imgColumn.appendChild(projectLink);
        // 创建介绍列
        const projectTitle = document.createElement('div');
        projectTitle.className = "box_row_project_title";
        projectTitle.textContent = project.title;
        const projectSubtitle = document.createElement('div');
        projectSubtitle.className = "box_row_project_subtitle";
        projectSubtitle.textContent = project.subtitle;
        const projectTag = document.createElement('div');
        projectTag.className = "box_row_tags";
        project.tags.forEach (tag => {
            const tagElement = document.createElement('tag');
            tagElement.textContent = tag;
            projectTag.appendChild(tagElement);
        });
        const infoColumn = document.createElement('td');
        infoColumn.className = "table_project_column";
        infoColumn.appendChild(projectTitle);
        infoColumn.appendChild(projectSubtitle);
        infoColumn.appendChild(projectTag);
        // 加入新行
        newRow.appendChild(imgColumn);
        newRow.appendChild(infoColumn);
        projectTable.appendChild(newRow);
    });
}
function projectSearch() {
    const projectSearchInput = document.querySelector('.input_search_project');
    const inputText = projectSearchInput.value.trim();
    let keywordList = [];
    if (inputText !== "") {
        keywordList = inputText.split(' ');
    }
    const projectTable = document.querySelector('.table_project');
    const projectRows = projectTable.querySelectorAll('tr');
    let projectSearchCount = 0;
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const includeTag = keywordList.length === 0 || [project.title, project.subtitle, ...project.tags].some(item => keywordList.some(word => item.includes(word)));
        if (includeTag) {
            projectRows[i].style.display = 'table-row';
            projectSearchCount++;
        }
        else {
            projectRows[i].style.display = 'none';
        }
    }
    const projectSearchResult = document.querySelector('.box_row_search_project_result');
    if (keywordList.length === 0) {
        projectSearchResult.style.display = 'none';
    }
    else {
        projectSearchResult.style.display = 'block';
        projectSearchResult.textContent = `找到了${projectSearchCount}个结果`;
    }
}
function initProjects() {
    // 搜索框
    const projectSearchInput = document.querySelector('.input_search_project');
    projectSearchInput.addEventListener('focus', function () {
        projectSearchInput.style.border = '2px solid rgba(0, 0, 0, 0.4)';
    });
    projectSearchInput.addEventListener('blur', function () {
        projectSearchInput.style.border = '2px solid rgba(255, 255, 255, 0.4)';
    });
    projectSearchInput.addEventListener('input', projectSearch);
    // 初始化项目
    projectCreate();
}
