Meteor.startup(function () {
  smtp = {
    username: 'samueleyre@wecolearn.com',   // eg: server@gentlenode.com
    password: '159maga159maga',   // eg: 3eeP1gtizk5eziohfervU
    server:   'mail.gandi.net',  // eg: mail.gandi.net
    port: 25
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  // process.env.MAIL_URL = 'smtp:127.0.0.1:1025';
});
