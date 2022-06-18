import{ FC } from 'react';

export namespace Navigation {
  
    export type NavMember = {
      name: string,
      link: string,
      children?: FC
    }
}

