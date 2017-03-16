/**
 * Copyright (c) 2017
 *  Alexandre MAINDRON <alexandre@exmackina.com>
 *  permet à l'utilisateur de choisir le type de login (local ou non) à afficher
 */

$(document).ready(function() {

    //------- model -----------
	
	options = { "shibboleth-user": { "label": "Compte de votre établissement",
	                                      "block" : "#alternative-logins",
										  "focus" : "#alternative-logins a:nth-child(1)"},
	                 "local-user": { "label": "Compte spécifique",
						                  "block" : "#body-login form[name='login']",
										  "focus" : "#user"}};
	
	// récupére l'état (option de login sélectionnée) sauvegardé lors de la dernière utilisation, sinon la valeur par défaut
	// pour améliorer l'expérience utilisateur en reprenant la page de login dans l'état où l'utilisateur l'a laissée/utilisée
	// permet d'éviter un bug d'affichage en cas de mauvais mot de passe (qui re-affichait la page de login dans l'état par défaut au lieu du précédent, masquant ainsi le message d'erreur)
	var selectedOption = localStorage.getItem('LoginSelectedOption') || 'shibboleth-user'; 

	//---------  view-controller -----------
	
	//init select UI
	$select = $('<select/>').attr('id',"select-login");
	
	$.each(options, function(key, value) {   
		$select.append($("<option></option>").attr("value",key).text(value.label)); 
		if ( key == selectedOption) {
		    $(value.block).show();
		} else {
			$(value.block).hide();
		}
	});
	
	$select.val(selectedOption);
	
	function toggleLoginUI(selectedName) {
		//mask old option
		$(options[selectedOption].block).hide();
		
		selectedOption = selectedName;
		
		//display selected
		$(options[selectedOption].block).show();
		setFocus(selectedOption);
	}
	
	function setFocus(option) {
		$(options[selectedOption].focus).focus();
	}

	$select.on('change', function() {
      toggleLoginUI(this.value);
	  
	  // sauvegarde l'état (option de login sélectionnée) lors de la dernière utilisation (pour expérience utilisateur et bug; voir au dessus)
	  localStorage.setItem('LoginSelectedOption', this.value); 
    });
	
	$( "#body-login form[name='login']" ).before($select);
	
	setFocus(selectedOption);

});
