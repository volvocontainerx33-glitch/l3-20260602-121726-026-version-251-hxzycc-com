(function(){
  var toggle=document.querySelector('[data-menu-toggle]');
  var panel=document.querySelector('[data-menu-panel]');
  if(toggle&&panel){toggle.addEventListener('click',function(){panel.classList.toggle('is-open')})}
  document.querySelectorAll('[data-hero]').forEach(function(hero){
    var slides=[].slice.call(hero.querySelectorAll('.hero-slide'));
    var dots=[].slice.call(hero.querySelectorAll('[data-hero-dot]'));
    var poster=hero.querySelector('[data-hero-poster]');
    var posterTitle=hero.querySelector('[data-hero-title]');
    var posterCat=hero.querySelector('[data-hero-cat]');
    var index=0;
    function show(i){
      index=(i+slides.length)%slides.length;
      slides.forEach(function(s,n){s.classList.toggle('is-active',n===index)});
      dots.forEach(function(d,n){d.classList.toggle('is-active',n===index)});
      var s=slides[index];
      if(poster&&s){poster.setAttribute('src',s.getAttribute('data-image')||'');poster.parentElement.setAttribute('href',s.getAttribute('data-link')||'#')}
      if(posterTitle&&s){posterTitle.textContent=s.getAttribute('data-title')||''}
      if(posterCat&&s){posterCat.textContent=s.getAttribute('data-category')||''}
    }
    dots.forEach(function(dot,i){dot.addEventListener('click',function(){show(i)})});
    if(slides.length){show(0);setInterval(function(){show(index+1)},5200)}
  });
  document.querySelectorAll('[data-search-input]').forEach(function(input){
    var scope=document.querySelector(input.getAttribute('data-search-scope'))||document;
    var cards=[].slice.call(scope.querySelectorAll('[data-card]'));
    var current='all';
    var buttons=[].slice.call(scope.querySelectorAll('[data-filter]'));
    function apply(){
      var q=(input.value||'').trim().toLowerCase();
      cards.forEach(function(card){
        var text=(card.getAttribute('data-search')||'').toLowerCase();
        var region=card.getAttribute('data-region')||'';
        var category=card.getAttribute('data-category')||'';
        var ok=(!q||text.indexOf(q)>-1)&&(current==='all'||region===current||category===current);
        card.classList.toggle('hidden-card',!ok);
      });
    }
    input.addEventListener('input',apply);
    buttons.forEach(function(btn){btn.addEventListener('click',function(){current=btn.getAttribute('data-filter')||'all';buttons.forEach(function(b){b.classList.toggle('is-active',b===btn)});apply()})});
  });
})();
function setupPlayer(url){
  var video=document.getElementById('player');
  if(!video||!url)return;
  if(video.canPlayType('application/vnd.apple.mpegurl')){video.src=url;return}
  if(window.Hls&&window.Hls.isSupported()){var hls=new Hls({maxBufferLength:30});hls.loadSource(url);hls.attachMedia(video);return}
  video.src=url;
}