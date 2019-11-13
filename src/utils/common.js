export const emailError = 'Ingresa un email válido'; 
export const passwordError = 'La contraseña debe de tener al menos 6 caracteres (Solamente números y letras)'; 
export class userModel {
      constructor(userId, name, lastLogin, refreshToken, teamId, assignedPurchases, debt, ){
          this.userId                   = userId;
          this.displayName              = name;
          this.lastLogin                = lastLogin;
          this.refreshToken             = refreshToken;
          this.teamId                   = teamId;
          this.debt                     = debt;
          this.assignedPurchases        = assignedPurchases;
      } 
 };
export class purchaseModel {
      constructor( involvedUsers, title, description, date, purchasedBy, createdBy, totalCost ){
          this.involvedUsers = involvedUsers;
          this.title = title;
          this.description = description;
          this.date = date;
          this.purchasedBy = purchasedBy;
          this.createdBy = createdBy;
          this.totalCost = totalCost;
      } 
 };
