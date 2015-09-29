var crypto = require('crypto');

function User(dbClient){
  this.dbClient = dbClient;
  this.userId;
  this.username;
  this.firstName;
  this.lastName;
  this.email;
  this.isAdmin;
  this.adminPermissions;
  this.addresses;
};


User.prototype.initAdddresses(callback) {
  this.dbClient.query(
      'SELECT * FROM userpermissions WHERE userId = :id',
       { id: this.userId },
       function(err, rows) {
       if (err) {
         console.log("Error Loading Permissions (" + this.username + ") " + err);
          callback(err);
        }
        if (rows.length > 0) {
          this.isAdmin = true;
          for (var i = 0; i < rows.length; i++) {
            var permission = {"ProperName" : row[i].ProperName, "Url" : row[i].Url}
            this.adminPermissions.push(permission);
          }

          callback(NULL, 1);
        }
  });  
};

User.prototype.initAdmin(callback) {
  this.dbClient.query(
      'SELECT * FROM userpermissions WHERE userId = :id',
       { id: this.userId },
       function(err, rows) {
       if (err) {
         console.log("Error Loading Permissions (" + this.username + ") " + err);
          callback(err);
        }
        if (rows.length > 0) {
          this.isAdmin = true;
          for (var i = 0; i < rows.length; i++) {
            var permission = {"ProperName" : row[i].ProperName, "Url" : row[i].Url}
            this.adminPermissions.push(permission);
          }

          callback(NULL, 1);
        }
  });  
};


User.prototype.init(id, firstName, lastName, email, callback) {
  this.userId = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.adminPermissions = [];
  this.initAdddresses(function(err, result){
    this.initAdmin(function(err, result){
      if(err)
        callback(err);
      else
        callback(NULL, 1);
    });
  });
};

User.prototype.login = function(_username, _password, callback){
  var shasum = crypto.createHash('sha256');
  shasum.update(_password);
  var pw = shasum.digest('hex');

  this.dbClient.query(
    'SELECT * FROM users WHERE username = :username',
     { username: _username, password: pw },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        callback(err);
      }
      if (rows.length > 0) {
        var user = rows[0];
        if(user.password === pw) {
        this.init(user.id, user.firstname, user.lastname, user.email, function(err, result){
                if(err)
                  callback(err);
                else
                  callback(NULL, {success:1});
        });
        }
        else {
          callback(NULL, {success:0, reason:"Invalid password"});  
        }

      }
      else {
        callback(NULL, {success:0, reason:"Username does not exist"});
      }
  });  
};

User.prototype.resetPassword(callback){
  var validChars = 'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+[]{}?:;<>,.';
  var numChars = validChars.length;
  var pwLength = 12;
  var pw = "";

  this.dbClient.query(
    'UPDATE users SET password = :password WHERE username = :username',
     { password: pw, username: this.username },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        throw err;
      }
      if (rows) {
      }
  });  
};

User.prototype.updatePassword(_password, callback) {
  var shasum = crypto.createHash('sha256');
  shasum.update(_password);
  var pw = shasum.digest('hex');

  this.dbClient.query(
    'UPDATE users SET password = :password WHERE username = :username',
     { password: pw, username: this.username },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        callback(err);
      }
      if (rows.length > 0) {
        callback(NULL, {success:1});
      }
  });  
};

User.prototype.updateInfo(userInfo, callback) {
  this.dbClient.query(
    'UPDATE users SET FirstName = :firstName, LastName = :lastName, email = :email WHERE id = :userId',
     { firstName: userInfo.firstName, lastname: userInfo.lastName, email: userInfo.email, userId:this.userId },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        callback(err);
      }
      if (rows.length > 0) {
        callback(NULL, {success:1});
      }
  });  
};

User.prototype.addAddress(address, callback) {
  this.dbClient.query(
    'UPDATE users SET password = :password WHERE username = :username',
     { password: pw, username: this.username },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        callback(err);
      }
      if (rows.length > 0) {
        callback(NULL, {success:1});
      }
  });  
};

User.prototype.deleteAddress(addressId, callback) {
  this.dbClient.query(
    'UPDATE users SET password = :password WHERE username = :username',
     { password: pw, username: this.username },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        callback(err);
      }
      if (rows.length > 0) {
        callback(NULL, {success:1});
      }
  });  
};

User.prototype.updateAddress(addressId, address, callback) {
  this.dbClient.query(
    'UPDATE users SET password = :password WHERE username = :username',
     { password: pw, username: this.username },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        callback(err);
      }
      if (rows.length > 0) {
        callback(NULL, {success:1});
      }
  });  
};

User.prototype.addPermission(_permissionId, callback) {
  this.dbClient.query(
    'INSERT INTO userpermissions (UserId, PermissionId) VALUES(:userId, :permissionId)',
     { userId: this.userId, permissionId: _permissionId },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        callback(err);
      }
      if (rows.length > 0) {
        callback(NULL, {success:1});
      }
  });  
};

User.prototype.deletePermission(_permissionId, callback) {
  this.dbClient.query(
    'DELETE FROM userpermissions WHERE UserId = :userId AND PermissionId = :permissionId',
     { userId: this.userId, permissionId: _permissionId },
     function(err, rows) {
     if (err) {
       console.log("Login Error (" + _username + ") " + err);
        callback(err);
      }
      if (rows.length > 0) {
        callback(NULL, {success:1});
      }
  });  
};

module.exports = User;