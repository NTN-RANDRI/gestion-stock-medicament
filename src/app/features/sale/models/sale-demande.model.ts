export interface SaleDemandeModel {
  nomClient: string,
  statusDemande: number,
  lignesDemande: {quantite: number, nomMedicament: string}[],
}