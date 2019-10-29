export const emailError = 'Ingresa un email válido'; 
export const passwordError = 'La contraseña debe de tener al menos 6 caracteres (Solamente números y letras)'; 
export class userModel {
      constructor(userId, name, lastLogin, refreshToken, teamId, assignedPurchases, debt ){
          this.userId                   = userId;
          this.name                     = name;
          this.lastLogin                = lastLogin;
          this.refreshToken             = refreshToken;
          this.debt                     = debt;
          this.assignedPurchases        = assignedPurchases;
      } 
 };
