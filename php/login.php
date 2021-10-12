<?php
header('content-type:text/html;charset=utf8');
$userVal=$_POST['user'];
$telVal=$_POST['tel'];
$pwdVal=$_POST['pwd'];
// 1 连接mysql
$link = mysqli_connect('127.0.0.1','root','root','test');

// 2 取值
$getSql = "select * from cartShop ";
$getRes = mysqli_query($link,$getSql);

// print_r($getRes);
$arr = [];
 while($row=mysqli_fetch_assoc($getRes)){
   $arr[] = $row;
 }
//  print_r( $arr);
 for($i=0;$i<count($arr);$i++){
    //  print_r($arr[$i]);
    if($userVal==$arr[$i]['user']&&$telVal==$arr[$i]['tel']&&$pwdVal==$arr[$i]['pwd']){
        echo 1;
        break;
    }
   else{
    //    当索引到最大的时候 还没匹配上 就是这个账号未被注册
    if($i==count($arr)-1){
        echo 2;
    }
   }
   
 }
?>