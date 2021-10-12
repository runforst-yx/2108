<?php
header('content-type:text/html;charset=utf8');
// error_reporting(0);
$userVal=$_POST['user'];
$telVal=$_POST['tel'];
$pwdVal=$_POST['pwd'];
$ageVal=$_POST['age'];
$sexVal=$_POST['sex'];
// echo $telVal;
 // 1 连接mysql
 $link = mysqli_connect('127.0.0.1','root','root','test');

// 3 把值取出来
 $getSql = "select tel from cartShop ";
 $getRes = mysqli_query($link,$getSql);
// print_r($getRes);
$arr = [];
 while($row=mysqli_fetch_assoc($getRes)){
   $arr[] = $row;
 }
// print_r($arr);
for($i=0;$i<count($arr);$i++){
//    print_r(implode($arr[$i]));
if($telVal==implode($arr[$i])){
    echo '1';
    break;
}
else{
    // echo $i;
    // echo count($arr);
    // echo count($arr)-1;
    // 当索引到最大时 我们将数据给出去
    if($i==count($arr)-1){
        // echo 12;
    $sql = "insert into cartShop(user,tel,pwd,age,sex) values('$userVal','$telVal','$pwdVal','$ageVal','$sexVal')";
    // 2 执行代码
    $res = mysqli_query($link,$sql);
    echo "2";
    // print_r($arr);
    // echo 12;
    }
}
}

?>