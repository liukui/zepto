(function($){
	
	 var OFFSET = 64;
	 
	 function parentIfText(node){
	      return 'tagName' in node ? node : node.parentNode;
	 }
	 
	 function getpos(e){
		 return {x:e.changedTouches[0].clientX,
			 	y:e.changedTouches[0].clientY,
			 	target:parentIfText(e.target)}
	 }
	 
	 
	 $.fn.slideevent = function(){
		 var fired = false,start,triggerClick = true;
			handleTouchStart = function(e){
				start  = getpos(e);
				fired = false;
				triggerClick = true;
				e.preventDefault();
			},
			handleTouchMove = function(e){
				triggerClick = false;
				if(fired){
					return;
				}
				var end = getpos(e);
				if(end.x - start.x > OFFSET){
					fired = true;
					triggerSlideEvent("right");
					e.preventDefault();
				}else if(end.x - start.x < -OFFSET){
					fired = true;
					triggerSlideEvent("left");
				}
			},
			handleTouchEnd = function(e){
				if(triggerClick){
					$(start.target).trigger('click');
				}
				handleTouchMove(e);	
			},
			triggerSlideEvent = function(type){
				$(start.target).trigger('slide'+type,start);
			};
			return this.bind('touchstart',handleTouchStart)
			.bind('touchmove',handleTouchMove).bind('touchend',handleTouchEnd);
	 }
	 	 
})(Zepto);
