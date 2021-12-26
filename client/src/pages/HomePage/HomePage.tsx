import React, { useState } from "react";
import {
  Layout,
  NavbarContainer,
  LeftContainer,
  MiddleContainer,
  RightContainer,
  FooterContainer,
} from "./style";
import { ModelSelector } from "../../components/ModelSelector";
import { ModelEvaluator } from "../../components/ModelEvaluator";
import { ModelLoader } from "../../components/ModelLoader";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ModelName, HomePageProps } from "./types";

export const HomePage: React.FC<HomePageProps> = ({
  logout,
}: HomePageProps): React.ReactElement => {
  const [selectedModelType, setSelectedModelType] = useState<ModelName>(
    "Ordinary Least Squares Regression"
  );

  return (
    <Layout>
      <NavbarContainer>
        <Navbar logout={logout} />
      </NavbarContainer>
      <LeftContainer>
        <ModelSelector setSelectedModelType={setSelectedModelType} />
      </LeftContainer>
      <MiddleContainer>
        <ModelEvaluator currentModel={selectedModelType} />
      </MiddleContainer>
      <RightContainer>
        <ModelLoader />
      </RightContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Layout>
  );
};
