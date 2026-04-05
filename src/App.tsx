import Text from "./components/text"

export default function App() {
  // Aqui consigo ver de fato a funcionalidade do variant. Quando coloca o variant="" consigo ver as variantes que defini.
  return (
    <div className="flex flex-col gap-1">
      <Text variant="body-sm-bold" className="text-pink-base">Olá mundo!</Text>
      <Text className="text-green-base">Olá mundo!</Text>
      <Text variant="body-md-bold" >Olá mundo!</Text>
      <Text>Olá mundo!</Text>{/*Esses dois ultimos ficam igual, porque a variant defaul definida é a "body-md" */}
      <Text variant="body-md">Olá mundo!</Text>
    </div>
  );
}
