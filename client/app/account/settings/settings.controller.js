'use strict';

class SettingsController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth) {
    this.Auth = Auth;
    this.progress = '';
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.progress = 'indeterminate';
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          console.log('hola')
          this.message = 'Contraseña cambiada satisfactoriamente.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Contraseña incorrecta';
          this.message = '';
        });
    }
  }
}

angular.module('catalogoApp')
  .controller('SettingsController', SettingsController);
