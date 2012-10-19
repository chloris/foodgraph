<?php
$memory = "1024M";

if(isset($_REQUEST['id'])){
  $id = $_REQUEST['id'];
  exec("java -Xms$memory -Xmx$memory -jar MenuPlanner.jar $id", $res);
  foreach($res as $r){
    echo "$r\n";
  }
}
else{
  error_log("id not found!");
}
?>
