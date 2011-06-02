(function($){
    $.fn.pseudoElement = function(options) {
        /* Adapted from Modernizr (if you are using Modernizr you can remove this and adapt the first "if")
        https://github.com/KrofDrakula/Modernizr/commit/cdb322bdbdc7b62b4f0fcece08372e6194342f7d */
        var gencontentSupported = function() {    
          var doc = document,
              d = doc.createElement('div'),
              p = doc.createElement('p'),
              b = doc.body,
              w,
              rand = ('' + Math.random()).split('.')[1],
              supported = false,
              getWidth = function(el) {
                if(el.offsetWidth) {
                  return el.offsetWidth;
                }
                return parseInt(doc.defaultView.getComputedStyle(el, '').getPropertyValue('width'), 10);
              };
          
          p.id = 'gc'+rand;
          d.innerHTML = '<style type="text/css">#gc'+rand+'.h'+rand+':before{content:"XXX"}#gc'+rand+'{position:absolute}</style>';
          
          b.appendChild(d);
          b.appendChild(p);
          
          w = getWidth(p);
          
          // is size different?
          p.className = 'h'+rand;
          if(w !== getWidth(p)) {
            supported = true;
          }
          
          b.removeChild(d);
          b.removeChild(p);
        
          return supported;
        };     
         
        //we only need to apply these methods to browsers that don't understand pseudo-elements
        if ( gencontentSupported() ) return;
            
        var settings = $.extend({}, $.fn.pseudoElement.defaultOptions, options);
        
        return this.each(function() {
            var $$ = $(this),
                both = ( $$.hasClass(settings.elemClass+"-"+settings.elemClassGeneratedBefore+"-"+settings.elemClassGeneratedAfter) ) ? true : false,
                where = ( $$.hasClass(settings.elemClass+"-"+settings.elemClassGeneratedAfter) ) ? "appendTo" : "prependTo", //prependTo/appendTo, prependTo by default
                elemGeneratedClass = ( $$.hasClass(settings.elemClass+"-"+settings.elemClassGeneratedAfter) ) ? settings.elemClassGeneratedAfter : settings.elemClassGeneratedBefore; //the class to apply the generated element (before/after or both)
            
            //we include in the DOM the "pseudo-element" with the appropiate class
            if ( both ) $(settings.element).addClass(settings.elemClassGeneratedBefore + " " + settings.elemClassGeneratedAfter)[where]($$);
            else $(settings.element).addClass(elemGeneratedClass)[where]($$);
        });
    };

    $.fn.pseudoElement.defaultOptions = {
        elemClass: "pseudoelement", //class in the element we need to apply pseudo elements
        elemClassGeneratedBefore: "before", //class to distinguish the element generated (prependTo / appendTo)
        elemClassGeneratedAfter: "after",
        element: '<span />' //html of the element we will add
    };
})(jQuery);