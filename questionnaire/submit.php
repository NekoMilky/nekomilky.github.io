<?php
header("Content-type: text/html;charset=utf-8");

$q1=$_POST['q1'];
$q2=$_POST['q2'];
$q3=$_POST['q3'];
$q4=$_POST['q4'];
$q5=$_POST['q5'];
$q6=$_POST['q6'];
$q7=$_POST['q7'];
$q8=$_POST['q8'];
$q9=$_POST['q9'];
$q10=$_POST['q10'];
$dateline=time();

$mydbhost = "localhost";
$mydbuser = "root";
$mydbpass = 'LYdengkaiwen2005';
$conn = mysqli_connect($mydbhost, $mydbuser, $mydbpass);
if(! $conn){
	die("connect error:" . mysqli_error($conn));
}
mysqli_select_db( $conn, 'questionaire');
mysqli_query($conn , "set names utf8");
$sql="INSERT INTO answer (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, dateline)
VALUES
('$q1','$q2','$q3','$q4','$q5','$q6','$q7','$q8','$q9','$q10','$dateline')";
$retval = mysqli_query($conn, $sql);
if(! $retval){
	die("create error:" . mysqli_error($conn));
}else{
	echo "提交成功，谢谢您的帮助！ :)";
}

mysqli_close($conn);
?>