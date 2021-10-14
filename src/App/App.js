import Header from "./Header/Header";
import Form from "./Form/Form";
import { Container } from "./Container/ContainerStyled";

function App() {
  return (
    <>
      <Container>
        <Header
          title="Конвертер валют"
        />
        <Form/>
      </Container>
    </>
  );
};

export default App;
