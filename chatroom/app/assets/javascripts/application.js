// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

function NotificationCenter() {
  this.handlers = []; // observers
}

NotificationCenter.prototype = {

  subscribe: function(fn) {
    this.handlers.push(fn);
  },

  unsubscribe: function(fn) {
    this.handlers = this.handlers.filter(
      function(item) {
        if (item !== fn) {
          return item;
        }
      }
    );
  },

  fire: function(o, thisObj) {
    var scope = thisObj || window;
    this.handlers.forEach(function(item) {
      item.call(scope, o);
    });
  }
}

var notification_center = new NotificationCenter();

var messageQueueConsoleLogger = function() {
  var socket_message = window.realtime.messageQueue.shift();
  if (socket_message) {
    console.log('notification_center.fire', socket_message)
    notification_center.fire(socket_message);
  }
};

setInterval(messageQueueConsoleLogger,100);
