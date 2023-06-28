window.onload = toggle;

function toggle(){
    toggledaynight();
    toggledaynightmobile();
}
function toggledaynight(){
    if(document.getElementById("toggledaynight").checked==false){
        document.getElementById("mainpic").style.backgroundImage="url(source/img/background/day.png)";
        document.getElementById("hr").style.border="1px dashed rgb(0,0,0)";
        document.getElementById("proj").style.color="rgb(0,0,0)";
        document.getElementById("mainbox").style.color="rgb(0,0,0)";
        document.getElementById("mainbox").style.backgroundColor="rgba(255,255,255,0.5)";
        document.getElementById("mainbox").style.boxShadow="0 5px 15px rgba(255,255,255,0.5)";
        document.getElementById("contact").style.filter="invert(0)";
    }else{
        document.getElementById("mainpic").style.backgroundImage="url(source/img/background/night.png)";
        document.getElementById("hr").style.border="1px dashed rgb(255,255,255)";
        document.getElementById("proj").style.color="rgb(255,255,255)";
        document.getElementById("mainbox").style.color="rgb(255,255,255)";
        document.getElementById("mainbox").style.backgroundColor="rgba(0,0,0,0.5)";
        document.getElementById("mainbox").style.boxShadow="0 5px 15px rgba(0,0,0,0.5)";
        document.getElementById("contact").style.filter="invert(1)";
    }
    return false;
}
function toggledaynightmobile(){
    if(document.getElementById("toggledaynight-m").checked==false){
        document.getElementById("mainpic-m").style.backgroundImage="url(source/img/background/daymobile.png)";
        document.getElementById("hr-m").style.border="1px dashed rgb(0,0,0)";
        document.getElementById("proj-m").style.color="rgb(0,0,0)";
        document.getElementById("mainbox-m").style.color="rgb(0,0,0)";
        document.getElementById("mainbox-m").style.backgroundColor="rgba(255,255,255,0.5)";
        document.getElementById("mainbox-m").style.boxShadow="0 5px 15px rgba(255,255,255,0.5)";
        document.getElementById("contact-m").style.filter="invert(0)";
    }else{
        document.getElementById("mainpic-m").style.backgroundImage="url(source/img/background/nightmobile.png)";
        document.getElementById("hr-m").style.border="1px dashed rgb(255,255,255)";
        document.getElementById("proj-m").style.color="rgb(255,255,255)";
        document.getElementById("mainbox-m").style.color="rgb(255,255,255)";
        document.getElementById("mainbox-m").style.backgroundColor="rgba(0,0,0,0.5)";
        document.getElementById("mainbox-m").style.boxShadow="0 5px 15px rgba(0,0,0,0.5)";
        document.getElementById("contact-m").style.filter="invert(1)";
    }
    return false;
}