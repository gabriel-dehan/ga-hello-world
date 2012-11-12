String.prototype.replaceAt=function(i, c) {
    return this.substr(0, i) + c + this.substr(i + c.length);
}

