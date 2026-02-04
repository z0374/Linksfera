<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('ROOT_PATH_LINKSFERA', __DIR__);

define("LIB_PATH", dirname(ROOT_PATH_LINKSFERA, 4) . "/lib/index.php");
if (file_exists(LIB_PATH)) {
    require_once LIB_PATH;
}else{
    require_once ROOT_PATH_LINKSFERA . "/lib/index.php";
}

require_once ROOT_PATH_LINKSFERA . "/src/core/render.php";