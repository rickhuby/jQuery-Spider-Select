(function( $ ){
			
	var methods = {

		init : function( options ) {

			var defaults = {
				defaultText: 'Please select',
				id: 'spiderSelect',
				classes: '',
				trigger: 'button', //select, button
				buttonId: 'spiderSelectButton',
				buttonText: 'Go'
			};
			 
			var options = $.extend(defaults, options);					
			
			var select = '<select id="' +options.id+ '">';
			
			if (methods.isDefaultOptionRequired(options)) {
				select += methods.getOptionHtml('default', options.defaultText);
			}
			else {
				//with no button a default is required
				if (options.trigger == 'select') {
					select += methods.getOptionHtml('default', defaults.defaultText);
				}
			}
			
			this.find('li').each(function(){
				var a = $(this).find('a');
				select += methods.getOptionHtml(a.attr('href'), a.text());
			});
		
			select += '</select>';
			
			if (options.trigger == 'button') {
				select += methods.getButtonHtml(options.buttonId, options.buttonText);
				this.after(select);
				$('#' + options.buttonId).click(methods.followLink(options));	
			}
			else {
				this.after(select);
				$('#' + options.id).change(methods.followLink(options));	
			}
			
			this.hide();
			
		},
		
		isDefaultOptionRequired : function(options) {
			
			if (options.defaultText !== '') {
				return true;
			}
				
			return false;
		},
		
		getButtonHtml : function(id, text) {
			return '<input type="button" id="' +id+ '" value="' +text+ '" />';
		},
		
		getOptionHtml : function(value, text) {
			return '<option value="' + value + '">' + text + '</option>';
		},

		followLink : function(options) {
			
			return function() {
				var urlToVisit = $('#' + options.id).val();
				
				if (urlToVisit !== 'default') {
					window.location = $('#' + options.id).val();
				}
				
				event.preventDefault();
			}
		}
		
	};

	$.fn.spiderSelect = function(method) {

		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.spiderSelect' );
		}    

	};
	
})( jQuery );