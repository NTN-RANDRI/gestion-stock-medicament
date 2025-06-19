import { LignesDemandeModel } from "./lignes-demande.model";

export interface DemandeModel {
  id: number,
  nomClient: string,
  dateDemande: Date,
  statutDemande: string,
  nomUtilisateur: string,
  lignesDemande: LignesDemandeModel[]
}
