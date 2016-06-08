(function($){

    var methods = {
        init : function(options) {
            var defaults = {
                edge: 'left',
                closeOnClick: false
            };
            
            options = $.extend(defaults, options);

            $(this).each(function(){
                var $this = $(this);
                var menu_id = $("#"+ $this.data('activates'));
                
                // Add Touch Area
                /*var dragTarget = $('<div class="drag-target"></div>');
                $('body').append(dragTarget);*/

                if(options.edge == 'left'){
                    menu_id.addClass("left-side");
                    //dragTarget.css({'left': 0}); // Add Touch Area
                }else{
                    menu_id.addClass('right-side');
                   // dragTarget.css({'right': 0}); // Add Touch Area
                }
                
                // Get sidebar state
                var menuOut = !$("body").hasClass("hidden-sidebar");
                

                // if closeOnClick, then add close event for all a tags in side sideNav
                if(options.closeOnClick === true){
                    menu_id.on("click.itemclick", "a:not(.collapsible-header)", function(){
                        removeMenu();
                    });
                }

                function removeMenu(){
                    // Change body class
                    $('body').addClass('hidden-sidebar').removeClass('visible-sidebar');
                    
                    return false;
                }
                
                function showMenu(){
                    // Change body class
                    $('body').addClass('visible-sidebar').removeClass('hidden-sidebar');
                    
                    // Push current drag target on top of DOM tree
                    //$('body').append(dragTarget);
                    
                    return true;
                }
                
                // Change sidebar state on window resize
                $(window).resize(function(){ 
                    if($(window).outerWidth() > medium_screen_size && !$("body").hasClass("hidden-sidebar-default"))
                        menuOut = showMenu();
                    else
                        menuOut = removeMenu();
                });
      
                // Call resize function
                $(window).resize();
                
                $this.click(function(){
                    if(menuOut === true){
                        removeMenu();
                        menuOut = false;
                    }else {
                        showMenu();
                        menuOut = true;
                    }

                    return false;
                });
                      
                var overlay = $('<div id="sidenav-overlay"></div>');
                overlay.click(function(){
                    removeMenu();
                    menuOut = false;
                });
                $('body').append(overlay);
            });
        },
        show : function() {
            this.trigger('click');
        },
        hide : function() {
            $('#sidenav-overlay').trigger('click');
        }
    };


    $.fn.sideNav = function(methodOrOptions){
        if(methods[methodOrOptions]){
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if (typeof methodOrOptions === 'object' || ! methodOrOptions ){
            // Default to "init"
            return methods.init.apply(this, arguments);
        }else{
            $.error('Method ' +  methodOrOptions + ' does not exist on jQuery.sideNav');
        }
    };
 
}(jQuery));
