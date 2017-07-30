import firebase from 'firebase';

class AuthService {
  static getGoogleProvider() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return provider;
  }

  static signIn(provider) {
    return firebase.auth().signInWithPopup(provider).then((result) => {
      AuthService.accessToken = result.credential.accessToken;
      AuthService.user = result.user;
    });
  }

  static signOut() {
    AuthService.accessToken = null;
    AuthService.user = null;
    return firebase.auth().signOut();
  }

  static getAuth() {
    return firebase.auth();
  }

  static getUser() {
    return AuthService.getAuth().currentUser;
  }

  static isAuthenticated() {
    return !!AuthService.getUser();
  }
}

export default AuthService;
