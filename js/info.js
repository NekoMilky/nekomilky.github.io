const infoTags = ["萌", "饭桶", "温柔", "摩羯座", "幼稚鬼"];
const infoContacts = [
    {
        img: "source/img/contact/wechat.png",
        link: "source/file/wechat.png"
    },
    {
        img: "source/img/contact/qq.png",
        link: "source/file/qq.png"
    },
    {
        img: "source/img/contact/bilibili.png",
        link: "https://space.bilibili.com/417077119"
    },
    {
        img: "source/img/contact/youtube.png",
        link: "https://www.youtube.com/@NekomusumeMilk"
    },
    {
        img: "source/img/contact/x.png",
        link: "https://x.com/NekomusumeMilk"
    }
];

function contactShow() {
    const contactBox = document.querySelector('.box_row_contacts');
    infoContacts.forEach (contact => {
        // 创建联系方式
        const contactImg = document.createElement('img');
        contactImg.src = contact.img;
        contactImg.className = "img img_contact";
        contactImg.addEventListener('mouseenter', function () {
            contactImg.style.transform = 'scale(1.2)';
        });
        contactImg.addEventListener('mouseleave', function () {
            contactImg.style.transform = 'scale(1)';
        });
        const contactElement = document.createElement('a');
        contactElement.href = contact.link;
        contactElement.target = "_blank";
        // 加入新联系方式
        contactElement.appendChild(contactImg);
        contactBox.appendChild(contactElement);
    });
}
function tagsShow() {
    const tagBox = document.querySelector('.box_row_tags');
    infoTags.forEach (tag => {
        // 创建标签
        const tagElement = document.createElement('tag');
        tagElement.textContent = tag;
        // 加入新标签
        tagBox.appendChild(tagElement);
    });
}
function initInfo() {
    contactShow();
    tagsShow();
}