window.onload = toggledaynight;

function toggledaynight(){
    if(document.getElementById("toggledaynight").checked==false){
        document.getElementById("body").style.background="url(source/img/background/day.png) no-repeat";
        document.getElementById("body").style.backgroundAttachment="fixed";
        document.getElementById("hr").style.border="1px dashed rgb(0,0,0)";
        document.getElementById("proj").style.color="rgb(0,0,0)";
        document.getElementById("mainbox").style.color="rgb(0,0,0)";
        document.getElementById("mainbox").style.backgroundColor="rgba(255,255,255,0.5)";
        document.getElementById("mainbox").style.boxShadow="0 5px 15px rgba(255,255,255,0.5)";
        document.getElementById("home").style.filter="invert(0)";
        document.getElementById("wechat").style.filter="invert(0)";
        document.getElementById("qq").style.filter="invert(0)";
        document.getElementById("mail").style.filter="invert(0)";
        document.getElementById("bilibili").style.filter="invert(0)";
    }else{
        document.getElementById("body").style.background="url(source/img/background/night.png) no-repeat";
        document.getElementById("body").style.backgroundAttachment="fixed";
        document.getElementById("hr").style.border="1px dashed rgb(255,255,255)";
        document.getElementById("proj").style.color="rgb(255,255,255)";
        document.getElementById("mainbox").style.color="rgb(255,255,255)";
        document.getElementById("mainbox").style.backgroundColor="rgba(0,0,0,0.5)";
        document.getElementById("mainbox").style.boxShadow="0 5px 15px rgba(0,0,0,0.5)";
        document.getElementById("home").style.filter="invert(1)";
        document.getElementById("wechat").style.filter="invert(1)";
        document.getElementById("qq").style.filter="invert(1)";
        document.getElementById("mail").style.filter="invert(1)";
        document.getElementById("bilibili").style.filter="invert(1)";
    }
    return false;
}