<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<html ng-app="cp">
<head lang="it">
<meta charset="utf-8" />
<!-- <title>{{ 'app_tab-title' | i18n }}</title> -->
<title>Cookie Info</title>

<link href="css/bootstrap.min.css" rel="stylesheet" />
<link href="css/bootstrap-theme.min.css" rel="stylesheet" />
<link href="css/xeditable.css" rel="stylesheet" />
<link href="css/modaldialog.css" rel="stylesheet" />
<link href="img/myweb.ico" rel="shortcut icon" type="image/x-icon" />

<!-- required libraries -->
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="lib/angular.js"></script>
<script src="js/localize.js" type="text/javascript"></script>
<script src="lib/angular-route.js"></script>
<script src="lib/angular-sanitize.js"></script>
<script src="lib/ui-bootstrap-tpls.min.js"></script>
<script src="js/dialogs.min.js" type="text/javascript"></script>
<script src="js/app.js"></script>
<script src="js/controllers/ctrl.js"></script>
<script src="js/controllers/ctrl_login.js"></script>
<script src="js/controllers/ctrl_main.js"></script>
<script src="js/filters.js"></script>
<script src="js/services.js"></script>
<script src="js/directives.js"></script>

<!-- optional libraries -->
<script src="lib/angular-resource.min.js"></script>
<script src="lib/angular-cookies.min.js"></script>
<script src="lib/angular-route.min.js"></script>
<script src="lib/xeditable.min.js"></script>
<script src="lib/angular-base64.min.js"></script>
<base href="/myweb/" />
</head>
<body>
	<div class="container">
		<div class="row" style="margin-top: 50px;">
			<div ng-class="col-md-10">
				<div class="panel panel-default" >
	  				<div class="panel-body">
						<div style="margin: 10px 10px 10px 10px">
							<div style="margin: 20px" align="center">
								<table width="100%">
							    	<tr>
							    		<td width="45%" align="right"><img src="img/myweb4_small.png" alt="Logo myWeb" title="Logo myWeb" height="90" width="180" /></td>
							    		<td width="55%" valign="middle"><h2>Informativa Cookie</h2></td>
							    	</tr>
							    </table>
							</div>
							<div class="well">
								<div align="justify">
									Con il presente documento, ai sensi degli artt. 13 e 122 del D. Lgs. 196/2003 ("codice privacy"),
									e in base a quanto previsto dal Provvedimento generale del Garante privacy dell'8 maggio 2014, si forniscono agli utenti del sito
									 MyWeb (https://dev.smartcommunitylab.it/myweb) alcune informazioni relative ai cookie utilizzati.
								</div>
								<h4><strong>Cosa sono i cookie</strong></h4>
								<div align="justify">									
									Un "cookie" � un piccolo file di testo creato sul computer dell'utente al momento in cui questo accede ad un determinato sito, 
									con lo scopo di immagazzinare e trasportare informazioni. 
									I cookie sono inviati da un server web (che � il computer sul quale � in esecuzione il sito web visitato) al browser dell'utente
									 (Internet Explorer, Mozilla Firefox, Google Chrome, ecc.) e memorizzati sul computer di quest'ultimo;
									  vengono, quindi, re-inviati al sito web al momento delle visite successive.<br/>
									Nel corso della navigazione l'utente potrebbe ricevere sul suo terminale anche cookie di siti diversi (cookies di "terze parti"), 
									impostati direttamente da gestori di detti siti web e utilizzati per le finalit� e secondo le modalit� da questi definiti. 
								</div>
								
								<h4><strong>Tipologie di cookie</strong></h4>
								<div>
									<strong>Questo sito fa uso di 2 tipologie di cookie:</strong>
								</div>
								<h5><strong>Cookie tecnici essenziali</strong></h5>
								<div align="justify">
									Sono necessari al corretto funzionamento del sito. Consentono la navigazione delle pagine, la memorizzazione delle credenziali 
									d'accesso di un utente (per mantenerle attive durante la navigazione). 
									Senza questi cookie non potrebbero essere erogati i servizi per cui gli utenti accedono al sito. 
								</div>
								<h5><strong>Cookie di terze parti</strong></h5>
								<div align="justify">
									Attraverso il sito MyWeb (https://dev.smartcommunitylab.it/myweb) sono installati alcuni cookie di terze parti, 
									anche profilanti, che si attivano cliccando "ok" sul banner.
								</div>
								<div align="left" style="margin-top: 10px;">
									Si tratta di cookie relativi a:
								</div>
								<div align="justify" style="margin-top: 10px;">
									<strong>monitoraggio delle visite al sito</strong>: viene utilizzato lo strumento Google Analytics per raccogliere dati sulla navigazione 
									del sito da parte degli utenti. Si tratta di informazioni utili per verificare cosa funziona e cosa invece va migliorato. 
									Consentono ad esempio di sapere quali sono le pagine pi� visitate, quanto tempo dura in media una visita al sito, etc.
								</div>
								<div align="justify" style="margin-top: 10px;">
									Le informazioni raccolte in questo modo sono tutte rigorosamente in forma aggregata e anonima, non riconducibili a singoli individui. 
								</div>
								<div align="left" style="margin-top: 5px;">
									I Dati generati da Google Analytics sono conservati da Google con le modali� specificate nella seguente informativa: 
									<a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" target="_blank">https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage</a>
								</div>
								<div align="left" style="margin-top: 5px;">
									Per consultare l'informativa privacy della societ� Google Inc., titolare autonomo del trattamento dei dati relativi al servizio Google Analytics, � possibile visitare 
									<a href="http://www.google.com/intl/en/analytics/privacyoverview.html" target="_blank">http://www.google.com/intl/en/analytics/privacyoverview.html</a>
								</div>
								<div align="left" style="margin-top: 5px;">
									Google mette a disposizione un componente aggiuntivo per il browser che consente di disattivare Google Analytics, reperibile online all'indirizzo 
									<a href="https://tools.google.com/dlpage/gaoptout?hl=it" target="_blank">https://tools.google.com/dlpage/gaoptout?hl=it</a>
								</div>
								<div align="left" style="margin-top: 10px;">
								 	<strong>Interazione con i social network</strong>: si tratta di strumenti di terze parti che espongono modalit� di interazione con i social network. 
								 	Ad esempio i sistemi di condivisione di un contenuto su Facebook e Twitter: i cookie in questo casi sono necessari per il funzionamento del meccanismo di condivisione.<br/>
									Di seguito si elencano i collegamenti alle cookie policy dei principali Social Network<br/>
									<ul>
										<li><a href="https://support.twitter.com/articles/20170514-twitters-use-of-cookies-and-similar-technologies#" target="_blank">Twitter</a></li>
										<li><a href="https://www.facebook.com/help/cookies" target="_blank">Facebook</a></li>
										<li><a href="https://www.linkedin.com/legal/cookie_policy" target="_blank">Linkedin</a></li>
										<li><a href="http://www.google.com/intl/it/policies/technologies/cookies/" target="_blank">Google (Google+, Youtube)</a></li>
									</ul>
									<br/>
								</div>
								<h4><strong>Modalit&agrave; del trattamento</strong></h4>
								<div align="left">
									Il trattamento viene effettuato con strumenti automatizzati dal Titolare. Non viene effettuata alcuna diffusione o comunicazione. 
								</div>
								<h4><strong>Conferimento dei dati</strong></h4>
								<div align="justify">
									Fatta eccezione per i cookie tecnici strettamente necessari alla normale navigazione, il conferimento dei dati � rimesso alla volont� dell'interessato 
									che decida di navigare sul sito dopo aver preso visione dell'informativa breve contenuta nell'apposito banner e di usufruire dei servizi che comportano 
									l'installazione di cookie (cos� per la condivisione dei contenuti sui Social Network).
								</div>
								<div align="justify" style="margin-top: 10px;">
									L'interessato pu� quindi evitare l'installazione dei cookie mantenendo il banner (astenendosi quindi dal chiuderlo cliccando sul tasto "ok"), 
									nonch� attraverso le apposite funzioni disponibili sul proprio browser. 
								</div>
								<h4><strong>Disabilitazione dei cookie</strong></h4>
								<div align="justify">
									Fermo restando quanto sopra indicato in ordine ai cookie strettamente necessari alla navigazione, l'utente pu� eliminare gli altri cookie attraverso la 
									funzionalit� a tal fine messa a disposizione dal Titolare tramite la presente informativa oppure direttamente tramite il proprio browser.  <br/>
									<br/>
									Ciascun browser presenta procedure diverse per la gestione delle impostazioni. L'utente pu� ottenere istruzioni specifiche attraverso i seguenti link: 
									<br/>
									<ul>
										<li><a href="https://support.google.com/chrome/answer/95647?hl=it&p=cpn_cookies" target="_blank">Google Chrome</a></li>
										<li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie?redirectlocale=en-US&redirectslug=Enabling+and+disabling+cookies" target="_blank">Mozilla Firefox</a></li>
										<li><a href="http://windows.microsoft.com/it-it/windows7/block-enable-or-allow-cookies" target="_blank">Microsoft Internet Explorer</a></li>
										<li><a href="https://support.apple.com/kb/PH17191?viewlocale=it_IT&locale=it_IT" target="_blank">Apple Safari</a></li>
									</ul>
									La disattivazione dei cookie di terze parti � inoltre possibile attraverso le modalit� rese disponibili direttamente dalla societ� terza, come indicato ai link 
									riportati nel paragrafo "cookie di terze parti".<br/>
									<br/>
									Per avere informazioni sui cookie archiviati sul proprio terminale e disattivarli singolarmente si rinvia al link: <a href="http://www.youronlinechoices.com/it/le-tue-scelte" target="_blank">http://www.youronlinechoices.com/it/le-tue-scelte</a> 
								</div>
								<h4><strong>Diritti dell'interessato</strong></h4>
								<div align="justify">
									L'interessato potr� far valere in ogni momento, rivolgendosi al titolare del trattamento tramite l'invio di una mail, i diritti di cui all'art. 7 del D.Lgs. 30 giugno 2003 n. 196, 
									che di seguito si riporta testualmente.<br/>
									<br/>
									Art. 7 D. Lgs. 196/2003<br/>
									<br/>
									1. L'interessato ha diritto di ottenere la conferma dell'esistenza o meno di dati personali che lo riguardano, anche se non ancora registrati, e la loro comunicazione in forma intelligibile.<br/>
									<br/>
									2. L'interessato ha diritto di ottenere l'indicazione:
									<br/>
									<ol type="a">
										<li>dell'origine dei dati personali;</li>
										<li>delle finalit� e modalit� del trattamento;</li>
										<li>della logica applicata in caso di trattamento effettuato con l'ausilio di strumenti elettronici;</li>
										<li>degli estremi identificativi del titolare, dei responsabili e del rappresentante designato ai sensi dell'articolo 5, comma 2;</li>
										<li>dei soggetti o delle categorie di soggetti ai quali i dati personali possono essere comunicati o che possono venirne a conoscenza in qualit� di rappresentante designato nel territorio dello Stato, 
										di responsabili o incaricati.</li>
									</ol>
									3. L'interessato ha diritto di ottenere:
									<br/>
									<ol type="a">
										<li> l'aggiornamento, la rettificazione ovvero, quando vi ha interesse, l'integrazione dei dati;</li>
										<li> la cancellazione, la trasformazione in forma anonima o il blocco dei dati trattati in violazione di legge, compresi quelli di cui non � necessaria la conservazione in relazione agli scopi per i quali 
										i dati sono stati raccolti o successivamente trattati;</li>
										<li> l'attestazione che le operazioni di cui alle lettere a) e b) sono state portate a conoscenza, anche per quanto riguarda il loro contenuto, di coloro ai quali i dati sono stati comunicati o diffusi, 
										eccettuato il caso in cui tale adempimento si rivela impossibile o comporta un impiego di mezzi manifestamente sproporzionato rispetto al diritto tutelato.</li>
									</ol>
									4. L'interessato ha diritto di opporsi, in tutto o in parte:
									<br/>
									<ol type="a">
										<li> per motivi legittimi al trattamento dei dati personali che lo riguardano, ancorch� pertinenti allo scopo della raccolta;</li>
										<li> al trattamento di dati personali che lo riguardano a fini di invio di materiale pubblicitario o di vendita diretta o per il compimento di ricerche di mercato o di comunicazione commerciale.</li>
									</ol>
								</div>

								
<!-- 								<div class="panel panel-primary"> -->
<!-- 									<div class="panel-heading"> -->
<!-- 							    		<table width="100%"> -->
<!-- 							    			<tr> -->
<!-- 							    				<td width="5%" align="center"><img src="img/icona_ie.png" alt="Logo ie" title="Logo ie" height="34" width="34" /></td> -->
<!-- 							    				<td width="95%" valign="middle"><h3 class="panel-title">Cookie in Internet Explorer</h3></td> -->
<!-- 							    			</tr> -->
<!-- 							    		</table> -->
<!-- 							  		</div> -->
<!-- 									<div class="panel-body"> -->
<!-- 										<ol> -->
<!-- 											<li>Accedere al browser <b>Internet Explorer</b>.</li> -->
<!-- 											<li>Fare clic sul pulsante <b>Strumenti</b> e quindi su <b>Opzioni Internet</b>.</li> -->
<!-- 											<li>Fare clic sulla scheda <b>Privacy</b> e in <b>Impostazioni</b> spostare il dispositivo di scorrimento verso l'alto per bloccare tutti i cookie oppure verso il basso per consentirli tutti e quindi fare clic su <b>OK</b>.</li> -->
<!-- 										</ol> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="panel panel-primary"> -->
<!-- 									<div class="panel-heading"> -->
<!-- 										<table width="100%"> -->
<!-- 							    			<tr> -->
<!-- 							    				<td width="5%" align="center"><img src="img/icona_chrome.png" alt="Logo chrome" title="Logo chrome" /></td> -->
<!-- 							    				<td width="95%" valign="middle"><h3 class="panel-title">Cookie in Chrome</h3></td> -->
<!-- 							    			</tr> -->
<!-- 							    		</table> -->
<!-- 							  		</div> -->
<!-- 									<div class="panel-body"> -->
<!-- 										<ol> -->
<!-- 											<li>Fare clic sull'icona del menu Chrome e selezionare <b>Impostazioni</b>.</li> -->
<!-- 											<li>Nella parte inferiore della pagina, fare clic su <b>Mostra</b> impostazioni avanzate.</li> -->
<!-- 											<li>Nella sezione "Privacy", fare clic su <b>Impostazioni contenuti</b>.</li> -->
<!-- 											<li>Per attivare i cookie, selezionare <b>Consenti il salvataggio dei dati in locale (consigliata)</b>.</li> -->
<!-- 											<li>Fare clic su <b>Fine</b> per salvare.</li> -->
<!-- 										</ol> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="panel panel-primary"> -->
<!-- 									<div class="panel-heading"> -->
<!-- 										<table width="100%"> -->
<!-- 							    			<tr> -->
<!-- 							    				<td width="5%" align="center"><img src="img/icona_firefox.png" alt="Logo firefox" title="Logo firefox" height="34" width="34" /></td> -->
<!-- 							    				<td width="95%" valign="middle"><h3 class="panel-title">Cookie in Firefox</h3></td> -->
<!-- 							    			</tr> -->
<!-- 							    		</table> -->
<!-- 							  		</div> -->
<!-- 									<div class="panel-body"> -->
<!-- 										<ol> -->
<!-- 											<li>Fare clic sul pulsante del menu di Firefox e selezionare <b>Preferenze</b>.</li> -->
<!-- 											<li>Selezionare il pannello "Privacy".</li> -->
<!-- 											<li>Alla voce <b>Impostazioni cronologia</b>: selezionare utilizza <b>impostazioni personalizzate</b>. </li> -->
<!-- 											<li>Per attivare i cookie, contrassegnare la voce <b>Accetta i cookie dai siti</b>.</li> -->
<!-- 										</ol> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="panel panel-primary"> -->
<!-- 									<div class="panel-heading"> -->
<!-- 										<table width="100%"> -->
<!-- 							    			<tr> -->
<!-- 							    				<td width="5%" align="center"><img src="img/icona_safari.png" alt="Logo Safari" title="Logo Safari" /></td> -->
<!-- 							    				<td width="95%" valign="middle"><h3 class="panel-title">Cookie in Safari</h3></td> -->
<!-- 							    			</tr> -->
<!-- 							    		</table> -->
<!-- 							  		</div> -->
<!-- 									<div class="panel-body"> -->
<!-- 										<ol> -->
<!-- 											<li>Avviare il Browser Safari:</b>.</li> -->
<!-- 											<li>Selezionare la voce <b>Preferenze</b> dal menu.</li> -->
<!-- 											<li>Dalla finestra di dialogo che segue, selezionare il tab <b>Sicurezza</b>.</li> -->
<!-- 											<li>Dalla voce <b>Accetta Cookie</b> selezionare l'opzione <b>Solo dai siti che stai consultando</b>.</li> -->
<!-- 										</ol> -->
<!-- 									</div> -->
<!-- 								</div>	 -->
							</div>
							<table class="table" style="width: 100%">
								<tr>
									<td align="left" width="33%"></td>
									<td align="center" width="33%"></td>
									<td align="right" width="33%"><a id="btn_login_test" href="prelogin" class="btn btn-primary" role="button" ng-click="getOldLogin()">Indietro</a></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<hr>
				<footer>
				</footer>
			</div>
		</div>
	</div>
</body>
</html>