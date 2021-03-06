function xmlEncode(text) {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&apos;');
}

function getSoundtouch(ip) {
  var obj = {
    ip: ip,
    postUrl: function(url, payload, cb) {
      $.post('http://' + ip + ':8090/' + url, payload, cb);
    },
    getUrl: function(url, cb) {
      $.get('http://' + ip + ':8090/' + url, cb);
    },
    search: function(source, account, term, cb) {
      var xs = xmlEncode(source);
      var xa = xmlEncode(account);
      var xt = xmlEncode(term);
      var url = 'search';
      var payload = 
      '<search source="' + xs + '" sourceAccount="' + xa + '" sortOrder="track">' +
        '<searchTerm filter="track">' + xt + '</searchTerm>' +
      '</search>';
  
      this.postUrl(url, payload, function(data) {
        cb($(data).find('item'));
      } );
      return this;
    },
    select: function(content_item, cb) {
      var url = 'select';
      var payload = content_item;

      this.postUrl(url, payload, function(data) {
        cb($(data).find('status'));
      } );
      return this;
    },
    nowPlaying: function(cb) {
      var url = 'now_playing';
      this.getUrl(url, function(data) {
        cb($(data));
      } );
    }
  }

  return obj;
};
