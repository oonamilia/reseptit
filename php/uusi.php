<?php 

if(isset($_POST['siteName'])){
	$filename = $_POST['siteName'];
}
if(isset($filename)){ 
	echo $filename;
}

$filename=str_replace(' ', '-', $filename);
$filename=str_replace('ä', 'a', $filename);
$filename=str_replace('ö', 'o', $filename);

$h2 = $_POST['h2'];

$rowAmnt=$_POST['rowAmount'];
echo "$rowAmnt <br>";

for($i = 0; $i < $rowAmnt; $i++){
	$ingr[$i]=$_POST["ingr$i"];
	echo "$ingr[$i] ";
}
for($i = 0; $i < $rowAmnt; $i++){
	$amnt[$i]=$_POST[$i];
	echo "$amnt[$i] ";
}


for ($i = 0; $i < $rowAmnt; $i++) {
    $trs[$i]="<tr>
				<td class='ingrtd'>$amnt[$i]</td>
				<td class='ingrtd'>$ingr[$i]</td>
			  </tr>";
} 

for ($i = 0; $i < $rowAmnt; $i++) {
    echo $trs[$i];
} 

$tableContent = implode(' ', $trs);

$ohje=$_POST['ohje'];

if(!is_file("../templates/reseptit/$filename.html")){
	$myFile = "../templates/reseptit/$filename.html"; 
	$fh = fopen($myFile, 'w'); 
	$stringData = "<!DOCTYPE HTML>
		<head>
			<meta charset='utf-8'>
		</head>
		<h2 class='contenth2'>$h2</h2>

		<div class='contentP'>
		
		 <table>
		  $tableContent
		</table> 

		</div>

		<h3 class='contenth3'>Ohjeet</h3>

		<div class='contentP'>

		<p>
			$ohje
		</p>

		</div>
		";   
		fwrite($fh, $stringData);

		echo " uusi sivu luotu";
		
}else {
	echo "Samanniminen sivu on jo olemassa!";
}

$lines = file('../templates/kaikki.html'); 
$last = sizeof($lines) - 1 ; 
unset($lines[$last]); 

$fp = fopen('../templates/kaikki.html', 'w'); 
fwrite($fp, implode('', $lines)); 
fclose($fp); 

$filen = "../templates/kaikki.html";
$file = fopen($filen, "r"); 
$contents = fread($file,filesize($filen));
$stringData = "<li><a href='#$filename'>$h2</a></li>\n</ul>";   

$lueTdsto = fopen($filen, 'w');
$kirjoitaTdsto = fwrite($lueTdsto, $contents);
$kirjoitaTdsto = fwrite($lueTdsto, $stringData);
fclose($lueTdsto);

?>

<br />

<a href="../index.html"> Takaisin etusivulle </a>