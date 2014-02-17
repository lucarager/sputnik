#Sputnik

Sputnik node.js and mandrill powered subscription / email manager, based on SailsJS and AngularJS. It allows you to manage multiple subscription "channels", take signups, and send emails. It's pretty simple and easy to start using.

###Installation

After cloning or downloading this repository, you need to install Sails globally, if you have not already.

```
sudo npm -g install sails
```

Then, while `cd`'d into the project directory,

```
npm install && bower install
```

Now, just a config and you're off! Rename `config/locals.example.js` to `config.locals.js`, and fill in your own appropriate details. One thing of note is that the `mandrill.passkey` is the passkey that is used in the Administration section in order to send emails: it is not related to your particular Mandrill account.

Finally, you'll need to add your own subscription channels in a Mongo collection "channels". The only required attributes are `name` and `description`. After you're done that, run `sails raise` you're ready to start taking signups for your company, next big project, or whatever else you need!

###Usage
Usage is fairly self-explanatory. The index page, `/`, allows user registration and management of their channels. It allows users to log in or create an account (if an account exists, their preferences are loaded, otherwise a new account is made). They can click on channels to select or deselect them, and save their preferences with the "Save" button.

The administration page, at `/admin`, allows you to send emails to your subscribers in a channel-by-channel basis. This should also be relatively intuitive. "Subject" is the email subject, "Channel" is the channel you want to send the email in, "Send At" allows you to schedule an email for later sending (though do note that you have to have a positive balance in your Mandrill account in order to use this feature), "Message" is the message you'd like to send, "Passkey" is your previously mentioned `mandrill.passkey`, and the Send button - well, you can figure that out.

###Customization
Sputnik can be customized fairly easily. You'll mainly be looking at changing the LESS sheet in `assets/linker/styles/main.less`, and you can also check out the HTML structure in `views/ng-controllers`. Do note that the application has an AngularJS base, so, if you're not aware, you can easily break the application by adjusting its HTML structure.

###Contributing
Find an improvement? Write half decent code, put in a PR.