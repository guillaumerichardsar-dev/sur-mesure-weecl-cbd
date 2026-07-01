export type StarterId =
  | 'soir'
  | 'calme'
  | 'confort-musc'
  | 'matin'
  | 'equilibre'
  | 'brut';

export type Format = 'huile' | 'vape';

export type BaseHuile = 'mct' | 'hemp' | 'olive';
export type AromeVape = 'neutre' | 'citrus' | 'menthe' | 'herbace';

export type ConcentrationHuile = 5 | 10 | 15 | 20;
export type ConcentrationVape = 2.5 | 5 | 7.5 | 10;

export interface Starter {
  id: StarterId;
  emoji: string;
  nom: string;
  besoin: string;
  descriptionSensorielle: string;
  cannabinoides: string;
  terpenes: string;
  disponibleHuile: boolean;
  disponibleVape: boolean;
  concentrationsHuile: ConcentrationHuile[];
}

export interface AromeVapeDef {
  id: AromeVape;
  nom: string;
  descriptif: string;
  surcout: number;
}

export interface BaseHuileDef {
  id: BaseHuile;
  nom: string;
  descriptif: string;
  surcout: number;
}

export interface FlaconHuile {
  format: 'huile';
  starterId: StarterId;
  concentration: ConcentrationHuile;
  baseHuile: BaseHuile;
}

export interface FlaconVape {
  format: 'vape';
  starterId: StarterId;
  concentration: ConcentrationVape;
  aromeVape: AromeVape;
}

export type Flacon = FlaconHuile | FlaconVape;

export interface Contact {
  nom: string;
  email: string;
  telephone?: string;
  rgpdConsent: boolean;
  ageConfirmed: boolean;
}

export type WizardStep =
  | 'flacon1-besoin'
  | 'flacon1-intensite'
  | 'flacon1-format'
  | 'flacon1-personnalisation'
  | 'bridge'
  | 'flacon2-besoin'
  | 'flacon2-intensite'
  | 'flacon2-format'
  | 'flacon2-personnalisation'
  | 'recap';

export interface WizardState {
  step: WizardStep;
  flacon1: Partial<Flacon>;
  flacon2: Partial<Flacon> | null;
  contact: Partial<Contact>;
}
