import mitt from 'mitt';

type Enents = {
  combinationIdChange: string;
};
export const events = mitt<Enents>();
