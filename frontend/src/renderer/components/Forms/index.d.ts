type InputType =
  | 'FILE'
  | 'TEXT'
  | 'PASSWORD'
  | 'TEXTAREA'
  | 'OPTIONS-SINGLE'
  | 'MULTIPLE';

type InputBase = {
  key: string;
  type: InputType;
};

type Input = InputBase &
  (
    | {
        type: 'PASSWORD';
        value: string;
        placeholder: string;
      }
    | {
        type: 'FILE';
        value: null | File | undefined;
        multiple: boolean;
      }
    | {
        type: 'TEXT' | 'TEXTAREA';
        value: string;
        placeholder: string;
      }
    | {
        type: 'OPTIONS-SINGLE';
        optionsType: 'SELECTION' | 'RADIO';
        value: any;
        availableValues: any[];
        labels?: string[];
      }
    | {
        type: 'MULTIPLE';
        values: string[];
        availableValues: { label: string; value: string }[];
      }
  );
