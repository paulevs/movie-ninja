$(function(){

	// Delete movie
	$('#movie-list').on('click', '.icon-close', function(){
		$(this).closest('li').remove();
		if(supports_html5_storage()) {
			localStorage.removeItem($(this).prev().html());
		}
	});

	// Add movie
	$('#new-movie').on('keypress', function(event){
		if ( event.which == 13 ) {
			if(supports_html5_storage()) {
				var num_of_movies = localStorage.length;
			}
			var movie_name = $(this).val();
     		$('#movie-list').prepend("<li><div class='view'><input class='toggle' type='checkbox'><label>" + this.value + "</label><span class='destroy icon-close'></span></div><input class='edit' value='" + this.value + "'></li>");			
   			if(supports_html5_storage()) {
   				var movie = {};
				movie.watched = false;
				movie.rating = 5;
				movie.order = num_of_movies;
				//console.log( movie );

				localStorage.setItem( movie_name, JSON.stringify(movie) );
				//console.log( JSON.parse( localStorage.getItem( 'movie' ) ) );
			}
			$(this).val('');
   		}
	});

	// Edit movie
	$('#movie-list').on('dblclick', '.view', function(event){
		$('.editing').removeClass('editing');
		$(this).parent().addClass('editing');
	});
	$('#movie-list').on('keypress', '.edit', function(event){
		if ( event.which == 13 ) {
			var new_movie_name = $(this).val(), 
				old_movie_name = $(this).prev().find('label').text();
			$(this).prev().find('label').html(new_movie_name);
     		$(this).parent().removeClass('editing');

     		var movie_item = JSON.parse(localStorage.getItem(old_movie_name));

	   		if(supports_html5_storage() && new_movie_name !== old_movie_name) {
				var movie = {};
				movie.watched = movie_item.watched;
				movie.rating = movie_item.rating;
				movie.order = movie_item.order;
				//console.log( movie );

				localStorage.setItem( new_movie_name, JSON.stringify(movie_item) );
				//console.log( JSON.parse( localStorage.getItem( 'movie' ) ) );

				if(supports_html5_storage()) {
					localStorage.removeItem(old_movie_name);
				}
			}


   		}

   		
	});

	// Get movies from local storage and display on screen
	if(supports_html5_storage()) {
		var i = 0;
		var movie_list = {};
		var name = [];
		while ((key = window.localStorage.key(i))) {
		    movie_list[key] = JSON.parse(localStorage.getItem(key));

		    $('#movie-list').prepend("<li><div class='view'><input class='toggle' type='checkbox'><label>" + key + "</label><span class='destroy icon-close'></span></div><input class='edit' value='" + key + "'></li>");
		    //console.log(movie_list[key].order);
		    i++;

		}



		//console.log(movie_list);
			
		for (var item in movie_list) {

			//console.log(movie_list.Shrek.rating);
		}
			//console.log(movie_list);
			//$('#movie-list').prepend("<li><div class='view'><input class='toggle' type='checkbox'><label>" + movies + "</label><span class='destroy icon-close'></span></div><input class='edit' value='" + movies + "'></li>");

	}

	function supports_html5_storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}

});