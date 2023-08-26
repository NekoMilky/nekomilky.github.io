window.onload = load;

function load(){
    toggledaynight();
}

function toggledaynight(){
    if(document.getElementById("toggledaynight").checked==false){
		var n=1;
		bg = new Array(n-1);
		for(var i=1;i<=n;i++){
			bg[i-1] = 'url(source/img/background/day/'+(i)+'.png)'
		}
		index = Math.floor(Math.random() * bg.length);
		document.getElementById("mainpic").style.backgroundImage=(bg[index]);
		
        document.getElementById("hr").style.border="1px dashed rgb(0,0,0)";
        document.getElementById("proj").style.color="rgb(0,0,0)";
        document.getElementById("mainbox").style.color="rgb(0,0,0)";
        document.getElementById("mainbox").style.backgroundColor="rgba(255,255,255,0.5)";
        document.getElementById("mainbox").style.boxShadow="0 5px 15px rgba(255,255,255,0.5)";
        document.getElementById("contact").style.filter="invert(0)";
    }else{
		var n=1;
		bg = new Array(n-1);
		for(var i=1;i<=n;i++){
			bg[i-1] = 'url(source/img/background/night/'+(i)+'.png)'
		}
		index = Math.floor(Math.random() * bg.length);
		document.getElementById("mainpic").style.backgroundImage=(bg[index]);
		
        document.getElementById("hr").style.border="1px dashed rgb(255,255,255)";
        document.getElementById("proj").style.color="rgb(255,255,255)";
        document.getElementById("mainbox").style.color="rgb(255,255,255)";
        document.getElementById("mainbox").style.backgroundColor="rgba(0,0,0,0.5)";
        document.getElementById("mainbox").style.boxShadow="0 5px 15px rgba(0,0,0,0.5)";
        document.getElementById("contact").style.filter="invert(1)";
    }
    return false;
}