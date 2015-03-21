var Wagon = (function (j) {

	// utils

	// edited comented
	
	// test

	function buildErr(msg) {
		return new Error(msg).toString();
	}

	function toArray(collection) {
		return Array.prototype.slice.call(collection);
	}

	// loader features

	var settedModules = new Object();

	var setModule = function(key, value) { 
		settedModules[key] = value;
	}

	var exports = function(exp) {

		var args = toArray(arguments);

		try {

			if(args.length == 1) {

				if(j.isPlainObject(exp) || j.isFunction(exp)) { 
					return exp;
				} else { 
					throw buildErr("export() argument must be function or object");
				}

			} else { 
				throw buildErr("export() argument must me single");
			}

		} catch(e) { 
			throw buildErr(e);
		}

	}
	
	var require = function (path_p) {

		var hold_data;
		var hold_path = path_p;

		function getScript() {
			
			j.ajax(hold_path, {

				async: false,
				cache: false,
				dataType: 'text',

				success: function(data_p) { 
					hold_data = data_p 
				},
				error: function(xhr, status, error) {

				 	if(error == "Not Found") {

				 		hold_path = settedModules[path_p];

				 		if(!hold_path) { 
				 			throw buildErr("Path could not be found");
				 		} else { 
				 			getScript();
				 		}

				 	} 

				}
			})
		
		} getScript();

		return eval(hold_data);
	}

	return {

		require: require,
		exports: exports,
		setModule: setModule		
	}

})(jQuery);
