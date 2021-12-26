import { Model } from "../ModelLoader/types";

export interface ModalProps {
  data: Model | undefined;
  updateModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
