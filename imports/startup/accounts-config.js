import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.config({
  //Turn this off if you do not want user creation
  //forbidClientAccountCreation: true,
});
