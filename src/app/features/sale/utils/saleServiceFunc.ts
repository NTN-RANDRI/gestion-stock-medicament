import { SaleCartMedicamentModel } from '../models/sale-cart-medicament.model';
import { SaleMedicamentModel } from '../models/sale-medicament.model';
import { SaleSearchMedicamentModel } from '../models/sale-search-medicament.model';

export function resteMedicamentCalcul(
  medicaments: SaleMedicamentModel[],
  cart: SaleCartMedicamentModel[],
): SaleMedicamentModel[] {
  return medicaments.map((medicament) => {
    const medicamentInCart = cart.find((item) => item.nomMedicament === medicament.nomMedicament);

    if (medicamentInCart) {
      return {
        ...medicament,
        quantite: medicament.quantite - medicamentInCart.quantite,
      };
    }

    return medicament;
  });
}

export function fileteredMedicamentsProcess(
  medicaments: SaleMedicamentModel[],
  searchData: SaleSearchMedicamentModel,
): SaleMedicamentModel[] {
  let fileteredMedicaments = medicaments;

  if (searchData.nomMedicament.trim() !== '') {
    fileteredMedicaments = fileteredMedicaments.filter((medicament) =>
      medicament.nomMedicament
        .toLowerCase()
        .includes(searchData.nomMedicament.toLowerCase()),
    );
  }

  if (searchData.formeMedicament !== '') {
    fileteredMedicaments = fileteredMedicaments.filter((medicament) =>
      medicament.formeMedicament.includes(searchData.formeMedicament)
    );
  }

  if (searchData.dosageMedicament.trim() !== '') {
    fileteredMedicaments = fileteredMedicaments.filter((medicament) =>
      medicament.nomMedicament
        .trim()
        .toLowerCase()
        .includes(searchData.nomMedicament.trim().toLowerCase()),
    );
  }

  if (searchData.prixMinVenteMedicament !== null) {
    const prixMin = searchData.prixMinVenteMedicament;
    fileteredMedicaments = fileteredMedicaments.filter(medicament =>
      Number(medicament.prixVenteMedicament) >= prixMin
    )
  }

  if (searchData.prixMaxVenteMedicament !== null) {
    const prixMax = searchData.prixMaxVenteMedicament;
    fileteredMedicaments = fileteredMedicaments.filter(medicament =>
      Number(medicament.prixVenteMedicament) <= prixMax
    )
  }

  return fileteredMedicaments;
}

export function filteredMedicamemtsGlobalProcess(medicaments: SaleMedicamentModel[], searchGlobal: string) {
  let fileteredMedicaments = medicaments;

  if (searchGlobal.trim() !== '') {
    fileteredMedicaments = fileteredMedicaments.filter((medicament) =>
      medicament.nomMedicament.toLowerCase().trim().includes(searchGlobal.toLowerCase().trim()) ||
      medicament.formeMedicament.toLowerCase().trim().includes(searchGlobal.toLowerCase().trim())
    );
  }

  return fileteredMedicaments;
}
