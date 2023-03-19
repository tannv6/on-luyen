export type TMainStates = {
  knowledges: {
    data: TKnowLedge[];
    stage: string;
  };
  messages: {
    data: any[];
    stage: string;
  };
  isOpenNav: boolean;
};
export type TKnowLedge = {
  _id: string;
  knowledge_name: string;
  answer: string;
};

export type TMainStore = {
  main: TMainStates;
};
