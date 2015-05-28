<?php

if (!isset($_POST)) {
  echo json_encode(array(
    'success' => false
  ));
  die;
}

$dsn = "mysql:host=localhost;dbname=emotiont_db1";
$user = "emotiont_dev";
$pass = "4yascx$.cg9h";

try {
  $db = new PDO($dsn, $user, $pass);
} catch (PDOException $e) {
  echo 'Connection failed: ' . $e->getMessage();
  die;
}

$keys = array(
  'film',
  'name',
  'fitbit_bool',
  'fitbit_id',
  'session_start',
  'emotions'
);

$outkeys = array();
$output = array();
$insout = array();
foreach ($_POST as $k => $v) {
  if (in_array($k, $keys)) {
    $output[':'.$k] = $v;
    $outkeys[] = $k;
    $insout[] = $v;
  }
}
$valmatch = array_keys($output);

$sql = "INSERT INTO sessions (".implode(',',$outkeys).") VALUES (".implode(',',$valmatch).")";
$stmt = $db->prepare($sql);
$done = $stmt->execute($output);

echo json_encode(array(
  'success'=>$done, 
  'type' => 'insert',
  'sql' => $sql,
  'output' => $output,
));
die;
