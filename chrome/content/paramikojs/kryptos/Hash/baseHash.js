kryptos.hash.baseHash = function(data) {
  if (data instanceof Array) {
    data = kryptos.fromByteArray(data);
  }
  this.data = data || "";
}

kryptos.hash.baseHash.prototype = {
  type : '',

  update : function(data) {
    if (data instanceof Array) {
      data = kryptos.fromByteArray(data);
    }
    this.data = this.data + data;
  },

  digest : function() {
    var hashData = [];
    for (var x = 0; x < this.data.length; ++x) {
      hashData.push(this.data.charCodeAt(x));
    }

    var hashComp = Cc["@mozilla.org/security/hash;1"].createInstance(Ci.nsICryptoHash);
    hashComp.initWithString(this.type);
    hashComp.update(hashData, hashData.length);
    var result = hashComp.finish(false);

    return result;
  }
};
