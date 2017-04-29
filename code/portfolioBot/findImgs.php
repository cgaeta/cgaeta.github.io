<?php

if(!isset($_GET["img_dir"]))
  return;

$dir = "./img/".$_GET["img_dir"];

if(!file_exists($dir))
  return;
  
$imgs = array_diff(scandir($dir), array('.', '..'));
$imgs = array_values($imgs);

echo json_encode($imgs);

?>
