<?php

array_push($css_files, 
        ROOT_PATH_LINKSFERA . "/assets/css/html.css",
        ROOT_PATH_LINKSFERA . "/assets/css/body.css"
    );

require_once ROOT_PATH_LINKSFERA . "/src/components/header.php";
require_once ROOT_PATH_LINKSFERA . "/src/components/main.php";
require_once ROOT_PATH_LINKSFERA . "/src/components/footer.php";

html('real-time');