import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      txt: string;
      txtGray: string;
      txtLigthGray: string;
      border: string;
      borderLight: string;
      pointBlue: string;
      tintBlack: string;
      tintLightBlack: string;
    };
    heights: {
      header: string;
    };
  }
}
