/**
 * Constructor
 * @param {Object} opt {context:HTMLDocument,color:String}
 */
function Dyer(opt){
    opt = opt || {};
    this.doc = opt.doc || document;
    this.color = opt.color || "rgb(161, 209, 228)";
    this.films = [];
    if(opt.active === true){
        Dyer.activeInstance = this;
    }
}

Dyer.prototype._getOffset = function(elem){
    var offset = {top:0, left:0};
    var parent = elem;
    while(parent && parent !== this.doc.body){
        offset.top += parent.offsetTop;
        offset.left += parent.offsetLeft;
        parent = parent.offsetParent;
    }
    return offset;
}

/**
 * Render an film layer, and cover it over the element
 * @param  {Element} elem    [description]
 * @param  {Number} index [description]
 * @return {[type]}         [description]
 */
Dyer.prototype.dye = function(elem, opt){
    if(elem.length){
        for(var i = 0; i < elem.length; i++){
            this.dye(elem[i], opt);
        }
        return;
    }
    var film = document.createElement("div");

    var offset = this._getOffset(elem);

    film.style.position = "absolute";
    film.style.backgroundColor = this.color;
    film.style.opacity = 0.8;
    film.style.width = elem.offsetWidth + "px";
    film.style.height = elem.offsetHeight + "px";
    film.style.top = offset.top + "px";
    film.style.left = offset.left + "px";
    film.style.pointerEvents = "none";
    film.style.zIndex = 999;

    this.films.push(film);
    this.doc.body.appendChild(film);
}

Dyer.prototype.getDoc = function(){
    return this.doc;
}

Dyer.prototype.clear = function(){
    var film;
    while(this.films.length){
        film = this.films.pop();
        film.parentNode.removeChild(film);
    }
}

module.exports = Dyer;