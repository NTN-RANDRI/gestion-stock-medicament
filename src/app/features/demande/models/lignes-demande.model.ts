export interface LignesDemandeModel {
  id: number,
  quantite: number,
  demandeId: number,
  medicamentId: number,
  nomMedicamnet: string,
  dosageMedicament: string,
  prixUnitaire: number,
  prixTotal: number
}