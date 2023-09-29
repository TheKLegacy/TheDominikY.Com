
<?php 

//initialize
$ch = curl_init();

// 2. set the options, including the url
curl_setopt($ch, CURLOPT_URL, "https://api.keeptruckin.com/v1/hos_violations?driver_ids=&min_start_time=NOW()%20-%201%20DAY&max_start_time=NOW()&violation_types=break_30&per_page=25&page_no=1");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('x-api-key, 3fa91fac-aaab-40b0-9e97-fad206477fb4' , 'origin, http://thedominiky.com/datatelligent/'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

//execute
$output = curl_exec($ch);

if ($output === FALSE) {
  echo "cURL Error: " . curl_error($ch);
} else {
    //var_dump($output);
}

//free up the curl handle
curl_close($ch);

echo $output . 'end';

?>


<script>