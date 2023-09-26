import { Superpowers } from '@/app/models/ISuperpower.tsx';

export interface ISuperhero {
  id: string,
  nickname: string,
  real_name: string,
  description: string,
  catch_phrase: string,
  reference_image: string
}

export interface ISuperpower {
  id: number,
  name: Superpowers
}

export interface IPicture {
  id: string,
  url: string
}

export interface ISuperheroWithDetails extends ISuperhero {
  superpowers: ISuperpower[],
  pictures: IPicture[]
}
