import { atom } from "recoil";

const viewerMode = atom({
  key: "veiwerMode",
  default: "admin",
});

export default viewerMode;
